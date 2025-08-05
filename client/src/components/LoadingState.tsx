import React from "react";

interface LoadingStateProps {
  message?: string;
  className?: string;
  size?: "sm" | "md" | "lg";
  fullPage?: boolean;
}

/**
 * Skeleton loading component to display during data fetching
 * Shows a spinner with an optional message
 */
const LoadingState: React.FC<LoadingStateProps> = ({
  message = "Loading...",
  className = "",
  size = "md",
  fullPage = false,
}) => {
  const spinnerSize = size === "sm" ? 2 : size === "md" ? 3 : 5;
  const containerClass = fullPage
    ? "position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center bg-white bg-opacity-75 z-index-1050"
    : `d-flex flex-column justify-content-center align-items-center p-4 ${className}`;

  return (
    <div className={containerClass} role="status" aria-live="polite">
      <div className={`spinner-border text-primary mb-2 spinner-border-${spinnerSize}`} />
      {message && <p className="text-center mt-2">{message}</p>}
      <span className="visually-hidden">{message}</span>
    </div>
  );
};

export default LoadingState;
