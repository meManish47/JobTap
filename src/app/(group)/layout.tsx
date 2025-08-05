//@ts-nocheck
"use client";
import { AppSidebar } from "@/components/app-sidebar";
import HeaderComponent from "@/components/header/header";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { createContext, useEffect, useState } from "react";
import { Toaster } from "sonner";
export const UserContext = createContext();
export default function Laytout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [user, setUser] = useState(null);
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
        <HeaderComponent fromLogin={false} user={user}/>
        {children}
        <Toaster />
      </UserContext.Provider>
    </div>
  );
}
