import prismaClient from "@/services/prisma";
import { cookies } from "next/headers";

export async function getJobs() {
  const url =
    "https://jsearch.p.rapidapi.com/search?query=developer%20jobs%20in%20chicago&page=12&num_pages=10&country=us&date_posted=all";
  const options = {
    method: "GET",
    headers: {
      "x-rapidapi-key": "7741f50e45msh8ad9d06c8b24e09p1763e7jsn963e293dbb5b",
      "x-rapidapi-host": "jsearch.p.rapidapi.com",
    },
  };

  try {
    const response = await fetch(url, options);
    const result = await response.json();
    // console.log(result);
    return result.data;
  } catch (error) {
    console.error(error);
  }
}
export async function deleteCookies() {
  const userCookies = await cookies();
  userCookies.delete("token");
}
