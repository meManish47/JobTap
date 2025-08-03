"use client";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "../ui/card";
import { useContext } from "react";
import { UserContext } from "@/app/(group)/layout";

type JobType = {
  job: {
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
  };
};

export default function JobDetailCard({ job }: JobType) {
  const { user } = useContext(UserContext);
  return (
    <Card className="h-[90%] w-full px-6 overflow-hidden flex flex-col justify-between ">
      {/* Top Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-blue-700">
            {job.job_title}
          </h1>
          <div className="flex items-center gap-2 mt-2 text-sm text-muted-foreground">
            <Badge className="bg-blue-600 text-white">
              {job.job_employment_type}
            </Badge>
            <span>|</span>
            <span>{job.job_is_remote ? "Remote" : job.job_location}</span>
          </div>
        </div>

        {job.employer_logo && (
          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full overflow-hidden border shadow">
            <Image
              src={job.employer_logo}
              alt="Employer Logo"
              width={80}
              height={80}
              className="object-contain"
            />
          </div>
        )}
      </div>

      {/* Middle Scrollable Description Section */}
      <div className="flex-1 my-4 overflow-y-auto pr-2 ">
        <h2 className="text-lg font-semibold mb-1 text-muted-foreground">
          Description
        </h2>
        <p className="text-sm/tight leading-6 text-gray-500 whitespace-pre-wrap ">
          {job.job_description}
        </p>
      </div>

      {/* Bottom Section: Company + Apply */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center border-t pt-4 gap-4 ">
        <div>
          <p className="text-sm text-muted-foreground">Company</p>
          <p className="font-medium text-base">{job.employer_name}</p>
          <p className="text-xs text-muted-foreground mt-1">
            Job ID: {job.job_id}
          </p>
        </div>
        {
          <Button
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-full cursor-pointer disabled:bg-red-400 disabled:line-through disabled:cursor-not-allowed"
            disabled={user ? false : true}
          >
            <Link href={job.job_apply_link} target="_blank">
              Apply Now
            </Link>
          </Button>
        }
      </div>
    </Card>
  );
}
