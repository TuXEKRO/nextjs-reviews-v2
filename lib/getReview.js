import { marked } from "marked";
import { fetchReviews, toReview } from "./reviews";


export async function getReview(slug) {
    const { data } = await fetchReviews({
        filters: { slug: { $eq: slug } },
        fields: ["slug", "title", "subtitle", "publishedAt", "body"],
        populate: { image: { fields: ["url"] } },
        pagination: { pageSize: 1, withCount: false },
    });

    if (data.length === 0) {
        return null;
    }

    const item = data[0];
    return {
        ...toReview(item),
        body: marked(item.attributes.body, { headerIds: false, mangle: false }),
    };
}
