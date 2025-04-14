"use client";

import { Button } from "@/components/ui/button";

export function LogoutButton() {
  return (
    <form>
      <Button type="submit" variant="ghost" size="sm">
        Wyloguj
      </Button>
    </form>
  );
}
