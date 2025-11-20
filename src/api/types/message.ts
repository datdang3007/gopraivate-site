export interface SendMessageRequest {
  token: string;
  user_id: string;
  ip: string;
  project_id: string;
  agent_id: string;
  user_input: string;
  language: string;
  ai_id?: number;
  security_level?: number;
}

export interface SendMessageResponse {
  success: boolean;
  message: string;
  variables: Record<string, any>;
  agents: Record<string, any>;
  misc: string;
  statuscode: number;
  JSONraw: string;
  JSONrawagents: string;
  imageBytes: any;
}

export interface ChatOutputData {
  agent_id: string;
  project_id: string;
  user_id: string;
  chat_output: string;
}

export interface ChatHistoryRequest {
  token: string;
  user_id: string;
  ip: string;
  project_id: string;
  agent_id: string;
  language: string;
}

export interface ChatHistoryResponse {
  success: boolean;
  message: string;
  variables: Record<string, any>;
  agents: Record<string, any>;
  misc: string;
  statuscode: number;
  JSONraw: string;
  JSONrawagents: string;
  imageBytes: any;
}

export interface ChatHistoryData {
  agent_id: string;
  project_id: string;
  user_id: string;
  chat_input: string;
  chat_output: string;
  timestamp: string;
}
