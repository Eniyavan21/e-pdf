"use client";

import { useState } from "react";
import FileDropzone from "@/components/FileDropzone";
import ProgressBar from "@/components/ProgressBar";
import ResultPreviewCard from "@/components/preview/ResultPreviewCard";
import PdfViewerPreview from "@/components/preview/PdfViewerPreview";
import { rotatePdf } from "@/lib/rotate-pdf";

const ACCEPT = { "application/pdf": [".pdf"] };
type Deg = 90 | 180 | 270;

export default function RotatePdfTool() {
  const [file, setFile] = useState<File | null>(null);
  const [pageCount, setPageCount] = useState<number | null>(null);
  const [rotations, setRotations] = useState<Record<number, Deg>>({});
  const [globalDeg, setGlobalDeg] = useState<Deg>(90);
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [rotatedData, setRotatedData] = useState<Uint8Array | null>(null);

  const handleFiles = async (files: File[]) => {
    const f = files[0];
    setFile(f);
    setRotations({});
    setRotatedData(null);
    setError(null);
    try {
      const { PDFDocument } = await import("pdf-lib");
      const doc = await PDFDocument.load(await f.arrayBuffer());
      setPageCount(doc.getPageCount());
    } catch {
      setPageCount(null);
    }
  };

  const setPageRotation = (index: number, deg: Deg) => {
    setRotations((prev) => ({ ...prev, [index]: deg }));
  };

  const rotateAll = () => {
    if (!pageCount) return;
    const all: Record<number, Deg> = {};
    for (let i = 0; i < pageCount; i++) all[i] = globalDeg;
    setRotations(all);
  };

  const handleApply = async () => {
    if (!file || Object.keys(rotations).length === 0) {
      setError("Please select at least one page and a rotation angle.");
      return;
    }
    setProcessing(true);
    setError(null);
    setRotatedData(null);
    try {
      const buffer = await file.arrayBuffer();
      const result = await rotatePdf(buffer, rotations);
      setRotatedData(result);
    } catch (e) {
      setError(e instanceof Error ? e.message : "An unexpected error occurred.");
    } finally {
      setProcessing(false);
    }
  };

  const resetAll = () => {
    setFile(null);
    setPageCount(null);
    setRotations({});
    setRotatedData(null);
    setError(null);
  };

  if (rotatedData) {
    const outputFilename = file ? file.name.replace(/\.pdf$/i, "-rotated.pdf") : "rotated.pdf";
    return (
      <ResultPreviewCard
        title="PDF pages rotated successfully!"
        filename={outputFilename}
        data={rotatedData}
        stats={[
          { label: "Total Pages", value: pageCount || "-" },
          { label: "Pages Rotated", value: Object.keys(rotations).length, highlight: true },
        ]}
        onReset={resetAll}
        onEdit={() => setRotatedData(null)}
      >
        <PdfViewerPreview data={rotatedData} />
      </ResultPreviewCard>
    );
  }

  return (
    <section>
      <FileDropzone onFiles={handleFiles} accept={ACCEPT} label="PDF file" />

      {pageCount && (
        <div className="mt-5">
          <div className="flex items-center gap-3 mb-3">
            <span className="text-sm text-slate-600">{pageCount} page{pageCount !== 1 ? "s" : ""}</span>
            <select value={globalDeg} onChange={(e) => setGlobalDeg(Number(e.target.value) as Deg)} className="border border-slate-300 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option value={90}>90° clockwise</option>
              <option value={180}>180°</option>
              <option value={270}>90° counter-clockwise</option>
            </select>
            <button onClick={rotateAll} className="px-3 py-1.5 text-sm bg-blue-50 text-blue-700 border border-blue-200 rounded-lg hover:bg-blue-100 transition-colors">Rotate All</button>
          </div>

          <div className="space-y-1 max-h-64 overflow-y-auto pr-1">
            {Array.from({ length: pageCount }, (_, i) => (
              <div key={i} className="flex items-center justify-between bg-slate-50 border border-slate-200 rounded-lg px-3 py-2">
                <span className="text-sm text-slate-700">Page {i + 1}</span>
                <select
                  value={rotations[i] ?? ""}
                  onChange={(e) => e.target.value ? setPageRotation(i, Number(e.target.value) as Deg) : setRotations((prev) => { const n = { ...prev }; delete n[i]; return n; })}
                  className="border border-slate-300 rounded-lg px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">No rotation</option>
                  <option value={90}>90° clockwise</option>
                  <option value={180}>180°</option>
                  <option value={270}>90° counter-clockwise</option>
                </select>
              </div>
            ))}
          </div>
        </div>
      )}

      {error && <p className="mt-4 text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-4 py-3" role="alert">{error}</p>}
      {processing && <div className="mt-4"><ProgressBar label="Applying rotation…" /></div>}

      <button onClick={handleApply} disabled={processing || !file} className="mt-6 w-full py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-300 disabled:cursor-not-allowed text-white font-semibold rounded-xl transition-colors">
        {processing ? "Applying…" : "Apply Rotation"}
      </button>
    </section>
  );
}

