import Navigation from '@/components/Navigation';
import GalleryGrid from '@/components/GalleryGrid';

export default function Gallery() {
  return (
    <div className="min-h-screen bg-black text-white pt-20">
      <Navigation />
      <GalleryGrid />
    </div>
  );
}
