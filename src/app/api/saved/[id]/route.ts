import prismaClient from "@/services/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  try {
    const saved = await prismaClient.saved.findMany({
      where: {
        userId: id,
      },
      include: {
        opening: true,
      },
    });
    if (saved) return NextResponse.json({ success: true, saved });
    return NextResponse.json({ success: false, message: "No saved openings" });
  } catch (err) {
    return NextResponse.json({
      success: false,
      message: (err as Error).message,
    });
  }
}
