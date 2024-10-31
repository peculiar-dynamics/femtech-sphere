import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import tailwind from "@astrojs/tailwind";
import sitemap from "@astrojs/sitemap";
import icon from "astro-icon";

import react from "@astrojs/react";

// https://astro.build/config
export default defineConfig({
  site: "https://astro.build",
  // Your public domain, e.g.: https://my-site.dev/. Used to generate sitemaps and canonical URLs.
  integrations: [
    tailwind({
      applyBaseStyles: false,
      nesting: true,
    }),
    mdx(),
    sitemap(),
    icon(),
    react(),
  ],
  vite: {
    ssr: {
      noExternal: ["smartypants"],
    },
  },
});
