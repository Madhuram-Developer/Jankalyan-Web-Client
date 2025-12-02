/**
 * Converts a date to Indian Standard Time (IST) and formats it
 * @param {string|Date} date - The date to convert
 * @param {string} format - Format type: 'full' (date + time) or 'date' (date only)
 * @returns {string} Formatted date string in IST
 */
export const formatToIST = (date, format = 'full') => {
  if (!date) return 'N/A';

  const dateObj = new Date(date);

  // Use toLocaleString with IST timezone for automatic conversion
  const options = {
    timeZone: 'Asia/Kolkata',
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  };

  if (format === 'full') {
    options.hour = '2-digit';
    options.minute = '2-digit';
    options.hour12 = false; // 24-hour format
  }

  return dateObj.toLocaleString('en-IN', options);
};

/**
 * Formats a date to show only the date part in IST
 * @param {string|Date} date - The date to format
 * @returns {string} Formatted date string
 */
export const formatDateIST = (date) => {
  return formatToIST(date, 'date');
};

/**
 * Formats a date to show date and time in IST
 * @param {string|Date} date - The date to format
 * @returns {string} Formatted date and time string
 */
export const formatDateTimeIST = (date) => {
  return formatToIST(date, 'full');
};