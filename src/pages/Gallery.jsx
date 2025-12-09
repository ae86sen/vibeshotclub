import React from 'react';
import Navigation from '../components/Navigation';
import GalleryGrid from '../components/GalleryGrid';

const Gallery = () => {
    return (
        <div className="min-h-screen bg-black text-white pt-20">
            <Navigation />
            <GalleryGrid />
        </div>
    );
};

export default Gallery;
