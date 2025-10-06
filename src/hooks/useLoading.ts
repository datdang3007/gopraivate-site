
import { useState } from "react";

export interface LoadingState {
  isLoading: boolean;
  message?: string;
  action?: string;
}

/**
 * Loading State Management Hook
 * 
 * Features:
 * - Centralized loading state
 * - Multiple loading actions
 * - Custom messages per action
 * - Easy start/stop methods
 * 
 * Usage:
 * const loading = useLoading();
 * loading.start("login", "Signing in...");
 * loading.stop("login");
 */
export const useLoading = () => {
  const [loadingStates, setLoadingStates] = useState<Record<string, LoadingState>>({});

  const start = (action: string, message?: string) => {
    setLoadingStates(prev => ({
      ...prev,
      [action]: {
        isLoading: true,
        message,
        action
      }
    }));
  };

  const stop = (action: string) => {
    setLoadingStates(prev => {
      const newState = { ...prev };
      delete newState[action];
      return newState;
    });
  };

  const isLoading = (action?: string) => {
    if (action) {
      return loadingStates[action]?.isLoading || false;
    }
    return Object.values(loadingStates).some(state => state.isLoading);
  };

  const getMessage = (action: string) => {
    return loadingStates[action]?.message;
  };

  const clear = () => {
    setLoadingStates({});
  };

  return {
    start,
    stop,
    isLoading,
    getMessage,
    clear,
    states: loadingStates
  };
};
