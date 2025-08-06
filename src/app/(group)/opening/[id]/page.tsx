import OpeningDetailCard from "@/components/openingsComp/openingdetailcard";
import { notFound } from "next/navigation";

export default async function Page({ params }: { params: { id: string } }) {
  const id = params.id;
  console.log(id);
  const data = await fetch(`http://localhost:3000/api/company/opening/${id}`);
  const res = await data.json();
  console.log(res);
  if (!res?.success) notFound();
  const opening = res.opening;
  console.log("opning", opening);
  return (
    <div className="h-screen w-screen flex p-10 justify-center items-start pb-28 min-w-sm ">
      <OpeningDetailCard opening={opening} />
    </div>
  );
}
