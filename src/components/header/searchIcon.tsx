"use client";
import { useState } from "react";
import { IoSearch } from "react-icons/io5";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";

import { Button } from "@/components/ui/button";
import JobSearchBar from "../jobComponents/jobSearchBar";

export default function SearchIcon() {
  const [showSearchBar, setShowSearchBar] = useState(false);
  const [open, setOpen] = useState(false);

  return (
    <div className="block sm:hidden">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button variant="ghost" size="icon">
            <IoSearch size={20} />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[300px] p-2 block sm:hidden" align="start">
          <JobSearchBar />
        </PopoverContent>
      </Popover>
    </div>
  );
}
