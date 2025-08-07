"use client";

import CompanyCard from "@/components/companycomp/CompanyCard";
import ReviewTab from "@/components/companycomp/reviewcomponent";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { company, User } from "../../../../../generated/prisma";
import LoaderComponent from "@/components/sidebarComponent/loadingcomp";
type CompanyWithOwner = {
  company: company;
  owner: User;
};
export default function Page() {
  const { id } = useParams();
  const [info, setInfo] = useState<CompanyWithOwner | null>(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(true);
    if (!id) return;

    async function getInfo() {
      const res = await fetch(`/api/company/${id}`, {
        cache: "no-store",
      });
      const data = await res.json();
      setInfo(data.data);
      setLoading(false);
    }

    getInfo();
  }, [id]);
  if (loading) {
    return <LoaderComponent />;
  }
  if (!id || id === "undefined" || !info) {
    return (
      <div className="h-screen w-screen flex justify-center items-center text-lg text-muted-foreground ">
        No company found :/
      </div>
    );
  }

  return (
    <div className="h-full w-full flex flex-col ps-5 pe-10 items-center">
      <CompanyCard data={info} />
      <ReviewTab company={info.company} />
    </div>
  );
}
