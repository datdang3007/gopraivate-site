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

  // Auto-fill and auto-login if coming from registration
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
    
    if (state?.email && state?.password && !loginMutation.isPending) {
      console.log("🔄 [Login] Auto-filling credentials from registration", {
        email: state.email,
        hasPassword: !!state.password
      });
      
      // Fill the form immediately
      setValue("email", state.email, { shouldValidate: false });
      setValue("password", state.password, { shouldValidate: false });
      
      // Auto-login after form is filled
      const timer = setTimeout(() => {
        console.log("🚀 [Login] Auto-logging in...");
        loginMutation.mutate({
          email: state.email,
          password: state.password,
        });
      }, 300);

      return () => clearTimeout(timer);
    }
  }, [location.state, setValue, loginMutation.isPending]);

  const onSubmit = async (data: LoginFormData) => {
    loginMutation.mutate({
      email: data.email,
      password: data.password,
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
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
  );
};

export default Login;
