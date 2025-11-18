
export interface SendMessageRequest {
  token: string;
  user_id: string;
  ip: string;
  project_id: string;
  agent_id: string;
  user_input: string;
  language: string;
}

export interface SendMessageResponse {
  status: number;
  data: string;
  message?: string;
}
