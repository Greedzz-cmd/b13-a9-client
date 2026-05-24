// Server Component — fully SSR
import Link from "next/link";
import DocAppointLogo from "./Logo";

const links = [
  { label: "Home", href: "/" },
  { label: "All Doctors", href: "/appointments" },
  { label: "Dashboard", href: "/dashboard" },
  { label: "My Bookings", href: "/dashboard/bookings" },
  { label: "Contact", href: "/contact" },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-[#1c1c1c] text-white py-16 px-4">
      <div className="max-w-3xl mx-auto flex flex-col items-center text-center gap-8">
        {/* Logo */}
        <Link href="/">
          <DocAppointLogo size="sm" theme="dark" />
        </Link>

        {/* Nav links */}
        <nav>
          <ul className="flex flex-wrap justify-center gap-6">
            {links.map((link) => (
              <li key={link.label}>
                <Link
                  href={link.href}
                  className="text-sm text-gray-300 hover:text-white transition-colors"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Divider */}
        <div className="w-full border-t border-white/10" />

        {/* Copyright */}
        <p className="text-xs text-gray-500">
          copyright {year} © all rights reserved.
        </p>
      </div>
    </footer>
  );
}
