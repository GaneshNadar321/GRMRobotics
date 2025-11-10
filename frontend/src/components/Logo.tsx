import Image from 'next/image';
import { useState } from 'react';

export function Logo({ className = "w-10 h-10" }: { className?: string }) {
  const [imageError, setImageError] = useState(false);

  // If image fails, use SVG fallback
  if (imageError) {
    return (
      <div className={className}>
        <svg
          viewBox="0 0 120 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full"
        >
          <circle cx="60" cy="60" r="55" fill="url(#gradient1)" />
          <rect x="35" y="25" width="50" height="40" rx="8" fill="#ffffff" />
          <circle cx="48" cy="40" r="6" fill="#0ea5e9" />
          <circle cx="72" cy="40" r="6" fill="#0ea5e9" />
          <circle cx="48" cy="40" r="3" fill="#1e293b" />
          <circle cx="72" cy="40" r="3" fill="#1e293b" />
          <line x1="60" y1="25" x2="60" y2="15" stroke="#f59e0b" strokeWidth="4" strokeLinecap="round" />
          <circle cx="60" cy="12" r="4" fill="#f59e0b" />
          <rect x="50" y="52" width="20" height="6" rx="3" fill="#0ea5e9" />
          <rect x="40" y="65" width="40" height="35" rx="6" fill="#ffffff" />
          <rect x="45" y="70" width="30" height="20" rx="4" fill="#0ea5e9" />
          <defs>
            <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#0ea5e9" />
              <stop offset="50%" stopColor="#0284c7" />
              <stop offset="100%" stopColor="#0369a1" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    );
  }

  return (
    <Image
      src="/logo.jpg"
      alt="GRM Robotics Logo"
      width={40}
      height={40}
      className={className}
      priority
      unoptimized={true}
      onError={() => setImageError(true)}
    />
  );
}
