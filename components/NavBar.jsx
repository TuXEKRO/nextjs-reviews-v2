import Link from "next/link";
import NavLink from "./NavLink";

export default function NavBar() {
    return (
        <nav>
            <ul className='flex gap-2'>
                <li className="font-shantellSans font-bold">
                    <NavLink href="/">
                        Indie Gamer
                    </NavLink>
                </li>
                <li className="ml-auto">
                    <NavLink href="/reviews">
                        Reviews
                    </NavLink>
                </li>
                <li>
                    <NavLink href="/about" prefetch={false}>
                        About
                    </NavLink>
                </li>
            </ul>
        </nav>
    )
}