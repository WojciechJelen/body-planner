import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function LoginPage() {
  return (
    <div className="container mx-auto flex items-center justify-center h-screen">
      <div className="w-full max-w-md p-8 space-y-8 bg-card rounded-lg shadow-lg">
        <div className="text-center">
          <h1 className="text-3xl font-bold">Body Planner</h1>
          <p className="text-muted-foreground mt-2">
            Zaloguj się do swojego konta
          </p>
        </div>

        <div className="space-y-4">
          {/* Placeholder for login form */}
          <p className="text-center">Formularz logowania będzie tutaj.</p>

          <div className="flex justify-between">
            <Link href="/register">
              <Button variant="link" className="p-0">
                Zarejestruj się
              </Button>
            </Link>
            <Link href="/forgot-password">
              <Button variant="link" className="p-0">
                Zapomniałem hasła
              </Button>
            </Link>
          </div>

          {/* Temporary login button for testing */}
          <Button className="w-full" asChild>
            <Link href="/plan">Zaloguj (testowo)</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
