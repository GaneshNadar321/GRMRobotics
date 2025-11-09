'use client';

import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import api from '@/lib/api';
import { Search, Mail, Phone, Calendar, ShoppingBag, Eye } from 'lucide-react';
import Link from 'next/link';

export default function CustomersPage() {
  const [searchQuery, setSearchQuery] = useState('');

  const { data: customers, isLoading } = useQuery({
    queryKey: ['admin-customers', searchQuery],
    queryFn: async () => {
      const params = searchQuery ? `?search=${searchQuery}` : '';
      const response = await api.get(`/admin/users${params}`);
      return response.data;
    },
  });

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Customer Management</h1>
        <p className="text-gray-600">View and manage all customers</p>
      </div>

      {/* Search */}
      <div className="card mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search customers by name or email..."
            className="input pl-10 w-full"
          />
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="card">
          <h3 className="text-gray-600 text-sm mb-1">Total Customers</h3>
          <p className="text-2xl font-bold">{customers?.total || 0}</p>
        </div>
        <div className="card">
          <h3 className="text-gray-600 text-sm mb-1">New This Month</h3>
          <p className="text-2xl font-bold text-green-600">
            {customers?.newThisMonth || 0}
          </p>
        </div>
        <div className="card">
          <h3 className="text-gray-600 text-sm mb-1">Active Customers</h3>
          <p className="text-2xl font-bold text-blue-600">
            {customers?.active || 0}
          </p>
        </div>
        <div className="card">
          <h3 className="text-gray-600 text-sm mb-1">Total Orders</h3>
          <p className="text-2xl font-bold text-purple-600">
            {customers?.totalOrders || 0}
          </p>
        </div>
      </div>

      {/* Customers Table */}
      <div className="card">
        {isLoading ? (
          <div className="text-center py-12">
            <div className="w-12 h-12 border-4 border-primary-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
            <p className="text-gray-600 mt-4">Loading customers...</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="text-left py-4 px-6 font-semibold text-gray-700">Customer</th>
                  <th className="text-left py-4 px-6 font-semibold text-gray-700">Contact</th>
                  <th className="text-left py-4 px-6 font-semibold text-gray-700">Joined</th>
                  <th className="text-left py-4 px-6 font-semibold text-gray-700">Orders</th>
                  <th className="text-left py-4 px-6 font-semibold text-gray-700">Total Spent</th>
                  <th className="text-right py-4 px-6 font-semibold text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {customers?.users?.map((customer: any) => (
                  <tr key={customer.id} className="hover:bg-gray-50 transition-colors">
                    <td className="py-4 px-6">
                      <div>
                        <p className="font-medium">{customer.firstName} {customer.lastName}</p>
                        <p className="text-sm text-gray-500">{customer.email}</p>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 text-sm">
                          <Mail className="w-4 h-4 text-gray-400" />
                          <span>{customer.email}</span>
                        </div>
                        {customer.phone && (
                          <div className="flex items-center gap-2 text-sm">
                            <Phone className="w-4 h-4 text-gray-400" />
                            <span>{customer.phone}</span>
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Calendar className="w-4 h-4" />
                        {new Date(customer.createdAt).toLocaleDateString()}
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-2">
                        <ShoppingBag className="w-4 h-4 text-gray-400" />
                        <span className="font-medium">{customer._count?.orders || 0}</span>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <span className="font-semibold text-green-600">
                        ₹{Number(customer.totalSpent || 0).toLocaleString()}
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          href={`/admin/customers/${customer.id}`}
                          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                          title="View Details"
                        >
                          <Eye className="w-5 h-5 text-gray-600" />
                        </Link>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {(!customers?.users || customers.users.length === 0) && (
              <div className="text-center py-12 text-gray-500">
                No customers found
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
