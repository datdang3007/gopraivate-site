
import { apiClient } from '../config/axios';
import { SendMessageRequest, SendMessageResponse } from '../types/message';

export class MessageService {
  /**
   * Send message
   */
  static async sendMessage(request: SendMessageRequest): Promise<SendMessageResponse> {
    const response = await apiClient.post<SendMessageResponse>(
      '/api/v0/msg_id4040',
      request,
      {
        headers: {
          'Accept': 'application/json',
        },
      }
    );

    return response.data;
  }
}
