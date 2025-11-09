'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Star, ShoppingCart, Heart } from 'lucide-react';
import { useMutation, useQueryClient, useQuery } from '@tanstack/react-query';
import { useAuthStore } from '@/store/authStore';
import { useRouter } from 'next/navigation';
import api from '@/lib/api';
import toast from 'react-hot-toast';

interface ProductCardProps {
  product: any;
}

export function ProductCard({ product }: ProductCardProps) {
  const { isAuthenticated } = useAuthStore();
  const router = useRouter();
  const queryClient = useQueryClient();

  // Check if product is in wishlist
  const { data: wishlistData } = useQuery({
    queryKey: ['wishlist'],
    queryFn: async () => {
      const response = await api.get('/wishlist');
      return response.data;
    },
    enabled: isAuthenticated(),
  });

  const isInWishlist = wishlistData?.items?.some((item: any) => item.product.id === product.id);

  // Use uploaded image or fallback to placeholder
  const primaryImage = product.images?.[0]?.url
    ? `http://localhost:3001${product.images[0].url}`
    : `https://placehold.co/400x300/0ea5e9/white?text=${encodeURIComponent(product.name)}`;

  const addToWishlistMutation = useMutation({
    mutationFn: async () => {
      if (isInWishlist) {
        await api.delete(`/wishlist/items/${product.id}`);
      } else {
        await api.post('/wishlist/items', { productId: product.id });
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['wishlist'] });
      toast.success(isInWishlist ? 'Removed from wishlist!' : 'Added to wishlist!');
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.error || 'Failed to update wishlist');
    },
  });

  const handleWishlistClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!isAuthenticated()) {
      toast.error('Please login to add to wishlist');
      router.push('/login');
      return;
    }

    addToWishlistMutation.mutate();
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg hover:shadow-lg transition-shadow duration-300 group relative">
      <Link href={`/products/${product.id}`}>
        <div className="relative h-48 mb-4 bg-white rounded-t-lg overflow-hidden p-4">
          <Image
            src={primaryImage}
            alt={product.name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-contain group-hover:scale-105 transition-transform duration-300"
          />
          {product.compareAtPrice && (
            <span className="absolute top-2 right-2 bg-green-600 text-white px-2 py-1 rounded text-xs font-semibold">
              {Math.round((1 - Number(product.price) / Number(product.compareAtPrice)) * 100)}% off
            </span>
          )}

          {/* Wishlist Button */}
          <button
            onClick={handleWishlistClick}
            disabled={addToWishlistMutation.isPending}
            className={`absolute bottom-2 right-2 w-8 h-8 rounded-full flex items-center justify-center transition-all disabled:opacity-50 ${isInWishlist ? 'bg-red-500 text-white' : 'bg-gray-100 hover:bg-red-50 text-red-500'
              }`}
            title={isInWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
          >
            <Heart className={`w-4 h-4 ${isInWishlist ? 'fill-current' : ''}`} />
          </button>
        </div>
      </Link>

      <div className="p-4 pt-0">
        <Link href={`/products/${product.id}`}>
          <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 hover:text-blue-600 transition-colors">
            {product.name}
          </h3>
        </Link>

        {/* Rating */}
        <div className="flex items-center gap-2 mb-3">
          <div className="flex items-center bg-green-600 text-white px-2 py-1 rounded text-xs font-semibold">
            <span>{product.averageRating?.toFixed(1) || '0.0'}</span>
            <Star className="w-3 h-3 ml-1 fill-current" />
          </div>
          <span className="text-xs text-gray-600">
            ({product.reviewCount || 0})
          </span>
        </div>

        {/* Price */}
        <div className="flex items-baseline gap-2 mb-3">
          <span className="text-xl font-bold text-black">₹{product.price}</span>
          {product.compareAtPrice && (
            <>
              <span className="text-sm text-gray-500 line-through">₹{product.compareAtPrice}</span>
              <span className="text-green-600 text-sm font-semibold">
                {Math.round((1 - Number(product.price) / Number(product.compareAtPrice)) * 100)}% off
              </span>
            </>
          )}
        </div>

        {/* Stock Status */}
        <div className="flex items-center justify-between mb-3">
          <span className={`text-xs font-medium ${product.stock > 0 ? 'text-green-600' : 'text-red-600'}`}>
            {product.stock > 0 ? '✓ In Stock' : '✗ Out of Stock'}
          </span>
          {product.stock > 0 && product.stock <= 10 && (
            <span className="text-xs text-orange-600">Only {product.stock} left</span>
          )}
        </div>

        {/* Add to Cart Button */}
        <Link href={`/products/${product.id}`}>
          <button className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 px-4 rounded transition-colors">
            <ShoppingCart className="w-4 h-4 mr-2 inline" />
            Add to Cart
          </button>
        </Link>
      </div>
    </div>
  );
}
