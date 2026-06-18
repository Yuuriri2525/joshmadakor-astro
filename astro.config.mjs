// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://joshmadakor.tech',
  vite: {
    // @tailwindcss/vite と astro がそれぞれ別メジャーの vite を解決するため Plugin 型が食い違う。
    // ランタイムには影響しない型定義上のズレなので、この行のみ型チェックを抑制する。
    // @ts-ignore
    plugins: [tailwindcss()]
  },

  integrations: [react(), sitemap()]
});
