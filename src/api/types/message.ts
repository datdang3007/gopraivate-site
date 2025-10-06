
export interface SendMessageRequest {
  message: string;
  email?: string;
  name?: string;
  recaptchaToken: string;
}

export interface SendMessageResponse {
  status: number;
  data: string;
  messageId?: string;
}
