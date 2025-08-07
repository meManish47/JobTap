import Image from "next/image";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import DeleteCompanyButton from "./deletecompanybtn";
import AddOpeningButton from "../openingsComp/addOpenings";

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
  return (
    <div className="h-max w-full flex items-start mb-4  justify-center  px-4">
      <Card className="max-w-2xl w-full  shadow-xl  p-6 rounded-xl flex flex-col justify-between min-w-xs">
        <CardHeader className="flex flex-col items-center gap-4">
          <div className="w-24 h-24 rounded-full overflow-hidden border bg-white shadow">
            <Image
              src={company?.company_logo}
              alt="Company Logo"
              width={96}
              height={96}
              className="object-contain"
            />
          </div>

          <h1 className="text-2xl font-bold text-center text-blue-700">
            {company?.company_name}
          </h1>
        </CardHeader>

        <CardContent className="text-center h-4">
          <p className="text-sm text-muted-foreground whitespace-pre-wrap leading-2">
            {company?.company_desc}
          </p>
        </CardContent>

        <CardFooter className="flex flex-col gap-2 items-center text-sm  border-t pt-4">
          <div className="text-muted-foreground">Owned by:</div>
          <p className="font-medium text-xs sm:text-base">{owner?.email}</p>
          <Badge
            variant="outline"
            className="bg-gray-100 dark:bg-gray-800 text-xs"
          >
            Role: {owner?.role}
          </Badge>
          <div className="flex gap-2 h-9">
            <DeleteCompanyButton id={company.id} owner={owner} />
            <AddOpeningButton id={company.id} owner={owner} />
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
