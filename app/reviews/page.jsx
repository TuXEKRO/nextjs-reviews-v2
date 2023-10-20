import Link from "next/link";
import Heading from "@/components/Heading";
import { getReviews } from "@/lib/reviews";

export default async function ReviewsPage() {
    const reviews = await getReviews();
    //console.log(reviews);
    return (
        <>
            <Heading>Reviews</Heading>
            <p>Here listed all the reviews.</p>
            <ul className="flex flex-row flex-wrap gap-3">
                {reviews.map((review) => (
                    <li key={review.slug}
                        className="bg-white border w-80 rounded shadow hover:shadow-xl">
                        <Link href={`/reviews/${review.slug}`}>
                            <img src={review.image} alt="" width="320" height="180"
                            className="rounded-t"/>
                            <h2 className="py-1 text-center font-shantellSans font-semibold">
                                {review.title}
                            </h2>
                        </Link>
                    </li>

                ))}
            </ul>
        </>
    )
}