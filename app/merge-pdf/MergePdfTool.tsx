"use client";

import { useState, useCallback } from "react";
import FileDropzone from "@/components/FileDropzone";
import ProgressBar from "@/components/ProgressBar";
import ResultPreviewCard from "@/components/preview/ResultPreviewCard";
import PdfViewerPreview from "@/components/preview/PdfViewerPreview";
import { mergePdfs } from "@/lib/merge-pdf";

const ACCEPT = { "application/pdf": [".pdf"] };

export default function MergePdfTool() {
  const [files, setFiles] = useState<File[]>([]);
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [mergedData, setMergedData] = useState<Uint8Array | null>(null);

  const handleFiles = useCallback((incoming: File[]) => {
    setFiles((prev) => [...prev, ...incoming]);
    setMergedData(null);
    setError(null);
  }, []);

  const handleMerge = async () => {
    if (files.length < 2) { setError("Please add at least 2 PDF files."); return; }
    setProcessing(true);
    setError(null);
    try {
      const buffers = await Promise.all(files.map((f) => f.arrayBuffer()));
      const merged = await mergePdfs(buffers);
      setMergedData(merged);
    } catch (e) {
      setError(e instanceof Error ? e.message : "An unexpected error occurred.");
    } finally {
      setProcessing(false);
    }
  };

  const resetAll = () => {
    setFiles([]);
    setMergedData(null);
    setError(null);
  };

  if (mergedData) {
    return (
      <ResultPreviewCard
        title="PDFs merged successfully!"
        filename="merged.pdf"
        data={mergedData}
        stats={[
          { label: "Files Combined", value: files.length },
          { label: "Output Size", value: `${Math.round(mergedData.byteLength / 1024)} KB`, highlight: true },
        ]}
        onReset={resetAll}
        onEdit={() => setMergedData(null)}
      >
        <PdfViewerPreview data={mergedData} />
      </ResultPreviewCard>
    );
  }

  return (
    <section>
      <FileDropzone onFiles={handleFiles} accept={ACCEPT} multiple label="PDF files" />

      {files.length > 0 && (
        <ul className="mt-4 space-y-1">
          {files.map((f, i) => (
            <li key={i} className="flex items-center justify-between text-sm bg-slate-50 border border-slate-200 rounded-lg px-3 py-2">
              <span className="truncate text-slate-700">{f.name}</span>
              <button
                onClick={() => setFiles((prev) => prev.filter((_, j) => j !== i))}
                className="ml-3 text-slate-400 hover:text-red-500 transition-colors shrink-0"
                aria-label={`Remove ${f.name}`}
              >
                ✕
              </button>
            </li>
          ))}
        </ul>
      )}

      {error && (
        <p className="mt-4 text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-4 py-3" role="alert">
          {error}
        </p>
      )}

      {processing && <div className="mt-4"><ProgressBar label="Merging PDFs…" /></div>}

      <button
        onClick={handleMerge}
        disabled={processing || files.length < 2}
        className="mt-6 w-full py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-300 disabled:cursor-not-allowed text-white font-semibold rounded-xl transition-colors"
      >
        {processing ? "Merging…" : "Merge PDFs"}
      </button>
    </section>
  );
}

