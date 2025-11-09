'use client';

import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter, useParams } from 'next/navigation';
import { useAuthStore } from '@/store/authStore';
import api from '@/lib/api';
import { ArrowLeft, Plus, Trash2, Video, Edit, Save, X } from 'lucide-react';
import Link from 'next/link';
import toast from 'react-hot-toast';

export default function ProductTutorialsPage() {
  const router = useRouter();
  const params = useParams();
  const queryClient = useQueryClient();
  const { user, isAuthenticated } = useAuthStore();
  const productId = params.id as string;

  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    videoUrl: '',
    duration: '',
    sortOrder: 0,
    isFree: true,
  });

  const { data: product } = useQuery({
    queryKey: ['product', productId],
    queryFn: async () => {
      const response = await api.get(`/products/${productId}`);
      return response.data;
    },
    enabled: isAuthenticated() && user?.role === 'ADMIN',
  });

  const { data: tutorials, isLoading } = useQuery({
    queryKey: ['product-tutorials', productId],
    queryFn: async () => {
      const response = await api.get(`/products/${productId}/tutorials`);
      return response.data;
    },
    enabled: isAuthenticated() && user?.role === 'ADMIN',
  });

  const createMutation = useMutation({
    mutationFn: async (data: any) => {
      const response = await api.post(`/products/${productId}/tutorials`, data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['product-tutorials', productId] });
      toast.success('Tutorial added successfully!');
      setIsAdding(false);
      resetForm();
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.error || 'Failed to add tutorial');
    },
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: any }) => {
      const response = await api.put(`/products/${productId}/tutorials/${id}`, data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['product-tutorials', productId] });
      toast.success('Tutorial updated successfully!');
      setEditingId(null);
      resetForm();
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.error || 'Failed to update tutorial');
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      await api.delete(`/products/${productId}/tutorials/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['product-tutorials', productId] });
      toast.success('Tutorial deleted successfully');
    },
    onError: () => {
      toast.error('Failed to delete tutorial');
    },
  });

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      videoUrl: '',
      duration: '',
      sortOrder: 0,
      isFree: true,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const tutorialData = {
      ...formData,
      duration: parseInt(formData.duration) || 0,
    };

    if (editingId) {
      updateMutation.mutate({ id: editingId, data: tutorialData });
    } else {
      createMutation.mutate(tutorialData);
    }
  };

  const startEdit = (tutorial: any) => {
    setEditingId(tutorial.id);
    setFormData({
      title: tutorial.title,
      description: tutorial.description,
      videoUrl: tutorial.videoUrl,
      duration: tutorial.duration.toString(),
      sortOrder: tutorial.sortOrder,
      isFree: tutorial.isFree,
    });
    setIsAdding(true);
  };

  if (!isAuthenticated() || user?.role !== 'ADMIN') {
    router.push('/');
    return null;
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <Link
          href="/admin/products"
          className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Products
        </Link>
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-bold">Video Tutorials</h1>
            <p className="text-gray-600 mt-2">
              Product: <span className="font-semibold">{product?.name}</span>
            </p>
          </div>
          {!isAdding && (
            <button
              onClick={() => setIsAdding(true)}
              className="btn btn-primary flex items-center gap-2"
            >
              <Plus className="w-5 h-5" />
              Add Tutorial
            </button>
          )}
        </div>
      </div>

      {/* Add/Edit Form */}
      {isAdding && (
        <div className="card mb-8 animate-slide-down">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold">
              {editingId ? 'Edit Tutorial' : 'Add New Tutorial'}
            </h2>
            <button
              onClick={() => {
                setIsAdding(false);
                setEditingId(null);
                resetForm();
              }}
              className="text-gray-400 hover:text-gray-600"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="form-group md:col-span-2">
                <label className="form-label">Tutorial Title *</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="input"
                  required
                  placeholder="e.g., Getting Started - Unboxing"
                />
              </div>

              <div className="form-group md:col-span-2">
                <label className="form-label">Description *</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="input min-h-[80px]"
                  required
                  placeholder="Brief description of what this tutorial covers..."
                />
              </div>

              <div className="form-group">
                <label className="form-label">Video URL *</label>
                <input
                  type="url"
                  value={formData.videoUrl}
                  onChange={(e) => setFormData({ ...formData, videoUrl: e.target.value })}
                  className="input"
                  required
                  placeholder="https://youtube.com/watch?v=..."
                />
                <p className="form-help">YouTube, Vimeo, or direct video link</p>
              </div>

              <div className="form-group">
                <label className="form-label">Duration (seconds) *</label>
                <input
                  type="number"
                  value={formData.duration}
                  onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                  className="input"
                  required
                  min="0"
                  placeholder="300"
                />
                <p className="form-help">Video length in seconds (e.g., 300 = 5 minutes)</p>
              </div>

              <div className="form-group">
                <label className="form-label">Sort Order</label>
                <input
                  type="number"
                  value={formData.sortOrder}
                  onChange={(e) => setFormData({ ...formData, sortOrder: parseInt(e.target.value) })}
                  className="input"
                  min="0"
                  placeholder="0"
                />
                <p className="form-help">Display order (0 = first)</p>
              </div>

              <div className="form-group">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.isFree}
                    onChange={(e) => setFormData({ ...formData, isFree: e.target.checked })}
                    className="w-5 h-5 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                  />
                  <div>
                    <span className="font-medium">Free Tutorial</span>
                    <p className="text-sm text-gray-600">Available to all users without purchase</p>
                  </div>
                </label>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <button
                type="submit"
                disabled={createMutation.isPending || updateMutation.isPending}
                className="btn btn-primary flex items-center gap-2"
              >
                <Save className="w-5 h-5" />
                {editingId ? 'Update Tutorial' : 'Add Tutorial'}
              </button>
              <button
                type="button"
                onClick={() => {
                  setIsAdding(false);
                  setEditingId(null);
                  resetForm();
                }}
                className="btn btn-secondary"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Tutorials List */}
      <div className="space-y-4">
        {isLoading ? (
          <div className="card animate-pulse">
            <div className="h-20 bg-gray-200 rounded"></div>
          </div>
        ) : tutorials?.length === 0 ? (
          <div className="card text-center py-12">
            <Video className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-bold mb-2">No Tutorials Yet</h3>
            <p className="text-gray-600 mb-6">Add video tutorials to help customers learn about this product</p>
            {!isAdding && (
              <button
                onClick={() => setIsAdding(true)}
                className="btn btn-primary"
              >
                Add First Tutorial
              </button>
            )}
          </div>
        ) : (
          tutorials?.map((tutorial: any) => (
            <div key={tutorial.id} className="card hover:shadow-lg transition-shadow">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Video className="w-6 h-6 text-primary-600" />
                </div>
                
                <div className="flex-1">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-bold text-lg mb-1">{tutorial.title}</h3>
                      <p className="text-gray-600 text-sm mb-2">{tutorial.description}</p>
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <span>Duration: {Math.floor(tutorial.duration / 60)}:{(tutorial.duration % 60).toString().padStart(2, '0')}</span>
                        <span>Order: {tutorial.sortOrder}</span>
                        {tutorial.isFree && (
                          <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">
                            Free
                          </span>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => startEdit(tutorial)}
                        className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                        title="Edit"
                      >
                        <Edit className="w-5 h-5 text-gray-600" />
                      </button>
                      <button
                        onClick={() => {
                          if (confirm('Are you sure you want to delete this tutorial?')) {
                            deleteMutation.mutate(tutorial.id);
                          }
                        }}
                        className="p-2 hover:bg-red-50 rounded-lg transition-colors"
                        title="Delete"
                      >
                        <Trash2 className="w-5 h-5 text-red-600" />
                      </button>
                    </div>
                  </div>
                  
                  <a
                    href={tutorial.videoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary-600 hover:text-primary-700 text-sm font-medium mt-2 inline-block"
                  >
                    View Video →
                  </a>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
