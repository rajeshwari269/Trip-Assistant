import { toast } from "sonner";

/**
 * Handles and displays error messages using toast notifications.
 *
 * - If the error is a standard `Error` instance, it displays the `.message` property.
 * - If the error is an object (e.g., Axios or Fetch error), it attempts to read specific error fields.
 * - If the error is unknown or invalid, a fallback message is shown.
 *
 * All errors are also logged to the console for debugging in development only.
 *
 * @param {unknown} error - The error object to handle. Can be of any type.
 * @param {string} [fallbackMessage="Something went wrong"] - A default message used when no specific error message is available.
 * @returns {string} The error message that was displayed to the user
 */
export function handleError(error?: unknown, fallbackMessage: string = "Something went wrong"): string {
    let errorMessage = fallbackMessage;
    
    if (error instanceof Error) {
        errorMessage = error.message || fallbackMessage;
    } else if (typeof error === "object" && error !== null) {
        const err = error as Record<string, any>;
        // Check for common API error patterns
        errorMessage = err.message || // Standard error object
                       (err.response?.data?.error || // Axios error format
                       err.response?.data?.message || // Alternative API format
                       err.error || // Some API error formats
                       fallbackMessage);
    }
    
    // Show toast with error message
    toast.error(errorMessage);
    
    // Only log in development
    if (import.meta.env.DEV) {
        console.log("Handled error:", error);
    }
    
    return errorMessage;
}