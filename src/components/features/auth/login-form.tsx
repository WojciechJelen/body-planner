import { login } from "@/app/auth/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";

export function LoginForm() {
  return (
    <form action={login} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          name="email"
          type="email"
          placeholder="twoj@email.com"
          // disabled={isLoading}
          // aria-invalid={!!emailError}
        />
        {/* {emailError && <p className="text-sm text-red-500">{emailError}</p>} */}
      </div>
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label htmlFor="password">Hasło</Label>
          <Link
            href="/auth/reset-password"
            className="text-sm text-blue-500 hover:text-blue-700"
          >
            Zapomniałeś hasła?
          </Link>
        </div>
        <Input
          id="password"
          name="password"
          type="password"
          placeholder="••••••••"
          // disabled={isLoading}
          // aria-invalid={!!passwordError}
        />
        {/* {passwordError && (
          <p className="text-sm text-red-500">{passwordError}</p>
        )} */}
      </div>
      <Button type="submit" className="w-full">
        Log in
      </Button>
    </form>
  );
}
