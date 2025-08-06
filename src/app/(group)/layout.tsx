"use client";
import { AppSidebar } from "@/components/app-sidebar";
import HeaderComponent from "@/components/header/header";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { createContext, useEffect, useState } from "react";
import { Toaster } from "sonner";
import { company } from "../../../generated/prisma";
export type UserType = {
  id: string;
  email: string;
  role: string;
  password: string;
  company: {
    id: string;
    owner_id: string;
    company_name: string;
    company_logo: string;
    company_desc: string;
  };
};

export type UserContextType = {
  user: (UserType & { company: company }) | null;
  setUser: (user: (UserType & { company: company }) | null) => void;
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
        <Toaster />
      </UserContext.Provider>
    </div>
  );
}
