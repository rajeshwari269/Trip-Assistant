import React from 'react';
import {
  Plane,
  Compass,
  Heart,
  Linkedin,
  Twitter,
  Github,
  Globe,
  Wallet,
  Users,
  BookOpen,
  CheckCircle
} from 'lucide-react';


const AboutUsPage = () => {
  return (
    <div className="bg-slate-950 text-white font-inter min-h-screen">
      <div className="container mx-auto px-4 py-16 sm:px-6 lg:px-8">

        {/* Hero Section */}
        <header className="text-center max-w-4xl mx-auto mb-16">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-4 text-transparent bg-clip-text bg-gradient-to-r from-purple-800 to-yellow-400">
            🌍 About Us — PlanTrip.com
          </h1>
          <p className="text-lg sm:text-xl lg:text-2xl text-slate-300">
            Welcome to PlanTrip.com, your trusted travel companion!
          </p>
          <p className="mt-4 text-lg text-slate-300">
            We’re here to make your travel dreams a reality — whether you’re planning a weekend getaway, a family vacation, or an adventure across countries.
          </p>
        </header>

        {/* Who We Are Section */}
        <section className="bg-slate-800 rounded-2xl shadow-xl p-8 sm:p-12 lg:p-16 mb-16 transition-transform duration-300 hover:scale-105">
          <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
            <div className="md:w-1/2">
              <img
                src="https://placehold.co/800x600/6B7280/F3F4F6?text=Our+Story"
                alt="Our Company Story"
                className="rounded-xl w-full h-auto object-cover"
              />
            </div>
            <div className="md:w-1/2">
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                <span className="text-yellow-400">🧭</span> Who We Are
              </h2>
              <p className="text-base sm:text-lg text-slate-300 leading-relaxed mb-4">
                PlanTrip is a smart trip planning platform that helps travelers like you:
              </p>
              <ul className="text-base sm:text-lg text-slate-300 space-y-2">
                <li><span className="font-semibold">Discover top-rated destinations</span></li>
                <li><span className="font-semibold">Estimate travel budgets</span></li>
                <li><span className="font-semibold">Connect with fellow explorers</span></li>
                <li><span className="font-semibold">Plan customized itineraries with ease</span></li>
              </ul>
              <p className="mt-4 text-base sm:text-lg text-slate-300 leading-relaxed">
                We believe travel should be simple, affordable, and unforgettable.
              </p>
            </div>
          </div>
        </section>

        {/* Mission and What We Offer Section */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <div className="bg-slate-800 rounded-2xl shadow-xl p-6 sm:p-8 flex flex-col items-center text-center transition-transform duration-300 hover:scale-105">
            <Plane className="w-12 h-12 text-yellow-400 mb-4" />
            <h3 className="text-xl sm:text-2xl font-bold mb-2">
              <span className="text-yellow-400">🎯</span> Our Mission
            </h3>
            <p className="text-sm sm:text-base text-slate-400">
              To provide a seamless and personalized trip planning experience that saves you time, reduces stress, and maximizes your enjoyment — from booking to exploring.
            </p>
          </div>
          <div className="bg-slate-800 rounded-2xl shadow-xl p-6 sm:p-8 text-center transition-transform duration-300 hover:scale-105">
            <h3 className="text-xl sm:text-2xl font-bold mb-4">
              <span className="text-yellow-400">💡</span> What We Offer
            </h3>
            <ul className="space-y-4 text-left">
              <li className="flex items-start">
                <Globe className="w-6 h-6 text-yellow-400 flex-shrink-0 mr-3" />
                <span className="text-sm sm:text-base text-slate-400">
                  🌐 Explore destinations across India, Nepal, Bangladesh, and more
                </span>
              </li>
              <li className="flex items-start">
                <Wallet className="w-6 h-6 text-yellow-400 flex-shrink-0 mr-3" />
                <span className="text-sm sm:text-base text-slate-400">
                  📍 Find most-visited and hidden gem locations
                </span>
              </li>
              <li className="flex items-start">
                <Users className="w-6 h-6 text-yellow-400 flex-shrink-0 mr-3" />
                <span className="text-sm sm:text-base text-slate-400">
                  💸 Use our built-in Budget Estimator
                </span>
              </li>
              <li className="flex items-start">
                <BookOpen className="w-6 h-6 text-yellow-400 flex-shrink-0 mr-3" />
                <span className="text-sm sm:text-base text-slate-400">
                  🧑‍🤝‍🧑 Meet new people with the Find Friends feature
                </span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="w-6 h-6 text-yellow-400 flex-shrink-0 mr-3" />
                <span className="text-sm sm:text-base text-slate-400">
                  📚 Read about famous places and plan easily
                </span>
              </li>
            </ul>
          </div>
        </section>

        {/* Why Choose Us Section */}
        <section className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            <span className="text-yellow-400">🤝</span> Why Choose Us?
          </h2>
          <div className="max-w-2xl mx-auto">
            <ul className="space-y-4 text-left text-lg text-slate-300">
              <li className="flex items-center">
                <CheckCircle className="w-6 h-6 text-yellow-400 flex-shrink-0 mr-3" />
                <span>User-friendly design and interactive features</span>
              </li>
              <li className="flex items-center">
                <CheckCircle className="w-6 h-6 text-yellow-400 flex-shrink-0 mr-3" />
                <span>Tailored travel solutions for all types of travelers</span>
              </li>
              <li className="flex items-center">
                <CheckCircle className="w-6 h-6 text-yellow-400 flex-shrink-0 mr-3" />
                <span>Passionate team focused on your journey</span>
              </li>
              <li className="flex items-center">
                <CheckCircle className="w-6 h-6 text-yellow-400 flex-shrink-0 mr-3" />
                <span>Regular updates and support</span>
              </li>
            </ul>
          </div>
        </section>

        {/* CTA Section */}
        <section className="text-center">
          <div className="bg-gradient-to-r from-purple-800 to-yellow-400 text-white rounded-2xl shadow-xl p-8 sm:p-12 lg:p-16">
            <h2 className="text-2xl sm:text-3xl font-bold mb-4">
              ✨ Let’s Travel Smarter
            </h2>
            <p className="text-lg sm:text-xl mb-6">
              At PlanTrip.com, we believe every trip is a story waiting to be written. Let us help you write yours.
            </p>
            <a
              href="#"
              className="bg-white text-purple-600 font-semibold py-3 px-8 rounded-full shadow-lg hover:bg-gray-100 transition-all duration-300 hover:scale-105"
            >
              Plan a Trip
            </a>
          </div>
        </section>
      </div>
    </div>
  );
};

export default AboutUsPage;
