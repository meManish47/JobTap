import prismaClient from "@/services/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const p = await params;
  const id = p.id;
  const opening = await prismaClient.openings.findUnique({
    where: {
      id,
    },
    include: {
      company: true,
    },
  });
  if (opening) {
    return NextResponse.json({
      success: true,
      opening,
    });
  } else {
    return NextResponse.json({
      success: false,
      opening: [],
    });
  }
}
export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const body = await req.json();
  try {
    const updatedOpening = await prismaClient.openings.update({
      where: {
        id,
      },
      data: body,
      include: {
        company: true,
        saved: true,
      },
    });
    if (updatedOpening) {
      return NextResponse.json({
        success: true,
        opening: updatedOpening,
      });
    } else {
      return NextResponse.json({
        success: false,
        message: "Not updated",
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
    await prismaClient.openings.delete({
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
