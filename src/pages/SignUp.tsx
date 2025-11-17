import React, { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import ReCAPTCHA from "react-google-recaptcha";
import { useRegister } from "@/api/hooks/useAuth";
import { LoadingButton } from "@/components/ui/loading-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Eye, EyeOff } from "lucide-react";

interface SignUpFormData {
  email: string;
  password: string;
  confirmPassword: string;
}

const SignUp: React.FC = () => {
  const navigate = useNavigate();
  const recaptchaRef = useRef<ReCAPTCHA>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [emailValidationError, setEmailValidationError] = useState<string>("");
  const registerMutation = useRegister();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<SignUpFormData>();

  const password = watch("password");

  const onSubmit = async (data: SignUpFormData) => {
    console.log("🔥 [SignUp] Form submitted with data:", data);

    // Check if there's an email validation error
    if (emailValidationError) {
      console.log(
        "🚫 [SignUp] Form submission blocked due to email validation error",
      );
      return;
    }

    // Clear any previous email validation error
    setEmailValidationError("");

    // Validate reCAPTCHA
    const recaptchaValue = recaptchaRef.current?.getValue();
    console.log("🔑 [SignUp] reCAPTCHA value:", recaptchaValue);

    // if (!recaptchaValue) {
    //   toast({
    //     title: "Error",
    //     description: "Please complete the reCAPTCHA verification.",
    //     variant: "destructive",
    //   });
    //   return;
    // }

    console.log("🚀 [SignUp] Calling registerMutation with payload:", {
      email: data.email,
      password: data.password,
      recaptchaToken: recaptchaValue || "",
    });

    // Call registration API using React Query
    registerMutation.mutate(
      {
        email: data.email,
        password: data.password,
        recaptchaToken: recaptchaValue || "",
      },
      {
        onSuccess: (res) => {
          console.log("🎉 [SignUp] API call successful with response:", res);
          // Check for specific "user exists already" error
          if (
            res?.success === false &&
            res?.message === "user exists already, reset password"
          ) {
            setEmailValidationError(
              "Account already exists, please reset password",
            );
            return; // Don't show toast for this specific error
          }
        },
        onSettled: () => {
          console.log("🏁 [SignUp] API call settled");
          // Reset reCAPTCHA after API call (success or error)
          recaptchaRef.current?.reset();
        },
      },
    );
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <Card>
          <CardHeader className="space-y-1">
            <div className="text-center mb-4">
              <div className="flex items-center justify-center">
                <a
                  href="/"
                  className="flex flex-col items-center space-y-2 hover:scale-105 transition-transform"
                >
                  <img
                    src="/gopraivate_v10.12.png"
                    alt="goprAIvate Logo"
                    className="h-32 w-32 rounded-full object-cover shadow-md border border-gray-200"
                  />
                </a>
              </div>
            </div>

            <CardTitle className="text-2xl text-center">
              Create account
            </CardTitle>
            <CardDescription className="text-center">
              Enter your information to create a new account
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
                    onChange: () => {
                      // Clear email validation error when user types
                      if (emailValidationError) {
                        setEmailValidationError("");
                      }
                    },
                  })}
                  className={emailValidationError ? "border-red-500" : ""}
                />
                {errors.email && (
                  <p className="text-sm text-red-600">{errors.email.message}</p>
                )}
                {emailValidationError && (
                  <p className="text-sm text-red-600">{emailValidationError}</p>
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

              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <div className="relative">
                  <Input
                    id="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirm your password"
                    {...register("confirmPassword", {
                      required: "Please confirm your password",
                      validate: (value) =>
                        value === password || "Passwords do not match",
                    })}
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="h-4 w-4 text-gray-400" />
                    ) : (
                      <Eye className="h-4 w-4 text-gray-400" />
                    )}
                  </button>
                </div>
                {errors.confirmPassword && (
                  <p className="text-sm text-red-600">
                    {errors.confirmPassword.message}
                  </p>
                )}
              </div>
              {/*
              <div className="space-y-2 flex justify-center">
                <ReCAPTCHA
                  ref={recaptchaRef}
                  sitekey={import.meta.env.VITE_RECAPTCHA_SITE_KEY}
                  onChange={(value) => {
                    console.log("reCAPTCHA value:", value);
                  }}
                  onExpired={() => {
                    console.log("reCAPTCHA expired");
                    recaptchaRef.current?.reset();
                  }}
                />
              </div> */}

              <LoadingButton
                type="submit"
                className="w-full"
                loading={registerMutation.isPending}
                loadingText="Creating account..."
              >
                Create account
              </LoadingButton>
            </form>

            <div className="mt-4 text-center">
              <p className="text-sm text-gray-600">
                Already have an account?{" "}
                <button
                  onClick={() => navigate("/login")}
                  className="font-medium text-blue-600 hover:text-blue-500 underline"
                >
                  Sign in
                </button>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SignUp;