"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NavLink({ children, href, prefetch }) {
    if (href === usePathname()) {
        return (
            <span className="text-orange-900 font-bold underline underline-offset-4">
                { children }
            </span>
        )
    }
    return (
        <Link href={href} prefetch={prefetch} className="text-orange-800 hover:underline">
            { children }
        </Link>
    )
}