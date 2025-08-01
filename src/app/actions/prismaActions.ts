//@ts-nocheck

"use server";
import prismaClient from "@/services/prisma";

// export async function addJobsFromApiIntoDb({ data }) {
//   try {
//     const jobs = await prismaClient.jobs.createMany({
//       data,
//     });
//     return {
//       success: true,
//     };
//   } catch (err) {
//     return {
//       success: false,
//       message: err,
//     };
//   }
// }

export async function addJobsFromApiIntoDb(data) {
  const Fields = [
    "job_id",
    "job_title",
    "job_employment_type",
    "job_apply_link",
    "job_description",
    "job_location",
    "job_is_remote",
    "employer_name",
    "employer_logo",
  ];

  const filteredData = data.map((job) => {
    const filteredJob = {};
    for (const key of Fields) {
      filteredJob[key] = job[key];
    }
    return filteredJob;
  });
  try {
    const result = await prismaClient.jobs.createMany({
      data: filteredData,
    });

    return {
      success: true,
      count: result.count,
    };
  } catch (err) {
    return {
      success: false,
      message: err,
    };
  }
}

export async function getAllJobsFromDb(
  searchVal: string,
  jobtype: string,
  remote: boolean
) {
  try {
    const jobs = await prismaClient.jobs.findMany({
      where: {
        job_title: { contains: searchVal, mode: "insensitive" },
         ...(jobtype && { job_employment_type: jobtype }),     // include only if jobtype is provided
        ...(remote !== undefined && { job_is_remote: remote }) 
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

export async function addJobInDb(data) {
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
