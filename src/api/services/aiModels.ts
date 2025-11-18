
import { apiClient } from '../config/axios';
import { GetAIModelsResponse } from '../types/aiModels';

export class AIModelsService {
  /**
   * Get list of available AI models
   */
  static async getAIModels(): Promise<GetAIModelsResponse> {
    const response = await apiClient.get<GetAIModelsResponse>(
      '/api/v1/ailist_id4050',
      {
        headers: {
          'Accept': 'application/json',
        },
      }
    );

    return response.data;
  }
}
