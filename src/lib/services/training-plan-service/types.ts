import { TrainingPlanDto } from "@/types/api-types";

export type ValidationResult = {
  isValid: boolean;
  error?: string;
  message?: string;
  missingFields?: string[];
  profile?: Record<string, unknown>;
};

export type PlanGenerationResult = {
  success: boolean;
  error?: string;
  message?: string;
  missingFields?: string[];
  plan?: TrainingPlanDto;
};
