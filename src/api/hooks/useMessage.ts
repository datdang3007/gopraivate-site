
import { useMutation } from '@tanstack/react-query';
import { MessageService } from '../services/message';
import { SendMessageRequest } from '../types/message';
import { toast } from '@/hooks/use-toast';

export const MESSAGE_KEYS = {
  send: ['message', 'send'] as const,
};

/**
 * Send message mutation hook
 */
export const useSendMessage = () => {
  return useMutation({
    mutationKey: MESSAGE_KEYS.send,
    mutationFn: (data: SendMessageRequest) => MessageService.sendMessage(data),
    onSuccess: (response) => {
      if (response.status === 200 && response.data && response.data.includes('msg received successfully')) {
        toast({
          title: 'Message sent',
          description: 'Your message has been sent successfully!',
        });
      }
    },
    onError: (error: any) => {
      console.error('Send message error:', error);
      
      let errorMessage = 'Failed to send message. Please try again.';
      if (error.response?.data?.message) {
        errorMessage = error.response.data.message;
      }

      toast({
        title: 'Send message failed',
        description: errorMessage,
        variant: 'destructive',
      });
    },
  });
};
