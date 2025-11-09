'use client';

import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '@/lib/api';
import { Search, Star, Check, X, Trash2 } from 'lucide-react';
import toast from 'react-hot-toast';

export default function ReviewsPage() {
  const [filter, setFilter] = useState('all');
  const queryClient = useQueryClient();

  const { data: reviews, isLoading } = useQuery({
    queryKey: ['admin-reviews', filter],
    queryFn: async () => {
      const response = await api.get(`/admin/reviews?filter=${filter}`);
      return response.data;
    },
  });

  const approveMutation = useMutation({
    mutationFn: async (id: string) => {
      await api.put(`/admin/reviews/${id}/approve`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-reviews'] });
      toast.success('Review approved');
    },
  });

  const rejectMutation = useMutation({
    mutationFn: async (id: string) => {
      await api.put(`/admin/reviews/${id}/reject`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-reviews'] });
      toast.success('Review rejected');
    },
  });

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Review Management</h1>
        <p className="text-gray-600">Moderate and manage customer reviews</p>
      </div>

      <div className="flex gap-4 mb-6">
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="input"
        >
          <option value="all">All Reviews</option>
          <option value="pending">Pending Approval</option>
          <option value="approved">Approved</option>
          <option value="rejected">Rejected</option>
        </select>
      </div>

      <div className="space-y-4">
        {isLoading ? (
          <div className="card text-center py-12">
            <div className="w-12 h-12 border-4 border-primary-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
          </div>
        ) : reviews?.length > 0 ? (
          reviews.map((review: any) => (
            <div key={review.id} className="card">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-semibold">
                      {review.user?.firstName} {review.user?.lastName}
                    </span>
                    {review.isVerified && (
                      <span className="bg-green-100 text-green-800 px-2 py-0.5 rounded text-xs">
                        Verified
                      </span>
                    )}
                    <span className={`px-2 py-0.5 rounded text-xs ${
                      review.isApproved ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {review.isApproved ? 'Approved' : 'Pending'}
                    </span>
                  </div>
                  <div className="flex items-center text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className={`w-4 h-4 ${i < review.rating ? 'fill-current' : ''}`} />
                    ))}
                  </div>
                </div>
                <span className="text-sm text-gray-500">
                  {new Date(review.createdAt).toLocaleDateString()}
                </span>
              </div>
              
              {review.title && <h4 className="font-semibold mb-2">{review.title}</h4>}
              <p className="text-gray-700 mb-3">{review.comment}</p>
              
              <div className="text-sm text-gray-600 mb-4">
                Product: <span className="font-medium">{review.product?.name}</span>
              </div>

              <div className="flex gap-2">
                {!review.isApproved && (
                  <button
                    onClick={() => approveMutation.mutate(review.id)}
                    className="btn btn-primary text-sm"
                  >
                    <Check className="w-4 h-4 mr-1" />
                    Approve
                  </button>
                )}
                <button
                  onClick={() => rejectMutation.mutate(review.id)}
                  className="btn btn-secondary text-sm"
                >
                  <X className="w-4 h-4 mr-1" />
                  Reject
                </button>
                <button className="btn bg-red-600 hover:bg-red-700 text-white text-sm">
                  <Trash2 className="w-4 h-4 mr-1" />
                  Delete
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="card text-center py-12">
            <Star className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600">No reviews to moderate</p>
          </div>
        )}
      </div>
    </div>
  );
}
