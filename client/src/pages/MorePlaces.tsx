import React, { useEffect, useState } from 'react';
import axios from 'axios';

const MorePlaces = () => {
  const [places, setPlaces] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('famous places in india');
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  // State to trigger animations after initial load
  const [isMounted, setIsMounted] = useState(false);

  const fetchPlaces = async (query = searchTerm, currentPage = 1) => {
    try {
      setLoading(true);
      // Fetching more items to better fill the screen
      const res = await axios.get(
        `http://localhost:5000/api/more-places?query=${encodeURIComponent(query)}&page=${currentPage}&per_page=16`
      );

      if (res.data.length === 0) {
        setHasMore(false);
      }

      if (currentPage === 1) {
        setPlaces(res.data);
      } else {
        setPlaces(prev => [...prev, ...res.data]);
      }

      setLoading(false);
    } catch (err) {
      console.error('Failed to fetch places:', err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPlaces(searchTerm, 1);
    // Set mounted to true after a short delay to trigger entry animations
    const timer = setTimeout(() => setIsMounted(true), 100);
    return () => clearTimeout(timer); // Cleanup timer on unmount
  }, []);

  const handleSearch = e => {
    e.preventDefault();
    setPage(1);
    setHasMore(true);
    fetchPlaces(searchTerm, 1);
  };

  const handleShowMore = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    fetchPlaces(searchTerm, nextPage);
  };

  // Helper function to get a cleaner, more searchable name from a long description.
  const getCleanPlaceName = (description) => {
    if (!description) return '';
    // Splits the description by common words and takes the first, most relevant part.
    const parts = description.split(/,| featuring| with| in| at sunset| spanning/);
    return parts[0].trim();
  };

  // This function now opens a new tab with a Google search.
  const handleShowDetails = (placeName) => {
    if (!placeName) {
      console.warn('No place name provided to handleShowDetails');
      return;
    }
    // Construct a Google search URL.
    const googleSearchUrl = `https://www.google.com/search?q=${encodeURIComponent(placeName)}`;
    // Open the URL in a new tab.
    window.open(googleSearchUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    // Main container with a dark blue background
    <div className="bg-slate-900 text-white min-h-screen p-4 sm:p-8">
      <div className="max-w-screen-xl mx-auto">
        {/* Animated Header and Search Bar */}
        <div className={`transition-all duration-700 ease-out ${isMounted ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-5'}`}>
          <div className="text-center mb-6">
            <h1 className="text-4xl sm:text-5xl font-bold mb-2">Explore Destinations</h1>
            <p className="text-lg text-gray-400">Find your next adventure</p>
          </div>
          <div className="flex justify-center mb-12">
            <form
              onSubmit={handleSearch}
              className="flex w-full max-w-lg"
            >
              <input
                type="text"
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                placeholder="Search for places..."
                className="bg-white text-gray-900 px-4 py-3 rounded-l-md w-full focus:outline-none focus:ring-2 focus:ring-yellow-500"
              />
              <button
                type="submit"
                className="px-6 py-3 bg-yellow-500 text-black font-semibold rounded-r-md hover:bg-yellow-600 transition-colors transform hover:scale-105"
              >
                Search
              </button>
            </form>
          </div>
        </div>

        {/* Image Grid */}
        {loading && places.length === 0 ? (
          <div className="text-center py-16 text-gray-400">Loading destinations...</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {places.map((place, index) => (
              // Enhanced pop-out effect and staggered entry animation
              <div
                key={place.id}
                className={`cursor-pointer group relative rounded-lg overflow-hidden shadow-lg transition-all duration-500 ease-in-out hover:shadow-2xl hover:shadow-yellow-500/30 hover:z-10 hover:-translate-y-4 ${isMounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                style={{ transitionDelay: `${isMounted ? index * 50 : 0}ms` }} // Staggered delay
                onClick={() => handleShowDetails(getCleanPlaceName(place.alt))}
              >
                <img
                  src={place.src.large || place.src.medium || place.src}
                  alt={place.alt}
                  className="w-full h-80 object-cover transform group-hover:scale-110 transition-transform duration-500"
                />
                {/* Gradient overlay for text readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent transition-all duration-300 group-hover:from-black/90"></div>
                {/* Text content positioned at the bottom, animates on hover */}
                <div className="absolute bottom-0 left-0 p-4 w-full transition-transform duration-300 transform group-hover:-translate-y-1">
                  <h2 className="font-bold text-lg text-white truncate">
                    {getCleanPlaceName(place.alt) || 'Unknown Place'}
                  </h2>
                  <p className="text-sm text-yellow-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300">View Details →</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Show More Button */}
        {hasMore && !loading && (
          <div className="text-center mt-12">
            <button
              onClick={handleShowMore}
              className="px-8 py-3 bg-yellow-500 text-black font-semibold rounded-md hover:bg-yellow-600 transition-colors transform hover:scale-105"
            >
              Show More
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default MorePlaces;
