import { z } from "zod";
import { SupabaseClient } from "@supabase/supabase-js";
import { TrainingPlanDto } from "@/types/api-types";
import { google } from "@ai-sdk/google";
import { generateObject } from "ai";
import { ValidationResult, PlanGenerationResult } from "./types";
import { mesocycleSchema, requiredProfileSchema } from "./training-plan-schema";

export class TrainingPlanService {
  private supabase: SupabaseClient;

  constructor(supabaseClient: SupabaseClient) {
    this.supabase = supabaseClient;
  }

  /**
   * Validates if a user's profile has all required fields for generating a training plan
   * @param userId - The user's ID to fetch and validate the profile
   * @returns ValidationResult object indicating if the profile is valid and any missing fields
   */
  async validateProfile(userId: string): Promise<ValidationResult> {
    try {
      // Fetch the user's profile from Supabase
      const { data: profile, error } = await this.supabase
        .from("profiles")
        .select("*")
        .eq("user_id", userId)
        .single();

      if (error) {
        console.error("Error fetching profile:", error);
        return {
          isValid: false,
          error: "DATABASE_ERROR",
          message: error.message,
        };
      }

      if (!profile) {
        return {
          isValid: false,
          error: "PROFILE_NOT_FOUND",
          message: "User profile not found",
        };
      }

      // Check required fields using Zod schema
      const result = requiredProfileSchema.safeParse(profile);

      if (!result.success) {
        // Extract missing fields from Zod validation error
        const fieldErrors = result.error.format();
        const missingFields = Object.keys(fieldErrors).filter(
          (key) => key !== "_errors"
        );

        return {
          isValid: false,
          error: "PROFILE_INCOMPLETE",
          message: "User profile is incomplete",
          missingFields,
        };
      }

      return { isValid: true, profile };
    } catch (error) {
      console.error("Unexpected error during profile validation:", error);
      return {
        isValid: false,
        error: "SERVER_ERROR",
        message: "An unexpected error occurred during profile validation",
      };
    }
  }

  /**
   * Generates a training plan for a user using AI
   * @param profile User profile data
   * @returns AI-generated mesocycle plan
   */
  private async generateTrainingPlanWithAI(profile: Record<string, unknown>) {
    try {
      const systemPrompt = `You are an expert fitness trainer. Create a detailed training plan based on the following user profile:
      - Age: ${profile.age}
      - Weight: ${profile.weight || "Not specified"}
      - Body fat: ${profile.body_fat || "Not specified"}
      - Training goal: ${profile.training_goal}
      - Experience: ${profile.training_experience_years || 0} years, ${
        profile.training_experience_months || 0
      } months
      - Injuries/limitations: ${profile.injuries || "None"}
      
      Create a comprehensive mesocycle training plan with detailed phases, exercises, and structured workout days.`;

      const { object: mesocycle } = await generateObject({
        model: google("gemini-2.5-pro-exp-03-25"),
        schema: mesocycleSchema,
        schemaName: "Mesocycle",
        schemaDescription:
          "Structured training plan with phases, workout days, and exercises",
        prompt: systemPrompt,
      });

      return mesocycle;
    } catch (error) {
      console.error("Error generating plan with AI:", error);
      throw error;
    }
  }

  /**
   * Saves a training plan to the database
   * @param userId User ID
   * @param mesocycle The generated mesocycle plan
   * @returns The saved plan or null if saving failed
   */
  private async saveTrainingPlan(
    userId: string,
    mesocycle: z.infer<typeof mesocycleSchema>
  ): Promise<TrainingPlanDto | null> {
    try {
      const { data: plan, error } = await this.supabase
        .from("training_plans")
        .insert({
          user_id: userId,
          plan_data: mesocycle,
          version: 1,
        })
        .select()
        .single();

      if (error) {
        console.error("Error saving training plan:", error);
        return null;
      }

      return plan as TrainingPlanDto;
    } catch (error) {
      console.error("Unexpected error saving training plan:", error);
      return null;
    }
  }

  /**
   * Logs an activity for a user
   * @param userId User ID
   * @param planId Plan ID
   * @param activityType Type of activity
   * @param description Optional description
   * @returns Success status
   */
  private async logActivity(
    userId: string,
    planId: string,
    activityType: string,
    description?: string
  ): Promise<boolean> {
    try {
      const { error } = await this.supabase.from("activity_logs").insert({
        user_id: userId,
        plan_id: planId,
        activity_type: activityType,
        description,
      });

      return !error;
    } catch (error) {
      console.error("Error logging activity:", error);
      return false;
    }
  }

  /**
   * Generates a training plan for the user using AI
   * @param userId - The user's ID to generate a plan for
   */
  async generatePlan(userId: string): Promise<PlanGenerationResult> {
    // Step 1: Validate user profile
    const profileValidation = await this.validateProfile(userId);

    if (!profileValidation.isValid) {
      return {
        success: false,
        error: profileValidation.error,
        message: profileValidation.message,
        missingFields: profileValidation.missingFields,
      };
    }

    // Step 2: Generate plan with AI
    try {
      const mesocycle = await this.generateTrainingPlanWithAI(
        profileValidation.profile!
      );

      // Step 3: Save the plan to database
      const savedPlan = await this.saveTrainingPlan(userId, mesocycle);

      if (!savedPlan) {
        return {
          success: false,
          error: "DATABASE_ERROR",
          message: "Failed to save the training plan. Please try again later.",
        };
      }

      // Step 4: Log the activity
      await this.logActivity(
        userId,
        savedPlan.id,
        "CREATE_PLAN",
        "Plan created with AI"
      );

      return {
        success: true,
        plan: savedPlan,
      };
    } catch (error) {
      console.error("Error during plan generation:", error);
      return {
        success: false,
        error: "SERVER_ERROR",
        message: "An unexpected error occurred during plan generation",
      };
    }
  }
}
