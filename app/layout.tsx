import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CookieConsent from "@/components/CookieConsent";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], display: "swap" });

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://e-pdf.online";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "e-pdf — Free Online PDF Tools",
    template: "%s | e-pdf",
  },
  description:
    "Free online PDF tools: merge, compress, split, convert, rotate, and watermark PDFs. 100% browser-based — your files never leave your device.",
  keywords: [
    "pdf tools online free",
    "merge pdf",
    "compress pdf",
    "split pdf",
    "pdf to word",
    "word to pdf",
    "rotate pdf",
    "watermark pdf",
    "images to pdf",
  ],
  authors: [{ name: "e-pdf" }],
  creator: "e-pdf",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "e-pdf",
    title: "e-pdf — Free Online PDF Tools",
    description:
      "Free, browser-based PDF tools. No uploads, no signup. Merge, compress, split, convert and more.",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "e-pdf — Free Online PDF Tools" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "e-pdf — Free Online PDF Tools",
    description: "Free, browser-based PDF tools. No uploads, no signup.",
    images: ["/og-image.png"],
  },
  robots: { index: true, follow: true },
  icons: {
    icon: "/pdf.png",
    shortcut: "/pdf.png",
    apple: "/pdf.png",
  },
  other: {
    "google-adsense-account": "ca-pub-1776155901449529",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const publisherId = process.env.NEXT_PUBLIC_ADSENSE_PUBLISHER_ID ?? "ca-pub-1776155901449529";

  return (
    <html lang="en" className={`${inter.className} h-full antialiased`}>
      <head>
        <meta name="author" content="e-pdf" />
        <meta name="google-adsense-account" content="ca-pub-1776155901449529" />
      </head>
      <body className="min-h-full flex flex-col bg-white text-slate-900">
        {publisherId && (
          <Script
            async
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${publisherId}`}
            crossOrigin="anonymous"
            strategy="afterInteractive"
          />
        )}
        <Navbar />
        <div className="flex-1">{children}</div>
        <Footer />
        <CookieConsent />
      </body>
    </html>
  );
}
