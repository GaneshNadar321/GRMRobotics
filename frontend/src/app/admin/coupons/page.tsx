'use client';

import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import api from '@/lib/api';
import { Plus, Search, Edit, Trash2, Tag, Copy } from 'lucide-react';
import toast from 'react-hot-toast';

export default function CouponsPage() {
  const [searchQuery, setSearchQuery] = useState('');

  const { data: coupons, isLoading } = useQuery({
    queryKey: ['admin-coupons', searchQuery],
    queryFn: async () => {
      const response = await api.get('/admin/coupons');
      return response.data;
    },
  });

  const copyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    toast.success('Coupon code copied!');
  };

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Coupon Management</h1>
        <p className="text-gray-600">Create and manage discount coupons</p>
      </div>

      <div className="flex gap-4 mb-6">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search coupons..."
            className="input pl-10 w-full"
          />
        </div>
        <button className="btn btn-primary flex items-center gap-2">
          <Plus className="w-5 h-5" />
          Create Coupon
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {isLoading ? (
          [...Array(6)].map((_, i) => (
            <div key={i} className="card animate-pulse">
              <div className="h-24 bg-gray-200 rounded"></div>
            </div>
          ))
        ) : coupons?.length > 0 ? (
          coupons.map((coupon: any) => (
            <div key={coupon.id} className="card">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Tag className="w-5 h-5 text-primary-600" />
                  <span className={`px-2 py-1 rounded text-xs font-medium ${
                    coupon.isActive ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                  }`}>
                    {coupon.isActive ? 'Active' : 'Inactive'}
                  </span>
                </div>
              </div>

              <div className="mb-3">
                <div className="flex items-center gap-2 mb-2">
                  <code className="text-lg font-bold text-primary-600">{coupon.code}</code>
                  <button
                    onClick={() => copyCode(coupon.code)}
                    className="p-1 hover:bg-gray-100 rounded"
                  >
                    <Copy className="w-4 h-4 text-gray-600" />
                  </button>
                </div>
                <p className="text-sm text-gray-600">{coupon.description}</p>
              </div>

              <div className="space-y-2 text-sm mb-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Discount:</span>
                  <span className="font-medium">
                    {coupon.discountType === 'PERCENTAGE' 
                      ? `${coupon.discountValue}%` 
                      : `₹${coupon.discountValue}`}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Used:</span>
                  <span className="font-medium">
                    {coupon.usageCount} / {coupon.usageLimit || '∞'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Valid Until:</span>
                  <span className="font-medium">
                    {new Date(coupon.validUntil).toLocaleDateString()}
                  </span>
                </div>
              </div>

              <div className="flex gap-2">
                <button className="btn btn-secondary flex-1 text-sm">
                  <Edit className="w-4 h-4 mr-1" />
                  Edit
                </button>
                <button className="btn bg-red-600 hover:bg-red-700 text-white text-sm">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full card text-center py-12">
            <Tag className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600 mb-4">No coupons yet</p>
            <button className="btn btn-primary">Create Your First Coupon</button>
          </div>
        )}
      </div>
    </div>
  );
}
