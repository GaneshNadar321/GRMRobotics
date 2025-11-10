import Image from 'next/image';

export function Logo({ className = "w-10 h-10" }: { className?: string }) {
  return (
    <Image
      src="/logo.jpg"
      alt="GRM Robotics Logo"
      width={40}
      height={40}
      className={className}
      priority
      unoptimized={true}
    />
  );
}
