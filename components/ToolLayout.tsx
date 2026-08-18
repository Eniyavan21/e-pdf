import AdBanner from "./AdBanner";

interface ToolLayoutProps {
  title: string;
  description: string;
  adSlotTop?: string;
  adSlotBottom?: string;
  children: React.ReactNode;
}

export default function ToolLayout({
  title,
  description,
  adSlotTop = "1234567890",
  adSlotBottom = "0987654321",
  children,
}: ToolLayoutProps) {
  return (
    <main className="max-w-3xl mx-auto px-4 py-10">
      {/* Top Ad */}
      <AdBanner slot={adSlotTop} format="horizontal" className="mb-8" />

      {/* Tool header */}
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 mb-3">{title}</h1>
        <p className="text-slate-500 text-lg leading-relaxed">{description}</p>
      </header>

      {/* Tool content */}
      <article>{children}</article>

      {/* Bottom Ad */}
      <AdBanner slot={adSlotBottom} format="rectangle" className="mt-10" />
    </main>
  );
}
