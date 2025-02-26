import { useState,useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css"; // Ensure Bootstrap is imported

function Auth() {
  const location=useLocation();
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();
// When the component loads, check if we received isLogin from Navbar
useEffect(() => {
  if (location.state?.isLogin !== undefined) {
    setIsLogin(location.state.isLogin);
  }
}, [location]);
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(isLogin ? "Logging in..." : "Signing up...");
    navigate("/");
  };

  return (
    <div
      className="vh-100 d-flex justify-content-center align-items-center bg-image"
      style={{
        backgroundImage: "url('src/images/bg-auth.jpg')", // Replace with actual path
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div
        className="card p-4 rounded-4 shadow-lg bg-light"
        style={{
          maxWidth: "400px",
          width: "100%",
          border: "2px solid #ff4081",
        }}
      >
        <h2 className="text-center mb-4 text-dark">
          {isLogin ? "Login" : "Sign Up"}
        </h2>

        <form onSubmit={handleSubmit}>
          {/* Email Field */}
          <div className="mb-3">
            <label className="form-label text-dark">Email address</label>
            <input
              type="email"
              className="form-control border-danger"
              placeholder="Enter your email"
              required
            />
          </div>

          {/* Password Field */}
          <div className="mb-3">
            <label className="form-label text-dark">Password</label>
            <input
              type="password"
              className="form-control border-danger"
              placeholder="Enter your password"
              required
            />
          </div>

          {/* Extra Field for Signup */}
          {!isLogin && (
            <div className="mb-3">
              <label className="form-label text-dark">Confirm Password</label>
              <input
                type="password"
                className="form-control border-danger"
                placeholder="Confirm your password"
                required
              />
            </div>
          )}

          {/* Submit Button */}
          <button type="submit" className="btn btn-danger w-100 fw-bold">
            {isLogin ? "Login" : "Sign Up"}
          </button>
        </form>

        {/* Toggle Button */}
        <p className="mt-3 text-center">
          {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
          <button
            className="btn btn-link text-danger fw-bold"
            onClick={() => setIsLogin(!isLogin)}
          >
            {isLogin ? "Sign Up" : "Login"}
          </button>
        </p>
      </div>
    </div>
  );
}

export default Auth;
