import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "e-pdf privacy policy — how we handle your data, what we collect, and how we use cookies.",
  alternates: { canonical: "/privacy-policy" },
};

export default function PrivacyPolicyPage() {
  const updated = "April 17, 2026";
  return (
    <main className="max-w-2xl mx-auto px-4 py-14">
      <h1 className="text-3xl font-bold text-slate-900 mb-2">Privacy Policy</h1>
      <p className="text-sm text-slate-400 mb-8">Last updated: {updated}</p>

      <div className="space-y-8 text-slate-600 leading-relaxed">
        <section>
          <h2 className="text-xl font-semibold text-slate-800 mb-3">1. Your files are never uploaded</h2>
          <p>All PDF processing on e-pdf runs entirely in your browser using client-side JavaScript. <strong>Your files are never transmitted to our servers</strong> — we have no servers that receive file uploads. Your documents stay on your device at all times.</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-slate-800 mb-3">2. Data we collect</h2>
          <p>We do not collect personally identifiable information. When you visit e-pdf, standard web server logs may capture your IP address and browser type for security and operational purposes.</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-slate-800 mb-3">3. Advertising (Google AdSense)</h2>
          <p>We use Google AdSense to display advertisements. Google may use cookies and similar technologies to show you relevant ads based on your browsing activity. This is governed by <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Google&apos;s Privacy Policy</a>.</p>
          <p className="mt-2">You can opt out of personalised advertising at <a href="https://adssettings.google.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Google Ad Settings</a>.</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-slate-800 mb-3">4. Cookies</h2>
          <p>e-pdf itself does not set cookies. Google AdSense may set cookies for advertising purposes as described above.</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-slate-800 mb-3">5. Third-party libraries</h2>
          <p>PDF processing libraries (pdf-lib, pdfjs-dist, docx, mammoth) run entirely in your browser. They do not transmit data externally.</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-slate-800 mb-3">6. Children&apos;s privacy</h2>
          <p>e-pdf is not directed at children under 13. We do not knowingly collect data from children.</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-slate-800 mb-3">7. Changes to this policy</h2>
          <p>We may update this policy periodically. The &quot;Last updated&quot; date at the top of this page reflects the most recent revision.</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-slate-800 mb-3">8. Contact</h2>
          <p>For privacy-related questions, please use our <a href="/contact" className="text-blue-600 hover:underline">contact page</a>.</p>
        </section>
      </div>
    </main>
  );
}
