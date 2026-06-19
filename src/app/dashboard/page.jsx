import Link from "next/link";
import { headers } from "next/headers";
import DashboardAppointments from "@/Components/DashboardAppointments";
import DashboardProfile from "@/Components/DashboardProfile";
import { auth } from "@/lib/auth";
import { getAppointmentsByUserEmail } from "@/lib/appointments";

export const metadata = {
  title: "Dashboard | docAppoint",
  description:
    "Manage your booked appointments and update your docAppoint patient profile.",
};

export default async function DashboardPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const appointments = await getAppointmentsByUserEmail(session.user.email);

  return (
    <main className="min-h-screen bg-[linear-gradient(180deg,#eff6ff_0%,#f8fafc_24%,#ffffff_100%)] px-4 py-10 sm:px-6 lg:px-8">
      <section className="mx-auto max-w-6xl">
        <div className="rounded-[2rem] border border-white/70 bg-white/95 px-6 py-8 shadow-[0_25px_80px_-40px_rgba(15,23,42,0.45)] backdrop-blur md:px-10 md:py-12">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl">
              <span className="inline-flex rounded-full bg-blue-100 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.24em] text-blue-950">
                Dashboard
              </span>
              <h1 className="mt-4 text-3xl font-black tracking-tight text-slate-950 md:text-5xl">
                Manage your booked appointments without leaving the page.
              </h1>
              <p className="mt-4 text-sm leading-7 text-slate-600 md:text-base">
                Review your appointment details, open the edit modal for quick
                corrections, or remove bookings you no longer need.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <Link
                href="/all-appointments"
                className="inline-flex w-full justify-center rounded-full bg-blue-950 px-6 py-3 text-sm font-semibold text-white transition hover:bg-blue-900 sm:w-auto"
              >
                Book Another Doctor
              </Link>
              <div className="inline-flex w-full justify-center rounded-full border border-slate-200 bg-slate-50 px-6 py-3 text-sm font-semibold text-slate-600 sm:w-auto">
                Signed in as {session.user.email}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10 grid gap-8 md:grid-cols-[1.15fr_0.85fr]">
          <DashboardProfile initialUser={session.user} />
          <DashboardAppointments initialAppointments={appointments} />
        </div>
      </section>
    </main>
  );
}
