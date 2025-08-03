"use client";
//@ts-nocheck
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
export default function DeleteCompanyButton({ id }: { id: string }) {
  const router = useRouter();
  async function handleClick() {
    const data = await fetch(`http://localhost:3000/api/company/${id}`, {
      method: "DELETE",
    });
    const res = await data.json();
    if (res.success) {
      console.log("DELETED");
      router.refresh();
    } else {
      console.log("OOPS");
    }
  }
  return (
    <Button
      variant={"destructive"}
      className="cursor-pointer"
      onClick={handleClick}
    >
      Delete Company
    </Button>
  );
}
