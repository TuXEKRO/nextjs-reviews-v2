"use client";

import { useIsClient } from "@/lib/hooks";
import { Combobox } from "@headlessui/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDebounce } from "use-debounce";

export default function SearchBox() {
    const router = useRouter()                          // Enruta hacia otra pagina
    const isClient = useIsClient();                     // Devuelve si quien procesa es el cliente
    const [query, setQuery] = useState("")              // Guarda el texto de la búsqueda
    const [debouncedQuery] = useDebounce(query, 300)    // Es como un delay antes de actualizar la variable, para evitar que se actualice mientras el usuario esta escribiendo
    const [reviews, setReviews] = useState([])          // Guarda las reviews que coinciden
    useEffect(() => {                                   // Se ejecuta al cambiar 'query'
        // fetch reviews
        if (debouncedQuery.length > 1) {
            const controller = new AbortController();       // Cancela peticiones anteriores para no entremezclar los datos o devolver peticiones antiguas

            (async () => {                      // Crea una función asincrona y anonima que se ejecuta nada mas crearse por los () del final
                const url = "/api/search?query=" + encodeURIComponent(debouncedQuery)
                const response = await fetch(url, { signal: controller.signal })
                const reviews = await response.json()
                setReviews(reviews)
            })()
            return () => controller.abort()
        } else {
            setReviews([])
        }
    }, [debouncedQuery])
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