
export interface AIModel {
  id: string;
  name: string;
  displayName: string;
  provider?: string;
  isActive?: boolean;
}

export interface AIModelRaw {
  AI_id: number;
  AI_print_name: string;
}

export interface GetAIModelsPayload {
  token: string;
  ip: string;
  project_id: string;
}

export interface GetAIModelsResponse {
  success: boolean;
  message: string;
  variables: {
    AI_id: number;
    AI_print_name: string;
  };
  agents: {};
  misc: string;
  statuscode: number;
  JSONraw: string;
  JSONrawagents: string;
  imageBytes: null;
}
