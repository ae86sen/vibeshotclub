'use client';

import { Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { ScrollArea } from '@/components/ui/scroll-area';

interface MobileFilterSheetProps {
  selectedCount: number;
  children: React.ReactNode;
}

export const MobileFilterSheet = ({
  selectedCount,
  children,
}: MobileFilterSheetProps) => {
  return (
    <div className="lg:hidden fixed bottom-6 right-6 z-50">
      <Sheet>
        <SheetTrigger asChild>
          <Button
            size="icon"
            className="h-14 w-14 rounded-full shadow-lg bg-primary hover:bg-primary/90"
          >
            <Filter className="h-5 w-5" />
            {selectedCount > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-destructive text-destructive-foreground text-xs rounded-full flex items-center justify-center">
                {selectedCount}
              </span>
            )}
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-80 p-0 bg-background">
          <SheetHeader className="p-4 border-b border-border">
            <SheetTitle>Filters</SheetTitle>
          </SheetHeader>
          <ScrollArea className="h-[calc(100vh-5rem)]">{children}</ScrollArea>
        </SheetContent>
      </Sheet>
    </div>
  );
};
