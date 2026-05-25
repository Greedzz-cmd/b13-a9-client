import DoctorCard from "@/Components/DoctorCard";
import { getDoctors } from "@/lib/doctors";

export default async function AllAppointmentsPage() {
  const doctors = await getDoctors();
  const specialtyCount = new Set(doctors.map((doctor) => doctor.specialty))
    .size;

  return (
    <main className="min-h-screen bg-[linear-gradient(180deg,#eff6ff_0%,#f8fafc_24%,#ffffff_100%)] px-4 py-12">
      <section className="mx-auto max-w-6xl">
        <div className="rounded-[2rem] border border-white/70 bg-white/95 px-6 py-8 shadow-[0_25px_80px_-40px_rgba(15,23,42,0.45)] backdrop-blur md:px-10 md:py-12">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl">
              <span className="inline-flex rounded-full bg-blue-100 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.24em] text-blue-950">
                All Appointments
              </span>
              <h1 className="mt-4 text-3xl font-black tracking-tight text-slate-950 md:text-5xl">
                Browse specialists, compare availability, and open full doctor
                details when you are signed in.
              </h1>
              <p className="mt-4 text-sm leading-7 text-slate-600 md:text-base">
                Every card shows the core information patients usually need
                first: specialty, fee, location, hospital, experience, and the
                next available time slot.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4 sm:max-w-sm">
              <div className="rounded-3xl border border-blue-100 bg-blue-50 p-5">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-500">
                  Doctors
                </p>
                <p className="mt-2 text-3xl font-black text-blue-950">
                  {doctors.length}
                </p>
              </div>
              <div className="rounded-3xl border border-emerald-100 bg-emerald-50 p-5">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-600">
                  Specialties
                </p>
                <p className="mt-2 text-3xl font-black text-emerald-700">
                  {specialtyCount}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {doctors.map((doctor) => (
            <DoctorCard key={doctor.id} doctor={doctor} />
          ))}
        </div>
      </section>
    </main>
  );
}
