
export interface SendMessageRequest {
  payload_b64: string;
  ip: string;
  project_id: string;
}

export interface SendMessageResponse {
  status: number;
  data: string;
  message?: string;
}
