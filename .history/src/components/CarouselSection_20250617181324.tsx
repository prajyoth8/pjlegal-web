"use client";

import Image from "next/image";
import { useKeenSlider } from "keen-slider/react";
import { useState } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import "keen-slider/keen-slider.min.css";
import ReactMarkdown from "react-markdown";

const images = [
  {
    src: "/assets/carousel1.png",
    title: "LegalTech Automation",
    caption: "AI-powered workflows & contract automation",
    description: `LegalTech Automation empowers law firms to work smarter, not harder.

## ✨ Key Highlights

- 🔁 **Workflow Automation**: Set triggers to auto-send drafts, reminders, or compliance checks.
- 📄 **Template-Based Drafting**: Auto-generate contracts, NDAs, and filings.
- 🧠 **Smart Clause Suggestions**: Tailor clauses with AI for context-aware accuracy.

## 📌 Benefits

- ✅ Saves time and manual effort
- ✅ Reduces legal risks via standardization
- ✅ Enables faster client service

## 💡 Use Cases

1. Auto-create client agreements on new case intake.
2. Schedule automated reminders for compliance deadlines.
3. Distribute draft contracts internally with review stages.

**Empower your legal ops with automation.** ⚖️`,
  },
  {
    src: "/assets/carousel2.png",
    title: "Cybersecurity & Law",
    caption: "Protection for digital assets & breaches",
    description: `Integrate legal defense with cybersecurity intelligence.

## 🔒 Highlights

- 🛡️ **Breach Detection Logs**: Track real-time incidents with legal-grade documentation.
- 🔍 **Digital Evidence Archiving**: Store admissible logs & email trails.
- ⚠️ **Compliance Watchdogs**: Detect non-compliance early using AI.

## 🎯 Benefits

- ✅ Shields against data misuse lawsuits
- ✅ Reduces chances of regulatory fines
- ✅ Ensures timely incident reporting

## 🔧 Use Cases

- Maintain a breach response plan with legal-ready templates.
- Record real-time logs for litigation evidence.
- Monitor vendor cybersecurity policies.

**Stay secure. Stay legally prepared.** 🛡️⚖️`,
  },
  {
    src: "/assets/carousel3.png",
    title: "Litigation Support",
    caption: "Evidence handling & court preparation",
    description: `Simplify trial readiness and reduce document chaos.

## 🧾 Key Tools

- 🗂️ **Evidence Organizer**: Upload, tag, and structure digital files.
- 👩‍⚖️ **Witness List Generators**: Auto-sort by priority or relevance.
- 📄 **Hearing Bundles**: Export formatted PDFs for court filing.

## ✅ Benefits

- ✅ Saves paralegal prep time
- ✅ Ensures procedural compliance
- ✅ Enhances courtroom strategy

## 📂 Use Cases

- Upload scanned FIRs and tag for easy access.
- Create structured bundles for judges/counsel.
- Draft cross-exam questions using structured case facts.

**Enter court confidently with tech-powered prep.** 🧑‍⚖️📚`,
  },
  {
    src: "/assets/carousel4.png",
    title: "HR & Labor Law",
    caption: "Hiring, workplace & policy compliance",
    description: `Avoid employment law pitfalls with AI policy compliance.

## 👥 Core Modules

- 📑 **Smart Offer Letters**: Tailor letters with dynamic clauses.
- ⚖️ **Regulatory Checklists**: Ensure compliance for hiring/firing.
- 🧾 **Policy Builder**: Create leave, harassment, and ethics policies.

## ✅ Benefits

- ✅ Complies with state & central labor laws
- ✅ Prevents wrongful termination issues
- ✅ Auditable policy updates

## 📌 Use Cases

- Draft onboarding docs in local language.
- Auto-update workplace policies to match new legal mandates.
- Track leave laws by state and company size.

**Let AI be your HR legal assistant.** 👔📘`,
  },
  {
    src: "/assets/carousel5.png",
    title: "Corporate Governance",
    caption: "Boards, policies & legal compliance",
    description: `Ensure your company is always audit-ready.

## 🏛️ Highlights

- 📝 **Minutes Automation**: Prebuilt agenda templates & real-time note capturing.
- 📆 **Filing Calendar**: Reminds board/ROC/SEBI compliance dates.
- 🧾 **Policy Management**: Store all board resolutions and internal policies.

## 🚀 Benefits

- ✅ Improves board transparency
- ✅ Tracks regulatory duties
- ✅ Prevents missed legal filings

## 🧠 Use Cases

- Auto-generate meeting minutes and get board sign-offs.
- Notify directors about upcoming disclosure obligations.
- Manage ESG reports and internal audit logs.

**Let AI manage your boardroom backend.** 🏢📋`,
  },
  {
    src: "/assets/carousel6.png",
    title: "AI for Legal Drafting",
    caption: "Smarter agreements and notices",
    description: `Draft smarter, not longer.

## ✍️ Features

- 📌 **Clause Suggestion Engine**: Pick from relevant clauses.
- 🧾 **Multi-party Drafting**: Adjust templates based on parties & jurisdictions.
- 🔍 **Grammar & Legal Risk Checker**: Inline warnings on vague terms.

## 🔧 Benefits

- ✅ Reduces redlining friction
- ✅ Improves legal clarity
- ✅ Saves junior lawyer time

## 🧾 Example Drafts

- MOUs
- Lease agreements
- Partnership contracts

**Revolutionize your legal language.** 📝🤖`,
  },
  {
    src: "/assets/carousel7.png",
    title: "Legal Research Intelligence",
    caption: "Extract insights from vast legal data",
    description: `Speed up your research using AI summaries and precedent mapping.

## 🔎 Capabilities

- 📚 **Case Law Summary**: Upload judgments and get instant synopsis.
- 🔗 **Citation Matching**: Backtrack precedents in seconds.
- 🧠 **Legal Q&A Model**: Ask legal queries and get source-verified answers.

## 🎯 Benefits

- ✅ Saves 70% research time
- ✅ Better case strategy with precedent patterns
- ✅ Easy explanation for clients

## ⚖️ Use Cases

- Prepare case briefs from scanned judgments.
- Validate your legal opinion with similar rulings.
- Compare court interpretations across benches.

**Build stronger arguments in less time.** 💼📖`,
  },
];

