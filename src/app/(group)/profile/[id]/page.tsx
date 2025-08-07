"use client";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../layout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { company, User } from "../../../../../generated/prisma";
import ProfileCompanyCard from "@/components/profileComp/profileCompanycard";
import ProfileShowApplicationsComponent from "@/components/profileComp/profileShowApplication";
import { ImSpinner9 } from "react-icons/im";
type CompanyWithOwner = {
  company: company;
  owner: User;
};
export default function ProfilePage() {
  const context = useContext(UserContext);
  const user = context?.user;
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (user) {
      setLoading(false);
    }
  }, [user]);

  if (loading) {
    return (
      <div className="h-screen flex flex-col justify-center items-center">
        <ImSpinner9 className=" animate-spin text-3xl mb-4" />
        <h2 className="scroll-m-20 pb-2 text-2xl px-4 font-semibold tracking-tight first:mt-0 flex justify-center items-center">
          Loading...
        </h2>
      </div>
    );
  }

  if (!user) return null;
  const company_data: CompanyWithOwner = { company: user.company, owner: user };
  console.log("Profile page", user);
  return (
    <div className="p-4 sm:p-6 lg:p-10 max-w-7xl mx-auto space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Profile Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <p className=" text-sm mb-2">{user.email}</p>
          <Badge className=" text-xs">Role : {user.role}</Badge>
        </CardContent>
      </Card>
      <div className="flex flex-col lg:flex-row gap-6">
        <div className="flex flex-col gap-6 flex-1">
          <Card>
            <CardHeader>
              <CardTitle>Your Company</CardTitle>
            </CardHeader>
            <CardContent>
              {user.company ? (
                <ProfileCompanyCard data={company_data} />
              ) : (
                <div className="h-full w-full flex items-center justify-center">
                  No companies posted .{" "}
                  <Button
                    variant={"link"}
                    className="cursor-pointer"
                    onClick={() => {
                      window.location.href = "/add_company";
                    }}
                  >
                    Add one?
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Your Applications</CardTitle>
            </CardHeader>
            <CardContent>
              <ProfileShowApplicationsComponent id={user.id} />
            </CardContent>
          </Card>
        </div>

        <div className="flex-1 lg:max-w-md">
          <Card className="h-full">
            <CardHeader>
              <CardTitle>Saved Openings</CardTitle>
              <CardDescription>Jobs you’ve bookmarked</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="border rounded-lg p-4">
                  <h4 className="font-semibold text-lg">Opening Title</h4>
                  <p className="text-sm text-muted-foreground">
                    Description or quick info here.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
