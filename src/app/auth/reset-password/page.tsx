import Link from "next/link";
import {
  CardHeader,
  CardContent,
  CardFooter,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { ResetPasswordForm } from "@/components/features/auth/reset-password-form";

export default function ResetPasswordPage() {
  return (
    <>
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Resetowanie hasła</CardTitle>
        <CardDescription>
          Wprowadź adres email, aby otrzymać link do resetowania hasła
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ResetPasswordForm />
      </CardContent>
      <CardFooter className="flex justify-center">
        <div className="text-sm text-gray-500">
          <Link
            href="/auth/login"
            className="text-blue-500 hover:text-blue-700 font-medium"
          >
            Powrót do logowania
          </Link>
        </div>
      </CardFooter>
    </>
  );
}
