# Training Plans API Endpoint

This endpoint allows users to generate personalized training plans using AI based on their profile information.

## POST /api/v1/training-plans

Generates a new training plan for the authenticated user.

### Authentication

- Requires a valid Supabase session token
- Returns 401 Unauthorized if not authenticated

### Request

- Method: POST
- Body: None (uses user profile data for AI input)

### Response

#### Success (201 Created)

Returns the newly created training plan:

```json
{
  "id": "uuid",
  "user_id": "uuid",
  "plan_data": {
    "name": "Plan name",
    "description": "Plan description",
    "goal": "Main goal of the plan",
    "duration_weeks": 4,
    "days_per_week": 3,
    "workout_days": [
      {
        "day_number": 1,
        "name": "Push Day",
        "focus": "Chest and Triceps",
        "exercises": [
          {
            "name": "Bench Press",
            "sets": 3,
            "reps": 10,
            "rest_seconds": 90,
            "notes": "Focus on form"
          }
        ]
      }
    ]
  },
  "version": 1,
  "created_at": "timestampz",
  "updated_at": "timestampz"
}
```

#### Error Responses

- **400 Bad Request** - Profile Incomplete

  ```json
  {
    "message": "User profile is incomplete",
    "error_code": "PROFILE_INCOMPLETE",
    "missing_fields": ["age", "training_goal"]
  }
  ```

- **401 Unauthorized** - Not Authenticated

  ```json
  {
    "message": "Authentication required",
    "error_code": "UNAUTHORIZED"
  }
  ```

- **500 Internal Server Error** - Database Error

  ```json
  {
    "message": "Error message",
    "error_code": "DATABASE_ERROR"
  }
  ```

- **503 Service Unavailable** - AI Service Unavailable
  ```json
  {
    "message": "Failed to generate a training plan. Please try again later.",
    "error_code": "AI_SERVICE_UNAVAILABLE"
  }
  ```

## Prerequisites

Before using this endpoint, ensure:

1. The user has a complete profile with at least:

   - age
   - training_goal

2. OpenAI API key is configured in the environment variables:
   ```
   OPENAI_API_KEY=your_openai_api_key
   ```

## Implementation Notes

- Uses OpenAI GPT-3.5 Turbo for plan generation
- Stores plan data in the `training_plans` table
- Logs activity in the `activity_logs` table
