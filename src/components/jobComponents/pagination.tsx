import { getAllJobsFromDb } from "@/app/actions/prismaActions";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import JobCard from "./jobcard";

export default async function PaginationComponent() {
  const data = await getAllJobsFromDb();
  const jobsArray = data.jobs?.slice(0, 10);
  return (
    <div className="h-full w-screen flex flex-wrap  gap-6 p-4 mt-4 ">
      {jobsArray?.map((job) => {
        return (
          <div key={job.job_id}>
            <JobCard job={job} />
          </div>
        );
      })}
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious href="#" />
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#">1</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#" isActive>
              2
            </PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#">3</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
          <PaginationItem>
            <PaginationNext href="#" />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}
