import type { MetadataRoute } from "next";

const SITE_URL = "https://em-consulting-site.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return [
    {
      url: `${SITE_URL}/`,
      lastModified,
      changeFrequency: "monthly",
      priority: 1.0,
      alternates: {
        languages: {
          "zh-CN": `${SITE_URL}/`,
          en: `${SITE_URL}/en`,
        },
      },
    },
    {
      url: `${SITE_URL}/en`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.9,
      alternates: {
        languages: {
          "zh-CN": `${SITE_URL}/`,
          en: `${SITE_URL}/en`,
        },
      },
    },
  ];
}
