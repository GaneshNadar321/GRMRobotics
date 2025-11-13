import Image from 'next/image';
import { useState } from 'react';

export function Logo({ className = "w-10 h-10" }: { className?: string }) {
  const [imgSrc, setImgSrc] = useState('/LOGO.jpeg');
  
  const handleError = () => {
    // Fallback to logo.jpg if LOGO.jpeg fails
    if (imgSrc === '/LOGO.jpeg') {
      setImgSrc('/logo.jpg');
    }
  };

  return (
    <Image
      src={imgSrc}
      alt="GRM Robotics Logo"
      width={40}
      height={40}
      className={className}
      priority
      unoptimized={true}
      onError={handleError}
    />
  );
}
