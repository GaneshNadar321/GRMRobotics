'use client';

import { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/authStore';
import api from '@/lib/api';
import { ArrowLeft, Save, Upload, X, FileText } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import toast from 'react-hot-toast';

export default function NewProductPage() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { user, isAuthenticated } = useAuthStore();

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
    specifications: [] as Array<{key: string, value: string}>,
  });

  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [pdfFiles, setPdfFiles] = useState<File[]>([]);
  const [pdfPreviews, setPdfPreviews] = useState<{name: string, size: number}[]>([]);
  
  // Specifications table state
  const [specRows, setSpecRows] = useState(3);
  const [specCols, setSpecCols] = useState(2);
  const [specifications, setSpecifications] = useState<Array<{key: string, value: string}>>([
    {key: '', value: ''}
  ]);

  const { data: categories } = useQuery({
    queryKey: ['categories'],
    queryFn: async () => {
      const response = await api.get('/products/categories');
      return response.data;
    },
  });

  const createMutation = useMutation({
    mutationFn: async (data: any) => {
      // First create the product
      const response = await api.post('/products', data);
      const productId = response.data.id;

      // Then upload images if any
      if (imageFiles.length > 0) {
        const formData = new FormData();
        imageFiles.forEach((file) => {
          formData.append('images', file);
        });

        await api.post(`/products/${productId}/images`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
      }

      // Upload PDFs if any
      if (pdfFiles.length > 0) {
        for (const file of pdfFiles) {
          const formData = new FormData();
          formData.append('file', file);
          formData.append('title', file.name.replace('.pdf', ''));
          formData.append('description', 'Product manual');

          await api.post(`/products/${productId}/manuals`, formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          });
        }
      }

      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-products'] });
      toast.success('Product created successfully!');
      router.push('/admin/products');
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.error || 'Failed to create product');
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

    createMutation.mutate(productData);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    // Validate file sizes
    const maxSize = 5 * 1024 * 1024; // 5MB
    const validFiles = files.filter(file => {
      if (file.size > maxSize) {
        toast.error(`${file.name} is too large. Max size is 5MB`);
        return false;
      }
      return true;
    });

    if (validFiles.length === 0) return;

    // Create previews
    const newPreviews: string[] = [];
    validFiles.forEach(file => {
      const reader = new FileReader();
      reader.onloadend = () => {
        newPreviews.push(reader.result as string);
        if (newPreviews.length === validFiles.length) {
          setImagePreviews([...imagePreviews, ...newPreviews]);
        }
      };
      reader.readAsDataURL(file);
    });

    setImageFiles([...imageFiles, ...validFiles]);
    toast.success(`${validFiles.length} image(s) selected`);
  };

  const removeImage = (index: number) => {
    setImageFiles(imageFiles.filter((_, i) => i !== index));
    setImagePreviews(imagePreviews.filter((_, i) => i !== index));
    toast.success('Image removed');
  };

  const handlePdfChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    // Validate file sizes
    const maxSize = 10 * 1024 * 1024; // 10MB
    const validFiles = files.filter(file => {
      if (file.size > maxSize) {
        toast.error(`${file.name} is too large. Max size is 10MB`);
        return false;
      }
      if (!file.type.includes('pdf')) {
        toast.error(`${file.name} is not a PDF file`);
        return false;
      }
      return true;
    });

    if (validFiles.length === 0) return;

    // Create previews
    const newPreviews = validFiles.map(file => ({
      name: file.name,
      size: file.size
    }));

    setPdfFiles([...pdfFiles, ...validFiles]);
    setPdfPreviews([...pdfPreviews, ...newPreviews]);
    toast.success(`${validFiles.length} PDF(s) selected`);
  };

  const removePdf = (index: number) => {
    setPdfFiles(pdfFiles.filter((_, i) => i !== index));
    setPdfPreviews(pdfPreviews.filter((_, i) => i !== index));
    toast.success('PDF removed');
  };

  const generateSlug = (name: string) => {
    return name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  };

  // Specifications management functions
  const addSpecification = () => {
    setSpecifications([...specifications, {key: '', value: ''}]);
  };

  const removeSpecification = (index: number) => {
    setSpecifications(specifications.filter((_, i) => i !== index));
  };

  const updateSpecification = (index: number, field: 'key' | 'value', value: string) => {
    const updated = [...specifications];
    updated[index][field] = value;
    setSpecifications(updated);
    setFormData({...formData, specifications: updated});
  };

  const generateSpecTable = () => {
    const newSpecs = [];
    for (let i = 0; i < specRows; i++) {
      newSpecs.push({key: '', value: ''});
    }
    setSpecifications(newSpecs);
  };

  if (!isAuthenticated() || user?.role !== 'ADMIN') {
    router.push('/');
    return null;
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
        <h1 className="text-3xl font-bold">Add New Product</h1>
        <p className="text-gray-600 mt-2">Fill in the details to create a new product</p>
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
                placeholder="e.g., Starter Robot Kit"
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
                placeholder="starter-robot-kit"
              />
              <p className="form-help">Auto-generated from product name</p>
            </div>

            <div className="form-group">
              <label className="form-label">Short Description *</label>
              <input
                type="text"
                value={formData.shortDescription}
                onChange={(e) => setFormData({ ...formData, shortDescription: e.target.value })}
                className="input"
                required
                placeholder="Brief one-line description"
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
                placeholder="Detailed product description..."
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
                placeholder="1999"
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
                placeholder="2499"
              />
              <p className="form-help">Original price for showing discount</p>
            </div>

            <div className="form-group">
              <label className="form-label">SKU *</label>
              <input
                type="text"
                value={formData.sku}
                onChange={(e) => setFormData({ ...formData, sku: e.target.value })}
                className="input"
                required
                placeholder="GRM-START-001"
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
                placeholder="50"
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
                placeholder="8-12 years"
              />
            </div>

            <div className="form-group">
              <label className="form-label">Tags</label>
              <input
                type="text"
                value={formData.tags}
                onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                className="input"
                placeholder="beginner, educational, motors"
              />
              <p className="form-help">Comma-separated tags</p>
            </div>
          </div>
        </div>

        {/* Product Specifications */}
        <div className="card">
          <h2 className="text-xl font-bold mb-4">Product Specifications</h2>
          
          <div className="space-y-4">
            {/* Table Size Controls */}
            <div className="flex gap-4 items-end">
              <div className="form-group">
                <label className="form-label">Number of Specifications</label>
                <input
                  type="number"
                  value={specRows}
                  onChange={(e) => setSpecRows(parseInt(e.target.value) || 1)}
                  className="input w-20"
                  min="1"
                  max="20"
                />
              </div>
              <button
                type="button"
                onClick={generateSpecTable}
                className="btn btn-secondary"
              >
                Generate Table
              </button>
              <button
                type="button"
                onClick={addSpecification}
                className="btn btn-secondary"
              >
                Add Row
              </button>
            </div>

            {/* Specifications Table */}
            <div className="border rounded-lg overflow-hidden">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-2 text-left font-medium text-gray-700">Specification</th>
                    <th className="px-4 py-2 text-left font-medium text-gray-700">Value</th>
                    <th className="px-4 py-2 text-center font-medium text-gray-700">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {specifications.map((spec, index) => (
                    <tr key={index} className="border-t">
                      <td className="px-4 py-2">
                        <input
                          type="text"
                          value={spec.key}
                          onChange={(e) => updateSpecification(index, 'key', e.target.value)}
                          className="input w-full"
                          placeholder="e.g., Dimensions, Weight, Battery"
                        />
                      </td>
                      <td className="px-4 py-2">
                        <input
                          type="text"
                          value={spec.value}
                          onChange={(e) => updateSpecification(index, 'value', e.target.value)}
                          className="input w-full"
                          placeholder="e.g., 15cm x 10cm x 5cm"
                        />
                      </td>
                      <td className="px-4 py-2 text-center">
                        <button
                          type="button"
                          onClick={() => removeSpecification(index)}
                          className="text-red-600 hover:text-red-800"
                          disabled={specifications.length === 1}
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <p className="form-help">
              Add product specifications like dimensions, weight, battery life, etc.
            </p>
          </div>
        </div>

        {/* Product Images */}
        <div className="card">
          <h2 className="text-xl font-bold mb-4">Product Images</h2>
          
          <div className="space-y-4">
            {/* Image Previews */}
            {imagePreviews.length > 0 && (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                {imagePreviews.map((preview, index) => (
                  <div key={index} className="relative group">
                    <div className="relative aspect-square rounded-lg overflow-hidden border-2 border-gray-200">
                      <Image
                        src={preview}
                        alt={`Preview ${index + 1}`}
                        fill
                        className="object-cover"
                      />
                      {index === 0 && (
                        <div className="absolute top-2 left-2 bg-primary-600 text-white text-xs px-2 py-1 rounded">
                          Main
                        </div>
                      )}
                    </div>
                    <button
                      type="button"
                      onClick={() => removeImage(index)}
                      className="absolute -top-2 -right-2 w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-lg hover:bg-red-600"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}

            <div className="form-group">
              <label className="form-label">Upload Images (Optional)</label>
              <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-primary-500 transition-colors">
                <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600 mb-2">Click to select product images</p>
                <p className="text-sm text-gray-500">Supports: JPG, PNG, WebP (Max 5MB each)</p>
                <input
                  id="product-images"
                  type="file"
                  multiple
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageChange}
                />
                <label htmlFor="product-images" className="btn btn-secondary mt-4 cursor-pointer inline-block">
                  Choose Images
                </label>
              </div>
              <p className="form-help">Upload multiple images. First image will be the main product image.</p>
            </div>
          </div>
        </div>

        {/* Product Manuals (PDF) */}
        <div className="card">
          <h2 className="text-xl font-bold mb-4">Product Manuals (Optional)</h2>
          
          <div className="space-y-4">
            {/* PDF Previews */}
            {pdfPreviews.length > 0 && (
              <div className="space-y-3 mb-4">
                {pdfPreviews.map((pdf, index) => (
                  <div key={index} className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg group">
                    <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <FileText className="w-6 h-6 text-red-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium truncate">{pdf.name}</p>
                      <p className="text-sm text-gray-500">{(pdf.size / 1024 / 1024).toFixed(2)} MB</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => removePdf(index)}
                      className="w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}

            <div className="form-group">
              <label className="form-label">Upload PDF Manuals</label>
              <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-primary-500 transition-colors">
                <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600 mb-2">Click to select PDF manuals</p>
                <p className="text-sm text-gray-500">Supports: PDF (Max 10MB each)</p>
                <input
                  id="product-manuals"
                  type="file"
                  multiple
                  accept=".pdf"
                  className="hidden"
                  onChange={handlePdfChange}
                />
                <label htmlFor="product-manuals" className="btn btn-secondary mt-4 cursor-pointer inline-block">
                  Choose PDF Files
                </label>
              </div>
              <p className="form-help">Upload user manuals, assembly guides, or documentation.</p>
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
            disabled={createMutation.isPending}
            className="btn btn-primary flex items-center gap-2"
          >
            <Save className="w-5 h-5" />
            {createMutation.isPending ? 'Creating...' : 'Create Product'}
          </button>
          <Link href="/admin/products" className="btn btn-secondary">
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
}
