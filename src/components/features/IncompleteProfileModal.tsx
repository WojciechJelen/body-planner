import Link from "next/link";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface IncompleteProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  missingFields: string[] | undefined;
}

/**
 * Modal displayed when a user tries to generate a training plan
 * but their profile is incomplete.
 */
export function IncompleteProfileModal({
  isOpen,
  onClose,
  missingFields = [],
}: IncompleteProfileModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Uzupełnij swój profil</DialogTitle>
          <DialogDescription>
            Aby wygenerować plan treningowy, musisz uzupełnić swój profil.
            Brakujące pola:
          </DialogDescription>
        </DialogHeader>
        <div className="py-4">
          {missingFields && missingFields.length > 0 ? (
            <ul className="list-disc pl-5 space-y-2">
              {missingFields.map((field) => (
                <li key={field} className="text-sm text-muted-foreground">
                  {formatFieldName(field)}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-muted-foreground">
              Twój profil wymaga uzupełnienia.
            </p>
          )}
        </div>
        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={onClose}>
            Anuluj
          </Button>
          <Button asChild>
            <Link href="/profile">Przejdź do profilu</Link>
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

/**
 * Helper function to format field names for display
 */
function formatFieldName(field: string): string {
  const fieldNameMap: Record<string, string> = {
    age: "Wiek",
    weight: "Waga",
    body_fat: "Procent tkanki tłuszczowej",
    training_goal: "Cel treningowy",
    training_experience_years: "Doświadczenie treningowe (lata)",
    training_experience_months: "Doświadczenie treningowe (miesiące)",
    injuries: "Kontuzje",
  };

  return fieldNameMap[field] || field;
}
