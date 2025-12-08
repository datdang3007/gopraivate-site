
import { useNavigate } from 'react-router-dom';
import { toast } from '@/hooks/use-toast';

export interface LoginSuccessData {
  token: string;
  userId?: string;
  email: string;
  userInfo?: any;
}

export const useLoginSuccess = () => {
  const navigate = useNavigate();

  const handleLoginSuccess = async (data: LoginSuccessData) => {
    const { token, userId, email, userInfo } = data;

    console.log('🎉 [useLoginSuccess] Processing successful login:', {
      email,
      hasToken: !!token,
      hasUserId: !!userId
    });

    // Lưu vào localStorage
    localStorage.setItem('authToken', token);
    localStorage.setItem('userEmail', email);
    if (userId) {
      localStorage.setItem('userId', userId);
    }
    if (userInfo) {
      localStorage.setItem('userInfo', JSON.stringify(userInfo));
    }

    toast({
      heading: "Login Successful",
      description: "Welcome back!",
    });

    // Always redirect to index page
    navigate("/", { replace: true });
    
    console.log('✅ [useLoginSuccess] Login success processing completed!');
  };

  return { handleLoginSuccess };
};
