import VideoBackground from '@/components/VideoBackground';
import HeroSection from '@/components/HeroSection';
import Navigation from '@/components/Navigation';

export default function Home() {
  const videoUrl = '/homepage_video.mp4';

  return (
    <div className="relative w-full h-screen overflow-hidden">
      <Navigation />
      <VideoBackground videoSrc={videoUrl} />
      <HeroSection />
    </div>
  );
}
