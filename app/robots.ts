import type { MetadataRoute } from "next";

export const dynamic = "force-static";

/** robots.txt: todo publico menos el checklist interno de contenido. */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/", disallow: "/pendientes/" },
    sitemap: "https://tonaltlan.com/sitemap.xml",
  };
}
