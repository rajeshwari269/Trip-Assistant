import React from "react";
import { useState, useEffect, FormEvent } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { handleError } from "../utils/errorHandlerToast";
import { showError, showSuccess } from "../utils/toastUtils";

function Auth() {
  const location = useLocation();
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [mobileNo, setMobileNO] = useState("");
  const [userName, setUserName] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (location.state?.isLogin !== undefined) {
      setIsLogin(location.state.isLogin);
    }
  }, [location]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    
    if (!isLogin && password !== confirmPassword) {
      showError("Passwords do not match!");
      return;
    }

    const url = isLogin ? "http://localhost:5000/login" : "http://localhost:5000/signup";

    isLogin ? console.log("Logging in...") : console.log("Signing up..." + userName + mobileNo);
    const payload = { email, password, mobileNo, userName};

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
      
      const data = await response.json();
      if (response.ok) {
        showSuccess(isLogin ? "Login Successful" : "Signup Successful");
        console.log(data);
        navigate("/places");
      } else {
        showError(data.message || "An error occurred");
      }
    } catch (error) {
      handleError(error, "Network error, please try again.");
    }
  };

  return (
    <div
      className="vh-100 d-flex justify-content-center align-items-center bg-image"
      style={{
        backgroundImage: "url('src/images/bg-auth.jpg')",
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
          background: "linear-gradient(135deg, #d3be52ff 0%, #d4527bff 100%)" // changed background
        }}
      >
        <h2 className="text-center mb-4 text-dark">{isLogin ? "Login" : "Sign Up"}</h2>
        
        <form onSubmit={handleSubmit}>
        
        {!isLogin && (
            <div className="mb-3">
              <label className="form-label text-dark">User Name</label>
              <input
                type="text"
                className="form-control border-danger"
                placeholder="Enter your UserName"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                required
              />
            </div>
          )}


          <div className="mb-3">
            <label className="form-label text-dark">Email address</label>
            <input
              type="email"
              className="form-control border-danger"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {!isLogin && (
            <div className="mb-3">
              <label className="form-label text-dark">Phone No.</label>
              <input
                type="tel"
                className="form-control border-danger"
                placeholder="Enter You Mobile number"
                value={mobileNo}
                onChange={(e) => setMobileNO(e.target.value)}
                required
              />
            </div>
          )}

          <div className="mb-3">
            <label className="form-label text-dark">Password</label>
            <input
              type="password"
              className="form-control border-danger"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {!isLogin && (
            <div className="mb-3">
              <label className="form-label text-dark">Confirm Password</label>
              <input
                type="password"
                className="form-control border-danger"
                placeholder="Confirm your password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>
          )}
          

          <button type="submit" className="btn btn-danger w-100 fw-bold">
            {isLogin ? "Login" : "Sign Up"}
          </button>
        </form>

        <p className="mt-3 text-center">
          {isLogin ? "Don't have an account?" : "Already have an account?"} {" "}
          <button className="btn btn-link text-danger fw-bold" onClick={() => setIsLogin(!isLogin)}>
            {isLogin ? "Sign Up" : "Login"}
          </button>
        </p>
      </div>
    </div>
  );
}

export default Auth;
