import { NextResponse } from "next/server";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { ApiErrorResponse } from "@/types/api-types";
import { TrainingPlanService } from "@/lib/services/training-plan-service/trainingPlanService";

export async function POST() {
  try {
    // Step 2: Authentication Integration - Get user session from Supabase
    const supabase = createRouteHandlerClient({ cookies });
    const {
      data: { session },
    } = await supabase.auth.getSession();

    // Check if user is authenticated
    if (!session) {
      return NextResponse.json(
        {
          message: "Authentication required",
          error_code: "UNAUTHORIZED",
        } as ApiErrorResponse,
        { status: 401 }
      );
    }

    const userId = session.user.id;

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
