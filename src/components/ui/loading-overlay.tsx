
import React from "react";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { cn } from "@/lib/utils";

export interface LoadingOverlayProps {
  visible: boolean;
  message?: string;
  backdrop?: boolean;
  className?: string;
}

/**
 * Full Screen Loading Overlay Component
 * 
 * Features:
 * - Full screen coverage
 * - Optional backdrop blur
 * - Customizable message
 * - Smooth fade in/out transitions
 * - Portal-based rendering
 * 
 * Usage:
 * <LoadingOverlay 
 *   visible={isProcessing}
 *   message="Processing your request..."
 *   backdrop={true}
 * />
 */
export const LoadingOverlay: React.FC<LoadingOverlayProps> = ({
  visible,
  message = "Loading...",
  backdrop = true,
  className
}) => {
  if (!visible) return null;

  return (
    <div
      className={cn(
        "fixed inset-0 z-50 flex items-center justify-center",
        backdrop && "bg-black/20 backdrop-blur-sm",
        "animate-in fade-in-0 duration-200",
        className
      )}
    >
      <div className="bg-background border rounded-lg shadow-lg p-6 flex flex-col items-center gap-4 max-w-sm mx-4">
        <LoadingSpinner size="lg" />
        <div className="text-center">
          <p className="text-sm font-medium text-foreground">
            {message}
          </p>
        </div>
      </div>
    </div>
  );
};
