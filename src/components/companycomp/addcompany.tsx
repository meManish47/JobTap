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
import { Textarea } from "@/components/ui/textarea";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";
export default function AddCompanyForm() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [logo, setLogo] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  async function handleClick() {
    setLoading(true);
    const data = {
      company_name: name,
      company_desc: description,
      company_logo: logo,
    };
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/company`, {
      method: "POST",
      body: JSON.stringify(data),
    });
    const x = await res.json();
    console.log(x);
    if (x.success) {
      toast.success("Company created.", { duration: 2000 });
      window.location.href = "/";
    } else toast.error("Something went wrong!", { duration: 2000 });
    setLoading(false);
  }

  return (
    <div className="h-screen w-full flex justify-center items-start py-4 ">
      {" "}
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle className="text-muted-foreground text-lg underline">
            Add company details
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form method="POST">
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="name">Company Name</Label>
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

              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="logo">Company logo URL</Label>
                </div>
                <Input
                  id="logo"
                  type="text"
                  required
                  placeholder="Logo URL"
                  value={logo}
                  onChange={(e) => {
                    setLogo(e.target.value);
                  }}
                />
              </div>
            </div>
            <CardFooter className="flex-col gap-2 mt-4">
              <Button
                type="submit"
                disabled={loading}
                className="w-full cursor-pointer"
                onClick={(e) => {
                  handleClick();
                }}
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
