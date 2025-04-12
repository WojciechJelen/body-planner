import { z } from "zod";

// Zod schemas based on the types defined in training-plan-type.ts
export const exerciseDetailSchema = z.object({
  exercise_id: z
    .string()
    .describe(
      "Unique identifier for the exercise within a group (e.g., 'A1', 'B2', 'C')."
    ),
  name: z.string().describe("Full name of the exercise."),
  sets: z.number().int().positive().describe("Number of sets to perform."),
  reps: z
    .string()
    .describe(
      "Range of repetitions or specific instruction (e.g., '10-12', '6-8', 'AMRAP >8')."
    ),
  tempo: z
    .string()
    .describe(
      "Exercise execution tempo in 4-digit format (Eccentric, Bottom Pause, Concentric, Top Pause). X indicates explosive movement (e.g., '4010', '31X0')."
    ),
  rest: z
    .string()
    .describe(
      "Rest time after performing the exercise or the entire group (e.g., '75s', '120s')."
    ),
  notes: z
    .string()
    .optional()
    .describe(
      "Additional notes or tips regarding exercise execution (optional)."
    ),
});

export const exerciseMethodSchema = z
  .union([
    z.literal("Standard"),
    z.literal("Superseria"),
    z.literal("Giant Set"),
    z.literal("Tri-Set"),
    z.literal("Drop Set"),
    z.string(),
  ])
  .describe("Special method applied to exercise groups.");

export const exerciseGroupSchema = z.object({
  group_id: z
    .string()
    .describe("Exercise group identifier (e.g., 'A', 'B', 'A1-A3')."),
  method: exerciseMethodSchema,
  exercises: z
    .array(exerciseDetailSchema)
    .describe("List of exercises belonging to this group."),
});

export const workoutDaySchema = z.object({
  day_number: z
    .number()
    .int()
    .positive()
    .describe("Training day number in the week (e.g., 1, 2, 4)."),
  focus: z
    .string()
    .describe(
      "Main goal or muscle groups trained on this day (e.g., 'Chest & Back')."
    ),
  exercise_groups: z
    .array(exerciseGroupSchema)
    .describe("List of exercise groups planned for this day."),
});

export const trainingPhaseSchema = z.object({
  phase_number: z
    .number()
    .int()
    .positive()
    .describe("Sequential phase number in the mesocycle."),
  name: z.string().describe("Phase name (e.g., 'Accumulation 1')."),
  weeks: z
    .string()
    .describe("Range of weeks during which this phase applies (e.g., '1-4')."),
  goal: z.string().describe("Main training objective of this phase."),
  notes: z
    .string()
    .optional()
    .describe("Additional notes about the entire phase (optional)."),
  weekly_split: z
    .array(workoutDaySchema)
    .describe("Distribution of training days in a week for this phase."),
});

export const mesocycleSchema = z.object({
  name: z.string().describe("Name of the entire training plan."),
  goal: z
    .string()
    .describe(
      "Main objective of the mesocycle (e.g., 'Hypertrophy (Muscle Mass)')."
    ),
  duration_weeks: z
    .number()
    .int()
    .positive()
    .describe("Total duration of the mesocycle in weeks."),
  philosophy: z
    .string()
    .describe("Description of the philosophy or main principles of the plan."),
  weekly_structure: z
    .string()
    .describe("Description of the general weekly training structure."),
  introduction: z
    .string()
    .describe("Introduction or preliminary notes for the plan."),
  final_notes: z
    .array(z.string())
    .describe("List of final, important notes regarding plan implementation."),
  phases: z
    .array(trainingPhaseSchema)
    .describe("Array containing all training phases of the mesocycle."),
});

// Schema for required profile fields
export const requiredProfileSchema = z.object({
  age: z.number().min(1).max(120),
  weight: z.number().positive().optional(),
  training_goal: z.string().min(1),
  training_experience_years: z.number().min(0).optional(),
  training_experience_months: z.number().min(0).max(11).optional(),
});
