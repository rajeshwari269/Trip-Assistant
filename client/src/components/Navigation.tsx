import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaWallet, FaGlobeAmericas, FaBars, FaUser, FaSun, FaMoon } from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";

function Navbar() {
  const navigate = useNavigate();
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("darkMode") === "true"
  );

  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    localStorage.setItem("darkMode", newMode.toString());
    document.body.classList.toggle("dark-mode", newMode);
  };

  // Function to close mobile navbar when a navigation link is clicked
  const closeMobileNav = () => {
    const navbarCollapse = document.getElementById("navbarSupportedContent");
    if (navbarCollapse && navbarCollapse.classList.contains("show")) {
      // Use the 'any' type assertion for window.bootstrap to avoid TypeScript errors
      // if you don't have the Bootstrap types installed.
      const bsCollapse = new (window as any).bootstrap.Collapse(
        navbarCollapse,
        {
          toggle: false,
        }
      );
      bsCollapse.hide();
    }
  };

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }
  }, [darkMode]);

  return (
    <>
      <nav
        className="navbar navbar-expand-lg fixed-top"
        style={{
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          backdropFilter: "blur(10px)",
          borderBottom: "1px solid rgba(255,255,255,0.1)",
          boxShadow: "0 8px 32px rgba(0,0,0,0.1)",
          zIndex: "1030",
        }}
        role="navigation"
        aria-label="Main navigation"
      >
        {/* All CSS is inlined via the <style> tag for component portability */}
        <style>
          {`
            /* Accessibility & Base Styles */
            .sr-only { position: absolute; width: 1px; height: 1px; padding: 0; margin: -1px; overflow: hidden; clip: rect(0, 0, 0, 0); white-space: nowrap; border: 0; }
            .navbar-nav .nav-link:focus, .action-btn:focus, .dropdown-toggle:focus, .dropdown-item:focus, .navbar-brand:focus { outline: 2px solid #FAD700 !important; outline-offset: 2px !important; box-shadow: 0 0 0 0.2rem rgba(250, 215, 0, 0.25) !important; }
            .skip-link { position: absolute; top: -40px; left: 6px; background: #000; color: #fff; padding: 8px; text-decoration: none; border-radius: 4px; z-index: 9999; }
            .skip-link:focus { top: 6px; }

            /* Media Preference Queries */
            @media (prefers-contrast: high) {
              .navbar { background: #000 !important; border-bottom: 2px solid #fff !important; }
              .navbar-nav .nav-link { color: #fff !important; background: transparent !important; }
              .navbar-nav .nav-link:hover, .navbar-nav .nav-link:focus { background: #fff !important; color: #000 !important; }
            }
            @media (prefers-reduced-motion: reduce) {
              .navbar, .logo-icon, .nav-link, .action-btn, .logo-container:hover, .place-card:hover { animation: none !important; transition: none !important; transform: none !important; }
            }

            /* Logo & Brand Styling */
            .logo-container { display: flex; align-items: center; justify-content: center; transition: transform 0.3s ease; }
            .logo-container:hover { transform: scale(1.05); }
            .logo-icon { position: relative; filter: drop-shadow(0 2px 8px rgba(0,0,0,0.2)); animation: logoFloat 4s ease-in-out infinite; }
            .logo-icon svg { transition: transform 0.3s ease; }
            .logo-container:hover .logo-icon svg { transform: rotate(5deg); }
            .navbar-brand { display: flex; align-items: center; text-decoration: none; transition: all 0.3s ease; }

            /* Nav Link Styling */
            .navbar-nav .nav-link { color: #fff !important; font-size: 1.1rem; font-weight: 500; padding: 0.8rem 1.3rem; border-radius: 12px; margin: 0 0.3rem; transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1); position: relative; overflow: hidden; background: rgba(255,255,255,0.06); backdrop-filter: blur(10px); border: none; box-shadow: 0 2px 8px rgba(0,0,0,0.05); animation: fadeInUp 0.6s ease-out; }
            .navbar-nav .nav-link::before { content: ''; position: absolute; top: 0; left: -100%; width: 100%; height: 100%; background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent); transition: left 0.5s; }
            .navbar-nav .nav-link:hover::before { left: 100%; }
            .nav-item:nth-child(1) .nav-link { animation-delay: 0.1s; }
            .nav-item:nth-child(2) .nav-link { animation-delay: 0.2s; }
            .nav-item:nth-child(3) .nav-link { animation-delay: 0.3s; }
            .nav-item:nth-child(4) .nav-link { animation-delay: 0.4s; }
            .nav-item:nth-child(5) .nav-link { animation-delay: 0.5s; }
            .nav-item:nth-child(6) .nav-link { animation-delay: 0.6s; }
            .nav-item:nth-child(7) .nav-link { animation-delay: 0.7s; }
            .navbar-nav .nav-link.active, .navbar-nav .nav-link:focus, .navbar-nav .nav-link:hover { color: #2d3748 !important; background: linear-gradient(135deg, #FFD700 0%, #FFA500 100%) !important; font-weight: 600; box-shadow: 0 8px 25px rgba(255,215,0,0.3); transform: translateY(-2px); border: none; }
            
            /* Toggler & Action Buttons */
            .navbar-toggler { border: none; padding: 0.5rem; border-radius: 10px; background: rgba(255,255,255,0.08); backdrop-filter: blur(10px); border: 1px solid rgba(255,255,255,0.12); }
            .navbar-toggler:focus { box-shadow: 0 0 0 0.2rem rgba(255,255,255,0.25); }
            .navbar-toggler-icon { background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 30 30'%3e%3cpath stroke='rgba%28255, 255, 255, 0.9%29' stroke-linecap='round' stroke-miterlimit='10' stroke-width='2' d='m4 7h22M4 15h22M4 23h22'/%3e%3c/svg%3e"); }
            .action-btn { background: rgba(255,255,255,0.1); backdrop-filter: blur(10px); border: none; border-radius: 12px; padding: 0.6rem; transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1); box-shadow: 0 4px 15px rgba(0,0,0,0.06); min-height: 44px; min-width: 44px; }
            .action-btn:hover { background: rgba(255,255,255,0.25); transform: translateY(-2px) scale(1.05); box-shadow: 0 8px 25px rgba(0,0,0,0.15); }
            .action-btn:active { transform: translateY(0) scale(0.95); }
            .profile-icon { width: 35px; height: 35px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); border: 2px solid rgba(255,255,255,0.3); }

            /* Dropdown Menu */
            .dropdown-menu { background: rgba(255,255,255,0.95); backdrop-filter: blur(15px); border: 1px solid rgba(255,255,255,0.2); border-radius: 15px; box-shadow: 0 10px 40px rgba(0,0,0,0.1); padding: 0.5rem; }
            .dropdown-item { border-radius: 8px; margin: 0.2rem 0; transition: all 0.2s ease; min-height: 44px; display: flex; align-items: center; }
            .dropdown-item:hover { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; transform: translateX(5px); }
            
            /* Responsive Styles */
            @media (max-width: 991.98px) {
              .navbar-collapse { background: rgba(255,255,255,0.04); backdrop-filter: blur(15px); border-radius: 0 0 15px 15px; margin-top: 0.5rem; border: 1px solid rgba(255,255,255,0.08); border-top: none; }
              .navbar-collapse.show { animation: mobileMenuSlide 0.3s ease-out; }
              .navbar-nav { width: 100%; }
              .navbar-nav .nav-link { margin: 0.5rem 0; text-align: center; }
            }

            /* Animations */
            @keyframes logoFloat { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-2px); } }
            @keyframes fadeInUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
            @keyframes mobileMenuSlide { from { opacity: 0; transform: translateY(-10px) scale(0.95); } to { opacity: 1; transform: translateY(0) scale(1); } }
            .navbar { animation: navbarLoad 0.8s ease-out; }
            @keyframes navbarLoad { from { opacity: 0; transform: translateY(-100%); } to { opacity: 1; transform: translateY(0); } }
          `}
        </style>

        <div className="container-fluid">
          <Link className="navbar-brand" to="/" aria-label="Trip Assistant - Go to homepage">
            <div className="logo-container">
              <div className="logo-icon">
                <svg
                  width="40"
                  height="40"
                  viewBox="0 0 40 40"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                  focusable="false"
                >
                  <defs>
                    <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#667eea" />
                      <stop offset="100%" stopColor="#764ba2" />
                    </linearGradient>
                    <linearGradient id="gradient2" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#FFD700" />
                      <stop offset="100%" stopColor="#FFA500" />
                    </linearGradient>
                  </defs>
                  <rect x="8" y="8" width="24" height="24" rx="3" fill="url(#gradient1)" stroke="rgba(255,255,255,0.3)" strokeWidth="1"/>
                  <path d="M12 16h16 M12 20h16 M12 24h16 M16 12v16 M20 12v16 M24 12v16" stroke="rgba(255,255,255,0.2)" strokeWidth="0.5" />
                  <circle cx="20" cy="18" r="2" fill="url(#gradient2)" />
                  <path d="M20 20v6" stroke="url(#gradient2)" strokeWidth="2" strokeLinecap="round" />
                  <circle cx="28" cy="12" r="3" fill="rgba(255,255,255,0.1)" stroke="rgba(255,255,255,0.3)" strokeWidth="0.5"/>
                  <path d="M28 9v6M25 12h6" stroke="rgba(255,255,255,0.6)" strokeWidth="1" strokeLinecap="round" />
                  <path d="M12 28c2-2 4-1 8-1s6-1 8 1" stroke="url(#gradient2)" strokeWidth="2" strokeLinecap="round" fill="none"/>
                </svg>
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
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            {/* --- Nav Items --- */}
            <ul
              className="navbar-nav mx-auto mb-2 mb-lg-0"
              role="menubar"
              aria-label="Main menu"
            >
              <li className="nav-item" role="none">
                <Link className="nav-link" to="/" onClick={closeMobileNav} role="menuitem" aria-label="Home page">
                  <i className="fas fa-home me-2 d-lg-none" aria-hidden="true"></i>Home
                </Link>
              </li>
              <li className="nav-item" role="none">
                 <Link className="nav-link" to="/places" onClick={closeMobileNav} role="menuitem" aria-label="Places to visit">
                  <i className="fas fa-map-marker-alt me-2 d-lg-none" aria-hidden="true"></i>Places
                </Link>
              </li>
              <li className="nav-item" role="none">
                <Link className="nav-link" to="/find-friends" onClick={closeMobileNav} role="menuitem" aria-label="Find Friends">
                  <i className="fas fa-users me-2 d-lg-none" aria-hidden="true"></i>Find Friends
                </Link>
              </li>
              <li className="nav-item" role="none">
                <Link className="nav-link" to="/more-places" onClick={closeMobileNav} role="menuitem" aria-label="Famous Places">
                  <i className="fas fa-star me-2 d-lg-none" aria-hidden="true"></i>Famous Places
                </Link>
              </li>
              <li className="nav-item" role="none">
                <Link className="nav-link" to="/trip-budget" onClick={closeMobileNav} role="menuitem" aria-label="Trip Budget Estimator">
                  <FaWallet className="me-2 d-lg-none" aria-hidden="true" />Budget Estimator
                </Link>
              </li>
              
              {/* --- RESOLVED SECTION --- */}
              <li className="nav-item" role="none">
                <Link className="nav-link" to="/currency" onClick={closeMobileNav} role="menuitem" aria-label="Currency Converter">
                  <FaWallet className="me-2 d-lg-none" aria-hidden="true" />Currency Converter
                </Link>
              </li>
              {/* --- END RESOLVED SECTION --- */}

              <li className="nav-item" role="none">
                <a className="nav-link" href="/about" onClick={closeMobileNav} role="menuitem" aria-label="About Us">
                  <i className="fas fa-info-circle me-2 d-lg-none" aria-hidden="true"></i>About Us
                </a>
              </li>
            </ul>

            {/* --- Right Side Icons --- */}
            <div className="d-flex align-items-center">
              <button
                className="btn action-btn d-flex align-items-center justify-content-center me-2"
                onClick={toggleDarkMode}
                aria-label={darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
                type="button"
              >
                {darkMode ? (
                  <FaSun className="text-warning" size={18} aria-hidden="true" />
                ) : (
                  <FaMoon className="text-light" size={18} aria-hidden="true" />
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
                  <FaBars className="text-light me-2 d-none d-lg-inline" size={16} aria-hidden="true"/>
                  <div className="rounded-circle d-flex align-items-center justify-content-center profile-icon" role="img" aria-label="User profile">
                    <FaUser className="text-white" size={16} aria-hidden="true" />
                  </div>
                </button>
                <ul
                  className="dropdown-menu dropdown-menu-end"
                  role="menu"
                  aria-label="User account menu"
                >
                  <li role="none">
                    <button className="dropdown-item fw-bold" onClick={() => { closeMobileNav(); navigate("/auth", { state: { isLogin: false } }); }} role="menuitem" type="button">
                      <i className="fas fa-user-plus me-2" aria-hidden="true"></i>Sign up
                    </button>
                  </li>
                  <li role="none">
                    <button className="dropdown-item" onClick={() => { closeMobileNav(); navigate("/auth", { state: { isLogin: true } }); }} role="menuitem" type="button">
                      <i className="fas fa-sign-in-alt me-2" aria-hidden="true"></i>Log in
                    </button>
                  </li>
                  <li role="separator">
                    <hr className="my-2" />
                  </li>
                  <li role="none">
                    <Link className="dropdown-item" to="/help" onClick={closeMobileNav} role="menuitem">
                      <i className="fas fa-question-circle me-2" aria-hidden="true"></i>Help Centre
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