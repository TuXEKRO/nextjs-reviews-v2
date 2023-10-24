import Link from "next/link";
import Image from "next/image";
import Heading from "@/components/Heading";
import { getReviews, getSearchableReviews } from "@/lib/reviews";
import PaginationBar from "@/components/PaginationBar";
import SearchBox from "@/components/SearchBox";

export const metaData = {
    title: "Reviews",
}

const PAGE_SIZE = 6

export default async function ReviewsPage({searchParams}) {
    const page = parsePageParam(searchParams.page)
    const { reviews, pageCount } = await getReviews(PAGE_SIZE, page);
    const searchableReviews = await getSearchableReviews();
    // console.log('[ReviewsPage] reviews:', reviews);
    // console.log("[ReviewsPage] reviews: ", reviews.map(({slug, title}) => ({slug, title})));
    return (
        <>
            <Heading>Reviews</Heading>
            <div className="flex justify-between pb-3">
                <PaginationBar href="/reviews" page={page} pageCount={pageCount} />
                <SearchBox reviews={searchableReviews} />
            </div>
            <p>Here listed all the reviews.</p>
            <ul className="flex flex-row flex-wrap gap-3">
                {reviews.map((review, index) => (
                    <li key={review.slug}
                        className="bg-white border w-80 rounded shadow hover:shadow-xl">
                        <Link href={`/reviews/${review.slug}`}>
                            <Image src={review.image} alt="" width="320" height="180" priority={index === 0}
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

function parsePageParam(paramValue) {
    if (paramValue) {
        const page = parseInt(paramValue)
        if (isFinite(paramValue) && page > 0) {
            return page
        }
    }
    return 1
}