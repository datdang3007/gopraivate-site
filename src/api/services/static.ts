
import { apiClient } from "../config/axios";
import { StaticContentRequest, StaticContentResponse } from "../types/static";

export class StaticContentService {
  /**
   * Get static content
   */
  static async getStaticContent(
    request: StaticContentRequest,
  ): Promise<StaticContentResponse> {
    const response = await apiClient.post<StaticContentResponse>(
      "/api/v1/static/content_id6050",
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
