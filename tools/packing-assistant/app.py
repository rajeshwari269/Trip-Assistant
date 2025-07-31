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