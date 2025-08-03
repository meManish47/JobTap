import { createToken } from "@/services/jwt";
import prismaClient from "@/services/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const userToCreate = {
    email: body.email,
    password: body.password,
  };

  const exists = await prismaClient.user.findFirst({
    where: {
      email: body.email,
    },
  });
  if (exists) {
    return NextResponse.json({
      success: false,
      message: "User already exists..",
    });
  }
  try {
    const user = await prismaClient.user.create({
      data: {
        ...userToCreate,
        role: "user",
      },
    });
    if (user) {
      const userToken = { id: user.id };
      const token = createToken(userToken);

      const res = NextResponse.json({
        success: true,
        user,
      });
      res.cookies.set("token", token);
      return res;
    }
    return NextResponse.json({
      success: false,
      message: "User not created...",
    });
  } catch (err) {
    return NextResponse.json({
      success: false,
      message: err,
    });
  }
}
