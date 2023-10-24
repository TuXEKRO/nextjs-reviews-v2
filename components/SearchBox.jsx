"use client";

import { useIsClient } from "@/lib/hooks";
import { searchReviews } from "@/lib/reviews";
import { Combobox } from "@headlessui/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SearchBox() {
    const router = useRouter()                  // Enruta hacia otra pagina
    const isClient = useIsClient();             // Devuelve si quien procesa es el cliente
    const [query, setQuery] = useState("")      // Guarda el texto de la búsqueda
    const [reviews, setReviews] = useState([])  // Guarda las reviews que coinciden
    useEffect(() => {                           // Se ejecuta al cambiar 'query'
        // fetch reviews
        if (query.length > 1) {
            (async () => {                      // Crea una función asincrona y anonima que se ejecuta nada mas crearse por los () del final
                const reviews = await searchReviews(query)
                setReviews(reviews)
            })()
        } else {
            setReviews([])
        }
    }, [query])
    // console.log("[SearchBox] query: ", query);
    if (!isClient) { return null }              // Finaliza la ejecución del servidor

    // Hace lo mismo que la funcion de abajo
    // const handleChange = (review) => {
    //     console.log("[handleChange] review: ", review);
    //     router.push(`/reviews/${review.slug}`)
    // }

    function handleChange(review) {
        console.log("[handleChange] review: ", review);
        router.push(`/reviews/${review.slug}`)
    }
    
    return (
        <div className="relative w-48">
            <Combobox onChange={handleChange}>
                <Combobox.Input placeholder="Search..." className="border px-2 py-1 rounded w-full"
                                value={query} onChange={(event) => setQuery(event.target.value)}/>
                
                <Combobox.Options className="absolute bg-white py-1 w-full">
                    {reviews.map((review) => (
                        <Combobox.Option key={review.slug} value={review}>
                            {({active}) => (
                                <span className={`block px-2 truncate w-full ${active ? "bg-orange-100" : ""}`}>
                                    {review.title}
                                </span>

                            )}
                        </Combobox.Option>
                    ))}
                </Combobox.Options>
            </Combobox>
        </div>
    )
}