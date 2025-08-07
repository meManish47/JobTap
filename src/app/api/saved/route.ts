import prismaClient from "@/services/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body: {
    userId: string;
    openingId: string;
  } = await req.json();
  try {
    const existing_saved = await prismaClient.saved.findUnique({
      where: {
        userId_openingId: {
          userId: body.userId,
          openingId: body.openingId,
        },
      },
    });
    if (existing_saved) {
      const del = await prismaClient.saved.delete({
        where: {
          userId_openingId: { userId: body.userId, openingId: body.openingId },
        },
      });
      if (del) {
        return NextResponse.json({
          success: true,
          message: "Removed",
        });
      } else {
        return NextResponse.json({
          success: false,
          message: "Something Went Wrong",
        });
      }
    }
    const saved = await prismaClient.saved.create({
      data: body,
    });
    if (saved) {
      return NextResponse.json({
        success: true,
        message: "Saved",
      });
    }
    return NextResponse.json({
      success: false,
      message: "Not saved, something went wrong!",
    });
  } catch (err) {
    return NextResponse.json({
      success: false,
      message: "Internal error occured",
    });
  }
}
