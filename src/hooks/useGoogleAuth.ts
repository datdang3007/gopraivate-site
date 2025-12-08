
import { useGoogleLogin } from '@react-oauth/google';
import { toast } from '@/hooks/use-toast';
import { AuthService } from '@/api/services/auth';
import { useLoginSuccess } from './useLoginSuccess';
import { getClientIP } from '@/api/utils/ip';

interface GoogleUser {
  email: string;
  name: string;
  picture: string;
  sub: string;
}

export const useGoogleAuth = () => {
  const { handleLoginSuccess } = useLoginSuccess();

  const googleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        console.log('🎯 [useGoogleAuth] Google login successful, token received');
        
        // Lấy thông tin user từ Google API
        const userInfoResponse = await fetch(
          `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokenResponse.access_token}`,
          {
            headers: {
              Authorization: `Bearer ${tokenResponse.access_token}`,
              Accept: 'application/json'
            }
          }
        );

        if (userInfoResponse.ok) {
          const userInfo: GoogleUser = await userInfoResponse.json();
          console.log('👤 [useGoogleAuth] User info retrieved:', {
            email: userInfo.email,
            name: userInfo.name
          });
          
          const clientIP = await getClientIP();
          
          // Chuẩn bị payload cho backend - sử dụng format tương tự AuthService.login
          const loginPayload = {
            email: userInfo.email,
            password: 'GOOGLE_AUTH',
            ip: clientIP,
            project_id: import.meta.env.VITE_PROJECT_ID || "",
            source: 'google',
            source_token: {
              access_token: tokenResponse.access_token,
              token_type: tokenResponse.token_type,
              expires_in: tokenResponse.expires_in,
              scope: tokenResponse.scope,
              user_info: userInfo
            }
          };

          console.log('🚀 [useGoogleAuth] Sending login request to backend');
          
          // Gửi đến backend API
          const response = await AuthService.login(loginPayload);
          
          console.log('📨 [useGoogleAuth] Backend response:', response);
          
          if (response.success && response.variables?.token) {
            await handleLoginSuccess({
              token: response.variables.token,
              userId: response.variables.user_id,
              email: userInfo.email,
              userInfo
            });
          } else {
            throw new Error(response.message || 'Google login failed at backend');
          }
        } else {
          throw new Error('Failed to get user info from Google');
        }
      } catch (error: any) {
        console.error('❌ [useGoogleAuth] Error:', error);
        toast({
          title: "Đăng nhập Google thất bại",
          description: error.message || 'Vui lòng thử lại.',
          variant: "destructive",
        });
      }
    },
    onError: (error) => {
      console.error('❌ [useGoogleAuth] Google login error:', error);
      toast({
        title: "Đăng nhập Google thất bại",
        description: 'Vui lòng thử lại.',
        variant: "destructive",
      });
    },
    flow: 'implicit'
  });

  return {
    mutate: googleLogin,
    isPending: false
  };
};
