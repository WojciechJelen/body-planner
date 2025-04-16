import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { ApiErrorResponse } from "@/types/api-types";
import { TrainingPlanService } from "@/lib/services/training-plan-service/trainingPlanService";

export async function POST() {
  try {
    const supabase = await createClient();

    // Step 2: Use getUser() to verify session and get user
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    // Handle auth errors or no user
    if (authError || !user) {
      return NextResponse.json(
        {
          message: "Authentication required",
          error_code: "UNAUTHORIZED",
        } as ApiErrorResponse,
        { status: 401 }
      );
    }

    const userId = user.id;

    // Step 3: Create and call TrainingPlanService
    const trainingPlanService = new TrainingPlanService(supabase);
    const result = await trainingPlanService.generatePlan(userId);

    if (!result.success) {
      // Handle different error types
      switch (result.error) {
        case "PROFILE_INCOMPLETE":
          return NextResponse.json(
            {
              message: result.message,
              error_code: result.error,
              missing_fields: result.missingFields,
            } as ApiErrorResponse,
            { status: 400 }
          );
        case "PROFILE_NOT_FOUND":
          return NextResponse.json(
            {
              message: result.message,
              error_code: result.error,
            } as ApiErrorResponse,
            { status: 400 }
          );
        case "DATABASE_ERROR":
          return NextResponse.json(
            {
              message: result.message,
              error_code: result.error,
            } as ApiErrorResponse,
            { status: 500 }
          );
        case "AI_SERVICE_UNAVAILABLE":
          return NextResponse.json(
            {
              message: result.message,
              error_code: result.error,
            } as ApiErrorResponse,
            { status: 503 }
          );
        default:
          return NextResponse.json(
            {
              message: result.message || "An unexpected error occurred",
              error_code: result.error || "SERVER_ERROR",
            } as ApiErrorResponse,
            { status: 500 }
          );
      }
    }

    // Return the generated plan with 201 Created status
    return NextResponse.json(result.plan, { status: 201 });
  } catch (error) {
    console.error("Unexpected error:", error);
    return NextResponse.json(
      {
        message: "An unexpected error occurred",
        error_code: "SERVER_ERROR",
      } as ApiErrorResponse,
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const supabase = await createClient();

    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json(
        {
          message: "Authentication required",
          error_code: "UNAUTHORIZED",
        } as ApiErrorResponse,
        { status: 401 }
      );
    }

    const userId = user.id;

    // Extract query parameters
    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get("limit") || "10", 10); // Default limit
    const sortBy = searchParams.get("sortBy") || "created_at"; // Default sort field
    const order = searchParams.get("order") || "desc"; // Default order

    // Validate order parameter
    const ascending = order.toLowerCase() === "asc";

    // Fetch plans from database
    const { data: plans, error: dbError } = await supabase
      .from("training_plans")
      .select("*")
      .eq("user_id", userId)
      .order(sortBy, { ascending })
      .limit(limit);

    if (dbError) {
      console.error("Database error fetching plans:", dbError);
      return NextResponse.json(
        {
          message: "Failed to fetch training plans",
          error_code: "DATABASE_ERROR",
        } as ApiErrorResponse,
        { status: 500 }
      );
    }

    // Return the fetched plans
    return NextResponse.json({ data: plans });
  } catch (error) {
    console.error("Unexpected error in GET /training-plans:", error);
    return NextResponse.json(
      {
        message: "An unexpected server error occurred",
        error_code: "SERVER_ERROR",
      } as ApiErrorResponse,
      { status: 500 }
    );
  }
}
