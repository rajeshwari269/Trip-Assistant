import "./home.css";
import { FaMapMarkerAlt, FaStar } from "react-icons/fa";

const places = [
  {
    id: 1,
    name: "Taj Mahal, Agra, India",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRIMq0Utl9O-TUtLMs4xn6n1q0jyqAYN0YB3w&s",
    location: "Agra, Uttar Pradesh, India",
    mapLink: "https://www.google.com/maps?q=Taj+Mahal,+Agra,+India",
    price: "₹1,100 for foreign tourists; ₹50 for Indian tourists",
    rating: "4.9/5",
  },
  {
    id: 2,
    name: "Hawa Mahal, Jaipur, India",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/Hawa_Mahal%2C_Jaipur%2C_India.jpg/1200px-Hawa_Mahal%2C_Jaipur%2C_India.jpg?20061207162736",
    location: "Jaipur, Rajasthan, India",
    mapLink: "https://www.google.com/maps?q=Hawa+Mahal,+Jaipur,+India",
    price: "₹200 for foreign tourists; ₹50 for Indian tourists",
    rating: "4.5/5.0",
  },
  {
    id: 3,
    name: "Backwaters, Kerala, India",
    image:
      "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjDYok_vkBswf-Ml0Bp7wijTSMZx2I-Y5j1gdOAybazBJA74Tud1rLRq5EZebMXkzu2QIfe2U6QKt0uxpLmEHFNko6gLE-XWiiHvDBZZCl85XqbCfeovoMd_3W5AKr3jOKDWHb-TkHqzcM/s640/Alleppy+backwaters+kerala-1.jpg",
    location: "Alleppey, Kerala, India",
    mapLink: "https://www.google.com/maps/place/Alleppey,+Kerala,+India",
    price: "Houseboat rentals starting from ₹7,000 per night",
    rating: "4.8/5",
  },
  {
    id: 4,
    name: "Beaches, Goa, India",
    image:
      "https://deih43ym53wif.cloudfront.net/large_palolem-beach-south-goa-india-shutterstock_565871314_10f6f1c9f7.jpeg",
    location: "Goa, India",
    mapLink: "https://www.google.com/maps/place/Goa,+India",
    price: "Free public access; water sports priced individually",
    rating: "4.7/5",
  },
  {
    id: 5,
    name: "Qutub Minar, Delhi, India",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/1/14/Qutub_Minar_at_Delhi.jpg/675px-Qutub_Minar_at_Delhi.jpg?20131008133659",
    location: "Delhi, India",
    mapLink: "https://www.google.com/maps/place/Qutub+Minar,+Delhi,+India",
    price: "₹600 for foreign tourists; ₹40 for Indian tourists",
    rating: "4.6/5",
  },
  {
    id: 6,
    name: "Gateway of India, Mumbai, India",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR0fcqjYesT9zhmYJVw4nbQD_7WVK1gFSvdxg&s",
    location: "Mumbai, Maharashtra, India",
    mapLink:
      "https://www.google.com/maps/place/Gateway+of+India,+Mumbai,+Maharashtra,+India",
    price: "Free public access",
    rating: "4.4/5",
  },
  {
    id: 7,
    name: "Victoria Memorial, Kolkata, India",
    image: "https://indiano.travel/wp-content/uploads/2022/02/Victoria-Memorial-1.webp",
    location: "Kolkata, West Bengal, India",
    mapLink: "https://www.google.com/maps/place/Victoria+Memorial,+Kolkata,+West+Bengal,+India",
    price: "₹500 for foreign tourists; ₹30 for Indian tourists",
    rating: "4.5/5",
  },
  {
    id: 8,
    name: "Lake Pichola, Udaipur, India",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTnQ60ScbK0RArTXZ_85aQAV2sKfpc-0bEKog&s",
    location: "Udaipur, Rajasthan, India",
    mapLink: "https://www.google.com/maps/place/Lake+Pichola,+Udaipur,+Rajasthan,+India",
    price: "Boat rides starting from ₹400 per person",
    rating: "4.7/5",
  },
  {
    id: 9,
    name: "Mysore Palace, Mysore, India",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/17/Mysore_Palace_Front_view.jpg/1200px-Mysore_Palace_Front_view.jpg",
    location: "Mysore, Karnataka, India",
    mapLink: "https://www.google.com/maps/place/Mysore+Palace,+Mysore,+Karnataka,+India",
    price: "₹200 for foreign tourists; ₹70 for Indian tourists",
    rating: "4.6/5",
  },
  {
    id: 10,
    name: "Ghats of Varanasi, Varanasi, India",
    image: "https://static.toiimg.com/thumb/width-600,height-400,msid-107570888.cms",
    location: "Varanasi, Uttar Pradesh, India",
    mapLink: "https://www.google.com/maps/place/Varanasi+Ghats,+Varanasi,+Uttar+Pradesh,+India",
    price: "Free public access; boat rides priced individually",
    rating: "4.8/5",
  },
];
const Home: React.FC = () => {
  return (
    <>
      <div className="ho-em">
        <div className="Heading">
          <h1>Plan Your Trip with us</h1>
        </div>
      </div>
      <div className="places-container">
        <h2 className="title">Our top Rated Tours and Adventures</h2>
        <div className="places-grid">
          {places.map((place) => (
            <div key={place.id} className="place-card">
              <img
                src={place.image}
                alt={place.location}
                className="place-image"
              />
              <div className="place-info">
                <h3>
                  {place.location}{" "}
                  <a
                    href={place.mapLink}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FaMapMarkerAlt className="map-icon" />
                  </a>
                </h3>
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
export default Home;