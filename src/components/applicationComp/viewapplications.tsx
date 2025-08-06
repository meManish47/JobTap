"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import { useEffect, useState } from "react";
import { Card, CardAction, CardHeader } from "../ui/card";

import { ImSpinner9 } from "react-icons/im";
import DeleteApplication from "./deleteapplication";
type Applicanttype = {
  id: string;
  userId: string;
  openingsId: string;
  user: {
    id: string;
    email: string;
    password: string;
    role: string;
  };
};
type OpeningType = {
  opening: {
    id: string;
    title: string;
    description: string;
    location: string;
    salary: number;
    employment_type: string;
    open: boolean;
    company?: {
      company_name: string;
      logo?: string;
    };
  };
};
export default function ViewApplicants({ opening }: OpeningType) {
  const [applicants, setApplicants] = useState<Applicanttype[]>([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    async function getApplicants() {
      setLoading(true);
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/company/opening/applicants/${opening?.id}`
      );
      const x = await res.json();
      if (x.success) {
        setApplicants(x.applicants);
      } else {
        setApplicants([]);
      }
      setLoading(false);
    }
    getApplicants();
  }, []);
  //   console.log("papldajfhkuahrhfjkf", applicants);
  return (
    <Dialog>
      <DialogTrigger>
        <div>
          <Button variant={"outline"} className="cursor-pointer">
            View Applicants
          </Button>
        </div>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Applicants</DialogTitle>
        </DialogHeader>
        {loading ? (
          <div>
            <div className="h-full mt-4 flex flex-col justify-start items-center">
              <ImSpinner9 className=" animate-spin text-3xl mb-4" />
              <h2 className="scroll-m-20 pb-2 text-2xl px-4 font-semibold tracking-tight first:mt-0 flex justify-center items-center">
                Loading...
              </h2>
            </div>
          </div>
        ) : (
          <div className="overflow-y-auto ">
            {applicants.length === 0 ? (
              <div>No applicants</div>
            ) : (
              applicants.map((applicant) => {
                return (
                  <Card key={applicant.id} className="mb-2">
                    <CardHeader>
                      {applicant?.user?.email}
                      <CardAction className="h-10">
                        <DeleteApplication id={applicant.id} userId={applicant.userId} />
                      </CardAction>
                    </CardHeader>
                  </Card>
                );
              })
            )}
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
