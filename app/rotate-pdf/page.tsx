import type { Metadata } from "next";
import dynamic from "next/dynamic";
import ToolLayout from "@/components/ToolLayout";
import HowToSection from "@/components/HowToSection";
import FaqSection from "@/components/FaqSection";
import JsonLd from "@/components/JsonLd";

const RotatePdfTool = dynamic(() => import("./RotatePdfTool"));
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://e-pdf.app";

export const metadata: Metadata = {
  title: "Rotate PDF Pages Online Free",
  description: "Rotate individual PDF pages by 90°, 180°, or 270° online — free, no signup, browser-based. Fix upside-down pages instantly.",
  alternates: { canonical: "/rotate-pdf" },
  openGraph: { title: "Rotate PDF Pages Online Free | e-pdf", description: "Fix upside-down or sideways PDF pages. Browser-based, free.", images: ["/og-image.png"] },
  twitter: { card: "summary_large_image", title: "Rotate PDF Pages Free | e-pdf" },
};

const jsonLd = [
  { "@context": "https://schema.org", "@type": "SoftwareApplication", name: "Rotate PDF Pages Online Free", applicationCategory: "UtilitiesApplication", operatingSystem: "Any (Browser-based)", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" }, description: "Rotate PDF pages in your browser — free, no signup.", url: `${siteUrl}/rotate-pdf` },
  { "@context": "https://schema.org", "@type": "HowTo", name: "How to rotate PDF pages online", step: [{ "@type": "HowToStep", text: "Upload your PDF file." }, { "@type": "HowToStep", text: "Select which pages to rotate and the rotation angle (90°, 180°, 270°)." }, { "@type": "HowToStep", text: "Click 'Apply Rotation' to download your rotated PDF." }] },
  { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: [
    { "@type": "Question", name: "Can I rotate just one page?", acceptedAnswer: { "@type": "Answer", text: "Yes. You can select individual pages and set a different rotation angle for each." } },
    { "@type": "Question", name: "Can I rotate all pages at once?", acceptedAnswer: { "@type": "Answer", text: "Yes. Use the 'Rotate All' button to apply the same rotation to every page at once." } },
    { "@type": "Question", name: "Does rotation affect text quality?", acceptedAnswer: { "@type": "Answer", text: "No. Rotation is stored as a metadata attribute in the PDF — text and images are not re-rendered." } },
    { "@type": "Question", name: "Are my files uploaded to a server?", acceptedAnswer: { "@type": "Answer", text: "No. Everything runs in your browser. Your files never leave your device." } },
  ]},
];

export default function RotatePdfPage() {
  return (
    <>
      <JsonLd data={jsonLd} />
      <ToolLayout title="Rotate PDF Pages Online — Free" description="Fix upside-down or sideways PDF pages. Rotate individual pages or the entire document by 90°, 180°, or 270° — all in your browser.">
        <RotatePdfTool />
        <HowToSection heading="How to rotate PDF pages online" steps={[{ text: "Upload your PDF using the area above." }, { text: "Choose which pages to rotate and the angle: 90°, 180°, or 270°." }, { text: "Click 'Apply Rotation'." }, { text: "Your rotated PDF downloads automatically." }]} />
        <FaqSection items={[
          { question: "Can I rotate just one specific page?", answer: "Yes. Select individual pages from the list and apply a different rotation angle to each." },
          { question: "Can I rotate all pages at once?", answer: "Yes. Use the 'Rotate All' button to apply the same rotation to every page in the document." },
          { question: "Does rotation re-compress the PDF?", answer: "No. Rotation is stored as a metadata attribute — text and images are not re-rendered or re-compressed." },
          { question: "Does this work on password-protected PDFs?", answer: "No. Remove the password from your PDF before using this tool." },
          { question: "Are my files uploaded to a server?", answer: "No. All processing runs in your browser. Your files never leave your device." },
        ]} />
      </ToolLayout>
    </>
  );
}
