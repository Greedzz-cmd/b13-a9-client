"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "@heroui/react";
import { authClient, useSession } from "@/lib/auth-client";
import DocAppointLogo from "./Logo";
import { useState } from "react";

function Avatar({ user }) {
  const [imgError, setImgError] = useState(false);

  if (user?.image && !imgError) {
    return (
      <div className="relative h-10 w-10 overflow-hidden rounded-full border border-blue-100 bg-slate-100">
        <Image
          src={user.image}
          alt={user.name || "User profile"}
          fill
          sizes="40px"
          className="object-cover"
          unoptimized
          onError={() => setImgError(true)}
        />
      </div>
    );
  }

  const initials = (user?.name || user?.email || "DA")
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-950 text-sm font-bold text-white">
      {initials}
    </div>
  );
}

export default function Navbar() {
  const pathName = usePathname();

  const navLinkClass = (href) =>
    `inline-flex items-center justify-center rounded-full px-3 py-2 transition-all duration-300 ${
      pathName === href
        ? "text-blue-950 bg-blue-100 shadow-sm"
        : "text-slate-600 hover:text-blue-950 hover:bg-slate-100"
    }`;

  const router = useRouter();
  const { data } = useSession();

  async function handleLogOut() {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/login");
        },
      },
    });
  }

  return (
    <header className="sticky top-0 z-40 mx-auto my-4 w-full max-w-6xl rounded-[2rem] border border-slate-200/70 bg-white/90 px-5 py-4 shadow-[0_15px_45px_-20px_rgba(15,23,42,0.2)] backdrop-blur-sm backdrop-saturate-150 transition-all duration-300 sm:px-6 lg:px-8">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <Link href="/">
            <DocAppointLogo size="sm" theme="light" />
          </Link>
          <div className="hidden items-center gap-3 rounded-full bg-slate-50 px-4 py-2 text-sm text-slate-500 md:flex">
            <span className="inline-flex h-2 w-2 rounded-full bg-emerald-500" />
            Your appointment hub
          </div>
        </div>

        <nav aria-label="Primary navigation" className="order-last md:order-0">
          <ul className="flex flex-wrap justify-center gap-3 text-sm font-semibold">
            <li>
              <Link href="/" className={navLinkClass("/")}>
                Home
              </Link>
            </li>
            <li>
              <Link
                href="/all-appointments"
                className={navLinkClass("/all-appointments")}
              >
                All Appointments
              </Link>
            </li>
            <li>
              <Link href="/dashboard" className={navLinkClass("/dashboard")}>
                Dashboard
              </Link>
            </li>
          </ul>
        </nav>

        <div className="flex flex-col gap-3 md:flex-row md:items-center">
          {data?.user ? (
            <div className="inline-flex items-center gap-3 rounded-full border border-slate-200 bg-slate-50 px-4 py-2 shadow-sm">
              <Avatar user={data.user} />
              <div className="min-w-0 text-left">
                <p className="truncate text-sm font-semibold text-slate-900">
                  {data.user.name || "Patient Account"}
                </p>
                <p className="truncate text-xs text-slate-500">
                  {data.user.email}
                </p>
              </div>
            </div>
          ) : null}

          {data?.user ? (
            <Button
              onClick={handleLogOut}
              className="rounded-full bg-blue-950 px-5 py-2 text-sm text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-blue-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-300"
            >
              Log Out
            </Button>
          ) : (
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
              <Link href="/login">
                <Button className="rounded-full bg-blue-950 px-5 py-2 text-sm text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-blue-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-300">
                  Log In
                </Button>
              </Link>
              <Link href="/register">
                <Button className="rounded-full bg-slate-100 px-5 py-2 text-sm font-semibold text-slate-700 transition-all duration-300 hover:-translate-y-0.5 hover:bg-slate-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-300">
                  Register
                </Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
