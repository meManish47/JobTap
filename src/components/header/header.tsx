import { ModeToggle } from "@/app/util-components/mode-toggle";
import JobSearchBar from "../jobComponents/jobSearchBar";
import { Button } from "../ui/button";
import { FaPlus } from "react-icons/fa";
import Link from "next/link";

export default function HeaderComponent() {
  return (
    <div className="p-2 w-full flex self-end justify-between px-6 pt-4">
      <div className="flex gap-2">
        <ModeToggle />{" "}
        <Link
          href={"/add_job"}
          className="flex flex-wrap items-center gap-2 md:flex-row cursor-pointer "
        >
          <Button>
            <FaPlus />
          </Button>
        </Link>
      </div>
      <JobSearchBar />
    </div>
  );
}
