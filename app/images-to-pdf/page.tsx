import type { Metadata } from "next";
import dynamic from "next/dynamic";
import ToolLayout from "@/components/ToolLayout";
import HowToSection from "@/components/HowToSection";
import FaqSection from "@/components/FaqSection";
import JsonLd from "@/components/JsonLd";

const ImagesToPdfTool = dynamic(() => import("./ImagesToPdfTool"));
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://e-pdf.app";

export const metadata: Metadata = {
  title: "Convert Image to PDF Online Free",
  description: "Convert JPG, PNG, or multiple images to a single PDF file online — free, no upload to server, no signup. Works in any browser.",
  alternates: { canonical: "/images-to-pdf" },
  openGraph: { title: "Convert Image to PDF Online Free | e-pdf", description: "Turn JPG/PNG images into a PDF. Browser-based, free.", images: ["/og-image.png"] },
  twitter: { card: "summary_large_image", title: "Image to PDF Online Free | e-pdf" },
};

const jsonLd = [
  { "@context": "https://schema.org", "@type": "SoftwareApplication", name: "Image to PDF Converter Online Free", applicationCategory: "UtilitiesApplication", operatingSystem: "Any (Browser-based)", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" }, description: "Free online image to PDF converter. Convert JPG/PNG photos to PDF in your browser.", url: `${siteUrl}/images-to-pdf` },
  { "@context": "https://schema.org", "@type": "HowTo", name: "How to convert images to PDF online", step: [{ "@type": "HowToStep", text: "Upload one or more JPG or PNG images." }, { "@type": "HowToStep", text: "Reorder them if needed." }, { "@type": "HowToStep", text: "Click 'Convert to PDF' to download your PDF." }] },
  { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: [
    { "@type": "Question", name: "What image formats are supported?", acceptedAnswer: { "@type": "Answer", text: "JPEG (.jpg, .jpeg) and PNG (.png) are supported. WebP and GIF are not supported at this time." } },
    { "@type": "Question", name: "Can I combine multiple images into one PDF?", acceptedAnswer: { "@type": "Answer", text: "Yes. Upload multiple images and each one becomes a page in the resulting PDF." } },
    { "@type": "Question", name: "What page size does the output use?", acceptedAnswer: { "@type": "Answer", text: "Each image is fitted to an A4 page with a small margin, maintaining the original aspect ratio." } },
    { "@type": "Question", name: "Are my images uploaded to a server?", acceptedAnswer: { "@type": "Answer", text: "No. Everything runs in your browser using JavaScript. Your images never leave your device." } },
  ]},
];

export default function ImagesToPdfPage() {
  return (
    <>
      <JsonLd data={jsonLd} />
      <ToolLayout title="Convert Images to PDF Online — Free" description="Turn JPG and PNG photos into a PDF document. Upload multiple images and each one becomes a page — all converted in your browser, no signup needed.">
        <ImagesToPdfTool />
        <HowToSection heading="How to convert images to PDF online" steps={[{ text: "Click 'Browse' or drag your JPG or PNG images into the upload area." }, { text: "Add multiple images to combine them — each image becomes one page." }, { text: "Click 'Convert to PDF'." }, { text: "Your PDF will download automatically." }]} />
        <FaqSection items={[
          { question: "What image formats are supported?", answer: "JPEG (.jpg, .jpeg) and PNG (.png). WebP and GIF are not supported at this time." },
          { question: "Can I combine multiple images into one PDF?", answer: "Yes. Upload multiple images and each one becomes a page in the output PDF." },
          { question: "What page size does the output use?", answer: "Each image is fitted to an A4 page with a small margin, maintaining the original aspect ratio." },
          { question: "Does it preserve image quality?", answer: "Yes. Images are embedded directly into the PDF without re-compression." },
          { question: "Are my images uploaded to a server?", answer: "No. All conversion runs in your browser. Your images never leave your device." },
        ]} />
      </ToolLayout>
    </>
  );
}
