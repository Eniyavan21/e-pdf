"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

const tools = [
  { href: "/merge-pdf", label: "Merge PDF", color: "from-blue-600 to-indigo-600" },
  { href: "/compress-pdf", label: "Compress PDF", color: "from-emerald-500 to-teal-600" },
  { href: "/split-pdf", label: "Split PDF", color: "from-violet-600 to-purple-600" },
  { href: "/images-to-pdf", label: "Images to PDF", color: "from-rose-500 to-pink-600" },
  { href: "/pdf-to-word", label: "PDF to Word", color: "from-cyan-500 to-blue-600" },
  { href: "/word-to-pdf", label: "Word to PDF", color: "from-sky-500 to-indigo-600" },
  { href: "/rotate-pdf", label: "Rotate PDF", color: "from-amber-500 to-orange-600" },
  { href: "/watermark-pdf", label: "Watermark PDF", color: "from-fuchsia-500 to-pink-600" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="bg-white/90 backdrop-blur-md border-b border-slate-200/80 sticky top-0 z-50 transition-all">
      <div className="max-w-6xl mx-auto px-4 flex items-center justify-between h-16">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <Image src="/pdf.png" alt="e-pdf logo" width={135} height={135} priority className="group-hover:scale-105 transition-transform" />
        </Link>

        {/* Desktop navigation */}
        <div className="hidden md:flex items-center gap-7">
          <Link href="/" className="text-slate-700 hover:text-blue-600 font-semibold text-sm transition-colors">
            Home
          </Link>
          
          <div className="relative group">
            <button className="flex items-center gap-1.5 text-slate-700 hover:text-blue-600 font-semibold text-sm transition-colors py-2">
              Tools
              <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
                <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" fill="none" />
              </svg>
            </button>

            {/* Dropdown Menu */}
            <div className="absolute left-0 top-full mt-1 w-56 bg-white border border-slate-200/90 rounded-2xl shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 p-1.5">
              {tools.map((t) => (
                <Link
                  key={t.href}
                  href={t.href}
                  className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm font-medium text-slate-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                >
                  <span className={`w-2 h-2 rounded-full bg-gradient-to-r ${t.color}`}></span>
                  {t.label}
                </Link>
              ))}
            </div>
          </div>

          <Link href="/about" className="text-slate-700 hover:text-blue-600 font-semibold text-sm transition-colors">
            About
          </Link>

          <Link
            href="/compress-pdf"
            className="px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold text-xs uppercase tracking-wider rounded-xl transition-all shadow-sm hover:shadow-md"
          >
            Try Compress PDF
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden p-2 rounded-xl text-slate-600 hover:bg-slate-100 transition-colors"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
            {open ? (
              <path d="M4 4l14 14M18 4L4 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            ) : (
              <path d="M3 6h16M3 11h16M3 16h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden border-t border-slate-200/80 bg-white px-4 py-3 space-y-1 animate-fade-in">
          <Link
            href="/"
            onClick={() => setOpen(false)}
            className="block py-2.5 px-3 rounded-xl text-slate-800 hover:bg-blue-50 hover:text-blue-600 transition-colors font-semibold text-sm"
          >
            Home
          </Link>
          <div className="pt-2 pb-1 border-t border-slate-100">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 px-3">PDF Tools</span>
            {tools.map((t) => (
              <Link
                key={t.href}
                href={t.href}
                onClick={() => setOpen(false)}
                className="flex items-center gap-2 py-2 px-3 rounded-xl text-slate-700 hover:bg-blue-50 hover:text-blue-600 transition-colors text-sm font-medium"
              >
                <span className={`w-2 h-2 rounded-full bg-gradient-to-r ${t.color}`}></span>
                {t.label}
              </Link>
            ))}
          </div>
          <div className="pt-2 border-t border-slate-100">
            <Link
              href="/about"
              onClick={() => setOpen(false)}
              className="block py-2.5 px-3 rounded-xl text-slate-700 hover:bg-blue-50 hover:text-blue-600 transition-colors text-sm font-medium"
            >
              About
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
