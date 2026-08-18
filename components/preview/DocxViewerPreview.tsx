"use client";

interface DocxViewerPreviewProps {
  filename: string;
  blob: Blob;
  className?: string;
}

export default function DocxViewerPreview({ filename, blob, className = "" }: DocxViewerPreviewProps) {
  const sizeKb = Math.round(blob.size / 1024);

  return (
    <div className={`bg-slate-50 border border-slate-200 rounded-xl p-6 ${className}`}>
      <div className="flex items-center gap-4 p-4 bg-blue-50/80 border border-blue-200/80 rounded-lg">
        <div className="w-12 h-12 rounded-lg bg-blue-600 flex items-center justify-center text-white font-bold text-lg shadow-sm shrink-0">
          DOCX
        </div>
        <div className="overflow-hidden">
          <p className="font-semibold text-slate-800 truncate">{filename}</p>
          <p className="text-xs text-slate-500 mt-0.5">
            Microsoft Word Document • {sizeKb > 1024 ? `${(sizeKb / 1024).toFixed(2)} MB` : `${sizeKb} KB`}
          </p>
        </div>
      </div>

      <div className="mt-4 p-4 bg-white border border-slate-200 rounded-lg text-sm text-slate-600 leading-relaxed shadow-xs">
        <div className="flex items-center justify-between text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2 border-b border-slate-100 pb-2">
          <span>Output Format Summary</span>
          <span>Ready for Download</span>
        </div>
        <p>
          Your Word document (<code className="text-blue-700 bg-blue-50 px-1.5 py-0.5 rounded font-mono text-xs">{filename}</code>) has been successfully created and packaged into OpenXML format (.docx).
        </p>
        <ul className="mt-3 space-y-1.5 text-xs text-slate-500">
          <li className="flex items-center gap-2">
            <span className="text-green-500 font-bold">✓</span> Compatible with Microsoft Word, Google Docs, Apple Pages, and LibreOffice.
          </li>
          <li className="flex items-center gap-2">
            <span className="text-green-500 font-bold">✓</span> Processed 100% locally in your browser.
          </li>
        </ul>
      </div>
    </div>
  );
}
