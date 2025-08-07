import { getUserFromCookies } from "@/helper/helper";
import prismaClient from "@/services/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const parid = id;

  const company = await prismaClient.company.findUnique({
    where: {
      id: parid,
    },
  });
  if (!company) {
    return NextResponse.json({
      success: false,
      message: "No data found",
    });
  }
  const owner = await prismaClient.user.findUnique({
    where: {
      id: company?.owner_id,
    },
  });

  if (company) {
    return NextResponse.json({
      success: true,
      data: { company, owner },
    });
  } else {
    return NextResponse.json({
      success: false,
      company: [],
    });
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const {id}=await params
  const user = await getUserFromCookies();

  if (user?.company?.id == id) {
    await prismaClient.company.delete({
      where: {
        id,
      },
    });
    return NextResponse.json({
      success: true,
      message: "Deleted",
    });
  }
  return NextResponse.json({
    success: false,
    message: "Not Deleted ..",
  });
}
