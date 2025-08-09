"use client";
import HeaderComponent from "@/components/header/header";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { createContext, useEffect, useState } from "react";
import { Toaster } from "sonner";
import { application, company, saved, User } from "../../../generated/prisma";
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
  application: application[];
};

export type UserContextType = {
  user:
    | (UserType & { company: company; saved: saved; application: application[] })
    | null;
  setUser: (
    user:
      | (UserType & {
          company: company;
          saved: saved;
          application: application[];
        })
      | null
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
      const res = await fetch("/api/current-user");
      const data = await res.json();
      if (data.success) {
        setUser(data.user);
      }
    }
    getUser();
  }, []);
  return (
    <div
      className="overflow-x-hidden h-screen w-screen"
      suppressHydrationWarning
    >
      <UserContext.Provider
        value={{
          user,
          setUser,
        }}
      >
        <HeaderComponent fromLogin={false} user={user} />
        {children}
        <Toaster richColors />
      </UserContext.Provider>
    </div>
  );
}
