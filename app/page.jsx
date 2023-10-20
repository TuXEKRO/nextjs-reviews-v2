import { getFeaturedReview } from "@/lib/reviews";
import Link from "next/link";
import Heading from "@/components/Heading";

export default async function HomePage() {
    console.log("[HomePage] rendering");
    const review = await getFeaturedReview()
    return (
        <>
            <Heading>Indie Gamer</Heading>
            <p>Only the best indie games, reviewed for you.</p>
            
            <div className="bg-white border w-80 rounded shadow hover:shadow-xl sm:w-full">
                <Link href={`reviews/${review.slug}`}
                    className="flex flex-col sm:flex-row">
                        <img src={review.image} alt="" width="320" height="180"
                        className="rounded-t sm:rounded-l sm:rounded-r-none"/>
                        <h2 className="py-1 text-center font-shantellSans font-semibold sm:px-2">
                            {review.title}
                        </h2>
                </Link>
            </div>
        </>
    )
}