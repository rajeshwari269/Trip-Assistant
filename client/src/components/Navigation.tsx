import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom"; // Use Link for navigation
import {
  FaGlobeAmericas,
  FaBars,
  FaUser,
  FaGlobe,
  FaSun,
  FaMoon,
} from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import { useTranslation } from "react-i18next";

function Navbar() {
  const navigate = useNavigate();
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("darkMode") === "true"
  );
  const { i18n } = useTranslation();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    localStorage.setItem("language", lng);
  };

  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    localStorage.setItem("darkMode", newMode.toString());
    document.body.classList.toggle("dark-mode", newMode);
  };

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }
  }, [darkMode]);

  useEffect(() => {
    const savedLang = localStorage.getItem("language");
    if (savedLang) {
      i18n.changeLanguage(savedLang);
    }
  }, []);

  return (
    <>
      {/* --- THIS IS THE FIX --- */}
      {/* The "fixed-top" class from Bootstrap makes the navbar
          stay at the top of the screen when you scroll. */}
      <nav
        className="navbar navbar-expand-lg fixed-top"
        style={{
          backgroundColor: "#45526e",
          zIndex: "1030", // Ensure it's above other content
        }}
      >
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            <FaGlobeAmericas size={50} color="#FFD700"></FaGlobeAmericas>
          </Link>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link" to="/">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/places">
                  Places
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/find-friends">
                  Find Friends
                </Link>
              </li>
               <li className="nav-item">
                <Link className="nav-link" to="/more-places">
                  Famous Places
                </Link>
              </li>
            </ul>
            <style>
              {`.nav-link{
          color:white;
           }
           .nav-link:hover
           {
          color:#FAD700  !important;
          transition: 0.3s ease-in-out;}`}
            </style>
            <button
              className="btn border rounded-circle d-flex align-items-center p-2 shadow-sm me-3"
              onClick={toggleDarkMode}
            >
              {darkMode ? (
                <FaSun className="text-warning" />
              ) : (
                <FaMoon className="text-light" />
              )}
            </button>
            <div className="dropdown me-3">
              <button
                className="btn border rounded-circle d-flex align-items-center p-2 shadow-sm"
                type="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <FaGlobe className="text-light" />
              </button>
              <div
                className="dropdown-menu dropdown-menu-end p-3"
                style={{ width: "300px" }}
              >
                <h6 className="dropdown-header text-muted">
                  Suggested languages and regions
                </h6>
                <ul className="list-unstyled">
                  <li>
                    <button
                      className="dropdown-item"
                      onClick={() => changeLanguage("en")}
                    >
                      English - United States
                    </button>
                  </li>
                  <li>
                    <button
                      className="dropdown-item"
                      onClick={() => changeLanguage("hi")}
                    >
                      हिंदी - भारत
                    </button>
                  </li>
                </ul>
              </div>
            </div>
            <div className="dropdown">
              <button
                className="btn border rounded-pill d-flex align-items-center p-2 shadow-sm"
                type="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <FaBars className="text-secondary me-2" />
                <div className="rounded-circle bg-secondary d-flex align-items-center justify-content-center profile-icon">
                  <FaUser className="text-white" />
                </div>
              </button>
              <ul className="dropdown-menu dropdown-menu-end shadow-sm">
                <li>
                  <button
                    className="dropdown-item fw-bold"
                    onClick={() =>
                      navigate("/auth", { state: { isLogin: false } })
                    }
                  >
                    Sign up
                  </button>
                </li>
                <li>
                  <button
                    className="dropdown-item"
                    onClick={() =>
                      navigate("/auth", { state: { isLogin: true } })
                    }
                  >
                    Log in
                  </button>
                </li>
                <hr />
                <li>
                  <Link className="dropdown-item" to="/help">
                    Help Centre
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
