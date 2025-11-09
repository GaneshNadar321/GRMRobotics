'use client';

interface StatusBadgeProps {
  status: string;
  variant?: 'default' | 'order' | 'stock' | 'active';
  className?: string;
}

export function StatusBadge({ status, variant = 'default', className = '' }: StatusBadgeProps) {
  const getStatusStyles = () => {
    const baseClasses = 'px-2 py-1 rounded-full text-xs font-medium';
    
    switch (variant) {
      case 'order':
        switch (status.toUpperCase()) {
          case 'DELIVERED':
            return `${baseClasses} bg-green-100 text-green-800`;
          case 'SHIPPED':
            return `${baseClasses} bg-blue-100 text-blue-800`;
          case 'PROCESSING':
            return `${baseClasses} bg-yellow-100 text-yellow-800`;
          case 'PAID':
            return `${baseClasses} bg-purple-100 text-purple-800`;
          case 'PENDING':
            return `${baseClasses} bg-orange-100 text-orange-800`;
          case 'CANCELLED':
            return `${baseClasses} bg-red-100 text-red-800`;
          default:
            return `${baseClasses} bg-gray-100 text-gray-800`;
        }
      
      case 'stock':
        const stockNum = parseInt(status);
        if (stockNum > 10) {
          return `${baseClasses} bg-green-100 text-green-800`;
        } else if (stockNum > 0) {
          return `${baseClasses} bg-yellow-100 text-yellow-800`;
        } else {
          return `${baseClasses} bg-red-100 text-red-800`;
        }
      
      case 'active':
        return status === 'true' || status === 'Active' 
          ? `${baseClasses} bg-green-100 text-green-800`
          : `${baseClasses} bg-gray-100 text-gray-800`;
      
      default:
        return `${baseClasses} bg-blue-100 text-blue-800`;
    }
  };

  return (
    <span className={`${getStatusStyles()} ${className}`}>
      {status}
    </span>
  );
}