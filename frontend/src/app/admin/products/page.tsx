'use client';

import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuthStore } from '@/store/authStore';
import api from '@/lib/api';
import { Plus, Edit, Trash2, Package, Search } from 'lucide-react';
import toast from 'react-hot-toast';
// Import UI components with fallbacks
const EmptyState = ({ icon: Icon, title, description, actionLabel, actionHref }: any) => (
  <div className="text-center py-12">
    <Icon className="w-16 h-16 text-gray-400 mx-auto mb-4" />
    <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
    <p className="text-gray-600 mb-6">{description}</p>
    {actionLabel && actionHref && (
      <Link href={actionHref} className="btn btn-primary">
        {actionLabel}
      </Link>
    )}
  </div>
);

const DeleteModal = ({ isOpen, onClose, onConfirm, title, message, itemName, isDeleting }: any) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
        <h2 className="text-lg font-semibold mb-4">{title}</h2>
        <p className="text-gray-600 mb-4">{message}</p>
        {itemName && <p className="text-sm text-gray-500 mb-4">Item: {itemName}</p>}
        <div className="flex gap-3">
          <button onClick={onClose} className="btn btn-secondary flex-1">Cancel</button>
          <button onClick={onConfirm} disabled={isDeleting} className="btn bg-red-600 hover:bg-red-700 text-white flex-1">
            {isDeleting ? 'Deleting...' : 'Delete'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default function AdminProductsPage() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { user, isAuthenticated } = useAuthStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState<any>(null);

  const { data: products, isLoading } = useQuery({
    queryKey: ['admin-products', searchQuery],
    queryFn: async () => {
      const params = searchQuery ? `?search=${searchQuery}` : '';
      const response = await api.get(`/admin/products${params}`);
      return response.data;
    },
    enabled: isAuthenticated() && user?.role === 'ADMIN',
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      await api.delete(`/admin/products/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-products'] });
      toast.success('Product deleted successfully!');
      setDeleteModalOpen(false);
      setProductToDelete(null);
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.error || 'Failed to delete product');
    },
  });

  const handleDeleteClick = (product: any) => {
    setProductToDelete(product);
    setDeleteModalOpen(true);
  };

  const handleDeleteConfirm = () => {
    if (productToDelete) {
      deleteMutation.mutate(productToDelete.id);
    }
  };

  if (!isAuthenticated() || user?.role !== 'ADMIN') {
    router.push('/');
    return null;
  }

  return (
    <div className="p-6">
      {/* Header */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Product Management</h1>
            <p className="text-gray-600">
              Manage your product catalog • {products?.products?.length || 0} products
            </p>
          </div>
          <Link href="/admin/products/new" className="btn btn-primary flex items-center gap-2 shadow-lg">
            <Plus className="w-5 h-5" />
            Add New Product
          </Link>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search products by name, SKU, or description..."
                className="input pl-10 w-full"
              />
            </div>
          </div>
          <div className="flex gap-2">
            <select className="input">
              <option>All Categories</option>
              <option>Robotics Kits</option>
              <option>Components</option>
              <option>Accessories</option>
            </select>
            <select className="input">
              <option>All Status</option>
              <option>Active</option>
              <option>Inactive</option>
            </select>
          </div>
        </div>
      </div>

      {/* Products List */}
      {isLoading ? (
        <div className="space-y-4">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="card animate-pulse">
              <div className="h-20 bg-gray-200 rounded"></div>
            </div>
          ))}
        </div>
      ) : products?.products?.length === 0 ? (
        <EmptyState
          icon={Package}
          title="No products yet"
          description="Start by adding your first product to the store"
          actionLabel="Add Product"
          actionHref="/admin/products/new"
        />
      ) : (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="text-left py-4 px-6 font-semibold text-gray-700">Product</th>
                  <th className="text-left py-4 px-6 font-semibold text-gray-700">SKU</th>
                  <th className="text-left py-4 px-6 font-semibold text-gray-700">Price</th>
                  <th className="text-left py-4 px-6 font-semibold text-gray-700">Stock</th>
                  <th className="text-left py-4 px-6 font-semibold text-gray-700">Status</th>
                  <th className="text-right py-4 px-6 font-semibold text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {products?.products?.map((product: any) => (
                  <tr key={product.id} className="hover:bg-gray-50 transition-colors">
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-4">
                        <div className="w-14 h-14 bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl flex items-center justify-center">
                          {product.images?.[0] ? (
                            <img 
                              src={product.images[0].url} 
                              alt={product.name}
                              className="w-full h-full object-cover rounded-xl"
                            />
                          ) : (
                            <Package className="w-7 h-7 text-gray-400" />
                          )}
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900">{product.name}</p>
                          <p className="text-sm text-gray-500">{product.category?.name}</p>
                          {product.isFeatured && (
                            <span className="inline-block bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full mt-1">
                              Featured
                            </span>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <span className="font-mono text-sm bg-gray-100 px-2 py-1 rounded">{product.sku}</span>
                    </td>
                    <td className="py-4 px-6">
                      <div>
                        <span className="font-semibold text-gray-900">₹{Number(product.price).toLocaleString()}</span>
                        {product.compareAtPrice && (
                          <p className="text-sm text-gray-500 line-through">₹{Number(product.compareAtPrice).toLocaleString()}</p>
                        )}
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-2">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                          product.stock > 10 ? 'bg-green-100 text-green-800' :
                          product.stock > 0 ? 'bg-yellow-100 text-yellow-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {product.stock} units
                        </span>
                        {product.stock <= product.lowStockThreshold && (
                          <span className="text-xs text-red-600 font-medium">Low Stock</span>
                        )}
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        product.isActive ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                      }`}>
                        {product.isActive ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center justify-end gap-1">
                        <Link
                          href={`/products/${product.id}`}
                          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                          title="View Product"
                        >
                          <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                          </svg>
                        </Link>
                        <Link
                          href={`/admin/products/${product.id}/tutorials`}
                          className="p-2 hover:bg-blue-50 rounded-lg transition-colors"
                          title="Manage Tutorials"
                        >
                          <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        </Link>
                        <Link
                          href={`/admin/products/${product.id}/edit`}
                          className="p-2 hover:bg-yellow-50 rounded-lg transition-colors"
                          title="Edit Product"
                        >
                          <Edit className="w-5 h-5 text-yellow-600" />
                        </Link>
                        <button
                          onClick={() => handleDeleteClick(product)}
                          className="p-2 hover:bg-red-50 rounded-lg transition-colors"
                          title="Delete Product"
                        >
                          <Trash2 className="w-5 h-5 text-red-600" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      <DeleteModal
        isOpen={deleteModalOpen}
        onClose={() => {
          setDeleteModalOpen(false);
          setProductToDelete(null);
        }}
        onConfirm={handleDeleteConfirm}
        title="Delete Product"
        message="Are you sure you want to delete this product? All associated data including images, tutorials, and reviews will be permanently removed."
        itemName={productToDelete?.name}
        isDeleting={deleteMutation.isPending}
      />
    </div>
  );
}
