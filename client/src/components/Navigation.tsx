import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Home,
  MapPin,
  Users,
  Star,
  Calculator,
  DollarSign,
  Menu,
  User,
  Sun,
  Moon,
} from "lucide-react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "./Navigation.css";
import { initializeBootstrap } from "../utils/bootstrapInit";
import Logo from "./Logo";

function Navbar() {
  const navigate = useNavigate();
  const navCollapseRef = useRef<HTMLDivElement>(null);
  const [darkMode, setDarkMode] = useState(() => {
    try {
      return localStorage.getItem("darkMode") === "true";
    } catch {
      return false;
    }
  });

  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    try {
      localStorage.setItem("darkMode", newMode.toString());
    } catch {
      console.warn("Could not save dark mode preference");
    }
    document.body.classList.toggle("dark-mode", newMode);
  };

  // Function to close mobile navbar when a navigation link is clicked
  const closeMobileNav = () => {
    try {
      const navbarCollapse = navCollapseRef.current;
      if (navbarCollapse && navbarCollapse.classList.contains("show")) {
        // Check if Bootstrap is available
        if (typeof window !== 'undefined' && window.bootstrap) {
          const bsCollapse = new window.bootstrap.Collapse(
            navbarCollapse,
            { toggle: false }
          );
          bsCollapse.hide();
        } else {
          // Fallback: manually remove the show class
          navbarCollapse.classList.remove("show");
        }
      }
    } catch (error) {
      console.warn("Could not close mobile navigation:", error);
    }
  };

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }
  }, [darkMode]);

  // Initialize Bootstrap only once on mount
  useEffect(() => {
    initializeBootstrap();
  }, []);

  return (
    <>
      <nav
        className="navbar navbar-expand-lg fixed-top"
        style={{
          backgroundColor: "#1a237e",
          backdropFilter: "none",
          borderBottom: "none",
          boxShadow: "none",
          zIndex: "1030",
        }}
        role="navigation"
        aria-label="Main navigation"
      >


        <div className="container-fluid">
          <Link
            className="navbar-brand"
            to="/"
            aria-label="Trip Assistant - Go to homepage"
          >
            <div className="logo-container">
              <div className="logo-icon">
                <Logo />
              </div>
            </div>
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
            <span className="navbar-toggler-icon"> </span>
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent" ref={navCollapseRef}>
            {/* --- Nav Items --- */}
            <ul
              className="navbar-nav mx-auto mb-2 mb-lg-0"
              role="menubar"
              aria-label="Main menu"
            >
              <li className="nav-item" role="none">
                <Link
                  className="nav-link"
                  to="/"
                  onClick={closeMobileNav}
                  role="menuitem"
                  aria-label="Home page"
                >
                  <Home className="nav-icon" size={20} aria-hidden="true" />
                  <span className="nav-text">Home</span>
                </Link>
              </li>
              <li className="nav-item" role="none">
                <Link
                  className="nav-link"
                  to="/places"
                  onClick={closeMobileNav}
                  role="menuitem"
                  aria-label="Places to visit"
                >
                  <MapPin className="nav-icon" size={20} aria-hidden="true" />
                  <span className="nav-text">Places</span>
                </Link>
              </li>
              <li className="nav-item" role="none">
                <Link
                  className="nav-link"
                  to="/find-friends"
                  onClick={closeMobileNav}
                  role="menuitem"
                  aria-label="Find Friends"
                >
                  <Users className="nav-icon" size={20} aria-hidden="true" />
                  <span className="nav-text">Friends</span>
                </Link>
              </li>
              <li className="nav-item" role="none">
                <Link
                  className="nav-link"
                  to="/more-places"
                  onClick={closeMobileNav}
                  role="menuitem"
                  aria-label="Famous Places"
                >
                  <Star className="nav-icon" size={20} aria-hidden="true" />
                  <span className="nav-text">Famous</span>
                </Link>
              </li>
              <li className="nav-item" role="none">
                <Link
                  className="nav-link"
                  to="/trip-budget"
                  onClick={closeMobileNav}
                  role="menuitem"
                  aria-label="Trip Budget Estimator"
                >
                  <Calculator
                    className="nav-icon"
                    size={20}
                    aria-hidden="true"
                  />
                  <span className="nav-text">Budget</span>
                </Link>
              </li>
              <li className="nav-item" role="none">
                <Link
                  className="nav-link"
                  to="/currency"
                  onClick={closeMobileNav}
                  role="menuitem"
                  aria-label="Currency Converter"
                >
                  <DollarSign
                    className="nav-icon"
                    size={20}
                    aria-hidden="true"
                  />
                  <span className="nav-text">Currency</span>
                </Link>
              </li>
            </ul>

            {/* --- Right Side Icons --- */}
            <div className="d-flex align-items-center">
              <button
                className="btn action-btn d-flex align-items-center justify-content-center me-2"
                onClick={toggleDarkMode}
                aria-label={
                  darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"
                }
                type="button"
              >
                {darkMode ? (
                  <Sun className="text-warning" size={18} aria-hidden="true" />
                ) : (
                  <Moon className="text-light" size={18} aria-hidden="true" />
                )}
              </button>

              <div className="dropdown">
                <button
                  className="btn action-btn d-flex align-items-center"
                  type="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                  aria-label="User menu"
                  aria-haspopup="true"
                >
                  <Menu
                    className="text-light me-2 d-none d-lg-inline"
                    size={16}
                    aria-hidden="true"
                  />
                  <div
                    className="rounded-circle d-flex align-items-center justify-content-center profile-icon"
                    role="img"
                    aria-label="User profile"
                  >
                    <User className="text-white" size={16} aria-hidden="true" />
                  </div>
                </button>
                <ul
                  className="dropdown-menu dropdown-menu-end"
                  role="menu"
                  aria-label="User account menu"
                >
                  <li role="none">
                    <button
                      className="dropdown-item fw-bold dropdown-item-white"
                      onClick={() => {
                        closeMobileNav();
                        navigate("/auth", { state: { isLogin: false } });
                      }}
                      role="menuitem"
                      type="button"
                    >
                      <i
                        className="fas fa-user-plus me-2"
                        aria-hidden="true"
                      ></i>
                      Sign up
                    </button>
                  </li>
                  <li role="none">
                    <button
                      className="dropdown-item dropdown-item-white"
                      onClick={() => {
                        closeMobileNav();
                        navigate("/auth", { state: { isLogin: true } });
                      }}
                      role="menuitem"
                      type="button"
                    >
                      <i
                        className="fas fa-sign-in-alt me-2"
                        aria-hidden="true"
                      ></i>
                      Log in
                    </button>
                  </li>
                  <li role="separator">
                    <hr className="my-2" />
                  </li>
                  <li role="none">
                    <Link
                      className="dropdown-item"
                      to="/help"
                      onClick={closeMobileNav}
                      role="menuitem"
                    >
                      <i
                        className="fas fa-question-circle me-2"
                        aria-hidden="true"
                      ></i>
                      Help Centre
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
