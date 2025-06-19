'use client';

import React, { useEffect } from 'react';
import { getBackdropUrl } from '@/app/utils/tmdb';

interface BackdropProps {
  backdropPath: string;
  onBackdropLoad: (imageUrl: string) => void;
}

/**
 * Client component to handle backdrop image loading and notify parent when ready
 * Uses React's prop-based communication instead of direct DOM manipulation
 */
export default function MovieBackdrop({ backdropPath, onBackdropLoad }: BackdropProps) {
  // Load backdrop image
  useEffect(() => {
    if (!backdropPath) return;
    
    const img = new Image();
    img.src = getBackdropUrl(backdropPath);
    
    img.onload = () => {
      // Notify parent component when image is loaded
      onBackdropLoad(getBackdropUrl(backdropPath));
    };
  }, [backdropPath, onBackdropLoad]);

  // This component doesn't render anything visible
  // It just handles the image preloading logic
  return null;
}
