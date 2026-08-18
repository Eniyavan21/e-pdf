import Link from "next/link";

const toolLinks = [
  { href: "/merge-pdf", label: "Merge PDF" },
  { href: "/compress-pdf", label: "Compress PDF" },
  { href: "/split-pdf", label: "Split PDF" },
  { href: "/images-to-pdf", label: "Images to PDF" },
  { href: "/pdf-to-word", label: "PDF to Word" },
  { href: "/word-to-pdf", label: "Word to PDF" },
  { href: "/rotate-pdf", label: "Rotate PDF" },
  { href: "/watermark-pdf", label: "Watermark PDF" },
];

const legalLinks = [
  { href: "/privacy-policy", label: "Privacy Policy" },
  { href: "/terms", label: "Terms of Service" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function Footer() {
  return (
    <footer className="bg-slate-50 border-t border-slate-200 mt-16">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <Link href="/" className="flex items-center gap-2 font-bold text-xl text-blue-600 mb-3">
              <svg width="24" height="24" viewBox="0 0 28 28" fill="none" aria-hidden="true">
                <rect width="28" height="28" rx="6" fill="#2563eb" />
                <path d="M7 8h9M7 12h14M7 16h14M7 20h9" stroke="white" strokeWidth="2" strokeLinecap="round" />
              </svg>
              e-pdf
            </Link>
            <p className="text-sm text-slate-500 leading-relaxed">
              Free, browser-based PDF tools. Your files never leave your device — all processing happens locally.
            </p>
          </div>

          {/* Tools */}
          <div>
            <h3 className="font-semibold text-slate-800 mb-3 text-sm uppercase tracking-wide">
              PDF Tools
            </h3>
            <ul className="space-y-2">
              {toolLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-slate-500 hover:text-blue-600 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-semibold text-slate-800 mb-3 text-sm uppercase tracking-wide">
              Company
            </h3>
            <ul className="space-y-2">
              {legalLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-slate-500 hover:text-blue-600 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3 text-sm text-slate-400">
          <p>© {new Date().getFullYear()} e-pdf. All rights reserved.</p>
          <p>100% free &bull; No signup &bull; Files stay in your browser</p>
        </div>
      </div>
    </footer>
  );
}
