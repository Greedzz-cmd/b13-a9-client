import Link from "next/link";
import DocAppointLogo from "./Logo";
import { Button } from "@heroui/react";

const Navbar = () => {
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
        <Link href={"/login"}>
          <Button
            className={
              "bg-blue-950 text-white hover:bg-blue-900 transition-all hover:-translate-y-0.5"
            }
          >
            Login
          </Button>
        </Link>
        <Link href={"/register"}>
          <Button
            className={
              "bg-blue-950 text-white hover:bg-blue-900 transition-all hover:-translate-y-0.5"
            }
          >
            Register
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
