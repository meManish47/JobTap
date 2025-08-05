//@ts-nocheck
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
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import EditOptions from "./editoptions";
import Link from "next/link";
import { FaArrowRight } from "react-icons/fa";

export default function ShowOpenings() {
  const [openings, setOpenings] = useState([]);
  useEffect(() => {
    async function getOpen() {
      const openRes = await fetch("http://localhost:3000/api/company/opening");
      const x = await openRes.json();
      if (x.success) {
        console.log("------------", x.open);
        setOpenings(x.open);
        console.log(openings);
      } else {
        setOpenings([]);
      }
    }
    getOpen();
  }, []);

  return (
    <div className="flex h-full w-full flex-wrap px-4">
      {openings &&
        openings.map((opening) => {
          return (
            <Card
              key={opening.id}
              className="bg-black mt-8 max-w-[80%] ms-10 w-80 h-60 flex flex-col justify-between"
            >
              <CardHeader>
                <CardTitle>{opening.title}</CardTitle>
                <CardDescription>{opening.location}</CardDescription>
                <CardAction className="flex flex-col gap-1 items-end">
                  <Badge
                    variant="secondary"
                    className="bg-blue-500 text-cyan-300 dark:bg-blue-600 tracking-wide mx-2"
                  >
                    {opening.employment_type}
                  </Badge>
                  {/* EditOptions */}
                  <EditOptions opening={opening} />
                </CardAction>
              </CardHeader>
              <CardContent>
                <p>{opening.description}</p>
              </CardContent>
              <CardFooter className="flex justify-between">
                <p>₹{opening.salary}</p>
                <Button variant={"outline"}>
                  {opening.company.company_name}
                </Button>
                <Link href={`/opening/${opening.id}`}>
                  <Button className="w-full h-full flex items-center justify-center text-blue-600 hover:text-blue-800 transition-colors duration-200 cursor-pointer">
                    <FaArrowRight size={22} />
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          );
        })}
    </div>
  );
}
