import OpeningDetailCard from "@/components/openingsComp/openingdetailcard";
import { notFound } from "next/navigation";

export default async function Page({ params }) {
  const id = params.id;
  console.log(id);
  const data = await fetch(`http://localhost:3000/api/company/opening/${id}`);
  const res = await data.json();
  console.log(res);
  if (!res?.success) notFound();
  const opening = res.opening;
  console.log("opning", opening);
  return (
    <div className="h-screen w-full flex p-10 justify-center items-center pb-28 ">
      <OpeningDetailCard opening={opening} />
    </div>
  );
}
