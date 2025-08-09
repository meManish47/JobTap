import { UserContext } from "@/app/(group)/layout";
import { useContext } from "react";
import { MdDelete } from "react-icons/md";
import { toast } from "sonner";
import { application } from "../../../generated/prisma";
import { ApplicationsWithOpening } from "../profileComp/profileShowApplication";

export default function DeleteApplication({
  userId,
  id,
  handleApplicationAfterDelete,
}: {
  id: string;
  userId: string;
  handleApplicationAfterDelete: (applications: ApplicationsWithOpening,id:string) => void;
}) {
  const context = useContext(UserContext);
  const user = context?.user;
  async function handleDelete() {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/company/opening/applicants/${id}`,
      {
        method: "DELETE",
      }
    );
    const x = await res.json();
    if (x.success) {
      toast.success("Deleted!");
      handleApplicationAfterDelete(x.application,id);
    } else {
      toast.error("Something went wrong!");
    }
  }

  return (
    <MdDelete
      size={24}
      className="text-red-500 cursor-pointer"
      onClick={handleDelete}
    />
  );
}
