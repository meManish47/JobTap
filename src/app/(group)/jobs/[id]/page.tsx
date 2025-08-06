import JobDetailCard from "@/components/jobComponents/jobDetailCard";
import { notFound } from "next/navigation";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  console.log(id);
  const data = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/jobs/${id}`,
    {
      cache: "no-store",
    }
  );
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
