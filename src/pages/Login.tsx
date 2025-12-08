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
import { FcGoogle } from "react-icons/fc";
import { useGoogleAuth } from "@/hooks/useGoogleAuth";
import { Button } from "@/components/ui/button";

interface LoginFormData {
  email: string;
  password: string;
}

const Login: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const loginMutation = useLogin();
  const googleAuth = useGoogleAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<LoginFormData>({
    defaultValues: {
      email: "",
      password: "",
    },
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

    // If user manually navigated to login (not redirected from chat), clear any saved prompt
    if (!state?.promptToResend) {
      localStorage.removeItem("pendingChatPrompt");
    }

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
        hasPassword: !!state.password,
      });

      setValue("email", state.email, { shouldValidate: true });
      setValue("password", state.password, { shouldValidate: true });

      toast({
        title: "Registration Successful",
        description:
          "Your credentials have been filled in. Please click 'Sign in' to continue.",
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

  const handleGoogleLogin = () => {
    console.log('🔵 [Login] Google login button clicked');
    googleAuth.mutate();
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <Card className="shadow-lg">
          <CardHeader className="space-y-4">
            {/* Logo + Home link */}
            <div className="text-center mb-4">
              <div className="flex items-center justify-center">
                <a
                  href="/"
                  className="flex flex-col items-center space-y-2 hover:scale-105 transition-transform"
                >
                  <img
                    src="/gopraivate_v10.13.png"
                    alt="goprAIvate Logo"
                    className="h-32 w-32 rounded-full object-cover shadow-md border border-gray-200"
                  />
                </a>
              </div>
            </div>

            {/* <button
                onClick={() => navigate("/")}
                className="text-sm text-blue-600 hover:text-blue-500 underline"
              >
                ← Back to Home
              </button> */}

            <CardTitle className="text-2xl text-center m-0">Sign in</CardTitle>
            <CardDescription className="text-center">
              Enter your email and password to access your account
            </CardDescription>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              {/* Email */}
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

              {/* Password */}
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

            {/* Google Login */}
            <div className="mt-4">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-background px-2 text-muted-foreground">
                    Or continue with
                  </span>
                </div>
              </div>
              <Button
                type="button"
                variant="outline"
                className="w-full mt-4"
                onClick={handleGoogleLogin}
                disabled={googleAuth.isPending}
              >
                <FcGoogle className="mr-2 h-4 w-4" />
                {googleAuth.isPending ? 'Signing in...' : 'Sign in with Google'}
              </Button>
            </div>

            <div className="mt-4 text-center">
              <p className="text-sm text-gray-600">
                Don’t have an account?{" "}
                <button
                  onClick={() => navigate("/signup")}
                  className="font-medium text-blue-600 hover:text-blue-500 underline"
                >
                  Sign up
                </button>
              </p>
              <p className="text-sm text-gray-600 mt-2">
                Forgot your password?{" "}
                <button className="font-medium text-blue-600 hover:text-blue-500 underline">
                  Reset password
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
