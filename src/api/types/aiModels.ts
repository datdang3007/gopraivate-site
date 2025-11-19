
export interface AIModel {
  id: string;
  name: string;
  displayName: string;
  provider?: string;
  isActive?: boolean;
}

export interface GetAIModelsPayload {
  token: string;
  ip: string;
  project_id: string;
}

export interface GetAIModelsResponse {
  data: AIModel[];
  success: boolean;
  message?: string;
}
