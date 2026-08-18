import type { Metadata } from "next";
import ToolCard from "@/components/ToolCard";
import JsonLd from "@/components/JsonLd";

export const metadata: Metadata = {
  title: "e-pdf — Free Online PDF Tools",
  description:
    "Free online PDF tools — merge, compress, split, convert images to PDF, PDF to Word, Word to PDF, rotate pages, and add watermarks. 100% browser-based, no signup.",
  alternates: { canonical: "/" },
};

const tools = [
  {
    href: "/merge-pdf",
    title: "Merge PDF",
    description: "Combine multiple PDF files into one clean document in seconds.",
    gradient: "from-blue-600 to-indigo-600",
    badgeText: "Popular",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M8 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-3M15 3H9v6h6V3z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    href: "/compress-pdf",
    title: "Compress PDF",
    description: "Reduce PDF file size while preserving document quality.",
    gradient: "from-emerald-500 to-teal-600",
    badgeText: "Fast",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M12 3v14M5 10l7 7 7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M4 20h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    href: "/split-pdf",
    title: "Split PDF",
    description: "Extract specific pages or custom page ranges into separate files.",
    gradient: "from-violet-600 to-purple-600",
    badgeText: "Extract",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M12 3v18M3 8h6M3 16h6M15 8h6M15 16h6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    href: "/images-to-pdf",
    title: "Images to PDF",
    description: "Convert JPG, PNG, or multiple photos into a single formatted PDF.",
    gradient: "from-rose-500 to-pink-600",
    badgeText: "Convert",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <rect x="3" y="3" width="18" height="18" rx="3" stroke="currentColor" strokeWidth="2" />
        <circle cx="8.5" cy="8.5" r="1.5" fill="currentColor" />
        <path d="M3 15l5-5 4 4 3-3 6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    href: "/pdf-to-word",
    title: "PDF to Word",
    description: "Extract text content from PDFs into an editable Word document.",
    gradient: "from-cyan-500 to-blue-600",
    badgeText: "DOCX",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <rect x="3" y="2" width="14" height="18" rx="2" stroke="currentColor" strokeWidth="2" />
        <path d="M7 7h6M7 11h6M7 15h4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        <path d="M15 14l4 4m0-4l-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    href: "/word-to-pdf",
    title: "Word to PDF",
    description: "Convert DOCX Word documents into crisp PDF files instantly.",
    gradient: "from-sky-500 to-indigo-600",
    badgeText: "DOCX",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <rect x="3" y="2" width="14" height="18" rx="2" stroke="currentColor" strokeWidth="2" />
        <path d="M7 7h6M7 11h6M7 15h4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        <path d="M14 17l4-4m0 4l-4-4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    href: "/rotate-pdf",
    title: "Rotate PDF",
    description: "Rotate individual PDF pages 90°, 180°, or 270° with live preview.",
    gradient: "from-amber-500 to-orange-600",
    badgeText: "Flip",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M21 12a9 9 0 11-9-9 9 9 0 019 9z" stroke="currentColor" strokeWidth="2" />
        <path d="M15 8l-3-3-3 3M12 5v7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    href: "/watermark-pdf",
    title: "Watermark PDF",
    description: "Add a custom text watermark with full control over opacity & angle.",
    gradient: "from-fuchsia-500 to-pink-600",
    badgeText: "Stamp",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <rect x="3" y="3" width="18" height="18" rx="3" stroke="currentColor" strokeWidth="2" />
        <path d="M7 17l10-10M7 12l5-5M12 17l5-5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" opacity="0.6" />
      </svg>
    ),
  },
];

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://e-pdf.app";

const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "e-pdf",
    url: siteUrl,
    description:
      "Free, browser-based PDF tools. Merge, compress, split, convert, rotate, and watermark PDFs — no signup, no uploads.",
    potentialAction: {
      "@type": "SearchAction",
      target: { "@type": "EntryPoint", urlTemplate: `${siteUrl}/?q={search_term_string}` },
      "query-input": "required name=search_term_string",
    },
  },
  {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "e-pdf",
    url: siteUrl,
    logo: `${siteUrl}/og-image.png`,
    description: "Free, privacy-first PDF tools that run entirely in your browser.",
  },
];

