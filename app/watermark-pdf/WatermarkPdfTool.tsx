"use client";

import { useState } from "react";
import FileDropzone from "@/components/FileDropzone";
import ProgressBar from "@/components/ProgressBar";
import ResultPreviewCard from "@/components/preview/ResultPreviewCard";
import PdfViewerPreview from "@/components/preview/PdfViewerPreview";
import { watermarkPdf } from "@/lib/watermark-pdf";

const ACCEPT = { "application/pdf": [".pdf"] };

export default function WatermarkPdfTool() {
  const [file, setFile] = useState<File | null>(null);
  const [text, setText] = useState("CONFIDENTIAL");
  const [opacity, setOpacity] = useState(25);
  const [fontSize, setFontSize] = useState(50);
  const [angle, setAngle] = useState(-45);
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [watermarkedData, setWatermarkedData] = useState<Uint8Array | null>(null);

  const handleApply = async () => {
    if (!file) return;
    if (!text.trim()) { setError("Please enter watermark text."); return; }
    setProcessing(true);
    setError(null);
    setWatermarkedData(null);
    try {
      const buffer = await file.arrayBuffer();
      const result = await watermarkPdf(buffer, {
        text: text.trim(),
        opacity: opacity / 100,
        fontSize,
        rotateDeg: angle,
      });
      setWatermarkedData(result);
    } catch (e) {
      setError(e instanceof Error ? e.message : "An unexpected error occurred.");
    } finally {
      setProcessing(false);
    }
  };

  const resetAll = () => {
    setFile(null);
    setWatermarkedData(null);
    setError(null);
  };

  if (watermarkedData) {
    const outputFilename = file ? file.name.replace(/\.pdf$/i, "-watermarked.pdf") : "watermarked.pdf";
    return (
      <ResultPreviewCard
        title="Watermark added successfully!"
        filename={outputFilename}
        data={watermarkedData}
        stats={[
          { label: "Watermark Text", value: text, highlight: true },
          { label: "Opacity", value: `${opacity}%` },
          { label: "Angle", value: `${angle}°` },
        ]}
        onReset={resetAll}
        onEdit={() => setWatermarkedData(null)}
      >
        <PdfViewerPreview data={watermarkedData} />
      </ResultPreviewCard>
    );
  }

  return (
    <section>
      <FileDropzone onFiles={(f) => { setFile(f[0]); setWatermarkedData(null); setError(null); }} accept={ACCEPT} label="PDF file" />

      <div className="mt-6 space-y-4">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Watermark Text</label>
          <input type="text" value={text} onChange={(e) => setText(e.target.value)} placeholder="e.g. CONFIDENTIAL" className="w-full border border-slate-300 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
        </div>
        <div className="grid grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Opacity: {opacity}%</label>
            <input type="range" min={5} max={100} value={opacity} onChange={(e) => setOpacity(Number(e.target.value))} className="w-full accent-blue-600" />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Font Size: {fontSize}pt</label>
            <input type="range" min={16} max={120} value={fontSize} onChange={(e) => setFontSize(Number(e.target.value))} className="w-full accent-blue-600" />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Angle: {angle}°</label>
            <input type="range" min={-90} max={90} value={angle} onChange={(e) => setAngle(Number(e.target.value))} className="w-full accent-blue-600" />
          </div>
        </div>
      </div>

      {error && <p className="mt-4 text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-4 py-3" role="alert">{error}</p>}
      {processing && <div className="mt-4"><ProgressBar label="Adding watermark…" /></div>}

      <button onClick={handleApply} disabled={processing || !file} className="mt-6 w-full py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-300 disabled:cursor-not-allowed text-white font-semibold rounded-xl transition-colors">
        {processing ? "Applying…" : "Add Watermark"}
      </button>
    </section>
  );
}

