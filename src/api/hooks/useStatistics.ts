import { useMutation } from "@tanstack/react-query";
import { StatisticsService } from "../services/statistics";
import { StatisticsRequest, StatisticsResponse } from "../types/statistics";
import { toast } from "@/hooks/use-toast";

export const STATISTICS_KEYS = {
  get: ["statistics", "get"] as const,
};

/**
 * Get statistics mutation hook
 */
export const useStatistics = () => {
  return useMutation<StatisticsResponse, Error, StatisticsRequest>({
    mutationKey: STATISTICS_KEYS.get,
    mutationFn: (request: StatisticsRequest) =>
      StatisticsService.getStatistics(request),
    onError: (error: any) => {
      console.error("Get statistics error:", error);

      let errorMessage = "Failed to get statistics. Please try again.";
      if (error.response?.data?.message) {
        errorMessage = error.response.data.message;
      }

      toast({
        title: "Get statistics failed",
        description: errorMessage,
        variant: "destructive",
      });
    },
  });
};
