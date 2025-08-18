import { ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(dateString: string): string {
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  };
  
  return new Date(dateString).toLocaleDateString('en-US', options);
}

// Function to convert data URL to a Blob
export function dataURLtoBlob(dataURL: string): Blob {
  const arr = dataURL.split(',');
  const mime = arr[0].match(/:(.*?);/)![1];
  const bstr = atob(arr[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);
  
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  
  return new Blob([u8arr], { type: mime });
}

// Function to create card image from HTML content
export async function generateCardImage(
  cardElement: HTMLElement, 
  width: number = 1200, 
  height: number = 675
): Promise<string> {
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  
  const html2canvas = (await import('html2canvas')).default;
  
  const renderedCanvas = await html2canvas(cardElement, {
    scale: 2, // Higher scale for better quality
    useCORS: true, // Allow cross-origin images
    allowTaint: true,
    backgroundColor: null, // Transparent background
    width,
    height
  });
  
  return renderedCanvas.toDataURL('image/png');
}
