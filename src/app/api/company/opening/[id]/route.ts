//@ts-nocheck
import prismaClient from "@/services/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, { params }) {
  const id = params.id;
  const opening = await prismaClient.openings.findUnique({
    where: {
      id,
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
export async function POST(req: NextRequest, { params }) {
  const id = params.id;
  const body = await req.json();
  try {
    const updatedOpening = await prismaClient.openings.update({
      where: {
        id,
      },
      data: body,
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
      message: err.msg,
    });
  }
}
export async function DELETE(req: NextRequest, { params }) {
  const id = params.id;
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
