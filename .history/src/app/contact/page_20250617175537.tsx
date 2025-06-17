// ✅ src/app/contact/page.tsx
import ContactSection from "@/components/ContactSection";

export default function ContactPage() {
  return (
    <div className="min-h-screen pt-24">
        <ContactHero />
      <ContactSection />
    </div>
  );
}
