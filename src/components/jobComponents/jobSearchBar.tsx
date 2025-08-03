//@ts-nocheck
"use client";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useRouter } from "next/navigation";
export default function JobSearchBar() {
  const [inputVal, setInputVal] = useState("");
  const router = useRouter();
  const [suggestions, setSuggestions] = useState([]);
  // const [count, setCount] = useState(0);
  function handleClick() {
    router.push(`/?q=${inputVal}`);
  }
  let debounceTimeout;

  useEffect(() => {
    async function getSugg() {
      const res = await fetch(
        `http://localhost:3000/api/jobs/suggestions?q=${inputVal}`
      );
      const data = await res.json();
      setSuggestions(data.suggestions);
    }

    debounceTimeout = setTimeout(() => {
      getSugg();
      // setCount(count + 1);
    }, 500);
    return () => {
      clearTimeout(debounceTimeout);
    };
  }, [inputVal]);
  return (
    <div className="flex w-full max-w-sm items-center gap-2">
      {/* {count} */}
      <div className="flex flex-col relative h-full ">
        <Input
          type="email"
          placeholder="Search jobs....."
          value={inputVal}
          onChange={(e) => {
            setInputVal(e.target.value);
          }}
        />
        {inputVal && suggestions && (
          <div className="flex flex-col absolute max-h-80 overflow-y-auto overflow-x-scroll w-full bg-[#09090B] border border-[#2F3032] rounded-xl z-10 top-10">
            {suggestions.map((item) => {
              return (
                <div
                  key={item.id}
                  className="flex items-center h-10 w-full  text-sm px-2 font-normal tracking-wide truncate hover:bg-[#1E1E20] cursor-pointer"
                >
                  {item.job_title}
                </div>
              );
            })}
          </div>
        )}
      </div>
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
