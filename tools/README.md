# 🎒 Smart Packing Assistant (Streamlit)

## 📖 Overview
The **Smart Packing Assistant** is an AI-powered tool that generates personalized packing lists based on:

- 🌦️ Weather forecasts of your destination  
- ✈️ Trip type & duration  
- 🏞️ Activities planned  
- 👨‍👩‍👧‍👦 Number of travelers & their needs  

It uses **Google Gemini**, **Groq (LLaMA fallback)**, **OpenCage**, and **OpenWeather** APIs to create accurate suggestions.  
Users can also download the packing list as a **Word document (.docx)**.  

This module is an **optional AI tool** for the main [Trip Assistant](../../README.md) project but can run independently.

---

## 🚀 Features
- Weather-based packing recommendations  
- Multiple **trip types** supported (business, solo, relocation, adventure, etc.)  
- Handles multiple travelers with personal details (age, gender, medical needs)  
- Choose between **detailed** or **minimalist** packing lists  
- Download the final list as a Word document  
- Automatic fallback to **Groq LLaMA** if Gemini fails  

---

## 🛠️ Installation & Setup

### 1️⃣ Clone the repository
If you haven’t already cloned the full project:
```bash
git clone https://github.com/<your-username>/Trip_assistant.git
cd Trip_assistant/tools/packing-assistant

### 2️⃣ Create and activate a virtual environment

```bash
python -m venv .venv
.\.venv\Scripts\Activate.ps1
source .venv/bin/activate
