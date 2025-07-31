import { Button } from "../ui/button";
import { Input } from "../ui/input";

export default function JobSearchBar() {
  return (
    <div className="flex w-full max-w-sm items-center gap-2">
      <Input type="email" placeholder="Search jobs....." />
      <Button type="submit" variant="outline" className="cursor-pointer">
        Search
      </Button>
    </div>
  );
}
