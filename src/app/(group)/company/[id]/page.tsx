//@ts-nocheck
import CompanyCard from "@/components/companycomp/CompanyCard";
import DeleteCompanyButton from "@/components/companycomp/deletecompanybtn";

export default async function Page({ params }) {
  const id = params.id;
  console.log("----------------------", typeof id);
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
      <div>
        <CompanyCard data={info} />
      </div>
    );
  }
}
