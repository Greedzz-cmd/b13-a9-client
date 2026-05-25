"use client";
import Link from "next/link";
import DocAppointLogo from "./Logo";
import { Button } from "@heroui/react";
import { authClient, useSession } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

const Navbar = () => {
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
    <div className="flex justify-between my-6">
      <div>
        <DocAppointLogo size="sm" theme="light" />
      </div>

      <ul className="flex gap-15 font-semibold">
        <li>
          <Link href={"/"}>Home</Link>
        </li>
        <li>
          <Link href={"/all-appointments"}>All Appointments</Link>
        </li>
        <li>
          <Link href={"/dashboard"}>Dashboard</Link>
        </li>
      </ul>

      <div className="space-x-2">
        <Link href={"/login"} className={data?.user ? "hidden" : ""}>
          <Button
            className={
              "bg-blue-950 text-white hover:bg-blue-900 transition-all hover:-translate-y-0.5"
            }
          >
            Log In
          </Button>
        </Link>
        <Link href={"/register"} className={data?.user ? "hidden" : ""}>
          <Button
            className={
              "bg-blue-950 text-white hover:bg-blue-900 transition-all hover:-translate-y-0.5"
            }
          >
            Register
          </Button>
        </Link>

        <Button
          onClick={handleLogOut}
          className={`bg-blue-950 text-white hover:bg-blue-900 transition-all hover:-translate-y-0.5 ${data?.user ? "" : "hidden"}`}
        >
          Log Out
        </Button>
      </div>
    </div>
  );
};

export default Navbar;
