'use client';

import { useState, useMemo } from 'react';
import Navigation from '@/components/Navigation';
import GalleryGrid from '@/components/GalleryGrid';
import { FilterSidebar } from '@/components/gallery/FilterSidebar';
import { MobileFilterSheet } from '@/components/gallery/MobileFilterSheet';
import { usePrompts } from '@/hooks/usePrompts';
import { useDebounce } from '@/hooks/useDebounce';

export default function Gallery() {
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const debouncedSearch = useDebounce(searchQuery, 300);

  // Server-side search and filtering
  const { prompts, isLoading } = usePrompts({
    limit: 100,
    search: debouncedSearch || undefined,
  });

  // Client-side tag filtering (tags use OR logic, kept on client for flexibility)
  const filteredPrompts = useMemo(() => {
    if (selectedTags.length === 0) return prompts;
    return prompts.filter((prompt) =>
      selectedTags.some((tagId) => prompt.tags.some((t) => t.id === tagId))
    );
  }, [prompts, selectedTags]);

  const filterContent = (
    <FilterSidebar
      selectedTags={selectedTags}
      onTagsChange={setSelectedTags}
      searchQuery={searchQuery}
      onSearchChange={setSearchQuery}
    />
  );

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation />

      <div className="flex pt-20">
        {/* Desktop Sidebar */}
        <aside className="hidden lg:block w-72 shrink-0 sticky top-20 h-[calc(100vh-5rem)] overflow-y-auto border-r border-border bg-background">
          {filterContent}
        </aside>

        {/* Mobile Filter Sheet */}
        <MobileFilterSheet selectedCount={selectedTags.length}>
          {filterContent}
        </MobileFilterSheet>

        {/* Main Content */}
        <main className="flex-1 min-w-0">
          <GalleryGrid prompts={filteredPrompts} isLoading={isLoading} />
        </main>
      </div>
    </div>
  );
}
