"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useEffect, useState } from "react";
import { openings, saved } from "../../../generated/prisma";
import { Button } from "../ui/button";
type SavedWithOpening = saved & {
  opening: openings;
};
export default function ShowProfileSavedOpenings({ id }: { id: string }) {
  const [saved, setSaved] = useState<SavedWithOpening[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  useEffect(() => {
    async function getSaved() {
      setLoading(true);
      const res = await fetch(`/api/saved/${id}`);
      const x = await res.json();
      if (x.success) {
        setSaved(x.saved);
      } else {
        console.log("Error ", x.message);
        setSaved([]);
      }
      setLoading(false);
    }
    getSaved();
  }, []);
  if (loading) {
    return (
      <div className="h-full flex flex-col justify-center items-center">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }
  if (!saved.length) {
    return (
      <div className="text-sm text-muted-foreground p-4">
        You haven't applied to any jobs yet.
      </div>
    );
  }
  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-2">
        {saved.map((saved) => (
          <Card
            key={saved.id}
            className="h-37 shadow-[0px_0px_3px_rgb(255,255,255,0.1)]"
          >
            <CardHeader>
              <CardTitle className="text-base sm:text-lg">
                {saved.opening.title}
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm  space-y-1 flex flex-col">
              <div>
                <strong>Location:</strong> {saved.opening.location}
              </div>
              <div className="flex justify-between">
                <div>
                  <strong>Salary:</strong> ₹{saved.opening.salary}
                </div>
                <Button
                  variant={"link"}
                  className="cursor-pointer mb-10"
                  onClick={() =>
                    (window.location.href = `/opening/${saved.openingId}`)
                  }
                >
                  View
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
