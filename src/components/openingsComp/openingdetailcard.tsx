"use client";

import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "../ui/card";
import { useContext } from "react";
import { UserContext } from "@/app/(group)/layout";
import EditOptions from "./editoptions";

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
      name: string;
      logo?: string;
    };
  };
};

export default function OpeningDetailCard({ opening }: OpeningType) {
  //@ts-ignore
  const { user } = useContext(UserContext);

  return (
    <Card className="h-[90%] w-full px-6 overflow-hidden flex flex-col justify-between">
      {/* Top Section */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-blue-700">
            {opening.title}
          </h1>
          <div className="flex items-center gap-2 mt-2 text-sm text-muted-foreground">
            <Badge className="bg-blue-600 text-white">
              {opening.employment_type}
            </Badge>
            <span>|</span>
            <span>{opening.location}</span>
            <span>|</span>
            <span>₹{opening.salary}</span>
          </div>
        </div>

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

      {/* Description */}
      <div className="flex-1 my-4 overflow-y-auto pr-2">
        <h2 className="text-lg font-semibold mb-1 text-muted-foreground">
          Description
        </h2>
        <p className="text-sm/tight leading-6 text-gray-500 whitespace-pre-wrap">
          {opening.description}
        </p>
      </div>

      {/* Bottom Section */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center border-t pt-4 gap-4">
        <div>
          <p className="text-sm text-muted-foreground">Company</p>
          <p className="font-medium text-base">
            {opening.company?.name || "Unknown"}
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            Opening ID: {opening.id}
          </p>
        </div>
        <div className="flex">
          <EditOptions opening={opening} />
          <Button
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-full cursor-pointer disabled:bg-red-400 disabled:line-through disabled:cursor-not-allowed"
            disabled={!user || !opening.open}
          >
            {opening.open ? "Apply Now" : "Closed"}
          </Button>
        </div>
      </div>
    </Card>
  );
}
