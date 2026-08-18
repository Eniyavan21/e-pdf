import type { Metadata } from "next";
import dynamic from "next/dynamic";
import ToolLayout from "@/components/ToolLayout";
import HowToSection from "@/components/HowToSection";
import FaqSection from "@/components/FaqSection";
import JsonLd from "@/components/JsonLd";

const MergePdfTool = dynamic(() => import("./MergePdfTool"));

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://e-pdf.app";

export const metadata: Metadata = {
  title: "Merge PDF Online Free",
  description:
    "Combine multiple PDF files into one document online â€” free, no upload to server, no signup required. Works in any browser.",
  alternates: { canonical: "/merge-pdf" },
  openGraph: {
    title: "Merge PDF Online Free | e-pdf",
    description: "Combine multiple PDFs into one. Browser-based, free, no signup.",
    images: ["/og-image.png"],
  },
  twitter: { card: "summary_large_image", title: "Merge PDF Online Free | e-pdf" },
};

const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Merge PDF Online Free",
    applicationCategory: "UtilitiesApplication",
    operatingSystem: "Any (Browser-based)",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    description: "Free online PDF merger. Combine multiple PDF files into one in your browser â€” no upload, no signup.",
    url: `${siteUrl}/merge-pdf`,
  },
  {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "How to merge PDF files online",
    step: [
      { "@type": "HowToStep", text: "Click 'Browse' or drag your PDF files into the upload area." },
      { "@type": "HowToStep", text: "Add as many PDF files as you need." },
      { "@type": "HowToStep", text: "Click the 'Merge PDFs' button." },
      { "@type": "HowToStep", text: "Your merged PDF will download automatically." },
    ],
  },
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      { "@type": "Question", name: "How many PDFs can I merge at once?", acceptedAnswer: { "@type": "Answer", text: "You can merge as many PDFs as you like. There is no hard limit â€” just your browser's available memory." } },
      { "@type": "Question", name: "Is there a file size limit?", acceptedAnswer: { "@type": "Answer", text: "Each file must be under 50 MB. The combined size is limited by your browser's memory." } },
      { "@type": "Question", name: "Does merging PDFs keep the original quality?", acceptedAnswer: { "@type": "Answer", text: "Yes. Pages are copied directly without re-encoding, so quality is identical to the original." } },
      { "@type": "Question", name: "Can I merge password-protected PDFs?", acceptedAnswer: { "@type": "Answer", text: "No. Please remove the password from your PDFs before merging." } },
      { "@type": "Question", name: "Are my files uploaded to your server?", acceptedAnswer: { "@type": "Answer", text: "No. All processing happens in your browser. Your files never leave your device." } },
    ],
  },
];

export default function MergePdfPage() {
  return (
    <>
      <JsonLd data={jsonLd} />
      <ToolLayout
        title="Merge PDF Online â€” Free & Fast"
        description="Combine multiple PDF files into one document. Select your PDFs, click merge, and download â€” all in your browser, no signup needed."
      >
        <MergePdfTool />

        <HowToSection
          heading="How to merge PDF files online"
          steps={[
            { text: "Click 'Browse' or drag your PDF files into the upload area above." },
            { text: "Add as many PDF files as you need to the list." },
            { text: "Click the 'Merge PDFs' button." },
            { text: "Your merged PDF will download automatically to your device." },
          ]}
        />

        <FaqSection
          items={[
            { question: "How many PDFs can I merge at once?", answer: "You can merge as many PDFs as you like â€” there is no hard limit, just your browser's available memory." },
            { question: "Is there a file size limit?", answer: "Each individual file must be under 50 MB. The combined output size is limited only by your browser's memory." },
            { question: "Does merging PDFs keep the original quality?", answer: "Yes. Pages are copied directly without re-encoding, so quality is identical to the originals." },
            { question: "Can I merge password-protected PDFs?", answer: "No. Please remove the password from your PDFs before merging. You can do this in Adobe Acrobat or your PDF viewer." },
            { question: "Are my files uploaded to your server?", answer: "Never. All processing runs entirely in your browser using JavaScript. Your files never leave your device." },
          ]}
        />
      </ToolLayout>
    </>
  );
}
