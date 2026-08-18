"use client";

import { useState } from "react";
import FileDropzone from "@/components/FileDropzone";
import ProgressBar from "@/components/ProgressBar";
import ResultPreviewCard from "@/components/preview/ResultPreviewCard";
import PdfViewerPreview from "@/components/preview/PdfViewerPreview";
import { compressPdf } from "@/lib/compress-pdf";

const ACCEPT = { "application/pdf": [".pdf"] };

interface PreviewState {
  data: Uint8Array;
  filename: string;
  originalKb: number;
  compressedKb: number;
}

export default function CompressPdfTool() {
  const [file, setFile] = useState<File | null>(null);
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [preview, setPreview] = useState<PreviewState | null>(null);

  const handleFiles = (files: File[]) => {
    setFile(files[0]);
    setError(null);
    setPreview(null);
  };

  const handleCompress = async () => {
    if (!file) return;
    setProcessing(true);
    setError(null);
    try {
      const buffer = await file.arrayBuffer();
      const compressed = await compressPdf(buffer);
      const outputFilename = file.name.replace(/\.pdf$/i, "-compressed.pdf");
      
      setPreview({
        data: compressed,
        filename: outputFilename,
        originalKb: Math.round(file.size / 1024),
        compressedKb: Math.round(compressed.byteLength / 1024),
      });
    } catch (e) {
      setError(e instanceof Error ? e.message : "An unexpected error occurred.");
    } finally {
      setProcessing(false);
    }
  };

  const resetAll = () => {
    setFile(null);
    setPreview(null);
    setError(null);
  };

  if (preview) {
    const reduction = Math.max(0, Math.round((1 - preview.compressedKb / preview.originalKb) * 100));
    return (
      <ResultPreviewCard
        title="PDF compressed successfully!"
        filename={preview.filename}
        data={preview.data}
        stats={[
          { label: "Original Size", value: `${preview.originalKb} KB` },
          { label: "Compressed Size", value: `${preview.compressedKb} KB` },
          { label: "Size Reduction", value: `-${reduction}%`, highlight: true },
        ]}
        onReset={resetAll}
        onEdit={() => setPreview(null)}
      >
        <PdfViewerPreview data={preview.data} />
      </ResultPreviewCard>
    );
  }

  return (
    <section>
      <FileDropzone onFiles={handleFiles} accept={ACCEPT} label="PDF file" />

      {error && (
        <p className="mt-4 text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-4 py-3" role="alert">
          {error}
        </p>
      )}

      {processing && <div className="mt-4"><ProgressBar label="Compressing PDF…" /></div>}

      <button
        onClick={handleCompress}
        disabled={processing || !file}
        className="mt-6 w-full py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-300 disabled:cursor-not-allowed text-white font-semibold rounded-xl transition-colors"
      >
        {processing ? "Compressing…" : "Compress PDF"}
      </button>
    </section>
  );
}

