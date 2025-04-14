import {
  CardHeader,
  CardContent,
  CardFooter,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { NewPasswordForm } from "@/components/features/auth/new-password-form";

export default function NewPasswordPage() {
  return (
    <>
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Ustaw nowe hasło</CardTitle>
        <CardDescription>Wprowadź i potwierdź swoje nowe hasło</CardDescription>
      </CardHeader>
      <CardContent>
        <NewPasswordForm />
      </CardContent>
      <CardFooter className="flex justify-center">
        <div className="text-sm text-gray-500">
          Po zmianie hasła zostaniesz przekierowany do strony logowania
        </div>
      </CardFooter>
    </>
  );
}
