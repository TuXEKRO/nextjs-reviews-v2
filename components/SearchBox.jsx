"use client";

import { useIsClient } from "@/lib/hooks";
import { Combobox } from "@headlessui/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SearchBox({reviews}) {
    const router = useRouter()
    const isClient = useIsClient();
    const [query, setQuery] = useState("")
    // console.log("[SearchBox] query: ", query);
    if (!isClient) { return null }

    // Hace lo mismo que la funcion de abajo
    // const handleChange = (review) => {
    //     console.log("[handleChange] review: ", review);
    //     router.push(`/reviews/${review.slug}`)
    // }

    function handleChange(review) {
        console.log("[handleChange] review: ", review);
        router.push(`/reviews/${review.slug}`)
    }
    
    const filtered = reviews.filter((review) => review.title.toLowerCase().includes(query.toLowerCase())).slice(0, 5)
    return (
        <div className="relative w-48">
            <Combobox onChange={handleChange}>
                <Combobox.Input placeholder="Search..." className="border px-2 py-1 rounded w-full"
                                value={query} onChange={(event) => setQuery(event.target.value)}/>
                
                <Combobox.Options className="absolute bg-white py-1 w-full">
                    {filtered.map((review) => (
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