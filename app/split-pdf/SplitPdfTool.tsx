"use client";

import { useState } from "react";
import FileDropzone from "@/components/FileDropzone";
import ProgressBar from "@/components/ProgressBar";
import ResultPreviewCard from "@/components/preview/ResultPreviewCard";
import PdfViewerPreview from "@/components/preview/PdfViewerPreview";
import { splitPdf } from "@/lib/split-pdf";
import { downloadFile } from "@/lib/download";

const ACCEPT = { "application/pdf": [".pdf"] };

function parseRanges(input: string, totalPages: number): [number, number][] {
  return input
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean)
    .map((part) => {
      const match = part.match(/^(\d+)(?:-(\d+))?$/);
      if (!match) throw new Error(`Invalid range: "${part}". Use format like "1-3" or "2".`);
      const start = parseInt(match[1], 10);
      const end = match[2] ? parseInt(match[2], 10) : start;
      if (start < 1 || end < start || end > totalPages)
        throw new Error(`Range "${part}" is out of bounds (PDF has ${totalPages} pages).`);
      return [start, end] as [number, number];
    });
}

interface SplitResult {
  filename: string;
  buffer: Uint8Array;
  rangeStr: string;
}

export default function SplitPdfTool() {
  const [file, setFile] = useState<File | null>(null);
  const [pageCount, setPageCount] = useState<number | null>(null);
  const [rangeInput, setRangeInput] = useState("1-1");
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [splitResults, setSplitResults] = useState<SplitResult[] | null>(null);
  const [selectedIndex, setSelectedIndex] = useState<number>(0);

  const handleFiles = async (files: File[]) => {
    const f = files[0];
    setFile(f);
    setError(null);
    setSplitResults(null);
    setSelectedIndex(0);
    try {
      const { PDFDocument } = await import("pdf-lib");
      const doc = await PDFDocument.load(await f.arrayBuffer());
      setPageCount(doc.getPageCount());
    } catch {
      setPageCount(null);
    }
  };

  const handleSplit = async () => {
    if (!file || !pageCount) return;
    setProcessing(true);
    setError(null);
    setSplitResults(null);
    try {
      const ranges = parseRanges(rangeInput, pageCount);
      const buffer = await file.arrayBuffer();
      const parts = await splitPdf(buffer, ranges);
      const baseName = file.name.replace(/\.pdf$/i, "");

      const results: SplitResult[] = parts.map((part, i) => {
        const [start, end] = ranges[i];
        return {
          filename: `${baseName}-pages-${start}-${end}.pdf`,
          buffer: part,
          rangeStr: `Pages ${start}–${end}`,
        };
      });

      setSplitResults(results);
      setSelectedIndex(0);
    } catch (e) {
      setError(e instanceof Error ? e.message : "An unexpected error occurred.");
    } finally {
      setProcessing(false);
    }
  };

  const resetAll = () => {
    setFile(null);
    setPageCount(null);
    setSplitResults(null);
    setError(null);
  };

  const handleDownloadAll = () => {
    if (!splitResults) return;
    splitResults.forEach((res) => {
      downloadFile(res.buffer, res.filename);
    });
  };

  if (splitResults && splitResults.length > 0) {
    const selected = splitResults[selectedIndex] || splitResults[0];

    return (
      <div>
        <ResultPreviewCard
          title={splitResults.length === 1 ? "PDF split successfully!" : `PDF split into ${splitResults.length} files!`}
          filename={selected.filename}
          data={selected.buffer}
          stats={[
            { label: "Original PDF Pages", value: pageCount || "-" },
            { label: "Split Files Generated", value: splitResults.length, highlight: true },
            { label: "Selected Range", value: selected.rangeStr },
          ]}
          onReset={resetAll}
          onEdit={() => setSplitResults(null)}
        >
          {/* File Switcher Tabs if multiple split files */}
          {splitResults.length > 1 && (
            <div className="mb-4 bg-slate-100 p-2 rounded-xl border border-slate-200">
              <div className="flex items-center justify-between mb-2 px-1">
                <span className="text-xs font-semibold text-slate-600 uppercase tracking-wider">Select file to preview</span>
                <button
                  type="button"
                  onClick={handleDownloadAll}
                  className="text-xs font-semibold text-blue-600 hover:text-blue-700 bg-white hover:bg-blue-50 px-2.5 py-1 rounded border border-blue-200 transition-colors"
                >
                  Download All ({splitResults.length} files)
                </button>
              </div>
              <div className="flex flex-wrap gap-1.5 max-h-36 overflow-y-auto">
                {splitResults.map((res, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setSelectedIndex(i)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                      i === selectedIndex
                        ? "bg-blue-600 text-white shadow-sm font-semibold"
                        : "bg-white text-slate-700 hover:bg-slate-200 border border-slate-200"
                    }`}
                  >
                    {res.rangeStr} ({Math.round(res.buffer.byteLength / 1024)} KB)
                  </button>
                ))}
              </div>
            </div>
          )}

          <PdfViewerPreview data={selected.buffer} />
        </ResultPreviewCard>
      </div>
    );
  }

  return (
    <section>
      <FileDropzone onFiles={handleFiles} accept={ACCEPT} label="PDF file" />
      {pageCount && <p className="mt-2 text-sm text-slate-500">PDF has <strong>{pageCount}</strong> page{pageCount !== 1 ? "s" : ""}.</p>}

      <label className="block mt-5 mb-1 text-sm font-medium text-slate-700">
        Page range(s) to extract <span className="text-slate-400 font-normal">(e.g. 1-3, 5-7)</span>
      </label>
      <input
        type="text"
        value={rangeInput}
        onChange={(e) => setRangeInput(e.target.value)}
        placeholder="e.g. 1-3"
        className="w-full border border-slate-300 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      {error && <p className="mt-4 text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-4 py-3" role="alert">{error}</p>}
      {processing && <div className="mt-4"><ProgressBar label="Splitting PDF…" /></div>}

      <button
        onClick={handleSplit}
        disabled={processing || !file}
        className="mt-6 w-full py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-300 disabled:cursor-not-allowed text-white font-semibold rounded-xl transition-colors"
      >
        {processing ? "Splitting…" : "Split PDF"}
      </button>
    </section>
  );
}

