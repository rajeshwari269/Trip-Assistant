# 🌍 Trip Planner

## Overview

**Trip Planner** is a modern, AI-powered travel planning web application built with React and Node.js. It helps travelers effortlessly create personalized itineraries, discover top destinations, book accommodations, and connect with fellow travelers. The platform features an interactive chatbot for recommendations, a friend-finding system, and an admin dashboard for property management—making it your one-stop solution for seamless travel experiences.

### ✨ Recent Updates

- **Modern Glass-Morphism UI**: Beautiful, modern design with glass-morphism effects
- **Professional Logo**: Custom SVG compass logo representing travel planning
- **Mobile-First Navigation**: Responsive navbar with auto-close functionality
- **Optimized Performance**: Cleaned codebase with 56% fewer dependencies
- **Enhanced UX**: Seamless navigation and improved user experience

---

## ✨ Features

| Feature                   | Description                                                         |
| ------------------------- | ------------------------------------------------------------------- |
| 🧠 AI Chatbot             | Get travel recommendations and tips via an interactive chatbot.     |
| 🗺️ Destination Guide      | Explore information about top places, attractions, and landmarks.   |
| 🤝 Find Friends           | Connect and chat with other travelers to plan trips together.       |
| 🏨 Stay Booking Support   | Find and book accommodations (Airbnb-style listings).               |
| 📍 Personalized Itinerary | AI suggests travel plans based on your interests.                   |
| 🛠️ Admin Dashboard        | Admins/hosts can manage property listings and view bookings.        |
| 🔐 User Authentication    | Secure login and registration for travelers and hosts.              |
| 🎨 Modern UI Design       | Glass-morphism effects with beautiful gradients and animations.     |
| 🌙 Dark Mode              | Toggle between light and dark themes.                               |
| 📱 Responsive Design      | Fully responsive for mobile and desktop with auto-close navigation. |
| 🗺️ Interactive Maps       | Location-based services with Leaflet integration.                   |
| ☁️ Cloud Database         | Uses MongoDB for scalable data storage.                             |

---

## 🧰 Tech Stack

| Layer             | Technology                             |
| ----------------- | -------------------------------------- |
| 💻 Frontend       | React.js, TypeScript, Vite, Bootstrap  |
| 🖥️ Backend        | Node.js, Express                       |
| 🗄️ Database       | MongoDB (Mongoose)                     |
| 🔐 Authentication | Custom Authentication System           |
| 🧠 AI Integration | Custom Chatbot (API endpoint)          |
| 🗺️ Maps           | Leaflet.js for interactive maps        |
| 🎨 Styling        | CSS, Bootstrap, Glass-morphism effects |

> **Note:** The application uses MongoDB for data storage and a custom authentication system. The frontend is optimized with modern CSS techniques and responsive design.

---

