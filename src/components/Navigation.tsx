'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const Navigation = () => {
  const pathname = usePathname();
  const isHome = pathname === '/';

  return (
    <nav
      className={cn(
        'fixed top-0 left-0 w-full z-50 py-6 px-8 transition-all duration-500',
        isHome
          ? 'bg-transparent'
          : 'bg-black/60 backdrop-blur-md border-b border-white/5'
      )}
    >
      <div className="flex justify-between items-center max-w-7xl mx-auto">
        <Link
          href="/"
          className="text-2xl font-bold tracking-tighter hover:opacity-80 transition-opacity"
        >
          VSC
        </Link>

        <div className="flex gap-8 items-center">
          <Link
            href="/"
            className={cn(
              'text-sm font-medium transition-colors',
              pathname === '/' ? 'text-white' : 'text-muted-foreground hover:text-white'
            )}
          >
            Home
          </Link>
          <Link
            href="/gallery"
            className={cn(
              'text-sm font-medium transition-colors',
              pathname === '/gallery' ? 'text-white' : 'text-muted-foreground hover:text-white'
            )}
          >
            Gallery
          </Link>
          <a
            href="#"
            className="text-sm font-medium text-muted-foreground hover:text-white transition-colors"
          >
            About
          </a>
          <Button size="sm" className="rounded-full">
            Join Community
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
