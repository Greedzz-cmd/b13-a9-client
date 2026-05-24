// Server Component — fully SSR
import Link from "next/link";

const steps = [
  {
    number: "01",
    title: "Create your account",
    desc: "Sign up in seconds using your email or Google account. Your health profile is private and secure.",
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden>
        <circle cx="16" cy="11" r="5" stroke="white" strokeWidth="1.8" />
        <path
          d="M6 27c0-5.5 4.5-10 10-10s10 4.5 10 10"
          stroke="white"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  {
    number: "02",
    title: "Find your doctor",
    desc: "Browse specialists by specialty, location, or rating. Read real patient reviews to make the right choice.",
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden>
        <circle cx="15" cy="15" r="8" stroke="white" strokeWidth="1.8" />
        <path
          d="M21 21l5 5"
          stroke="white"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  {
    number: "03",
    title: "Book an appointment",
    desc: "Pick a date and time that suits you from the doctor's live availability. Instant confirmation guaranteed.",
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden>
        <rect
          x="5"
          y="7"
          width="22"
          height="20"
          rx="3"
          stroke="white"
          strokeWidth="1.8"
        />
        <path
          d="M11 7V4M21 7V4M5 14h22"
          stroke="white"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
        <path
          d="M11 20l3 3 7-7"
          stroke="white"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    number: "04",
    title: "Visit & get better",
    desc: "Attend your appointment, receive expert care, and leave a review to help other patients make informed decisions.",
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden>
        <path
          d="M16 6c-5.5 0-10 4.5-10 10s4.5 10 10 10 10-4.5 10-10S21.5 6 16 6z"
          stroke="white"
          strokeWidth="1.8"
        />
        <path
          d="M11 16l3.5 3.5L21 12"
          stroke="white"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
];

export default function HowItWorks() {
  return (
    <section className="py-20 px-4 bg-white">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="inline-block text-xs font-semibold text-blue-950 bg-blue-100 px-4 py-1.5 rounded-full tracking-widest uppercase mb-4">
            Simple Process
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight mb-4">
            How <span className="text-blue-950">docAppoint</span> works
          </h2>
          <p className="text-gray-500 text-sm max-w-md mx-auto leading-relaxed">
            From finding a doctor to attending your appointment — the entire
            process takes just a few minutes.
          </p>
        </div>

        {/* Steps */}
        <div className="relative">
          {/* Connector line — desktop only */}
          <div
            className="hidden lg:block absolute top-10 left-[12.5%] right-[12.5%] h-px bg-gradient-to-r from-blue-100 via-blue-950/30 to-blue-100 z-0"
            aria-hidden
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
            {steps.map((step, i) => (
              <div
                key={i}
                className="flex flex-col items-center text-center group"
              >
                {/* Icon circle */}
                <div className="w-20 h-20 rounded-full bg-blue-950 flex items-center justify-center mb-5 shadow-lg shadow-blue-950/25 group-hover:scale-105 transition-transform duration-300 relative">
                  {step.icon}
                  {/* Step number badge */}
                  <span className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-white border-2 border-blue-950 text-blue-950 text-[10px] font-extrabold flex items-center justify-center">
                    {i + 1}
                  </span>
                </div>

                <h3 className="text-base font-bold text-gray-900 mb-2">
                  {step.title}
                </h3>
                <p className="text-sm text-gray-500 leading-relaxed max-w-[200px]">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="mt-16 bg-blue-950 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-6 px-10 py-10">
          <div>
            <h3 className="text-xl font-extrabold text-white mb-1">
              Ready to get started?
            </h3>
            <p className="text-blue-300 text-sm">
              Book your first appointment in under 2 minutes.
            </p>
          </div>
          <Link
            href="/appointments"
            className="flex-shrink-0 inline-flex items-center gap-2 bg-white text-blue-950 font-bold px-8 py-3.5 rounded-full hover:bg-blue-50 transition-all hover:-translate-y-0.5 shadow-lg text-sm"
          >
            Book Appointment
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
