"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { IoMenu } from "react-icons/io5";
import { Button } from "../ui/button";
import { useState } from "react";
import { Separator } from "../ui/separator";

export default function ComapnyAndOpeningDropdown() {
  const [isOpen, setIsOpen] = useState(false);

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen} modal={false}>
      <DropdownMenuTrigger>
        <IoMenu size={20} color="gray" />
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="flex flex-col justify-center items-start "
        onClick={handleClose}
      >
        <Link href={`/company`}>
          <Button variant={"link"} className="cursor-pointer ">
            Companies
          </Button>
        </Link>

        <DropdownMenuSeparator />
        <Separator />
        <Link href={`/opening`}>
          <Button className="cursor-pointer" variant={"link"}>
            Openings
          </Button>
        </Link>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
