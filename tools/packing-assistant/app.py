import os
import streamlit as st
import requests
import google.generativeai as genai
from groq import Groq
import re
from datetime import datetime
from io import BytesIO
from docx import Document

# --- Config ---
st.set_page_config(page_title="Smart Packing Assistant", page_icon="🎒", layout="wide")

# Load API keys from environment
GEMINI_API_KEY   = os.getenv("GEMINI_API_KEY")
GROQ_API_KEY     = os.getenv("GROQ_API_KEY")
OPENCAGE_API_KEY = os.getenv("OPENCAGE_API_KEY")
WEATHER_API_KEY  = os.getenv("WEATHER_API_KEY")

missing = [k for k,v in {
    "GEMINI_API_KEY": GEMINI_API_KEY,
    "GROQ_API_KEY": GROQ_API_KEY,
    "OPENCAGE_API_KEY": OPENCAGE_API_KEY,
    "WEATHER_API_KEY": WEATHER_API_KEY,
}.items() if not v]
if missing:
    st.error(f"Missing environment variables: {', '.join(missing)}")
    st.stop()

genai.configure(api_key=GEMINI_API_KEY)

# Cache for storing location coordinates (in-memory)
location_cache = {}

def get_lat_lon_from_opencage(location):
    if location in location_cache:
        return location_cache[location]
    try:
        url = f"https://api.opencagedata.com/geocode/v1/json?q={location}&key={OPENCAGE_API_KEY}"
        response = requests.get(url, timeout=20)
        response.raise_for_status()
        data = response.json()
        if data.get("results"):
            lat = data["results"][0]["geometry"]["lat"]
            lon = data["results"][0]["geometry"]["lng"]
            location_cache[location] = (lat, lon)
            return lat, lon
    except Exception:
        pass
    return None, None


def get_weather(lat, lon, date):
    try:
        url = f"https://api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={WEATHER_API_KEY}&units=metric"
        response = requests.get(url, timeout=20).json()
        if "list" in response and response["list"]:
            forecast = response["list"][0]
            description = forecast["weather"][0]["description"].capitalize()
            temperature = forecast["main"]["temp"]
            return f"{description}, {temperature}°C"
    except Exception:
        pass
    return "Weather data not available"


def create_docx(weather, packing_list):
    buffer = BytesIO()
    doc = Document()
    doc.add_heading("Smart Packing Assistant", level=1)
    doc.add_paragraph(f"Weather Forecast: {weather}\n")
    doc.add_heading("Packing List:", level=2)
    for item in packing_list:
        doc.add_paragraph(f"- {item}")
    doc.save(buffer)
    buffer.seek(0)
    return buffer


def extract_items_from_suggestions(suggestions):
    clean_list = []
    for line in suggestions.split("\n"):
        line = re.sub(r"[:•\-]+", "", line).strip()
        if line and not line.isdigit():
            clean_list.append(line)
    return clean_list

def get_packing_suggestions(location, activities, trip_type, trip_duration, people):
    model = genai.GenerativeModel(model_name="gemini-2.0-flash-exp")
    chat_session = model.start_chat(history=[])

    people_info = "; ".join(
        [f"{p['name']} (Age: {p['age']}, Gender: {p['gender']}, Medical Needs: {p['medical_issues']})" for p in people]
    )
    activities = activities or "general activities"
    prompt = (
        f"Suggest a packing list for travelers going to {location} for {activities}. "
        f"The trip type is {trip_type}. Include items based on the trip duration of "
        f"{trip_duration} days and travelers' details: {people_info}."
    )
    try:
        response = chat_session.send_message(prompt)
        return extract_items_from_suggestions(response.text)
    except Exception:
        st.warning("❌ Gemini failed, falling back to LLaMA...")
        try:
            client = Groq(api_key=GROQ_API_KEY)
            completion = client.chat.completions.create(
                model="llama-3.3-70b-versatile",
                messages=[{"role": "system", "content": prompt}],
                temperature=1,
                max_completion_tokens=200,
                top_p=1,
                stream=False
            )
            return extract_items_from_suggestions(
                completion.choices[0].message.get("content", "")
            )
        except Exception as e:
            st.error(f"❌ Error generating packing list from both models: {e}")
            return []