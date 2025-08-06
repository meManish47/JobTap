"use client";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useRouter } from "next/navigation";
import Link from "next/link";
type Suggestions = {
  id: string;
  job_title: string;
};
export default function JobSearchBar() {
  const [inputVal, setInputVal] = useState<string>("");
  const router = useRouter();
  const [suggestions, setSuggestions] = useState<Suggestions[]>([]);
  const [blur, setBlur] = useState(false);
  // const [count, setCount] = useState(0);
  function handleClick() {
    if (!inputVal) {
      return;
    }
    router.push(`/?q=${inputVal}`);
  }
  let debounceTimeout: ReturnType<typeof setTimeout>;

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
          onBlur={() =>
            setTimeout(() => {
              setBlur(true);
            }, 200)
          }
          onFocus={() => {
            setBlur(false);
          }}
          onChange={(e) => {
            setInputVal(e.target.value);
          }}
        />
        {inputVal && suggestions && !blur && (
          <div className="flex flex-col absolute max-h-80 overflow-y-auto  w-[110%] bg-[#09090B] border border-[#2F3032] rounded-xl z-10 top-10">
            {suggestions.map((item) => {
              return (
                <div key={item.id}>
                  <Link
                    href={`/jobs/${item.id}`}
                    className="flex items-center  h-10 w-full text-sm px-2 font-normal tracking-wide  hover:bg-[#1E1E20] cursor-pointer truncate"
                  >
                    {" "}
                    {item.job_title}
                  </Link>
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
