import { toast } from "sonner";

/**
 * Displays a success toast notification with the provided message.
 *
 * @param {string} message - The success message to show.
 */
export const showSuccess = (message: string) => {
  toast.success(message);
};

/**
 * Displays an error toast notification with the provided message.
 *
 * @param {string} message - The error message to show.
 */
export const showError = (message: string) => {
  toast.error(message);
};

/**
 * Displays a warning toast notification with the provided message.
 *
 * @param {string} message - The warning message to show.
 */
export const showWarning = (message: string) => {
  toast.warning(message);
};

/**
 * Displays a default/info toast notification with the provided message.
 *
 * @param {string} message - The informational message to show.
 */
export const showInfo = (message: string) => {
  toast.info(message);
};

/**
 * Displays a loading toast and returns its ID.
 *
 * You can use the returned ID to later dismiss or update the toast.
 *
 * @param {string} message - The message to show while loading.
 * @returns {string | number} The toast ID for dismissal or update.
 *
 * @example
 * const toastId = showLoading("Uploading file...");
 */
export const showLoading = (message: string) => {
  return toast.loading(message);
};

/**
 * Dismisses a toast by its ID.
 *
 * Useful for removing a loading toast after the operation is complete.
 *
 * @param {string | number} toastId - The ID of the toast to dismiss.
 *
 * @example
 * const id = showLoading("Processing...");
 * // Later
 * dismissToast(id);
 */
export const dismissToast = (toastId: string | number) => {
  toast.dismiss(toastId);
};
