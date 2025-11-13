'use client';

import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useParams, useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/authStore';
import api from '@/lib/api';
import {
  ArrowLeft,
  Package,
  Truck,
  CheckCircle,
  X,
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  CreditCard,
  Edit3,
  Save,
  Printer,
} from 'lucide-react';
import Link from 'next/link';

interface OrderItem {
  id: string;
  productName: string;
  productSku: string;
  quantity: number;
  price: number;
  total: number;
  product: {
    id: string;
    name: string;
    images: { url: string; altText?: string }[];
  };
}

interface Order {
  id: string;
  orderNumber: string;
  status: string;
  subtotal: number;
  discount: number;
  tax: number;
  shipping: number;
  total: number;
  couponCode?: string;
  shippingAddress: any;
  billingAddress?: any;
  notes?: string;
  trackingNumber?: string;
  createdAt: string;
  shippedAt?: string;
  deliveredAt?: string;
  user: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    phone?: string;
  };
  items: OrderItem[];
  payment?: {
    id: string;
    status: string;
    method?: string;
    razorpayPaymentId?: string;
    amount: number;
  };
}

export default function AdminOrderDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { user, isAuthenticated } = useAuthStore();
  const queryClient = useQueryClient();
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({ status: '', trackingNumber: '' });

  const { data: order, isLoading } = useQuery({
    queryKey: ['admin-order', params.id],
    queryFn: async () => {
      const response = await api.get(`/admin/orders/${params.id}`);
      return response.data as Order;
    },
    enabled: isAuthenticated() && user?.role === 'ADMIN' && !!params.id,
  });

  const updateOrderMutation = useMutation({
    mutationFn: async (data: { status: string; trackingNumber?: string }) => {
      const response = await api.put(`/admin/orders/${params.id}`, data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-order', params.id] });
      queryClient.invalidateQueries({ queryKey: ['admin-orders'] });
      setIsEditing(false);
    },
  });

  const handleStatusUpdate = (newStatus: string) => {
    if (order) {
      setEditData({ status: newStatus, trackingNumber: order.trackingNumber || '' });
      setIsEditing(true);
    }
  };

  const handleSave = () => {
    updateOrderMutation.mutate(editData);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'DELIVERED': return 'bg-green-100 text-green-800';
      case 'SHIPPED': return 'bg-blue-100 text-blue-800';
      case 'PROCESSING': return 'bg-yellow-100 text-yellow-800';
      case 'PAID': return 'bg-purple-100 text-purple-800';
      case 'CANCELLED': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (!isAuthenticated() || user?.role !== 'ADMIN') {
    return null;
  }

  if (isLoading) {
    return (
      <div className="p-6">
        <div className="animate-pulse space-y-6">
          <div className="h-8 bg-gray-200 rounded w-1/3"></div>
          <div className="h-64 bg-gray-200 rounded"></div>
          <div className="h-48 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="p-6">
        <div className="text-center py-12">
          <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Order not found</h3>
          <p className="text-gray-600 mb-4">The order you're looking for doesn't exist.</p>
          <Link href="/admin/orders" className="btn btn-primary">
            Back to Orders
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <button
          onClick={() => router.back()}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div className="flex-1">
          <h1 className="text-3xl font-bold text-gray-900">Order #{order.orderNumber}</h1>
          <p className="text-gray-600">Placed on {new Date(order.createdAt).toLocaleDateString()}</p>
        </div>
        <div className="flex items-center gap-2">
          <button className="btn btn-outline">
            <Printer className="w-4 h-4 mr-2" />
            Print
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Order Details */}
        <div className="lg:col-span-2 space-y-6">
          {/* Order Status */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-gray-900">Order Status</h2>
              {!isEditing && (
                <button
                  onClick={() => {
                    setEditData({ status: order.status, trackingNumber: order.trackingNumber || '' });
                    setIsEditing(true);
                  }}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <Edit3 className="w-4 h-4" />
                </button>
              )}
            </div>

            {isEditing ? (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                  <select
                    value={editData.status}
                    onChange={(e) => setEditData({ ...editData, status: e.target.value })}
                    className="input w-full"
                  >
                    <option value="PENDING">Pending</option>
                    <option value="PAID">Paid</option>
                    <option value="PROCESSING">Processing</option>
                    <option value="SHIPPED">Shipped</option>
                    <option value="DELIVERED">Delivered</option>
                    <option value="CANCELLED">Cancelled</option>
                  </select>
                </div>
                {(editData.status === 'SHIPPED' || editData.status === 'DELIVERED') && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Tracking Number</label>
                    <input
                      type="text"
                      value={editData.trackingNumber}
                      onChange={(e) => setEditData({ ...editData, trackingNumber: e.target.value })}
                      placeholder="Enter tracking number"
                      className="input w-full"
                    />
                  </div>
                )}
                <div className="flex gap-2">
                  <button
                    onClick={handleSave}
                    disabled={updateOrderMutation.isPending}
                    className="btn btn-primary"
                  >
                    <Save className="w-4 h-4 mr-2" />
                    {updateOrderMutation.isPending ? 'Saving...' : 'Save'}
                  </button>
                  <button
                    onClick={() => setIsEditing(false)}
                    className="btn btn-outline"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}>
                    {order.status}
                  </span>
                  {order.trackingNumber && (
                    <span className="text-sm text-gray-600">
                      Tracking: <span className="font-mono">{order.trackingNumber}</span>
                    </span>
                  )}
                </div>

                {/* Quick Status Actions */}
                <div className="flex gap-2">
                  {order.status === 'PAID' && (
                    <button
                      onClick={() => handleStatusUpdate('PROCESSING')}
                      className="btn btn-sm btn-outline"
                    >
                      <Package className="w-4 h-4 mr-2" />
                      Mark Processing
                    </button>
                  )}
                  {order.status === 'PROCESSING' && (
                    <button
                      onClick={() => handleStatusUpdate('SHIPPED')}
                      className="btn btn-sm btn-outline"
                    >
                      <Truck className="w-4 h-4 mr-2" />
                      Mark Shipped
                    </button>
                  )}
                  {order.status === 'SHIPPED' && (
                    <button
                      onClick={() => handleStatusUpdate('DELIVERED')}
                      className="btn btn-sm btn-outline"
                    >
                      <CheckCircle className="w-4 h-4 mr-2" />
                      Mark Delivered
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Order Items */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Order Items</h2>
            <div className="space-y-4">
              {order.items.map((item) => (
                <div key={item.id} className="flex items-center gap-4 p-4 border border-gray-200 rounded-lg">
                  <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center overflow-hidden">
                    {item.product.images?.[0] ? (
                      <img
                        src={`${process.env.NEXT_PUBLIC_API_URL?.replace('/api', '')}${item.product.images[0].url}`}
                        alt={item.product.images[0].altText || item.productName}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <Package className="w-8 h-8 text-gray-400" />
                    )}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900">{item.productName}</h3>
                    <p className="text-sm text-gray-500">SKU: {item.productSku}</p>
                    <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-gray-900">₹{Number(item.total).toLocaleString()}</p>
                    <p className="text-sm text-gray-500">₹{Number(item.price).toLocaleString()} each</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Customer Info */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Customer</h2>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <User className="w-5 h-5 text-gray-400" />
                <span className="text-gray-900">{order.user.firstName} {order.user.lastName}</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-gray-400" />
                <span className="text-gray-900">{order.user.email}</span>
              </div>
              {order.user.phone && (
                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-gray-400" />
                  <span className="text-gray-900">{order.user.phone}</span>
                </div>
              )}
            </div>
          </div>

          {/* Shipping Address */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Shipping Address</h2>
            <div className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-gray-400 mt-0.5" />
              <div className="text-gray-900">
                <p>{order.shippingAddress.name}</p>
                <p>{order.shippingAddress.address}</p>
                <p>{order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.pincode}</p>
                <p>{order.shippingAddress.country}</p>
                {order.shippingAddress.phone && <p>Phone: {order.shippingAddress.phone}</p>}
              </div>
            </div>
          </div>

          {/* Payment Info */}
          {order.payment && (
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Payment</h2>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <CreditCard className="w-5 h-5 text-gray-400" />
                  <span className="text-gray-900">{order.payment.method || 'Online Payment'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Status:</span>
                  <span className={`px-2 py-1 rounded text-xs font-medium ${
                    order.payment.status === 'SUCCESS' ? 'bg-green-100 text-green-800' :
                    order.payment.status === 'FAILED' ? 'bg-red-100 text-red-800' :
                    'bg-yellow-100 text-yellow-800'
                  }`}>
                    {order.payment.status}
                  </span>
                </div>
                {order.payment.razorpayPaymentId && (
                  <div>
                    <span className="text-gray-600 text-sm">Payment ID:</span>
                    <p className="font-mono text-xs text-gray-900 break-all">{order.payment.razorpayPaymentId}</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Order Summary */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Order Summary</h2>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal:</span>
                <span className="text-gray-900">₹{Number(order.subtotal).toLocaleString()}</span>
              </div>
              {order.discount > 0 && (
                <div className="flex justify-between">
                  <span className="text-gray-600">Discount:</span>
                  <span className="text-green-600">-₹{Number(order.discount).toLocaleString()}</span>
                </div>
              )}
              {order.tax > 0 && (
                <div className="flex justify-between">
                  <span className="text-gray-600">Tax:</span>
                  <span className="text-gray-900">₹{Number(order.tax).toLocaleString()}</span>
                </div>
              )}
              {order.shipping > 0 && (
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping:</span>
                  <span className="text-gray-900">₹{Number(order.shipping).toLocaleString()}</span>
                </div>
              )}
              <div className="border-t pt-2 mt-2">
                <div className="flex justify-between font-semibold text-lg">
                  <span className="text-gray-900">Total:</span>
                  <span className="text-gray-900">₹{Number(order.total).toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Order Timeline */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Timeline</h2>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Calendar className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="text-sm font-medium text-gray-900">Order Placed</p>
                  <p className="text-xs text-gray-500">{new Date(order.createdAt).toLocaleString()}</p>
                </div>
              </div>
              {order.shippedAt && (
                <div className="flex items-center gap-3">
                  <Truck className="w-5 h-5 text-blue-500" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">Shipped</p>
                    <p className="text-xs text-gray-500">{new Date(order.shippedAt).toLocaleString()}</p>
                  </div>
                </div>
              )}
              {order.deliveredAt && (
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">Delivered</p>
                    <p className="text-xs text-gray-500">{new Date(order.deliveredAt).toLocaleString()}</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}