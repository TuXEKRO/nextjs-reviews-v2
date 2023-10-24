import { marked } from "marked";
import matter from "gray-matter";
import qs from 'qs';

export const CACHE_TAG_REVIEWS = "review"
const CMS_URL = "http://localhost:1337"

export async function getReview(slug) {
    const { data } = await fetchReviews({
        filters: { slug: { $eq: slug } },
        fields: ["slug", "title", "subtitle", "publishedAt", "body"],
        populate: { image: { fields: ["url"] } },
        pagination: { pageSize: 1, withCount: false },
    })

    if (data.length === 0) {
        return null
    }

    const item = data[0]
    return {
        ...toReview(item),
        body: marked(item.attributes.body, { headerIds: false, mangle: false }),
    }
}

export async function getReviews(pageSize, page) {
    const { data, meta } = await fetchReviews({
        fields: ["slug", "title", "subtitle", "publishedAt"],
        populate: { image: { fields: ["url"] } },
        sort: ["publishedAt:desc"],
        pagination: { pageSize, page },
    })
    // console.log(data)

    return {
        pageCount: meta.pagination.pageCount,
        reviews: data.map(toReview),
    }
}

// Para la barra de búsqueda
export async function getSearchableReviews() {
    const { data } = await fetchReviews({
        fields: ["slug", "title"],
        sort: ["publishedAt:desc"],
        pagination: { pageSize: 100 },
    })
    return data.map(({ attributes }) => ({
        slug: attributes.slug,
        title: attributes.title,
    }))
}

export async function getSlugs() {
    const { data } = await fetchReviews({
        fields: ["slug"],
        sort: ["publishedAt:desc"],
        pagination: { pageSize: 100 }, // Obtiene todos los articulos, pero al limitarse a 100, puede no generarse todos.
    })
    return data.map((item) => item.attributes.slug)
}

async function fetchReviews(parameters) {
    const url = `${CMS_URL}/api/reviews?`
        + qs.stringify(parameters, { encodeValuesOnly: true })
    //console.log("[fetchReviews] ", url)
    const response = await fetch(url, {
        // cache: "no-store" // O habilita en todas las paginas donde se use esta función el modo dinamico (se procesa la pagina en cada peticion)
        next: {
            //     revalidate: 30, // O mantiene en cache durante 30 segundos todas las paginas que hacen uso de esta funcion
            tags: [CACHE_TAG_REVIEWS], // O hace uso de webhooks para saber cuando caduca la entrada
        }

    })
    if (!response.ok) {
        throw new Error(`CMS returned ${response.status} for ${url}`)
    }
    return await response.json()
}

function toReview(item) {
    const { attributes } = item;
    return {
        slug: attributes.slug,
        title: attributes.title,
        subtitle: attributes.subtitle,
        date: attributes.publishedAt.slice(0, "yyyy-mm-dd".length),
        image: CMS_URL + attributes.image.data.attributes.url
    }
}