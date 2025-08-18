import React from "react";
import { cn } from "@/lib/utils";

export interface CustomCardProps extends React.HTMLAttributes<HTMLDivElement> {
  hoverEffect?: boolean;
  gradientBorder?: boolean;
}

const CustomCard = React.forwardRef<HTMLDivElement, CustomCardProps>(
  ({ className, hoverEffect = false, gradientBorder = false, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "relative p-0.5 rounded-lg",
          gradientBorder && "gradient-border",
          hoverEffect && "template-item",
          className
        )}
        {...props}
      />
    );
  }
);
CustomCard.displayName = "CustomCard";

export { CustomCard };
