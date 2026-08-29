import type { MetadataRoute } from "next";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://e-pdf.online";
const now = new Date();

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: siteUrl, lastModified: now, changeFrequency: "monthly", priority: 1.0 },
    { url: `${siteUrl}/merge-pdf`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${siteUrl}/compress-pdf`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${siteUrl}/split-pdf`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${siteUrl}/images-to-pdf`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${siteUrl}/pdf-to-word`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${siteUrl}/word-to-pdf`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${siteUrl}/rotate-pdf`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${siteUrl}/watermark-pdf`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${siteUrl}/about`, lastModified: now, changeFrequency: "yearly", priority: 0.5 },
    { url: `${siteUrl}/privacy-policy`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    { url: `${siteUrl}/terms`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    { url: `${siteUrl}/contact`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
  ];
}
