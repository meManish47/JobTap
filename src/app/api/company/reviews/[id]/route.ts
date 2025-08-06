import prismaClient from "@/services/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const p = await params
  const companyId = p.id;
  try {
    const reviews = await prismaClient.review.findMany({
      where: {
        companyId,
      },
      include: {
        company: true,
        user: true,
      },
    });
    if (reviews) {
      return NextResponse.json({
        success: true,
        reviews,
      });
    } else {
      return NextResponse.json({
        success: false,
        message: "No reviews found",
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
  const {id} = await params
  try {
    await prismaClient.review.delete({
      where: {
        id,
      },
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
