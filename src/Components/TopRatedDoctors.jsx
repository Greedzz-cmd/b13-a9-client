import Link from "next/link";
import DoctorCard from "./DoctorCard";

async function getTopDoctors() {
  const res = await fetch("http://localhost:4000/doctors");
  return res.json();
}

export default async function TopRatedDoctors() {
  const doctors = await getTopDoctors();
  const topDoctors = doctors.filter((doctor) => doctor.rating >= 4.8);
  const isLoggedIn = false;

  return (
    <section className="py-20 px-4 bg-white">
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-14">
          <span className="inline-block text-xs font-semibold text-blue-950 bg-blue-100 px-4 py-1.5 rounded-full tracking-widest uppercase mb-4">
            Our Experts
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight mb-4">
            Top Rated <span className="text-blue-950">Doctors</span>
          </h2>
          <p className="text-gray-500 text-sm max-w-md mx-auto leading-relaxed">
            Trusted by thousands of patients across Dhaka — meet our
            highest-rated specialists.
          </p>
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {topDoctors.map((doctor) => (
            <DoctorCard
              key={doctor.id}
              doctor={doctor}
              isLoggedIn={isLoggedIn}
            />
          ))}
        </div>

        {/* View all CTA */}
        <div className="text-center mt-12">
          <Link
            href="/appointments"
            className="inline-flex items-center gap-2 border-2 border-blue-950 text-blue-950 font-semibold px-8 py-3 rounded-full hover:bg-blue-950 hover:text-white transition-all duration-200"
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
