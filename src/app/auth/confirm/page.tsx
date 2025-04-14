import {
  CardHeader,
  CardContent,
  CardFooter,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function ConfirmPage() {
  return (
    <>
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Weryfikacja konta</CardTitle>
        <CardDescription>
          Twój adres email jest w trakcie weryfikacji
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col items-center justify-center space-y-4">
        <div className="text-center space-y-2">
          <p>
            Jeśli proces weryfikacji zakończył się pomyślnie, zostaniesz
            automatycznie przekierowany do aplikacji.
          </p>
          <p>
            Jeśli widzisz tę stronę przez dłuższy czas, weryfikacja mogła się
            nie powieść.
          </p>
        </div>
      </CardContent>
      <CardFooter className="flex justify-center">
        <Link href="/auth/login">
          <Button variant="outline">Powrót do logowania</Button>
        </Link>
      </CardFooter>
    </>
  );
}
