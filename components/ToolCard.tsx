import Link from "next/link";

interface ToolCardProps {
  href: string;
  icon: React.ReactNode;
  title: string;
  description: string;
  gradient?: string;
  badgeText?: string;
}

export default function ToolCard({
  href,
  icon,
  title,
  description,
  gradient = "from-blue-500 to-indigo-600",
  badgeText,
}: ToolCardProps) {
  return (
    <Link
      href={href}
      className="group relative flex flex-col items-start gap-4 p-6 bg-white/90 backdrop-blur-xs border border-slate-200/80 rounded-2xl shadow-sm hover:shadow-xl hover:border-blue-400/50 hover:-translate-y-1 transition-all duration-300 overflow-hidden"
    >
      {/* Subtle top accent bar */}
      <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />

      <div className="flex items-center justify-between w-full">
        {/* Gradient Icon Box */}
        <div className={`flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br ${gradient} text-white shadow-md shadow-blue-500/10 group-hover:scale-105 group-hover:shadow-lg transition-all duration-300`}>
          {icon}
        </div>
        {badgeText && (
          <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors">
            {badgeText}
          </span>
        )}
      </div>

      <div className="flex-1">
        <h2 className="font-bold text-slate-800 text-base group-hover:text-blue-600 transition-colors mb-1.5">
          {title}
        </h2>
        <p className="text-sm text-slate-500 leading-relaxed">{description}</p>
      </div>

      <span className="text-sm font-semibold text-blue-600 flex items-center gap-1.5 group-hover:translate-x-1 transition-transform">
        Use tool
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
          <path d="M3.333 8h9.334M8.667 3.333L13.333 8l-4.666 4.667" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
    </Link>
  );
}
