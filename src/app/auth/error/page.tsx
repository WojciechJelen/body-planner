import {
  CardHeader,
  CardContent,
  CardFooter,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function AuthErrorPage() {
  return (
    <>
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-red-600">
          Błąd autentykacji
        </CardTitle>
        <CardDescription>
          Wystąpił problem podczas przetwarzania Twojego żądania
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col items-center justify-center space-y-4">
        <div className="text-center space-y-2">
          <p>Link może być nieprawidłowy lub wygasł.</p>
          <p>
            Spróbuj ponownie lub skontaktuj się z administratorem, jeśli problem
            będzie się powtarzał.
          </p>
        </div>
      </CardContent>
      <CardFooter className="flex justify-center">
        <Link href="/auth/login">
          <Button>Powrót do logowania</Button>
        </Link>
      </CardFooter>
    </>
  );
}
