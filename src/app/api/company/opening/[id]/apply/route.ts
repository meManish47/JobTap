import { getUserFromCookies } from "@/helper/helper";
import prismaClient from "@/services/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const p = await params;
  const openingId = p.id;
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
        openingsId:openingId,
        userId: user.id,
      },
    });
    if (existingApplication) {
      return NextResponse.json({
        success: false,
        message: "Already applied",
      });
    }
    const application = await prismaClient.application.create({
      data: {
        userId: user.id,
        openingsId: openingId,
      },
    });
    if (application) {
      return NextResponse.json({
        success: true,
        application,
      });
    } else {
      return NextResponse.json({
        success: false,
        message: "Not created",
      });
    }
  } catch (err) {
    return NextResponse.json({
      success: false,
      message: (err as Error).message,
    });
  }
}
