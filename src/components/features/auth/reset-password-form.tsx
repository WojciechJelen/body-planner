"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function ResetPasswordForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [emailError, setEmailError] = useState<string | null>(null);
  const [isSubmitSuccess, setIsSubmitSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Reset error states
    setFormError(null);
    setEmailError(null);

    // Get form data
    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;

    // Basic client-side validation
    let hasError = false;

    if (!email) {
      setEmailError("Email jest wymagany");
      hasError = true;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setEmailError("Podaj prawidłowy adres email");
      hasError = true;
    }

    if (hasError) return;

    // Mock form submission (will be replaced with actual server action)
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // This would be replaced with actual server action call
      setIsSubmitSuccess(true);
      toast.success(
        "Link do resetowania hasła został wysłany na podany adres email"
      );
    } catch (error: unknown) {
      console.error("Password reset error:", error);
      const errorMessage =
        error instanceof Error
          ? error.message
          : "Wystąpił błąd podczas wysyłania linku resetującego";
      setFormError(errorMessage);
      toast.error("Nie udało się wysłać linku resetującego");
    } finally {
      setIsLoading(false);
    }
  };

  if (isSubmitSuccess) {
    return (
      <div className="text-center space-y-4">
        <h3 className="text-lg font-medium">Link resetujący został wysłany</h3>
        <p className="text-sm text-gray-500">
          Sprawdź swoją skrzynkę email i kliknij w link, aby zresetować hasło.
          Link jest ważny przez 24 godziny.
        </p>
        <div className="bg-blue-50 p-4 rounded-md text-sm">
          <p>
            Jeśli nie otrzymałeś emaila, sprawdź folder spam lub spróbuj
            ponownie za kilka minut.
          </p>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {formError && (
        <div className="p-3 rounded-md bg-red-50 text-red-500 text-sm">
          {formError}
        </div>
      )}
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          name="email"
          type="email"
          placeholder="twoj@email.com"
          disabled={isLoading}
          aria-invalid={!!emailError}
        />
        {emailError && <p className="text-sm text-red-500">{emailError}</p>}
      </div>
      <Button type="submit" className="w-full" disabled={isLoading}>
        {isLoading ? "Wysyłanie..." : "Wyślij link resetujący"}
      </Button>
    </form>
  );
}
