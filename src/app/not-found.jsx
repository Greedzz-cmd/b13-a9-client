import Link from "next/link";

export const metadata = {
  title: "404 - Page Not Found | docAppoint",
  description: "The page you are looking for does not exist on docAppoint.",
};

export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-white px-4">
      <div className="w-full max-w-lg text-center">
        <div className="mb-6 flex justify-center">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-blue-950 shadow-xl shadow-blue-950/30">
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

        <p className="mb-2 select-none text-[9rem] font-extrabold leading-none tracking-tighter text-blue-50">
          404
        </p>

        <h1 className="mb-3 text-2xl font-extrabold tracking-tight text-gray-900 md:text-3xl">
          Page not found
        </h1>
        <p className="mx-auto mb-8 max-w-sm text-sm leading-relaxed text-gray-500">
          The page you&apos;re looking for does not exist or has been moved.
          Let&apos;s get you back on track.
        </p>

        <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-full bg-blue-950 px-7 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-950/20 transition-all hover:-translate-y-0.5 hover:bg-blue-900"
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
            href="/all-appointments"
            className="inline-flex items-center gap-2 rounded-full border-2 border-blue-950 px-7 py-3 text-sm font-semibold text-blue-950 transition-all duration-200 hover:bg-blue-950 hover:text-white"
          >
            Browse Doctors
          </Link>
        </div>
      </div>
    </main>
  );
}
