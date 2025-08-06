"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "../ui/button";
import ShowOpeningsOfCompany from "../openingsComp/showopeningsOfcompany";
import { useContext, useEffect, useState } from "react";
import { IoMdSend } from "react-icons/io";
import { UserContext } from "@/app/(group)/layout";
import { toast } from "sonner";
import ShowReviews from "./showReview";
import { review,User,company } from "../../../generated/prisma";
type ReviewWithUser =review&{
  user:User
}
export default function ReviewTab({ company }:{company:company}) {
  const context = useContext(UserContext);
  const user = context?.user
  const [review, setReview] = useState("");
  const [existingReviews, setExistingReviews] = useState<ReviewWithUser[]>([]);

  const fetchReviews = async () => {
    const res = await fetch(
      `http://localhost:3000/api/company/reviews/${company.id}`
    );
    const x = await res.json();
    if (x.success) setExistingReviews(x.reviews);
    else setExistingReviews([]);
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  async function handleClick() {
    if (!review.trim()) {
      toast.warning("Review cannot be empty");
      return;
    }

    const res = await fetch("http://localhost:3000/api/company/reviews", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        dataToAdd: { content: review },
        ids: { userId: user?.id, companyId: company.id },
      }),
    });
    const x = await res.json();
    if (x.success) {
      toast.success("Review created");
      setExistingReviews((prev) => [x.review, ...prev]);
      setReview("");
      fetchReviews();
    } else {
      console.error(x.message);
      toast.error(x.message);
    }
  }

  return (
    <Tabs defaultValue="review" className="w-[80%] min-w-xs">
      <TabsList>
        <TabsTrigger value="openings">Openings</TabsTrigger>
        <TabsTrigger value="review">Review</TabsTrigger>
      </TabsList>

      <TabsContent value="openings">
        <ShowOpeningsOfCompany id={company.id} />
      </TabsContent>

      <TabsContent value="review">
        <Textarea
          placeholder="Enter your review"
          value={review}
          onChange={(e) => setReview(e.target.value)}
          className="w-full my-1 min-w-xs"
        />
        <Button
          onClick={handleClick}
          className="bg-blue-500 text-white hover:bg-blue-600 mt-2 disabled:bg-red-600"
          disabled={!user}
        >
          Submit <IoMdSend />
        </Button>

        <ShowReviews reviews={existingReviews} />
      </TabsContent>
    </Tabs>
  );
}
