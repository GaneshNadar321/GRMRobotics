'use client';

import { useState, useEffect } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useRouter, useParams } from 'next/navigation';
import { useAuthStore } from '@/store/authStore';
import api from '@/lib/api';
import { ArrowLeft, Save, Trash2 } from 'lucide-react';
import Link from 'next/link';
import toast from 'react-hot-toast';

export default function EditProductPage() {
  const router = useRouter();
  const params = useParams();
  const queryClient = useQueryClient();
  const { user, isAuthenticated } = useAuthStore();
  const productId = params.id as string;

  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    description: '',
    shortDescription: '',
    price: '',
    compareAtPrice: '',
    sku: '',
    stock: '',
    categoryId: '',
    difficulty: 'BEGINNER',
    ageGroup: '',
    tags: '',
    isFeatured: false,
    isActive: true,
  });

  const { data: product, isLoading: productLoading } = useQuery({
    queryKey: ['product', productId],
    queryFn: async () => {
      const response = await api.get(`/products/${productId}`);
      return response.data;
    },
    enabled: !!productId,
  });

  const { data: categories } = useQuery({
    queryKey: ['categories'],
    queryFn: async () => {
      const response = await api.get('/products/categories');
      return response.data;
    },
  });

  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name || '',
        slug: product.slug || '',
        description: product.description || '',
        shortDescription: product.shortDescription || '',
        price: product.price?.toString() || '',
        compareAtPrice: product.compareAtPrice?.toString() || '',
        sku: product.sku || '',
        stock: product.stock?.toString() || '',
        categoryId: product.categoryId || '',
        difficulty: product.difficulty || 'BEGINNER',
        ageGroup: product.ageGroup || '',
        tags: product.tags?.join(', ') || '',
        isFeatured: product.isFeatured || false,
        isActive: product.isActive !== false,
      });
    }
  }, [product]);

  const updateMutation = useMutation({
    mutationFn: async (data: any) => {
      const response = await api.put(`/products/${productId}`, data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-products'] });
      queryClient.invalidateQueries({ queryKey: ['product', productId] });
      toast.success('Product updated successfully!');
      router.push('/admin/products');
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.error || 'Failed to update product');
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async () => {
      await api.delete(`/products/${productId}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-products'] });
      toast.success('Product deleted successfully!');
      router.push('/admin/products');
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.error || 'Failed to delete product');
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const productData = {
      ...formData,
      price: parseFloat(formData.price),
      compareAtPrice: formData.compareAtPrice ? parseFloat(formData.compareAtPrice) : undefined,
      stock: parseInt(formData.stock),
      tags: formData.tags.split(',').map(tag => tag.trim()).filter(Boolean),
    };

    updateMutation.mutate(productData);
  };

  const handleDelete = () => {
    if (confirm(`Are you sure you want to delete "${product?.name}"?\n\nThis action cannot be undone.`)) {
      deleteMutation.mutate();
    }
  };

  const generateSlug = (name: string) => {
    return name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  };

  if (!isAuthenticated() || user?.role !== 'ADMIN') {
    router.push('/');
    return null;
  }

  if (productLoading) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="animate-pulse space-y-6">
          <div className="h-8 bg-gray-200 rounded w-1/4"></div>
          <div className="h-64 bg-gray-200 rounded"></div>
          <div className="h-64 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <Link
          href="/admin/products"
          className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Products
        </Link>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Edit Product</h1>
            <p className="text-gray-600 mt-2">Update product details</p>
          </div>
          <button
            onClick={handleDelete}
            disabled={deleteMutation.isPending}
            className="btn bg-red-600 hover:bg-red-700 text-white flex items-center gap-2"
          >
            <Trash2 className="w-5 h-5" />
            Delete Product
          </button>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Information */}
        <div className="card">
          <h2 className="text-xl font-bold mb-4">Basic Information</h2>
          
          <div className="space-y-4">
            <div className="form-group">
              <label className="form-label">Product Name *</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => {
                  setFormData({ 
                    ...formData, 
                    name: e.target.value,
                    slug: generateSlug(e.target.value)
                  });
                }}
                className="input"
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">URL Slug *</label>
              <input
                type="text"
                value={formData.slug}
                onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                className="input"
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Short Description *</label>
              <input
                type="text"
                value={formData.shortDescription}
                onChange={(e) => setFormData({ ...formData, shortDescription: e.target.value })}
                className="input"
                required
                maxLength={100}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Full Description *</label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="input min-h-[120px]"
                required
              />
            </div>
          </div>
        </div>

        {/* Pricing & Inventory */}
        <div className="card">
          <h2 className="text-xl font-bold mb-4">Pricing & Inventory</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="form-group">
              <label className="form-label">Price (₹) *</label>
              <input
                type="number"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                className="input"
                required
                min="0"
                step="0.01"
              />
            </div>

            <div className="form-group">
              <label className="form-label">Compare at Price (₹)</label>
              <input
                type="number"
                value={formData.compareAtPrice}
                onChange={(e) => setFormData({ ...formData, compareAtPrice: e.target.value })}
                className="input"
                min="0"
                step="0.01"
              />
            </div>

            <div className="form-group">
              <label className="form-label">SKU *</label>
              <input
                type="text"
                value={formData.sku}
                onChange={(e) => setFormData({ ...formData, sku: e.target.value })}
                className="input"
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Stock Quantity *</label>
              <input
                type="number"
                value={formData.stock}
                onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                className="input"
                required
                min="0"
              />
            </div>
          </div>
        </div>

        {/* Classification */}
        <div className="card">
          <h2 className="text-xl font-bold mb-4">Classification</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="form-group">
              <label className="form-label">Category *</label>
              <select
                value={formData.categoryId}
                onChange={(e) => setFormData({ ...formData, categoryId: e.target.value })}
                className="input"
                required
              >
                <option value="">Select a category</option>
                {categories?.map((cat: any) => (
                  <option key={cat.id} value={cat.id}>{cat.name}</option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Difficulty Level *</label>
              <select
                value={formData.difficulty}
                onChange={(e) => setFormData({ ...formData, difficulty: e.target.value })}
                className="input"
                required
              >
                <option value="BEGINNER">Beginner</option>
                <option value="INTERMEDIATE">Intermediate</option>
                <option value="ADVANCED">Advanced</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Age Group</label>
              <input
                type="text"
                value={formData.ageGroup}
                onChange={(e) => setFormData({ ...formData, ageGroup: e.target.value })}
                className="input"
              />
            </div>

            <div className="form-group">
              <label className="form-label">Tags</label>
              <input
                type="text"
                value={formData.tags}
                onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                className="input"
              />
            </div>
          </div>
        </div>

        {/* Status */}
        <div className="card">
          <h2 className="text-xl font-bold mb-4">Status</h2>
          
          <div className="space-y-4">
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.isFeatured}
                onChange={(e) => setFormData({ ...formData, isFeatured: e.target.checked })}
                className="w-5 h-5 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
              />
              <div>
                <span className="font-medium">Featured Product</span>
                <p className="text-sm text-gray-600">Show this product on the homepage</p>
              </div>
            </label>

            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.isActive}
                onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                className="w-5 h-5 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
              />
              <div>
                <span className="font-medium">Active</span>
                <p className="text-sm text-gray-600">Make this product visible to customers</p>
              </div>
            </label>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-4">
          <button
            type="submit"
            disabled={updateMutation.isPending}
            className="btn btn-primary flex items-center gap-2"
          >
            <Save className="w-5 h-5" />
            {updateMutation.isPending ? 'Saving...' : 'Save Changes'}
          </button>
          <Link href="/admin/products" className="btn btn-secondary">
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
}
