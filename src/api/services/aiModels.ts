
import { apiClient } from '../config/axios';
import { GetAIModelsResponse, AIModel, AIModelRaw } from '../types/aiModels';

export interface GetAIModelsPayload {
  token: string;
  ip: string;
  project_id: string;
}

export class AIModelsService {
  /**
   * Get list of available AI models
   */
  static async getAIModels(payload: GetAIModelsPayload, skipAutoRedirect = false): Promise<{ data: AIModel[]; success: boolean }> {
    const response = await apiClient.post<GetAIModelsResponse>(
      '/api/v1/ailist_id4050',
      payload,
      {
        headers: {
          'Accept': 'application/json',
          ...(skipAutoRedirect && { 'X-Skip-Auto-Redirect': 'true' }),
        },
      }
    );

    const apiResponse = response.data;
    
    // Parse JSONraw to get the actual AI models data
    let models: AIModel[] = [];
    
    try {
      if (apiResponse.JSONraw) {
        const rawModels: AIModelRaw[] = JSON.parse(apiResponse.JSONraw);
        models = rawModels.map(rawModel => ({
          id: rawModel.AI_id.toString(),
          name: rawModel.AI_id.toString(),
          displayName: rawModel.AI_print_name,
          isActive: true
        }));
      }
    } catch (error) {
      console.error('Failed to parse JSONraw:', error);
    }

    return {
      data: models,
      success: apiResponse.success
    };
  }
}
