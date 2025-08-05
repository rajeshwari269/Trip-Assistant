import React from 'react';

const AboutUsPage: React.FC = () => {
  return (
    <div className="container my-5">
      <h1 className="mb-4">About Trip Planner</h1>
      <div className="card mb-4">
        <div className="card-body">
          <h2 className="card-title">Our Mission</h2>
          <p className="card-text">
            Trip Planner is a modern, AI-powered travel planning web application built with React and Node.js.
            We help travelers effortlessly create personalized itineraries, discover top destinations,
            book accommodations, and connect with fellow travelers.
          </p>
        </div>
      </div>
      
      <div className="card mb-4">
        <div className="card-body">
          <h2 className="card-title">Our Team</h2>
          <p className="card-text">
            Our team consists of passionate travelers and tech enthusiasts who want to make travel planning
            easier and more enjoyable for everyone. We combine our love for exploration with cutting-edge
            technology to create the best travel planning experience.
          </p>
        </div>
      </div>
      
      <div className="card mb-4">
        <div className="card-body">
          <h2 className="card-title">Our Technology</h2>
          <p className="card-text">
            We use the latest technologies including React, TypeScript, Node.js, and AI-powered recommendations
            to provide a seamless travel planning experience. Our platform is continuously evolving to incorporate
            new features and improve existing functionality.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutUsPage;
const App = ({ isDarkMode, toggleDarkMode }) => {
  return (
    <>
      {/*
        This style block contains all the CSS rules for the component.
        This makes the component self-contained and easy to copy and paste.
      */}
      <style>
        {`
          :root {
            --primary-color: #0077b6;
            --secondary-color: #eaf4f4;
            --text-color: #2a2a2a;
            --subtle-gray: #f8f9fa;
            --card-background: #ffffff;
            --cta-background: #eef2ff;
            --dark-blue: #023e8a;
          }

          /* Dark Mode specific color variables */
          .dark-mode {
            --primary-color: #90e0ef;
            --secondary-color: #1a1a1a;
            --text-color: #f5f5f5;
            --subtle-gray: #0d0d0d;
            --card-background: #2c2c2c;
            --cta-background: #2c2c2c;
            --dark-blue: #e0f7fa;
          }

          .about-us-container {
            background-color: linear-gradient(135deg, #FFD700 0%, #FFA500 100%);
            font-family: 'Inter', ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif;
            color: var(--text-color);
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
            line-height: 1.6;
            transition: background-color 0.3s ease, color 0.3s ease;
          }
          
          .header {
            position: relative;
            height: 60vh;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            overflow: hidden;
            text-align: center;
            padding: 0 1rem;
            box-shadow: inset 0 -50px 50px -50px rgba(0, 0, 0, 0.5);
          }

          @media (min-width: 768px) {
            .header {
              height: 50vh;
            }
          }

          .dark-mode-toggle {
            position: absolute;
            top: 1rem;
            right: 1rem;
            background: rgba(255, 255, 255, 0.2);
            backdrop-filter: blur(5px);
            border: 1px solid rgba(255, 255, 255, 0.3);
            border-radius: 9999px;
            padding: 0.5rem 1rem;
            font-size: 1rem;
            color: white;
            cursor: pointer;
            transition: background-color 0.3s ease;
            z-index: 20;
          }

          .dark-mode-toggle:hover {
            background: rgba(255, 255, 255, 0.3);
          }

          .header-bg {
            position: absolute;
            inset: 0;
            background-size: cover;
            background-position: center;
            background-attachment: fixed;
            background-image: url('https://images.unsplash.com/photo-1549488344-71286e709088?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D');
          }

          .header-overlay {
            position: absolute;
            inset: 0;
            background: linear-gradient(to bottom, rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.7));
            transition: background-color 0.3s ease;
          }

          .header-subtitle {
            position: relative;
            font-size: 1.25rem;
            color: #d1d5db;
            z-index: 10;
            margin-bottom: 0.5rem;
            font-weight: 500;
          }

          .header-title {
            position: relative;
            font-size: 2.25rem;
            line-height: 1.2;
            font-weight: 800;
            color: #fff;
            z-index: 10;
            text-shadow: 2px 2px 4px rgba(0,0,0,0.5);
          }

          @media (min-width: 640px) {
            .header-title {
              font-size: 3rem;
            }
          }

          @media (min-width: 768px) {
            .header-title {
              font-size: 3.75rem;
            }
          }
          
          .main-content {
            max-width: 80rem;
            margin-left: auto;
            margin-right: auto;
            padding: 4rem 1rem;
          }
          
          @media (min-width: 640px) {
            .main-content {
              padding-left: 1.5rem;
              padding-right: 1.5rem;
            }
          }

          .section-block {
            margin-bottom: 5rem;
          }

          .section-heading {
            font-size: 2.25rem;
            font-weight: 800;
            color: var(--dark-blue);
            margin-bottom: 1.5rem;
            text-align: center;
          }

          .section-text {
            font-size: 1.125rem;
            color: var(--text-color);
            max-width: 48rem;
            margin: 0 auto;
            text-align: center;
          }

          .feature-list {
            list-style: none;
            padding: 0;
            margin: 2rem auto 0;
            display: grid;
            gap: 1.5rem;
            max-width: 48rem;
          }

          @media (min-width: 640px) {
            .feature-list {
              grid-template-columns: repeat(2, 1fr);
            }
          }
          @media (min-width: 1024px) {
            .feature-list {
              grid-template-columns: repeat(3, 1fr);
            }
          }

          .feature-item {
            display: flex;
            align-items: flex-start;
            background-color: var(--card-background);
            padding: 1.5rem;
            border-radius: 1rem;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
            transition: transform 0.3s ease, box-shadow 0.3s ease, background-color 0.3s ease, color 0.3s ease;
          }

          .feature-item:hover {
            transform: translateY(-5px);
            box-shadow: 0 6px 20px rgba(0, 0, 0, 0.1);
          }
          
          .feature-item-icon {
            font-size: 1.75rem;
            margin-right: 1rem;
            flex-shrink: 0;
            line-height: 1;
          }

          .cta-section {
            background-color: var(--cta-background);
            border-radius: 1.5rem;
            padding: 4rem 2rem;
            text-align: center;
            box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
            margin-bottom: 4rem;
            transition: background-color 0.3s ease, box-shadow 0.3s ease;
          }

          .cta-text {
            font-size: 1.25rem;
            color: var(--text-color);
            max-width: 42rem;
            margin: 0 auto 2rem;
            transition: color 0.3s ease;
          }
          
          .cta-button {
            display: inline-flex;
            align-items: center;
            padding: 1rem 2.5rem;
            background-color: var(--primary-color);
            color: #fff;
            font-size: 1.125rem;
            font-weight: 600;
            border-radius: 9999px;
            box-shadow: 0 4px 15px rgba(0, 119, 182, 0.3);
            transition: all 0.3s ease;
            text-decoration: none;
            border: none;
          }

          .cta-button:hover {
            background-color: var(--dark-blue);
            transform: translateY(-3px);
            box-shadow: 0 6px 20px rgba(0, 119, 182, 0.4);
          }
          
          .cta-button:focus {
            outline: 2px solid transparent;
            outline-offset: 2px;
            box-shadow: 0 0 0 4px rgba(0, 119, 182, 0.3);
          }

          .footer {
            background-color: var(--dark-blue);
            color: #fff;
            text-align: center;
            padding: 1.5rem;
            transition: background-color 0.3s ease;
          }
        `}
      </style>

      {/*
        This is the main container for the "About Us" page.
        Apply the 'dark-mode' class conditionally based on your state.
      */}
      <div className={`about-us-container ${isDarkMode ? 'dark-mode' : ''}`}>

        {/* Hero Section */}
        <header className="header">
          <div className="header-bg"></div>
          <div className="header-overlay"></div>
          <p className="header-subtitle">Welcome to PlanTrip.com</p>
          <h1 className="header-title">Your Trusted Travel Companion!</h1>
        </header>

        <main className="main-content">
          {/* Who We Are Section */}
          <section className="section-block">
            <h2 className="section-heading">🧭 Who We Are</h2>
            <p className="section-text">
              PlanTrip is a smart trip planning platform that helps travelers like you:
            </p>
            <ul className="feature-list">
              <li className="feature-item">
                <span className="feature-item-icon">🗺️</span>
                <span>Discover top-rated destinations</span>
              </li>
              <li className="feature-item">
                <span className="feature-item-icon">💰</span>
                <span>Estimate travel budgets</span>
              </li>
              <li className="feature-item">
                <span className="feature-item-icon">🧑‍🤝‍🧑</span>
                <span>Connect with fellow explorers</span>
              </li>
              <li className="feature-item">
                <span className="feature-item-icon">📝</span>
                <span>Plan customized itineraries with ease</span>
              </li>
              <li className="feature-item">
                <span className="feature-item-icon">🌐</span>
                <span>Explore destinations across India, Nepal, Bangladesh, and more</span>
              </li>
              <li className="feature-item">
                <span className="feature-item-icon">📍</span>
                <span>Find most-visited and hidden gem locations</span>
              </li>
            </ul>
            <p className="section-text" style={{ marginTop: '2rem' }}>
              We believe travel should be simple, affordable, and unforgettable.
            </p>
          </section>

          {/* Our Mission Section */}
          <section className="section-block">
            <h2 className="section-heading">🎯 Our Mission</h2>
            <p className="section-text">
              To provide a seamless and personalized trip planning experience that saves you time, reduces stress, and maximizes your enjoyment — from booking to exploring.
            </p>
          </section>

          {/* What We Offer Section */}
          <section className="section-block">
            <h2 className="section-heading">💡 What We Offer</h2>
            <ul className="feature-list">
              <li className="feature-item">
                <span className="feature-item-icon">🌐</span>
                <span>Explore destinations across India, Nepal, Bangladesh, and more</span>
              </li>
              <li className="feature-item">
                <span className="feature-item-icon">📍</span>
                <span>Find most-visited and hidden gem locations</span>
              </li>
              <li className="feature-item">
                <span className="feature-item-icon">💸</span>
                <span>Use our built-in Budget Estimator</span>
              </li>
              <li className="feature-item">
                <span className="feature-item-icon">🧑‍🤝‍🧑</span>
                <span>Meet new people with the Find Friends feature</span>
              </li>
              <li className="feature-item">
                <span className="feature-item-icon">📚</span>
                <span>Read about famous places and plan easily</span>
              </li>
              <li className="feature-item">
                <span className="feature-item-icon">☁️</span>
                <span>Real-time weather updates and local travel tips</span>
              </li>
            </ul>
          </section>

          {/* Why Choose Us Section */}
          <section className="section-block">
            <h2 className="section-heading">🤝 Why Choose Us?</h2>
            <ul className="feature-list">
              <li className="feature-item">
                <span className="feature-item-icon">✨</span>
                <span>User-friendly design and interactive features</span>
              </li>
              <li className="feature-item">
                <span className="feature-item-icon">🤝</span>
                <span>Tailored travel solutions for all types of travelers</span>
              </li>
              <li className="feature-item">
                <span className="feature-item-icon">❤️</span>
                <span>Passionate team focused on your journey</span>
              </li>
              <li className="feature-item">
                <span className="feature-item-icon">🚀</span>
                <span>Regular updates and support</span>
              </li>
              <li className="feature-item">
                <span className="feature-item-icon">📈</span>
                <span>Committed to continuous improvement and user feedback</span>
              </li>
               <li className="feature-item">
                <span className="feature-item-icon">🧑‍🤝‍🧑</span>
                <span>A community of passionate travelers sharing their stories</span>
              </li>
            </ul>
          </section>

          {/* Call to Action (CTA) Section */}
          <section className="cta-section">
            <h2 className="section-heading">✨ Let’s Travel Smarter</h2>
            <p className="cta-text">
              At PlanTrip.com, we believe every trip is a story waiting to be written. Let us help you write yours.
            </p>
            <a href="/places" className="cta-button">
              Start Planning Your Trip
            </a>
          </section>
        </main>
      </div>
    </>
  );
};

export default App;

