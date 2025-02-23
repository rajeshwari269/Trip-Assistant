// import {Fragment} from "react";  this can be used to wrap element into single component or just keep (<> </>) directly
import { useNavigate } from "react-router-dom";
function Navbar() {
  const navigate = useNavigate();
  return (
    <>
      <nav
        className="navbar navbar-expand-lg"
        style={{ backgroundColor: "#F14999",position:"fixed",width:"100vw",zIndex:"20"}}
      >
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
            <img
              src="src/images/logo1.jpg"
              alt="logo"
              style={{
                width: "50px",
                height: "50px",
                padding: "0px",
                margin: "0px",
                borderRadius: "50%",
              }}
            />
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
                <a className="nav-link active" aria-current="page" href="/">
                  Home
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/about">
                  About
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/Places">
                  Places
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/contact">
                  Contact Us
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="find-friends">
                  Find Friends
                </a>
              </li>
            </ul>
            <form className="d-flex justify-content-center" role="search">
              <button
                className="btn btn-outline-light"
                style={{ width: "70px", margin: "10px" }}
                onClick={() => navigate("/auth")}
              >
                Login
              </button>
              <div
                className="input-group"
                style={{ width: "180px", margin: "10px" }}
              >
                <span className="input-group-text">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-search"
                    viewBox="0 0 16 16"
                  >
                    <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
                  </svg>
                </span>
                <input
                  className="form-control"
                  type="search"
                  placeholder="Search"
                  aria-label="Search"
                />
              </div>
            </form>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
