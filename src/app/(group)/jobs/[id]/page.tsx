"use client";

import JobDetailCard from "@/components/jobComponents/jobDetailCard";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { jobs } from "../../../../../generated/prisma";
import LoaderComponent from "@/components/sidebarComponent/loadingcomp";

interface Job {
  id: string;
  job_id: string;
  job_title: string;
  job_employment_type: string | null;
  job_apply_link: string;
  job_description: string;
  job_location: string;
  job_is_remote: boolean;
  employer_name: string;
  employer_logo: string | null;
}

export default function Page() {
  const { id } = useParams();
  const router = useRouter();
  const [job, setJob] = useState<Job | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    async function getJob() {
      try {
        const res = await fetch(`/api/jobs/${id}`, {
          cache: "no-store",
        });
        const data = await res.json();

        if (!data?.success) {
          router.replace("/not-found"); 
        } else {
          setJob(data.job);
        }
      } catch (error) {
        console.error("Failed to fetch job:", error);
        router.replace("/not-found");
      } finally {
        setLoading(false);
      }
    }

    getJob();
  }, [id]);

  if (loading || !job) {
    return <LoaderComponent />;
  }

  return (
    <div className="h-screen w-full flex p-10 justify-center items-center pb-28">
      <JobDetailCard job={job} />
    </div>
  );
}
