import { Input } from "@/components/ui/input";
import { getJobs } from "./actions/actions";
import { ModeToggle } from "./util-components/mode-toggle";
import JobCard from "@/components/jobComponents/jobcard";
import { Button } from "@/components/ui/button";
import JobSearchBar from "@/components/jobComponents/jobSearchBar";
export default async function Home() {
  const jobs = await getJobs();
  const jobsArray = jobs;
  console.log(jobsArray?.length);
  return (
    <main className="h-screen w-screen flex flex-col ">
      <div className="p-2 w-full flex self-end justify-between px-6 pt-4">
        <ModeToggle />
        <JobSearchBar />
      </div>
      <div className="h-[20%] w-full flex justify-center items-center  ">
        <h1 className="scroll-m-20 text-center text-5xl font-extrabold tracking-wide text-balance">
          JobTap
        </h1>
      </div>
      <div className="h-full w-screen flex flex-wrap  gap-6 px-4 py-2 mt-4">
        {jobsArray?.slice(0, 20).map((job) => {
          return (
            <div key={job.job_id}>
              <JobCard job={job} />
            </div>
          );
        })}
      </div>
    </main>
  );
}
