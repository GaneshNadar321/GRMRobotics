'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ShoppingCart, User, Search, Menu, X, Heart, Package, LogOut, Settings, Home, BookOpen, Grid, Info, Phone, Tag } from 'lucide-react';
import { useAuthStore } from '@/store/authStore';
import { useCartStore } from '@/store/cartStore';
import { Logo } from '@/components/Logo';
import { useState, useEffect } from 'react';

export function Header() {
  const router = useRouter();
  const { user, isAuthenticated, logout } = useAuthStore();
  const { itemCount } = useCartStore();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/products?search=${encodeURIComponent(searchQuery)}`);
      setSearchQuery('');
    }
  };

  const handleLogout = () => {
    logout();
    setUserMenuOpen(false);
    router.push('/');
  };

  return (
    <header className="bg-white border-b-2 border-gray-100 sticky top-0 z-50 shadow-sm">
      {/* Top Bar */}
      <div className="bg-gradient-to-r from-primary-600 to-primary-700 text-white py-2">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center text-sm">
            <div className="flex items-center gap-4">
              <span className="hidden sm:inline">📞 Support: +91-9307720916</span>
              <span className="hidden md:inline">✉️ grmrobotic@gmail.com</span>
            </div>
            <div className="flex items-center gap-4">
              <Link href="/track-order" className="hover:underline text-xs sm:text-sm">
                Track Order
              </Link>
              <Link href="/contact" className="hover:underline text-xs sm:text-sm">
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="transform transition-transform group-hover:scale-110 group-hover:rotate-12 duration-300">
              <Logo className="w-12 h-12" />
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-xl text-gray-900 group-hover:text-primary-600 transition-colors">
                GRM Robotics
              </span>
              <span className="text-xs text-gray-500 -mt-1">Build. Learn. Innovate.</span>
            </div>
          </Link>

          {/* Search Bar - Desktop */}
          <div className="hidden md:flex flex-1 max-w-xl mx-6">
            <form onSubmit={handleSearch} className="w-full">
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400 group-focus-within:text-primary-600 transition-colors" />
                </div>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search products..."
                  className="block w-full pl-10 pr-24 py-2.5 border-2 border-gray-200 rounded-lg text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all bg-gray-50 focus:bg-white"
                />
                <button
                  type="submit"
                  className="absolute inset-y-0 right-0 flex items-center pr-2"
                >
                  <span className="px-4 py-1.5 bg-primary-600 text-white text-sm font-medium rounded-md hover:bg-primary-700 transition-colors">
                    Search
                  </span>
                </button>
              </div>
            </form>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-6">
            <Link href="/" className="flex items-center gap-2 text-gray-700 hover:text-primary-600 transition-colors font-medium">
              <Home className="w-4 h-4" />
              <span>Home</span>
            </Link>
            <Link href="/products" className="flex items-center gap-2 text-gray-700 hover:text-primary-600 transition-colors font-medium">
              <Package className="w-4 h-4" />
              <span>Products</span>
            </Link>
            <Link href="/categories" className="flex items-center gap-2 text-gray-700 hover:text-primary-600 transition-colors font-medium">
              <Grid className="w-4 h-4" />
              <span>Categories</span>
            </Link>
            <Link href="/tutorials" className="flex items-center gap-2 text-gray-700 hover:text-primary-600 transition-colors font-medium">
              <BookOpen className="w-4 h-4" />
              <span>Tutorials</span>
            </Link>
            <Link href="/about" className="flex items-center gap-2 text-gray-700 hover:text-primary-600 transition-colors font-medium">
              <Info className="w-4 h-4" />
              <span>About</span>
            </Link>
          </div>

          {/* Right Side Icons */}
          <div className="flex items-center space-x-3">
            {/* Cart */}
            <Link 
              href="/cart" 
              className="relative flex items-center justify-center w-10 h-10 rounded-full hover:bg-gray-100 text-gray-700 hover:text-primary-600 transition-all"
              title="Shopping Cart"
            >
              <ShoppingCart className="w-5 h-5" />
              {mounted && itemCount() > 0 && (
                <span className="absolute -top-1 -right-1 bg-gradient-to-r from-red-500 to-red-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center animate-pulse shadow-lg">
                  {itemCount()}
                </span>
              )}
            </Link>

            {/* User Menu */}
            {mounted && isAuthenticated() ? (
              <div className="relative">
                <button 
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="flex items-center gap-2 px-3 py-2 rounded-xl hover:bg-gray-100 text-gray-700 hover:text-primary-600 transition-all"
                >
                  <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-primary-600 rounded-full flex items-center justify-center text-white font-semibold">
                    {user?.firstName?.charAt(0) || 'U'}
                  </div>
                  <span className="hidden lg:inline font-medium">{user?.firstName}</span>
                </button>
                
                {userMenuOpen && (
                  <>
                    <div 
                      className="fixed inset-0 z-10" 
                      onClick={() => setUserMenuOpen(false)}
                    />
                    <div className="absolute right-0 mt-2 w-64 bg-white rounded-2xl shadow-2xl border-2 border-gray-100 py-2 z-20 animate-scale-in">
                      {/* User Info */}
                      <div className="px-4 py-3 border-b-2 border-gray-100">
                        <p className="font-semibold text-gray-900">{user?.firstName} {user?.lastName}</p>
                        <p className="text-sm text-gray-500">{user?.email}</p>
                        {user?.role === 'ADMIN' && (
                          <span className="inline-block mt-2 px-3 py-1 bg-purple-100 text-purple-800 text-xs font-semibold rounded-full">
                            Admin
                          </span>
                        )}
                      </div>

                      {/* Menu Items */}
                      <div className="py-2">
                        <Link 
                          href="/profile" 
                          className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors"
                          onClick={() => setUserMenuOpen(false)}
                        >
                          <User className="w-5 h-5 text-gray-400" />
                          <span className="font-medium">My Profile</span>
                        </Link>
                        <Link 
                          href="/orders" 
                          className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors"
                          onClick={() => setUserMenuOpen(false)}
                        >
                          <Package className="w-5 h-5 text-gray-400" />
                          <span className="font-medium">My Orders</span>
                        </Link>
                        <Link 
                          href="/wishlist" 
                          className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors"
                          onClick={() => setUserMenuOpen(false)}
                        >
                          <Heart className="w-5 h-5 text-gray-400" />
                          <span className="font-medium">Wishlist</span>
                        </Link>
                        {user?.role === 'ADMIN' && (
                          <Link 
                            href="/admin" 
                            className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors bg-purple-50"
                            onClick={() => setUserMenuOpen(false)}
                          >
                            <Settings className="w-5 h-5 text-purple-600" />
                            <span className="font-medium text-purple-600">Admin Dashboard</span>
                          </Link>
                        )}
                      </div>

                      {/* Logout */}
                      <div className="border-t-2 border-gray-100 pt-2">
                        <button
                          onClick={handleLogout}
                          className="flex items-center gap-3 px-4 py-3 hover:bg-red-50 transition-colors w-full text-left text-red-600"
                        >
                          <LogOut className="w-5 h-5" />
                          <span className="font-medium">Logout</span>
                        </button>
                      </div>
                    </div>
                  </>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link href="/login" className="btn btn-outline btn-sm hidden sm:inline-flex">
                  Login
                </Link>
                <Link href="/register" className="btn btn-primary btn-sm">
                  Sign Up
                </Link>
              </div>
            )}

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden flex items-center justify-center w-10 h-10 rounded-full hover:bg-gray-100 text-gray-700"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Search */}
        <div className="md:hidden py-3 border-t border-gray-100">
          <form onSubmit={handleSearch}>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search products..."
                className="block w-full pl-10 pr-20 py-2.5 border-2 border-gray-200 rounded-lg text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 bg-gray-50 focus:bg-white transition-all"
              />
              <button
                type="submit"
                className="absolute inset-y-0 right-0 flex items-center pr-2"
              >
                <span className="px-3 py-1.5 bg-primary-600 text-white text-sm font-medium rounded-md hover:bg-primary-700 transition-colors">
                  Go
                </span>
              </button>
            </div>
          </form>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden py-4 space-y-1 border-t-2 border-gray-100 animate-slide-down">
            <Link 
              href="/" 
              className="flex items-center gap-3 py-3 px-4 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              <Home className="w-5 h-5" />
              <span className="font-medium">Home</span>
            </Link>
            <Link 
              href="/products" 
              className="flex items-center gap-3 py-3 px-4 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              <Package className="w-5 h-5" />
              <span className="font-medium">Products</span>
            </Link>
            <Link 
              href="/categories" 
              className="flex items-center gap-3 py-3 px-4 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              <Grid className="w-5 h-5" />
              <span className="font-medium">Categories</span>
            </Link>
            <Link 
              href="/tutorials" 
              className="flex items-center gap-3 py-3 px-4 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              <BookOpen className="w-5 h-5" />
              <span className="font-medium">Tutorials</span>
            </Link>
            <Link 
              href="/about" 
              className="flex items-center gap-3 py-3 px-4 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              <Info className="w-5 h-5" />
              <span className="font-medium">About</span>
            </Link>
            <Link 
              href="/contact" 
              className="flex items-center gap-3 py-3 px-4 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              <Phone className="w-5 h-5" />
              <span className="font-medium">Contact Us</span>
            </Link>
            <Link 
              href="/track-order" 
              className="flex items-center gap-3 py-3 px-4 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              <Tag className="w-5 h-5" />
              <span className="font-medium">Track Order</span>
            </Link>
          </div>
        )}
      </nav>
    </header>
  );
}
