import { useNavigate } from "react-router-dom";
import { FaGlobeAmericas, FaBars, FaUser } from "react-icons/fa";
function Navbar() {
  const navigate = useNavigate();
  return (
    <>
      <nav
        className="navbar navbar-expand-lg"
        style={{
          backgroundColor: "#45526e",
          background: "smooth",
          scrollBehavior: "smooth",
          zIndex: "20",
        }}
      >
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
            <FaGlobeAmericas size={50} color="#FFD700"></FaGlobeAmericas>
          </a>
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
                <a className="nav-link  hover-nav" aria-current="page" href="/">
                  Home
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link hover-nav" href="/Places">
                  Places
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link hover-nav" href="find-friends">
                  Find Friends
                </a>
              </li>
            </ul>
            {/* Profile Dropdown */}
            <div className="dropdown">
              <button
                className="btn border rounded-pill d-flex justify-content-space-around p-2 shadow-sm"
                type="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
                style={{ backgroundColor: "#FAc700", width: "70px" }}
              >
                <FaBars
                  className="text-secondary me-2"
                  style={{ color: "white !important", fontSize:"20px"}}
                />
                <div className="rounded-circle bg-secondary d-flex align-items-center justify-content-space-around profile-icon">
                  <FaUser
                    className="text-white"
                    style={{
                      width: "25px",
                      height: "25px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      borderRadius: "50%",
                      backgroundColor: "gray",
                    }}
                  />
                </div>
              </button>

              {/* Dropdown Menu */}
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
                  <a className="dropdown-item" href="#">
                    Help Centre
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </nav>
      <style>
        {`
                  .hover-nav {
                    transition: color 0.3s ease-in-out;
                    color:white;
                  }
                  .hover-nav:hover {
                    color: #FAD700;
                    text-decoration: none;
                  }
                `}
      </style>
    </>
  );
}

export default Navbar;
