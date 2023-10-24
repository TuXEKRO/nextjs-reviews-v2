import Image from "next/image";
import Heading from "@/components/Heading";
import { notFound } from "next/navigation";
import ShareButtons from "@/components/ShareButtons";
import { getReview, getSlugs } from "@/lib/reviews";

export async function generateMetadata({params: { slug }}) {
    const review = await getReview(slug)
    if (!review) {
        notFound()
    }
    return  {
        title: review.title,
    }
}

// export const revalidate = 30 // Actualiza la caché cada 30 segundos (funciona bien en el listado de reviews, no se ha probado aquí)
// export const dynamic = "force-dynamic" // Forma sucia y rápida de hacer la pagina dinamica (se genera en cada peticion, no se guarda en caché). Necesario comentar la funcion generateStaticParams().
export async function generateStaticParams() {
    const slugs = await getSlugs();
    return slugs.map((slug) => ({ slug }))
}

export default async function ReviewPage({params: { slug }}) {
    const review = await getReview(slug)
    if (!review) {
        notFound()
    }
    return (
        <>
            <Heading>{review.title}</Heading>
            <p className="font-semibold pb-3">
                {review.subtitle}
            </p>
            <div className="flex gap-3 items-baseline">
                <p className="italic pb-2">{review.date}</p>
                <ShareButtons/>
            </div>
            <Image src={review.image} alt="" width="640" height="360"
                className="mb-2 rounded"/>
            <article dangerouslySetInnerHTML={{__html: review.body}}
                className="prose prose-slate max-w-screen-sm"/>
        </>
    )
}