import React from 'react';
import VideoBackground from '../components/VideoBackground';
import HeroSection from '../components/HeroSection';
import Navigation from '../components/Navigation';
import homepageVideo from '../assets/homepage_video.mp4';

const Home = () => {
    // Using a high-quality abstract background video
    // User should replace this with their own video
    // const videoUrl = "https://cdn.pixabay.com/video/2023/10/22/186115-877653483_large.mp4";
    const videoUrl = homepageVideo;

    return (
        <div className="relative w-full h-screen overflow-hidden">
            <Navigation />
            <VideoBackground videoSrc={videoUrl} />
            <HeroSection />
        </div>
    );
};

export default Home;
