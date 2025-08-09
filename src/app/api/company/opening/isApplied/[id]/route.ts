import { getUserFromCookies } from "@/helper/helper";
import prismaClient from "@/services/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const user = await getUserFromCookies();
  if (!user) {
    return NextResponse.json({
      success: false,
      message: "User is not authenticated",
    });
  }
  try {
    const existingApplication = await prismaClient.application.findFirst({
      where: {
        openingsId: id,
        userId: user.id,
      },
    });
    if (existingApplication) {
      return NextResponse.json({
        success: true,
      });
    } else {
      return NextResponse.json({
        success: false,
        message: "Not exists",
      });
    }
  } catch (err) {
    return NextResponse.json({
      success: false,
      message: (err as Error).message,
    });
  }
}
