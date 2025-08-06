import prismaClient from "@/services/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const p = await params;
  const openingId = p.id;
  if (!openingId) {
    return NextResponse.json({
      success: false,
      message: "Invalid Opening ID",
    });
  }
  try {
    const applicants = await prismaClient.application.findMany({
      where: {
        openingsId: openingId,
      },
      include: {
        user: true,
      },
    });
    if (applicants) {
      return NextResponse.json({
        success: true,
        applicants,
      });
    } else {
      return NextResponse.json({
        success: false,
        message: "No applicants",
      });
    }
  } catch (err) {
    return NextResponse.json({
      success: false,

      message: (err as Error).message,
    });
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  try {
    await prismaClient.application.delete({
      where: { id },
    });
    return NextResponse.json({
      success: true,
    });
  } catch (err) {
    return NextResponse.json({
      success: false,
    });
  }
}
