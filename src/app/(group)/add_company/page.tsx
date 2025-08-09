import AddCompanyForm from "@/components/companycomp/addcompany";
import HeaderComponent from "@/components/header/header";
import { Button } from "@/components/ui/button";
import { getUserFromCookies } from "@/helper/helper";
import Link from "next/link";

export default async function AddCompanyPage() {
  const user = await getUserFromCookies();
  if (!user) {
    return (
      <div className="h-screen w-screen flex justify-center items-center text-muted-foreground text-lg ">
        No user. Please login first
        <Link href={"/login"}>
          <Button
            variant={"link"}
            className="text-lg font-semibold cursor-pointer"
          >
            Login
          </Button>
        </Link>
      </div>
    );
  }
  return (
    <main className="h-full w-screen flex flex-col ">
      <div className="h-full w-full flex justify-center items-center  mt-4">
        <h1 className="scroll-m-20 text-center text-4xl font-extrabold tracking-wide text-balance">
          <span className="text-muted-foreground font-bold">Uplaod your </span>
          Company
        </h1>
      </div>
      <AddCompanyForm />
    </main>
  );
}
