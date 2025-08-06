"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { useState } from "react";
import { Button } from "../ui/button";
import { toast } from "sonner";

export default function ForgotPassword() {
  const [inputVal, setInputVal] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  async function handleSubmit() {
    const data: { email: string; password: string } = {
      email,
      password: inputVal,
    };
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/loginroute/forgotpassword`,
      { cache: "no-store", method: "POST", body: JSON.stringify(data) }
    );
    const x = await res.json();
    if (x.success) {
      toast.success("Password changed!", { duration: 2000 });
      window.location.reload();
    } else {
      toast.success(x.message);
    }
  }
  return (
    <Dialog modal={false}>
      <DialogTrigger className="text-xs underline cursor-pointer">
        Forgot password?
      </DialogTrigger>
      <DialogContent className="w-100 ">
        <DialogHeader>
          <DialogTitle className="mb-5">Change you password</DialogTitle>
          <DialogDescription className="flex flex-col gap-4">
            <Label>Enter email</Label>
            <Input
              id="email"
              type="email"
              required
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Label>Enter new password</Label>
            <Input
              id="password"
              type="password"
              required
              placeholder="Password"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
            />
            <Button onClick={handleSubmit} color="" variant={"outline"}>
              Submit
            </Button>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