export default function CarouselSection() {
  const [sliderRef, slider] = useKeenSlider<HTMLDivElement>({
    loop: true,
    slides: { perView: 1, spacing: 20 },
    breakpoints: {
      "(min-width: 640px)": {
        slides: { perView: 1.2, spacing: 20 },
      },
      "(min-width: 1024px)": {
        slides: { perView: 1.5, spacing: 24 },
      },
    },
  });

  const scrollPrev = () => slider.current?.prev();
  const scrollNext = () => slider.current?.next();
  const [modalData, setModalData] = useState<null | (typeof images)[0]>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      slider.current?.next();
    }, 5000);
    return () => clearInterval(interval);
  }, [slider]);

  return (
    <section className="py-16 bg-gray-900 relative">
      <h2 className="text-3xl font-bold text-center text-white mb-6">
        Explore Our Expertise
      </h2>

      <button
        className="absolute z-20 left-4 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 p-2 rounded-full"
        onClick={scrollPrev}
      >
        <ChevronLeft className="text-white" size={28} />
      </button>

      <button
        className="absolute z-20 right-4 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 p-2 rounded-full"
        onClick={scrollNext}
      >
        <ChevronRight className="text-white" size={28} />
      </button>

      <div ref={sliderRef} className="keen-slider px-6">
        {images.map((img, index) => (
          <div
            key={index}
            className="keen-slider__slide group bg-white rounded-xl shadow-xl overflow-hidden cursor-pointer"
            onClick={() => setModalData(img)}
          >
            <div className="w-full aspect-[4/3] relative">
              <Image
                src={img.src}
                alt={img.title}
                fill
                className="object-contain p-4"
                sizes="100vw"
              />
            </div>
            <div className="px-4 py-2">
              <h3 className="text-lg font-semibold text-gray-900">
                {img.title}
              </h3>
              <p className="text-sm text-gray-600">{img.caption}</p>
            </div>
          </div>
        ))}
      </div>

      {modalData && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center px-4 py-10">
          <div className="bg-gray-900 rounded-xl max-w-5xl w-full p-6 relative flex flex-col lg:flex-row gap-6">
            <button
              className="absolute top-3 right-3 text-white hover:text-red-500"
              onClick={() => setModalData(null)}
            >
              <X size={24} />
            </button>

            <div className="flex-1 text-white overflow-y-auto max-h-[70vh] pr-2 text-left">
              <h3 className="text-2xl font-bold mb-1">{modalData.title}</h3>
              <p className="text-sm text-gray-300 mb-4">{modalData.caption}</p>
              <ReactMarkdown
                className="prose prose-invert max-w-none text-white text-sm
                [&>ul>li]:before:content-['🔹'] 
                [&>ul>li]:before:mr-2 
                [&>ul>li]:before:text-blue-400"
              >
                {modalData.description}
              </ReactMarkdown>
            </div>

            <div className="w-full lg:w-[40%] rounded-lg overflow-hidden">
              <Image
                src={modalData.src}
                alt={modalData.title}
                width={600}
                height={400}
                className="object-contain rounded-md w-full h-full"
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
