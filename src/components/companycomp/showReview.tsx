"use client";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "../ui/badge";
import { BiLike } from "react-icons/bi";
import { FaRegCommentDots } from "react-icons/fa";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "@/app/(group)/layout";
import { MdDelete } from "react-icons/md";
import { toast } from "sonner";
import { ImSpinner9 } from "react-icons/im";
import { review, User } from "../../../generated/prisma";
import { Separator } from "../ui/separator";
type ReviewWithUser = review & {
  user: User;
};
export default function ShowReviews({
  reviews,
}: {
  reviews: ReviewWithUser[];
}) {
  const context = useContext(UserContext);
  const user = context?.user;
  //   console.log("---fnsjkfhkds", reviews);

  async function handleDelete(id: string) {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/company/reviews/${id}`,
      {
        method: "DELETE",
      }
    );
    const x = await res.json();
    if (x.success) {
      toast.success("Deleted");
      window.location.reload();
    } else {
      toast.success("Something went wrong!");
    }
  }

  return (
    <div className="mt-4 space-y-4">
      {reviews.map((review) => (
        <Card key={review?.id} className=" mb-4">
          <CardHeader>
            <CardTitle className="text-sm">
              <Badge className="bg-blue-700 text-white">
                {" "}
                {review?.user?.email || "Unknown"}
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="text-sm tracking-wider font-medium ms-6">
            {review?.content}
          </CardContent>
          <Separator />
          <CardFooter className="flex gap-12 ms-6 justify-start">
            <div className="flex gap-12">
              <BiLike
                size={22}
                className="text-blue-500 cursor-pointer active:text-blue-700"
              />
            </div>
            {user?.id === review?.user?.id && (
              <MdDelete
                size={24}
                className="me-4 text-red-500 cursor-pointer"
                onClick={() => {
                  handleDelete(review.id);
                }}
              />
            )}
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
