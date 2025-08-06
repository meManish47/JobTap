
"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { useContext, useState } from "react";
import { toast } from "sonner";
import { UserContext } from "@/app/(group)/layout";
import { User } from "../../../generated/prisma";
type IdwithOwner=
{id:string,
  owner:User
}
export default function AddOpeningButton({ id, owner }:IdwithOwner) {
  const context = useContext(UserContext)
  const user = context?.user
  const [title, setTitle] = useState("");
  const [employmentType, setEmployementType] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [salary, setSalary] = useState<number | undefined>(undefined);
  const [loading, setLoading] = useState(false);
  async function handleClick() {
    const data = {
      title,
      employment_type: employmentType,
      description,
      location,
      salary,
    };
    //console.log({ ...data, id });
    const dataToAdd = { ...data, companyId: id };
    const res = await fetch("http://localhost:3000/api/company/opening", {
      method: "POST",
      body: JSON.stringify(dataToAdd),
    });
    const x = await res.json();
    if (x.success) {
      toast.success("Created successfulyy!");
      window.location.reload();
    } else {
      toast.error(x.message);
      console.log(x.message);
    }
  }

  if (user?.id !== owner?.id) {
    return null;
  }
  return (
    <main>
      <Dialog>
        <form>
          <DialogTrigger asChild>
            <Button variant="outline">Add an opening</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Openings details</DialogTitle>
              <DialogDescription>
                Add details here. Click add when you&apos;re done.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4">
              <div className="grid gap-3">
                <Label>Title</Label>
                <Input
                  id="title"
                  name="title"
                  placeholder="Title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>
              <div className="grid gap-3">
                <Label>Description</Label>
                <Input
                  id="description"
                  name="description"
                  placeholder="description.."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
              <div className="flex justify-between">
                <div className="grid gap-3">
                  <Label>Location</Label>
                  <Input
                    id="location"
                    name="location"
                    placeholder="location.."
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                  />
                </div>
                <div className="grid gap-3">
                  <Label>Salary</Label>
                  <Input
                    id="salary"
                    name="salary"
                    placeholder="salary.."
                    type="number"
                    value={salary}
                    onChange={(e) => setSalary(Number(e.target.value))}
                  />
                </div>
              </div>
              <div className="grid gap-3">
                <Label>Employement Type</Label>
                <RadioGroup
                  value={employmentType}
                  onValueChange={(value) => setEmployementType(value)}
                >
                  <div className="flex items-center gap-3">
                    <RadioGroupItem value="Full-time" id="r1" />
                    <Label>Full Time</Label>
                  </div>
                  <div className="flex items-center gap-3">
                    <RadioGroupItem value="Part-time" id="r2" />
                    <Label>Part-Time</Label>
                  </div>
                  <div className="flex items-center gap-3">
                    <RadioGroupItem value="Contractor" id="r3" />
                    <Label>Contractor</Label>
                  </div>
                </RadioGroup>
              </div>
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
              </DialogClose>
              <Button
                variant={"outline"}
                className="cursor-pointer"
                onClick={handleClick}
              >
                Add
              </Button>
            </DialogFooter>
          </DialogContent>
        </form>
      </Dialog>
    </main>
  );
}