export default function HomePage() {
  return (
    <>
      <JsonLd data={jsonLd} />
      <main className="min-h-screen bg-slate-50/50">
        {/* Hero with Vibrant Gradient Mesh */}
        <section
          aria-labelledby="hero-heading"
          className="relative overflow-hidden bg-gradient-to-b from-blue-600 via-indigo-700 to-slate-900 text-white py-20 px-4 text-center shadow-md"
        >
          {/* Subtle Background Glowing Elements */}
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-blue-400/20 blur-[120px] rounded-full pointer-events-none" />

          <div className="relative max-w-3xl mx-auto z-10">
            <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-emerald-300 bg-emerald-950/60 border border-emerald-500/30 px-3.5 py-1.5 rounded-full mb-6 backdrop-blur-md shadow-sm">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              100% Free &amp; Browser-Based
            </span>
            
            <h1
              id="hero-heading"
              className="text-4xl sm:text-6xl font-extrabold text-white mb-6 leading-tight tracking-tight drop-shadow-sm"
            >
              Powerful PDF Tools <br />
              <span className="bg-gradient-to-r from-blue-200 via-cyan-200 to-pink-200 bg-clip-text text-transparent">
                Without Limits
              </span>
            </h1>

            <p className="text-lg sm:text-xl text-blue-100/90 max-w-2xl mx-auto mb-10 leading-relaxed font-normal">
              Merge, compress, split, convert, rotate, and watermark your PDF files directly in your browser. Fast, free, and completely private.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4 text-sm font-medium text-blue-100">
              {[
                { label: "Files stay on your device", color: "bg-emerald-400/20 text-emerald-300 border-emerald-400/30" },
                { label: "No signup required", color: "bg-blue-400/20 text-blue-200 border-blue-400/30" },
                { label: "Lightning fast processing", color: "bg-amber-400/20 text-amber-300 border-amber-400/30" },
                { label: "Unlimited uses", color: "bg-pink-400/20 text-pink-300 border-pink-400/30" },
              ].map((feat) => (
                <span
                  key={feat.label}
                  className={`flex items-center gap-2 px-3.5 py-1.5 rounded-full border text-xs font-semibold backdrop-blur-md ${feat.color}`}
                >
                  ✓ {feat.label}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* Tools grid */}
        <section
          aria-labelledby="tools-heading"
          className="max-w-6xl mx-auto px-4 py-16"
        >
          <div className="text-center mb-10">
            <h2 id="tools-heading" className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Select a PDF Tool
            </h2>
            <p className="text-slate-500 mt-2 text-sm sm:text-base">
              Choose an action below to process your PDF files locally.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {tools.map((tool) => (
              <ToolCard
                key={tool.href}
                href={tool.href}
                icon={tool.icon}
                title={tool.title}
                description={tool.description}
                gradient={tool.gradient}
                badgeText={tool.badgeText}
              />
            ))}
          </div>
        </section>

        {/* Trust strip */}
        <section className="bg-white border-y border-slate-200/80 py-12 px-4">
          <div className="max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
            {[
              {
                icon: "🔒",
                title: "100% Private & Secure",
                text: "Your files never leave your computer. Conversions are processed locally in your browser sandbox.",
                border: "border-blue-100 bg-blue-50/50",
              },
              {
                icon: "⚡",
                title: "Instant Speed",
                text: "Powered by WebAssembly and local JavaScript. Zero server queue or waiting times.",
                border: "border-amber-100 bg-amber-50/50",
              },
              {
                icon: "✨",
                title: "Forever Free",
                text: "No hidden paywalls, file size limits, or daily conversion caps. Use as much as you need.",
                border: "border-emerald-100 bg-emerald-50/50",
              },
            ].map((item) => (
              <div key={item.title} className={`p-6 rounded-2xl border ${item.border} transition-all`}>
                <div className="text-4xl mb-3">{item.icon}</div>
                <h3 className="font-bold text-slate-800 mb-1.5 text-base">{item.title}</h3>
                <p className="text-xs text-slate-500 leading-relaxed">{item.text}</p>
              </div>
            ))}
          </div>
        </section>
      </main>
    </>
  );
}
