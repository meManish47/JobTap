import prismaClient from "@/services/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  // console.log(req.nextUrl.pathname);
  const searchParams = req.nextUrl.searchParams;
  const searchQ = searchParams.get("q");
  const q = searchQ && searchQ !== "null" && searchQ !== "undefined" ? searchQ : "";
  const jt = searchParams.get("jt");
  const rem = searchParams.get("rem");
  let remote: undefined | boolean = undefined;
  if (rem === "true") remote = true;
  else if (rem == "false") remote = false;
  else remote = undefined;
  // if (jt) console.log("JTT");
  // else console.log("NOT JTT");
  // console.log("searchParams.get('q')->", q);
  // console.log("searchParams.get('rem')->", rem);
  // console.log("remote after logic->", remote);
  // console.log("searchParams.get('jt')->", jt);

  try {
    const jobs = await prismaClient.jobs.findMany({
      where: {
        OR: [
          { job_title: { contains: q, mode: "insensitive" } },
          {
            employer_name: { contains: q, mode: "insensitive" },
          },
        ],
        ...(jt !== undefined &&
          jt !== "null" &&
          jt !== "undefined" &&
          jt !== "" && { job_employment_type: jt }),
        ...(remote !== undefined && { job_is_remote: remote }),
      },
    });
    if (jobs) {
      const count = jobs.length;
      return NextResponse.json({
        success: true,
        count,
        jobs,
      });
    } else {
      return NextResponse.json({
        success: false,
        message: "No jobs found",
      });
    }
  } catch (err) {
    return NextResponse.json({
      success: false,
      err,
    });
  }
}
