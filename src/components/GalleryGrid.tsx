'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Copy, X, Check, ChevronLeft, ChevronRight } from 'lucide-react';
import { usePrompts } from '@/hooks/usePrompts';
import { useTags, useTagTypes } from '@/hooks/useTags';
import type { PromptWithTags, Tag } from '@/types/database';

import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';

interface GalleryGridProps {
  featured?: boolean;
  limit?: number;
}

const GalleryGrid = ({ featured, limit = 20 }: GalleryGridProps) => {
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [activeTagType, setActiveTagType] = useState<string>('all');
  const [selectedPrompt, setSelectedPrompt] = useState<PromptWithTags | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [copied, setCopied] = useState(false);

  const { prompts, isLoading } = usePrompts({
    limit,
    tag: selectedTags[0] || undefined,
    featured,
  });
  const { tags, tagsByType } = useTags();
  const { tagTypes } = useTagTypes();

  // Filter prompts by selected tags (multi-select)
  const filteredPrompts = useMemo(() => {
    if (selectedTags.length === 0) return prompts;
    return prompts.filter((prompt) =>
      selectedTags.some((tagId) =>
        prompt.tags.some((t) => t.id === tagId)
      )
    );
  }, [prompts, selectedTags]);

  // Get tags for current tab
  const currentTags = useMemo(() => {
    if (activeTagType === 'all') return tags;
    return tagsByType?.[activeTagType] || [];
  }, [activeTagType, tags, tagsByType]);

  const toggleTag = (tagId: string) => {
    setSelectedTags((prev) =>
      prev.includes(tagId)
        ? prev.filter((id) => id !== tagId)
        : [...prev, tagId]
    );
  };

  const clearTags = () => setSelectedTags([]);

  const copyPrompt = async () => {
    if (!selectedPrompt) return;
    await navigator.clipboard.writeText(selectedPrompt.prompt_text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Get images for detail modal
  const modalImages = useMemo(() => {
    if (!selectedPrompt) return [];
    if (selectedPrompt.images && selectedPrompt.images.length > 0) {
      return selectedPrompt.images.map((img) => img.image_url);
    }
    return [selectedPrompt.image_url];
  }, [selectedPrompt]);

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % modalImages.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + modalImages.length) % modalImages.length);
  };

  // Loading skeleton - fixed heights to avoid hydration mismatch
  const skeletonHeights = [280, 350, 240, 320, 300, 260];

  if (isLoading) {
    return (
      <div className="container mx-auto py-32 px-4">
        <div className="text-4xl md:text-5xl font-bold mb-16 text-center tracking-tight">
          Featured Works
        </div>
        <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
          {skeletonHeights.map((height, i) => (
            <Skeleton
              key={i}
              className="break-inside-avoid rounded-2xl"
              style={{ height: `${height}px` }}
            />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-32 px-4">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-4xl md:text-5xl font-bold mb-8 text-center tracking-tight"
      >
        Featured Works
      </motion.h2>

      {/* Tag Filter with Tabs */}
      {tags.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-12"
        >
          {/* Tag Type Tabs */}
          <Tabs value={activeTagType} onValueChange={setActiveTagType} className="w-full mb-6">
            <TabsList className="flex flex-wrap justify-center bg-transparent gap-1">
              <TabsTrigger
                value="all"
                className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
              >
                All
              </TabsTrigger>
              {tagTypes.map((type) => (
                <TabsTrigger
                  key={type.id}
                  value={type.slug}
                  className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                >
                  {type.name}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>

          {/* Tags */}
          <div className="flex flex-wrap justify-center gap-2">
            {selectedTags.length > 0 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={clearTags}
                className="text-muted-foreground hover:text-foreground"
              >
                Clear ({selectedTags.length})
              </Button>
            )}
            {currentTags.map((tag) => (
              <Badge
                key={tag.id}
                variant={selectedTags.includes(tag.id) ? 'default' : 'outline'}
                className={cn(
                  'cursor-pointer transition-all hover:scale-105',
                  selectedTags.includes(tag.id)
                    ? 'ring-2 ring-offset-2 ring-offset-background'
                    : 'opacity-80 hover:opacity-100'
                )}
                style={{
                  backgroundColor: selectedTags.includes(tag.id) ? tag.color : 'transparent',
                  borderColor: tag.color,
                  color: selectedTags.includes(tag.id) ? '#fff' : tag.color,
                  // @ts-expect-error CSS variable
                  '--tw-ring-color': tag.color,
                }}
                onClick={() => toggleTag(tag.id)}
              >
                {tag.name}
              </Badge>
            ))}
          </div>
        </motion.div>
      )}

      {/* Gallery Grid */}
      {filteredPrompts.length === 0 ? (
        <div className="text-center text-muted-foreground py-16">
          暂无作品
        </div>
      ) : (
        <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
          {filteredPrompts.map((prompt, index) => (
            <motion.div
              key={prompt.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6, delay: index * 0.05 }}
              className="group relative break-inside-avoid rounded-2xl overflow-hidden cursor-pointer bg-card"
              onClick={() => {
                setSelectedPrompt(prompt);
                setCurrentImageIndex(0);
              }}
            >
              <img
                src={prompt.thumbnail_url || prompt.image_url}
                alt={prompt.title}
                className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
              />

              {/* Featured Badge */}
              {prompt.is_featured && (
                <Badge className="absolute top-4 right-4 bg-yellow-500 text-black">
                  Featured
                </Badge>
              )}

              {/* Multi-image indicator */}
              {prompt.images && prompt.images.length > 1 && (
                <div className="absolute top-4 left-4 px-2 py-1 bg-black/60 rounded text-xs text-white">
                  {prompt.images.length} images
                </div>
              )}

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              {/* Content */}
              <div className="absolute bottom-0 left-0 w-full p-6 translate-y-4 group-hover:translate-y-0 transition-transform duration-500 opacity-0 group-hover:opacity-100">
                <div className="glass rounded-xl p-4">
                  <h3 className="text-lg font-semibold text-white">
                    {prompt.title}
                  </h3>
                  {prompt.tags && prompt.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-2">
                      {prompt.tags.slice(0, 3).map((tag) => (
                        <Badge
                          key={tag.id}
                          variant="secondary"
                          className="text-xs"
                          style={{
                            backgroundColor: `${tag.color}30`,
                            color: tag.color,
                          }}
                        >
                          {tag.name}
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Detail Modal */}
      <Dialog open={!!selectedPrompt} onOpenChange={() => setSelectedPrompt(null)}>
        <DialogContent className="max-w-4xl max-h-[90vh] p-0 overflow-hidden bg-card border-border">
          {selectedPrompt && (
            <>
              {/* Image Gallery */}
              <div className="relative aspect-video bg-black">
                <img
                  src={modalImages[currentImageIndex]}
                  alt={selectedPrompt.title}
                  className="w-full h-full object-contain"
                />

                {/* Image Navigation */}
                {modalImages.length > 1 && (
                  <>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white"
                      onClick={(e) => {
                        e.stopPropagation();
                        prevImage();
                      }}
                    >
                      <ChevronLeft className="h-6 w-6" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white"
                      onClick={(e) => {
                        e.stopPropagation();
                        nextImage();
                      }}
                    >
                      <ChevronRight className="h-6 w-6" />
                    </Button>
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                      {modalImages.map((_, i) => (
                        <button
                          key={i}
                          className={cn(
                            'w-2 h-2 rounded-full transition-all',
                            i === currentImageIndex ? 'bg-white w-4' : 'bg-white/50'
                          )}
                          onClick={(e) => {
                            e.stopPropagation();
                            setCurrentImageIndex(i);
                          }}
                        />
                      ))}
                    </div>
                  </>
                )}
              </div>

              {/* Info */}
              <ScrollArea className="max-h-[50vh]">
                <div className="p-6 space-y-4">
                  <DialogHeader>
                    <DialogTitle className="text-2xl">{selectedPrompt.title}</DialogTitle>
                  </DialogHeader>

                  {selectedPrompt.description && (
                    <p className="text-muted-foreground">{selectedPrompt.description}</p>
                  )}

                  {/* Tags */}
                  {selectedPrompt.tags && selectedPrompt.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {selectedPrompt.tags.map((tag) => (
                        <Badge
                          key={tag.id}
                          variant="outline"
                          style={{
                            borderColor: tag.color,
                            color: tag.color,
                          }}
                        >
                          {tag.name}
                        </Badge>
                      ))}
                    </div>
                  )}

                  {/* Prompt Text */}
                  <div className="p-4 bg-secondary rounded-xl">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-muted-foreground">Prompt</span>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={copyPrompt}
                        className="h-8 gap-2"
                      >
                        {copied ? (
                          <>
                            <Check className="h-4 w-4" />
                            Copied
                          </>
                        ) : (
                          <>
                            <Copy className="h-4 w-4" />
                            Copy
                          </>
                        )}
                      </Button>
                    </div>
                    <p className="text-foreground font-mono text-sm leading-relaxed">
                      {selectedPrompt.prompt_text}
                    </p>
                  </div>

                  {selectedPrompt.negative_prompt && (
                    <div className="p-4 bg-secondary rounded-xl">
                      <p className="text-sm text-muted-foreground mb-2">Negative Prompt</p>
                      <p className="text-muted-foreground font-mono text-sm leading-relaxed">
                        {selectedPrompt.negative_prompt}
                      </p>
                    </div>
                  )}

                  {/* Meta */}
                  <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                    {selectedPrompt.model && (
                      <span>Model: {selectedPrompt.model}</span>
                    )}
                    {selectedPrompt.author_name && (
                      <span>Author: {selectedPrompt.author_name}</span>
                    )}
                  </div>
                </div>
              </ScrollArea>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default GalleryGrid;
