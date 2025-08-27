"use client";
import { useContext, useEffect, useState } from "react";
import { IconButton } from "@/components/animate-ui/buttons/icon";
import { Bookmark } from "lucide-react";
import { openings } from "../../../generated/prisma";
import { UserContext } from "@/app/(group)/layout";
import { toast } from "sonner";

export default function BookmarkComponent({
  opening,
  isSaved,
}: {
  opening: openings;
  isSaved: boolean;
}) {
  const [isSave, setIsSave] = useState(isSaved);
  const context = useContext(UserContext);
  const user = context?.user;
  useEffect(() => {
    setIsSave(isSaved);
  }, [isSaved]);
  if (!user) return null;

  const data = { userId: user.id, openingId: opening.id };

  async function handleClick() {
    const newState = !isSave;
    setIsSave(newState); // optimistic update

    try {
      const res = await fetch(`/api/saved`, {
        method: "POST", // always POST
        body: JSON.stringify(data),
      });

      const x = await res.json();
      if (x.success) {
        toast.success(x.message);
      } else {
        throw new Error(x.message);
      }
    } catch (err: any) {
      // rollback UI if API fails
      setIsSave(!newState);
      toast.error(err.message || "Something went wrong");
    }
  }

  return (
    <IconButton
      icon={Bookmark}
      active={isSave}
      className={`transition-transform duration-300 ${
        isSave ? "scale-115 text-blue-500" : "scale-100"
      }`}
      onClick={handleClick}
      size="md"
    />
  );
}
