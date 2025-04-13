
import React from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';

interface ScrollableContainerProps {
  children: React.ReactNode;
  className?: string;
}

const ScrollableContainer: React.FC<ScrollableContainerProps> = ({ 
  children, 
  className 
}) => {
  return (
    <ScrollArea className={cn("h-full w-full", className)}>
      <div className="p-4">
        {children}
      </div>
    </ScrollArea>
  );
};

export default ScrollableContainer;
