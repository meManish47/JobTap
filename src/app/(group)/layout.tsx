"use client";
import { AppSidebar } from "@/components/app-sidebar";
import HeaderComponent from "@/components/header/header";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { createContext, useEffect, useState } from "react";
import { Toaster } from "sonner";
import { company, saved, User } from "../../../generated/prisma";
type UserType = User & {
  company: {
    id: string;
    owner_id: string;
    company_name: string;
    company_logo: string;
    company_desc: string;
  };
  saved: {
    id: string;
    userId: string;
    openingId: string;
  };
};

export type UserContextType = {
  user: (UserType & { company: company; saved: saved }) | null;
  setUser: (
    user: (UserType & { company: company; saved: saved }) | null
  ) => void;
};
export const UserContext = createContext<UserContextType | null>(null);
export default function Laytout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [user, setUser] = useState<UserType | null>(null);
  useEffect(() => {
    async function getUser() {
      const res = await fetch("http://localhost:3000/api/current-user");
      const data = await res.json();
      if (data.success) {
        setUser(data.user);
      }
    }
    getUser();
  }, []);
  return (
    <div>
      <UserContext.Provider
        value={{
          user,
          setUser,
        }}
      >
        <HeaderComponent fromLogin={false} user={user} />
        {children}
        <Toaster richColors/>
      </UserContext.Provider>
    </div>
  );
}
