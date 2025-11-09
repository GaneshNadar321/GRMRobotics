'use client';

import { useQuery } from '@tanstack/react-query';
import { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import api from '@/lib/api';
import { ProductCard } from '@/components/products/ProductCard';
import { Filter, Package, Grid3X3, List, SlidersHorizontal, Search, Star, X } from 'lucide-react';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { EmptyState } from '@/components/ui/EmptyState';
import { ProductCardSkeleton } from '@/components/ui/LoadingSkeleton';

const getCategoryTitle = (slug: string) => {
  const titles: { [key: string]: string } = {
    'beginner-kits': 'Beginner Kits',
    'intermediate-kits': 'Intermediate Kits',
    'advanced-kits': 'Advanced Kits',
  };
  return titles[slug] || 'Products';
};

export default function ProductsPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const searchQuery = searchParams.get('search') || '';
  const categoryParam = searchParams.get('category') || '';
  
  const [filters, setFilters] = useState({
    page: 1,
    limit: 12,
    category: categoryParam,
    difficulty: '',
    minPrice: '',
    maxPrice: '',
    search: searchQuery,
    sortBy: 'newest',
    inStock: false,
  });

  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showFilters, setShowFilters] = useState(false);
  const [localSearch, setLocalSearch] = useState(searchQuery);

  useEffect(() => {
    if (searchQuery) {
      setFilters(prev => ({ ...prev, search: searchQuery, page: 1 }));
    }
  }, [searchQuery]);

  useEffect(() => {
    if (categoryParam) {
      setFilters(prev => ({ ...prev, category: categoryParam, page: 1 }));
    }
  }, [categoryParam]);

  const { data, isLoading } = useQuery({
    queryKey: ['products', filters],
    queryFn: async () => {
      const params = new URLSearchParams();
      Object.entries(filters).forEach(([key, value]) => {
        if (value) params.append(key, value.toString());
      });
      const response = await api.get(`/products?${params}`);
      return response.data;
    },
  });

  // Fetch categories for filter
  const { data: categories } = useQuery({
    queryKey: ['categories'],
    queryFn: async () => {
      const response = await api.get('/categories');
      return response.data;
    },
  });

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setFilters({ ...filters, search: localSearch, page: 1 });
    const params = new URLSearchParams(searchParams.toString());
    if (localSearch) {
      params.set('search', localSearch);
    } else {
      params.delete('search');
    }
    router.push(`/products?${params.toString()}`);
  };

  const clearAllFilters = () => {
    setFilters({ 
      page: 1, 
      limit: 12, 
      category: '', 
      difficulty: '', 
      minPrice: '', 
      maxPrice: '', 
      search: '', 
      sortBy: 'newest',
      inStock: false 
    });
    setLocalSearch('');
    router.push('/products');
  };

  const activeFiltersCount = Object.entries(filters).filter(([key, value]) => 
    key !== 'page' && key !== 'limit' && key !== 'sortBy' && value
  ).length;

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Breadcrumb items={[{ label: 'Products' }]} />
        
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-2">
                {filters.search ? `Search Results` : 
                 filters.category ? getCategoryTitle(filters.category) : 
                 'All Products'}
              </h1>
              {filters.search && (
                <p className="text-lg text-gray-600 mb-2">
                  for "{filters.search}"
                </p>
              )}
              <p className="text-gray-600">
                {data?.pagination?.total || 0} products found
              </p>
            </div>

            {/* Search Bar */}
            <div className="w-full lg:w-96">
              <form onSubmit={handleSearch} className="relative">
                <input
                  type="text"
                  placeholder="Search products..."
                  value={localSearch}
                  onChange={(e) => setLocalSearch(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white shadow-sm"
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                {localSearch && (
                  <button
                    type="button"
                    onClick={() => {
                      setLocalSearch('');
                      setFilters({ ...filters, search: '', page: 1 });
                    }}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 hover:text-gray-600"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </form>
            </div>
          </div>
        </div>

        {/* Filters and Controls Bar */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            {/* Left side - Filters */}
            <div className="flex flex-wrap items-center gap-4">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
              >
                <SlidersHorizontal className="w-4 h-4" />
                Filters
                {activeFiltersCount > 0 && (
                  <span className="bg-blue-600 text-white text-xs px-2 py-1 rounded-full">
                    {activeFiltersCount}
                  </span>
                )}
              </button>

              {/* Quick Filters */}
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setFilters({ ...filters, inStock: !filters.inStock, page: 1 })}
                  className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                    filters.inStock 
                      ? 'bg-green-100 text-green-800 border border-green-300' 
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  In Stock Only
                </button>
                
                {['BEGINNER', 'INTERMEDIATE', 'ADVANCED'].map((level) => (
                  <button
                    key={level}
                    onClick={() => setFilters({ 
                      ...filters, 
                      difficulty: filters.difficulty === level ? '' : level, 
                      page: 1 
                    })}
                    className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                      filters.difficulty === level
                        ? 'bg-blue-100 text-blue-800 border border-blue-300'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {level.charAt(0) + level.slice(1).toLowerCase()}
                  </button>
                ))}
              </div>

              {activeFiltersCount > 0 && (
                <button
                  onClick={clearAllFilters}
                  className="text-sm text-red-600 hover:text-red-700 font-medium"
                >
                  Clear All
                </button>
              )}
            </div>

            {/* Right side - Sort and View */}
            <div className="flex items-center gap-4">
              {/* Sort Dropdown */}
              <select
                value={filters.sortBy}
                onChange={(e) => setFilters({ ...filters, sortBy: e.target.value, page: 1 })}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
              >
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
                <option value="popular">Most Popular</option>
              </select>

              {/* View Toggle */}
              <div className="flex bg-gray-100 rounded-lg p-1">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded transition-colors ${
                    viewMode === 'grid' ? 'bg-white shadow-sm' : 'hover:bg-gray-200'
                  }`}
                >
                  <Grid3X3 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded transition-colors ${
                    viewMode === 'list' ? 'bg-white shadow-sm' : 'hover:bg-gray-200'
                  }`}
                >
                  <List className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Expanded Filters */}
          {showFilters && (
            <div className="mt-6 pt-6 border-t border-gray-200">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {/* Category Filter */}
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">Category</label>
                  <select
                    value={filters.category}
                    onChange={(e) => setFilters({ ...filters, category: e.target.value, page: 1 })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                  >
                    <option value="">All Categories</option>
                    {categories?.map((category: any) => (
                      <option key={category.id} value={category.slug}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Difficulty Filter */}
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">Difficulty</label>
                  <select
                    value={filters.difficulty}
                    onChange={(e) => setFilters({ ...filters, difficulty: e.target.value, page: 1 })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                  >
                    <option value="">All Levels</option>
                    <option value="BEGINNER">Beginner</option>
                    <option value="INTERMEDIATE">Intermediate</option>
                    <option value="ADVANCED">Advanced</option>
                  </select>
                </div>

                {/* Price Range */}
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">Min Price</label>
                  <input
                    type="number"
                    placeholder="₹0"
                    value={filters.minPrice}
                    onChange={(e) => setFilters({ ...filters, minPrice: e.target.value, page: 1 })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">Max Price</label>
                  <input
                    type="number"
                    placeholder="₹10000"
                    value={filters.maxPrice}
                    onChange={(e) => setFilters({ ...filters, maxPrice: e.target.value, page: 1 })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                  />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Products Grid/List */}
        <div className="mb-8">
          {isLoading ? (
            <div className={`grid gap-6 ${
              viewMode === 'grid' 
                ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' 
                : 'grid-cols-1'
            }`}>
              {[...Array(8)].map((_, i) => (
                <ProductCardSkeleton key={i} />
              ))}
            </div>
          ) : data?.products?.length === 0 ? (
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 text-center py-16">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gray-100 mb-6">
                <Package className="w-10 h-10 text-gray-400" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-3">No Products Found</h2>
              <p className="text-gray-600 mb-6 max-w-md mx-auto">
                {filters.search || activeFiltersCount > 0
                  ? "We couldn't find any products matching your criteria. Try adjusting your filters or search terms."
                  : "We're working on adding new products to our collection. Check back soon for exciting new robotics kits!"}
              </p>
              <button
                onClick={clearAllFilters}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
              >
                {filters.search || activeFiltersCount > 0 ? 'Clear Filters' : 'View All Products'}
              </button>
            </div>
          ) : (
            <>
              <div className={`grid gap-6 ${
                viewMode === 'grid' 
                  ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' 
                  : 'grid-cols-1'
              }`}>
                {data?.products?.map((product: any) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>

              {/* Pagination */}
              {data?.pagination && data.pagination.pages > 1 && (
                <div className="flex justify-center items-center gap-2 mt-12">
                  <button
                    onClick={() => setFilters({ ...filters, page: Math.max(1, filters.page - 1) })}
                    disabled={filters.page === 1}
                    className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Previous
                  </button>
                  
                  {[...Array(Math.min(5, data.pagination.pages))].map((_, i) => {
                    const pageNum = i + 1;
                    return (
                      <button
                        key={pageNum}
                        onClick={() => setFilters({ ...filters, page: pageNum })}
                        className={`px-4 py-2 rounded-lg font-medium ${
                          filters.page === pageNum
                            ? 'bg-blue-600 text-white'
                            : 'border border-gray-300 hover:bg-gray-50'
                        }`}
                      >
                        {pageNum}
                      </button>
                    );
                  })}
                  
                  {data.pagination.pages > 5 && (
                    <>
                      <span className="px-2">...</span>
                      <button
                        onClick={() => setFilters({ ...filters, page: data.pagination.pages })}
                        className={`px-4 py-2 rounded-lg font-medium ${
                          filters.page === data.pagination.pages
                            ? 'bg-blue-600 text-white'
                            : 'border border-gray-300 hover:bg-gray-50'
                        }`}
                      >
                        {data.pagination.pages}
                      </button>
                    </>
                  )}
                  
                  <button
                    onClick={() => setFilters({ ...filters, page: Math.min(data.pagination.pages, filters.page + 1) })}
                    disabled={filters.page === data.pagination.pages}
                    className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Next
                  </button>
                </div>
              )}
            </>
          )}
        </div>


      </div>
    </div>
  );
}
