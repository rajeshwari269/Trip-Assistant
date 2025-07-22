# 🌍 Trip Planner

![Trip Planner Screenshot](site_images_/image.png)

## Overview

**Trip Planner** is a modern, AI-powered travel planning web application. It helps travelers effortlessly create personalized itineraries, discover top destinations, book accommodations, and connect with fellow travelers. The platform features an interactive chatbot for recommendations, a friend-finding system, and an admin dashboard for property management—making it your one-stop solution for seamless travel experiences.

---

## ✨ Features

| Feature                   | Description                                                                     |
| ------------------------- | ------------------------------------------------------------------------------- |
| 🧠 AI Chatbot             | Get travel recommendations and tips via an interactive chatbot.                 |
| 🗺️ Destination Guide      | Explore information about top places, attractions, and landmarks.               |
| 🤝 Find Friends           | Connect and chat with other travelers to plan trips together.                   |
| 🏨 Stay Booking Support   | Find and book accommodations (Airbnb-style listings).                           |
| 📍 Personalized Itinerary | AI suggests travel plans based on your interests.                               |
| 🛠️ Admin Dashboard        | Admins/hosts can manage property listings and view bookings.                    |
| 🔐 User Authentication    | Secure login and registration for travelers and hosts.                          |
| 🌐 Multi-language         | Supports English, Hindi, and French.                                            |
| 🌙 Dark Mode              | Toggle between light and dark themes.                                           |
| 📱 Responsive Design      | Fully responsive for mobile and desktop.                                        |

---

## 🧰 Tech Stack

| Layer                 | Technology                          |
| --------------------- | ----------------------------------- |
| 💻 Frontend           | React.js, TypeScript, Vite, Bootstrap|
| 🖥️ Backend            | Node.js, Express, MySQL             |
| 🗄️ Database           | MySQL                               |
| 🔐 Authentication     | Custom (JWT, bcryptjs)              |
| 🧠 AI Integration     | Custom Chatbot (API endpoint)        |
| 🌍 i18n               | react-i18next                       |
| 🎨 Styling            | CSS, Bootstrap, custom styles        |

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+ recommended)
- npm (v9+ recommended)
- MySQL (for backend)

### 1. Clone the Repository
```bash
git clone <your-repo-url>
cd react_app
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Start the Frontend (React)
```bash
npm run dev
```
Visit the app at: [http://localhost:5173](http://localhost:5173)

### 4. Start the Backend (Express API)
Open a new terminal and run:
```bash
cd src/pages/Admin
npm install # if needed for backend dependencies
node server.js
```
The backend will run at [http://localhost:5000](http://localhost:5000)

> **Note:** Ensure your MySQL server is running and the `tripPlannerDB` database is set up. Update credentials in `server.js` as needed.

---

## 🖼️ Screenshots

| Home Page | Places | Find Friends | Admin Dashboard |
|-----------|--------|--------------|-----------------|
| ![Home](site_images_/image-1.png) | ![Places](site_images_/image-2.png) | ![Friends](site_images_/image-3.png) | ![Admin](site_images_/image-4.png) |

---

## 🛠️ Project Structure

```
react_app/
  ├── public/                # Static assets
  ├── src/
  │   ├── components/        # Reusable UI components
  │   ├── pages/             # Main app pages (Home, Places, Auth, Admin, etc.)
  │   ├── images/            # Image assets
  │   ├── i18n.js            # Internationalization config
  │   └── main.tsx           # App entry point
  ├── package.json           # Project metadata & scripts
  ├── vite.config.ts         # Vite config
  └── ...
```

---

## 🧑‍💻 Contributing

We welcome all contributions—big or small! See [Contributing.md](Contributing.md) for guidelines.

- Report bugs or UI issues
- Suggest and implement new features
- Improve code structure or performance
- Enhance UI/UX design
- Update documentation

---

## 📌 Future Enhancements

| Feature                          | Description                                                 |
| -------------------------------- | ----------------------------------------------------------- |
| 🧠 Smarter AI Chatbot            | Enhanced NLP for smarter query handling.                    |
| 📱 Mobile App                    | Native mobile app support.                                  |
| 🤝 Social Integration            | Google/Facebook login and trip sharing.                     |
| 💬 Real-time Chat                | Live chat among travelers.                                  |
| 📍 Geolocation Suggestions       | Destinations based on user’s real-time location.            |
| 🏅 Reward System                 | Badges and rewards for active users.                        |
| 📦 PWA Support                   | Progressive Web App/offline access.                         |
| 🧳 Travel Budget Planner         | Tool for managing travel expenses.                          |

---

## 📄 License

This project is licensed under the ISC License.

---

## 🙏 Acknowledgements
- [React](https://react.dev/)
- [Vite](https://vitejs.dev/)
- [Bootstrap](https://getbootstrap.com/)
- [react-i18next](https://react.i18next.com/)
- [MySQL](https://www.mysql.com/)
- [Express](https://expressjs.com/)

---

> Made with ❤️ for travelers everywhere!