## 🚀 Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- npm (v9+ recommended)
- MongoDB (local or [MongoDB Atlas](https://www.mongodb.com/atlas))

### 1. Clone the Repository

```bash
git clone <your-repo-url>
cd react_app
```

### 2. Install Dependencies

#### For the frontend (React):

```bash
cd client
npm install
```

#### For the backend (Express):

```bash
cd ../server
npm install
```

### 3. Start the Frontend (React)

```bash
cd ../client
npm run dev
```

Visit the app at: [http://localhost:5173](http://localhost:5173)

### 4. Start the Backend (Express API)

Open a new terminal and run:

```bash
cd server
npm start # or node server.js
```

The backend will run at [http://localhost:5000](http://localhost:5000)

> **Note:**
>
> - Ensure your MongoDB server is running and update the backend connection string as needed (see `server/server.js`).
> - The application uses a custom authentication system, no external auth provider setup required.

---

## 🖼️ Screenshots

> **Note:** Screenshots will be updated to reflect the new modern UI design with glass-morphism effects and the professional compass logo.

| Home Page   | Places      | Find Friends | Admin Dashboard |
| ----------- | ----------- | ------------ | --------------- |
| Coming Soon | Coming Soon | Coming Soon  | Coming Soon     |

---

## 🛠️ Project Structure

```
react_app/
├── client/
│   ├── index.html
│   ├── package.json
│   ├── public/
│   │   └── vite.svg
│   └── src/
│       ├── App.css
│       ├── App.tsx
│       ├── main.tsx
│       ├── responsive.css
│       ├── vite-env.d.ts
│       ├── components/
│       │   ├── Navigation.tsx
│       │   ├── footer.tsx
│       │   ├── placeCard.tsx
│       │   ├── placeCard.css
│       │   ├── searchbar.tsx
│       │   ├── chatbot.tsx
│       │   ├── chatbot.css
│       │   ├── WeatherCard.tsx
│       │   └── MapView.tsx
│       ├── pages/
│       │   ├── home.tsx
│       │   ├── home.css
│       │   ├── Places.tsx
│       │   ├── Places.css
│       │   ├── MorePlaces.tsx
│       │   ├── PlaceDetails.tsx
│       │   ├── FindFriends.tsx
│       │   ├── HelpCentre.tsx
│       │   ├── Auth.tsx
│       │   └── Admin/
│       │       ├── admin.tsx
│       │       ├── admin.css
│       │       └── Add.tsx
│       ├── images/
│       │   ├── home1.jpg
│       │   ├── home2.jpg
│       │   ├── home3.jpg
│       │   ├── home4.jpg
│       │   ├── home5.jpeg
│       │   ├── ihome_image.png
│       │   ├── bg-auth.jpg
│       │   └── logo1.jpg
│       └── utils/
│           ├── errorHandlerToast.ts
│           └── toastUtils.ts
├── server/
│   ├── server.js
│   ├── package.json
│   ├── config/
│   │   └── db.js
│   ├── controllers/
│   │   └── propertyController.js
│   ├── middleware/
│   │   └── upload.js
│   ├── routes/
│   │   └── propertyRoutes.js
│   └── uploads/
├── README.md
├── Contributing.md
├── LICENSE
├── eslint.config.js
├── tsconfig.json
├── tsconfig.app.json
├── tsconfig.node.json
└── vite.config.ts
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

| Feature                    | Description                                         |
| -------------------------- | --------------------------------------------------- |
| 🧠 Smarter AI Chatbot      | Enhanced NLP for smarter query handling.            |
| 📱 Mobile App              | Native mobile app support.                          |
| 🤝 Social Integration      | Google/Facebook login and trip sharing.             |
| 💬 Real-time Chat          | Live chat among travelers.                          |
| 📍 Geolocation Suggestions | Destinations based on user’s real-time location.    |
| 🏅 Reward System           | Badges and rewards for active users.                |
| 📦 PWA Support             | Progressive Web App/offline access.                 |
| 🧳 Travel Budget Planner   | Tool for managing travel expenses.                  |
| 🎨 Advanced UI Features    | More animations, themes, and customization options. |
| 🔍 Advanced Search         | Filter by price, rating, location, and amenities.   |

---

## 📄 License

This project is licensed under the ISC License.

---

## 🙏 Acknowledgements

- [React](https://react.dev/)
- [Vite](https://vitejs.dev/)
- [Bootstrap](https://getbootstrap.com/)
- [MongoDB](https://www.mongodb.com/)
- [Express](https://expressjs.com/)
- [Leaflet](https://leafletjs.com/) for interactive maps

---

## 🚀 Recent Improvements & Optimizations

### Performance Enhancements

- **56% Dependency Reduction**: Removed 14 unused packages for faster builds
- **Code Cleanup**: Eliminated 500+ lines of unused code
- **Asset Optimization**: Removed 1.4MB+ of unused images and assets
- **Bundle Size Reduction**: Significantly smaller final build size

### UI/UX Improvements

- **Modern Glass-Morphism Design**: Beautiful translucent effects and gradients
- **Professional Logo**: Custom SVG compass logo representing travel planning
- **Mobile-First Navigation**: Responsive navbar with auto-close functionality
- **Enhanced Animations**: Smooth transitions and hover effects
- **Consistent Theming**: Unified color scheme and styling

### Code Quality

- **Removed Dead Code**: Eliminated unused components and imports
- **Simplified Architecture**: Streamlined component structure
- **Better Organization**: Cleaner file structure and naming conventions
- **TypeScript Optimization**: Improved type safety and development experience

### Development Experience

- **Faster Development**: Reduced build times and dependency conflicts
- **Cleaner IDE**: No unused files cluttering the workspace
- **Better Debugging**: Simplified codebase for easier troubleshooting
- **Maintainable Code**: Well-structured and documented components

---

> Made with ❤️ for travelers everywhere!
