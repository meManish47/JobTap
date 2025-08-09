import PaginationComponent from "@/components/jobComponents/pagination";
import LoaderComponent from "@/components/sidebarComponent/loadingcomp";
import StarBack from "@/components/starbackground";
import { Suspense } from "react";
export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ q: string; jt: string; rem: string }>;
}) {
  const searchP = await searchParams;
  const searchVal = searchP.q;
  const jobtype = searchP.jt;
  const remote =
    searchP.rem === "true" ? true : searchP.rem === "false" ? false : undefined;
  return (
    <main className="h-full w-screen flex flex-col">
      {/* <StarBack /> */}
      {/* <HeaderComponent fromLogin={false} /> */}
      <div className="h-[20%] w-full flex justify-center items-center  ">
        <h1 className="scroll-m-20 text-center text-5xl z-10 font-extrabold tracking-wide text-balance">
          JobTap
        </h1>
      </div>
      <div className=" h-[10dvh] ">
        <PaginationComponent search={{ searchVal, jobtype, remote }} />
      </div>
    </main>
  );
}
