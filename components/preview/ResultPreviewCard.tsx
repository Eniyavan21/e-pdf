"use client";

import React from "react";
import { downloadFile } from "@/lib/download";

interface MetadataStat {
  label: string;
  value: string | number;
  highlight?: boolean;
}

interface ResultPreviewCardProps {
  title?: string;
  filename: string;
  data: Uint8Array | Blob;
  mimeType?: string;
  stats?: MetadataStat[];
  onReset: () => void;
  onEdit?: () => void;
  children?: React.ReactNode;
}

export default function ResultPreviewCard({
  title = "Document ready for download",
  filename,
  data,
  mimeType = "application/pdf",
  stats = [],
  onReset,
  onEdit,
  children,
}: ResultPreviewCardProps) {
  const byteLength = data instanceof Uint8Array ? data.byteLength : data.size;
  const sizeKb = Math.round(byteLength / 1024);
  const sizeFormatted = sizeKb > 1024 ? `${(sizeKb / 1024).toFixed(2)} MB` : `${sizeKb} KB`;

  const handleDownload = () => {
    downloadFile(data, filename, mimeType);
  };

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm animate-fade-in">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 bg-emerald-50 border border-emerald-200/80 rounded-xl mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold text-lg shadow-sm shrink-0">
            ✓
          </div>
          <div>
            <h3 className="font-semibold text-emerald-950 text-base">{title}</h3>
            <p className="text-xs text-emerald-800 font-medium truncate max-w-md mt-0.5">{filename}</p>
          </div>
        </div>
        <span className="self-start sm:self-center px-3 py-1 bg-emerald-200/60 text-emerald-900 font-semibold text-xs rounded-full">
          {sizeFormatted}
        </span>
      </div>

      {/* Metadata Stats Grid if available */}
      {stats.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-6">
          {stats.map((stat, i) => (
            <div key={i} className={`p-3 rounded-xl border text-center ${stat.highlight ? "bg-blue-50/80 border-blue-200" : "bg-slate-50 border-slate-200"}`}>
              <p className="text-xs text-slate-500 font-medium">{stat.label}</p>
              <p className={`text-base font-bold mt-0.5 ${stat.highlight ? "text-blue-700" : "text-slate-800"}`}>{stat.value}</p>
            </div>
          ))}
        </div>
      )}

      {/* Primary Visual Preview Content */}
      {children && <div className="mb-6">{children}</div>}

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2 border-t border-slate-100">
        <button
          type="button"
          onClick={handleDownload}
          className="flex-1 py-3.5 px-6 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-semibold text-base rounded-xl transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
          </svg>
          Download {filename}
        </button>

        {onEdit && (
          <button
            type="button"
            onClick={onEdit}
            className="py-3.5 px-5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-sm rounded-xl transition-colors flex items-center justify-center gap-1.5"
          >
            ← Change Settings
          </button>
        )}

        <button
          type="button"
          onClick={onReset}
          className="py-3.5 px-5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-sm rounded-xl transition-colors flex items-center justify-center gap-1.5"
        >
          Convert Another File
        </button>
      </div>
    </div>
  );
}
