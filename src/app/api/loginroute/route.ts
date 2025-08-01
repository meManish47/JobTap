import prismaClient from "@/services/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json();
  try {
    const user = await prismaClient.user.findUnique({
      where: {
        email: body.email,
      },
    });
    console.log(user);
    if (user?.password === body?.password) {
      const res = NextResponse.json({
        success: true,
        user,
      });
      res.cookies.set("token", user?.email);
      return res;
    } else {
      return NextResponse.json({
        success: false,
        message: "Invalid Password",
      });
    }
  } catch (err) {
    return NextResponse.json({
      success: false,
      message: err,
    });
  }
}
