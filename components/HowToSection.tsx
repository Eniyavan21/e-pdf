interface HowToStep {
  text: string;
}

interface HowToSectionProps {
  heading: string;
  steps: HowToStep[];
}

export default function HowToSection({ heading, steps }: HowToSectionProps) {
  return (
    <section aria-labelledby="howto-heading" className="mt-12">
      <h2 id="howto-heading" className="text-2xl font-bold text-slate-800 mb-6">
        {heading}
      </h2>
      <ol className="space-y-4">
        {steps.map((step, i) => (
          <li key={i} className="flex items-start gap-4">
            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-600 text-white text-sm font-bold shrink-0 mt-0.5">
              {i + 1}
            </span>
            <p className="text-slate-600 pt-1">{step.text}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}
