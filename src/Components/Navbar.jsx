"use client";

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
      <img
        src={user.image}
        alt={user.name || "User profile"}
        width={40}
        height={40}
        onError={() => setImgError(true)}
        className="h-10 w-10 rounded-full border border-blue-100 object-cover"
      />
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
    `inline-block relative transition-all hover:-translate-y-0.5 after:absolute after:bottom-0 after:left-0 after:h-[2px] after:transition-all after:duration-300 ${
      pathName === href
        ? "text-blue-950 after:w-full after:bg-blue-950"
        : "hover:text-blue-950 after:w-0 after:bg-blue-950 hover:after:w-full"
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
    <header className="mx-auto my-6 flex w-full max-w-6xl flex-col gap-5 px-4 lg:flex-row lg:items-center lg:justify-between">
      <Link href="/">
        <DocAppointLogo size="sm" theme="light" />
      </Link>

      <nav>
        <ul className="flex flex-wrap gap-6 text-sm font-semibold text-slate-700 lg:gap-12">
          <ul className="flex flex-wrap gap-6 text-sm font-semibold text-slate-700 lg:gap-12">
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
        </ul>
      </nav>

      {data?.user ? (
        <div className="flex items-center gap-3 self-start lg:self-auto">
          <Avatar user={data.user} />
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold text-slate-900">
              {data.user.name || "Patient Account"}
            </p>
            <p className="truncate text-xs text-slate-500">{data.user.email}</p>
          </div>
          <Button
            onClick={handleLogOut}
            className="rounded-full bg-blue-950 text-white transition-all hover:-translate-y-0.5 hover:bg-blue-900"
          >
            Log Out
          </Button>
        </div>
      ) : (
        <div className="space-x-2 self-start lg:self-auto">
          <Link href="/login">
            <Button className="bg-blue-950 text-white transition-all hover:-translate-y-0.5 hover:bg-blue-900">
              Log In
            </Button>
          </Link>
          <Link href="/register">
            <Button className="bg-blue-950 text-white transition-all hover:-translate-y-0.5 hover:bg-blue-900">
              Register
            </Button>
          </Link>
        </div>
      )}
    </header>
  );
}
