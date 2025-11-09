'use client';

import { useState, useEffect } from 'react';
import { Play, Pause, Volume2, VolumeX, Maximize, X } from 'lucide-react';

interface VideoPlayerProps {
  videoUrl: string;
  title: string;
  thumbnail?: string;
  autoPlay?: boolean;
  onClose?: () => void;
}

// Extract YouTube video ID from URL
const getYouTubeVideoId = (url: string): string | null => {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  return match && match[2].length === 11 ? match[2] : null;
};

// Get YouTube thumbnail URL
const getYouTubeThumbnail = (videoId: string, quality: 'default' | 'medium' | 'high' | 'maxres' = 'maxres'): string => {
  return `https://img.youtube.com/vi/${videoId}/${quality}default.jpg`;
};

export function VideoPlayer({ videoUrl, title, thumbnail, autoPlay = false, onClose }: VideoPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [showPlayer, setShowPlayer] = useState(false);
  const videoId = getYouTubeVideoId(videoUrl);
  
  // Use provided thumbnail or generate from YouTube
  const videoThumbnail = thumbnail || (videoId ? getYouTubeThumbnail(videoId) : null);

  const handlePlay = () => {
    setShowPlayer(true);
    setIsPlaying(true);
  };

  const handleClose = () => {
    setShowPlayer(false);
    setIsPlaying(false);
    if (onClose) onClose();
  };

  if (!videoId) {
    return (
      <div className="bg-gray-100 rounded-lg p-8 text-center">
        <p className="text-gray-600">Invalid video URL</p>
      </div>
    );
  }

  return (
    <>
      {/* Thumbnail Preview */}
      {!showPlayer && (
        <div 
          className="relative group cursor-pointer rounded-lg overflow-hidden"
          onClick={handlePlay}
        >
          {videoThumbnail && (
            <img
              src={videoThumbnail}
              alt={title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          )}
          <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition-colors flex items-center justify-center">
            <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
              <Play className="w-8 h-8 text-gray-800 ml-1" />
            </div>
          </div>
          <div className="absolute bottom-4 left-4 right-4">
            <h3 className="text-white font-semibold text-lg drop-shadow-lg">
              {title}
            </h3>
          </div>
        </div>
      )}

      {/* Embedded Player */}
      {showPlayer && (
        <div className="relative rounded-lg overflow-hidden">
          {onClose && (
            <button
              onClick={handleClose}
              className="absolute top-2 right-2 z-10 w-8 h-8 bg-black/70 hover:bg-black/90 text-white rounded-full flex items-center justify-center transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
            <iframe
              src={`https://www.youtube.com/embed/${videoId}?autoplay=${autoPlay ? 1 : 0}&rel=0&modestbranding=1`}
              title={title}
              className="absolute top-0 left-0 w-full h-full"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>
      )}
    </>
  );
}

// Modal Video Player for full-screen experience
export function VideoModal({ videoUrl, title, thumbnail, isOpen, onClose }: VideoPlayerProps & { isOpen: boolean }) {
  const videoId = getYouTubeVideoId(videoUrl);
  
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen || !videoId) return null;

  return (
    <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
      <div className="relative w-full max-w-6xl">
        <button
          onClick={onClose}
          className="absolute -top-12 right-0 text-white hover:text-gray-300 transition-colors"
        >
          <X className="w-8 h-8" />
        </button>
        <div className="relative w-full bg-black rounded-lg overflow-hidden" style={{ paddingBottom: '56.25%' }}>
          <iframe
            src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1`}
            title={title}
            className="absolute top-0 left-0 w-full h-full"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
        <div className="mt-4 text-center">
          <h2 className="text-white text-xl font-semibold">{title}</h2>
        </div>
      </div>
    </div>
  );
}