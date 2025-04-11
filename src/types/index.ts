import { Tables, UpdateType } from "./supabase"; // Assuming supabase.ts is in the same directory or adjust path

// --- Base Database Entity Types (Imported/Referenced from supabase.ts) ---

type Profile = Tables<"profiles">;
type TrainingPlan = Tables<"training_plans">;
// type ActivityLog = Tables<'activity_logs'>; // Not directly used in DTOs below but available
// type User = Tables<'users'>; // Primarily managed by Auth, not directly exposed in these DTOs

// --- Profile Resource DTOs and Commands ---

/**
 * DTO for retrieving user profile details.
 * GET /api/v1/profile
 * Directly maps to the 'profiles' table structure.
 */
export type ProfileDto = Profile;

/**
 * Command Model for updating user profile details.
 * PUT /api/v1/profile
 * Based on the 'profiles' table structure, but defines specific required/optional fields for the update operation.
 */
export type UpdateProfileCommand = {
  age: Required<Profile["age"]>; // 'age' is required as per API plan
  weight?: Profile["weight"];
  body_fat?: Profile["body_fat"];
  training_goal?: Profile["training_goal"];
  training_experience_years?: Profile["training_experience_years"];
  training_experience_months?: Profile["training_experience_months"];
  injuries?: Profile["injuries"];
};

// --- Training Plan Resource DTOs and Commands ---

/**
 * DTO for representing a single training plan.
 * Used in POST /api/v1/training-plans response, GET /api/v1/training-plans/{planId} response, and within PaginatedTrainingPlansDto.
 * Directly maps to the 'training_plans' table structure.
 */
export type TrainingPlanDto = TrainingPlan;

/**
 * Structure for pagination information used in list responses.
 */
export type PaginationInfo = {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  limit: number;
};

/**
 * DTO for retrieving a paginated list of training plans.
 * GET /api/v1/training-plans
 */
export type PaginatedTrainingPlansDto = {
  data: TrainingPlanDto[];
  pagination: PaginationInfo;
};

/**
 * Command Model for partially updating a training plan.
 * PATCH /api/v1/training-plans/{planId}
 * Allows updating specific fields, primarily 'plan_data'. Derived from 'training_plans' update type.
 */
export type UpdateTrainingPlanCommand = Pick<
  UpdateType<"training_plans">,
  "plan_data" // As per API spec example, only plan_data is shown for PATCH
  // Add 'version'?: TrainingPlan['version'] here if version updates via PATCH are needed.
>;

// --- AI Resource DTOs and Commands ---

/**
 * Helper interface for exercise details within AI requests.
 */
interface ExerciseInfo {
  name: string;
  targetMuscle: string;
}

/**
 * Helper interface for plan context within AI requests.
 */
interface PlanContext {
  day: string;
  focus: string;
}

/**
 * Command Model for requesting exercise recommendations from AI.
 * POST /api/v1/ai/recommendations/exercises
 * Contains context required by the AI. Links 'trainingGoal' to the profile type.
 */
export type ExerciseRecommendationCommand = {
  currentExercise: ExerciseInfo;
  trainingGoal: Profile["training_goal"]; // Linked to profile type
  availableEquipment: string[];
  planContext?: PlanContext; // Optional context
};

/**
 * Helper interface for a single exercise recommendation from AI.
 */
interface ExerciseRecommendation {
  name: string;
  reason: string;
}

/**
 * DTO for the response containing AI exercise recommendations.
 * POST /api/v1/ai/recommendations/exercises
 */
export type ExerciseRecommendationDto = {
  recommendations: ExerciseRecommendation[];
};

// --- General API Types ---

/**
 * Generic structure for API error responses.
 */
export type ApiErrorResponse = {
  message: string;
  errorCode?: string; // Optional specific error code (e.g., 'PROFILE_INCOMPLETE')
  errors?: Record<string, string[]>; // Optional field-specific validation errors
};
