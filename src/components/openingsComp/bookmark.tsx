"use client";
import { useContext, useEffect, useState } from "react";
import { IconButton } from "@/components/animate-ui/buttons/icon";
import { Bookmark } from "lucide-react";
import { openings } from "../../../generated/prisma";
import { UserContext } from "@/app/(group)/layout";
import { toast } from "sonner";
export default function BookmarkComponent({ opening }: { opening: openings }) {
  const [clicked, setClicked] = useState(false);
  const context = useContext(UserContext);
  const user = context?.user;
  const [issaved, setIsSaved] = useState<boolean>(false);

  useEffect(() => {
    if (!user) return;

    async function isSaved() {
      const res = await fetch("/api/saved/isSaved", {
        method: "POST",
        body: JSON.stringify({ userId: user!.id, openingId: opening.id }),
      });
      const x = await res.json();
      if (x.isSaved) {
        setIsSaved(true);
      }
      console.log("SVED OR NOT", issaved);
    }
    isSaved();
  }, [issaved]);
  if (!user) return null;
  const data: { userId: string; openingId: string } = {
    userId: user!.id,
    openingId: opening.id,
  };
  async function handleClick() {
    const res = await fetch(`/api/saved`, {
      method: "POST",
      body: JSON.stringify(data),
    });
    const x = await res.json();
    if (x.success) {
      toast.success(x.message);
    } else {
      toast.error(x.message);
    }
  }
  return (
    <div>
      <IconButton
        icon={Bookmark}
        active={issaved}
        onClick={() => {
          setClicked(!clicked);
          handleClick();
        }}
        size="md"
      />
    </div>
  );
}
