import type { Metadata } from "next";
import dynamic from "next/dynamic";
import ToolLayout from "@/components/ToolLayout";
import HowToSection from "@/components/HowToSection";
import FaqSection from "@/components/FaqSection";
import JsonLd from "@/components/JsonLd";

const SplitPdfTool = dynamic(() => import("./SplitPdfTool"));
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://e-pdf.app";

export const metadata: Metadata = {
  title: "Split PDF Online Free",
  description: "Extract pages or page ranges from a PDF and download them as separate files — free, browser-based, no signup required.",
  alternates: { canonical: "/split-pdf" },
  openGraph: { title: "Split PDF Online Free | e-pdf", description: "Extract PDF pages into separate files. Browser-based, free.", images: ["/og-image.png"] },
  twitter: { card: "summary_large_image", title: "Split PDF Online Free | e-pdf" },
};

const jsonLd = [
  { "@context": "https://schema.org", "@type": "SoftwareApplication", name: "Split PDF Online Free", applicationCategory: "UtilitiesApplication", operatingSystem: "Any (Browser-based)", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" }, description: "Free online PDF splitter. Extract pages from a PDF in your browser.", url: `${siteUrl}/split-pdf` },
  { "@context": "https://schema.org", "@type": "HowTo", name: "How to split a PDF online", step: [{ "@type": "HowToStep", text: "Upload your PDF." }, { "@type": "HowToStep", text: "Enter the page range you want to extract (e.g. 1-3)." }, { "@type": "HowToStep", text: "Click 'Split PDF' to download the extracted pages." }] },
  { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: [
    { "@type": "Question", name: "Can I extract specific pages?", acceptedAnswer: { "@type": "Answer", text: "Yes. Enter a page range like '1-3' or '2-2' to extract those specific pages into a new PDF." } },
    { "@type": "Question", name: "Will I get separate files?", acceptedAnswer: { "@type": "Answer", text: "Yes. Each range you define is downloaded as a separate PDF file." } },
    { "@type": "Question", name: "Does this work on encrypted PDFs?", acceptedAnswer: { "@type": "Answer", text: "No. Password-protected PDFs cannot be split. Remove the password first." } },
    { "@type": "Question", name: "Are my files safe?", acceptedAnswer: { "@type": "Answer", text: "Yes. All processing runs in your browser — your files never leave your device." } },
  ]},
];

export default function SplitPdfPage() {
  return (
    <>
      <JsonLd data={jsonLd} />
      <ToolLayout title="Split PDF Online — Free & Fast" description="Extract specific pages or page ranges from your PDF. Download each section as a separate file — entirely in your browser.">
        <SplitPdfTool />
        <HowToSection heading="How to split a PDF online" steps={[{ text: "Upload your PDF using the area above." }, { text: "Enter the page range to extract (e.g. '1-3' for pages 1 to 3, or '2-2' for just page 2)." }, { text: "Click 'Split PDF'." }, { text: "Each range downloads as a separate PDF file." }]} />
        <FaqSection items={[
          { question: "Can I extract specific pages?", answer: "Yes. Enter a page range like '1-3' or '2-2' to extract those pages into a new PDF." },
          { question: "Will I get separate files for each range?", answer: "Yes. Each range you define downloads as its own PDF file." },
          { question: "How do I specify multiple ranges?", answer: "Use comma-separated ranges, e.g. '1-3, 5-7'." },
          { question: "Does this work on password-protected PDFs?", answer: "No. Remove the password from your PDF first, then split it." },
          { question: "Are my files uploaded to a server?", answer: "No. Everything runs in your browser — your files never leave your device." },
        ]} />
      </ToolLayout>
    </>
  );
}
