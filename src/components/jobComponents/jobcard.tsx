import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FaArrowRight } from "react-icons/fa6";
import { IoIosArrowForward } from "react-icons/io";

import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { Button } from "../ui/button";
import Link from "next/link";
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
  search: string;
};
export default function JobCard({ job, search }: JobType) {
  return (
    <Card
      className={`w-70 h-82 hover:scale-103 transition duration-200 flex flex-col  justify-between`}
    >
      <CardHeader>
        <CardTitle className=" lg:text-lg/tight line-clamp-2 sm:text-sm">
          {job.job_title}
        </CardTitle>
        {/*  <CardDescription>{job.job_publisher}</CardDescription> */}
        <CardAction>
          <div className="flex flex-col gap-1 items-end">
            <Badge
              variant="secondary"
              className="bg-blue-500 text-cyan-300 dark:bg-blue-600 tracking-wide"
            >
              {job.job_employment_type}
            </Badge>
            <div className="text-muted-foreground text-xs pr-1">
              {job.job_is_remote ? "Remote" : "Not Remote"}
            </div>
          </div>
        </CardAction>
      </CardHeader>
      <CardContent className=" line-clamp-6 text-sm italic">
        <p>{job.job_description}</p>
      </CardContent>

      <CardFooter className="flex justify-between">
        <Card className="h-10 max-w-45 flex justify-center items-center p-3 bg-gray-200/10">
          <div className="w-full flex gap-1 justify-start items-center">
            <div className="h-6 w-6 rounded-[50%] overflow-hidden">
              {job.employer_logo && (
                <Image
                  src={job.employer_logo}
                  alt="Logo"
                  height={48}
                  width={48}
                ></Image>
              )}
            </div>
            <div className="text-muted-foreground truncate text-sm font-semibold">
              {job.employer_name}
            </div>
          </div>
        </Card>
        <div className="w-10 h-10 rounded-full overflow-hidden bg-blue-100 hover:bg-blue-200 transition-colors duration-200 shadow-md">
          <Link href={`/jobs/${job.id}`}>
            <Button className="w-full h-full flex items-center justify-center text-blue-600 hover:text-blue-800 transition-colors duration-200 cursor-pointer">
              <FaArrowRight size={22} />
            </Button>
          </Link>
        </div>
      </CardFooter>
    </Card>
  );
}
