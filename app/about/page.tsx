import type { Metadata } from "next";
import Link from "next/link";
import JsonLd from "@/components/JsonLd";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://e-pdf.app";

export const metadata: Metadata = {
  title: "About e-pdf — Free, Private PDF Tools",
  description: "Learn about e-pdf: a free, browser-based PDF tool suite where your files never leave your device. No signup, no server, always free.",
  alternates: { canonical: "/about" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "e-pdf",
  url: siteUrl,
  description: "Free, privacy-first PDF tools that run entirely in your browser. No file uploads, no signup required.",
};

export default function AboutPage() {
  return (
    <>
      <JsonLd data={jsonLd} />
      <main className="max-w-2xl mx-auto px-4 py-14">
        <h1 className="text-3xl font-bold text-slate-900 mb-6">About e-pdf</h1>

        <div className="prose prose-slate max-w-none space-y-5 text-slate-600 leading-relaxed">
          <p>
            <strong className="text-slate-800">e-pdf</strong> is a free, browser-based PDF tool suite
            built for anyone who needs to work with PDF files quickly — without installing software,
            creating an account, or paying for a subscription.
          </p>

          <h2 className="text-xl font-semibold text-slate-800 mt-8 mb-3">Your files never leave your device</h2>
          <p>
            Every tool on e-pdf runs entirely in your browser using modern JavaScript and WebAssembly.
            When you upload a PDF, it is processed locally on your device — <strong>nothing is ever
            sent to our servers</strong>. We have no servers that receive your files. We literally
            cannot see what you upload.
          </p>
          <p>
            This is not just a privacy policy statement — it&apos;s how the technology works. Your files
            stay on your computer from start to finish.
          </p>

          <h2 className="text-xl font-semibold text-slate-800 mt-8 mb-3">What tools are available?</h2>
          <ul className="space-y-1 list-none pl-0">
            {[
              { href: "/merge-pdf", label: "Merge PDF", desc: "Combine multiple PDFs into one" },
              { href: "/compress-pdf", label: "Compress PDF", desc: "Reduce PDF file size" },
              { href: "/split-pdf", label: "Split PDF", desc: "Extract pages into separate files" },
              { href: "/images-to-pdf", label: "Images to PDF", desc: "Convert JPG/PNG photos to PDF" },
              { href: "/pdf-to-word", label: "PDF to Word", desc: "Extract text as an editable DOCX" },
              { href: "/word-to-pdf", label: "Word to PDF", desc: "Convert DOCX to PDF" },
              { href: "/rotate-pdf", label: "Rotate PDF", desc: "Fix sideways or upside-down pages" },
              { href: "/watermark-pdf", label: "Watermark PDF", desc: "Stamp custom text on every page" },
            ].map((t) => (
              <li key={t.href} className="flex items-start gap-2">
                <span className="text-blue-500 mt-0.5">→</span>
                <span><Link href={t.href} className="font-medium text-blue-600 hover:underline">{t.label}</Link> — {t.desc}</span>
              </li>
            ))}
          </ul>

          <h2 className="text-xl font-semibold text-slate-800 mt-8 mb-3">Is it really free?</h2>
          <p>
            Yes. All 8 tools are completely free to use with no file size limits imposed by us (your
            browser&apos;s memory is the only practical limit). The site is supported by Google AdSense
            ad placements.
          </p>

          <h2 className="text-xl font-semibold text-slate-800 mt-8 mb-3">Browser compatibility</h2>
          <p>
            e-pdf works on all modern browsers — Chrome, Firefox, Safari, Edge — on Windows, Mac,
            iOS, and Android. No plugins or extensions required.
          </p>
        </div>
      </main>
    </>
  );
}
