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
export type ApplicationsWithOpening = application & {
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
  function handleApplicationAfterDelete(
    applications: ApplicationsWithOpening,
    id: string
  ) {
    setApplications((prev) => prev.filter((app) => app.id !== id));
  }
  if (loading) {
    return (
      <div className="h-full flex flex-col justify-center items-center">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }
  if (!applications.length) {
    return (
      <div className="text-sm text-muted-foreground p-4">
        You haven't applied to any jobs yet.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {applications.map((application) => (
          <Card
            key={application.id}
            className="flex flex-col justify-between shadow-[0px_0px_3px_rgb(255,255,255,0.1)]"
          >
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
                    handleApplicationAfterDelete={handleApplicationAfterDelete}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
