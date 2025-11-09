'use client';

import { useQuery } from '@tanstack/react-query';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import api from '@/lib/api';
import { VideoPlayer } from '@/components/VideoPlayer';
import { ArrowLeft, Clock, User, Calendar, Tag } from 'lucide-react';

export default function TutorialDetailPage() {
  const params = useParams();
  const router = useRouter();
  const tutorialId = params.id as string;

  const { data: tutorial, isLoading, error } = useQuery({
    queryKey: ['tutorial', tutorialId],
    queryFn: async () => {
      const response = await api.get(`/tutorials/${tutorialId}`);
      return response.data;
    },
    enabled: !!tutorialId,
  });

  if (isLoading) {
    return (
      <div className="bg-gray-50 min-h-screen">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="animate-pulse">
            <div className="bg-gray-200 h-8 w-32 rounded mb-8"></div>
            <div className="bg-gray-200 h-96 rounded-lg mb-8"></div>
            <div className="bg-gray-200 h-8 w-3/4 rounded mb-4"></div>
            <div className="bg-gray-200 h-4 w-full rounded mb-2"></div>
            <div className="bg-gray-200 h-4 w-2/3 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !tutorial) {
    return (
      <div className="bg-gray-50 min-h-screen">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Tutorial Not Found</h1>
            <p className="text-gray-600 mb-8">The tutorial you're looking for doesn't exist or has been removed.</p>
            <Link 
              href="/tutorials"
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
            >
              Back to Tutorials
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-8 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back to Tutorials</span>
        </button>

        {/* Video Player */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden mb-8">
          <div className="aspect-video">
            <VideoPlayer
              videoUrl={tutorial.videoUrl}
              title={tutorial.title}
              thumbnail={tutorial.thumbnail}
              autoPlay={true}
            />
          </div>
        </div>

        {/* Tutorial Info */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">{tutorial.title}</h1>
            
            {/* Meta Information */}
            <div className="flex flex-wrap items-center gap-6 text-sm text-gray-600 mb-6">
              {tutorial.duration && (
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span>{Math.floor(tutorial.duration / 60)} minutes</span>
                </div>
              )}
              
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>{new Date(tutorial.createdAt).toLocaleDateString()}</span>
              </div>

              {tutorial.isFree && (
                <div className="flex items-center gap-2">
                  <Tag className="w-4 h-4" />
                  <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">
                    FREE
                  </span>
                </div>
              )}
            </div>

            {/* Product Association */}
            {tutorial.product && (
              <div className="mb-6">
                <Link 
                  href={`/products/${tutorial.product.id}`}
                  className="inline-flex items-center gap-2 bg-blue-50 hover:bg-blue-100 text-blue-700 px-4 py-2 rounded-lg transition-colors"
                >
                  <span>Related Product: {tutorial.product.name}</span>
                </Link>
              </div>
            )}
          </div>

          {/* Description */}
          {tutorial.description && (
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">About this Tutorial</h2>
              <div className="prose prose-gray max-w-none">
                <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                  {tutorial.description}
                </p>
              </div>
            </div>
          )}

          {/* Call to Action */}
          <div className="border-t border-gray-200 pt-8">
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/products"
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors text-center"
              >
                Browse Our Products
              </Link>
              <Link
                href="/tutorials"
                className="border-2 border-gray-300 hover:border-blue-300 hover:bg-blue-50 text-gray-700 hover:text-blue-600 px-6 py-3 rounded-lg font-semibold transition-all text-center"
              >
                More Tutorials
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}