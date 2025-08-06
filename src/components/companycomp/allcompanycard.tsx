import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { company } from "../../../generated/prisma";
export default function AllCompanyCard({ company }: { company: company }) {
  return (
    <Card className="bg-[#1e1e20] hover:shadow-xl transition-all duration-300 text-white flex flex-col justify-between h-full">
      <CardHeader className="space-y-2">
        <div className="flex items-center gap-3">
          {company.company_logo ? (
            <div className="w-12 h-12 relative rounded-full overflow-hidden bg-white">
              <Image
                src={company.company_logo}
                alt="Company Logo"
                fill
                className="object-contain p-1"
              />
            </div>
          ) : (
            <div className="w-12 h-12 rounded-full bg-gray-700 flex items-center justify-center text-sm font-bold">
              {company.company_name?.[0] || "C"}
            </div>
          )}
          <div>
            <CardTitle className="text-lg">{company.company_name}</CardTitle>
            <p className="text-xs text-muted-foreground">ID: {company.id}</p>
          </div>
        </div>
      </CardHeader>

      <CardContent className="text-sm text-gray-300 line-clamp-4">
        {company.company_desc || "No description provided."}
      </CardContent>

      <CardFooter className="mt-auto pt-4">
        <Link href={`/company/${company.id}`} passHref>
          <Button
            variant="outline"
            className="w-full text-blue-500 hover:text-white hover:bg-blue-600"
          >
            View Details
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
