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
  useEffect(() => {
    async function getApplications() {
      const res = await fetch(`/api/applications/${id}`);
      const x = await res.json();
      if (x.success) {
        setApplications(x.applications);
      } else {
        console.log("Error ", x.message);
      }
    }
    getApplications();
  }, []);
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
