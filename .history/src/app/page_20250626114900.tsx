import { Suspense } from "react";
import HomeWrapper from "@/components/HomeWrapper";
import { HybridLayout } from "@/components/layout";

export default function Home() {
  return (
    <Suspense fallback={<div className="text-center p-8 text-gray-500">Loading...</div>}>
      <HomeWrapper />
    </Suspense>
  );
}
