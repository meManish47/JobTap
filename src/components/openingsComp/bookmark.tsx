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
}: {
  opening: openings;
  isSaved: boolean;
}) {
  const [clicked, setClicked] = useState(false);
  const [isSave, setIsSave] = useState(isSaved);
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
    } else {
      toast.error(x.message);
    }
  }
  console.log(isSave);
  return (
    <div>
      <IconButton
        icon={Bookmark}
        active={isSave}
        className={`transition-transform duration-300 ${
          isSave ? "scale-115 text-blue-500" : "scale-100"
        }`}
        onClick={() => {
          const newState = !isSave;
          setIsSave(newState);
          handleClick();
        }}
        size="md"
      />
    </div>
  );
}
