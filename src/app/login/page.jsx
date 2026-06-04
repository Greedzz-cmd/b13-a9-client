import LoginForm from "@/Components/LoginForm";

export const metadata = {
  title: "Login | docAppoint",
  description:
    "Sign in to docAppoint to manage your doctor bookings and patient profile.",
};

export default async function LoginPage({ searchParams }) {
  const params = await searchParams;
  const redirectTo =
    typeof params?.redirect === "string" && params.redirect.startsWith("/")
      ? params.redirect
      : "/";
  const authRequired = params?.auth === "required";

  return <LoginForm redirectTo={redirectTo} authRequired={authRequired} />;
}
