import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
    return {
        name: 'Nutrición Universitaria',
        short_name: 'NutriPrepa',
        description: 'Tu guía de nutrición y salud universitaria',
        start_url: '/',
        display: 'standalone', // Esto elimina la barra del navegador para que parezca nativa
        background_color: '#ffffff',
        theme_color: '#000000',
        icons: [
            {
                src: '/logo.svg',
                sizes: 'any',
                type: 'image/svg+xml',
                purpose: 'any', 
            },
            {
                src: '/logo-maskable.svg',
                sizes: 'any',
                type: 'image/svg+xml',
                purpose: 'maskable',
            },
        ]
    }
}