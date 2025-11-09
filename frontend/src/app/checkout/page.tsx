'use client';

import { useQuery, useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useAuthStore } from '@/store/authStore';
import api from '@/lib/api';
import { openRazorpayCheckout } from '@/lib/razorpay';
import toast from 'react-hot-toast';
import { ShoppingBag, CreditCard, MapPin, Tag } from 'lucide-react';

export default function CheckoutPage() {
  const router = useRouter();
  const { user, isAuthenticated } = useAuthStore();
  const [couponCode, setCouponCode] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState<any>(null);
  const [couponDiscount, setCouponDiscount] = useState(0);
  const [mounted, setMounted] = useState(false);
  const [shippingAddress, setShippingAddress] = useState({
    name: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    country: 'India',
  });

  // Handle client-side mounting
  useEffect(() => {
    setMounted(true);
    if (user) {
      setShippingAddress(prev => ({
        ...prev,
        name: user.firstName + ' ' + user.lastName || '',
      }));
    }
  }, [user]);

  const { data: cart, isLoading: cartLoading } = useQuery({
    queryKey: ['cart'],
    queryFn: async () => {
      const response = await api.get('/cart');
      return response.data;
    },
    enabled: isAuthenticated(),
  });

  const applyCouponMutation = useMutation({
    mutationFn: async (code: string) => {
      const subtotal = cart?.total || 0;
      const response = await api.post('/checkout/apply-coupon', {
        code,
        subtotal,
      });
      return response.data;
    },
    onSuccess: (data) => {
      setAppliedCoupon(data.coupon);
      setCouponDiscount(data.discount);
      toast.success(`Coupon applied! You saved ₹${data.discount.toFixed(2)}`);
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.error || 'Invalid coupon code');
      setAppliedCoupon(null);
      setCouponDiscount(0);
    },
  });

  const removeCoupon = () => {
    setCouponCode('');
    setAppliedCoupon(null);
    setCouponDiscount(0);
    toast.success('Coupon removed');
  };

  const createOrderMutation = useMutation({
    mutationFn: async () => {
      // Validate address
      if (!shippingAddress.name || !shippingAddress.phone || !shippingAddress.address || 
          !shippingAddress.city || !shippingAddress.state || !shippingAddress.pincode) {
        throw new Error('Please fill in all required fields');
      }

      const response = await api.post('/checkout/create-order', {
        shippingAddress,
        billingAddress: shippingAddress,
        couponCode: appliedCoupon?.code || undefined,
      });
      return response.data;
    },
    onSuccess: async (data) => {
      // Check if we have valid Razorpay keys
      const hasValidKeys = data.keyId && data.keyId !== 'rzp_test_xxxxxxxxxxxxx';
      
      if (hasValidKeys) {
        // Use real Razorpay checkout
        try {
          await openRazorpayCheckout({
            key: data.keyId,
            amount: data.razorpayOrder.amount,
            currency: data.razorpayOrder.currency,
            order_id: data.razorpayOrder.id,
            name: 'GRM Robotics',
            description: `Order #${data.order.orderNumber}`,
            prefill: {
              name: shippingAddress.name,
              email: user?.email,
              contact: shippingAddress.phone,
            },
            theme: {
              color: '#0ea5e9',
            },
            handler: async (response) => {
              try {
                await api.post('/checkout/verify', {
                  razorpay_order_id: response.razorpay_order_id,
                  razorpay_payment_id: response.razorpay_payment_id,
                  razorpay_signature: response.razorpay_signature,
                });
                toast.success('Payment successful!');
                router.push('/orders');
              } catch (error) {
                toast.error('Payment verification failed');
              }
            },
          });
        } catch (error) {
          toast.error('Failed to open payment gateway');
        }
      } else {
        // Development mode - skip payment
        toast.success(`Order created! Order #${data.order.orderNumber}`, {
          duration: 5000,
        });
        toast('Payment gateway is in test mode. Order created successfully!', {
          icon: '💳',
          duration: 5000,
        });
        router.push('/orders');
      }
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.error || 'Failed to create order');
    },
  });

  // Don't render anything until mounted on client
  if (!mounted) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-8"></div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-4">
              <div className="h-64 bg-gray-200 rounded"></div>
            </div>
            <div className="h-96 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!isAuthenticated()) {
    router.push('/login');
    return null;
  }

  if (cartLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-8"></div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-4">
              <div className="h-64 bg-gray-200 rounded"></div>
            </div>
            <div className="h-96 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!cart || cart.items.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <ShoppingBag className="w-16 h-16 mx-auto text-gray-400 mb-4" />
        <h1 className="text-2xl font-bold mb-4">Your cart is empty</h1>
        <button onClick={() => router.push('/products')} className="btn btn-primary">
          Continue Shopping
        </button>
      </div>
    );
  }

  const subtotal = cart.total || 0;
  const shipping = subtotal > 1000 ? 0 : 50;
  const discountedSubtotal = subtotal - couponDiscount;
  const tax = discountedSubtotal * 0.18;
  const total = discountedSubtotal + shipping + tax;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Checkout</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Forms */}
        <div className="lg:col-span-2 space-y-6">
          {/* Shipping Address */}
          <div className="card">
            <div className="flex items-center gap-2 mb-4">
              <MapPin className="w-5 h-5 text-primary-600" />
              <h2 className="text-xl font-bold">Shipping Address</h2>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Full Name *</label>
                <input
                  type="text"
                  className="input"
                  value={shippingAddress.name}
                  onChange={(e) => setShippingAddress({ ...shippingAddress, name: e.target.value })}
                 placeholder='Name'
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Phone Number *</label>
                <input
                  type="tel"
                  className="input"
                  value={shippingAddress.phone}
                  onChange={(e) => setShippingAddress({ ...shippingAddress, phone: e.target.value })}
                  placeholder="Number"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Address *</label>
                <textarea
                  className="input"
                  rows={3}
                  value={shippingAddress.address}
                  onChange={(e) => setShippingAddress({ ...shippingAddress, address: e.target.value })}
                  placeholder="House No., Street, Area"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">City *</label>
                  <input
                    type="text"
                    className="input"
                    value={shippingAddress.city}
                    onChange={(e) => setShippingAddress({ ...shippingAddress, city: e.target.value })}
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">State *</label>
                  <input
                    type="text"
                    className="input"
                    value={shippingAddress.state}
                    onChange={(e) => setShippingAddress({ ...shippingAddress, state: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Pincode *</label>
                  <input
                    type="text"
                    className="input"
                    value={shippingAddress.pincode}
                    onChange={(e) => setShippingAddress({ ...shippingAddress, pincode: e.target.value })}
                    placeholder="400001"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Country</label>
                  <input
                    type="text"
                    className="input"
                    value={shippingAddress.country}
                    disabled
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Coupon Code */}
          <div className="card">
            <div className="flex items-center gap-2 mb-4">
              <Tag className="w-5 h-5 text-primary-600" />
              <h2 className="text-xl font-bold">Discount Code</h2>
            </div>

            {appliedCoupon ? (
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Tag className="w-4 h-4 text-green-600" />
                    <span className="font-semibold text-green-800">{appliedCoupon.code}</span>
                  </div>
                  <button
                    onClick={removeCoupon}
                    className="text-red-600 hover:text-red-700 text-sm font-medium"
                  >
                    Remove
                  </button>
                </div>
                <p className="text-sm text-green-700 mb-2">{appliedCoupon.description}</p>
                <p className="text-lg font-bold text-green-800">
                  You saved ₹{couponDiscount.toFixed(2)}!
                </p>
              </div>
            ) : (
              <>
                <div className="flex gap-2">
                  <input
                    type="text"
                    className="input flex-1"
                    placeholder="Enter coupon code (e.g., WELCOME10)"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && couponCode.trim()) {
                        applyCouponMutation.mutate(couponCode.trim());
                      }
                    }}
                  />
                  <button
                    onClick={() => applyCouponMutation.mutate(couponCode.trim())}
                    disabled={!couponCode.trim() || applyCouponMutation.isPending}
                    className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white px-6 py-2 rounded-lg font-medium transition-colors disabled:cursor-not-allowed"
                  >
                    {applyCouponMutation.isPending ? 'Applying...' : 'Apply'}
                  </button>
                </div>
                <p className="text-sm text-gray-500 mt-2">
                  Try: <span className="font-medium cursor-pointer hover:text-blue-600" onClick={() => setCouponCode('WELCOME10')}>WELCOME10</span> (10% off) or <span className="font-medium cursor-pointer hover:text-blue-600" onClick={() => setCouponCode('FLAT500')}>FLAT500</span> (₹500 off on orders above ₹5000)
                </p>
              </>
            )}
          </div>
        </div>

        {/* Right Column - Order Summary */}
        <div className="lg:col-span-1">
          <div className="card sticky top-20">
            <h2 className="text-xl font-bold mb-4">Order Summary</h2>

            {/* Cart Items */}
            <div className="space-y-3 mb-4 max-h-64 overflow-y-auto">
              {cart.items.map((item: any) => (
                <div key={item.id} className="flex gap-3 pb-3 border-b">
                  <div className="w-16 h-16 bg-gray-100 rounded flex-shrink-0"></div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm truncate">{item.product.name}</p>
                    <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                    <p className="text-sm font-bold text-primary-600">₹{item.subtotal}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Price Breakdown */}
            <div className="space-y-2 mb-4">
              <div className="flex justify-between text-sm">
                <span>Subtotal</span>
                <span>₹{subtotal.toFixed(2)}</span>
              </div>
              {couponDiscount > 0 && (
                <div className="flex justify-between text-sm text-green-600">
                  <span>Discount ({appliedCoupon?.code})</span>
                  <span>-₹{couponDiscount.toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between text-sm">
                <span>Shipping</span>
                <span>{shipping === 0 ? 'FREE' : `₹${shipping}`}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Tax (18% GST)</span>
                <span>₹{tax.toFixed(2)}</span>
              </div>
              <div className="border-t pt-2 flex justify-between font-bold text-lg">
                <span>Total</span>
                <span className="text-primary-600">₹{total.toFixed(2)}</span>
              </div>
              {couponDiscount > 0 && (
                <div className="bg-green-50 border border-green-200 rounded p-2 mt-2">
                  <p className="text-sm text-green-700 text-center">
                    🎉 You saved ₹{couponDiscount.toFixed(2)} with coupon {appliedCoupon?.code}!
                  </p>
                </div>
              )}
            </div>

            {/* Place Order Button */}
            <button
              onClick={() => createOrderMutation.mutate()}
              disabled={createOrderMutation.isPending}
              className="btn btn-primary w-full py-3"
            >
              <CreditCard className="w-5 h-5 mr-2" />
              {createOrderMutation.isPending ? 'Processing...' : 'Proceed to Payment'}
            </button>

            <div className="text-xs text-gray-500 text-center mt-3 space-y-1">
              <p>Secure payment powered by Razorpay</p>
              <p>
                By placing this order, you agree to our{' '}
                <Link href="/replacement-policy" className="text-blue-600 hover:underline">
                  Replacement Policy
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
