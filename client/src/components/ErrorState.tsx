import React from "react";
import { FaExclamationTriangle, FaRedo } from "react-icons/fa";

interface ErrorStateProps {
  message?: string;
  onRetry?: () => void;
  className?: string;
}

/**
 * Error state component to display when data fetching fails
 * Shows a friendly error message with a retry button if onRetry is provided
 */
const ErrorState: React.FC<ErrorStateProps> = ({
  message = "Something went wrong",
  onRetry,
  className = "",
}) => {
  return (
    <div className={`text-center p-4 ${className}`}>
      <div className="text-danger mb-3">
        <FaExclamationTriangle size={40} />
      </div>
      <h5 className="text-danger mb-3">{message}</h5>
      {onRetry && (
        <button
          onClick={onRetry}
          className="btn btn-outline-primary d-flex align-items-center mx-auto"
          aria-label="Try again"
        >
          <FaRedo className="me-2" /> Try again
        </button>
      )}
    </div>
  );
};

export default ErrorState;
