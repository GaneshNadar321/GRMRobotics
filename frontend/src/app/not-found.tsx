import Link from 'next/link';
import { Home, Search } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <div className="mb-8">
          <h1 className="text-9xl font-bold text-primary-600">404</h1>
          <div className="h-1 w-20 bg-primary-600 mx-auto mt-4"></div>
        </div>
        
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          Page Not Found
        </h2>
        
        <p className="text-gray-600 mb-8">
          Sorry, we couldn't find the page you're looking for. The page might have been moved or deleted.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/" className="btn btn-primary flex items-center gap-2">
            <Home className="w-5 h-5" />
            Go Home
          </Link>
          <Link href="/products" className="btn btn-secondary flex items-center gap-2">
            <Search className="w-5 h-5" />
            Browse Products
          </Link>
        </div>
      </div>
    </div>
  );
}
