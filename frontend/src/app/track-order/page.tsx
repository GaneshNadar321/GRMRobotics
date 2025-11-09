'use client';

import { useState } from 'react';
import { Search, Package, Truck, CheckCircle, Clock, MapPin } from 'lucide-react';
import toast from 'react-hot-toast';

export default function TrackOrderPage() {
  const [orderNumber, setOrderNumber] = useState('');
  const [email, setEmail] = useState('');
  const [tracking, setTracking] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleTrack = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!orderNumber || !email) {
      toast.error('Please enter both order number and email');
      return;
    }

    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      // Mock tracking data
      setTracking({
        orderNumber: orderNumber,
        status: 'SHIPPED',
        estimatedDelivery: '2025-10-28',
        currentLocation: 'Mumbai Distribution Center',
        timeline: [
          { status: 'Order Placed', date: '2025-10-24', time: '10:30 AM', completed: true },
          { status: 'Payment Confirmed', date: '2025-10-24', time: '10:31 AM', completed: true },
          { status: 'Processing', date: '2025-10-24', time: '02:15 PM', completed: true },
          { status: 'Shipped', date: '2025-10-25', time: '09:00 AM', completed: true },
          { status: 'Out for Delivery', date: '2025-10-28', time: 'Pending', completed: false },
          { status: 'Delivered', date: '2025-10-28', time: 'Pending', completed: false },
        ],
        items: [
          { name: 'Starter Robot Kit', quantity: 1, price: 1999 },
        ],
        shippingAddress: {
          name: 'John Doe',
          address: '123 Main Street, Apartment 4B',
          city: 'Mumbai',
          state: 'Maharashtra',
          pincode: '400001',
        },
      });
      setIsLoading(false);
      toast.success('Order found!');
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-primary-600 to-primary-700 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <Package className="w-16 h-16 mx-auto mb-4" />
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Track Your Order</h1>
          <p className="text-xl text-primary-100">
            Enter your order details to see real-time tracking information
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Search Form */}
        <div className="card mb-8">
          <form onSubmit={handleTrack} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="form-group">
                <label className="form-label">Order Number *</label>
                <input
                  type="text"
                  value={orderNumber}
                  onChange={(e) => setOrderNumber(e.target.value)}
                  className="input"
                  placeholder="e.g., ORD-2024-001"
                  required
                />
                <p className="form-help">Found in your order confirmation email</p>
              </div>

              <div className="form-group">
                <label className="form-label">Email Address *</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="input"
                  placeholder="your@email.com"
                  required
                />
                <p className="form-help">Email used during checkout</p>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="btn btn-primary btn-lg w-full flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Tracking...</span>
                </>
              ) : (
                <>
                  <Search className="w-5 h-5" />
                  <span>Track Order</span>
                </>
              )}
            </button>
          </form>
        </div>

        {/* Tracking Results */}
        {tracking && (
          <div className="space-y-6 animate-fade-in">
            {/* Status Card */}
            <div className="card bg-gradient-to-r from-primary-50 to-blue-50 border-2 border-primary-200">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                  <h2 className="text-2xl font-bold mb-2">Order #{tracking.orderNumber}</h2>
                  <div className="flex items-center gap-2 text-lg">
                    <span className={`px-4 py-2 rounded-full font-semibold ${
                      tracking.status === 'DELIVERED' ? 'bg-green-100 text-green-800' :
                      tracking.status === 'SHIPPED' ? 'bg-blue-100 text-blue-800' :
                      tracking.status === 'PROCESSING' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {tracking.status}
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-600 mb-1">Estimated Delivery</p>
                  <p className="text-2xl font-bold text-primary-600">
                    {new Date(tracking.estimatedDelivery).toLocaleDateString('en-IN', {
                      day: 'numeric',
                      month: 'short',
                      year: 'numeric'
                    })}
                  </p>
                </div>
              </div>

              {tracking.currentLocation && (
                <div className="mt-4 flex items-center gap-2 text-gray-700">
                  <MapPin className="w-5 h-5" />
                  <span>Current Location: <strong>{tracking.currentLocation}</strong></span>
                </div>
              )}
            </div>

            {/* Timeline */}
            <div className="card">
              <h3 className="text-xl font-bold mb-6">Order Timeline</h3>
              <div className="space-y-6">
                {tracking.timeline.map((event: any, index: number) => (
                  <div key={index} className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                        event.completed ? 'bg-green-500' : 'bg-gray-200'
                      }`}>
                        {event.completed ? (
                          <CheckCircle className="w-6 h-6 text-white" />
                        ) : (
                          <Clock className="w-6 h-6 text-gray-400" />
                        )}
                      </div>
                      {index < tracking.timeline.length - 1 && (
                        <div className={`w-0.5 h-12 ${
                          event.completed ? 'bg-green-500' : 'bg-gray-200'
                        }`} />
                      )}
                    </div>
                    <div className="flex-1 pb-8">
                      <h4 className={`font-bold mb-1 ${
                        event.completed ? 'text-gray-900' : 'text-gray-400'
                      }`}>
                        {event.status}
                      </h4>
                      <p className="text-sm text-gray-600">
                        {event.date} {event.time !== 'Pending' && `at ${event.time}`}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Order Items */}
            <div className="card">
              <h3 className="text-xl font-bold mb-4">Order Items</h3>
              <div className="space-y-4">
                {tracking.items.map((item: any, index: number) => (
                  <div key={index} className="flex justify-between items-center py-3 border-b last:border-0">
                    <div>
                      <p className="font-medium">{item.name}</p>
                      <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                    </div>
                    <p className="font-bold">₹{item.price}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Shipping Address */}
            <div className="card">
              <h3 className="text-xl font-bold mb-4">Shipping Address</h3>
              <div className="text-gray-700">
                <p className="font-medium">{tracking.shippingAddress.name}</p>
                <p>{tracking.shippingAddress.address}</p>
                <p>{tracking.shippingAddress.city}, {tracking.shippingAddress.state}</p>
                <p>PIN: {tracking.shippingAddress.pincode}</p>
              </div>
            </div>

            {/* Help Section */}
            <div className="card bg-blue-50 border-2 border-blue-200">
              <h3 className="font-bold mb-2">Need Help?</h3>
              <p className="text-gray-700 mb-4">
                If you have any questions about your order, please contact our support team.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <a href="/contact" className="btn btn-primary">
                  Contact Support
                </a>
                <a href="tel:+91XXXXXXXXXX" className="btn btn-secondary">
                  Call Us
                </a>
              </div>
            </div>
          </div>
        )}

        {/* Help Text */}
        {!tracking && (
          <div className="card bg-gray-50">
            <h3 className="font-bold mb-4">How to Track Your Order</h3>
            <ol className="space-y-2 text-gray-700">
              <li className="flex gap-2">
                <span className="font-bold">1.</span>
                <span>Enter your order number (found in your confirmation email)</span>
              </li>
              <li className="flex gap-2">
                <span className="font-bold">2.</span>
                <span>Enter the email address you used during checkout</span>
              </li>
              <li className="flex gap-2">
                <span className="font-bold">3.</span>
                <span>Click "Track Order" to see your order status</span>
              </li>
            </ol>
          </div>
        )}
      </div>
    </div>
  );
}
