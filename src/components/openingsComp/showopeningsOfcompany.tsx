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
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import EditOptions from "./editoptions";
import Link from "next/link";
import { FaArrowRight } from "react-icons/fa";
import { openings, company, saved } from "../../../generated/prisma";
import { OpeningsTypeWithCmpanyNSaved } from "./showopenings";
type OpeningWithCompany = openings & {
  company: company;
  saved: saved[];
};
export default function ShowOpeningsOfCompany({ id }: { id: string }) {
  const [openings, setOpenings] = useState<OpeningWithCompany[]>([]);
  useEffect(() => {
    async function getOpen() {
      const openRes = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/company/opening`
      );
      const x = await openRes.json();
      if (x.success) {
        // console.log("------------", x.open);
        setOpenings(x.open);
        // console.log(openings);
      } else {
        setOpenings([]);
      }
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

  return (
    <div className="flex h-full w-full flex-wrap gap-4">
      {openings
        .filter((opening) => opening.company?.id === id)
        .map((opening) => (
          <Card
            key={opening.id}
            className=" max-w-[80%] ms-2 w-80 h-60 flex flex-col justify-between"
          >
            <CardHeader>
              <CardTitle className="text-sm sm:text-xl truncate">
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
                {/* EditOptions */}
                <EditOptions opening={opening} handleEdit={handleEdit} />
              </CardAction>
            </CardHeader>

            <CardContent className="line-clamp-4 text-xs sm:text-sm">
              <p>
                {opening.description} Lorem ipsum dolor sit, amet consectetur
                adipisicing elit. Blanditiis eaque numquam placeat nostrum
                labore temporibus natus fugiat ut qui molestiae perferendis quae
                earum ullam, cumque doloribus est voluptatibus fugit modi.
              </p>
            </CardContent>

            <CardFooter className="flex justify-between">
              <p className="text-xs sm:text-sm">Salary : ₹{opening.salary}</p>
              <Button variant={"outline"}>
                {opening.company?.company_name || "Unknown"}
              </Button>
              <Link href={`/opening/${opening.id}`}>
                <Button className="flex items-center justify-center text-blue-600 hover:text-blue-800 transition-colors duration-200 cursor-pointer">
                  <FaArrowRight size={22} />
                </Button>
              </Link>
            </CardFooter>
          </Card>
        ))}
    </div>
  );
}
