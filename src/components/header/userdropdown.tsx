"use client";
import { UserContext } from "@/app/(group)/layout";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useContext } from "react";
import { FaUser } from "react-icons/fa6";
import { toast } from "sonner";

export default function UserDropDown() {
  const context = useContext(UserContext);
  const user = context?.user;
  async function handleLogout() {
    const res = await fetch(`/api/logoutroute`);
    const x = await res.json();
    if (x.success) {
      window.location.href = "/";
    } else {
      toast.error("Try again");
    }
  }
  return (
    <main>
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger>
          <FaUser size={20} color={user ? "green" : "crimson"} />
        </DropdownMenuTrigger>
        {user ? (
          <DropdownMenuContent className="mt-4 me-10">
            <DropdownMenuLabel className="text-sm text-muted-foreground">
              {user.email}
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="cursor-pointer"
              onClick={() => {
                window.location.href = `/profile/${user.id}`;
              }}
            >
              Profile
            </DropdownMenuItem>
            {!user?.company && (
              <DropdownMenuItem
                className="cursor-pointer"
                onClick={() => {
                  window.location.href = "/add_company";
                }}
              >
                Add a company
              </DropdownMenuItem>
            )}
            <DropdownMenuItem className="cursor-pointer" onClick={handleLogout}>
              LogOut
            </DropdownMenuItem>
          </DropdownMenuContent>
        ) : (
          <DropdownMenuContent>
            <DropdownMenuItem
              className="cursor-pointer"
              onClick={() => (window.location.href = "/login")}
            >
              LogIn
            </DropdownMenuItem>
            <DropdownMenuItem
              className="cursor-pointer"
              onClick={() => {
                window.location.href = "/signup";
              }}
            >
              SignUp
            </DropdownMenuItem>
          </DropdownMenuContent>
        )}
      </DropdownMenu>
    </main>
  );
}
