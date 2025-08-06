"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import ForgotPassword from "@/components/forgetpasswordComp/forgotpassword";
export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  async function handleClick() {
    const res = await fetch("http://localhost:3000/api/loginroute", {
      method: "POST",
      body: JSON.stringify({
        email,
        password,
      }),
    });
    const data = await res.json();
    if (data?.success) {
      toast.success("Successfully Logged In!", { duration: 2000 });
      router.push("/");
    } else {
      toast.error(data.message);
    }
  }
  return (
    <main className="h-full w-screen flex flex-col pt-20">
      {/* <HeaderComponent fromLogin={true} /> */}
      <div className="h-[20%] w-full flex justify-center items-center  ">
        <h1 className="scroll-m-20 text-center text-5xl font-extrabold tracking-wide text-balance">
          Login
        </h1>
      </div>
      <div className="w-screen h-full flex justify-center items-center mt-20">
        <Card className="w-full max-w-sm">
          <CardHeader>
            <CardTitle className="mt-3">Login to your account</CardTitle>
            <CardAction>
              <Button
                variant="link"
                className="cursor-pointer"
                onClick={() => router.push("/signup")}
              >
                Sign Up
              </Button>
            </CardAction>
          </CardHeader>
          <CardContent>
            <form>
              <div className="flex flex-col gap-6">
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="m@example.com"
                    required
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                  />
                </div>
                <div className="grid gap-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password">Password</Label>
                    <ForgotPassword />
                  </div>
                  <Input
                    id="password"
                    type="password"
                    required
                    placeholder=""
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                    }}
                  />
                </div>
              </div>
            </form>
          </CardContent>
          <CardFooter className="flex-col gap-2">
            <Button
              type="submit"
              className="w-full cursor-pointer hover:scale-97 duration-200 transition"
              onClick={handleClick}
            >
              Login
            </Button>
          </CardFooter>
        </Card>
      </div>
    </main>
  );
}
