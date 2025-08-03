//@ts-nochec
import { getUserFromCookies } from "@/helper/helper";
import prismaClient from "@/services/prisma";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
export async function GET(req: NextRequest) {
  const userfromCookie = await getUserFromCookies();
  if (!userfromCookie) {
    return NextResponse.json({
      success: false,
      user: "User not found",
    });
  }
  const userId = userfromCookie.id;
  const user = await prismaClient.user.findUnique({
    where: {
      id: userId,
    },
    omit: {
      password: true,
    },
  });
  const company = await prismaClient.company.findUnique({
    where: {
      owner_id: userId,
    },
  });
  const data = {
    ...user,
    company,
  };
  return NextResponse.json({
    success: true,
    user: data,
  });
}
