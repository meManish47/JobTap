import ShowOpenings from "@/components/openingsComp/showopenings";
import StarBack from "@/components/starbackground";

export default function Page() {
  return (
    <main className="h-full w-screen flex flex-wrap ">
      <div className="-z-10">
        <StarBack />
      </div>
      {/* <HeaderComponent fromLogin={false} /> */}
      <div className="h-[20%] w-full flex justify-center items-center  ">
        <h1 className="scroll-m-20 text-center text-5xl z-10 font-extrabold tracking-wide text-balance">
          Openings
        </h1>
      </div>
      <div>
        <ShowOpenings />
      </div>
    </main>
  );
}
