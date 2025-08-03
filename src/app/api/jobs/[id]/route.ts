import prismaClient from "@/services/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const url = req.nextUrl.pathname;
  const id = url.split("/api/jobs/")[1];
  const job = await prismaClient.jobs.findUnique({
    where: {
      id,
    },
  });
  if (job) {
    return NextResponse.json({
      success: true,
      job,
    });
  } else {
    return NextResponse.json({
      success: false,
      job: [],
    });
  }
}
