/**
 * Get the full URL for an uploaded image
 * @param imagePath - The relative path from the API (e.g., "/uploads/image.jpg")
 * @returns Full URL to the image
 */
export function getImageUrl(imagePath: string): string {
  if (!imagePath) return '';
  
  // If it's already a full URL, return as is
  if (imagePath.startsWith('http')) {
    return imagePath;
  }
  
  // Get the backend base URL from environment
  const backendUrl = process.env.NEXT_PUBLIC_API_URL?.replace('/api', '') || 'https://grmrobotics.onrender.com';
  
  // Ensure the path starts with /
  const cleanPath = imagePath.startsWith('/') ? imagePath : `/${imagePath}`;
  
  return `${backendUrl}${cleanPath}`;
}

/**
 * Get a placeholder image URL for products
 * @param productName - Name of the product for the placeholder text
 * @returns Placeholder image URL
 */
export function getPlaceholderImage(productName: string): string {
  return `https://placehold.co/400x300/0ea5e9/white?text=${encodeURIComponent(productName)}`;
}