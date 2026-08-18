import type { Metadata } from "next";
import dynamic from "next/dynamic";
import ToolLayout from "@/components/ToolLayout";
import HowToSection from "@/components/HowToSection";
import FaqSection from "@/components/FaqSection";
import JsonLd from "@/components/JsonLd";

const WordToPdfTool = dynamic(() => import("./WordToPdfTool"));
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://e-pdf.app";

export const metadata: Metadata = {
  title: "Word to PDF Converter Online Free",
  description: "Convert Word DOCX files to PDF online for free — no upload to server, no signup required. Works in any browser.",
  alternates: { canonical: "/word-to-pdf" },
  openGraph: { title: "Word to PDF Converter Online Free | e-pdf", description: "Convert DOCX to PDF in your browser. Free, no signup.", images: ["/og-image.png"] },
  twitter: { card: "summary_large_image", title: "Word to PDF Converter Free | e-pdf" },
};

const jsonLd = [
  { "@context": "https://schema.org", "@type": "SoftwareApplication", name: "Word to PDF Converter Online Free", applicationCategory: "UtilitiesApplication", operatingSystem: "Any (Browser-based)", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" }, description: "Convert Word DOCX to PDF in your browser for free — no server upload.", url: `${siteUrl}/word-to-pdf` },
  { "@context": "https://schema.org", "@type": "HowTo", name: "How to convert Word to PDF online", step: [{ "@type": "HowToStep", text: "Upload your DOCX file." }, { "@type": "HowToStep", text: "Click 'Convert to PDF'." }, { "@type": "HowToStep", text: "Download your PDF file." }] },
  { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: [
    { "@type": "Question", name: "Will my fonts be embedded in the PDF?", acceptedAnswer: { "@type": "Answer", text: "The output is rendered by your browser, so it uses your system fonts. Bold, italic, and standard headings are preserved." } },
    { "@type": "Question", name: "Does it work on Mac and mobile?", acceptedAnswer: { "@type": "Answer", text: "Yes. This is a browser-based tool that works on any device with a modern browser." } },
    { "@type": "Question", name: "Is the layout perfectly preserved?", acceptedAnswer: { "@type": "Answer", text: "Approximate layout only. Simple formatting (headings, bold, italic, lists, tables) is preserved. Complex layouts with floating images or columns may not render perfectly." } },
    { "@type": "Question", name: "Is the conversion free?", acceptedAnswer: { "@type": "Answer", text: "Yes, completely free. No signup, no limits." } },
    { "@type": "Question", name: "Are my files uploaded to a server?", acceptedAnswer: { "@type": "Answer", text: "No. Everything runs locally in your browser. Your files never leave your device." } },
  ]},
];

export default function WordToPdfPage() {
  return (
    <>
      <JsonLd data={jsonLd} />
      <ToolLayout title="Word to PDF Converter — Online Free" description="Convert your DOCX Word document into a PDF instantly — right in your browser. No signup, no server upload, completely free.">
        <div className="mb-4 rounded-xl bg-amber-50 border border-amber-200 px-4 py-3 text-sm text-amber-800">
          <strong>Note:</strong> Layout is approximate. Simple formatting (headings, bold, italic, lists, tables) is preserved. Complex layouts with floating images or columns may not render perfectly — this is a browser limitation.
        </div>
        <WordToPdfTool />
        <HowToSection heading="How to convert Word to PDF online" steps={[{ text: "Upload your DOCX file using the area above." }, { text: "Click 'Convert to PDF'." }, { text: "Your PDF will download automatically." }]} />
        <FaqSection items={[
          { question: "Will my fonts be embedded in the PDF?", answer: "The output is rendered by your browser, so it uses your system fonts. Common formatting like bold, italic, and headings is preserved." },
          { question: "Does it work on Mac and mobile?", answer: "Yes. This is a browser-based tool that works on any device with a modern browser — Windows, Mac, iOS, Android." },
          { question: "Is the layout perfectly preserved?", answer: "Approximate only. Simple formatting is preserved. Complex layouts with floating images, columns, or footnotes may not render perfectly." },
          { question: "Is it completely free?", answer: "Yes. No signup, no limits, no hidden fees." },
          { question: "Are my files uploaded to a server?", answer: "No. All conversion happens locally in your browser. Your files never leave your device." },
        ]} />
      </ToolLayout>
    </>
  );
}
