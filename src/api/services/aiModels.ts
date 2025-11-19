
import { apiClient } from '../config/axios';
import { GetAIModelsResponse } from '../types/aiModels';

export interface GetAIModelsPayload {
  token: string;
  ip: string;
  project_id: string;
}

export class AIModelsService {
  /**
   * Get list of available AI models
   */
  static async getAIModels(payload: GetAIModelsPayload): Promise<GetAIModelsResponse> {
    const response = await apiClient.post<GetAIModelsResponse>(
      '/api/v1/ailist_id4050',
      payload,
      {
        headers: {
          'Accept': 'application/json',
        },
      }
    );

    return response.data;
  }
}
