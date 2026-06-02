import Link from "next/link";
import { headers } from "next/headers";
import { redirect, notFound } from "next/navigation";
import { Chip } from "@heroui/react";
import BookingForm from "@/Components/BookingForm";
import { auth } from "@/lib/auth";

export async function generateMetadata({ params }) {
  const { id } = await params;
  const token = await auth.api.getToken({ headers: await headers() });

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_SERVER}/doctors/${id}`,
    {
      headers: {
        authorization: `Bearer ${token.token}`,
      },
    },
  );
  const doctor = await res.json();

  if (!doctor) {
    return {
      title: "Book Appointment | docAppoint",
      description: "Book a doctor appointment on docAppoint.",
    };
  }

  return {
    title: `Book ${doctor.name} | docAppoint`,
    description: `Schedule an appointment with ${doctor.name} and save the booking securely on docAppoint.`,
  };
}

export default async function BookAppointmentPage({ params }) {
  const { id } = await params;
  const token = await auth.api.getToken({ headers: await headers() });

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_SERVER}/doctors/${id}`,
    {
      headers: {
        authorization: `Bearer ${token.token}`,
      },
    },
  );
  const doctor = await res.json();

  if (!doctor) {
    notFound();
  }

  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    redirect(
      `/login?redirect=${encodeURIComponent(`/doctors/${doctor._id}/book`)}`,
    );
  }

  return (
    <main className="min-h-screen bg-[linear-gradient(180deg,#eff6ff_0%,#f8fafc_20%,#ffffff_100%)] px-4 py-12">
      <div className="mx-auto max-w-5xl">
        <Link
          href={`/doctors/${doctor.id}`}
          className="mb-8 inline-flex items-center gap-2 text-sm font-semibold text-blue-950 transition hover:text-blue-700"
        >
          <span aria-hidden>{"<"}</span>
          Back to doctor details
        </Link>

        <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr]">
          <aside className="rounded-[2rem] border border-white/70 bg-slate-950 p-8 text-white shadow-[0_25px_80px_-40px_rgba(15,23,42,0.65)]">
            <Chip className="bg-blue-100 text-xs font-semibold uppercase tracking-[0.2em] text-blue-950">
              Booking Page
            </Chip>
            <h1 className="mt-5 text-3xl font-black tracking-tight">
              Confirm your appointment with {doctor.name}.
            </h1>
            <p className="mt-4 text-sm leading-7 text-slate-300">
              Fill in the patient details, choose a date, and select an
              available time. Once submitted, the appointment will be stored in
              MongoDB and confirmed with a success toast.
            </p>

            <div className="mt-8 space-y-4">
              <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
                <p className="text-xs uppercase tracking-[0.2em] text-slate-400">
                  Specialty
                </p>
                <p className="mt-2 text-base font-semibold text-slate-100">
                  {doctor.specialty}
                </p>
              </div>
              <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
                <p className="text-xs uppercase tracking-[0.2em] text-slate-400">
                  Hospital
                </p>
                <p className="mt-2 text-base font-semibold text-slate-100">
                  {doctor.hospital}
                </p>
              </div>
              <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
                <p className="text-xs uppercase tracking-[0.2em] text-slate-400">
                  Available Blocks
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {doctor.availability.map((slot) => (
                    <span
                      key={slot}
                      className="rounded-full border border-white/10 bg-white/10 px-3 py-1.5 text-xs font-medium text-slate-100"
                    >
                      {slot}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </aside>

          <section className="rounded-[2rem] border border-white/70 bg-white/95 p-8 shadow-[0_25px_80px_-40px_rgba(15,23,42,0.45)] backdrop-blur">
            <div className="mb-8">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-blue-500">
                Appointment Form
              </p>
              <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-950">
                Save booking information for {doctor.name}
              </h2>
              <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-600">
                The required patient and schedule fields are pre-arranged to
                keep the booking flow fast while still collecting useful
                information for the appointment.
              </p>
            </div>

            <BookingForm doctor={doctor} user={session.user} />
          </section>
        </div>
      </div>
    </main>
  );
}
