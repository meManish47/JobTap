//@ts-nocheck
import HeaderComponent from "@/components/header/header";
import { ThemeProvider } from "@/components/theme-provider";
import prismaClient from "@/services/prisma";
import { cookies } from "next/headers";
import { Toaster } from "sonner";
export default async function Laytout({ children }) {
  const userCookies = await cookies();
  const userEmail = decodeURIComponent(userCookies.get("token")?.value || "");

  const user = await prismaClient.user.findUnique({
    where: {
      email: userEmail,
    },
  });

  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <HeaderComponent fromLogin={false}  user ={user}/>
      {children}
      <Toaster />
    </ThemeProvider>
  );
}
