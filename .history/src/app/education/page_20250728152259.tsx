import EducationClientRenderer from "@/components/insights/EducationClientRenderer";
import EducationClientPage from "./client";
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
//   return <EducationClientPage />;
    return <EducationClientRenderer />;
}
