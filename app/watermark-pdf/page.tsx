import type { Metadata } from "next";
import dynamic from "next/dynamic";
import ToolLayout from "@/components/ToolLayout";
import HowToSection from "@/components/HowToSection";
import FaqSection from "@/components/FaqSection";
import JsonLd from "@/components/JsonLd";

const WatermarkPdfTool = dynamic(() => import("./WatermarkPdfTool"));
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://e-pdf.app";

export const metadata: Metadata = {
  title: "Add Watermark to PDF Free Online",
  description: "Add a custom text watermark to every page of your PDF — free, no signup, browser-based. Customise text, opacity, size, and rotation.",
  alternates: { canonical: "/watermark-pdf" },
  openGraph: { title: "Add Watermark to PDF Free | e-pdf", description: "Stamp a custom text watermark on your PDF. Browser-based, free.", images: ["/og-image.png"] },
  twitter: { card: "summary_large_image", title: "Add Watermark to PDF Free | e-pdf" },
};

const jsonLd = [
  { "@context": "https://schema.org", "@type": "SoftwareApplication", name: "Add Watermark to PDF Free Online", applicationCategory: "UtilitiesApplication", operatingSystem: "Any (Browser-based)", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" }, description: "Add a text watermark to your PDF in the browser — free, no server upload.", url: `${siteUrl}/watermark-pdf` },
  { "@context": "https://schema.org", "@type": "HowTo", name: "How to add a watermark to a PDF online", step: [{ "@type": "HowToStep", text: "Upload your PDF file." }, { "@type": "HowToStep", text: "Enter your watermark text and customise opacity, size, and angle." }, { "@type": "HowToStep", text: "Click 'Add Watermark' to download your watermarked PDF." }] },
  { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: [
    { "@type": "Question", name: "Can I customise the watermark text?", acceptedAnswer: { "@type": "Answer", text: "Yes. You can set any text and customise the opacity (0–100%), font size, and rotation angle." } },
    { "@type": "Question", name: "Is the watermark on every page?", acceptedAnswer: { "@type": "Answer", text: "Yes. The watermark is applied to all pages in the PDF." } },
    { "@type": "Question", name: "Can I add an image watermark?", acceptedAnswer: { "@type": "Answer", text: "This tool supports text watermarks only. Image watermarks are not currently available." } },
    { "@type": "Question", name: "Are my files uploaded to a server?", acceptedAnswer: { "@type": "Answer", text: "No. All processing runs in your browser. Your files never leave your device." } },
  ]},
];

export default function WatermarkPdfPage() {
  return (
    <>
      <JsonLd data={jsonLd} />
      <ToolLayout title="Add Watermark to PDF — Free Online" description="Stamp a custom text watermark on every page of your PDF. Set opacity, size, and rotation. 100% browser-based, free, no signup.">
        <WatermarkPdfTool />
        <HowToSection heading="How to add a watermark to a PDF online" steps={[{ text: "Upload your PDF using the area above." }, { text: "Enter your watermark text and adjust the settings (opacity, size, angle)." }, { text: "Click 'Add Watermark'." }, { text: "Your watermarked PDF downloads automatically." }]} />
        <FaqSection items={[
          { question: "Can I customise the watermark text?", answer: "Yes. Enter any text and adjust the opacity (0–100%), font size, and rotation angle to your preference." },
          { question: "Is the watermark applied to every page?", answer: "Yes. The watermark is placed on all pages in the PDF." },
          { question: "Can I add an image watermark?", answer: "This tool supports text watermarks only at this time. Image watermarks are not currently available." },
          { question: "Will the watermark affect text readability?", answer: "You can set the opacity very low (e.g. 20–30%) to make the watermark subtle and non-intrusive." },
          { question: "Are my files uploaded to a server?", answer: "No. All processing runs in your browser. Your files never leave your device." },
        ]} />
      </ToolLayout>
    </>
  );
}
