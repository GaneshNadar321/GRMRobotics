'use client';

import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import api from '@/lib/api';
import { Play, Video, BookOpen, Clock, X } from 'lucide-react';
import { VideoPlayer, VideoModal } from '@/components/VideoPlayer';

// Helper function to extract YouTube video ID
const getYouTubeVideoId = (url: string): string | null => {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  return match && match[2].length === 11 ? match[2] : null;
};

// Get YouTube thumbnail URL
const getYouTubeThumbnail = (videoId: string): string => {
  return `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
};

export default function TutorialsPage() {
  const [selectedVideo, setSelectedVideo] = useState<any>(null);

  const { data: tutorials, isLoading, error } = useQuery({
    queryKey: ['tutorials'],
    queryFn: async () => {
      const response = await api.get('/tutorials');
      console.log('Tutorials API response:', response.data);
      return response.data || [];
    },
  });

  if (error) {
    console.error('Error loading tutorials:', error);
  }

  if (isLoading) {
    return (
      <div className="bg-gray-50 min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <h1 className="text-4xl font-bold mb-8 text-gray-900">Video Tutorials</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 animate-pulse">
                <div className="bg-gray-200 h-48 rounded-lg mb-4"></div>
                <div className="bg-gray-200 h-6 rounded mb-2"></div>
                <div className="bg-gray-200 h-4 rounded w-2/3"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="mb-12">
          <h1 className="text-4xl font-bold mb-4 text-gray-900">Video Tutorials</h1>
          <p className="text-lg text-gray-600">
            Learn how to build and program your robotics kits with our step-by-step video guides
          </p>
        </div>

        {tutorials && tutorials.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {tutorials.map((tutorial: any) => {
                const videoId = getYouTubeVideoId(tutorial.videoUrl);
                const thumbnail = videoId ? getYouTubeThumbnail(videoId) : null;

                return (
                  <div
                    key={tutorial.id}
                    className="bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-lg transition-all duration-300 group overflow-hidden"
                  >
                    <div className="relative h-48 overflow-hidden">
                      {thumbnail ? (
                        <img
                          src={thumbnail}
                          alt={tutorial.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          onError={(e) => {
                            // Fallback to medium quality thumbnail if maxres fails
                            const target = e.target as HTMLImageElement;
                            if (videoId && target.src.includes('maxresdefault')) {
                              target.src = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
                            }
                          }}
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center">
                          <Video className="w-16 h-16 text-blue-600" />
                        </div>
                      )}

                      {/* Play Button Overlay */}
                      <div
                        className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors flex items-center justify-center cursor-pointer"
                        onClick={() => setSelectedVideo(tutorial)}
                      >
                        <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg">
                          <Play className="w-8 h-8 text-gray-800 ml-1" />
                        </div>
                      </div>

                      {/* Duration Badge */}
                      {tutorial.duration && (
                        <div className="absolute top-3 right-3 bg-black/70 text-white px-2 py-1 rounded text-sm font-medium">
                          {Math.floor(tutorial.duration / 60)}:{(tutorial.duration % 60).toString().padStart(2, '0')}
                        </div>
                      )}

                      {/* Free Badge */}

                    </div>

                    <div className="p-6">
                      <h3 className="font-bold text-lg mb-2 text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-2">
                        {tutorial.title}
                      </h3>
                      <p className="text-gray-600 text-sm line-clamp-2 mb-4">
                        {tutorial.description}
                      </p>

                      {tutorial.product && (
                        <div className="mb-3">
                          <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                            {tutorial.product.name}
                          </span>
                        </div>
                      )}

                      <div className="flex items-center justify-between text-sm text-gray-500">
                        <div className="flex items-center">
                          <Play className="w-4 h-4 mr-1" />
                          <span>Video Tutorial</span>
                        </div>
                        <button
                          onClick={() => setSelectedVideo(tutorial)}
                          className="text-blue-600 hover:text-blue-700 font-medium transition-colors"
                        >
                          Watch Now
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Video Modal */}
            <VideoModal
              videoUrl={selectedVideo?.videoUrl || ''}
              title={selectedVideo?.title || ''}
              isOpen={!!selectedVideo}
              onClose={() => setSelectedVideo(null)}
            />
          </>
        ) : (
          // Coming Soon Section
          <div className="text-center py-20">
            <div className="max-w-md mx-auto">
              <div className="inline-flex items-center justify-center w-24 h-24 bg-blue-100 rounded-full mb-8">
                <Video className="w-12 h-12 text-blue-600" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Coming Soon!</h2>
              <p className="text-lg text-gray-600 mb-8">
                We're working hard to create amazing video tutorials for our robotics kits.
                These step-by-step guides will help you build and program your robots with ease.
              </p>

              {/* What to Expect */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">What to Expect</h3>
                <div className="space-y-4 text-left">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Play className="w-4 h-4 text-green-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Step-by-Step Assembly</h4>
                      <p className="text-sm text-gray-600">Detailed video guides for building each robotics kit</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <BookOpen className="w-4 h-4 text-blue-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Programming Tutorials</h4>
                      <p className="text-sm text-gray-600">Learn to code your robots with beginner-friendly lessons</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Clock className="w-4 h-4 text-purple-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Project Walkthroughs</h4>
                      <p className="text-sm text-gray-600">Complete project tutorials from start to finish</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Call to Action */}
              <div className="space-y-4">
                <p className="text-gray-600">
                  In the meantime, check out our products and their documentation
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link
                    href="/products"
                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
                  >
                    Browse Products
                  </Link>
                  <Link
                    href="/contact"
                    className="border-2 border-gray-300 hover:border-blue-300 hover:bg-blue-50 text-gray-700 hover:text-blue-600 px-6 py-3 rounded-lg font-semibold transition-all"
                  >
                    Contact Us
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
