"use client";

import { useState } from "react";
import FileDropzone from "@/components/FileDropzone";
import ProgressBar from "@/components/ProgressBar";
import ResultPreviewCard from "@/components/preview/ResultPreviewCard";
import PdfViewerPreview from "@/components/preview/PdfViewerPreview";
import { wordToPdf } from "@/lib/word-to-pdf";

const ACCEPT = { "application/vnd.openxmlformats-officedocument.wordprocessingml.document": [".docx"] };

interface PdfPreview {
  blob: Blob;
  filename: string;
}

export default function WordToPdfTool() {
  const [file, setFile] = useState<File | null>(null);
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [preview, setPreview] = useState<PdfPreview | null>(null);

  const handleConvert = async () => {
    if (!file) return;
    setProcessing(true);
    setError(null);
    try {
      const blob = await wordToPdf(file);
      const outputName = file.name.replace(/\.docx$/i, ".pdf");
      setPreview({ blob, filename: outputName });
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
    return (
      <ResultPreviewCard
        title="Word document converted to PDF successfully!"
        filename={preview.filename}
        data={preview.blob}
        stats={[
          { label: "Original Word Doc", value: file?.name || "-" },
          { label: "PDF Output Size", value: `${Math.round(preview.blob.size / 1024)} KB`, highlight: true },
        ]}
        onReset={resetAll}
        onEdit={() => setPreview(null)}
      >
        <PdfViewerPreview data={preview.blob} />
      </ResultPreviewCard>
    );
  }

  return (
    <section>
      <FileDropzone
        onFiles={(f) => { setFile(f[0]); setPreview(null); setError(null); }}
        accept={ACCEPT}
        label="DOCX file"
      />
      {error && <p className="mt-4 text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-4 py-3" role="alert">{error}</p>}
      {processing && <div className="mt-4"><ProgressBar label="Converting to PDF…" /></div>}
      <button onClick={handleConvert} disabled={processing || !file} className="mt-6 w-full py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-300 disabled:cursor-not-allowed text-white font-semibold rounded-xl transition-colors">
        {processing ? "Converting…" : "Convert to PDF"}
      </button>
    </section>
  );
}

