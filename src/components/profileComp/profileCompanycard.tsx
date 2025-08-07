"use client";
import Image from "next/image";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import AddOpeningButton from "../openingsComp/addOpenings";
import DeleteCompanyButton from "../companycomp/deletecompanybtn";

type CompanyData = {
  data: {
    company: {
      id: string;
      owner_id: string;
      company_name: string;
      company_logo: string;
      company_desc: string;
    };
    owner: {
      id: string;
      email: string;
      password: string;
      role: string;
    };
  };
};

export default function ProfileCompanyCard({ data }: CompanyData) {
  const { company, owner } = data;

  return (
    <Card className="w-full border-0">
      <CardHeader className="flex items-center gap-4">
        <div className="w-14 h-14 rounded-full overflow-hidden border bg-white shadow">
          <Image
            src={company.company_logo}
            alt="Company Logo"
            width={56}
            height={56}
            className="object-contain"
          />
        </div>
        <div>
          <CardTitle className="text-base sm:text-lg">
            {company.company_name}
          </CardTitle>
          <p className="text-xs text-muted-foreground">{owner.email}</p>
          <Badge variant="outline" className="mt-1 text-[10px] sm:text-xs">
            Role: {owner.role}
          </Badge>
        </div>
      </CardHeader>

      <CardContent>
        <p className="text-sm text-muted-foreground whitespace-pre-wrap">
          {company.company_desc}
        </p>
      </CardContent>

      <CardFooter className="flex justify-end gap-2 pt-4 border-t">
        <DeleteCompanyButton id={company.id} owner={owner} />
        <AddOpeningButton id={company.id} owner={owner} />
      </CardFooter>
    </Card>
  );
}
