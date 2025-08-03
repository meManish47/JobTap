import Image from "next/image";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import DeleteCompanyButton from "./deletecompanybtn";

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

export default function CompanyCard({ data }: CompanyData) {
  const { company, owner } = data;
  console.log("data", company, owner);
  return (
    <div className="h-screen w-full flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 dark:from-[#05060a] dark:to-[#0e1218] px-4">
      <Card className="max-w-2xl w-full shadow-xl p-6 rounded-xl flex flex-col justify-between">
        <CardHeader className="flex flex-col items-center gap-4">
          {/* Company Logo */}
          <div className="w-24 h-24 rounded-full overflow-hidden border bg-white shadow">
            <Image
              src={company?.company_logo}
              alt="Company Logo"
              width={96}
              height={96}
              className="object-contain"
            />
          </div>

          {/* Company Name */}
          <h1 className="text-2xl font-bold text-center text-blue-700">
            {company?.company_name}
          </h1>
        </CardHeader>

        <CardContent className="text-center">
          <p className="text-sm text-muted-foreground whitespace-pre-wrap leading-6">
            {company?.company_desc}
          </p>
        </CardContent>

        <CardFooter className="flex flex-col gap-2 items-center text-sm mt-4 border-t pt-4">
          <div className="text-muted-foreground">Owned by:</div>
          <p className="font-medium">{owner?.email}</p>
          <Badge
            variant="outline"
            className="bg-gray-100 dark:bg-gray-800 text-xs"
          >
            Role: {owner?.role}
          </Badge>
          <DeleteCompanyButton id={company.id} />
        </CardFooter>
      </Card>
    </div>
  );
}
