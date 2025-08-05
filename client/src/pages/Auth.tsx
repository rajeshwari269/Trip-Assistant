import { useState, useEffect, FormEvent } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { handleError } from "../utils/errorHandlerToast";
import { showError, showSuccess } from "../utils/toastUtils";
import { isOnline } from "../utils/networkUtils";
import LoadingState from "../components/LoadingState";
import ErrorState from "../components/ErrorState";

function Auth() {
  const location = useLocation();
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [mobileNo, setMobileNO] = useState("");
  const [userName, setUserName] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (location.state?.isLogin !== undefined) {
      setIsLogin(location.state.isLogin);
    }
  }, [location]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setAuthError(null);
    
    if (!isLogin && password !== confirmPassword) {
      showError("Passwords do not match!");
      return;
    }
    
    // Check network connectivity
    if (!isOnline()) {
      setAuthError("No internet connection. Please check your network.");
      return;
    }

    const apiBaseUrl = import.meta.env?.VITE_API_BASE_URL || "http://localhost:5000";
    const url = isLogin ? `${apiBaseUrl}/login` : `${apiBaseUrl}/signup`;
    const payload = { email, password, mobileNo, userName };
    
    setIsSubmitting(true);
    
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
        // Set a reasonable timeout
        signal: AbortSignal.timeout(10000),
      });
      
      const data = await response.json();
      
      if (response.ok) {
        showSuccess(isLogin ? "Login Successful" : "Signup Successful");
        navigate("/places");
      } else {
        const errorMsg = data.message || "Authentication failed. Please check your credentials.";
        setAuthError(errorMsg);
        showError(errorMsg);
      }
    } catch (error) {
      const errorMsg = isLogin 
        ? "Unable to log in at this time. Please try again later." 
        : "Unable to create your account at this time. Please try again later.";
      
      setAuthError(errorMsg);
      handleError(error, errorMsg);
    } finally {
      setIsSubmitting(false);
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
          
          {authError && (
            <div className="mb-3">
              <div className="alert alert-danger d-flex align-items-center" role="alert">
                <div className="me-2">⚠️</div>
                <div>{authError}</div>
              </div>
            </div>
          )}

          <button 
            type="submit" 
            className="btn btn-danger w-100 fw-bold" 
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                {isLogin ? "Logging in..." : "Signing up..."}
              </>
            ) : (
              isLogin ? "Login" : "Sign Up"
            )}
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
