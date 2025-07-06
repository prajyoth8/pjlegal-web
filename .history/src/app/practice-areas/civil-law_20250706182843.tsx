import PracticeDetailLayout from src\components\PracticeDetailLayout.tsx

export default function CivilLawPage() {
  return (
    <PracticeDetailLayout
      title="Civil Law"
      description="Civil law encompasses a broad range of legal issues that affect individuals and organizations. At PJ Legal, we help you navigate disputes that are non-criminal in nature."
      points={[
        "Breach of contracts",
        "Property and tenancy disputes",
        "Consumer protection matters",
        "Partition and inheritance issues",
        "Civil injunctions and recovery suits",
      ]}
    />
  );
}
