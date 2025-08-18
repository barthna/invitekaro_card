import React from 'react';
import { cn } from '@/lib/utils';

interface ColorOption {
  color: string;
  name: string;
}

interface ColorPickerProps {
  options: ColorOption[];
  selectedColor: string;
  onChange: (color: string) => void;
  className?: string;
}

const ColorPicker = ({
  options,
  selectedColor,
  onChange,
  className
}: ColorPickerProps) => {
  return (
    <div className={cn("flex space-x-2", className)}>
      {options.map((option) => (
        <button
          key={option.name}
          type="button"
          onClick={() => onChange(option.color)}
          className={cn(
            "w-6 h-6 rounded-full transition-all",
            selectedColor === option.color ? "ring-2 ring-white ring-offset-1 ring-offset-dark" : ""
          )}
          style={{ backgroundColor: option.color }}
          aria-label={`Select ${option.name} color`}
        />
      ))}
    </div>
  );
};

export { ColorPicker };