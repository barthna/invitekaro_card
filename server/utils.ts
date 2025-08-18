import crypto from 'crypto';

/**
 * Generates a random filename for temporary storage
 * @returns A unique filename string
 */
export function generateTempFilename(): string {
  const timestamp = Date.now();
  const randomString = crypto.randomBytes(8).toString('hex');
  return `${timestamp}-${randomString}`;
}

/**
 * Format a date string to a human-readable format
 * @param dateString Date string in ISO format
 * @returns Formatted date string
 */
export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}

/**
 * Format a 24-hour time string to 12-hour format with AM/PM
 * @param timeString Time string in 24-hour format (HH:MM)
 * @returns Formatted time string
 */
export function formatTime(timeString: string): string {
  const [hours, minutes] = timeString.split(':');
  const hour = parseInt(hours);
  const ampm = hour >= 12 ? 'PM' : 'AM';
  const displayHour = hour % 12 || 12;
  return `${displayHour}:${minutes} ${ampm}`;
}
