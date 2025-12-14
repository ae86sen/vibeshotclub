'use client';

import { useState } from 'react';
import { X, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { useTags, useTagTypes } from '@/hooks/useTags';
import { TagPill } from './TagPill';

interface FilterSidebarProps {
  selectedTags: string[];
  onTagsChange: (tags: string[]) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export const FilterSidebar = ({
  selectedTags,
  onTagsChange,
  searchQuery,
  onSearchChange,
}: FilterSidebarProps) => {
  const { tags, tagsByType } = useTags();
  const { tagTypes } = useTagTypes();

  const [expandedTypes, setExpandedTypes] = useState<string[]>(
    tagTypes.length > 0 ? [tagTypes[0].slug] : []
  );

  const toggleTag = (tagId: string) => {
    onTagsChange(
      selectedTags.includes(tagId)
        ? selectedTags.filter((id) => id !== tagId)
        : [...selectedTags, tagId]
    );
  };

  const clearAll = () => {
    onTagsChange([]);
    onSearchChange('');
  };

  return (
    <div className="p-4 space-y-4">
      {/* Search Input */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search prompts..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-9 bg-secondary border-border"
        />
        {searchQuery && (
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-1 top-1/2 -translate-y-1/2 h-6 w-6"
            onClick={() => onSearchChange('')}
          >
            <X className="h-3 w-3" />
          </Button>
        )}
      </div>

      {/* Clear Filters */}
      {(selectedTags.length > 0 || searchQuery) && (
        <Button
          variant="ghost"
          size="sm"
          onClick={clearAll}
          className="w-full text-muted-foreground hover:text-foreground"
        >
          Clear all filters ({selectedTags.length})
        </Button>
      )}

      {/* Filters Header */}
      <div className="pt-2">
        <h3 className="text-lg font-semibold text-foreground">Filters</h3>
      </div>

      {/* Tag Type Accordion */}
      <Accordion
        type="multiple"
        value={expandedTypes}
        onValueChange={setExpandedTypes}
        className="space-y-1"
      >
        {tagTypes.map((type) => (
          <AccordionItem
            key={type.id}
            value={type.slug}
            className="border-none"
          >
            <AccordionTrigger className="py-3 px-3 rounded-lg hover:bg-secondary hover:no-underline">
              <div className="flex items-center gap-2">
                <span>{type.name}</span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="pt-2 pb-3 px-1">
              <div className="flex flex-wrap gap-2">
                {tagsByType?.[type.slug]?.map((tag) => (
                  <TagPill
                    key={tag.id}
                    tag={tag}
                    selected={selectedTags.includes(tag.id)}
                    onClick={() => toggleTag(tag.id)}
                  />
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>

      {/* Show all tags if no tag types exist */}
      {tagTypes.length === 0 && tags.length > 0 && (
        <div className="flex flex-wrap gap-2 pt-2">
          {tags.map((tag) => (
            <TagPill
              key={tag.id}
              tag={tag}
              selected={selectedTags.includes(tag.id)}
              onClick={() => toggleTag(tag.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
};
