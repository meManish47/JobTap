import CompanyCard from "@/components/companycomp/CompanyCard";
import ReviewTab from "@/components/companycomp/reviewcomponent";

export default async function Page({
  params 
} : {
  params : Promise<{
    id : string
  }>
}) {
  const { id } = await params;
  // const id = params.id;
  // console.log("----------------------", typeof id);
  if (id === "undefined")
    return (
      <div className="h-screen w-screen flex justify-center items-center text-lg text-muted-foreground ">
        {" "}
        No company found :/{" "}
      </div>
    );
  else {
    const res = await fetch(`http://localhost:3000/api/company/${id}`);
    const data = await res.json();
    const info = data.data;
    if (!info) {
      return (
        <div className="h-screen w-screen flex justify-center items-center text-lg text-muted-foreground ">
          {" "}
          No company found :/{" "}
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
}
