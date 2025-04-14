"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function NewPasswordForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [confirmPasswordError, setConfirmPasswordError] = useState<
    string | null
  >(null);
  const [isSubmitSuccess, setIsSubmitSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Reset error states
    setFormError(null);
    setPasswordError(null);
    setConfirmPasswordError(null);

    // Get form data
    const formData = new FormData(e.currentTarget);
    const password = formData.get("password") as string;
    const confirmPassword = formData.get("confirmPassword") as string;

    // Basic client-side validation
    let hasError = false;

    if (!password) {
      setPasswordError("Hasło jest wymagane");
      hasError = true;
    } else if (password.length < 8) {
      setPasswordError("Hasło musi mieć co najmniej 8 znaków");
      hasError = true;
    } else if (!/(?=.*\d)(?=.*[!@#$%^&*])/.test(password)) {
      setPasswordError("Hasło musi zawierać cyfrę i znak specjalny");
      hasError = true;
    }

    if (!confirmPassword) {
      setConfirmPasswordError("Potwierdzenie hasła jest wymagane");
      hasError = true;
    } else if (password !== confirmPassword) {
      setConfirmPasswordError("Hasła nie są identyczne");
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
      toast.success("Hasło zostało zmienione pomyślnie");
    } catch (error: unknown) {
      console.error("Password update error:", error);
      const errorMessage =
        error instanceof Error
          ? error.message
          : "Wystąpił błąd podczas aktualizacji hasła";
      setFormError(errorMessage);
      toast.error("Nie udało się zmienić hasła");
    } finally {
      setIsLoading(false);
    }
  };

  if (isSubmitSuccess) {
    return (
      <div className="text-center space-y-4">
        <h3 className="text-lg font-medium">Hasło zostało zmienione</h3>
        <p className="text-sm text-gray-500">
          Twoje hasło zostało zmienione pomyślnie. Możesz teraz zalogować się
          używając nowego hasła.
        </p>
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
        <Label htmlFor="password">Nowe hasło</Label>
        <Input
          id="password"
          name="password"
          type="password"
          placeholder="••••••••"
          disabled={isLoading}
          aria-invalid={!!passwordError}
        />
        {passwordError ? (
          <p className="text-sm text-red-500">{passwordError}</p>
        ) : (
          <p className="text-xs text-gray-500">
            Hasło musi mieć co najmniej 8 znaków i zawierać cyfrę oraz znak
            specjalny
          </p>
        )}
      </div>
      <div className="space-y-2">
        <Label htmlFor="confirmPassword">Potwierdź nowe hasło</Label>
        <Input
          id="confirmPassword"
          name="confirmPassword"
          type="password"
          placeholder="••••••••"
          disabled={isLoading}
          aria-invalid={!!confirmPasswordError}
        />
        {confirmPasswordError && (
          <p className="text-sm text-red-500">{confirmPasswordError}</p>
        )}
      </div>
      <Button type="submit" className="w-full" disabled={isLoading}>
        {isLoading ? "Zapisywanie..." : "Zapisz nowe hasło"}
      </Button>
    </form>
  );
}
