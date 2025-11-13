'use client';

import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import Image from 'next/image';
import api from '@/lib/api';

const CategoryIcon = ({ slug }: { slug: string }) => {
  if (slug === 'beginner-kits') {
    return (
      <svg className="w-24 h-24" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="50" cy="50" r="45" fill="currentColor" opacity="0.2"/>
        <path d="M50 20L60 40H40L50 20Z" fill="currentColor"/>
        <circle cx="50" cy="55" r="8" fill="currentColor"/>
        <rect x="35" y="70" width="30" height="8" rx="2" fill="currentColor"/>
        <path d="M30 78L35 85H65L70 78" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/>
      </svg>
    );
  }
  
  if (slug === 'intermediate-kits') {
    return (
      <svg className="w-24 h-24" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="50" cy="50" r="45" fill="currentColor" opacity="0.2"/>
        <rect x="30" y="25" width="40" height="30" rx="3" fill="currentColor"/>
        <circle cx="42" cy="40" r="4" fill="white"/>
        <circle cx="58" cy="40" r="4" fill="white"/>
        <path d="M35 50L45 55L35 60M65 50L55 55L65 60" stroke="white" strokeWidth="2" strokeLinecap="round"/>
        <rect x="25" y="60" width="50" height="8" rx="2" fill="currentColor"/>
        <circle cx="35" cy="75" r="6" fill="currentColor"/>
        <circle cx="65" cy="75" r="6" fill="currentColor"/>
      </svg>
    );
  }
  
  // Advanced
  return (
    <svg className="w-24 h-24" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="50" cy="50" r="45" fill="currentColor" opacity="0.2"/>
      <rect x="35" y="20" width="30" height="25" rx="2" fill="currentColor"/>
      <circle cx="43" cy="32" r="3" fill="white"/>
      <circle cx="57" cy="32" r="3" fill="white"/>
      <path d="M40 38L50 42L60 38" stroke="white" strokeWidth="2" strokeLinecap="round"/>
      <rect x="30" y="48" width="40" height="20" rx="2" fill="currentColor"/>
      <path d="M35 55H45M55 55H65M35 60H45M55 60H65" stroke="white" strokeWidth="2" strokeLinecap="round"/>
      <circle cx="38" cy="75" r="5" fill="currentColor"/>
      <circle cx="62" cy="75" r="5" fill="currentColor"/>
      <path d="M25 70L30 75L25 80M75 70L70 75L75 80" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  );
};

export default function CategoriesPage() {
  const { data: productsData, isLoading } = useQuery({
    queryKey: ['products-by-category'],
    queryFn: async () => {
      const response = await api.get('/products');
      const products = response.data.products || [];
      
      // Group products by category - each product appears ONLY in its assigned category
      const grouped: any = {
        'beginner-kits': [],
        'intermediate-kits': [],
        'advanced-kits': [],
      };
      
      products.forEach((product: any) => {
        const slug = product.category?.slug;
        // Strict matching - product only goes to its exact category
        if (slug && grouped.hasOwnProperty(slug)) {
          grouped[slug].push(product);
        }
      });
      
      return grouped;
    },
  });

  const categories = [
    {
      name: 'Beginner Kits',
      slug: 'beginner-kits',
      description: 'Perfect for students just starting their robotics journey',
      gradient: 'from-green-400 to-green-600',
      badge: { text: 'Start Here', color: 'bg-green-100 text-green-700' },
    },
    {
      name: 'Intermediate Kits',
      slug: 'intermediate-kits',
      description: 'Ready for more challenges and complex projects',
      gradient: 'from-blue-400 to-blue-600',
      badge: { text: 'Level Up', color: 'bg-blue-100 text-blue-700' },
    },
    {
      name: 'Advanced Kits',
      slug: 'advanced-kits',
      description: 'Professional-grade robotics for experts',
      gradient: 'from-purple-400 to-purple-600',
      badge: { text: 'Expert', color: 'bg-purple-100 text-purple-700' },
    },
  ];

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="text-3xl font-bold mb-8">Categories</h1>
        <div className="space-y-12">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="animate-pulse">
              <div className="bg-gray-200 h-8 w-48 rounded mb-4"></div>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {[...Array(4)].map((_, j) => (
                  <div key={j}>
                    <div className="bg-gray-200 h-48 rounded-lg mb-2"></div>
                    <div className="bg-gray-200 h-4 rounded mb-2"></div>
                    <div className="bg-gray-200 h-4 rounded w-2/3"></div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <h1 className="text-3xl font-bold mb-4">Shop by Skill Level</h1>
      <p className="text-gray-600 mb-12">
        Browse our collection of robotics kits organized by difficulty level
      </p>

      {categories.map((category) => {
        const products = productsData?.[category.slug] || [];
        
        return (
          <div key={category.slug} className="mb-16">
            {/* Category Header */}
            <div className={`bg-gradient-to-r ${category.gradient} rounded-xl p-8 mb-6 text-white`}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-6">
                  <div className="transform hover:scale-110 transition-transform">
                    <CategoryIcon slug={category.slug} />
                  </div>
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <h2 className="text-3xl font-bold">{category.name}</h2>
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${category.badge.color}`}>
                        {category.badge.text}
                      </span>
                    </div>
                    <p className="text-white/90">{category.description}</p>
                  </div>
                </div>
                <Link
                  href={`/products?category=${category.slug}`}
                  className="bg-white text-gray-900 px-6 py-2 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
                >
                  View All
                </Link>
              </div>
            </div>

            {/* Products Grid */}
            {products.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {products.slice(0, 4).map((product: any) => (
                  <Link
                    key={product.id}
                    href={`/products/${product.id}`}
                    className="card hover:shadow-lg transition-shadow group"
                  >
                    <div className="relative h-48 bg-gray-100 rounded-lg mb-3 overflow-hidden">
                      {product.images?.[0]?.url ? (
                        <Image
                          src={`${process.env.NEXT_PUBLIC_API_URL?.replace('/api', '')}${product.images[0].url}`}
                          alt={product.name}
                          fill
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-400">
                          <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                        </div>
                      )}
                      {product.compareAtPrice && (
                        <span className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-bold">
                          SALE
                        </span>
                      )}
                    </div>
                    <h3 className="font-semibold mb-1 group-hover:text-primary-600 transition-colors line-clamp-2">
                      {product.name}
                    </h3>
                    <div className="flex items-center justify-between">
                      <p className="text-primary-600 font-bold">₹{product.price.toLocaleString()}</p>
                      {product.compareAtPrice && (
                        <span className="text-xs text-gray-500 line-through">
                          ₹{product.compareAtPrice.toLocaleString()}
                        </span>
                      )}
                    </div>
                    {product.stock === 0 && (
                      <span className="text-xs text-red-600 font-semibold">Out of Stock</span>
                    )}
                    {product.stock > 0 && product.stock <= 5 && (
                      <span className="text-xs text-orange-600 font-semibold">Only {product.stock} left!</span>
                    )}
                  </Link>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 bg-gray-50 rounded-lg">
                <p className="text-gray-500">No products available in this category yet.</p>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
