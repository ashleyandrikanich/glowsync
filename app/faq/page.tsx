import type { Metadata } from "next";
import { PageScaffold } from "../components/PageScaffold";

export const metadata: Metadata = {
  title: "FAQ",
  description: "Answers to common GlowSync questions.",
};

const faqs = [
  {
    question: "Is GlowSync medical advice?",
    answer:
      "No. GlowSync is educational and organizational. A dermatologist or clinician is the right person for diagnosis, prescriptions, or persistent irritation.",
  },
  {
    question: "Where is my routine saved?",
    answer:
      "Routine tools use local browser storage unless a feature specifically says it is tied to your account.",
  },
  {
    question: "Why does the app warn about strong actives?",
    answer:
      "Some routines stack exfoliating acids, retinoids, benzoyl peroxide, or strong vitamin C too aggressively. The warnings are conservative reminders to slow down.",
  },
  {
    question: "Do I need sunscreen at night?",
    answer:
      "No. SPF belongs in the morning routine. Evening routines usually focus on cleansing, treatment, and barrier support.",
  },
  {
    question: "Can I save products I might want later?",
    answer:
      "Yes. Use Wishlist to save catalog products you want to research, compare, or add to your routine later.",
  },
  {
    question: "How should I introduce a new product?",
    answer:
      "Start with one new product at a time, patch test when possible, and avoid adding multiple strong actives in the same week.",
  },
];

export default function FaqPage() {
  return (
    <PageScaffold
      title="FAQ"
      description="Quick answers about how GlowSync works, how data is stored, and how to use the guidance safely."
    >
      <div className="grid gap-4 md:grid-cols-2">
        {faqs.map((item) => (
          <article
            key={item.question}
            className="rounded-2xl border border-sand/70 bg-gradient-to-br from-linen/82 to-blush/30 p-5 shadow-sm"
          >
            <h2 className="font-serif text-xl font-medium text-offblack">
              {item.question}
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-offblack/68">
              {item.answer}
            </p>
          </article>
        ))}
      </div>
    </PageScaffold>
  );
}
