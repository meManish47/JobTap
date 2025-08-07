"use client";
import { useContext, useState } from "react";
import { IconButton } from "@/components/animate-ui/buttons/icon";
import { Bookmark } from "lucide-react";
import { openings } from "../../../generated/prisma";
import { UserContext } from "@/app/(group)/layout";
import { toast } from "sonner";

export default function BookmarkComponent({
  opening,
  isSaved,
  onBookmark,
}: {
  opening: openings;
  isSaved: boolean;
  onBookmark: (openingId: string) => void;
}) {
  const [clicked, setClicked] = useState(false);
  const context = useContext(UserContext);
  const user = context?.user;
  if (!user) return null;

  const data: { userId: string; openingId: string } = {
    userId: user.id,
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
      onBookmark(opening.id);
    } else {
      toast.error(x.message);
    }
  }

  return (
    <div>
      <IconButton
        icon={Bookmark}
        active={isSaved && clicked}
        onClick={() => {
          setClicked(!clicked);
          handleClick();
        }}
        size="md"
      />
    </div>
  );
}
