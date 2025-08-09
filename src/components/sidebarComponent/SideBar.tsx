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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "../ui/label";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "../ui/button";
export default function SideBar({
  handleGo,
}: {
  handleGo: (open: boolean) => void;
}) {
  const searchParams = useSearchParams();
  const q = searchParams.get("q");
  const jt = searchParams.get("jt");
  const rem = searchParams.get("rem");
  const searchRemote = Boolean(rem);
  const router = useRouter();
  const [jobtype, setJobtype] = useState(jt);
  const [remote, setRemote] = useState<boolean | undefined>(
    searchRemote || undefined
  );
  let url = `/?q=${q}&jt=${jobtype}&rem=${remote}`;
  // console.log(url);
  function handleClick() {
    handleGo(true);
    router.push(url);
  }
  return (
    <Card className="h-full ">
      <CardHeader>
        <CardTitle className="text-2xl">Filters</CardTitle>
      </CardHeader>
      <CardContent>
        <p>Job Type :</p>
        <Card className="mt-2 p-4">
          {" "}
          <RadioGroup
            value={jobtype}
            onValueChange={(value) => setJobtype(value)}
          >
            <div className="flex items-center gap-3">
              <RadioGroupItem value="Full-time" id="r1" />
              <Label htmlFor="r1">Full Time</Label>
            </div>
            <div className="flex items-center gap-3">
              <RadioGroupItem value="Part-time" id="r2" />
              <Label htmlFor="r2">Part-Time</Label>
            </div>
            <div className="flex items-center gap-3">
              <RadioGroupItem value="Contractor" id="r3" />
              <Label htmlFor="r3">Contractor</Label>
            </div>
          </RadioGroup>
        </Card>
      </CardContent>

      <CardContent>
        <p>Remote :</p>
        <Card className="mt-2 p-4">
          {" "}
          <RadioGroup
            className="flex flex-col gap-1"
            value={remote === undefined ? undefined : remote ? "yes" : "no"} // convert boolean to string
            onValueChange={(value) => setRemote(value === "yes")}
          >
            <div className="flex items-center gap-3">
              <RadioGroupItem value="yes" id="r1" />
              <Label htmlFor="r1">Yes</Label>
            </div>
            <div className="flex items-center gap-3">
              <RadioGroupItem value="no" id="r2" />
              <Label htmlFor="r2">No</Label>
            </div>
          </RadioGroup>
        </Card>
      </CardContent>

      <CardFooter className="flex gap-4">
        <Button
          className="cursor-pointer hover:scale-97 transition ease-in-out duration-200"
          onClick={handleClick}
        >
          Go
        </Button>
        <Button
          className="cursor-pointer hover:scale-97 transition ease-in-out duration-200"
          onClick={() => {
            router.push("/");
            setJobtype(null);
            setRemote(undefined);
          }}
          variant={"outline"}
        >
          Clear Filters
        </Button>
      </CardFooter>
    </Card>
  );
}
