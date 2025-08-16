import { useEffect, useState } from "react";
import axios from "axios";
import { FaMapMarkerAlt, FaStar, FaSearch } from "react-icons/fa";
import "../components/placeCard.css";
import { handleError } from "../utils/errorHandlerToast";
import LoadingState from "../components/LoadingState";
import ErrorState from "../components/ErrorState";
import { isOnline } from "../utils/networkUtils";

interface Place {
  id: number;
  src: string;
  alt: string;
  photographer: string;
  location: string;
  city: string;
  attraction: string;
  description: string;
  price: string;
  rating: string;
}

const MorePlaces = () => {
  const [places, setPlaces] = useState<Place[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("famous places");
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isMounted, setIsMounted] = useState(false);
  const [darkMode] = useState(document.body.classList.contains("dark-mode"));
  const [error, setError] = useState<string | null>(null);

  const apiBaseUrl =
    import.meta.env?.VITE_API_BASE_URL || "http://localhost:5000";

  const fetchPlaces = async (query = searchTerm, currentPage = 1) => {
    // Reset error state
    setError(null);

    // Check network connectivity first
    if (!isOnline()) {
      setError(
        "No internet connection. Please check your network and try again."
      );
      setLoading(false);
      return;
    }

    try {
      if (currentPage === 1) {
        setLoading(true);
      }

      const res = await axios.get(
        `${apiBaseUrl}/api/more-places?query=${encodeURIComponent(
          query
        )}&page=${currentPage}&per_page=12`,
        { timeout: 10000 } // Set a reasonable timeout
      );

      // Make sure res.data is an array
      const placesData = Array.isArray(res.data) ? res.data : [];

      if (placesData.length === 0) {
        setHasMore(false);
      }

      if (currentPage === 1) {
        setPlaces(placesData);
      } else {
        setPlaces((prev) => [...prev, ...placesData]);
      }

      setLoading(false);
    } catch (err) {
      const errorMessage = "Failed to load places. Please try again.";
      setError(errorMessage);
      handleError(err, errorMessage);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPlaces(searchTerm, 1);
    const timer = setTimeout(() => setIsMounted(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setPage(1);
    setHasMore(true);
    setPlaces([]);
    fetchPlaces(searchTerm, 1);
  };

  const handleShowMore = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    fetchPlaces(searchTerm, nextPage);
  };

  const getCleanPlaceName = (description: string): string => {
    if (!description) return "Beautiful Destination";
    const parts = description.split(
      /,| featuring| with| in| at sunset| spanning/
    );
    return parts[0].trim();
  };

  const handleShowDetails = (placeName: string): void => {
    const googleSearchUrl = `https://www.google.com/search?q=${encodeURIComponent(
      placeName
    )}`;
    window.open(googleSearchUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="place">
      <div
        className={
          darkMode ? "places-container bg-dark text-light" : "places-container"
        }
      >
        <h2 className={darkMode ? "title bg-dark text-light" : "title"}>
          Explore More Destinations
        </h2>

        <div className="d-flex justify-content-center mb-5">
          <form
            onSubmit={handleSearch}
            className="d-flex w-100"
            style={{ maxWidth: "600px" }}
          >
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search for places..."
              className="form-control form-control-lg"
            />
            <button type="submit" className="btn btn-primary btn-lg ms-2">
              <FaSearch />
            </button>
          </form>
        </div>

        {error ? (
          <ErrorState
            message={error}
            onRetry={() => fetchPlaces(searchTerm, 1)}
            className="py-5"
          />
        ) : loading && places.length === 0 ? (
          <LoadingState
            message="Loading destinations..."
            size="lg"
            className="py-5"
          />
        ) : (
          <div
            className={
              darkMode ? "places-grid bg-dark text-light" : "places-grid"
            }
          >
            {Array.isArray(places) && places.length > 0 ? (
              places.map((place, index) => (
                <div
                  key={`${place.id}-${page}-${index}`}
                  className={`place-card ${isMounted ? "fade-in" : ""}`}
                  style={{ animationDelay: `${isMounted ? index * 50 : 0}ms` }}
                  onClick={() =>
                    handleShowDetails(getCleanPlaceName(place.alt))
                  }
                >
                  <img
                    src={place.src}
                    alt={place.alt}
                    className="place-image"
                  />
                  <div className="place-info">
                    <h3>
                      {getCleanPlaceName(place.alt)}
                      <a
                        href={`https://www.google.com/maps?q=${encodeURIComponent(
                          getCleanPlaceName(place.alt)
                        )}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <FaMapMarkerAlt className="map-icon" />
                      </a>
                    </h3>
                    <p className="price">Photographer: {place.photographer}</p>
                    <p className="rating">
                      <FaStar style={{ color: "#FAD700" }} /> View More
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <div className="no-results">
                <p>No places found. Try a different search term.</p>
              </div>
            )}
          </div>
        )}

        {hasMore && !loading && (
          <div className="text-center mt-5">
            <button onClick={handleShowMore} className="btn btn-warning btn-lg">
              Show More
            </button>
          </div>
        )}
      </div>
      <style>{`
        .fade-in {
            opacity: 0;
            transform: translateY(20px);
            animation: fadeInAnimation 0.5s ease-out forwards;
        }
        @keyframes fadeInAnimation {
            from {
                opacity: 0;
                transform: translateY(20px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
      `}</style>
    </div>
  );
};

export default MorePlaces;
