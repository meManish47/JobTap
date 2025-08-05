import prismaClient from "@/services/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const companyId = params.id;
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
      //@ts-ignore
      message: err.message,
    });
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const id = params.id;
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
