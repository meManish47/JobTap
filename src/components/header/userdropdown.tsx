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
  const { user } = useContext(UserContext);
  async function handleLogout() {
    const res = await fetch("http://localhost:3000/api/logoutroute");
    const x = await res.json();
    if (x.success) {
      window.location.reload();
    } else {
      toast.error("Try again");
    }
  }
  return (
    <main>
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger>
          <FaUser size={20} />
        </DropdownMenuTrigger>
        {user ? (
          <DropdownMenuContent>
            <DropdownMenuLabel className="text-sm text-muted-foreground">
              {user.email}
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem>Billing</DropdownMenuItem>
            <DropdownMenuItem>Team</DropdownMenuItem>
            <DropdownMenuItem onClick={handleLogout}>LogOut</DropdownMenuItem>
          </DropdownMenuContent>
        ) : (
          <DropdownMenuContent>
            <DropdownMenuItem onClick={() => (window.location.href = "/login")}>
              LogIn
            </DropdownMenuItem>
            <DropdownMenuItem
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
