import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const userCookies = await cookies();
  userCookies.delete("token");
  return NextResponse.json({
    success: true,
  });
}
