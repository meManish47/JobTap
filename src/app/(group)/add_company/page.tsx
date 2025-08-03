import AddCompanyForm from "@/components/companycomp/addcompany";
import HeaderComponent from "@/components/header/header";

export default function AddCompanyPage() {
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
