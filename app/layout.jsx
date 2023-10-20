import NavBar from '@/components/NavBar';
import { shantellSans } from './fonts';
import "./globals.css";

export const metadata = {
    title: {
        default: "Indie Gamer",
        template: "%s | Indie Gamer",
    },
    description: "Only the best indie games, reviewed for you."
}

export default function RootLayout({ children }) {
    return (
        <html lang="es" className={shantellSans.variable}>
            <body className='bg-orange-50 flex flex-col px-4 py-2 min-h-screen'>
                <header>
                    <NavBar/>
                </header>
                <main className='grow py-3'>
                    {children}
                </main>
                <footer className='border-t py-3 text-center text-xs text-slate-500'>
                    Game data and images by {" "}
                    <a href="https://rawg.io/" target="_blank" 
                        className="text-orange-800 hover:underline">RAWG</a>
                </footer>
            </body>
        </html>
    )
}