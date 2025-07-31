"use client";
import { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useRouter } from "next/navigation";
export default function JobSearchBar() {
  const [inputVal, setInputVal] = useState("");
  const router = useRouter();
  function handleClick() {
    router.push(`/?q=${inputVal}`);
  }
  return (
    <div className="flex w-full max-w-sm items-center gap-2">
      <Input
        type="email"
        placeholder="Search jobs....."
        value={inputVal}
        onChange={(e) => {
          setInputVal(e.target.value);
        }}
      />
      <Button
        type="submit"
        variant="outline"
        className="cursor-pointer"
        onClick={handleClick}
      >
        Search
      </Button>
    </div>
  );
}
