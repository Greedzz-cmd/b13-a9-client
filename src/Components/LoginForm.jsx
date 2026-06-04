"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useTransition } from "react";
import {
  Form,
  TextField,
  Label,
  Input,
  FieldError,
  Button,
  toast,
} from "@heroui/react";
import { signIn } from "@/lib/auth-client";

export default function LoginForm({ redirectTo = "/", authRequired = false }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    if (authRequired) {
      toast.danger("Please log in first to access that page.");
    }
  }, [authRequired]);

  function handleSubmit(event) {
    event.preventDefault();
    const formData = Object.fromEntries(new FormData(event.currentTarget));

    startTransition(async () => {
      try {
        const { error } = await signIn.email({
          email: formData.email,
          password: formData.password,
        });

        if (error) {
          toast.danger(error.message || "Login failed");
          return;
        }

        toast.success("Logged in successfully!");
        router.replace(redirectTo);
        router.refresh();
      } catch (error) {
        toast.danger(error.message || "Login failed");
      }
    });
  }

  function handleGoogle() {
    startTransition(async () => {
      try {
        const { error } = await signIn.social({
          provider: "google",
          callbackURL: redirectTo,
        });

        if (error) {
          toast.danger(
            error.message || "Google sign-in is not configured yet.",
          );
        }
      } catch (error) {
        toast.danger(error.message || "Google sign-in is not configured yet.");
      }
    });
  }

  function handleForgotPassword() {
    toast.success("Password reset is disabled for the assignment review.");
  }

  return (
    <main className="min-h-screen bg-gray-50 px-4 py-12">
      <div className="mx-auto flex min-h-[calc(100vh-12rem)] w-full max-w-md items-center">
        <div className="w-full rounded-2xl border border-gray-100 bg-white p-8 shadow-xl shadow-gray-100 md:p-10">
          <div className="mb-8 text-center">
            <Link href="/" className="mb-6 inline-flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-950">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 72 72"
                  fill="none"
                  aria-hidden
                >
                  <rect
                    x="20"
                    y="26"
                    width="32"
                    height="33"
                    rx="3"
                    fill="white"
                  />
                  <rect
                    x="27"
                    y="22"
                    width="14"
                    height="8"
                    rx="3"
                    fill="white"
                    stroke="#172554"
                    strokeWidth="1.5"
                  />
                  <rect
                    x="30"
                    y="20"
                    width="8"
                    height="5"
                    rx="2"
                    fill="#172554"
                  />
                  <circle cx="52" cy="58" r="10" fill="#00C98D" />
                  <polyline
                    points="47,58 50.5,61.5 57,54"
                    fill="none"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <span className="text-lg font-bold tracking-tight text-gray-900">
                <span className="text-blue-400">doc</span>Appoint
              </span>
            </Link>
            <h1 className="text-2xl font-extrabold tracking-tight text-gray-900">
              Login
            </h1>
            <p className="mt-1 text-sm text-gray-500">
              Sign in to manage your appointments
            </p>
          </div>

          <Form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <TextField
              isRequired
              name="email"
              type="email"
              validate={(value) => {
                if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
                  return "Please enter a valid email address";
                }

                return null;
              }}
            >
              <Label className="text-sm font-medium text-gray-700">
                Email Address
              </Label>
              <Input
                placeholder="Enter your email"
                className="mt-1 w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm text-gray-900 outline-none transition-colors hover:border-gray-400 focus:border-blue-950"
              />
              <FieldError className="mt-1 text-xs text-red-500" />
            </TextField>

            <TextField
              isRequired
              name="password"
              type="password"
              validate={(value) => {
                if (!value) {
                  return "Password is required";
                }

                return null;
              }}
            >
              <div className="flex items-center justify-between">
                <Label className="text-sm font-medium text-gray-700">
                  Password
                </Label>
                <button
                  type="button"
                  onClick={handleForgotPassword}
                  className="text-xs font-semibold text-blue-950 transition hover:text-blue-700"
                >
                  Forgot Password
                </button>
              </div>
              <Input
                placeholder="Enter your password"
                className="mt-1 w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm text-gray-900 outline-none transition-colors hover:border-gray-400 focus:border-blue-950"
              />
              <FieldError className="mt-1 text-xs text-red-500" />
            </TextField>

            <Button
              type="submit"
              isLoading={isPending}
              className="mt-2 w-full rounded-full bg-blue-950 py-3 text-sm font-semibold text-white transition-all hover:bg-blue-900"
            >
              Login
            </Button>
          </Form>

          <div className="my-5 flex items-center gap-3">
            <div className="h-px flex-1 bg-gray-100" />
            <span className="text-xs text-gray-400">or continue with</span>
            <div className="h-px flex-1 bg-gray-100" />
          </div>

          <button
            type="button"
            onClick={handleGoogle}
            disabled={isPending}
            className="flex w-full items-center justify-center gap-3 rounded-full border border-gray-300 bg-white px-4 py-3 shadow-sm transition-all duration-200 hover:border-gray-400 hover:shadow-md disabled:cursor-not-allowed disabled:opacity-70"
          >
            <svg width="20" height="20" viewBox="0 0 48 48" aria-hidden>
              <path
                fill="#EA4335"
                d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"
              />
              <path
                fill="#4285F4"
                d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"
              />
              <path
                fill="#FBBC05"
                d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"
              />
              <path
                fill="#34A853"
                d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"
              />
            </svg>
            <span
              style={{ fontFamily: "'Google Sans', Roboto, sans-serif" }}
              className="text-sm font-medium tracking-wide text-gray-700"
            >
              Sign in with Google
            </span>
          </button>

          <p className="mt-6 text-center text-sm text-gray-500">
            Don&apos;t have an account?{" "}
            <Link
              href="/register"
              className="font-semibold text-blue-950 hover:underline"
            >
              Register
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}
