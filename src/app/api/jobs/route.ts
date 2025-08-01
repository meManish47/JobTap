import { getAllJobsFromDb } from "@/app/actions/prismaActions";
import prismaClient from "@/services/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const jobs = await prismaClient.jobs.findMany();
  if (jobs) {
    return NextResponse.json({
      success: true,
      data: jobs,
    });
  } else {
    return NextResponse.json({
      success: false,
      data: [],
    });
  }
}
