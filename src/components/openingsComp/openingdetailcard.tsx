"use client";

import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Card, CardAction } from "../ui/card";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "@/app/(group)/layout";
import ApplyButton from "../applicationComp/applybutton";
import EditOptions from "./editoptions";
import ViewApplicants from "../applicationComp/viewapplications";
import { ImSpinner9 } from "react-icons/im";
import { Button } from "../ui/button";
import { OpeningsTypeWithCmpanyNSaved } from "./showopenings";
import DeleteApplication from "../applicationComp/deleteapplication";

export default function OpeningDetailCard({
  opening,
}: {
  opening: OpeningsTypeWithCmpanyNSaved;
}) {
  const [loading, setLoading] = useState(true);
  const [openingState, setOpeningState] =
    useState<OpeningsTypeWithCmpanyNSaved>(opening);
  const context = useContext(UserContext);
  const [hasApplied, setHasApplied] = useState(false);
  const user = context?.user;
  useEffect(() => {
    async function getApplicationStatus() {
      const res = await fetch(`/api/company/opening/isApplied/${opening.id}`);
      const x = await res.json();
      if (x.success) setHasApplied(true);
    }
    getApplicationStatus();
  }, [opening]);
  if (!user) return null;
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
  function handleEdit(
    updatedOpening: OpeningsTypeWithCmpanyNSaved,
    id: string
  ) {
    setOpeningState(updatedOpening);
  }

  return (
    <Card className="h-[70%] w-[90%] px-6 overflow-hidden flex flex-col justify-between min-w-xs ms-0 sm:ms-10">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-blue-700 w-full flex justify-between">
            {openingState.title}
          </h1>
          <div className="flex items-center gap-4 sm:gap-8  mt-2 text-sm ">
            <Badge className="bg-blue-600 text-white">
              {openingState.employment_type}
            </Badge>
            <span>|</span>
            <span>{openingState.location}</span>
            <span>|</span>
            <span>₹{openingState.salary}</span>
          </div>
        </div>
        <CardAction></CardAction>
      </div>

      <div className="flex-1 my-4 overflow-y-auto pr-2">
        <h2 className="text-lg font-semibold mb-1 ">Job Description</h2>
        <p className="text-sm/tight leading-6 text-gray-500 whitespace-pre-wrap">
          {openingState.description}
        </p>
      </div>

      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center border-t pt-4 gap-4">
        <div>
          <p className="text-sm text-muted-foreground">Company</p>
          <Button
            className="h-8 px-0 cursor-pointer w-max sm:my-2"
            variant={"link"}
            onClick={() =>
              (window.location.href = `/company/${openingState.companyId}`)
            }
          >
            <p className="font-medium text-base">
              {openingState.company?.company_name || "Unknown"}
            </p>
            {openingState.company?.company_logo && (
              <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full overflow-hidden border shadow">
                <Image
                  src={openingState.company.company_logo}
                  alt="Company Logo"
                  width={40}
                  height={40}
                  className="object-contain"
                />
              </div>
            )}
          </Button>
          <p className="text-xs text-muted-foreground mt-1">
            Opening ID: {openingState.id}
          </p>
        </div>
        <div className="flex justify-between gap-2 items-center w-full sm:flex-col sm:w-max">
          {user.company.id === openingState.companyId ? (
            <ViewApplicants opening={openingState} />
          ) : (
            <ApplyButton opening={openingState} hasApplied={hasApplied}/>
          )}
          <EditOptions opening={openingState} handleEdit={handleEdit} />
        </div>
      </div>
    </Card>
  );
}
