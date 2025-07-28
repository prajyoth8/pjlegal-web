import EducationClientRenderer from "@/components/insights/EducationClientRenderer";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Legal Education – Know Your Rights & Everyday Law | PJ Legal",
  description:
    "Explore essential legal knowledge for citizens: arrest rights, consumer law, FIR process, templates, glossary and myth busters – all explained simply.",
  openGraph: {
    title: "Legal Education – PJ Legal",
    description:
      "Empowering citizens with legal awareness: rights, processes, glossary, and everyday law made easy.",
    url: "https://pjlegal.in/education",
    siteName: "PJ Legal",
    type: "website",
  },
};

export default function EducationPage() {
  return (
    <main className="container mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">Legal Education</h1>
      <p className="text-gray-600 dark:text-gray-300 mb-10 max-w-3xl leading-relaxed">
        Welcome to our Legal Education section. Here, we simplify the law for everyday citizens —
        helping you understand your rights, common legal processes, and practical tips to stay
        legally empowered in India.
      </p>

      <EducationClientRenderer />
    </main>
  );
}
