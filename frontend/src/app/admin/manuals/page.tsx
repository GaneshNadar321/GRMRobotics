'use client';

import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '@/lib/api';
import { Plus, Search, Edit, Trash2, Download, FileText, Upload } from 'lucide-react';
import toast from 'react-hot-toast';

export default function ManualsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [editingManual, setEditingManual] = useState<any>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const queryClient = useQueryClient();

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    productId: '',
    version: '1.0',
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
    mutationFn: async (data: FormData) => {
      await api.post('/admin/manuals', data, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-manuals'] });
      toast.success('Manual uploaded successfully!');
      setShowUploadModal(false);
      resetForm();
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.error || 'Failed to upload manual');
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      await api.delete(`/admin/manuals/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-manuals'] });
      toast.success('Manual deleted successfully!');
    },
  });

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      productId: '',
      version: '1.0',
    });
    setSelectedFile(null);
    setEditingManual(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedFile) {
      toast.error('Please select a PDF file');
      return;
    }

    const data = new FormData();
    data.append('file', selectedFile);
    data.append('title', formData.title);
    data.append('description', formData.description);
    data.append('version', formData.version);
    if (formData.productId) {
      data.append('productId', formData.productId);
    }

    createMutation.mutate(data);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.type !== 'application/pdf') {
        toast.error('Please select a PDF file');
        return;
      }
      if (file.size > 10 * 1024 * 1024) { // 10MB limit
        toast.error('File size must be less than 10MB');
        return;
      }
      setSelectedFile(file);
    }
  };

  const handleDownload = async (manual: any) => {
    try {
      // Use the dedicated download endpoint
      const response = await api.get(`/admin/manuals/${manual.id}/download`, {
        responseType: 'blob',
      });
      
      // Create blob URL and trigger download
      const blob = new Blob([response.data], { type: 'application/pdf' });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${manual.title}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
      
      toast.success('Download completed!');
    } catch (error) {
      console.error('Download error:', error);
      toast.error('Failed to download manual. Please try again.');
    }
  };

  const { data: manuals, isLoading } = useQuery({
    queryKey: ['admin-manuals', searchQuery],
    queryFn: async () => {
      const response = await api.get('/admin/manuals');
      return response.data;
    },
  });

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Manual Management</h1>
        <p className="text-gray-600">Manage PDF manuals and documentation</p>
      </div>

      <div className="flex gap-4 mb-6">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search manuals..."
            className="input pl-10 w-full"
          />
        </div>
        <button
          onClick={() => setShowUploadModal(true)}
          className="btn btn-primary flex items-center gap-2"
        >
          <Plus className="w-5 h-5" />
          Upload Manual
        </button>
      </div>

      <div className="card">
        {isLoading ? (
          <div className="text-center py-12">
            <div className="w-12 h-12 border-4 border-primary-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
          </div>
        ) : manuals?.length > 0 ? (
          <div className="space-y-4">
            {manuals.map((manual: any) => (
              <div key={manual.id} className="flex items-center gap-4 p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
                <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                  <FileText className="w-6 h-6 text-red-600" />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold">{manual.title}</h3>
                  <p className="text-sm text-gray-600">{manual.description}</p>
                  <div className="flex gap-4 mt-1 text-xs text-gray-500">
                    {manual.version && <span>Version {manual.version}</span>}
                    {manual.fileSize && <span>{(manual.fileSize / 1024 / 1024).toFixed(2)} MB</span>}
                  </div>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleDownload(manual)}
                    className="p-2 hover:bg-gray-100 rounded-lg"
                    title="Download Manual"
                  >
                    <Download className="w-5 h-5 text-gray-600" />
                  </button>
                  <button
                    onClick={() => {
                      setEditingManual(manual);
                      setFormData({
                        title: manual.title,
                        description: manual.description || '',
                        productId: manual.productId || '',
                        version: manual.version || '1.0',
                      });
                      setShowUploadModal(true);
                    }}
                    className="p-2 hover:bg-gray-100 rounded-lg"
                  >
                    <Edit className="w-5 h-5 text-gray-600" />
                  </button>
                  <button
                    onClick={() => {
                      if (confirm('Delete this manual? This action cannot be undone.')) {
                        deleteMutation.mutate(manual.id);
                      }
                    }}
                    className="p-2 hover:bg-red-50 rounded-lg"
                  >
                    <Trash2 className="w-5 h-5 text-red-600" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600 mb-4">No manuals yet</p>
            <button
              onClick={() => setShowUploadModal(true)}
              className="btn btn-primary"
            >
              Upload Your First Manual
            </button>
          </div>
        )}
      </div>

      {/* Upload/Edit Manual Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <h2 className="text-2xl font-bold mb-4">
              {editingManual ? 'Edit Manual' : 'Upload New Manual'}
            </h2>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Title *</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="input w-full"
                  placeholder="User Manual - Robot Kit v2.0"
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
                  placeholder="Comprehensive guide for assembling and programming the robot kit..."
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Version</label>
                  <input
                    type="text"
                    value={formData.version}
                    onChange={(e) => setFormData({ ...formData, version: e.target.value })}
                    className="input w-full"
                    placeholder="1.0"
                  />
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
              </div>

              {!editingManual && (
                <div>
                  <label className="block text-sm font-medium mb-1">PDF File *</label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                    <input
                      type="file"
                      accept=".pdf"
                      onChange={handleFileChange}
                      className="hidden"
                      id="manual-file"
                    />
                    <label htmlFor="manual-file" className="cursor-pointer">
                      <Upload className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                      <p className="text-gray-600 mb-1">
                        {selectedFile ? selectedFile.name : 'Click to upload PDF file'}
                      </p>
                      <p className="text-xs text-gray-500">
                        Maximum file size: 10MB
                      </p>
                    </label>
                  </div>
                  {selectedFile && (
                    <div className="mt-2 p-3 bg-green-50 border border-green-200 rounded-lg">
                      <div className="flex items-center gap-2">
                        <FileText className="w-5 h-5 text-green-600" />
                        <span className="text-sm text-green-800">{selectedFile.name}</span>
                        <span className="text-xs text-green-600">
                          ({(selectedFile.size / 1024 / 1024).toFixed(2)} MB)
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              )}

              <div className="flex gap-3 pt-4">
                <button
                  type="submit"
                  disabled={createMutation.isPending || (!selectedFile && !editingManual)}
                  className="btn btn-primary flex-1"
                >
                  {createMutation.isPending ? 'Uploading...' : editingManual ? 'Update Manual' : 'Upload Manual'}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowUploadModal(false);
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
