import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { ApiErrorResponse, TrainingPlanDto } from "@/types/api-types";

// API functions
const fetchCurrentPlan = async (): Promise<TrainingPlanDto | null> => {
  const response = await fetch(
    "/api/v1/training-plans?limit=1&sortBy=created_at&order=desc"
  );

  console.log(response);

  if (!response.ok) {
    const errorResponse: ApiErrorResponse = await response.json();
    throw errorResponse;
  }

  const data = await response.json();
  return data.data[0] || null;
};

const generatePlan = async (): Promise<TrainingPlanDto> => {
  const response = await fetch("/api/v1/training-plans", {
    method: "POST",
  });

  if (!response.ok) {
    const errorResponse: ApiErrorResponse = await response.json();
    throw errorResponse;
  }

  return response.json();
};

const deletePlan = async (planId: string): Promise<void> => {
  const response = await fetch(`/api/v1/training-plans/${planId}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    const errorResponse: ApiErrorResponse = await response.json();
    throw errorResponse;
  }
};

// Extended ApiErrorResponse to include missing_fields
interface ExtendedApiErrorResponse extends ApiErrorResponse {
  missing_fields?: string[];
}

// Custom hook interface
export interface AktualnyPlanTreningowyViewModel {
  isLoadingPlan: boolean;
  planError: ExtendedApiErrorResponse | null;
  currentPlan: TrainingPlanDto | null;
  isGeneratingPlan: boolean;
  generationError: ExtendedApiErrorResponse | null;
  isDeletingPlan: boolean;
  deleteError: ExtendedApiErrorResponse | null;
  isProfileIncomplete: boolean;
  missingProfileFields: string[] | undefined;
  showIncompleteProfileModal: boolean;
  setShowIncompleteProfileModal: (show: boolean) => void;
  generatePlanMutation: {
    mutate: () => void;
  };
  deletePlanMutation: {
    mutate: (planId: string) => void;
  };
}

/**
 * Custom hook for handling the current training plan
 * Encapsulates data fetching, mutation operations and related state
 */
export const useAktualnyPlanTreningowy =
  (): AktualnyPlanTreningowyViewModel => {
    const queryClient = useQueryClient();
    const [showIncompleteProfileModal, setShowIncompleteProfileModal] =
      useState(false);

    // Query for fetching the current plan
    const {
      data: currentPlan,
      isLoading: isLoadingPlan,
      error: planErrorRaw,
    } = useQuery({
      queryKey: ["currentTrainingPlan"],
      queryFn: fetchCurrentPlan,
    });

    // Mutation for generating a new plan
    const {
      mutate: generatePlanMutate,
      isPending: isGeneratingPlan,
      error: generationErrorRaw,
    } = useMutation({
      mutationFn: generatePlan,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["currentTrainingPlan"] });
        toast.success("Plan treningowy został wygenerowany!");
      },
      onError: (error: ExtendedApiErrorResponse) => {
        if (error.error_code === "PROFILE_INCOMPLETE") {
          setShowIncompleteProfileModal(true);
        } else {
          toast.error(
            error.message ||
              "Wystąpił błąd podczas generowania planu treningowego."
          );
        }
      },
    });

    // Mutation for deleting a plan
    const {
      mutate: deletePlanMutate,
      isPending: isDeletingPlan,
      error: deleteErrorRaw,
    } = useMutation({
      mutationFn: deletePlan,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["currentTrainingPlan"] });
        toast.success("Plan treningowy został usunięty!");
      },
      onError: (error: ExtendedApiErrorResponse) => {
        toast.error(
          error.message || "Wystąpił błąd podczas usuwania planu treningowego."
        );
      },
    });

    // Type casting and processing for errors
    const planError = planErrorRaw as ExtendedApiErrorResponse | null;
    const generationError =
      generationErrorRaw as ExtendedApiErrorResponse | null;
    const deleteError = deleteErrorRaw as ExtendedApiErrorResponse | null;

    // Derived state
    const isProfileIncomplete =
      generationError?.error_code === "PROFILE_INCOMPLETE";
    const missingProfileFields = isProfileIncomplete
      ? generationError?.missing_fields
      : undefined;

    return {
      isLoadingPlan,
      planError,
      currentPlan: currentPlan ?? null,
      isGeneratingPlan,
      generationError,
      isDeletingPlan,
      deleteError,
      isProfileIncomplete,
      missingProfileFields,
      showIncompleteProfileModal,
      setShowIncompleteProfileModal,
      generatePlanMutation: {
        mutate: generatePlanMutate,
      },
      deletePlanMutation: {
        mutate: deletePlanMutate,
      },
    };
  };
