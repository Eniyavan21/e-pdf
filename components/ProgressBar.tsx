interface ProgressBarProps {
  label?: string;
}

export default function ProgressBar({ label = "Processing…" }: ProgressBarProps) {
  return (
    <div className="w-full" role="status" aria-label={label}>
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-medium text-slate-600">{label}</span>
      </div>
      <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
        <div className="h-full bg-blue-600 rounded-full animate-[progress_1.5s_ease-in-out_infinite]" />
      </div>
      <style>{`
        @keyframes progress {
          0% { width: 0%; margin-left: 0; }
          50% { width: 70%; margin-left: 15%; }
          100% { width: 0%; margin-left: 100%; }
        }
      `}</style>
    </div>
  );
}
