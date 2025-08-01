//@ts-nocheck
import HeaderComponent from "@/components/header/header";
import { ModeToggle } from "../util-components/mode-toggle";
import JobSearchBar from "@/components/jobComponents/jobSearchBar";
import PaginationComponent from "@/components/jobComponents/pagination";
export default async function Home({
  searchParams,
}: {
  searchParams: { q: string; jt: string; rem: boolean };
}) {
  const searchVal = searchParams.q;
  const jobtype = searchParams.jt;
  const remote =
    searchParams.rem === "true"
      ? true
      : searchParams.rem === "false"
      ? false
      : undefined;
  return (
    <main className="h-full w-screen flex flex-col ">
      {/* <HeaderComponent fromLogin={false} /> */}
      <div className="h-[20%] w-full flex justify-center items-center  ">
        <h1 className="scroll-m-20 text-center text-5xl font-extrabold tracking-wide text-balance">
          JobTap
        </h1>
      </div>
      <div>
        <PaginationComponent search={{ searchVal, jobtype, remote }} />
      </div>
    </main>
  );
}
