import React from 'react';

const VideoBackground = ({ videoSrc }) => {
  return (
    <div className="fixed top-0 left-0 w-full h-full z-0 overflow-hidden">
      {/* Subtle gradient overlay: transparent at top, darkening at bottom for text readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/60 z-10" />
      <video
        className="w-full h-full object-cover"
        autoPlay
        loop
        muted
        playsInline
        src={videoSrc}
      >
        <source src={videoSrc} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      {/* Fallback/Loading State could go here */}
    </div>
  );
};

export default VideoBackground;
