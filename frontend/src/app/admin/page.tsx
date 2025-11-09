'use client';

import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuthStore } from '@/store/authStore';
import api from '@/lib/api';
import {
  ShoppingBag,
  Users,
  Package,
  DollarSign,
  TrendingUp,
  Clock,
  AlertCircle
} from 'lucide-react';

export default function AdminDashboard() {
  const router = useRouter();
  const { user, isAuthenticated } = useAuthStore();

  const { data: stats, isLoading } = useQuery({
    queryKey: ['admin-dashboard'],
    queryFn: async () => {
      const response = await api.get('/admin/dashboard');
      return response.data;
    },
    enabled: isAuthenticated() && user?.role === 'ADMIN',
  });

  const { data: orders } = useQuery({
    queryKey: ['admin-orders'],
    queryFn: async () => {
      const response = await api.get('/admin/orders?limit=5');
      return response.data;
    },
    enabled: isAuthenticated() && user?.role === 'ADMIN',
  });

  if (!isAuthenticated() || user?.role !== 'ADMIN') {
    router.push('/');
    return null;
  }

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-8"></div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-32 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  const statCards = [
    {
      title: 'Total Revenue',
      value: `₹${Number(stats?.totalRevenue || 0).toLocaleString()}`,
      icon: DollarSign,
      color: 'bg-green-500',
      change: '+12.5%',
    },
    {
      title: 'Total Orders',
      value: stats?.totalOrders || 0,
      icon: ShoppingBag,
      color: 'bg-blue-500',
      change: '+8.2%',
    },
    {
      title: 'Total Users',
      value: stats?.totalUsers || 0,
      icon: Users,
      color: 'bg-purple-500',
      change: '+15.3%',
    },
    {
      title: 'Total Products',
      value: stats?.totalProducts || 0,
      icon: Package,
      color: 'bg-orange-500',
      change: '+2',
    },
  ];

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard</h1>
            <p className="text-gray-600">Welcome back, {user?.firstName}! Here's what's happening with your store.</p>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-500">Last updated</p>
            <p className="text-sm font-medium text-gray-900">{new Date().toLocaleString()}</p>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {statCards.map((stat, index) => (
          <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-all duration-200">
            <div className="flex items-center justify-between mb-4">
              <div className={`${stat.color} p-3 rounded-xl shadow-lg`}>
                <stat.icon className="w-6 h-6 text-white" />
              </div>
              <div className="text-right">
                <span className="text-sm text-green-600 font-semibold bg-green-50 px-2 py-1 rounded-full">
                  {stat.change}
                </span>
              </div>
            </div>
            <h3 className="text-gray-600 text-sm font-medium mb-2">{stat.title}</h3>
            <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Alerts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-200 rounded-xl p-6">
          <div className="flex items-start gap-4">
            <div className="bg-yellow-100 p-3 rounded-xl">
              <Clock className="w-6 h-6 text-yellow-600" />
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-yellow-900 mb-2">Pending Orders</h3>
              <p className="text-sm text-yellow-800 mb-3">
                You have {stats?.pendingOrders || 0} pending orders that need your attention
              </p>
              <Link href="/admin/orders" className="text-yellow-700 hover:text-yellow-800 text-sm font-medium">
                View Orders →
              </Link>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-red-50 to-pink-50 border border-red-200 rounded-xl p-6">
          <div className="flex items-start gap-4">
            <div className="bg-red-100 p-3 rounded-xl">
              <AlertCircle className="w-6 h-6 text-red-600" />
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-red-900 mb-2">Low Stock Alert</h3>
              <p className="text-sm text-red-800 mb-3">
                {stats?.lowStockProducts || 0} products are running low on stock
              </p>
              <Link href="/admin/products" className="text-red-700 hover:text-red-800 text-sm font-medium">
                Manage Inventory →
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Orders */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden mb-8">
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-gray-900">Recent Orders</h2>
            <Link href="/admin/orders" className="text-primary-600 hover:text-primary-700 text-sm font-medium bg-primary-50 px-3 py-1 rounded-lg transition-colors">
              View All Orders
            </Link>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left py-4 px-6 font-semibold text-gray-700">Order ID</th>
                <th className="text-left py-4 px-6 font-semibold text-gray-700">Customer</th>
                <th className="text-left py-4 px-6 font-semibold text-gray-700">Amount</th>
                <th className="text-left py-4 px-6 font-semibold text-gray-700">Status</th>
                <th className="text-left py-4 px-6 font-semibold text-gray-700">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {orders?.orders?.slice(0, 5).map((order: any) => (
                <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                  <td className="py-4 px-6">
                    <span className="font-mono text-sm font-medium text-gray-900">{order.orderNumber}</span>
                  </td>
                  <td className="py-4 px-6">
                    <div>
                      <p className="font-medium text-gray-900">
                        {order.user?.firstName} {order.user?.lastName}
                      </p>
                      <p className="text-sm text-gray-500">{order.user?.email}</p>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <span className="font-semibold text-gray-900">₹{Number(order.total).toLocaleString()}</span>
                  </td>
                  <td className="py-4 px-6">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      order.status === 'DELIVERED' ? 'bg-green-100 text-green-800' :
                      order.status === 'SHIPPED' ? 'bg-blue-100 text-blue-800' :
                      order.status === 'PROCESSING' ? 'bg-yellow-100 text-yellow-800' :
                      order.status === 'PAID' ? 'bg-purple-100 text-purple-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <div>
                      <p className="text-sm font-medium text-gray-900">
                        {new Date(order.createdAt).toLocaleDateString()}
                      </p>
                      <p className="text-xs text-gray-500">
                        {new Date(order.createdAt).toLocaleTimeString()}
                      </p>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {(!orders?.orders || orders.orders.length === 0) && (
            <div className="text-center py-12">
              <ShoppingBag className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500 font-medium">No orders yet</p>
              <p className="text-sm text-gray-400">Orders will appear here once customers start purchasing</p>
            </div>
          )}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Link href="/admin/products" className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md hover:border-primary-200 transition-all duration-200 group">
          <div className="flex items-center gap-4">
            <div className="bg-primary-100 p-3 rounded-xl group-hover:bg-primary-200 transition-colors">
              <Package className="w-8 h-8 text-primary-600" />
            </div>
            <div>
              <h3 className="font-bold text-gray-900 mb-1">Manage Products</h3>
              <p className="text-sm text-gray-600">Add, edit, or remove products from your catalog</p>
            </div>
          </div>
        </Link>

        <Link href="/admin/orders" className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md hover:border-primary-200 transition-all duration-200 group">
          <div className="flex items-center gap-4">
            <div className="bg-blue-100 p-3 rounded-xl group-hover:bg-blue-200 transition-colors">
              <ShoppingBag className="w-8 h-8 text-blue-600" />
            </div>
            <div>
              <h3 className="font-bold text-gray-900 mb-1">Process Orders</h3>
              <p className="text-sm text-gray-600">Review and fulfill customer orders</p>
            </div>
          </div>
        </Link>

        <Link href="/admin/analytics" className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md hover:border-primary-200 transition-all duration-200 group">
          <div className="flex items-center gap-4">
            <div className="bg-green-100 p-3 rounded-xl group-hover:bg-green-200 transition-colors">
              <TrendingUp className="w-8 h-8 text-green-600" />
            </div>
            <div>
              <h3 className="font-bold text-gray-900 mb-1">View Analytics</h3>
              <p className="text-sm text-gray-600">Track sales performance and insights</p>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
}
