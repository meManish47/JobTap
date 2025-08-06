"use client";

import { UserContext } from "@/app/(group)/layout";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useContext } from "react";
type IdwithOwner = {
  id: string;
  owner: {
    id: string;
    email: string;
    password: string;
    role: string;
  };
};
export default function DeleteCompanyButton({ id, owner }:IdwithOwner) {
  const context = useContext(UserContext);
  const user = context?.user
  const router = useRouter();
  async function handleClick() {
    const data = await fetch(`http://localhost:3000/api/company/${id}`, {
      method: "DELETE",
    });
    const res = await data.json();
    if (res.success) {
      console.log("DELETED");
      window.location.href = `/`;
    } else {
      console.log("OOPS");
    }
  }

  if (user?.id !== owner?.id) {
    return null;
  }
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="destructive" className="cursor-pointer">
          Delete
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            company.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="cursor-pointer">
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={handleClick}
            className="bg-red-400 cursor-pointer"
          >
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
