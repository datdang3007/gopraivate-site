import { useQuery } from "@tanstack/react-query";
import { AIModelsService } from "../services/aiModels";
import { AIModel } from "../types/aiModels";
import { getClientIP } from "../utils/ip";

export const useAIModels = () => {
  return useQuery({
    queryKey: ["aiModels"],
    queryFn: async () => {
      const token = localStorage.getItem("authToken") || "";
      const clientIP = await getClientIP();

      const payload = {
        token: token,
        ip: clientIP,
        project_id: "PRI",
      };

      return AIModelsService.getAIModels(payload);
    },
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
    { id: "10", name: "10", displayName: "ChatGPT 5.0" },
    { id: "20", name: "20", displayName: "Llama 4.1" },
    { id: "30", name: "30", displayName: "Llama 3.3" },
    { id: "40", name: "40", displayName: "Claude" },
  ];

  return {
    models: data && data.length > 0 ? data : fallbackModels,
    isLoading,
    error,
    isUsingFallback: !data || data.length === 0,
  };
};
