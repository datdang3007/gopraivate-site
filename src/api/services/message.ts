import { apiClient } from "../config/axios";
import { SendMessageRequest, SendMessageResponse, ChatHistoryRequest, ChatHistoryResponse } from "../types/message";

export class MessageService {
  /**
   * Send message
   */
  static async sendMessage(
    request: SendMessageRequest,
  ): Promise<SendMessageResponse> {
    const response = await apiClient.post<SendMessageResponse>(
      "/api/v1/agents/chat_id2060",
      request,
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      },
    );

    return response.data;
  }

  /**
   * Get chat history
   */
  static async getChatHistory(
    request: ChatHistoryRequest,
  ): Promise<ChatHistoryResponse> {
    const response = await apiClient.post<ChatHistoryResponse>(
      "/api/v1/agents/chathistory_id2070",
      request,
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      },
    );

    return response.data;
  }
}
