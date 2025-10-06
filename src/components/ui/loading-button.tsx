
import React from "react";
import { Button, ButtonProps } from "@/components/ui/button";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { cn } from "@/lib/utils";

export interface LoadingButtonProps extends ButtonProps {
  loading?: boolean;
  loadingText?: string;
  spinnerSize?: "sm" | "md" | "lg" | "xl";
}

/**
 * Professional Loading Button Component
 * 
 * Features:
 * - Shows spinner when loading
 * - Customizable loading text
 * - Maintains button size when loading
 * - Disables interaction when loading
 * - Inherits all Button props
 * 
 * Usage:
 * <LoadingButton 
 *   loading={mutation.isPending}
 *   loadingText="Signing in..."
 * >
 *   Sign In
 * </LoadingButton>
 */
export const LoadingButton: React.FC<LoadingButtonProps> = ({
  loading = false,
  loadingText,
  spinnerSize = "sm",
  children,
  disabled,
  className,
  ...props
}) => {
  const isDisabled = disabled || loading;
  
  return (
    <Button
      disabled={isDisabled}
      className={cn(
        "relative transition-all duration-200",
        loading && "cursor-not-allowed",
        className
      )}
      {...props}
    >
      <span className={cn(
        "flex items-center justify-center gap-2",
        loading && "opacity-0"
      )}>
        {children}
      </span>
      
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center">
          <LoadingSpinner 
            size={spinnerSize} 
            color="white"
          />
          {loadingText && (
            <span className="ml-2 text-sm">
              {loadingText}
            </span>
          )}
        </div>
      )}
    </Button>
  );
};
