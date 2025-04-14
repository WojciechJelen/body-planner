import { createClient } from "@/lib/supabase/server";

export type ProfilePayload = {
  age?: number;
  weight?: number;
  body_fat?: number;
  training_goal?: string;
  training_experience_years?: number;
  training_experience_months?: number;
  injuries?: string;
};

/**
 * Creates a new profile for a user
 * @param userId - The ID of the user in auth.users
 * @param payload - Optional profile data
 * @returns The created profile or null if creation failed
 */
export async function createProfile(
  userId: string,
  payload: ProfilePayload = {}
) {
  try {
    const supabase = await createClient();

    // Set default values for required fields
    const profileData = {
      user_id: userId,
      age: payload.age || 30, // Default age as required field
      weight: payload.weight,
      body_fat: payload.body_fat,
      training_goal: payload.training_goal,
      training_experience_years: payload.training_experience_years,
      training_experience_months: payload.training_experience_months,
      injuries: payload.injuries,
    };

    const { data, error } = await supabase
      .from("profiles")
      .insert(profileData)
      .select()
      .single();

    if (error) {
      console.error("Error creating profile:", error);
      return null;
    }

    return data;
  } catch (error) {
    console.error("Exception creating profile:", error);
    return null;
  }
}

/**
 * Creates a minimal profile for a new user with only required fields
 * @param userId - The ID of the user in auth.users
 * @returns The created profile or null if creation failed
 */
export async function createEmptyProfile(userId: string) {
  return createProfile(userId);
}
