
import { useQuery } from '@tanstack/react-query';
import { AIModelsService } from '../services/aiModels';
import { AIModel } from '../types/aiModels';

export const useAIModels = () => {
  return useQuery({
    queryKey: ['aiModels'],
    queryFn: AIModelsService.getAIModels,
    select: (response) => response.data,
    staleTime: 5 * 60 * 1000, // 5 minutes
    cacheTime: 10 * 60 * 1000, // 10 minutes
    retry: 2,
    refetchOnWindowFocus: false,
  });
};

export const useAIModelsWithFallback = () => {
  const { data, isLoading, error } = useAIModels();
  
  // Fallback data nếu API không thành công
  const fallbackModels: AIModel[] = [
    { id: 'chatgpt', name: 'chatgpt', displayName: 'ChatGPT' },
    { id: 'claude', name: 'claude', displayName: 'Claude' },
    { id: 'gemini', name: 'gemini', displayName: 'Gemini' },
  ];
  
  return {
    models: data && data.length > 0 ? data : fallbackModels,
    isLoading,
    error,
    isUsingFallback: !data || data.length === 0,
  };
};
