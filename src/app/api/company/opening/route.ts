//@ts-nocheck
import { getUserFromCookies } from "@/helper/helper";
import prismaClient from "@/services/prisma";
import { NextRequest, NextResponse } from "next/server";
export async function POST(req: NextRequest) {
  const body = await req.json();
  const user = await getUserFromCookies();
  if (user?.company?.id !== body.companyId) {
    return NextResponse.json({
      success: false,
      message: "Not authorized!",
    });
  }
  try {
    const opening = await prismaClient.openings.create({
      data: body,
    });
    if (opening) {
      return NextResponse.json({
        success: true,
        opening,
      });
    }
    return NextResponse.json({
      success: false,
      message: "Not Created",
    });
  } catch (err) {
    return NextResponse.json({
      success: false,
      message: err.message,
    });
  }
}

export async function GET(req: NextRequest) {
  try {
    const openings = await prismaClient.openings.findMany({
      include: {
        company: true,
      },
    });
    if (openings) {
      return NextResponse.json({
        success: true,
        open: openings,
      });
    } else {
      return NextResponse.json({
        success: false,
        message: "Error",
      });
    }
  } catch (err) {
    return NextResponse.json({
      success: false,
      message: err.message,
    });
  }
}
