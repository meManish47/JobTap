//@ts-nocheck
import prismaClient from "@/services/prisma";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { decode } from "punycode";
export async function getUserFromCookies() {
  const userCookies = await cookies();
  const token = userCookies.get("token")?.value;

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

    const user = await prismaClient.user.findUnique({
      where: {
        id: decoded,
      },
      omit: {
        password: true,
      },
    });
    if (!user) return null;
    return user;
  } catch (err) {
    console.log(err);
    return null;
  }
}
