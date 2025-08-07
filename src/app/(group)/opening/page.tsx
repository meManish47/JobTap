import ShowOpenings from "@/components/openingsComp/showopenings";
import StarBack from "@/components/starbackground";

export default function Page() {
  return (
    <main className="h-screen w-screen flex flex-wrap ">
      {/* <HeaderComponent fromLogin={false} /> */}
      <div className="h-[10%] w-full flex justify-center items-center  ">
        <h1 className="scroll-m-20 text-center text-5xl z-10 font-extrabold tracking-wide text-balance">
          Openings
        </h1>
      </div>
      <div className="h-full ">
        <ShowOpenings />
      </div>
    </main>
  );
}
