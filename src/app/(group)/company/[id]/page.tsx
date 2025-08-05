//@ts-nocheck
import CompanyCard from "@/components/companycomp/CompanyCard";
import DeleteCompanyButton from "@/components/companycomp/deletecompanybtn";
import ShowOpenings from "@/components/openingsComp/showopenings";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
export default async function Page({ params }) {
  const id = params.id;
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
      <div className="h-full w-full flex flex-col px-40">
        <CompanyCard data={info} />
        {/* <div className="scroll-m-20  text-4xl font-extrabold tracking-tight text-balance">
          {" "}
          Openings:
        </div>
        <div className="w-full h-full  flex flex-col ">
          <ShowOpenings />
        </div> */}
      </div>
    );
  }
}
