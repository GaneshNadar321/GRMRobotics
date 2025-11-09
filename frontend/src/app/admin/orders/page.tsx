'use client';

import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useAuthStore } from '@/store/authStore';
import api from '@/lib/api';
import Link from 'next/link';
import { Search, Filter, Eye, Package, Truck, CheckCircle } from 'lucide-react';

export default function AdminOrdersPage() {
  const { user, isAuthenticated } = useAuthStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const { data: orders, isLoading } = useQuery({
    queryKey: ['admin-orders', searchQuery, statusFilter],
    queryFn: async () => {
      const params = new URLSearchParams();
      if (searchQuery) params.append('search', searchQuery);
      if (statusFilter !== 'all') params.append('status', statusFilter);
      
      const response = await api.get(`/admin/orders?${params.toString()}`);
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
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Order Management</h1>
            <p className="text-gray-600">
              Track and manage customer orders • {orders?.orders?.length || 0} orders
            </p>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search orders by ID, customer name, or email..."
                className="input pl-10 w-full"
              />
            </div>
          </div>
          <div className="flex gap-2">
            <select 
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="input"
            >
              <option value="all">All Status</option>
              <option value="PENDING">Pending</option>
              <option value="PAID">Paid</option>
              <option value="PROCESSING">Processing</option>
              <option value="SHIPPED">Shipped</option>
              <option value="DELIVERED">Delivered</option>
              <option value="CANCELLED">Cancelled</option>
            </select>
          </div>
        </div>
      </div>

      {/* Orders Table */}
      {isLoading ? (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
          <div className="animate-pulse space-y-4">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-16 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="text-left py-4 px-6 font-semibold text-gray-700">Order</th>
                  <th className="text-left py-4 px-6 font-semibold text-gray-700">Customer</th>
                  <th className="text-left py-4 px-6 font-semibold text-gray-700">Amount</th>
                  <th className="text-left py-4 px-6 font-semibold text-gray-700">Status</th>
                  <th className="text-left py-4 px-6 font-semibold text-gray-700">Date</th>
                  <th className="text-right py-4 px-6 font-semibold text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {orders?.orders?.map((order: any) => (
                  <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                    <td className="py-4 px-6">
                      <div>
                        <p className="font-mono text-sm font-medium text-gray-900">{order.orderNumber}</p>
                        <p className="text-xs text-gray-500">{order.items?.length || 0} items</p>
                      </div>
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
                        order.status === 'CANCELLED' ? 'bg-red-100 text-red-800' :
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
                    <td className="py-4 px-6">
                      <div className="flex items-center justify-end gap-1">
                        <Link
                          href={`/admin/orders/${order.id}`}
                          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                          title="View Order"
                        >
                          <Eye className="w-5 h-5 text-gray-600" />
                        </Link>
                        {order.status === 'PAID' && (
                          <Link
                            href={`/admin/orders/${order.id}`}
                            className="p-2 hover:bg-yellow-50 rounded-lg transition-colors"
                            title="Mark as Processing"
                          >
                            <Package className="w-5 h-5 text-yellow-600" />
                          </Link>
                        )}
                        {order.status === 'PROCESSING' && (
                          <Link
                            href={`/admin/orders/${order.id}`}
                            className="p-2 hover:bg-blue-50 rounded-lg transition-colors"
                            title="Mark as Shipped"
                          >
                            <Truck className="w-5 h-5 text-blue-600" />
                          </Link>
                        )}
                        {order.status === 'SHIPPED' && (
                          <Link
                            href={`/admin/orders/${order.id}`}
                            className="p-2 hover:bg-green-50 rounded-lg transition-colors"
                            title="Mark as Delivered"
                          >
                            <CheckCircle className="w-5 h-5 text-green-600" />
                          </Link>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {(!orders?.orders || orders.orders.length === 0) && (
            <div className="text-center py-12">
              <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No orders found</h3>
              <p className="text-gray-600">Orders will appear here when customers make purchases</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}