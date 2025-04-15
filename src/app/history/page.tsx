import { GeneratePlanButton } from "@/components/features/training-plan/generate-plan-button";

export default function HistoryPage() {
  return (
    <div className="container mx-auto">
      <h1 className="text-3xl font-bold mb-6">Historia Planów</h1>
      <p>Strona z historią planów treningowych.</p>
      <GeneratePlanButton />
    </div>
  );
}
