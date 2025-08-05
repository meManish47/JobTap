//@ts-nocheck
"use client";
import { TbEdit } from "react-icons/tb";
import { Button } from "../ui/button";
import { MdDelete } from "react-icons/md";
import { useContext, useState } from "react";
import { UserContext } from "@/app/(group)/layout";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";

export default function EditOptions({ opening }) {
  const { user } = useContext(UserContext);
  const [title, setTitle] = useState("");
  const [employmentType, setEmployementType] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [salary, setSalary] = useState<number | undefined>(undefined);
  //   console.log(opening, "USRE_______---", user);
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
    
    
  }


  const isOwner =
    user?.company?.id && user?.company?.id === opening?.company?.id;

    if (!isOwner) return null;

  return (
    <div className="flex">
      <Dialog>
        <form>
          <DialogTrigger asChild>
            <Button className="h-6 w-max" variant={"ghost"}>
              <TbEdit size={14} />
            </Button>
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
              <Button variant={"outline"} className="cursor-pointer">
                Add
              </Button>
            </DialogFooter>
          </DialogContent>
        </form>
      </Dialog>
      <Button className="h-6 w-max" variant={"ghost"}>
        <MdDelete size={18} color="crimson" />
      </Button>
    </div>
  );
}
