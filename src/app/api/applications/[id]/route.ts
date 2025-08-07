import prismaClient from "@/services/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  try {
    const applications = await prismaClient.application.findMany({
      where: {
        userId: id,
      },
      include: {
        openings: true,
      },
    });
    if (applications) {
      return NextResponse.json({
        success: true,
        applications,
      });
    }
    return NextResponse.json({
      success: false,
      message: "Not Found",
    });
  } catch (err) {
    return NextResponse.json({
      success: false,
      message: (err as Error).message,
    });
  }
}
