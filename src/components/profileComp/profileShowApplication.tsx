"use client";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { useEffect, useState } from "react";
import { application, openings } from "../../../generated/prisma";
import DeleteApplication from "../applicationComp/deleteapplication";
import LoaderComponent from "../sidebarComponent/loadingcomp";
import { ImSpinner9 } from "react-icons/im";

type Props = {
  id: string;
};
type ApplicationsWithOpening = application & {
  openings: openings;
};
export default function ProfileShowApplicationsComponent({ id }: Props) {
  const [applications, setApplications] = useState<ApplicationsWithOpening[]>(
    []
  );
  const [loading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    async function getApplications() {
      setLoading(true);
      const res = await fetch(`/api/applications/${id}`);
      const x = await res.json();
      if (x.success) {
        setApplications(x.applications);
      } else {
        console.log("Error ", x.message);
        setApplications([]);
      }
      setLoading(false);
    }
    getApplications();
  }, []);
  if (loading) {
    return (
      <div className="h-full flex flex-col justify-center items-center">
        <ImSpinner9 className=" animate-spin text-3xl mb-4" />
        <h2 className="scroll-m-20 pb-2 text-2xl px-4 font-semibold tracking-tight first:mt-0 flex justify-center items-center">
          Loading...
        </h2>
      </div>
    );
  }

  const len = applications.length;
  console.log(len);
  if (!applications.length) {
    return (
      <div className="text-sm text-muted-foreground p-4">
        You haven't applied to any jobs yet.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {applications.map((application) => (
        <Card key={application.id}>
          <CardHeader>
            <CardTitle className="text-base sm:text-lg">
              {application.openings!.title}
            </CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground space-y-1 flex flex-col">
            <div>
              <strong>Location:</strong> {application.openings!.location}
            </div>
            <div className="flex justify-between">
              <div>
                <strong>Salary:</strong> ₹{application.openings!.salary}
              </div>
              <div>
                <DeleteApplication
                  id={application.id}
                  userId={application.userId}
                />
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
