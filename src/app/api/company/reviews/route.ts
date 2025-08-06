import prismaClient from "@/services/prisma";
import Error from "next/error";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { dataToAdd, ids } = body;
  console.log(dataToAdd, ids);
  try {
    const reviews = await prismaClient.review.create({
      data: {
        ...dataToAdd,
        userId: ids.userId,
        companyId: ids.companyId,
      },
    });
    if (reviews) {
      return NextResponse.json({
        success: true,
        reviews,
      });
    }
    return NextResponse.json({
      success: false,
      message: "Not created",
    });
  } catch (err) {
    return NextResponse.json({
      success: false,
      message: "Something Went wrong",
    });
  }
}

export async function GET(req: NextRequest) {
  try {
    const reviews = await prismaClient.review.findMany({
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
      message: "Something Went Wrong",
    });
  }
}
