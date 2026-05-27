import { redirect } from "next/navigation";

export const metadata = {
  title: "My Bookings | docAppoint",
  description: "Review and manage your doctor bookings on docAppoint.",
};

export default function DashboardBookingsRedirectPage() {
  redirect("/dashboard");
}
