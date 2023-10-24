import { getReviews } from "@/lib/reviews";
import Link from "next/link";
import Heading from "@/components/Heading";
import Image from "next/image";

export default async function HomePage() {
    // console.log("[HomePage] rendering");
    const { reviews } = await getReviews(3)
    return (
        <>
            <Heading>Indie Gamer</Heading>
            <p>Only the best indie games, reviewed for you.</p>
            
            <ul className="flex flex-col gap-3">
                {reviews.map((review, index) => (
                    <li key={review.slug} className="bg-white border w-80 rounded shadow hover:shadow-xl sm:w-full">
                        <Link href={`reviews/${review.slug}`}
                            className="flex flex-col sm:flex-row">
                                <Image src={review.image} alt="" width="320" height="180" priority={ index === 0 }
                                className="rounded-t sm:rounded-l sm:rounded-r-none"/>
                                <div className="px-2 py-1 text-center sm:text-left">
                                    <h2 className="font-shantellSans font-semibold">
                                        {review.title}
                                    </h2>
                                    <p className="pt-2 hidden sm:block">
                                        {review.subtitle}
                                    </p>
                                </div>
                        </Link>
                    </li>
                ))}
            </ul>

        </>
    )
}