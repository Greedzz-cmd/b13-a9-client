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
    title: "Visit and get better",
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
    <section className="bg-white px-4 py-20">
      <div className="mx-auto max-w-6xl">
        <div className="mb-16 text-center">
          <span className="mb-4 inline-block rounded-full bg-blue-100 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-blue-950">
            Simple Process
          </span>
          <h2 className="mb-4 text-3xl font-extrabold tracking-tight text-gray-900 md:text-4xl">
            How <span className="text-blue-950">docAppoint</span> works
          </h2>
          <p className="mx-auto max-w-md text-sm leading-relaxed text-gray-500">
            From finding a doctor to attending your appointment, the entire
            process takes just a few minutes.
          </p>
        </div>

        <div className="relative">
          <div
            className="absolute left-[12.5%] right-[12.5%] top-10 z-0 hidden h-px bg-gradient-to-r from-blue-100 via-blue-950/30 to-blue-100 lg:block"
            aria-hidden
          />

          <div className="relative z-10 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((step, index) => (
              <div
                key={step.number}
                className="group flex flex-col items-center text-center"
              >
                <div className="relative mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-blue-950 shadow-lg shadow-blue-950/25 transition-transform duration-300 group-hover:scale-105">
                  {step.icon}
                  <span className="absolute -right-1 -top-1 flex h-6 w-6 items-center justify-center rounded-full border-2 border-blue-950 bg-white text-[10px] font-extrabold text-blue-950">
                    {index + 1}
                  </span>
                </div>

                <h3 className="mb-2 text-base font-bold text-gray-900">
                  {step.title}
                </h3>
                <p className="max-w-[200px] text-sm leading-relaxed text-gray-500">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16 flex flex-col items-center justify-between gap-6 rounded-2xl bg-blue-950 px-10 py-10 md:flex-row">
          <div>
            <h3 className="mb-1 text-xl font-extrabold text-white">
              Ready to get started?
            </h3>
            <p className="text-sm text-blue-300">
              Book your first appointment in under 2 minutes.
            </p>
          </div>
          <Link
            href="/all-appointments"
            className="inline-flex flex-shrink-0 items-center gap-2 rounded-full bg-white px-8 py-3.5 text-sm font-bold text-blue-950 shadow-lg transition-all hover:-translate-y-0.5 hover:bg-blue-50"
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
