import type { Metadata } from "next";
import dynamic from "next/dynamic";
import ToolLayout from "@/components/ToolLayout";
import HowToSection from "@/components/HowToSection";
import FaqSection from "@/components/FaqSection";
import JsonLd from "@/components/JsonLd";

const CompressPdfTool = dynamic(() => import("./CompressPdfTool"));

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://e-pdf.app";

export const metadata: Metadata = {
  title: "Compress PDF Online Free",
  description:
    "Reduce PDF file size online for free — no upload to server, no signup. Compress text-based PDFs directly in your browser in seconds.",
  alternates: { canonical: "/compress-pdf" },
  openGraph: { title: "Compress PDF Online Free | e-pdf", description: "Reduce PDF file size in your browser. Free, no signup.", images: ["/og-image.png"] },
  twitter: { card: "summary_large_image", title: "Compress PDF Online Free | e-pdf" },
};

const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Compress PDF Online Free",
    applicationCategory: "UtilitiesApplication",
    operatingSystem: "Any (Browser-based)",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    description: "Free online PDF compressor. Reduce PDF file size in your browser — no upload, no signup.",
    url: `${siteUrl}/compress-pdf`,
  },
  {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "How to compress a PDF online",
    step: [
      { "@type": "HowToStep", text: "Click 'Browse' or drag your PDF into the upload area." },
      { "@type": "HowToStep", text: "Click the 'Compress PDF' button." },
      { "@type": "HowToStep", text: "Your compressed PDF will download automatically." },
    ],
  },
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      { "@type": "Question", name: "How much can I compress a PDF?", acceptedAnswer: { "@type": "Answer", text: "For text-based PDFs, expect 5–15% reduction. This tool re-saves the PDF structure more efficiently but does not re-compress images. For heavy image compression, use a server-based tool like Ghostscript." } },
      { "@type": "Question", name: "Is compression lossless?", acceptedAnswer: { "@type": "Answer", text: "Yes. The content and quality remain identical. Only the internal file structure is optimised." } },
      { "@type": "Question", name: "Why didn't my PDF get smaller?", acceptedAnswer: { "@type": "Answer", text: "If your PDF is already optimised, or if it's mostly images, client-side compression will have minimal effect. Scanned PDFs especially won't shrink much without image recompression." } },
      { "@type": "Question", name: "Are my files uploaded to your server?", acceptedAnswer: { "@type": "Answer", text: "No. All processing runs in your browser. Your files never leave your device." } },
      { "@type": "Question", name: "Can I compress password-protected PDFs?", acceptedAnswer: { "@type": "Answer", text: "No. Please remove the password before compressing." } },
    ],
  },
];

export default function CompressPdfPage() {
  return (
    <>
      <JsonLd data={jsonLd} />
      <ToolLayout
        title="Compress PDF Online — Free & Fast"
        description="Reduce your PDF file size instantly. Optimises the internal structure of your PDF — 100% in your browser, nothing uploaded to any server."
      >
        <div className="mb-4 rounded-xl bg-amber-50 border border-amber-200 px-4 py-3 text-sm text-amber-800">
          <strong>Note:</strong> This tool provides basic compression (5–15% reduction) for text-based PDFs by optimising the file structure. Scanned or image-heavy PDFs won&apos;t shrink significantly — this is a browser limitation.
        </div>
        <CompressPdfTool />

        <HowToSection
          heading="How to compress a PDF online"
          steps={[
            { text: "Click 'Browse' or drag your PDF into the upload area above." },
            { text: "Click the 'Compress PDF' button." },
            { text: "Your compressed PDF will download automatically." },
          ]}
        />

        <FaqSection
          items={[
            { question: "How much can I compress a PDF?", answer: "For text-based PDFs, expect 5–15% reduction. This tool re-saves the PDF structure more efficiently but does not re-compress images." },
            { question: "Is compression lossless?", answer: "Yes. The content and quality remain identical — only the internal file structure is optimised." },
            { question: "Why didn't my PDF get smaller?", answer: "If your PDF is already optimised, or mostly images, client-side compression will have minimal effect. Scanned PDFs won't shrink much without image recompression." },
            { question: "Are my files uploaded to your server?", answer: "No. All processing runs in your browser. Your files never leave your device." },
            { question: "Can I compress password-protected PDFs?", answer: "No. Please remove the password before compressing." },
          ]}
        />
      </ToolLayout>
    </>
  );
}
