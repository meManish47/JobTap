import prismaClient from "@/services/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body: {
    userId: string;
    openingId: string;
  } = await req.json();
  const isSaved = await prismaClient.saved.findUnique({
    where: {
      userId_openingId: { userId: body.userId, openingId: body.openingId },
    },
  });
  if (isSaved) {
    return NextResponse.json({
      isSaved: true,
    });
  }
  return NextResponse.json({
    isSaved: false,
  });
}
