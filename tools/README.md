# Smart Packing Assistant

The **Smart Packing Assistant** is a weather-aware travel companion that generates personalized packing lists for multiple travelers based on location, travel dates, weather conditions, and medical needs. It uses AI to provide smart suggestions and automates the process of building detailed, user-specific packing checklists.

---

## 🚀 Features

* ✅ Multi-person packing list generation
* 🌤 Weather-integrated suggestions (OpenWeatherMap API)
* 💊 Medical needs consideration
* 🧳 Trip duration-aware item calculation
* 🤖 LLM-powered packing logic (Gemini/Groq fallback)
* 📦 Categorized output: Essentials, Clothing, Toiletries, Electronics, Miscellaneous
* 🧼 Clean Streamlit UI with logging for debugging

---

## 🧰 Tech Stack

* **Frontend**: Streamlit
* **Backend**: Python 3
* **LLMs**: Gemini (via Gemini Pro API), Groq (LLaMA fallback)
* **Weather**: OpenWeatherMap API

---

## 🗂 Folder Structure

```
Trip_assistant/
├── client/                         # (Optional) Frontend/client-related files (if any)
├── server/                         # (Optional) Backend/server-side logic (if extended)
├── tools/
│   └── packing-assistant/         # Main app folder
│       ├── .env                   # Environment variables
│       ├── .env.example           # Sample env file for reference
│       ├── app.py                 # Main Streamlit app logic
│       ├── requirements.txt       # Python dependencies
│       └── README.md              # Project documentation
├── .gitignore                     # Git ignored files

```

---

## 🔧 Setup Instructions

### 1. Clone the repository

```bash
git clone https://github.com/your-username/smart-packing-assistant.git
cd smart-packing-assistant
```

### 2. Create virtual environment

```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

### 3. Install dependencies

```bash
pip install -r requirements.txt
```

### 4. Add API keys

Create a `.env` file with the following variables (see `.env.example`):

```
GEMINI_API_KEY=your-gemini-api-key
GROQ_API_KEY=your-groq-api-key
OPENCAGE_API_KEY=your-opencage-api-key
WEATHER_API_KEY=your-weather-api-key

```

---

## ▶️ Run the App

```bash
streamlit run main.py
```

---

## 🛠 To Do / Improvements

* [ ] Add support for international trips (visa, currency converter, etc.)
* [ ] Add download/export as PDF
* [ ] UI enhancements (date picker, progress bar)
* [ ] Save previous trips locally

---

