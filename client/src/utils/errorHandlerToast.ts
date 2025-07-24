import { toast } from "sonner";

/**
 * Handles and displays error messages using toast notifications.
 *
 * - If the error is a standard `Error` instance, it displays the `.message` property.
 * - If the error is an object (e.g., Axios or Fetch error), it attempts to read a `message` field.
 * - If the error is unknown or invalid, a fallback message is shown.
 *
 * All errors are also logged to the console for debugging.
 *
 * @param {unknown} error - The error object to handle. Can be of any type.
 * @param {string} [fallbackMessage="Something went wrong"] - A default message used when no specific error message is available.
 */
export function handleError(error?: unknown, fallbackMessage: string = "Something went wrong") {
    if(error instanceof Error) {
        toast.error(error.message || fallbackMessage)
    }

    if(typeof error === "object" && error !== null) {
        const err = error as Record<string,any>;
        toast.error(err.message || fallbackMessage)
    }

    else {
        toast.error(fallbackMessage);
    }

    console.log("Handled error: ",error);
}