import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "e-pdf terms of service — acceptable use, disclaimer of warranties, and limitation of liability.",
  alternates: { canonical: "/terms" },
};

export default function TermsPage() {
  const updated = "April 17, 2026";
  return (
    <main className="max-w-2xl mx-auto px-4 py-14">
      <h1 className="text-3xl font-bold text-slate-900 mb-2">Terms of Service</h1>
      <p className="text-sm text-slate-400 mb-8">Last updated: {updated}</p>

      <div className="space-y-8 text-slate-600 leading-relaxed">
        <section>
          <h2 className="text-xl font-semibold text-slate-800 mb-3">1. Acceptance of terms</h2>
          <p>By using e-pdf you agree to these terms. If you do not agree, please do not use the service.</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-slate-800 mb-3">2. Acceptable use</h2>
          <p>You may use e-pdf for lawful purposes only. You must not use the service to process files that infringe on third-party rights, contain malware, or violate applicable laws.</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-slate-800 mb-3">3. Conversion accuracy disclaimer</h2>
          <p>The PDF tools on e-pdf are provided on an &quot;as-is&quot; basis. Conversion quality — particularly for PDF&nbsp;↔&nbsp;Word conversions — is approximate and not guaranteed. Complex layouts, scanned documents, or password-protected files may not convert correctly.</p>
          <p className="mt-2"><strong>Always keep a copy of your original files</strong> before converting or processing them.</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-slate-800 mb-3">4. No warranty</h2>
          <p>e-pdf is provided without any warranty, express or implied. We do not guarantee uninterrupted or error-free operation.</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-slate-800 mb-3">5. Limitation of liability</h2>
          <p>To the maximum extent permitted by law, e-pdf and its operators shall not be liable for any direct, indirect, incidental, or consequential damages arising from your use of the service or any file processing errors.</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-slate-800 mb-3">6. Intellectual property</h2>
          <p>You retain all rights to files you process using e-pdf. We claim no ownership over your documents.</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-slate-800 mb-3">7. Changes to terms</h2>
          <p>We may update these terms at any time. Continued use of the service after changes constitutes acceptance of the updated terms.</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-slate-800 mb-3">8. Contact</h2>
          <p>Questions about these terms? Use our <a href="/contact" className="text-blue-600 hover:underline">contact page</a>.</p>
        </section>
      </div>
    </main>
  );
}
