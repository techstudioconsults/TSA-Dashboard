"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
  Input,
  TsaButton,
} from "@strategic-dot/components";
import { Eye, EyeOff, Loader } from "lucide-react";
import { FC, useState } from "react";
import { useForm } from "react-hook-form";

import { signInFormData, signInSchema } from "~/schemas";
import { useAuthStore } from "~/stores/authStore";

const LoginForm: FC = () => {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const login = useAuthStore((state) => state.login);

  const formMethods = useForm<signInFormData>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const {
    handleSubmit,
    formState: { errors },
    control,
    reset,
  } = formMethods;

  const onSubmit = async (data: signInFormData) => {
    setIsSubmitting(true);
    try {
      await login(data.email, data.password);
      // Optionally show a success message or navigate to a new page
      reset();
    } catch (error) {
      console.error("Login failed:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto flex w-10/12 items-center justify-center lg:min-h-screen">
      <div className="w-full space-y-8 rounded-lg p-8">
        <div>
          <h2 className="text-center text-xl font-bold xl:text-2xl">
            Welcome back
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Please sign in to your account
          </p>
        </div>

        <Form {...formMethods}>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Email */}
            <FormField
              name="email"
              control={control}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="Email Address"
                      {...field}
                      className="w-full rounded-md border px-4 py-2"
                    />
                  </FormControl>
                  {errors.email && (
                    <FormMessage>{errors.email?.message}</FormMessage>
                  )}
                </FormItem>
              )}
            />

            {/* Password */}
            <FormField
              name="password"
              control={control}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="relative">
                      <Input
                        type={showPassword ? "text" : "password"}
                        placeholder="Password"
                        {...field}
                        className="w-full rounded-md border px-4 py-2"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2"
                      >
                        {showPassword ? (
                          <EyeOff className="h-4 w-4 text-gray-500" />
                        ) : (
                          <Eye className="h-4 w-4 text-gray-500" />
                        )}
                      </button>
                    </div>
                  </FormControl>
                  {errors.password && (
                    <FormMessage>{errors.password?.message}</FormMessage>
                  )}
                </FormItem>
              )}
            />

            <div className="flex items-center justify-between">
              <div className="text-sm">
                <a
                  href="#"
                  className="font-medium text-blue-600 hover:text-blue-500"
                >
                  Forgot your password?
                </a>
              </div>
            </div>

            <TsaButton
              type="submit"
              variant="primary"
              isDisabled={isSubmitting}
              className="w-full bg-mid-blue"
            >
              {isSubmitting ? (
                <Loader className="animate-spin text-white" />
              ) : (
                "Sign in"
              )}
            </TsaButton>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default LoginForm;
