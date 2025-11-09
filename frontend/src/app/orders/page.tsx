'use client';

import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { useAuthStore } from '@/store/authStore';
import api from '@/lib/api';
import { Package, Clock, CheckCircle, XCircle, Truck, Download, FileText } from 'lucide-react';
import toast from 'react-hot-toast';

export default function OrdersPage() {
  const router = useRouter();
  const { isAuthenticated } = useAuthStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const { data, isLoading } = useQuery({
    queryKey: ['orders'],
    queryFn: async () => {
      const response = await api.get('/orders');
      return response.data;
    },
    enabled: isAuthenticated(),
  });

  // Don't render anything until mounted on client
  if (!mounted) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-8"></div>
          <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-32 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (!isAuthenticated()) {
    router.push('/login');
    return null;
  }

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-8"></div>
          <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-32 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  const orders = data?.orders || [];

  // Manual download handler
  const handleManualDownload = async (manual: any) => {
    try {
      // Use the public download endpoint
      const response = await api.get(`/manuals/${manual.id}/download`, {
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
      
      toast.success('Download started!');
    } catch (error) {
      console.error('Download error:', error);
      toast.error('Failed to download manual. Please try again.');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-16">
      <h1 className="text-3xl font-bold mb-8">My Orders</h1>

      {orders.length === 0 ? (
        <div className="card text-center py-16">
          <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-xl font-bold mb-2">No orders yet</h2>
          <p className="text-gray-600 mb-6">Start shopping to see your orders here</p>
          <button 
            onClick={() => router.push('/products')}
            className="btn btn-primary"
          >
            Browse Products
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map((order: any) => (
            <div key={order.id} className="card">
              <div className="flex justify-between mb-4">
                <div>
                  <h3 className="font-bold">Order #{order.orderNumber}</h3>
                  <p className="text-sm text-gray-600">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <span className="px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                  {order.status}
                </span>
              </div>

              <div className="space-y-4 mb-4">
                {order.items?.map((item: any) => (
                  <div key={item.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex gap-4 mb-3">
                      <div className="w-16 h-16 bg-gray-100 rounded flex items-center justify-center">
                        <Package className="w-8 h-8 text-gray-400" />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium">{item.productName}</p>
                        <p className="text-sm text-gray-600">SKU: {item.productSku}</p>
                        <p className="text-sm text-gray-600">Qty: {item.quantity} × ₹{item.price} = ₹{item.total}</p>
                      </div>
                    </div>
                    
                    {/* Show manuals for paid orders */}
                    {(order.status === 'PAID' || order.status === 'PROCESSING' || order.status === 'SHIPPED' || order.status === 'DELIVERED') && item.product?.manuals && item.product.manuals.length > 0 && (
                      <div className="border-t border-gray-200 pt-3">
                        <h4 className="text-sm font-semibold text-gray-900 mb-2 flex items-center gap-2">
                          <FileText className="w-4 h-4" />
                          Available Downloads
                        </h4>
                        <div className="space-y-2">
                          {item.product.manuals.map((manual: any) => (
                            <div key={manual.id} className="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
                              <div className="flex items-center gap-3">
                                <div className="w-8 h-8 bg-red-100 rounded flex items-center justify-center">
                                  <FileText className="w-4 h-4 text-red-600" />
                                </div>
                                <div>
                                  <p className="text-sm font-medium text-gray-900">{manual.title}</p>
                                  <p className="text-xs text-gray-500">
                                    {manual.version && `Version ${manual.version}`}
                                    {manual.fileSize && ` • ${(manual.fileSize / 1024 / 1024).toFixed(2)} MB`}
                                  </p>
                                </div>
                              </div>
                              <button
                                onClick={() => handleManualDownload(manual)}
                                className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-sm flex items-center gap-1 transition-colors"
                              >
                                <Download className="w-3 h-3" />
                                Download
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              <div className="pt-4 border-t">
                <p className="text-xl font-bold">₹{Number(order.total).toLocaleString()}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
