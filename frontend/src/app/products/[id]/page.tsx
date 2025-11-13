'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Star, ShoppingCart, Plus, Minus, Heart, Share2, Package, Truck, Shield, ChevronRight, Download, FileText, HelpCircle, Award } from 'lucide-react';
import api from '@/lib/api';
import { useAuthStore } from '@/store/authStore';
import { useWishlistStore } from '@/store/wishlistStore';
import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const queryClient = useQueryClient();
  const { isAuthenticated } = useAuthStore();
  const { items: wishlistItems, addToWishlist, removeFromWishlist, isInWishlist, fetchWishlist } = useWishlistStore();
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [activeTab, setActiveTab] = useState('description');
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [reviewRating, setReviewRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [reviewTitle, setReviewTitle] = useState('');
  const [reviewComment, setReviewComment] = useState('');
  const [editingReview, setEditingReview] = useState<any>(null);
  const [isEditMode, setIsEditMode] = useState(false);

  const { data: product, isLoading } = useQuery({
    queryKey: ['product', params.id],
    queryFn: async () => {
      const response = await api.get(`/products/${params.id}`);
      console.log('Product data:', response.data); // Debug log
      return response.data;
    },
  });

  // Separate query for reviews to ensure they're fetched
  const { data: reviewsData, isLoading: reviewsLoading } = useQuery({
    queryKey: ['reviews', params.id],
    queryFn: async () => {
      try {
        const response = await api.get(`/reviews/product/${params.id}`);
        console.log('Reviews data:', response.data); // Debug log
        return response.data;
      } catch (error) {
        console.log('Reviews fetch error:', error);
        // If reviews endpoint doesn't exist, try to get from product data
        return { reviews: product?.reviews || [], pagination: { total: 0 } };
      }
    },
    enabled: !!params.id,
  });

  // Query to get user's own review (including unapproved ones)
  const { data: userReviewData } = useQuery({
    queryKey: ['userReview', params.id],
    queryFn: async () => {
      if (!isAuthenticated()) return null;
      try {
        const response = await api.get(`/reviews/user/${params.id}`);
        console.log('User review data:', response.data); // Debug log
        return response.data;
      } catch (error) {
        console.log('User review fetch error:', error);
        return null;
      }
    },
    enabled: isAuthenticated() && !!params.id,
  });

  const addToCartMutation = useMutation({
    mutationFn: async () => {
      if (!isAuthenticated()) {
        toast.error('Please login to add items to cart');
        router.push('/login');
        throw new Error('Not authenticated');
      }

      const response = await api.post('/cart/items', {
        productId: params.id,
        quantity: quantity,
      });
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] });
      toast.success(`Added ${quantity} item(s) to cart!`);
    },
    onError: (error: any) => {
      const errorMessage = error.response?.data?.error || error.message || 'Failed to add to cart';
      toast.error(errorMessage);
    },
  });

  const wishlistMutation = useMutation({
    mutationFn: async () => {
      if (!isAuthenticated()) {
        toast.error('Please login to manage wishlist');
        router.push('/login');
        throw new Error('Not authenticated');
      }

      const productId = params.id as string;
      const isCurrentlyInWishlist = isInWishlist(productId);

      if (isCurrentlyInWishlist) {
        await removeFromWishlist(productId);
        return { action: 'removed' };
      } else {
        await addToWishlist(productId);
        return { action: 'added' };
      }
    },
    onSuccess: (data) => {
      if (data.action === 'added') {
        toast.success('Added to wishlist!');
      } else {
        toast.success('Removed from wishlist!');
      }
    },
    onError: (error: any) => {
      const errorMessage = error.response?.data?.error || error.message || 'Failed to update wishlist';
      toast.error(errorMessage);
    },
  });

  // Fetch wishlist on component mount if authenticated
  useEffect(() => {
    if (isAuthenticated()) {
      fetchWishlist();
    }
  }, [isAuthenticated, fetchWishlist]);

  const submitReviewMutation = useMutation({
    mutationFn: async () => {
      if (!isAuthenticated()) {
        toast.error('Please login to write a review');
        router.push('/login');
        throw new Error('Not authenticated');
      }

      if (reviewRating === 0) {
        toast.error('Please select a rating');
        throw new Error('No rating selected');
      }

      if (!reviewComment.trim()) {
        toast.error('Please write a review comment');
        throw new Error('No comment provided');
      }

      const response = await api.post('/reviews', {
        productId: params.id,
        rating: reviewRating,
        title: reviewTitle.trim(),
        comment: reviewComment.trim(),
      });
      return response.data;
    },
    onSuccess: async () => {
      // Force refresh all review-related data
      await queryClient.invalidateQueries({ queryKey: ['product', params.id] });
      await queryClient.invalidateQueries({ queryKey: ['reviews', params.id] });
      await queryClient.invalidateQueries({ queryKey: ['userReview', params.id] });
      await queryClient.refetchQueries({ queryKey: ['product', params.id] });
      await queryClient.refetchQueries({ queryKey: ['reviews', params.id] });
      await queryClient.refetchQueries({ queryKey: ['userReview', params.id] });

      toast.success('Review submitted successfully!');
      setShowReviewForm(false);
      setReviewRating(0);
      setReviewTitle('');
      setReviewComment('');
    },
    onError: (error: any) => {
      console.error('Review submission error:', error);
      let errorMessage = 'Failed to submit review';

      if (error.response?.status === 400) {
        const backendMessage = error.response?.data?.error || error.response?.data?.message;
        if (backendMessage?.toLowerCase().includes('already reviewed') ||
          backendMessage?.toLowerCase().includes('duplicate')) {
          errorMessage = 'You have already reviewed this product. You can only submit one review per product.';
        } else {
          errorMessage = backendMessage || 'Invalid request. Please check your review details.';
        }
      } else {
        errorMessage = error.response?.data?.error || error.message || 'Failed to submit review';
      }

      toast.error(errorMessage);
    },
  });

  const editReviewMutation = useMutation({
    mutationFn: async () => {
      if (!isAuthenticated()) {
        toast.error('Please login to edit your review');
        router.push('/login');
        throw new Error('Not authenticated');
      }

      if (!editingReview) {
        throw new Error('No review to edit');
      }

      if (reviewRating === 0) {
        toast.error('Please select a rating');
        throw new Error('No rating selected');
      }

      if (!reviewComment.trim()) {
        toast.error('Please write a review comment');
        throw new Error('No comment provided');
      }

      const response = await api.put(`/reviews/${editingReview.id}`, {
        rating: reviewRating,
        title: reviewTitle.trim(),
        comment: reviewComment.trim(),
      });
      return response.data;
    },
    onSuccess: async () => {
      // Force refresh both product and reviews data
      await queryClient.invalidateQueries({ queryKey: ['product', params.id] });
      await queryClient.invalidateQueries({ queryKey: ['reviews', params.id] });
      await queryClient.refetchQueries({ queryKey: ['product', params.id] });
      await queryClient.refetchQueries({ queryKey: ['reviews', params.id] });

      toast.success('Review updated successfully!');
      setShowReviewForm(false);
      setIsEditMode(false);
      setEditingReview(null);
      setReviewRating(0);
      setReviewTitle('');
      setReviewComment('');
    },
    onError: (error: any) => {
      console.error('Review edit error:', error);
      const errorMessage = error.response?.data?.error || error.message || 'Failed to update review';
      toast.error(errorMessage);
    },
  });

  // Function to start editing a review
  const startEditingReview = (review: any) => {
    setEditingReview(review);
    setIsEditMode(true);
    setReviewRating(review.rating);
    setReviewTitle(review.title || '');
    setReviewComment(review.comment || '');
    setShowReviewForm(true);
  };

  // Function to cancel editing
  const cancelEditing = () => {
    setShowReviewForm(false);
    setIsEditMode(false);
    setEditingReview(null);
    setReviewRating(0);
    setReviewTitle('');
    setReviewComment('');
  };

  // Calculate dynamic average rating and review count
  const calculateRatingStats = (reviews: any[]) => {
    if (!reviews || reviews.length === 0) {
      return { averageRating: 0, reviewCount: 0 };
    }

    const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
    const averageRating = totalRating / reviews.length;

    return {
      averageRating: Math.round(averageRating * 10) / 10, // Round to 1 decimal place
      reviewCount: reviews.length
    };
  };

  // Get current rating stats - use reviews from separate query or product data
  const currentReviews = reviewsData?.reviews || product?.reviews || [];
  const ratingStats = calculateRatingStats(currentReviews);

  // Check if current user has already reviewed this product
  const { data: currentUser } = useQuery({
    queryKey: ['currentUser'],
    queryFn: async () => {
      if (!isAuthenticated()) return null;
      const response = await api.get('/auth/me');
      return response.data;
    },
    enabled: isAuthenticated(),
  });

  // Use the user's own review from the dedicated endpoint (includes unapproved reviews)
  const userReview = userReviewData;
  const userHasReviewed = !!userReview;

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

  if (isLoading) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-16">
        <div className="animate-pulse">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-gray-200 h-96 rounded-lg"></div>
            <div className="space-y-4">
              <div className="bg-gray-200 h-8 rounded w-3/4"></div>
              <div className="bg-gray-200 h-4 rounded w-1/2"></div>
              <div className="bg-gray-200 h-32 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold mb-4">Product not found</h1>
        <Link href="/products" className="btn btn-primary">
          Back to Products
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen">
      <div className="max-w-6xl mx-auto px-4 py-6">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-gray-600 mb-6">
          <Link href="/" className="hover:text-blue-600">Home</Link>
          <ChevronRight className="w-4 h-4" />
          <Link href="/products" className="hover:text-blue-600">Products</Link>
          <ChevronRight className="w-4 h-4" />
          <span className="text-gray-900">{product.category?.name}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Product Images - Left Column */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="bg-white border border-gray-200 rounded-lg p-8">
              <div className="relative h-[400px] bg-white rounded overflow-hidden">
                {product.images && product.images.length > 0 ? (
                  <>
                    <Image
                      src={`${process.env.NEXT_PUBLIC_API_URL?.replace('/api', '')}${product.images[selectedImage]?.url || product.images[0].url}`}
                      alt={product.name}
                      fill
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      className="object-contain"
                      priority
                    />
                    {product.compareAtPrice && (
                      <div className="absolute top-2 left-2 bg-green-600 text-white px-2 py-1 rounded text-xs font-semibold">
                        {Math.round((1 - Number(product.price) / Number(product.compareAtPrice)) * 100)}% off
                      </div>
                    )}
                  </>
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-600">No Image Available</p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Thumbnail Gallery */}
            {product.images && product.images.length > 1 && (
              <div className="flex gap-2 overflow-x-auto">
                {product.images.map((image: any, index: number) => (
                  <button
                    key={image.id}
                    onClick={() => setSelectedImage(index)}
                    className={`relative h-16 w-16 bg-white border rounded-lg overflow-hidden flex-shrink-0 transition-all ${selectedImage === index ? 'border-blue-500 ring-2 ring-blue-200' : 'border-gray-200 hover:border-gray-300'
                      }`}
                  >
                    <Image
                      src={`${process.env.NEXT_PUBLIC_API_URL?.replace('/api', '')}${image.url}`}
                      alt={`${product.name} - Image ${index + 1}`}
                      fill
                      sizes="64px"
                      className="object-contain p-1"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info - Right Column */}
          <div className="space-y-6">
            {/* Product Title */}
            <div>
              <h1 className="text-2xl font-bold text-gray-900 mb-2">{product.name}</h1>

              {/* Rating */}
              <div className="flex items-center gap-4 mb-4">
                <div className="flex items-center bg-green-600 text-white px-2 py-1 rounded text-sm font-semibold">
                  <span>{ratingStats.averageRating.toFixed(1)}</span>
                  <Star className="w-3 h-3 ml-1 fill-current" />
                </div>
                <span className="text-sm text-gray-600">
                  {ratingStats.reviewCount} Ratings & Reviews
                </span>
              </div>
            </div>

            {/* Price */}
            <div className="border-b border-gray-200 pb-6">
              <div className="flex items-baseline gap-3 mb-2">
                <span className="text-3xl font-bold text-black">₹{product.price}</span>
                {product.compareAtPrice && (
                  <>
                    <span className="text-lg text-gray-500 line-through">₹{product.compareAtPrice}</span>
                    <span className="text-green-600 font-semibold">
                      {Math.round((1 - Number(product.price) / Number(product.compareAtPrice)) * 100)}% off
                    </span>
                  </>
                )}
              </div>
              <p className="text-sm text-gray-600">+ ₹50 Delivery Charges</p>
            </div>

            {/* Stock Status */}
            <div className="flex items-center gap-2">
              {product.stock > 0 ? (
                <>
                  <span className="text-green-600 font-semibold">✓ In Stock</span>
                  {product.stock <= 10 && (
                    <span className="text-orange-600 text-sm">Only {product.stock} left</span>
                  )}
                </>
              ) : (
                <span className="text-red-600 font-semibold">✗ Out of Stock</span>
              )}
            </div>

            {/* Quantity Selector */}
            <div>
              <label className="block text-sm font-semibold mb-2 text-gray-900">Quantity:</label>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-10 border border-gray-300 rounded flex items-center justify-center hover:border-gray-400 transition-colors"
                  disabled={quantity <= 1}
                >
                  <Minus className="w-4 h-4" />
                </button>
                <input
                  type="number"
                  value={quantity}
                  onChange={(e) => setQuantity(Math.max(1, Math.min(product.stock, parseInt(e.target.value) || 1)))}
                  className="w-16 h-10 border border-gray-300 rounded text-center font-semibold"
                  min="1"
                  max={product.stock}
                />
                <button
                  onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                  className="w-10 h-10 border border-gray-300 rounded flex items-center justify-center hover:border-gray-400 transition-colors"
                  disabled={quantity >= product.stock}
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <button
                onClick={() => addToCartMutation.mutate()}
                disabled={product.stock === 0 || addToCartMutation.isPending}
                className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 px-6 rounded transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ShoppingCart className="w-5 h-5 mr-2 inline" />
                {addToCartMutation.isPending ? 'Adding...' : product.stock === 0 ? 'Out of Stock' : 'ADD TO CART'}
              </button>

              <button
                onClick={() => {
                  if (!isAuthenticated()) {
                    toast.error('Please login first');
                    router.push('/login');
                    return;
                  }
                  router.push('/checkout');
                }}
                disabled={product.stock === 0}
                className="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-semibold py-3 px-6 rounded transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                BUY NOW
              </button>

              <div className="flex gap-3">
                <button
                  onClick={() => wishlistMutation.mutate()}
                  disabled={wishlistMutation.isPending}
                  className={`flex-1 border font-semibold py-3 px-6 rounded transition-colors flex items-center justify-center ${
                    isInWishlist(params.id as string)
                      ? 'border-red-300 bg-red-50 text-red-700 hover:border-red-400'
                      : 'border-gray-300 hover:border-gray-400 text-gray-700'
                  } disabled:opacity-50 disabled:cursor-not-allowed`}
                >
                  <Heart 
                    className={`w-5 h-5 mr-2 ${
                      isInWishlist(params.id as string) ? 'fill-current text-red-500' : ''
                    }`} 
                  />
                  {wishlistMutation.isPending 
                    ? 'Updating...' 
                    : isInWishlist(params.id as string) 
                      ? 'In Wishlist' 
                      : 'Add to Wishlist'
                  }
                </button>
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(window.location.href);
                    toast.success('Link copied to clipboard!');
                  }}
                  className="flex-1 border border-gray-300 hover:border-gray-400 text-gray-700 font-semibold py-3 px-6 rounded transition-colors flex items-center justify-center"
                >
                  <Share2 className="w-5 h-5 mr-2" />
                  Share
                </button>
              </div>
            </div>

            {/* Key Highlights */}
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-3">Key Highlights</h3>
              <ul className="space-y-2 text-sm text-gray-700">
                <li className="flex items-start gap-2">
                  <span className="text-green-600 font-bold">•</span>
                  <span>Complete robot kit with all components</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 font-bold">•</span>
                  <span>Step-by-step assembly instructions included</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 font-bold">•</span>
                  <span>Programming guide and sample code</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 font-bold">•</span>
                  <span>1 Year manufacturer warranty</span>
                </li>
              </ul>
            </div>

            {/* Services */}
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="flex items-center gap-2">
                <Truck className="w-5 h-5 text-blue-600" />
                <span className="text-gray-700">
                  {product.price >= 1000 ? 'Free Delivery' : 'Delivery ₹50'}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-green-600" />
                <span className="text-gray-700">Secure Payment</span>
              </div>
            </div>
          </div>
        </div>

        {/* Tabbed Content Section */}
        <div className="mt-12 border-t border-gray-200 pt-8">
          {/* Tab Navigation */}
          <div className="border-b border-gray-200 mb-8">
            <div className="flex gap-0 overflow-x-auto">
              {[
                { id: 'description', label: 'Description', icon: FileText },
                { id: 'specifications', label: 'Specifications', icon: Package },
                { id: 'attachments', label: 'Attachments', icon: Download },
                { id: 'reviews', label: 'Reviews', icon: Star },
                { id: 'faq', label: 'FAQ', icon: HelpCircle }
              ].map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-2 px-6 py-4 font-semibold whitespace-nowrap transition-colors border-b-2 ${activeTab === tab.id
                      ? 'text-blue-600 border-blue-600 bg-blue-50'
                      : 'text-gray-600 hover:text-gray-900 border-transparent hover:bg-gray-50'
                      }`}
                  >
                    <Icon className="w-4 h-4" />
                    {tab.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Tab Content */}
          <div className="min-h-[400px]">
            {/* Description Tab */}
            {activeTab === 'description' && (
              <div className="space-y-6">
                {/* Product Description */}
                {product.description || product.shortDescription ? (
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-4">Product Overview</h3>
                    <div className="prose max-w-none text-gray-700">
                      {product.description && (
                        <div className="leading-relaxed mb-4" dangerouslySetInnerHTML={{ __html: product.description }} />
                      )}
                      {product.shortDescription && (
                        <div className="leading-relaxed text-gray-600 mb-6" dangerouslySetInnerHTML={{ __html: product.shortDescription }} />
                      )}
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-12 bg-gray-50 rounded-lg">
                    <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                    <h4 className="text-xl font-semibold text-gray-900 mb-2">No Description Available</h4>
                    <p className="text-gray-600">Product description will be added soon.</p>
                  </div>
                )}

                {/* Key Features - Show if available from admin */}
                {product.features && product.features.length > 0 && (
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-4">Key Features</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {product.features.map((feature: any, index: number) => (
                        <div key={index} className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg">
                          <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                            <Award className="w-5 h-5 text-blue-600" />
                          </div>
                          <div>
                            <h4 className="font-semibold mb-1">{feature.title || feature.name}</h4>
                            <p className="text-sm text-gray-600">{feature.description}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* What's in the Box - Show if available from admin */}
                {product.boxContents && product.boxContents.length > 0 && (
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-4">What's in the Box</h3>
                    <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-r-lg">
                      <ul className="space-y-3 text-gray-700">
                        {product.boxContents.map((item: string, index: number) => (
                          <li key={index} className="flex items-start gap-3">
                            <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                              <span className="text-white text-xs font-bold">✓</span>
                            </div>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}

                {/* Additional Content from Admin */}
                {product.additionalInfo && (
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-4">Additional Information</h3>
                    <div className="prose max-w-none text-gray-700">
                      <div dangerouslySetInnerHTML={{ __html: product.additionalInfo }} />
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Specifications Tab */}
            {activeTab === 'specifications' && (
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-6">Technical Specifications</h3>
                {product.specifications && product.specifications.length > 0 ? (
                  <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                    <table className="w-full">
                      <tbody className="divide-y divide-gray-200">
                        {/* Basic Product Info */}
                        <tr>
                          <td className="px-6 py-4 bg-gray-50 font-semibold text-gray-900 w-1/3">Product SKU</td>
                          <td className="px-6 py-4 text-gray-700">{product.sku}</td>
                        </tr>
                        <tr>
                          <td className="px-6 py-4 bg-gray-50 font-semibold text-gray-900">Category</td>
                          <td className="px-6 py-4 text-gray-700">{product.category?.name}</td>
                        </tr>
                        <tr>
                          <td className="px-6 py-4 bg-gray-50 font-semibold text-gray-900">Difficulty Level</td>
                          <td className="px-6 py-4">
                            <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                              {product.difficulty}
                            </span>
                          </td>
                        </tr>
                        <tr>
                          <td className="px-6 py-4 bg-gray-50 font-semibold text-gray-900">Recommended Age</td>
                          <td className="px-6 py-4 text-gray-700">{product.ageGroup || 'All Ages'}</td>
                        </tr>

                        {/* Dynamic Specifications from Admin */}
                        {product.specifications.map((spec: any, index: number) => (
                          <tr key={index}>
                            <td className="px-6 py-4 bg-gray-50 font-semibold text-gray-900">{spec.name || spec.key}</td>
                            <td className="px-6 py-4 text-gray-700">{spec.value}</td>
                          </tr>
                        ))}

                        {/* Additional Product Info if available */}
                        {product.weight && (
                          <tr>
                            <td className="px-6 py-4 bg-gray-50 font-semibold text-gray-900">Weight</td>
                            <td className="px-6 py-4 text-gray-700">{product.weight} kg</td>
                          </tr>
                        )}
                        {product.dimensions && (
                          <tr>
                            <td className="px-6 py-4 bg-gray-50 font-semibold text-gray-900">Dimensions</td>
                            <td className="px-6 py-4 text-gray-700">{product.dimensions}</td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <div className="text-center py-16 bg-gray-50 rounded-lg">
                    <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                    <h4 className="text-xl font-semibold text-gray-900 mb-2">No Specifications Available</h4>
                    <p className="text-gray-600">Technical specifications will be added soon.</p>
                  </div>
                )}
              </div>
            )}

            {/* Attachments Tab */}
            {activeTab === 'attachments' && (
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-6">Downloads & Documentation</h3>
                {product.manuals && product.manuals.length > 0 ? (
                  <div className="space-y-4">
                    {product.manuals.map((manual: any) => (
                      <div key={manual.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                        <div className="flex items-center gap-4">
                          <div className="w-16 h-16 bg-red-100 rounded-lg flex items-center justify-center flex-shrink-0">
                            <Download className="w-8 h-8 text-red-600" />
                          </div>
                          <div className="flex-1">
                            <h4 className="font-bold text-lg text-gray-900">{manual.title}</h4>
                            <p className="text-sm text-gray-600 mt-1">{manual.description}</p>
                            <div className="flex items-center gap-4 mt-2 text-xs text-gray-500">
                              {manual.version && <span>Version {manual.version}</span>}
                              {manual.fileSize && <span>{(manual.fileSize / 1024 / 1024).toFixed(2)} MB</span>}
                              <span>PDF Format</span>
                            </div>
                          </div>
                          <button
                            onClick={() => handleManualDownload(manual)}
                            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded transition-colors flex items-center gap-2"
                          >
                            <Download className="w-4 h-4" />
                            Download
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-16 bg-gray-50 rounded-lg">
                    <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-6">
                      <Download className="w-12 h-12 text-gray-400" />
                    </div>
                    <h4 className="text-xl font-semibold text-gray-900 mb-2">Coming Soon</h4>
                    <p className="text-gray-600 mb-4">
                      Documentation and downloadable resources for this product are being prepared.
                    </p>
                    <p className="text-sm text-gray-500">
                      Check back soon or contact support for more information.
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* Reviews Tab */}
            {activeTab === 'reviews' && (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-bold text-gray-900">Customer Reviews</h3>
                  {!userHasReviewed && (
                    <button
                      onClick={() => {
                        if (!isAuthenticated()) {
                          toast.error('Please login to write a review');
                          router.push('/login');
                          return;
                        }
                        setIsEditMode(false);
                        setEditingReview(null);
                        setShowReviewForm(!showReviewForm);
                      }}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded transition-colors"
                    >
                      {showReviewForm && !isEditMode ? 'Cancel' : 'Write a Review'}
                    </button>
                  )}
                </div>



                {/* Review Form */}
                {showReviewForm && (
                  <div className="bg-white border border-gray-200 rounded-lg p-6 mb-8">
                    <h4 className="text-lg font-semibold text-gray-900 mb-4">
                      {isEditMode ? 'Edit Your Review' : 'Write Your Review'}
                    </h4>

                    {/* Star Rating */}
                    <div className="mb-4">
                      <label className="block text-sm font-semibold text-gray-900 mb-2">Rating *</label>
                      <div className="flex items-center gap-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <button
                            key={star}
                            type="button"
                            onClick={() => setReviewRating(star)}
                            onMouseEnter={() => setHoverRating(star)}
                            onMouseLeave={() => setHoverRating(0)}
                            className="p-1 transition-colors"
                          >
                            <Star
                              className={`w-8 h-8 transition-colors ${star <= (hoverRating || reviewRating)
                                ? 'text-yellow-400 fill-current'
                                : 'text-gray-300'
                                }`}
                            />
                          </button>
                        ))}
                        <span className="ml-2 text-sm text-gray-600">
                          {reviewRating > 0 && (
                            <>
                              {reviewRating} star{reviewRating !== 1 ? 's' : ''}
                              {reviewRating === 1 && ' - Poor'}
                              {reviewRating === 2 && ' - Fair'}
                              {reviewRating === 3 && ' - Good'}
                              {reviewRating === 4 && ' - Very Good'}
                              {reviewRating === 5 && ' - Excellent'}
                            </>
                          )}
                        </span>
                      </div>
                    </div>

                    {/* Review Title */}
                    <div className="mb-4">
                      <label className="block text-sm font-semibold text-gray-900 mb-2">
                        Review Title (Optional)
                      </label>
                      <input
                        type="text"
                        value={reviewTitle}
                        onChange={(e) => setReviewTitle(e.target.value)}
                        placeholder="Summarize your review in a few words"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        maxLength={100}
                      />
                    </div>

                    {/* Review Comment */}
                    <div className="mb-6">
                      <label className="block text-sm font-semibold text-gray-900 mb-2">
                        Your Review *
                      </label>
                      <textarea
                        value={reviewComment}
                        onChange={(e) => setReviewComment(e.target.value)}
                        placeholder="Share your experience with this product..."
                        rows={4}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        maxLength={1000}
                        required
                      />
                      <div className="text-right text-xs text-gray-500 mt-1">
                        {reviewComment.length}/1000 characters
                      </div>
                    </div>

                    {/* Submit Button */}
                    <div className="flex gap-3">
                      <button
                        onClick={() => {
                          if (isEditMode) {
                            editReviewMutation.mutate();
                          } else {
                            submitReviewMutation.mutate();
                          }
                        }}
                        disabled={
                          (isEditMode ? editReviewMutation.isPending : submitReviewMutation.isPending) ||
                          reviewRating === 0 ||
                          !reviewComment.trim()
                        }
                        className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white px-6 py-2 rounded transition-colors disabled:cursor-not-allowed flex items-center gap-2"
                      >
                        {(isEditMode ? editReviewMutation.isPending : submitReviewMutation.isPending) && (
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        )}
                        {isEditMode
                          ? (editReviewMutation.isPending ? 'Updating...' : 'Update Review')
                          : (submitReviewMutation.isPending ? 'Submitting...' : 'Submit Review')
                        }
                      </button>
                      <button
                        onClick={cancelEditing}
                        className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-6 py-2 rounded transition-colors"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                )}

                {/* Rating Summary */}
                <div className="bg-gray-50 rounded-lg p-6 mb-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="text-center">
                      <div className="text-4xl font-bold text-gray-900 mb-2">
                        {ratingStats.averageRating.toFixed(1)}
                      </div>
                      <div className="flex items-center justify-center text-yellow-400 mb-2">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-5 h-5 ${i < Math.floor(ratingStats.averageRating) ? 'fill-current' : ''}`}
                          />
                        ))}
                      </div>
                      <p className="text-gray-600">{ratingStats.reviewCount} Reviews</p>
                    </div>
                    <div className="space-y-2">
                      {[5, 4, 3, 2, 1].map((rating) => {
                        // Calculate rating distribution from actual reviews
                        const ratingCount = currentReviews ?
                          currentReviews.filter((review: any) => review.rating === rating).length : 0;
                        const totalReviews = ratingStats.reviewCount;
                        const percentage = totalReviews > 0 ? (ratingCount / totalReviews) * 100 : 0;

                        return (
                          <div key={rating} className="flex items-center gap-3">
                            <span className="text-sm w-12">{rating} Star</span>
                            <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                              <div
                                className="h-full bg-yellow-400"
                                style={{ width: `${percentage}%` }}
                              ></div>
                            </div>
                            <span className="text-sm text-gray-600 w-8 text-right">
                              {ratingCount}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* Reviews List */}
                {currentReviews && currentReviews.length > 0 ? (
                  <div className="space-y-6">
                    {currentReviews
                      .sort((a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
                      .map((review: any) => (
                        <div key={review.id} className={`border rounded-lg p-6 ${currentUser && (review.user?.id === currentUser.id || review.userId === currentUser.id)
                          ? 'border-blue-300 bg-blue-50'
                          : 'border-gray-200'
                          }`}>
                          <div className="flex items-start justify-between mb-3">
                            <div>
                              <div className="flex items-center gap-2 mb-1">
                                <span className="font-semibold text-gray-900">
                                  {review.user?.firstName} {review.user?.lastName}
                                  {currentUser && (review.user?.id === currentUser.id || review.userId === currentUser.id) && (
                                    <span className="ml-2 text-blue-600 text-sm font-medium">(Your Review)</span>
                                  )}
                                </span>
                                {review.isVerified && (
                                  <span className="bg-green-100 text-green-800 px-2 py-0.5 rounded text-xs font-medium">
                                    Verified Purchase
                                  </span>
                                )}
                              </div>
                              <div className="flex items-center text-yellow-400">
                                {[...Array(5)].map((_, i) => (
                                  <Star
                                    key={i}
                                    className={`w-4 h-4 ${i < review.rating ? 'fill-current' : ''}`}
                                  />
                                ))}
                              </div>
                            </div>
                            <span className="text-sm text-gray-500">
                              {new Date(review.createdAt).toLocaleDateString()}
                            </span>
                          </div>
                          {review.title && (
                            <h4 className="font-semibold mb-2">{review.title}</h4>
                          )}
                          <p className="text-gray-700">{review.comment}</p>

                          {/* Edit button for user's own review */}
                          {currentUser && (review.user?.id === currentUser.id || review.userId === currentUser.id) && (
                            <div className="mt-4 pt-4 border-t border-gray-200">
                              <button
                                onClick={() => startEditingReview(review)}
                                className="text-blue-600 hover:text-blue-700 font-medium text-sm transition-colors"
                              >
                                Edit Review
                              </button>
                            </div>
                          )}
                        </div>
                      ))}
                  </div>
                ) : (
                  <div className="text-center py-16 bg-gray-50 rounded-lg">
                    <Star className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                    <h4 className="text-xl font-semibold text-gray-900 mb-2">No Reviews Yet</h4>
                    <p className="text-gray-600 mb-4">Be the first to review this product!</p>
                    {!userHasReviewed && (
                      <button
                        onClick={() => {
                          if (!isAuthenticated()) {
                            toast.error('Please login to write a review');
                            router.push('/login');
                            return;
                          }
                          setIsEditMode(false);
                          setEditingReview(null);
                          setShowReviewForm(true);
                        }}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded transition-colors"
                      >
                        Write the First Review
                      </button>
                    )}
                  </div>
                )}
              </div>
            )}

            {/* FAQ Tab */}
            {activeTab === 'faq' && (
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-6">Frequently Asked Questions</h3>
                <div className="space-y-4">
                  <div className="border border-gray-200 rounded-lg">
                    <div className="p-6">
                      <div className="flex items-start gap-4">
                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                          <HelpCircle className="w-5 h-5 text-blue-600" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold text-gray-900 mb-2">
                            Q: Is this suitable for complete beginners?
                          </h4>
                          <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded-r-lg">
                            <p className="text-green-800">
                              <strong>A:</strong> Yes! This kit is specifically designed for beginners. It includes step-by-step instructions,
                              sample code, and video tutorials to help you get started with robotics programming.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="border border-gray-200 rounded-lg">
                    <div className="p-6">
                      <div className="flex items-start gap-4">
                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                          <HelpCircle className="w-5 h-5 text-blue-600" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold text-gray-900 mb-2">
                            Q: What programming languages are supported?
                          </h4>
                          <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded-r-lg">
                            <p className="text-green-800">
                              <strong>A:</strong> The kit supports Arduino IDE (C/C++), Scratch for visual programming,
                              and Python. We provide sample code and tutorials for all supported languages.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="border border-gray-200 rounded-lg">
                    <div className="p-6">
                      <div className="flex items-start gap-4">
                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                          <HelpCircle className="w-5 h-5 text-blue-600" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold text-gray-900 mb-2">
                            Q: Do I need additional tools or components?
                          </h4>
                          <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded-r-lg">
                            <p className="text-green-800">
                              <strong>A:</strong> No additional tools required! Everything you need is included in the kit.
                              You just need a computer with USB port to program the robot.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="border border-gray-200 rounded-lg">
                    <div className="p-6">
                      <div className="flex items-start gap-4">
                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                          <HelpCircle className="w-5 h-5 text-blue-600" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold text-gray-900 mb-2">
                            Q: What is the warranty period?
                          </h4>
                          <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded-r-lg">
                            <p className="text-green-800">
                              <strong>A:</strong> We provide 1 year manufacturer warranty covering all electronic components.
                              Physical damage due to misuse is not covered under warranty.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="border border-gray-200 rounded-lg">
                    <div className="p-6">
                      <div className="flex items-start gap-4">
                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                          <HelpCircle className="w-5 h-5 text-blue-600" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold text-gray-900 mb-2">
                            Q: Is technical support available?
                          </h4>
                          <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded-r-lg">
                            <p className="text-green-800">
                              <strong>A:</strong> Yes! We provide email support, video tutorials, and have an active community forum
                              where you can get help from experts and other users.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-8 text-center">
                  <p className="text-gray-600 mb-4">Still have questions?</p>
                  <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded transition-colors">
                    Ask a Question
                  </button>
                </div>
              </div>
            )}


          </div>
        </div>
      </div>

      {/* Mobile Sticky Bottom Bar */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 shadow-lg z-50">
        <div className="flex items-center gap-3">
          <div className="flex-1">
            <p className="text-xs text-gray-600">Price</p>
            <p className="text-lg font-bold text-black">₹{product.price}</p>
          </div>
          <button
            onClick={() => addToCartMutation.mutate()}
            disabled={product.stock === 0 || addToCartMutation.isPending}
            className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-6 py-3 rounded transition-colors disabled:opacity-50"
          >
            <ShoppingCart className="w-5 h-5 mr-2 inline" />
            {product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
          </button>
        </div>
      </div>
    </div>
  );
}