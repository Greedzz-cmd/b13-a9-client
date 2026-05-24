// app/not-found.jsx — Next.js built-in 404 handler (Server Component)
import Link from "next/link";

export const metadata = {
  title: "404 – Page Not Found | docAppoint",
  description: "The page you are looking for does not exist.",
};

export default function NotFound() {
  return (
    <main className="min-h-screen bg-white flex items-center justify-center px-4">
      <div className="max-w-lg w-full text-center">
        {/* Icon */}
        <div className="flex justify-center mb-6">
          <div className="w-20 h-20 rounded-full bg-blue-950 flex items-center justify-center shadow-xl shadow-blue-950/30">
            <svg
              width="40"
              height="40"
              viewBox="0 0 40 40"
              fill="none"
              aria-hidden
            >
              <path
                d="M10 8C10 8 8 8 8 12v6a8 8 0 0016 0v-6c0-4-2-4-2-4"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
              />
              <line
                x1="10"
                y1="8"
                x2="10"
                y2="14"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
              />
              <line
                x1="18"
                y1="8"
                x2="18"
                y2="14"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
              />
              <path
                d="M16 26c0 4 4 7 8 7a7 7 0 000-14c-2 0-4 .8-5.5 2"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
              />
              <circle cx="30" cy="30" r="2.5" fill="white" />
            </svg>
          </div>
        </div>

        {/* Big 404 */}
        <p className="text-[9rem] font-extrabold leading-none tracking-tighter text-blue-50 select-none mb-2">
          404
        </p>

        {/* Text */}
        <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900 tracking-tight mb-3">
          Page not found
        </h1>
        <p className="text-gray-500 text-sm leading-relaxed mb-8 max-w-sm mx-auto">
          The page you&apos;re looking for does&apos;t exist or has been moved.
          Let&apos;s get you back on track.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/"
            className="inline-flex items-center gap-2 bg-blue-950 text-white font-semibold px-7 py-3 rounded-full text-sm hover:bg-blue-900 transition-all hover:-translate-y-0.5 shadow-lg shadow-blue-950/20"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              aria-hidden
            >
              <path
                d="M8 2L2 8l6 6M2 8h12"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            Back to Home
          </Link>
          <Link
            href="/appointments"
            className="inline-flex items-center gap-2 border-2 border-blue-950 text-blue-950 font-semibold px-7 py-3 rounded-full text-sm hover:bg-blue-950 hover:text-white transition-all duration-200"
          >
            Browse Doctors
          </Link>
        </div>
      </div>
    </main>
  );
}
