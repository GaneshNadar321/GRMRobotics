import Image from 'next/image';
import { useState } from 'react';

export function Logo({ className = "w-10 h-10" }: { className?: string }) {
  const [currentSrc, setCurrentSrc] = useState('/logo.jpg');
  const [fallbackUsed, setFallbackUsed] = useState(false);

  const handleError = () => {
    if (currentSrc === '/logo.jpg') {
      setCurrentSrc('/logo.svg');
    } else {
      setFallbackUsed(true);
    }
  };

  // Fallback component if all images fail
  if (fallbackUsed) {
    return (
      <div className={`${className} bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center`}>
        <span className="text-white font-bold text-xs">GRM</span>
      </div>
    );
  }

  return (
    <Image
      src={currentSrc}
      alt="GRM Robotics Logo"
      width={40}
      height={40}
      className={className}
      priority
      onError={handleError}
    />
  );
}
