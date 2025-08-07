"use client";

import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Card, CardAction } from "../ui/card";
import { useContext, useState } from "react";
import { UserContext } from "@/app/(group)/layout";

import ApplyButton from "../applicationComp/applybutton";
import EditOptions from "./editoptions";
import ViewApplicants from "../applicationComp/viewapplications";
import { ImSpinner9 } from "react-icons/im";
import { Button } from "../ui/button";

type OpeningType = {
  opening: {
    id: string;
    title: string;
    description: string;
    location: string;
    salary: number;
    employment_type: string;
    open: boolean;
    companyId: string;
    company?: {
      id: string;
      company_name: string;
      logo?: string;
    };
  };
};

export default function OpeningDetailCard({ opening }: OpeningType) {
  const [loading, setLoading] = useState(true);

  const context = useContext(UserContext);
  const user = context?.user;
  if (!user) return null;
  // console.log("OPENING", opening);
  setTimeout(() => {
    setLoading(false);
  }, 700);
  if (loading) {
    return (
      <div className="h-screen flex flex-col justify-center items-center">
        <ImSpinner9 className=" animate-spin text-3xl mb-4" />
        <h2 className="scroll-m-20 pb-2 text-2xl px-4 font-semibold tracking-tight first:mt-0 flex justify-center items-center">
          Loading...
        </h2>
      </div>
    );
  }
  return (
    <Card className="h-[70%] w-[90%] px-6 overflow-hidden flex flex-col justify-between min-w-xs ms-0 sm:ms-10">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-blue-700 w-full flex justify-between">
            {opening.title}
          </h1>
          <div className="flex items-center gap-2 mt-2 text-sm ">
            <Badge className="bg-blue-600 text-white">
              {opening.employment_type}
            </Badge>
            <span>|</span>
            <span>{opening.location}</span>
            <span>|</span>
            <span>₹{opening.salary}</span>
          </div>
        </div>
        <CardAction>
          {user.company.id === opening.companyId && (
            <ViewApplicants opening={opening} />
          )}
        </CardAction>
        {opening.company?.logo && (
          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full overflow-hidden border shadow">
            <Image
              src={opening.company.logo}
              alt="Company Logo"
              width={80}
              height={80}
              className="object-contain"
            />
          </div>
        )}
      </div>

      <div className="flex-1 my-4 overflow-y-auto pr-2">
        <h2 className="text-lg font-semibold mb-1 ">Description</h2>
        <p className="text-sm/tight leading-6 text-gray-500 whitespace-pre-wrap">
          {opening.description}
        </p>
      </div>

      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center border-t pt-4 gap-4">
        <div>
          <p className="text-sm text-muted-foreground">Company</p>
          <Button
            className="h-8   cursor-pointer w-16 sm:my-2"
            variant={"link"}
          >
            <p className="font-medium text-base">
              {opening.company?.company_name || "Unknown"}
            </p>
          </Button>
          <p className="text-xs text-muted-foreground mt-1">
            Opening ID: {opening.id}
          </p>
        </div>
        <div className="flex justify-between gap-2 items-center w-full sm:flex-col sm:w-max">
          <ApplyButton opening={opening} />
          <EditOptions opening={opening} />
        </div>
      </div>
    </Card>
  );
}
