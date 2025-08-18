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
  const startPosRef = useRef({ x: 0, y: 0 });
  const elementStartPosRef = useRef({ x: 0, y: 0 });

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!editable) return;

    setIsDragging(true);
    startPosRef.current = { x: e.clientX, y: e.clientY };
    elementStartPosRef.current = { ...position2D };

    // Prevent text selection during drag
    document.body.style.userSelect = 'none';

    // Add event listeners for move and up events
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging) return;

    const deltaX = e.clientX - startPosRef.current.x;
    const deltaY = e.clientY - startPosRef.current.y;

    setPosition2D({
      x: elementStartPosRef.current.x + deltaX,
      y: elementStartPosRef.current.y + deltaY
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    document.body.style.userSelect = ''; // Restore text selection behavior
    document.removeEventListener('mousemove', handleMouseMove);
    document.removeEventListener('mouseup', handleMouseUp);
  };

  useEffect(() => {
    // Clean up mouse events when the component unmounts or if drag stops
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);

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
