import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
    return {
        name: 'Nutrición Universitaria',
        short_name: 'Nutrición Universitaria',
        description: 'Tu guía de nutrición y salud universitaria',
        start_url: '/',
        display: 'standalone', // Esto elimina la barra del navegador para que parezca nativa
        background_color: '#ffffff',
        theme_color: '#ffffff',
        icons: [
            {
                src: '/logo.png',
                sizes: '192x192',
                type: 'image/png',
                purpose: 'any',
            },
            {
                src: '/logo-maskable.png',
                sizes: '512x512',
                type: 'image/png',
                purpose: 'maskable',
            },
        ]
    }
}