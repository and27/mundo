import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "El Bosque Interior",
    short_name: "Bosque Interior",
    description: "Meditaciones con guias sagrados para ninos y ninas.",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#667eea",
    icons: [
      {
        src: "icons//icon-192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "icons//icon-512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
