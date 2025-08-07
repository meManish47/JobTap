import OpeningDetailCard from "@/components/openingsComp/openingdetailcard";
import { OpeningsTypeWithCmpanyNSaved } from "@/components/openingsComp/showopenings";
import { notFound } from "next/navigation";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  // console.log(id);
  const data = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/company/opening/${id}`,
    {
      cache: "no-store",
    }
  );
  const res = await data.json();
  // console.log(res);
  if (!res?.success) notFound();
  const opening:OpeningsTypeWithCmpanyNSaved = res.opening;
  // console.log("opning", opening);
  return (
    <div className="h-screen w-screen flex py-10 justify-center items-start pb-28 min-w-sm  ">
      <OpeningDetailCard opening={opening} />
    </div>
  );
}
