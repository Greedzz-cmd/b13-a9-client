import Link from "next/link";
import DoctorCard from "./DoctorCard";

export default async function TopRatedDoctors() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_SERVER}/doctors`);
  const doctors = await res.json();
  const topDoctors = doctors
    .filter((doctor) => doctor.rating >= 4.8)
    .sort(
      (firstDoctor, secondDoctor) => secondDoctor.rating - firstDoctor.rating,
    )
    .slice(0, 3);

  return (
    <section className="bg-slate-50 px-4 py-20">
      <div className="mx-auto max-w-6xl">
        <div className="mb-14 text-center">
          <span className="mb-4 inline-block rounded-full bg-blue-100 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-blue-950">
            Our Experts
          </span>
          <h2 className="mb-4 text-3xl font-extrabold tracking-tight text-gray-900 md:text-4xl">
            Top Rated <span className="text-blue-950">Doctors</span>
          </h2>
          <p className="mx-auto max-w-md text-sm leading-relaxed text-gray-500">
            Trusted by thousands of patients across Dhaka and curated down to
            the three highest-rated specialists.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {topDoctors.map((doctor) => (
            <DoctorCard key={doctor.id} doctor={doctor} />
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link
            href="/all-appointments"
            className="inline-flex items-center gap-2 rounded-full border-2 border-blue-950 bg-blue-950 px-8 py-3 font-semibold text-white transition-all duration-200 hover:bg-blue-900"
          >
            View All Doctors
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              aria-hidden
            >
              <path
                d="M3 8h10M9 4l4 4-4 4"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
