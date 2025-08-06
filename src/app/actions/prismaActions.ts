"use server";
import { jobs } from "../../../generated/prisma";
import prismaClient from "@/services/prisma";
export async function getAllJobsFromDb(
  searchVal: string,
  jobtype: string,
  remote: boolean
) {
  try {
    const jobs = await prismaClient.jobs.findMany({
      where: {
        job_title: { contains: searchVal, mode: "insensitive" },
        ...(jobtype && { job_employment_type: jobtype }), // include only if jobtype is provided
        ...(remote !== undefined && { job_is_remote: remote }),
      },
    });
    return {
      success: true,
      jobs,
    };
  } catch (err) {
    return {
      success: false,
      message: err,
    };
  }
}
export async function addJobInDb(data: jobs) {
  try {
    const job = await prismaClient.jobs.create({
      data,
    });
    if (data) {
      return {
        success: true,
        job: data,
      };
    } else {
      return { success: false, job: {} };
    }
  } catch (err) {
    return { success: false, message: err };
  }
}
