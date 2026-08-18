"use client";

import { useEffect, useRef, useState, useCallback } from "react";

interface PdfViewerPreviewProps {
  data: Uint8Array | ArrayBuffer | Blob;
  className?: string;
}

export default function PdfViewerPreview({ data, className = "" }: PdfViewerPreviewProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const renderTaskRef = useRef<any>(null);
  
  const [numPages, setNumPages] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [scale, setScale] = useState<number>(1.0);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [pdfDoc, setPdfDoc] = useState<any>(null);

  // Load PDF Document
  useEffect(() => {
    let isCancelled = false;
    setLoading(true);
    setError(null);

    async function loadPdf() {
      try {
        const pdfjsLib = await import("pdfjs-dist");
        pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.mjs`;

        let arrayBuffer: ArrayBuffer;
        if (data instanceof Blob) {
          arrayBuffer = await data.arrayBuffer();
        } else if (data instanceof Uint8Array) {
          arrayBuffer = data.buffer.slice(data.byteOffset, data.byteOffset + data.byteLength) as ArrayBuffer;
        } else {
          arrayBuffer = data;
        }

        const loadingTask = pdfjsLib.getDocument({ data: new Uint8Array(arrayBuffer) });
        const pdf = await loadingTask.promise;

        if (!isCancelled) {
          setPdfDoc(pdf);
          setNumPages(pdf.numPages);
          setCurrentPage(1);
          setLoading(false);
        }
      } catch (err) {
        if (!isCancelled) {
          console.error("PDF Preview load error:", err);
          setError("Failed to load PDF preview.");
          setLoading(false);
        }
      }
    }

    loadPdf();

    return () => {
      isCancelled = true;
    };
  }, [data]);

  // Render Current Page onto Canvas
  const renderPage = useCallback(async () => {
    if (!pdfDoc || currentPage < 1 || currentPage > numPages || !canvasRef.current) return;

    if (renderTaskRef.current) {
      renderTaskRef.current.cancel();
      renderTaskRef.current = null;
    }

    try {
      const page = await pdfDoc.getPage(currentPage);
      const canvas = canvasRef.current;
      const context = canvas.getContext("2d");
      if (!context) return;

      const viewport = page.getViewport({ scale });
      canvas.height = viewport.height;
      canvas.width = viewport.width;

      const renderContext = {
        canvasContext: context,
        viewport: viewport,
      };

      const renderTask = page.render(renderContext);
      renderTaskRef.current = renderTask;
      await renderTask.promise;
    } catch (err: any) {
      if (err?.name !== "RenderingCancelledException") {
        console.error("PDF Page render error:", err);
      }
    }
  }, [pdfDoc, currentPage, scale, numPages]);

  useEffect(() => {
    renderPage();
  }, [renderPage]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center p-8 bg-slate-50 border border-slate-200 rounded-xl min-h-[300px]">
        <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mb-3"></div>
        <p className="text-sm font-medium text-slate-600">Generating preview...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 bg-amber-50 border border-amber-200 rounded-xl text-center text-amber-800 text-sm">
        <p className="font-semibold">{error}</p>
        <p className="text-xs mt-1 text-amber-600">Your processed file is safe and ready to download below.</p>
      </div>
    );
  }

  return (
    <div className={`flex flex-col items-center bg-slate-100 rounded-xl p-4 border border-slate-200 ${className}`}>
      {/* Controls Bar */}
      <div className="w-full flex flex-wrap items-center justify-between gap-3 mb-4 bg-white px-4 py-2.5 rounded-lg border border-slate-200 shadow-sm text-sm">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage <= 1}
            className="px-2.5 py-1 text-slate-700 hover:bg-slate-100 disabled:opacity-40 disabled:hover:bg-transparent rounded-md border border-slate-200 font-medium transition-colors"
          >
            ← Prev
          </button>
          <span className="text-slate-600 font-medium">
            Page <strong className="text-slate-900">{currentPage}</strong> of <strong className="text-slate-900">{numPages}</strong>
          </span>
          <button
            type="button"
            onClick={() => setCurrentPage((p) => Math.min(numPages, p + 1))}
            disabled={currentPage >= numPages}
            className="px-2.5 py-1 text-slate-700 hover:bg-slate-100 disabled:opacity-40 disabled:hover:bg-transparent rounded-md border border-slate-200 font-medium transition-colors"
          >
            Next →
          </button>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setScale((s) => Math.max(0.5, s - 0.2))}
            disabled={scale <= 0.5}
            className="px-2 py-1 text-slate-600 hover:bg-slate-100 disabled:opacity-40 rounded border border-slate-200 text-xs font-semibold"
            title="Zoom Out"
          >
            –
          </button>
          <span className="text-xs text-slate-500 w-12 text-center font-medium">
            {Math.round(scale * 100)}%
          </span>
          <button
            type="button"
            onClick={() => setScale((s) => Math.min(2.5, s + 0.2))}
            disabled={scale >= 2.5}
            className="px-2 py-1 text-slate-600 hover:bg-slate-100 disabled:opacity-40 rounded border border-slate-200 text-xs font-semibold"
            title="Zoom In"
          >
            +
          </button>
          <button
            type="button"
            onClick={() => setScale(1.0)}
            className="ml-1 px-2 py-1 text-xs text-blue-600 hover:bg-blue-50 rounded border border-blue-200 font-medium"
          >
            Reset
          </button>
        </div>
      </div>

      {/* Canvas View */}
      <div className="w-full overflow-auto max-h-[600px] flex justify-center bg-slate-200/60 p-4 rounded-lg border border-slate-300/50 shadow-inner">
        <canvas ref={canvasRef} className="shadow-lg rounded bg-white max-w-full" />
      </div>
    </div>
  );
}
