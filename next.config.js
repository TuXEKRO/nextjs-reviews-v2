/** @type {import('next').NextConfig} */
/**
 * undefined: Por defecto para el modo produccion como Vercel.
 * 'standalone': Para autoalojamiento Docker.
 * 'export': En /out todos los ficheros estáticos.
 */
module.exports = {
    output: undefined,
    images: {
        // unoptimized: true, // Para la exportación de imagenes a pagina estática
        remotePatterns: [
            {
                protocol: "http",
                hostname: "localhost",
                port: "1337",
                pathname: "/uploads/**",
            }
        ]
    }
}