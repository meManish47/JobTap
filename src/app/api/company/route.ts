import { getUserFromCookies } from "@/helper/helper";
import prismaClient from "@/services/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const user = await getUserFromCookies();
  if (!user)
    return NextResponse.json({
      success: false,
      message: "Unauthorized",
    });
  const body = await req.json();
  const companyData = {
    company_name: body.company_name,
    company_desc: body.company_desc,
    company_logo: body.company_logo,
    owner_id: user.id,
  };
  try {
    const companyObj = await prismaClient.company.create({
      data: companyData,
    });
    if (!companyData) {
      return NextResponse.json({
        success: false,
        message: "Not created",
      });
    }
    return NextResponse.json({
      success: true,
      company: companyObj,
      owner: user.email,
    });
  } catch (err) {
    return NextResponse.json({
      success: false,
      msg: err,
    });
  }
}

export async function GET(req: NextRequest) {
  try {
    const companies = await prismaClient.company.findMany({
      include: {
        owner: true,
      },
    });
    if (companies) {
      return NextResponse.json({
        success: true,
        companies,
      });
    } else {
      return NextResponse.json({
        success: false,
        message: "No companies",
      });
    }
  } catch (err) {
    return NextResponse.json({
      success: false,
      message: (err as Error).message,
    });
  }
}
