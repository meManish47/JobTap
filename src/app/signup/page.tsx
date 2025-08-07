"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-dropdown-menu";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

export default function Page() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  async function handleClick() {
    const data = {
      email,
      password,
    };
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/signup`, {
      method: "POST",
      body: JSON.stringify(data),
    });
    const x = await res.json();
    if (x.success) {
      toast.success("Success");
      console.log(x.user);
    } else {
      toast.error(x.message);
      console.log(x.message);
    }
  }
  return (
    <main className="h-screen w-screen flex flex-col pt-20 justify-start">
      {/* <HeaderComponent fromLogin={true} /> */}
      <div className="h-[20%] w-full flex justify-center items-center  ">
        <h1 className="scroll-m-20 text-center text-5xl font-extrabold tracking-wide text-balance">
          SignUp
        </h1>
      </div>
      <div className="w-screen h-full flex flex-col justify-start items-center ">
        <Card className="w-full max-w-sm">
          <CardHeader>
            <CardTitle className="mt-3">Enter your details</CardTitle>
            <CardAction>
              <Button
                variant="link"
                className="cursor-pointer"
                onClick={() => router.push("/login")}
              >
                Login
              </Button>
            </CardAction>
          </CardHeader>
          <CardContent>
            <form>
              <div className="flex flex-col gap-6">
                <div className="grid gap-2">
                  <Label>Email</Label>
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
                  <div className="flex items-center">
                    <Label>Password</Label>
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
