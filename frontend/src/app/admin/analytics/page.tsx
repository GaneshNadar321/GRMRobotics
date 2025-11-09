'use client';

import { useQuery } from '@tanstack/react-query';
import { useAuthStore } from '@/store/authStore';
import api from '@/lib/api';
import { TrendingUp, DollarSign, ShoppingBag, Users, Package } from 'lucide-react';

export default function AdminAnalyticsPage() {
  const { user, isAuthenticated } = useAuthStore();

  const { data: stats } = useQuery({
    queryKey: ['admin-analytics'],
    queryFn: async () => {
      const response = await api.get('/admin/dashboard');
      return response.data;
    },
    enabled: isAuthenticated() && user?.role === 'ADMIN',
  });

  if (!isAuthenticated() || user?.role !== 'ADMIN') {
    return null;
  }

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Analytics Dashboard</h1>
        <p className="text-gray-600">Track your store's performance and growth</p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="bg-green-100 p-3 rounded-xl">
              <DollarSign className="w-6 h-6 text-green-600" />
            </div>
            <span className="text-sm text-green-600 font-semibold bg-green-50 px-2 py-1 rounded-full">
              +12.5%
            </span>
          </div>
          <h3 className="text-gray-600 text-sm font-medium mb-2">Total Revenue</h3>
          <p className="text-3xl font-bold text-gray-900">₹{Number(stats?.totalRevenue || 0).toLocaleString()}</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="bg-blue-100 p-3 rounded-xl">
              <ShoppingBag className="w-6 h-6 text-blue-600" />
            </div>
            <span className="text-sm text-green-600 font-semibold bg-green-50 px-2 py-1 rounded-full">
              +8.2%
            </span>
          </div>
          <h3 className="text-gray-600 text-sm font-medium mb-2">Total Orders</h3>
          <p className="text-3xl font-bold text-gray-900">{stats?.totalOrders || 0}</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="bg-purple-100 p-3 rounded-xl">
              <Users className="w-6 h-6 text-purple-600" />
            </div>
            <span className="text-sm text-green-600 font-semibold bg-green-50 px-2 py-1 rounded-full">
              +15.3%
            </span>
          </div>
          <h3 className="text-gray-600 text-sm font-medium mb-2">Total Customers</h3>
          <p className="text-3xl font-bold text-gray-900">{stats?.totalUsers || 0}</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="bg-orange-100 p-3 rounded-xl">
              <Package className="w-6 h-6 text-orange-600" />
            </div>
            <span className="text-sm text-green-600 font-semibold bg-green-50 px-2 py-1 rounded-full">
              +2
            </span>
          </div>
          <h3 className="text-gray-600 text-sm font-medium mb-2">Total Products</h3>
          <p className="text-3xl font-bold text-gray-900">{stats?.totalProducts || 0}</p>
        </div>
      </div>

      {/* Charts Placeholder */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Sales Trend</h3>
          <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
            <div className="text-center">
              <TrendingUp className="w-12 h-12 text-gray-400 mx-auto mb-2" />
              <p className="text-gray-500">Sales chart coming soon</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Top Products</h3>
          <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
            <div className="text-center">
              <Package className="w-12 h-12 text-gray-400 mx-auto mb-2" />
              <p className="text-gray-500">Product analytics coming soon</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}