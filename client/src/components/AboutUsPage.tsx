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
