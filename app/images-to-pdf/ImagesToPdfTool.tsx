"use client";

import { useState, useCallback } from "react";
import FileDropzone from "@/components/FileDropzone";
import ProgressBar from "@/components/ProgressBar";
import ResultPreviewCard from "@/components/preview/ResultPreviewCard";
import PdfViewerPreview from "@/components/preview/PdfViewerPreview";
import { imagesToPdf } from "@/lib/images-to-pdf";

const ACCEPT = { "image/jpeg": [".jpg", ".jpeg"], "image/png": [".png"] };

export default function ImagesToPdfTool() {
  const [files, setFiles] = useState<File[]>([]);
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [pdfData, setPdfData] = useState<Uint8Array | null>(null);

  const handleFiles = useCallback((incoming: File[]) => {
    setFiles((prev) => [...prev, ...incoming]);
    setPdfData(null);
    setError(null);
  }, []);

  const handleConvert = async () => {
    if (files.length === 0) return;
    setProcessing(true);
    setError(null);
    try {
      const pdf = await imagesToPdf(files);
      setPdfData(pdf);
    } catch (e) {
      setError(e instanceof Error ? e.message : "An unexpected error occurred.");
    } finally {
      setProcessing(false);
    }
  };

  const resetAll = () => {
    setFiles([]);
    setPdfData(null);
    setError(null);
  };

  if (pdfData) {
    return (
      <ResultPreviewCard
        title="Images converted to PDF successfully!"
        filename="images.pdf"
        data={pdfData}
        stats={[
          { label: "Images Converted", value: files.length },
          { label: "PDF Output Size", value: `${Math.round(pdfData.byteLength / 1024)} KB`, highlight: true },
        ]}
        onReset={resetAll}
        onEdit={() => setPdfData(null)}
      >
        <PdfViewerPreview data={pdfData} />
      </ResultPreviewCard>
    );
  }

  return (
    <section>
      <FileDropzone onFiles={handleFiles} accept={ACCEPT} multiple label="JPG or PNG images" />

      {files.length > 0 && (
        <ul className="mt-4 space-y-1">
          {files.map((f, i) => (
            <li key={i} className="flex items-center justify-between text-sm bg-slate-50 border border-slate-200 rounded-lg px-3 py-2">
              <span className="truncate text-slate-700">{f.name}</span>
              <button onClick={() => setFiles((prev) => prev.filter((_, j) => j !== i))} className="ml-3 text-slate-400 hover:text-red-500 shrink-0" aria-label={`Remove ${f.name}`}>✕</button>
            </li>
          ))}
        </ul>
      )}

      {error && <p className="mt-4 text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-4 py-3" role="alert">{error}</p>}
      {processing && <div className="mt-4"><ProgressBar label="Converting to PDF…" /></div>}

      <button onClick={handleConvert} disabled={processing || files.length === 0} className="mt-6 w-full py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-300 disabled:cursor-not-allowed text-white font-semibold rounded-xl transition-colors">
        {processing ? "Converting…" : "Convert to PDF"}
      </button>
    </section>
  );
}

