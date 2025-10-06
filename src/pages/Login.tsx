import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useLogin } from "@/api/hooks/useAuth";
import { LoadingButton } from "@/components/ui/loading-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Eye, EyeOff } from "lucide-react";

interface LoginFormData {
  email: string;
  password: string;
}

const Login: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const loginMutation = useLogin();
  const navigate = useNavigate();
  const location = useLocation();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<LoginFormData>({
    defaultValues: {
      email: '',
      password: ''
    }
  });

  // Auto-fill credentials if coming from registration
  useEffect(() => {
    const state = location.state as { 
      email?: string; 
      password?: string; 
      redirectTo?: string; 
      message?: string; 
      promptToResend?: string;
    } | null;
    
    // Show message if redirected from unauthorized access
    if (state?.message) {
      toast({
        title: "Authentication Required",
        description: state.message,
        variant: "default",
      });
    }
    
    // Only auto-fill form, no auto-login
    if (state?.email && state?.password) {
      console.log("🔄 [Login] Auto-filling credentials from registration", {
        email: state.email,
        hasPassword: !!state.password
      });
      
      // Fill the form immediately
      setValue("email", state.email, { shouldValidate: true });
      setValue("password", state.password, { shouldValidate: true });
      
      // Show success message for auto-fill
      toast({
        title: "Registration Successful",
        description: "Your credentials have been filled in. Please click 'Sign in' to continue.",
        variant: "default",
      });
    }
  }, [location.state, setValue]);

  const onSubmit = async (data: LoginFormData) => {
    loginMutation.mutate({
      email: data.email,
      password: data.password,
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      {/* Top Header */}
      <div className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-sm border-b border-gray-200 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <a className="flex items-center space-x-2 hover:opacity-80 transition-opacity" href="/">
              <img
                src="/gopraivate_v10.12.png"
                alt="goprAIvate Logo"
                className="h-8 w-8"
              />
              <span className="font-bold text-lg text-gray-900">goprAIvate</span>
            </a>
            <button
              onClick={() => navigate("/")}
              className="text-sm text-gray-600 hover:text-gray-900 flex items-center space-x-1 transition-colors"
            >
              <span>←</span>
              <span>Home</span>
            </button>
          </div>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="pt-24 flex items-center justify-center">
        <div className="max-w-md w-full">
          <Card>
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl text-center">Sign in</CardTitle>
            <CardDescription className="text-center">
              Enter your email and password to access your account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Invalid email address",
                    },
                  })}
                />
                {errors.email && (
                  <p className="text-sm text-red-600">{errors.email.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    {...register("password", {
                      required: "Password is required",
                      minLength: {
                        value: 6,
                        message: "Password must be at least 6 characters",
                      },
                    })}
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4 text-gray-400" />
                    ) : (
                      <Eye className="h-4 w-4 text-gray-400" />
                    )}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-sm text-red-600">
                    {errors.password.message}
                  </p>
                )}
              </div>

              <LoadingButton
                type="submit"
                className="w-full"
                loading={loginMutation.isPending}
                loadingText="Signing in..."
              >
                Sign in
              </LoadingButton>
            </form>

            <div className="mt-4 text-center">
              <p className="text-sm text-gray-600">
                Don't have an account?{" "}
                <button
                  onClick={() => navigate("/signup")}
                  className="font-medium text-blue-600 hover:text-blue-500 underline"
                >
                  Sign up
                </button>
              </p>
            </div>
          </CardContent>
        </Card>
        </div>
      </div>
    </div>
  );
};

export default Login;
