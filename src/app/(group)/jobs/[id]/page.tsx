import JobDetailCard from "@/components/jobComponents/jobDetailCard";
import { notFound } from "next/navigation";

export default async function Page({ params }: { params: { id: string } }) {
  const id = params.id;
  console.log(id);
  const data = await fetch(`http://localhost:3000/api/jobs/${id}`);
  const res = await data.json();
  console.log(res);
  if (!res?.success) notFound();
  const job = res.job;
  return (
    <div className="h-screen w-full flex p-10 justify-center items-center pb-28 ">
      <JobDetailCard job={job} />
    </div>
  );
}
