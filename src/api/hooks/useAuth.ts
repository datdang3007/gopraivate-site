import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AuthService } from "../services/auth";
import { LoginRequest, RegisterRequest, User } from "../types/auth";
import { useNavigate } from "react-router-dom";
import { toast } from "@/hooks/use-toast";

export const AUTH_KEYS = {
  user: ["auth", "user"] as const,
  login: ["auth", "login"] as const,
  register: ["auth", "register"] as const,
};

/**
 * Login mutation hook
 */
export const useLogin = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: AUTH_KEYS.login,
    mutationFn: (data: LoginRequest) => AuthService.login(data),
    onSuccess: (response, variables) => {
      if (response.status === 200) {
        // Set user data in cache
        const user: User = { email: variables.email };
        queryClient.setQueryData(AUTH_KEYS.user, user);

        toast({
          title: "Login successful",
          description: "Welcome back!",
        });

        navigate("/");
      } else {
        throw new Error("Invalid credentials");
      }
    },
    onError: (error) => {
      console.error("Login error:", error);
      toast({
        title: "Login failed",
        description: "Please check your credentials and try again.",
        variant: "destructive",
      });
    },
  });
};

/**
 * Register mutation hook
 */
export const useRegister = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationKey: AUTH_KEYS.register,
    mutationFn: (data: RegisterRequest) => {
      console.log("🎯 [useRegister] Mutation started with data:", data);
      return AuthService.register(data);
    },
    onSuccess: (response: any) => {
      console.log("🎉 [useRegister] Success response:", response);

      if (response.status === 200 && response.data.success) {
        console.log(
          "✅ [useRegister] Registration successful, navigating to login",
        );

        toast({
          title: "Registration successful",
          description:
            "Your account has been created successfully! Please sign in to continue.",
        });

        navigate("/login");
      } else {
        console.warn("⚠️ [useRegister] Unexpected response format:", response);
        throw new Error("Registration failed - unexpected response format");
      }
    },
    onError: (error: any) => {
      console.error("💥 [useRegister] Registration error:", error);
      console.error(
        "💥 [useRegister] Error response data:",
        error.response?.data,
      );
      console.error("💥 [useRegister] Error status:", error.response?.status);

      let errorMessage = "Failed to create account. Please try again.";
      if (error.response?.data?.message) {
        errorMessage = error.response.data.message;
      } else if (error.response?.data) {
        errorMessage =
          typeof error.response.data === "string"
            ? error.response.data
            : JSON.stringify(error.response.data);
      } else if (error.message) {
        errorMessage = error.message;
      }

      console.error("💥 [useRegister] Final error message:", errorMessage);

      toast({
        title: "Registration failed",
        description: errorMessage,
        variant: "destructive",
      });
    },
  });
};

/**
 * Logout mutation hook
 */
export const useLogout = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => AuthService.logout(),
    onSuccess: () => {
      queryClient.clear();
      navigate("/login");

      toast({
        title: "Logged out",
        description: "You have been logged out successfully.",
      });
    },
  });
};

/**
 * Current user query hook
 */
export const useCurrentUser = () => {
  return useQuery({
    queryKey: AUTH_KEYS.user,
    queryFn: () => {
      const token = localStorage.getItem("authToken");
      if (!token) return null;

      // You can decode token or make API call to get user info
      // For now, return basic user info from localStorage
      const email = localStorage.getItem("userEmail");
      return email ? { email } : null;
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};
