//@ts-nochec
import { getUserFromCookies } from "@/helper/helper";
import prismaClient from "@/services/prisma";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
export async function GET(req: NextRequest) {
  const userData= await getUserFromCookies();
  if (!userData) {
    return NextResponse.json({
      success: false,
      user: "User not found",
    });
  }
 
  const data = userData;
  return NextResponse.json({
    success: true,
    user: data,
  });
}
