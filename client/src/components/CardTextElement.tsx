import { useState, useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { Move } from 'lucide-react';

interface CardTextElementProps {
  position: 'top' | 'main' | 'details' | 'bottom';
  editable?: boolean;
  children: React.ReactNode;
  className?: string;
}

const CardTextElement = ({ 
  position, 
  editable = true, 
  children, 
  className 
}: CardTextElementProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const [position2D, setPosition2D] = useState({ x: 0, y: 0 });
  const elementRef = useRef<HTMLDivElement>(null);

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!editable) return;

    // Prevent text selection during drag
    document.body.style.userSelect = 'none';

    const startX = e.clientX;
    const startY = e.clientY;
    const startPos = { ...position2D };

    const handleMouseMove = (moveEvent: MouseEvent) => {
      const deltaX = moveEvent.clientX - startX;
      const deltaY = moveEvent.clientY - startY;

      setPosition2D({
        x: startPos.x + deltaX,
        y: startPos.y + deltaY
      });
    };

    const handleMouseUp = () => {
      document.body.style.userSelect = '';
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      setIsDragging(false);
    };

    setIsDragging(true);
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  return (
    <div 
      ref={elementRef}
      className={cn(
        "card-text-element relative py-2 group",
        isDragging && "opacity-70", // Adjust opacity while dragging
        className
      )}
      style={{
        transform: `translate(${position2D.x}px, ${position2D.y}px)`,
        cursor: isDragging ? 'grabbing' : 'default', // Show grabbing cursor when dragging
        zIndex: isDragging ? 10 : 'auto', // Make dragged element appear on top
      }}
    >
      {editable && (
        <div 
          className="drag-handle absolute -top-5 left-1/2 transform -translate-x-1/2 bg-primary/90 text-white text-xs rounded px-2 py-1 cursor-move"
          onMouseDown={handleMouseDown}
        >
          <Move className="h-3 w-3" />
        </div>
      )}
      {children}
    </div>
  );
};

export default CardTextElement;
