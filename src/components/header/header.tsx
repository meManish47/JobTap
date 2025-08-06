import JobSearchBar from "../jobComponents/jobSearchBar";
import { Button } from "../ui/button";
import { FaPlus } from "react-icons/fa";
import Link from "next/link";
import { MdAddBusiness } from "react-icons/md";
import ThemeToggleButton from "@/components/ui/theme-toggle-button";
import UserDropDown from "./userdropdown";
import SearchIcon from "./searchIcon";
import { User ,company} from "../../../generated/prisma";
type UserWithCompany = User &{
  company:company
}|null
export default function HeaderComponent({ fromLogin, user }:{fromLogin:boolean,user:UserWithCompany}) {
  return (
    <div className="p-2 w-full flex self-end justify-between px-6 pt-4">
      <div className="flex gap-2 justify-center items-center">
        {/* <ModeToggle /> */}
        <ThemeToggleButton />
        {user?.company?.id ? (
          <Link
            href={"/add_job"}
            className="flex flex-wrap items-center gap-2 md:flex-row cursor-pointer "
          >
            <Button className="cursor-pointer">
              <FaPlus />
            </Button>
          </Link>
        ) : (
          <Link href={"/add_company"}>
            <Button className="cursor-pointer">
              <MdAddBusiness size={24} />
            </Button>
          </Link>
        )}
        <Link
          href={"/"}
          onClick={() => {
            window.location.href = "/";
          }}
          className="flex flex-wrap items-center gap-2 md:flex-row cursor-pointer "
        >
          <Button className="cursor-pointer" variant={"ghost"}>
            <p className="text-xl font-bold font-mono">JT</p>
          </Button>
        </Link>
        <p className="text-muted-foreground text-sm font-semibold">
          {user?.role}
        </p>
      </div>
      <div className="flex gap-6 justify-center items-center">
        <Link href={`/company`}>
          <Button variant={"link"} className="cursor-pointer">
            Companies
          </Button>
        </Link>
        <Link href={`/opening`}>
          <Button variant={"link"} className="cursor-pointer">
            Openings
          </Button>
        </Link>
        <UserDropDown />
        <div className="hidden sm:block"> {!fromLogin && <JobSearchBar />}</div>
        <SearchIcon />
      </div>
    </div>
  );
}
