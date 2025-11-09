export function Logo({ className = "w-10 h-10" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Robot head */}
      <rect x="25" y="20" width="50" height="45" rx="5" fill="#0ea5e9" />
      
      {/* Eyes */}
      <circle cx="40" cy="35" r="5" fill="white" />
      <circle cx="60" cy="35" r="5" fill="white" />
      <circle cx="40" cy="35" r="2" fill="#1e293b" />
      <circle cx="60" cy="35" r="2" fill="#1e293b" />
      
      {/* Antenna */}
      <line x1="50" y1="20" x2="50" y2="10" stroke="#0ea5e9" strokeWidth="3" strokeLinecap="round" />
      <circle cx="50" cy="8" r="3" fill="#f59e0b" />
      
      {/* Mouth */}
      <path d="M 35 50 Q 50 55 65 50" stroke="white" strokeWidth="2" fill="none" strokeLinecap="round" />
      
      {/* Body */}
      <rect x="30" y="65" width="40" height="25" rx="3" fill="#0284c7" />
      
      {/* Arms */}
      <rect x="15" y="70" width="15" height="8" rx="2" fill="#0ea5e9" />
      <rect x="70" y="70" width="15" height="8" rx="2" fill="#0ea5e9" />
      
      {/* Gear decoration */}
      <circle cx="50" cy="77" r="6" fill="#f59e0b" />
      <circle cx="50" cy="77" r="3" fill="#0284c7" />
    </svg>
  );
}
