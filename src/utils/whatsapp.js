/**
 * WhatsApp utility functions for contact functionality
 */

/**
 * Opens WhatsApp with a pre-filled message to a specific phone number
 * @param {string} phoneNumber - The phone number (with country code, no + sign)
 * @param {string} message - The pre-filled message
 */
export const openWhatsApp = (phoneNumber, message) => {
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
  window.open(whatsappUrl, '_blank');
};

/**
 * Opens WhatsApp with a default message for choir contact
 * @param {string} phoneNumber - The phone number (with country code, no + sign)
 */
export const openChoirWhatsApp = (phoneNumber = "9994976090") => {
  const defaultMessage = "¡Hola! Me interesa formar parte del Coro Adoradores. ¿Podrían darme más información?";
  openWhatsApp(phoneNumber, defaultMessage);
};

/**
 * Opens WhatsApp with a custom message
 * @param {string} phoneNumber - The phone number (with country code, no + sign)
 * @param {string} customMessage - The custom message
 */
export const openCustomWhatsApp = (phoneNumber, customMessage) => {
  openWhatsApp(phoneNumber, customMessage);
};

/**
 * Formats phone number for WhatsApp (removes spaces, dashes, parentheses)
 * @param {string} phoneNumber - The phone number to format
 * @returns {string} - Formatted phone number
 */
export const formatPhoneNumber = (phoneNumber) => {
  return phoneNumber.replace(/[\s\-\(\)]/g, '');
};

/**
 * Validates if a phone number is valid for WhatsApp
 * @param {string} phoneNumber - The phone number to validate
 * @returns {boolean} - True if valid
 */
export const isValidPhoneNumber = (phoneNumber) => {
  const formatted = formatPhoneNumber(phoneNumber);
  return /^\d{10,15}$/.test(formatted);
};

/**
 * Opens Google Maps with a specific location
 * @param {string} mapUrl - The Google Maps URL
 */
export const openGoogleMaps = (mapUrl = 'https://maps.app.goo.gl/6XLPBriBokQL9FreA') => {
  window.open(mapUrl, '_blank');
};
