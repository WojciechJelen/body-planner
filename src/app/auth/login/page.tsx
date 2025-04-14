import Link from "next/link";
import {
  CardHeader,
  CardContent,
  CardFooter,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { LoginForm } from "@/components/features/auth/login-form";

export default function LoginPage() {
  return (
    <>
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Zaloguj się</CardTitle>
        <CardDescription>Wprowadź swoje dane, aby kontynuować</CardDescription>
      </CardHeader>
      <CardContent>
        <LoginForm />
      </CardContent>
      <CardFooter className="flex justify-center">
        <div className="text-sm text-gray-500">
          Nie masz jeszcze konta?{" "}
          <Link
            href="/auth/register"
            className="text-blue-500 hover:text-blue-700 font-medium"
          >
            Zarejestruj się
          </Link>
        </div>
      </CardFooter>
    </>
  );
}
