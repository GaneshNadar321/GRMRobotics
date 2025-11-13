'use client';

import { useState, useEffect } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import Link from 'next/link';
import Image from 'next/image';
import { Heart, ShoppingCart, Trash2, Package } from 'lucide-react';
import { useAuthStore } from '@/store/authStore';
import { useWishlistStore } from '@/store/wishlistStore';
import { EmptyState } from '@/components/ui/EmptyState';
import api from '@/lib/api';
import toast from 'react-hot-toast';

export default function WishlistPage() {
  const { isAuthenticated } = useAuthStore();
  const { items: wishlist, isLoading, fetchWishlist, removeFromWishlist } = useWishlistStore();
  const queryClient = useQueryClient();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (isAuthenticated()) {
      fetchWishlist();
    }
  }, [isAuthenticated, fetchWishlist]);

  const removeFromWishlistMutation = useMutation({
    mutationFn: async (productId: string) => {
      await removeFromWishlist(productId);
    },
    onSuccess: () => {
      toast.success('Removed from wishlist');
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.error || 'Failed to remove from wishlist');
    },
  });

  const addToCartMutation = useMutation({
    mutationFn: async (productId: string) => {
      await api.post('/cart/items', { productId, quantity: 1 });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] });
      toast.success('Added to cart!');
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.error || 'Failed to add to cart');
    },
  });

  const handleRemoveFromWishlist = (productId: string) => {
    removeFromWishlistMutation.mutate(productId);
  };

  const addToCart = (productId: string) => {
    addToCartMutation.mutate(productId);
  };

  if (!mounted) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-8"></div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-64 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (!mounted) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-8"></div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-64 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (!isAuthenticated()) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16">
        <EmptyState
          icon={Heart}
          title="Login to view wishlist"
          description="Save your favorite products and access them anytime"
          actionLabel="Login Now"
          actionHref="/login"
        />
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-8"></div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-64 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // wishlist is already available from the store

  if (wishlist.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16">
        <EmptyState
          icon={Heart}
          title="Your wishlist is empty"
          description="Start adding products you love to your wishlist"
          actionLabel="Browse Products"
          actionHref="/products"
        />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">My Wishlist</h1>
        <p className="text-gray-600">{wishlist.length} items saved</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {wishlist.map((item: any) => {
          const product = item.product;
          return (
            <div key={item.id} className="card card-hover group">
              <div className="relative aspect-square mb-4 bg-gray-100 rounded-lg overflow-hidden">
                {product.images && product.images.length > 0 ? (
                  <Image
                    src={`${process.env.NEXT_PUBLIC_API_URL?.replace('/api', '')}${product.images[0].url}`}
                    alt={product.name}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <Package className="w-16 h-16 text-gray-300" />
                  </div>
                )}
                <button
                  onClick={() => handleRemoveFromWishlist(product.id)}
                  disabled={removeFromWishlistMutation.isPending}
                  className="absolute top-2 right-2 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg hover:bg-red-50 transition-colors disabled:opacity-50"
                >
                  <Trash2 className="w-5 h-5 text-red-500" />
                </button>
              </div>

              <Link href={`/products/${product.id}`}>
                <h3 className="font-bold text-lg mb-2 hover:text-primary-600 transition-colors">
                  {product.name}
                </h3>
              </Link>

              <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                {product.description}
              </p>

              <div className="flex items-center justify-between mb-4">
                <div>
                  <span className="text-2xl font-bold text-primary-600">
                    ₹{Number(product.price).toLocaleString()}
                  </span>
                  {product.compareAtPrice && (
                    <span className="text-sm text-gray-400 line-through ml-2">
                      ₹{Number(product.compareAtPrice).toLocaleString()}
                    </span>
                  )}
                </div>
              </div>

              <button
                onClick={() => addToCart(product.id)}
                disabled={addToCartMutation.isPending || product.stock === 0}
                className="btn btn-primary w-full flex items-center justify-center gap-2 disabled:opacity-50"
              >
                <ShoppingCart className="w-5 h-5" />
                {product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
