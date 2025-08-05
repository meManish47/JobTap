// @ts-nocheck
import AllCompanyCard from "@/components/companycomp/allcompanycard";
import CompanyCard from "@/components/companycomp/CompanyCard";
import { Suspense } from "react";
import { ImSpinner9 } from "react-icons/im";

export default async function AllCompaniesPage() {
  const res = await fetch("http://localhost:3000/api/company");
  const data = await res.json();
  const companies = data?.companies || [];

  if (!companies.length) {
    return (
      <div className="h-screen w-screen flex justify-center items-center text-lg text-muted-foreground">
        No companies found :/
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full px-10 md:px-24 py-10 bg-[#0f0f11]">
      <h1 className="text-2xl md:text-3xl font-bold text-white mb-8">
        Explore Companies
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {companies.map((company) => (
          <Suspense
            key={company.id}
            fallback={
              <div className="h-screen flex flex-col justify-center items-center">
                <ImSpinner9 className=" animate-spin text-3xl mb-4" />
                <h2 className="scroll-m-20 pb-2 text-2xl px-4 font-semibold tracking-tight first:mt-0 flex justify-center items-center">
                  Loading...
                </h2>
              </div>
            }
          >
            <AllCompanyCard company={company} />
          </Suspense>
        ))}
      </div>
    </div>
  );
}
