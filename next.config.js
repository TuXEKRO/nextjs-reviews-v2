/** @type {import('next').NextConfig} */

module.exports = {
    /**
     * OPCIONES:
     * undefined: Por defecto para el modo produccion como Vercel.
     * 'standalone': Para autoalojamiento Docker.
     * 'export': En /out todos los ficheros estáticos.
     */
    output: undefined,
    images: {
        // unoptimized: true, // Para la exportación de imagenes a pagina estática
        remotePatterns: [toRemotePattern(process.env.CMS_IMAGE_PATTERN)]
    }
}

function toRemotePattern(urlString) {
    const url = new URL(urlString)
    return {
        protocol: url.protocol.replace(":", ""),
        hostname: url.hostname,
        port: url.port,
        pathname: url.pathname,
    }
}