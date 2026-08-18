import type { Metadata } from "next";
import dynamic from "next/dynamic";
import ToolLayout from "@/components/ToolLayout";
import HowToSection from "@/components/HowToSection";
import FaqSection from "@/components/FaqSection";
import JsonLd from "@/components/JsonLd";

const PdfToWordTool = dynamic(() => import("./PdfToWordTool"));
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://e-pdf.app";

export const metadata: Metadata = {
  title: "PDF to Word Converter Free Online",
  description: "Convert PDF to Word DOCX online for free — extract text from any PDF and download an editable Word document. No signup, browser-based.",
  alternates: { canonical: "/pdf-to-word" },
  openGraph: { title: "PDF to Word Converter Free | e-pdf", description: "Extract text from PDF and download as DOCX. Free, browser-based.", images: ["/og-image.png"] },
  twitter: { card: "summary_large_image", title: "PDF to Word Converter Free | e-pdf" },
};

const jsonLd = [
  { "@context": "https://schema.org", "@type": "SoftwareApplication", name: "PDF to Word Converter Free Online", applicationCategory: "UtilitiesApplication", operatingSystem: "Any (Browser-based)", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" }, description: "Free PDF to Word converter. Extract text from PDF and download as DOCX — browser-based, no signup.", url: `${siteUrl}/pdf-to-word` },
  { "@context": "https://schema.org", "@type": "HowTo", name: "How to convert PDF to Word online", step: [{ "@type": "HowToStep", text: "Upload your PDF file." }, { "@type": "HowToStep", text: "Click 'Convert to Word'." }, { "@type": "HowToStep", text: "Download your DOCX file." }] },
  { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: [
    { "@type": "Question", name: "Does it keep the original formatting?", acceptedAnswer: { "@type": "Answer", text: "No. This tool extracts text only — formatting, images, columns, and tables are not preserved. This is a browser-side limitation; full layout preservation requires server-side processing." } },
    { "@type": "Question", name: "What about scanned PDFs?", acceptedAnswer: { "@type": "Answer", text: "Scanned PDFs contain images, not text. Without OCR (optical character recognition), no text can be extracted from them. This tool does not include OCR." } },
    { "@type": "Question", name: "Is the DOCX file editable?", acceptedAnswer: { "@type": "Answer", text: "Yes. The output is a standard .docx file that can be opened and edited in Microsoft Word, Google Docs, or LibreOffice." } },
    { "@type": "Question", name: "Are my files uploaded to a server?", acceptedAnswer: { "@type": "Answer", text: "No. All processing runs in your browser. Your files never leave your device." } },
  ]},
];

export default function PdfToWordPage() {
  return (
    <>
      <JsonLd data={jsonLd} />
      <ToolLayout title="PDF to Word Converter — Free Online" description="Extract text from any PDF and download it as an editable Word document. Text-only extraction — all in your browser, no signup.">
        <div className="mb-4 rounded-xl bg-amber-50 border border-amber-200 px-4 py-3 text-sm text-amber-800">
          <strong>Note:</strong> This tool extracts text only. Formatting, images, tables, and columns are not preserved — this is a browser limitation. Scanned PDFs (images-only) will produce an empty document.
        </div>
        <PdfToWordTool />
        <HowToSection heading="How to convert PDF to Word online" steps={[{ text: "Upload your PDF file using the area above." }, { text: "Click 'Convert to Word'." }, { text: "Download your DOCX file and open it in Word or Google Docs." }]} />
        <FaqSection items={[
          { question: "Does it keep the original formatting?", answer: "No. This is text-only extraction — formatting, images, columns, and tables are not preserved. This is a fundamental browser limitation." },
          { question: "What about scanned PDFs?", answer: "Scanned PDFs contain images rather than text. This tool cannot extract text from scanned documents as it does not include OCR." },
          { question: "Is the DOCX file editable?", answer: "Yes. The output is a standard .docx file you can open and edit in Microsoft Word, Google Docs, or LibreOffice." },
          { question: "Are my files uploaded to a server?", answer: "No. All processing runs entirely in your browser. Your files never leave your device." },
          { question: "Can it convert encrypted PDFs?", answer: "No. Please remove the password from your PDF first." },
        ]} />
      </ToolLayout>
    </>
  );
}
