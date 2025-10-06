
import React from "react";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

export interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
  color?: "primary" | "white" | "muted";
}

const sizeClasses = {
  sm: "h-3 w-3",
  md: "h-4 w-4", 
  lg: "h-6 w-6",
  xl: "h-8 w-8"
};

const colorClasses = {
  primary: "text-primary",
  white: "text-white",
  muted: "text-muted-foreground"
};

/**
 * Reusable Loading Spinner Component
 * 
 * Features:
 * - Multiple sizes (sm, md, lg, xl)
 * - Multiple colors (primary, white, muted)
 * - Smooth rotation animation
 * - Fully customizable with className
 * 
 * Usage:
 * <LoadingSpinner size="md" color="primary" />
 */
export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = "md",
  className,
  color = "primary"
}) => {
  return (
    <Loader2 
      className={cn(
        "animate-spin",
        sizeClasses[size],
        colorClasses[color],
        className
      )}
    />
  );
};
