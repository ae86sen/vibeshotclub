'use client';

import { cn } from '@/lib/utils';
import type { Tag } from '@/types/database';

interface TagPillProps {
  tag: Tag;
  selected: boolean;
  onClick: () => void;
}

export const TagPill = ({ tag, selected, onClick }: TagPillProps) => {
  return (
    <button
      onClick={onClick}
      className={cn(
        'px-3 py-1.5 rounded-full text-sm font-medium transition-all',
        'border hover:scale-105 cursor-pointer',
        selected
          ? 'text-white shadow-md'
          : 'bg-transparent opacity-80 hover:opacity-100'
      )}
      style={{
        backgroundColor: selected ? tag.color : 'transparent',
        borderColor: tag.color,
        color: selected ? '#fff' : tag.color,
      }}
    >
      {tag.name}
    </button>
  );
};
