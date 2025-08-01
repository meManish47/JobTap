import AddJobForm from "@/components/addJobComponent/addjobForm";
import HeaderComponent from "@/components/header/header";

export default function AddJobPage() {
  return (
    <main className="h-full w-screen flex flex-col ">
      <HeaderComponent />
      <div className="h-full w-full flex justify-center items-center  mt-4">
        <h1 className="scroll-m-20 text-center text-5xl font-extrabold tracking-wide text-balance">
          Add a new job
        </h1>
      </div>
      <AddJobForm />
    </main>
  );
}
