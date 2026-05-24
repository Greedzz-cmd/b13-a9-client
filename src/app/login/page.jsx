"use client";

import Link from "next/link";
import {
  Form,
  TextField,
  Label,
  Input,
  FieldError,
  Button,
} from "@heroui/react";
import { signIn } from "@/lib/auth-client";

export default function LoginForm() {
  async function handleSubmit(e) {
    e.preventDefault();
    const formData = Object.fromEntries(new FormData(e.currentTarget));

    const { data, error } = await signIn.email({
      email: formData.email,
      password: formData.password,
      callbackURL: "/",
    });
  }

  async function handleGoogle() {
    // await signIn.social({ provider: "google", callbackURL: "/" })
  }

  return (
    <main className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-xl shadow-gray-100 border border-gray-100 p-8 md:p-10">
          {/* Header */}
          <div className="text-center mb-8">
            <Link href="/" className="inline-flex items-center gap-2 mb-6">
              <div className="w-9 h-9 rounded-full bg-blue-950 flex items-center justify-center">
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
              <span className="text-lg font-bold text-gray-900 tracking-tight">
                <span className="text-blue-400">doc</span>Appoint
              </span>
            </Link>
            <h1 className="text-2xl font-extrabold text-gray-900 tracking-tight">
              Welcome back
            </h1>
            <p className="text-sm text-gray-500 mt-1">
              Sign in to manage your appointments
            </p>
          </div>

          <Form onSubmit={handleSubmit} className="flex flex-col gap-4">
            {/* Email */}
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
                placeholder="you@example.com"
                className="mt-1 w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm text-gray-900 outline-none focus:border-blue-950 hover:border-gray-400 transition-colors"
              />
              <FieldError className="text-xs text-red-500 mt-1" />
            </TextField>

            {/* Password */}
            <TextField
              isRequired
              name="password"
              type="password"
              validate={(value) => {
                if (!value) return "Password is required";
                return null;
              }}
            >
              <div className="flex items-center justify-between">
                <Label className="text-sm font-medium text-gray-700">
                  Password
                </Label>
              </div>
              <Input
                placeholder="Enter your password"
                className="mt-1 w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm text-gray-900 outline-none focus:border-blue-950 hover:border-gray-400 transition-colors"
              />
              <FieldError className="text-xs text-red-500 mt-1" />
            </TextField>

            {/* Submit */}
            <Button
              type="submit"
              className="w-full bg-blue-950 text-white font-semibold rounded-full py-3 text-sm hover:bg-blue-900 transition-all mt-2"
            >
              Login
            </Button>
          </Form>

          {/* Divider */}
          <div className="flex items-center gap-3 my-5">
            <div className="flex-1 h-px bg-gray-100" />
            <span className="text-xs text-gray-400">or continue with</span>
            <div className="flex-1 h-px bg-gray-100" />
          </div>

          {/* Google */}
          <button
            type="button"
            onClick={handleGoogle}
            className="w-full flex items-center justify-center gap-3 bg-white border border-gray-300 rounded-full py-3 px-4 shadow-sm hover:shadow-md hover:border-gray-400 transition-all duration-200 active:scale-[0.98]"
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
              className="text-sm font-medium text-gray-700 tracking-wide"
            >
              Sign in with Google
            </span>
          </button>

          {/* Register link */}
          <p className="text-center text-sm text-gray-500 mt-6">
            Don&apos;t have an account?{" "}
            <Link
              href="/register"
              className="text-blue-950 font-semibold hover:underline"
            >
              Register
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}
