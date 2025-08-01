"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { jobs } from "../../../generated/prisma";
import { addJobInDb } from "@/app/actions/prismaActions";
export default function AddJobForm() {
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [remote, setRemote] = useState(false);
  const [employerName, setEmployerName] = useState("");
  const [loading, setLoading] = useState(false);
  async function handleClick() {
    setLoading(true);
    //@ts-ignore
    const data: jobs = {
      job_title: name,
      job_employment_type: type,
      job_description: description,
      job_location: location,
      job_is_remote: remote,
      employer_name: employerName,
    };
    console.log("DATA", data);

    const job = await addJobInDb(data);
    console.log(job);
    setLoading(false);
  }

  return (
    <div className="h-screen w-full flex justify-center items-start py-4 ">
      {" "}
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle className="text-muted-foreground text-lg underline">
            Add Job details
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form method="POST">
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="name">Job Name</Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Job name here"
                  required
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="type">Job Type</Label>
                </div>
                <Input
                  id="type"
                  type="text"
                  required
                  placeholder="Job type here"
                  value={type}
                  onChange={(e) => {
                    setType(e.target.value);
                  }}
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="description">Description</Label>
                </div>
                <Textarea
                  placeholder="Description here"
                  id="description"
                  value={description}
                  onChange={(e) => {
                    setDescription(e.target.value);
                  }}
                />
              </div>
              <div className="flex gap-10">
                <div className="flex flex-col gap-2">
                  <div className="flex items-center">
                    <Label htmlFor="location">Location</Label>
                  </div>
                  <Input
                    id="location"
                    type="text"
                    required
                    placeholder="Job Location"
                    value={location}
                    onChange={(e) => {
                      setLocation(e.target.value);
                    }}
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <div className="flex items-center">
                    <Label htmlFor="remote">Remote</Label>
                  </div>
                  <RadioGroup
                    defaultValue="no"
                    className="flex flex-col gap-1"
                    value={remote ? "yes" : "no"} // convert boolean to string
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
                </div>
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="emplyer_name">Employer Name</Label>
                </div>
                <Input
                  id="employer_name"
                  type="text"
                  required
                  placeholder="Employer Name"
                  value={employerName}
                  onChange={(e) => {
                    setEmployerName(e.target.value);
                  }}
                />
              </div>
            </div>
            <CardFooter className="flex-col gap-2 mt-4">
              <Button
                type="submit"
                disabled={loading}
                className="w-full cursor-pointer"
                onClick={(e)=>{ 
                  handleClick()}}
              >
                {loading ? "Wait" : "Add"}
              </Button>
            </CardFooter>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
