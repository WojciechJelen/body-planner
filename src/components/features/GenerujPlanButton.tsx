import { Button } from "@/components/ui/button";

interface GenerujPlanButtonProps {
  onClick: () => void;
  isGenerating: boolean;
}

/**
 * Button for generating a new training plan.
 * Displays a loading state when the plan is being generated.
 */
export function GenerujPlanButton({
  onClick,
  isGenerating,
}: GenerujPlanButtonProps) {
  return (
    <div className="flex flex-col items-center justify-center py-12">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-semibold mb-2">
          Nie masz jeszcze planu treningowego
        </h2>
        <p className="text-muted-foreground">
          Wygeneruj nowy plan treningowy dopasowany do Twoich potrzeb i celów.
        </p>
      </div>
      <Button
        onClick={onClick}
        disabled={isGenerating}
        size="lg"
        className="px-8"
      >
        {isGenerating ? (
          <>
            <LoadingSpinner className="mr-2" />
            Generowanie...
          </>
        ) : (
          "Generuj plan treningowy"
        )}
      </Button>
    </div>
  );
}

/**
 * Simple loading spinner component for button states
 */
function LoadingSpinner({ className = "" }: { className?: string }) {
  return (
    <svg
      className={`animate-spin h-4 w-4 ${className}`}
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
