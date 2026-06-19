// Server Component — fully SSR
const features = [
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden>
        <path
          d="M14 3C8 3 3 8 3 14s5 11 11 11 11-5 11-11S20 3 14 3z"
          stroke="#172554"
          strokeWidth="1.8"
        />
        <path
          d="M9 14l3.5 3.5L19 10"
          stroke="#172554"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
    title: "Verified Doctors",
    desc: "Every doctor on our platform is thoroughly vetted, licensed, and credentialed before they can accept appointments.",
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden>
        <rect
          x="4"
          y="6"
          width="20"
          height="18"
          rx="3"
          stroke="#172554"
          strokeWidth="1.8"
        />
        <path
          d="M9 6V4M19 6V4M4 12h20"
          stroke="#172554"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
        <path
          d="M9 17h4M9 21h6"
          stroke="#172554"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
      </svg>
    ),
    title: "Easy Scheduling",
    desc: "Book, reschedule, or cancel appointments in seconds — any time of day, from any device.",
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden>
        <path
          d="M14 4l2.5 5 5.5.8-4 3.9.9 5.5L14 17l-4.9 2.2.9-5.5-4-3.9 5.5-.8L14 4z"
          stroke="#172554"
          strokeWidth="1.8"
          strokeLinejoin="round"
        />
      </svg>
    ),
    title: "Top Rated Specialists",
    desc: "Browse doctors ranked by real patient reviews so you always find the best specialist for your needs.",
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden>
        <path
          d="M5 14c0-5 4-9 9-9s9 4 9 9"
          stroke="#172554"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
        <path
          d="M5 14c0 5 4 9 9 9"
          stroke="#172554"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeDasharray="2 2"
        />
        <circle
          cx="14"
          cy="14"
          r="3"
          fill="#172554"
          fillOpacity=".15"
          stroke="#172554"
          strokeWidth="1.8"
        />
      </svg>
    ),
    title: "20+ Specialties",
    desc: "From cardiology to psychiatry — find the right expert across more than 20 medical specialties.",
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden>
        <path
          d="M14 4C9 4 5 8 5 13c0 3.5 2 6.6 5 8.2V23h8v-1.8c3-1.6 5-4.7 5-8.2 0-5-4-9-9-9z"
          stroke="#172554"
          strokeWidth="1.8"
          strokeLinejoin="round"
        />
        <path
          d="M11 23h6"
          stroke="#172554"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
      </svg>
    ),
    title: "Private & Secure",
    desc: "Your health data and personal information are protected with industry-standard encryption and privacy controls.",
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden>
        <path
          d="M6 14c0-4.4 3.6-8 8-8s8 3.6 8 8-3.6 8-8 8"
          stroke="#172554"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
        <path
          d="M10 14h4l2-4"
          stroke="#172554"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
    title: "Instant Confirmation",
    desc: "Get immediate booking confirmation and reminders so you never miss an important appointment.",
  },
];

const stats = [
  { value: "500+", label: "Verified Doctors" },
  { value: "20k+", label: "Happy Patients" },
  { value: "20+", label: "Specialties" },
  { value: "4.8★", label: "Average Rating" },
];

export default function WhyChooseUs() {
  return (
    <section className="py-20 px-4 bg-slate-50">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-14">
          <span className="inline-block text-xs font-semibold text-blue-950 bg-blue-100 px-4 py-1.5 rounded-full tracking-widest uppercase mb-4">
            Why docAppoint
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight mb-4">
            Healthcare made <span className="text-blue-950">simple</span>
          </h2>
          <p className="text-gray-500 text-sm max-w-md mx-auto leading-relaxed">
            We built docAppoint to remove the friction between patients and the
            care they deserve.
          </p>
        </div>

        {/* Feature grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {features.map((f, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-lg hover:shadow-blue-950/8 hover:-translate-y-1 transition-all duration-300 group"
            >
              <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center mb-4 group-hover:bg-blue-100 transition-colors">
                {f.icon}
              </div>
              <h3 className="text-base font-bold text-gray-900 mb-2">
                {f.title}
              </h3>
              <p className="text-sm text-gray-500 leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>

        {/* Stats bar */}
        <div className="bg-blue-950 rounded-2xl grid grid-cols-2 md:grid-cols-4 divide-x divide-blue-900">
          {stats.map((s) => (
            <div
              key={s.label}
              className="flex flex-col items-center justify-center py-8 px-4 text-center"
            >
              <span className="text-3xl font-extrabold text-white mb-1">
                {s.value}
              </span>
              <span className="text-xs text-blue-300 uppercase tracking-widest">
                {s.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
