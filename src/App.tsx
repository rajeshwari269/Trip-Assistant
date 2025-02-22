import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navigation";
import Home from "./pages/home";
import About from "./pages/About";
import Places from "./pages/Places";
import Contact from "./pages/Contact";
import FindFriends from "./pages/FindFriends";

function App() {
  return (
    <>
    <Navbar />
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/places" element={<Places />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/find-friends" element={<FindFriends />} />
      </Routes>
    </Router>
    </>
  );
}

export default App;
