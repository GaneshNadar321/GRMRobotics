'use client';

import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import api from '@/lib/api';
import { Upload, Search, Trash2, Image as ImageIcon, FileText } from 'lucide-react';
import Image from 'next/image';

export default function MediaPage() {
  const [filter, setFilter] = useState('all');

  const { data: media, isLoading } = useQuery({
    queryKey: ['admin-media', filter],
    queryFn: async () => {
      const response = await api.get(`/admin/media?type=${filter}`);
      return response.data;
    },
  });

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Media Library</h1>
        <p className="text-gray-600">Manage all uploaded files</p>
      </div>

      <div className="flex gap-4 mb-6">
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="input"
        >
          <option value="all">All Files</option>
          <option value="images">Images Only</option>
          <option value="pdfs">PDFs Only</option>
        </select>
        <button className="btn btn-primary flex items-center gap-2 ml-auto">
          <Upload className="w-5 h-5" />
          Upload Files
        </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {isLoading ? (
          [...Array(12)].map((_, i) => (
            <div key={i} className="aspect-square bg-gray-200 rounded-lg animate-pulse"></div>
          ))
        ) : media?.length > 0 ? (
          media.map((file: any) => (
            <div key={file.id} className="group relative aspect-square bg-gray-100 rounded-lg overflow-hidden">
              {file.type === 'image' ? (
                <Image
                  src={file.url}
                  alt={file.name}
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center">
                  <FileText className="w-12 h-12 text-gray-400" />
                </div>
              )}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                <button className="p-2 bg-red-600 text-white rounded-lg hover:bg-red-700">
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
              <div className="absolute bottom-0 left-0 right-0 bg-black/70 text-white p-2 text-xs truncate">
                {file.name}
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full card text-center py-12">
            <ImageIcon className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600 mb-4">No files uploaded yet</p>
            <button className="btn btn-primary">Upload Your First File</button>
          </div>
        )}
      </div>
    </div>
  );
}
