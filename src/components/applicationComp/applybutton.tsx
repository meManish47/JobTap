"use client";
import { useContext, useState } from "react";
import { Button } from "../ui/button";
import { UserContext } from "@/app/(group)/layout";
import { toast } from "sonner";
import { openings } from "../../../generated/prisma";
export default function ApplyButton({ opening }: { opening: openings }) {
  const context = useContext(UserContext);
  const user = context?.user;
  const [loading, setLoading] = useState(false);
  async function handleApply() {
    setLoading(true);
    const res = await fetch(
      `http://localhost:3000/api/company/opening/${opening.id}/apply`
    );
    const x = await res.json();
    if (x.success) {
      toast.success("Applied successfull");
      window.location.reload();
    } else {
      console.log(x.message);
      toast.error(x.message);
    }
    setLoading(false);
  }
  return (
    <Button
      className="bg-blue-600 hover:bg-blue-700 text-white w-28 px-6 py-2 rounded-full cursor-pointer disabled:bg-red-400 disabled:line-through disabled:cursor-not-allowed"
      disabled={!user || !opening.open || loading}
      onClick={handleApply}
    >
      {loading ? "Wait" : opening.open && user ? "Apply Now" : "Closed"}
    </Button>
  );
}
