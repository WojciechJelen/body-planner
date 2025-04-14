"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

export function GeneratePlanButton() {
  const [isLoading, setIsLoading] = useState(false);

  const handleGeneratePlan = async () => {
    try {
      setIsLoading(true);
      const response = await fetch("/api/v1/training-plans", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Failed to generate plan:", errorData);
        // Handle different error types here if needed
      } else {
        const plan = await response.json();
        console.log("Plan generated successfully:", plan);
        // You can add additional logic here, like redirecting to the plan page
      }
    } catch (error) {
      console.error("Error generating plan:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button onClick={handleGeneratePlan} disabled={isLoading}>
      {isLoading ? "Generating..." : "Generate Plan"}
    </Button>
  );
}
