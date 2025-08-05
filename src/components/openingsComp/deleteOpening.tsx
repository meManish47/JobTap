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
import { MdDelete } from "react-icons/md";
import { Button } from "../ui/button";
import { toast } from "sonner";
export default function DeleteOpening({ id }: { id: string }) {
  async function handleDelete() {
    const data = await fetch(
      `http://localhost:3000/api/company/opening/${id}`,
      {
        method: "DELETE",
      }
    );
    const res = await data.json();
    if (res.success) {
      toast.success("Deleted");
      window.location.href = `/openings`;
    } else {
      toast.error("error");
    }
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button className="h-6 w-max" variant={"ghost"}>
          <MdDelete size={18} color="crimson" />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            opening.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="cursor-pointer">
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={handleDelete}
            className="bg-red-400 cursor-pointer"
          >
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
