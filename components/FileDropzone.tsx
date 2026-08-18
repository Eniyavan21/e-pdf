"use client";

import { useCallback } from "react";
import { useDropzone } from "react-dropzone";

const MAX_SIZE_BYTES = 50 * 1024 * 1024; // 50 MB

interface FileDropzoneProps {
  onFiles: (files: File[]) => void;
  accept: Record<string, string[]>;
  multiple?: boolean;
  label?: string;
}

export default function FileDropzone({
  onFiles,
  accept,
  multiple = false,
  label = "PDF file",
}: FileDropzoneProps) {
  const onDrop = useCallback(
    (accepted: File[], rejected: import("react-dropzone").FileRejection[]) => {
      if (rejected.length > 0) {
        const reasons = rejected[0].errors.map((e) => e.message).join(", ");
        alert(`File rejected: ${reasons}`);
        return;
      }
      const oversized = accepted.filter((f) => f.size > MAX_SIZE_BYTES);
      if (oversized.length > 0) {
        alert(
          `File too large: "${oversized[0].name}" exceeds the 50 MB limit. Please use a smaller file.`
        );
        return;
      }
      onFiles(accepted);
    },
    [onFiles]
  );

  const { getRootProps, getInputProps, isDragActive, acceptedFiles } = useDropzone({
    onDrop,
    accept,
    multiple,
    maxSize: MAX_SIZE_BYTES,
  });

  return (
    <div
      {...getRootProps()}
      className={`relative flex flex-col items-center justify-center gap-3 border-2 border-dashed rounded-2xl p-10 cursor-pointer transition-colors ${
        isDragActive
          ? "border-blue-500 bg-blue-50"
          : "border-slate-300 bg-slate-50 hover:border-blue-400 hover:bg-blue-50"
      }`}
      aria-label={`Upload ${label}`}
    >
      <input {...getInputProps()} />
      <div className="flex items-center justify-center w-14 h-14 rounded-full bg-white shadow-sm border border-slate-200">
        <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
          <path d="M14 5v14M7 12l7-7 7 7" stroke="#2563eb" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M5 22h18" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </div>
      <div className="text-center">
        {isDragActive ? (
          <p className="font-medium text-blue-600">Drop your file here…</p>
        ) : (
          <>
            <p className="font-medium text-slate-700">
              Drag &amp; drop or{" "}
              <span className="text-blue-600 underline underline-offset-2">browse</span>
            </p>
            <p className="text-sm text-slate-400 mt-1">Max 50 MB per file</p>
          </>
        )}
      </div>
      {acceptedFiles.length > 0 && (
        <ul className="mt-2 w-full max-w-sm space-y-1">
          {acceptedFiles.map((f) => (
            <li
              key={f.name}
              className="flex items-center gap-2 text-sm text-slate-600 bg-white border border-slate-200 rounded-lg px-3 py-2 truncate"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <rect x="3" y="1" width="10" height="14" rx="2" stroke="#2563eb" strokeWidth="1.5" />
                <path d="M5 5h6M5 8h6M5 11h4" stroke="#2563eb" strokeWidth="1.2" strokeLinecap="round" />
              </svg>
              <span className="truncate">{f.name}</span>
              <span className="ml-auto text-slate-400 shrink-0">
                {(f.size / 1024 / 1024).toFixed(1)} MB
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
