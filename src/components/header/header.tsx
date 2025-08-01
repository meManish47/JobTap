//@ts-nocheck
import { ModeToggle } from "@/app/util-components/mode-toggle";
import JobSearchBar from "../jobComponents/jobSearchBar";
import { Button } from "../ui/button";
import { FaPlus } from "react-icons/fa";
import Link from "next/link";
import { MdLogin } from "react-icons/md";

export default function HeaderComponent({ fromLogin, user }) {
  console.log("USER", user);
  return (
    <div className="p-2 w-full flex self-end justify-between px-6 pt-4">
      <div className="flex gap-2 justify-center items-center">
        <ModeToggle />{" "}
        {user.role === "admin" && (
          <Link
            href={"/add_job"}
            className="flex flex-wrap items-center gap-2 md:flex-row cursor-pointer "
          >
            <Button className="cursor-pointer">
              <FaPlus />
            </Button>
          </Link>
        )}
        <Link
          href={"/"}
          className="flex flex-wrap items-center gap-2 md:flex-row cursor-pointer "
        >
          <Button className="cursor-pointer" variant={"ghost"}>
            <p className="text-xl font-bold font-mono">JT</p>
          </Button>
        </Link>
        <p className="text-muted-foreground text-sm font-semibold">
          {user.role}
        </p>
      </div>
      <div className="flex gap-6 justify-center items-center">
        <Link href={"/login"}>
          <MdLogin size={24} />
        </Link>
        {!fromLogin && <JobSearchBar />}
      </div>
    </div>
  );
}
