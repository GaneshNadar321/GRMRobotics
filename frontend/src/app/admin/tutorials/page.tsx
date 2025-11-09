'use client';

import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '@/lib/api';
import { Plus, Search, Edit, Trash2, Play, Video } from 'lucide-react';
import toast from 'react-hot-toast';
import Link from 'next/link';

export default function TutorialsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingTutorial, setEditingTutorial] = useState<any>(null);
  const queryClient = useQueryClient();

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    videoUrl: '',
    duration: '',
    productId: '',
    sortOrder: '0',
    isFree: true,
  });

  // Fetch products for dropdown
  const { data: products } = useQuery({
    queryKey: ['admin-products'],
    queryFn: async () => {
      const response = await api.get('/admin/products');
      return response.data.products || [];
    },
  });

  const createMutation = useMutation({
    mutationFn: async (data: any) => {
      await api.post('/admin/tutorials', data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-tutorials'] });
      toast.success('Tutorial created successfully!');
      setShowAddModal(false);
      resetForm();
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      await api.delete(`/admin/tutorials/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-tutorials'] });
      toast.success('Tutorial deleted successfully!');
    },
  });

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      videoUrl: '',
      duration: '',
      productId: '',
      sortOrder: '0',
      isFree: true,
    });
    setEditingTutorial(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const data = {
      ...formData,
      duration: formData.duration ? parseInt(formData.duration) * 60 : null,
      sortOrder: parseInt(formData.sortOrder),
    };
    createMutation.mutate(data);
  };

  const { data: tutorials, isLoading } = useQuery({
    queryKey: ['admin-tutorials', searchQuery],
    queryFn: async () => {
      const response = await api.get('/admin/tutorials');
      return response.data;
    },
  });

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Tutorial Management</h1>
        <p className="text-gray-600">Manage video tutorials for products</p>
      </div>

      <div className="flex gap-4 mb-6">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search tutorials..."
            className="input pl-10 w-full"
          />
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="btn btn-primary flex items-center gap-2"
        >
          <Plus className="w-5 h-5" />
          Add Tutorial
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {isLoading ? (
          [...Array(6)].map((_, i) => (
            <div key={i} className="card animate-pulse">
              <div className="h-48 bg-gray-200 rounded-lg mb-4"></div>
              <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            </div>
          ))
        ) : tutorials?.length > 0 ? (
          tutorials.map((tutorial: any) => (
            <div key={tutorial.id} className="card card-hover">
              <div className="relative h-48 bg-gradient-to-br from-primary-100 to-primary-200 rounded-lg mb-4 flex items-center justify-center">
                <Play className="w-16 h-16 text-primary-600" />
                {tutorial.isFree && (
                  <span className="absolute top-2 right-2 bg-green-500 text-white px-2 py-1 rounded text-xs font-bold">
                    FREE
                  </span>
                )}
              </div>
              <h3 className="font-bold mb-2">{tutorial.title}</h3>
              <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                {tutorial.description}
              </p>
              <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                <span>{tutorial.duration ? `${Math.floor(tutorial.duration / 60)} min` : 'N/A'}</span>
                <span>Order: {tutorial.sortOrder}</span>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => {
                    setEditingTutorial(tutorial);
                    setShowAddModal(true);
                  }}
                  className="btn btn-secondary flex-1 text-sm"
                >
                  <Edit className="w-4 h-4 mr-1" />
                  Edit
                </button>
                <button
                  onClick={() => {
                    if (confirm('Delete this tutorial?')) {
                      deleteMutation.mutate(tutorial.id);
                    }
                  }}
                  className="btn bg-red-600 hover:bg-red-700 text-white text-sm"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full text-center py-12 card">
            <Video className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600 mb-4">No tutorials yet</p>
            <button
              onClick={() => setShowAddModal(true)}
              className="btn btn-primary"
            >
              Add Your First Tutorial
            </button>
          </div>
        )}
      </div>

      {/* Add/Edit Tutorial Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <h2 className="text-2xl font-bold mb-4">
              {editingTutorial ? 'Edit Tutorial' : 'Add New Tutorial'}
            </h2>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Title *</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="input w-full"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Description</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="input w-full"
                  rows={3}
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Video URL *</label>
                <input
                  type="url"
                  value={formData.videoUrl}
                  onChange={(e) => setFormData({ ...formData, videoUrl: e.target.value })}
                  className="input w-full"
                  placeholder="https://youtube.com/watch?v=..."
                  required
                />
                <p className="text-xs text-gray-500 mt-1">
                  Supported: YouTube, Vimeo, or direct video URLs
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Duration (minutes)</label>
                  <input
                    type="number"
                    value={formData.duration}
                    onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                    className="input w-full"
                    placeholder="15"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Sort Order</label>
                  <input
                    type="number"
                    value={formData.sortOrder}
                    onChange={(e) => setFormData({ ...formData, sortOrder: e.target.value })}
                    className="input w-full"
                    placeholder="0"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Product</label>
                <select
                  value={formData.productId}
                  onChange={(e) => setFormData({ ...formData, productId: e.target.value })}
                  className="input w-full"
                >
                  <option value="">Select a product (optional)</option>
                  {products?.map((product: any) => (
                    <option key={product.id} value={product.id}>
                      {product.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="isFree"
                  checked={formData.isFree}
                  onChange={(e) => setFormData({ ...formData, isFree: e.target.checked })}
                  className="rounded"
                />
                <label htmlFor="isFree" className="text-sm font-medium">
                  Free tutorial (accessible to all users)
                </label>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="submit"
                  disabled={createMutation.isPending}
                  className="btn btn-primary flex-1"
                >
                  {createMutation.isPending ? 'Saving...' : editingTutorial ? 'Update Tutorial' : 'Create Tutorial'}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowAddModal(false);
                    resetForm();
                  }}
                  className="btn btn-secondary"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
