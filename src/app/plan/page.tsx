"use client";

import { GenerujPlanButton } from "@/components/features/GenerujPlanButton";
import { IncompleteProfileModal } from "@/components/features/IncompleteProfileModal";
import { useAktualnyPlanTreningowy } from "@/hooks/useAktualnyPlanTreningowy";
import type { Json } from "@/types/supabase";

/**
 * Page component for displaying the current training plan
 * Shows either a button to generate a plan if none exists
 * or the plan calendar if one already exists
 */
export default function AktualnyPlanTreningowyView() {
  const {
    isLoadingPlan,
    planError,
    currentPlan,
    isGeneratingPlan,
    missingProfileFields,
    showIncompleteProfileModal,
    setShowIncompleteProfileModal,
    generatePlanMutation,
    deletePlanMutation,
  } = useAktualnyPlanTreningowy();

  console.log(currentPlan);

  return (
    <div className="container mx-auto py-6">
      <h1 className="text-3xl font-bold mb-6">Aktualny Plan Treningowy</h1>

      {/* Loading state */}
      {isLoadingPlan && (
        <div className="flex justify-center items-center py-16">
          <LoadingSpinner className="h-8 w-8" />
        </div>
      )}

      {/* Error state */}
      {!isLoadingPlan && planError && (
        <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-md">
          <h3 className="font-semibold mb-2">
            Wystąpił błąd podczas ładowania planu:
          </h3>
          <p>{planError.message || "Nie udało się pobrać danych planu."}</p>
        </div>
      )}

      {/* No plan state - show generate button */}
      {!isLoadingPlan && !planError && !currentPlan && (
        <GenerujPlanButton
          onClick={() => generatePlanMutation.mutate()}
          isGenerating={isGeneratingPlan}
        />
      )}

      {/* Plan exists state - show calendar */}
      {!isLoadingPlan && !planError && currentPlan && (
        <div className="bg-gray-50 p-6 rounded-lg">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">
              {getPlanName(currentPlan.plan_data)}
            </h2>
            <button
              onClick={() => {
                if (
                  window.confirm(
                    "Czy na pewno chcesz usunąć swój plan treningowy?"
                  )
                ) {
                  deletePlanMutation.mutate(currentPlan.id);
                }
              }}
              className="text-red-600 hover:text-red-800 text-sm font-medium"
            >
              Usuń plan
            </button>
          </div>

          <p className="text-muted-foreground mb-4">
            {getPlanGoal(currentPlan.plan_data)}
          </p>

          {/* TODO: Implement TrainingPlanCalendar component here */}
          <div className="text-center py-8 text-muted-foreground">
            <p>
              Widok kalendarza planu zostanie zaimplementowany w następnym
              kroku.
            </p>
          </div>
        </div>
      )}

      {/* Incomplete profile modal */}
      <IncompleteProfileModal
        isOpen={showIncompleteProfileModal}
        onClose={() => setShowIncompleteProfileModal(false)}
        missingFields={missingProfileFields}
      />
    </div>
  );
}

/**
 * Helper function to safely access the plan name from plan_data
 */
function getPlanName(planData: Json): string {
  if (!planData) return "Twój plan treningowy";

  try {
    // Try to parse the plan data if it's a string
    const parsedData =
      typeof planData === "string" ? JSON.parse(planData) : planData;
    return parsedData.name || "Twój plan treningowy";
  } catch {
    return "Twój plan treningowy";
  }
}

/**
 * Helper function to safely access the plan goal from plan_data
 */
function getPlanGoal(planData: Json): string {
  if (!planData) return "";

  try {
    // Try to parse the plan data if it's a string
    const parsedData =
      typeof planData === "string" ? JSON.parse(planData) : planData;
    return parsedData.goal || "";
  } catch {
    return "";
  }
}

/**
 * Simple loading spinner component
 */
function LoadingSpinner({ className = "" }: { className?: string }) {
  return (
    <svg
      className={`animate-spin text-primary ${className}`}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      />
    </svg>
  );
}
