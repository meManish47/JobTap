//@ts-nocheck
"use client";
import { getAllJobsFromDb } from "@/app/actions/prismaActions";
import { ImSpinner9 } from "react-icons/im";

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
import { useEffect, useState } from "react";
import SideBar from "../sidebarComponent/SideBar";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";

export default function PaginationComponent({
  search,
}: {
  search: { searchVal: string; jobtype: string; remote: boolean };
}) {
  const searchVal = search.searchVal;
  const jobtype = search.jobtype;
  const remote = search.remote;
  const [jobs, setJobs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(0);
  const jobsPerPage = 12;
  const router = useRouter();
  useEffect(() => {
    async function fetchJobs() {
      // const result = await getAllJobsFromDb(searchVal, jobtype, remote);
      const result = await fetch(
        `http://localhost:3000/api/jobs/search?q=${searchVal}&jt=${jobtype}&rem=${remote}`
      );
      const data = await result.json();
      setJobs(data.jobs || []);
      setIsLoading(false);
    }
    fetchJobs();
  }, [searchVal, jobtype, remote]);

  const totalPages = Math.ceil(jobs.length / jobsPerPage);
  const start = page * jobsPerPage;
  const end = start + jobsPerPage;
  const jobsArray = jobs?.slice(start, end);
  if (isLoading) {
    return (
      <div className="h-screen flex flex-col justify-center items-center">
        <ImSpinner9 className=" animate-spin text-3xl mb-4" />
        <h2 className="scroll-m-20 pb-2 text-2xl px-4 font-semibold tracking-tight first:mt-0 flex justify-center items-center">
          Loading...
        </h2>
      </div>
    );
  }
  const paginationItems = [];
  // Prev button
  paginationItems.push(
    <PaginationItem key="prev">
      <PaginationPrevious
        onClick={() => {
          if (page > 0) setPage(page - 1);
        }}
      />
    </PaginationItem>
  );
  // First page
  paginationItems.push(
    <PaginationItem key={0}>
      <PaginationLink isActive={page === 0} onClick={() => setPage(0)}>
        1
      </PaginationLink>
    </PaginationItem>
  );
  // Ellipsis after 1
  if (page > 2) {
    paginationItems.push(
      <PaginationItem key="ellipsis-start">
        <PaginationEllipsis />
      </PaginationItem>
    );
  }
  // Middle: page -1, page, page +1
  for (let i = page - 1; i <= page + 1; i++) {
    if (i > 0 && i < totalPages - 1) {
      paginationItems.push(
        <PaginationItem key={i}>
          <PaginationLink isActive={page === i} onClick={() => setPage(i)}>
            {i + 1}
          </PaginationLink>
        </PaginationItem>
      );
    }
  }
  // Ellipsis before last
  if (page < totalPages - 3) {
    paginationItems.push(
      <PaginationItem key="ellipsis-end">
        <PaginationEllipsis />
      </PaginationItem>
    );
  }
  // Last page
  if (totalPages > 1) {
    paginationItems.push(
      <PaginationItem key={totalPages - 1}>
        <PaginationLink
          isActive={page === totalPages - 1}
          onClick={() => setPage(totalPages - 1)}
        >
          {totalPages}
        </PaginationLink>
      </PaginationItem>
    );
  }
  // Next button
  paginationItems.push(
    <PaginationItem key="next">
      <PaginationNext
        onClick={() => {
          if (page < totalPages - 1) setPage(page + 1);
        }}
      />
    </PaginationItem>
  );
  if (jobsArray.length == 0) {
    return (
      <div className="w-screen h-screen flex justify-center items-center">
        <p className="text-muted-foreground text-lg">No jobs found :/</p>
        <Button
          className="cursor-pointer"
          variant={"link"}
          onClick={() => {
            router.push("/?q=");
          }}
        >
          Go back
        </Button>
      </div>
    );
  }
  return (
    <div className="h-full w-screen flex  items-start gap-6 p-4 mt-4 relative ">
      {true ? (
        <div className="w-80 h-full  sticky top-10">
          <SideBar />
        </div>
      ) : null}
      <div className="flex flex-wrap justify-center gap-6 w-full ">
        {jobsArray.map((job) => (
          <div key={job.id}>
            <JobCard job={job} search={searchVal} />
          </div>
        ))}
        <Pagination>
          <PaginationContent>{paginationItems}</PaginationContent>
        </Pagination>
      </div>
    </div>
  );
}
