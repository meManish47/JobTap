import prismaClient from "@/services/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const sp = req.nextUrl.searchParams;
  const q = sp.get("q");
  if (!q) {
    return NextResponse.json({
      success: true,
      suggestions: [],
    });
  }
  const sugg = await prismaClient.jobs.findMany({
    where: {
      job_title: {
        contains: q,
        mode: "insensitive",
      },
    },
    select: {
      id: true,
      job_title: true,
    },
    take: 20,
  });
  if (sugg) {
    return NextResponse.json({
      total: sugg.length,
      success: true,
      suggestions: sugg,
    });
  }
  return NextResponse.json({
    success: false,
    message: "Nothing came",
    suggestions: [],
  });
}
