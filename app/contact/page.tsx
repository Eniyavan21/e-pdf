import type { Metadata } from "next";
import JsonLd from "@/components/JsonLd";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://e-pdf.app";

export const metadata: Metadata = {
  title: "Contact e-pdf",
  description: "Get in touch with the e-pdf team for questions, feedback, or bug reports.",
  alternates: { canonical: "/contact" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  url: `${siteUrl}/contact`,
  name: "Contact e-pdf",
};

export default function ContactPage() {
  return (
    <>
      <JsonLd data={jsonLd} />
      <main className="max-w-xl mx-auto px-4 py-14">
        <h1 className="text-3xl font-bold text-slate-900 mb-3">Contact Us</h1>
        <p className="text-slate-500 mb-8 leading-relaxed">
          Have a question, found a bug, or have feedback for us? We&apos;d love to hear from you.
        </p>

        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 space-y-4">
          <div>
            <h2 className="font-semibold text-slate-800 mb-1">Email us</h2>
            <a
              href="mailto:hello@e-pdf.app"
              className="text-blue-600 hover:underline text-sm"
            >
              hello@e-pdf.app
            </a>
          </div>

          <div>
            <h2 className="font-semibold text-slate-800 mb-1">Response time</h2>
            <p className="text-sm text-slate-500">We typically respond within 1–2 business days.</p>
          </div>

          <div>
            <h2 className="font-semibold text-slate-800 mb-1">Reporting a bug</h2>
            <p className="text-sm text-slate-500">
              Please include your browser name, OS, and a description of what went wrong. If possible,
              mention which tool you were using and any error messages you saw.
            </p>
          </div>
        </div>

        <div className="mt-6 text-sm text-slate-400">
          For privacy-related questions, see our{" "}
          <a href="/privacy-policy" className="text-blue-600 hover:underline">Privacy Policy</a>.
        </div>
      </main>
    </>
  );
}
