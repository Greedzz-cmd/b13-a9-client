import Link from "next/link";
import DocAppointLogo from "./Logo";

const links = [
  { label: "Home", href: "/" },
  { label: "All Appointments", href: "/all-appointments" },
  { label: "Dashboard", href: "/dashboard" },
  { label: "My Bookings", href: "/dashboard/bookings" },
  { label: "Register", href: "/register" },
];

const socialLinks = [
  {
    label: "Facebook",
    href: "https://www.facebook.com/",
    icon: (
      <path
        d="M14 2.5h-2.4c-2.4 0-4.1 1.7-4.1 4.3v2H5v3.1h2.5V18h3.3v-6.1h2.7l.4-3.1h-3.1V7.1c0-.9.5-1.4 1.5-1.4H14V2.5z"
        fill="currentColor"
      />
    ),
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/",
    icon: (
      <>
        <rect x="2.5" y="6.5" width="3" height="9" rx="1" fill="currentColor" />
        <circle cx="4" cy="3.8" r="1.3" fill="currentColor" />
        <path
          d="M8 6.5h2.9v1.3c.5-.8 1.4-1.5 2.9-1.5 2.5 0 3.7 1.6 3.7 4.5v4.7h-3v-4.2c0-1.3-.5-2.1-1.7-2.1s-1.9.8-1.9 2.1v4.2H8V6.5z"
          fill="currentColor"
        />
      </>
    ),
  },
  {
    label: "X",
    href: "https://x.com/",
    icon: (
      <path
        d="M0.05 0L7.72 10.48L0 20H1.74L8.49 11.52L13.93 20H20L11.91 8.96L19.09 0H17.35L11.13 7.91L6.08 0H0.05ZM2.56 1.38H5.34L17.45 18.62H14.67L2.56 1.38Z"
        fill="currentColor"
      />
    ),
  },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-[#1c1c1c] px-4 py-16 text-white">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-8 text-center">
        <Link href="/">
          <DocAppointLogo size="sm" theme="dark" />
        </Link>

        <nav>
          <ul className="flex flex-wrap justify-center gap-6">
            {links.map((link) => (
              <li key={link.label}>
                <Link
                  href={link.href}
                  className="text-sm text-gray-300 transition-colors hover:text-white"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-4">
          {socialLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noreferrer"
              aria-label={link.label}
              className="rounded-full border border-white/10 bg-white/5 p-3 text-gray-300 transition hover:border-white/20 hover:bg-white/10 hover:text-white"
            >
              <svg width="20" height="20" viewBox="0 0 20 20" aria-hidden>
                {link.icon}
              </svg>
            </Link>
          ))}
        </div>

        <div className="w-full border-t border-white/10" />

        <p className="text-xs text-gray-500">
          Copyright {year} all rights reserved by docAppoint.
        </p>
      </div>
    </footer>
  );
}
