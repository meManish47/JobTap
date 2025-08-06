import { UserContext } from "@/app/(group)/layout";
import { useContext } from "react";
import { MdDelete } from "react-icons/md";
import { toast } from "sonner";

export default function DeleteApplication({ id }: { id: string }) {
  const context = useContext(UserContext);
  const user = context?.user;
  async function handleDelete() {
    const res = await fetch(
      `http://localhost:3000/api/company/opening/applicants/${id}`,
      {
        method: "DELETE",
      }
    );
    const x = await res.json();
    if (x.success) {
      toast.success("Deleted!");
      window.location.reload();
    } else {
      toast.error("Something went wrong!");
    }
  }
  if (user?.id !== id) {
    return null;
  }
  return (
    <MdDelete
      size={24}
      className="text-red-500 cursor-pointer"
      onClick={handleDelete}
    />
  );
}
