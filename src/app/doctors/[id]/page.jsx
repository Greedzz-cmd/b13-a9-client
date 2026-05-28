import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Button, Chip } from "@heroui/react";
import { getDoctorById } from "@/lib/fetchFunctions";

function DetailTile({ label, value, tone = "slate" }) {
  const styles = {
    slate: "border-slate-200 bg-slate-50",
    blue: "border-blue-100 bg-blue-50",
    emerald: "border-emerald-100 bg-emerald-50",
  };

  return (
    <div className={`rounded-3xl border p-5 ${styles[tone]}`}>
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
        {label}
      </p>
      <p className="mt-2 text-sm font-semibold text-slate-800">{value}</p>
    </div>
  );
}

export async function generateMetadata({ params }) {
  const { id } = await params;
  const doctor = await getDoctorById(id);

  if (!doctor) {
    return {
      title: "Doctor Not Found | docAppoint",
      description: "The requested doctor could not be found on docAppoint.",
    };
  }

  return {
    title: `${doctor.name} | docAppoint`,
    description: `${doctor.name} is a ${doctor.specialty} at ${doctor.hospital}. Review availability, consultation fee, and book an appointment on docAppoint.`,
  };
}

export default async function DoctorDetailsPage({ params }) {
  const { id } = await params;
  const doctor = await getDoctorById(id);

  if (!doctor) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-[linear-gradient(180deg,#eff6ff_0%,#f8fafc_30%,#ffffff_100%)] px-4 py-12">
      <div className="mx-auto max-w-6xl">
        <Link
          href="/all-appointments"
          className="mb-8 inline-flex items-center gap-2 text-sm font-semibold text-blue-950 transition hover:text-blue-700"
        >
          <span aria-hidden>{"<"}</span>
          Back to all appointments
        </Link>

        <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
          <section className="rounded-[2rem] border border-white/70 bg-white/95 p-8 shadow-[0_25px_80px_-40px_rgba(15,23,42,0.45)] backdrop-blur">
            <div className="mb-6 flex flex-wrap items-center gap-3">
              <Chip className="bg-blue-100 text-xs font-semibold uppercase tracking-[0.2em] text-blue-950">
                {doctor.specialty}
              </Chip>
              <Chip className="bg-emerald-100 text-xs font-semibold uppercase tracking-[0.2em] text-emerald-700">
                {doctor.rating} / 5 rating
              </Chip>
            </div>

            <h1 className="text-3xl font-black tracking-tight text-slate-950 md:text-5xl">
              {doctor.name}
            </h1>
            <p className="mt-3 max-w-2xl text-base leading-7 text-slate-600">
              {doctor.description}
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <DetailTile
                label="Hospital"
                value={doctor.hospital}
                tone="blue"
              />
              <DetailTile
                label="Location"
                value={doctor.location}
                tone="slate"
              />
              <DetailTile
                label="Experience"
                value={doctor.experience}
                tone="emerald"
              />
              <DetailTile
                label="Consultation Fee"
                value={`BDT ${doctor.fee}`}
                tone="blue"
              />
            </div>

            <div className="mt-8 rounded-[2rem] border border-slate-200 bg-slate-50 p-6">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
                Available Slots
              </p>
              <div className="mt-4 flex flex-wrap gap-3">
                {doctor.availability.map((slot) => (
                  <span
                    key={slot}
                    className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700"
                  >
                    {slot}
                  </span>
                ))}
              </div>
            </div>
          </section>

          <aside className="rounded-[2rem] border border-white/70 bg-slate-950 p-8 text-white shadow-[0_25px_80px_-40px_rgba(15,23,42,0.65)]">
            <div className="mx-auto w-fit rounded-full bg-white/10 p-2">
              <Image
                src={doctor.image}
                alt={doctor.name}
                width={156}
                height={156}
                unoptimized
                className="rounded-full object-cover"
              />
            </div>

            <div className="mt-6 text-center">
              <p className="text-sm uppercase tracking-[0.28em] text-blue-200">
                Doctor Profile
              </p>
              <h2 className="mt-2 text-2xl font-bold">{doctor.name}</h2>
              <p className="mt-2 text-sm leading-6 text-slate-300">
                {doctor.reviews} patient reviews and a {doctor.rating} star
                average make this a dependable choice for your next visit.
              </p>
            </div>

            <div className="mt-8 space-y-4">
              <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
                <p className="text-xs uppercase tracking-[0.2em] text-slate-400">
                  Best For
                </p>
                <p className="mt-2 text-sm font-medium text-slate-100">
                  Patients looking for verified specialists, clear availability,
                  and premium care in Dhaka.
                </p>
              </div>
              <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
                <p className="text-xs uppercase tracking-[0.2em] text-slate-400">
                  Next Step
                </p>
                <p className="mt-2 text-sm font-medium text-slate-100">
                  Review the available slots, compare the fee, and continue to
                  book when scheduling is ready.
                </p>
              </div>
            </div>
            <Link href={`/doctors/${doctor.id}/book`}>
              <Button className="mt-8 w-full rounded-full bg-white px-6 py-3 text-sm font-semibold text-slate-950 transition-all hover:-translate-y-0.5 ">
                Book Appointment
              </Button>
            </Link>
            <Link href="/all-appointments">
              <Button
                variant="bordered"
                className="mt-3 w-full rounded-full border-white/20 bg-transparent px-6 py-3 text-sm font-semibold text-white transition-all hover:-translate-y-0.5"
              >
                Browse More Doctors
              </Button>
            </Link>
          </aside>
        </div>
      </div>
    </main>
  );
}
