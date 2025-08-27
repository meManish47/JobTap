"use client";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useContext, useEffect, useState } from "react";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import EditOptions from "./editoptions";
import Link from "next/link";
import { FaArrowRight } from "react-icons/fa";
import { openings, company, saved } from "../../../generated/prisma";
import { ImSpinner9 } from "react-icons/im";
import BookmarkComponent from "./bookmark";
import { UserContext } from "@/app/(group)/layout";
export type OpeningsTypeWithCmpanyNSaved = openings & {
  company: company;
  saved: saved[];
};
export default function ShowOpenings() {
  const context = useContext(UserContext);
  const user = context?.user;
  const [openings, setOpenings] = useState<OpeningsTypeWithCmpanyNSaved[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function getOpen() {
      const openRes = await fetch(`/api/company/opening`);
      const x = await openRes.json();
      if (x.success) {
        setOpenings(x.open);
      } else {
        setOpenings([]);
      }
      setLoading(false);
    }
    getOpen();
  }, []);
  function handleEdit(
    updatedOpening: OpeningsTypeWithCmpanyNSaved,
    id: string
  ) {
    setOpenings((prev) =>
      prev.map((item) =>
        item.id === updatedOpening.id ? updatedOpening : item
      )
    );
  }
  if (loading) {
    return (
      <div className="h-screen flex flex-col justify-center items-center w-screen">
        <ImSpinner9 className="animate-spin text-3xl mb-4" />
        <h2 className="scroll-m-20 pb-2 text-2xl px-4 font-semibold tracking-tight first:mt-0 flex justify-center items-center">
          Loading...
        </h2>
      </div>
    );
  }

  return (
    <div className="flex   w-full flex-wrap px-0 sm:px-4  pb-20 sm:pb-0">
      {openings.map((opening) => (
        <Card
          key={opening.id}
          className="mt-8 max-w-[80%] ms-10 w-80 max-h-80 flex flex-col justify-between "
        >
          <CardHeader>
            <CardTitle className="text-base font-bold sm:text-lg line-clamp-1 ">
              {opening.title}
            </CardTitle>
            <CardDescription>{opening.location}</CardDescription>
            <CardAction className="flex flex-col gap-1 items-end">
              <Badge
                variant="secondary"
                className="bg-blue-500 text-cyan-300 dark:bg-blue-600 tracking-wide mx-2"
              >
                {opening.employment_type}
              </Badge>
              <EditOptions opening={opening} handleEdit={handleEdit} />
            </CardAction>
          </CardHeader>
          <CardContent className="line-clamp-4 text-sm  md:text-base">
            <p>{opening.description}</p>
          </CardContent>
          <CardFooter className="flex justify-between gap-4">
            <div>
              <p className="flex items-center justify-center text-muted-foreground text-sm mb-4">
                Salary: ₹{opening.salary}
              </p>
              <Button
                variant={"outline"}
                onClick={() =>
                  (window.location.href = `/company/${opening.companyId}`)
                }
                className="cursor-pointer"
              >
                {opening.company.company_name}
              </Button>
            </div>
            <div className="flex flex-col items-center">
              <BookmarkComponent
                opening={opening}
                isSaved={opening.saved.some((item) => item.userId === user?.id)}
              />
              <Link href={`/opening/${opening.id}`}>
                <Button className="w-full h-full flex items-center justify-center text-blue-600 hover:text-blue-800 transition-colors duration-200 cursor-pointer">
                  <FaArrowRight size={22} />
                </Button>
              </Link>
            </div>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
