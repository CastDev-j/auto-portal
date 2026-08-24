// @ts-check
import { defineConfig, fontProviders, passthroughImageService } from 'astro/config';

import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';

import cloudflare from '@astrojs/cloudflare';

// https://astro.build/config
export default defineConfig({
    integrations: [react()],

    vite: {
        plugins: [tailwindcss()]
    },

    adapter: cloudflare(),

    fonts: [
        {
            provider: fontProviders.google(),
            name: 'Roboto',
            cssVariable: '--font-roboto',
            styles: ["normal"]
        }
    ],
    image: {
        service: passthroughImageService(),
    },
});