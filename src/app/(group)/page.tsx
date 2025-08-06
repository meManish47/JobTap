import PaginationComponent from "@/components/jobComponents/pagination";
import StarBack from "@/components/starbackground";
export default async function Home({
  searchParams,
}: {
  searchParams: { q: string; jt: string; rem: string };
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
      {/* <StarBack /> */}
      {/* <HeaderComponent fromLogin={false} /> */}
      <div className="h-[20%] w-full flex justify-center items-center  ">
        <h1 className="scroll-m-20 text-center text-5xl z-10 font-extrabold tracking-wide text-balance">
          JobTap
        </h1>
      </div>
      <div className=" h-[110vh]">
        <PaginationComponent search={{ searchVal, jobtype, remote }} />
      </div>
    </main>
  );
}
