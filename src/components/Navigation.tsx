// import {Fragment} from "react";  this can be used to wrap element into single component or just keep (<> </>) directly
function Navbar() {
  return (
    <>
    <nav
      className="navbar navbar-expand-lg"
      style={{ backgroundColor: "#F14999" }}
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
            {/* <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  href="#"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  MoreDetails
                </a>
                <ul className="dropdown-menu">
                  <li>
                    <a className="dropdown-item" href="#">
                      Action
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      Another action
                    </a>
                  </li> */}
            {/* <li>
                    <hr className="dropdown-divider" />
                  </li>
                </ul>
              </li> */}
          </ul>
          <form className="d-flex" role="search">
            <input
              className="form-control me-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
            />
            <button className="btn btn-outline-light" type="submit">
              Search
            </button>
          </form>
        </div>
      </div>
    </nav>
    </>
  );
}

export default Navbar;
