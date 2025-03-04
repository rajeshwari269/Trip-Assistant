import "./home.css";
import PlaceCard from "../components/placeCard";

const Home: React.FC = () => {
  return (
    <div className="home">
    <div className="places">
      <div className="ho-em">
        <div className="Heading">
          <h1>Plan Your Trip with Us</h1>
        </div>
      </div>
      <PlaceCard/>
    </div>
    </div>
  );
};
export default Home;
