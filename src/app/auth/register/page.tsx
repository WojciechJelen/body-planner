import Link from "next/link";
import {
  CardHeader,
  CardContent,
  CardFooter,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { RegisterForm } from "@/components/features/auth/register-form";

export default function RegisterPage() {
  return (
    <>
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Zarejestruj się</CardTitle>
        <CardDescription>Stwórz nowe konto, aby rozpocząć</CardDescription>
      </CardHeader>
      <CardContent>
        <RegisterForm />
      </CardContent>
      <CardFooter className="flex justify-center">
        <div className="text-sm text-gray-500">
          Masz już konto?{" "}
          <Link
            href="/auth/login"
            className="text-blue-500 hover:text-blue-700 font-medium"
          >
            Zaloguj się
          </Link>
        </div>
      </CardFooter>
    </>
  );
}
