import { FaMapMarkerAlt, FaStar } from "react-icons/fa";
import "./Places.css";
import ChildNavbar from "../components/childnavbar"
import SearchBar from "../components/searchbar"; 
const places = [
  {
    id: 1,
    image: "src/images/home1.jpg",
    location: "Ellijay, Georgia, US",
    distance: "101 km away",
    date: "29 Mar – 3 Apr",
    price: "₹26,432 night",
    rating: 5.0,
  },
  {
    id: 2,
    image: "src/images/home2.jpg",
    location: "Cherry Log, Georgia, US",
    distance: "117 km away",
    date: "23–28 Mar",
    price: "₹26,996 night",
    rating: 5.0,
  },
  {
    id: 3,
    image: "src/images/home3.jpg",
    location: "Blue Ridge, Georgia, US",
    distance: "113 km away",
    date: "2–7 Mar",
    price: "₹17,407 night",
    rating: 5.0,
  },
];

const Places: React.FC = () => {
  return (
    <>
    <SearchBar /> 
    <ChildNavbar/>
    <div className="places-container">
      <h2 className="title">Explore Amazing Places</h2>
      <div className="places-grid">
        {places.map((place) => (
          <div key={place.id} className="place-card">
            <img src={place.image} alt={place.location} className="place-image" />
            <div className="place-info">
              <h3>
                <a href="#"><FaMapMarkerAlt /></a> {place.location}
              </h3>
              <p>{place.distance}</p>
              <p>{place.date}</p>
              <p className="price">{place.price}</p>
              <p className="rating">
                <FaStar /> {place.rating}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
    </>
  );
};

export default Places;
