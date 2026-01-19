import { apiClient } from "../config/axios";
import { StatisticsRequest, StatisticsResponse } from "../types/statistics";

export class StatisticsService {
  /**
   * Get statistics
   */
  static async getStatistics(
    request: StatisticsRequest,
  ): Promise<StatisticsResponse> {
    const response = await apiClient.post<StatisticsResponse>(
      "/api/v1/stats/stats_id6060",
      request,
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      },
    );

    return response.data;
  }
}
