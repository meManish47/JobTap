"use client";
import { useContext, useEffect, useState } from "react";
import { Button } from "../ui/button";
import { UserContext } from "@/app/(group)/layout";
import { toast } from "sonner";
import { openings } from "../../../generated/prisma";
import { useRouter } from "next/navigation";
import { MdDelete } from "react-icons/md";
export default function ApplyButton({
  opening,
  hasApplied,
}: {
  opening: openings;
  hasApplied: boolean;
}) {
  const context = useContext(UserContext);
  const user = context?.user;
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [applied, setApplied] = useState(hasApplied);
  const [delLoading, setDelLoading] = useState(false);
  useEffect(() => {
    setApplied(hasApplied);
  }, [hasApplied]);

  async function refreshUser() {
    const res = await fetch("/api/current-user");
    const data = await res.json();
    if (data.success) {
      context?.setUser(data.user);
    }
  }
  async function handleApply() {
    setLoading(true);
    setDelLoading(false);
    const res = await fetch(`/api/company/opening/${opening.id}/apply`);
    const x = await res.json();
    if (x.success) {
      toast.success("Applied successfull");
      setApplied(true);
      await refreshUser();
      router.refresh();
    } else {
      toast.error(x.message);
    }
    setLoading(false);
  }

  async function handleDelete() {
    setDelLoading(true);
    const currentApplicationId = user?.application.find(
      (app) => app.openingsId === opening.id
    )?.id;

    if (!currentApplicationId) {
      toast.error("No application found to delete");
      return;
    }
    const res = await fetch(
      `/api/company/opening/applicants/${currentApplicationId}`,
      {
        method: "DELETE",
      }
    );
    const x = await res.json();
    if (x.success) {
      toast.success("Deleted!");
      await refreshUser();
      setApplied(false);
    } else {
      toast.error("Something went wrong!");
    }
    setDelLoading(true);
  }
  return (
    <div>
      {applied ? (
        <Button
          variant={"destructive"}
          className="w-28 cursor-pointer disabled:bg-red-400  text-xs sm:w-42 sm:text-base"
          onClick={handleDelete}
          disabled={delLoading}
        >
          {delLoading ? (
            <span className="loading loading-dots loading-md"></span>
          ) : (
            "Delete application"
          )}
        </Button>
      ) : (
        <Button
          className="bg-blue-600 hover:bg-blue-700 text-white  w-20 text-xs sm:w-28 sm:text-base px-6 py-2 rounded-full cursor-pointer  disabled:cursor-not-allowed"
          disabled={!user || !opening.open || loading}
          onClick={handleApply}
        >
          {loading ? (
            <span className="loading loading-dots loading-md"></span>
          ) : opening.open && user ? (
            "Apply Now"
          ) : (
            "Closed"
          )}
        </Button>
      )}
    </div>
  );
}
