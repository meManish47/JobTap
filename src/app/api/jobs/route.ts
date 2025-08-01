import { getAllJobsFromDb } from "@/app/actions/prismaActions";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const jobs = await getAllJobsFromDb("");
  if (jobs.success) {
    return NextResponse.json({
      success: true,
      data: jobs.jobs,
    });
  } else {
    return NextResponse.json({
      success: false,
      data: [],
    });
  }
}
