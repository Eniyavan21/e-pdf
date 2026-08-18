interface FaqItem {
  question: string;
  answer: string;
}

interface FaqSectionProps {
  items: FaqItem[];
}

export default function FaqSection({ items }: FaqSectionProps) {
  return (
    <section aria-labelledby="faq-heading" className="mt-12">
      <h2
        id="faq-heading"
        className="text-2xl font-bold text-slate-800 mb-6"
      >
        Frequently Asked Questions
      </h2>
      <div className="space-y-3">
        {items.map((item, i) => (
          <details
            key={i}
            className="group border border-slate-200 rounded-xl bg-white overflow-hidden"
          >
            <summary className="flex items-center justify-between px-5 py-4 cursor-pointer font-medium text-slate-700 hover:text-blue-600 transition-colors list-none">
              <span>{item.question}</span>
              <svg
                className="w-5 h-5 text-slate-400 group-open:rotate-180 transition-transform shrink-0 ml-4"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                  clipRule="evenodd"
                />
              </svg>
            </summary>
            <div className="px-5 pb-4 text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
              {item.answer}
            </div>
          </details>
        ))}
      </div>
    </section>
  );
}
