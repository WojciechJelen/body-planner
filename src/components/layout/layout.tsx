"use client";

import { usePathname } from "next/navigation";
import { Sidebar } from "./sidebar";

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const pathname = usePathname();

  // Check if the current route is an auth route
  const isAuthRoute =
    ["/login", "/register", "/forgot-password"].includes(pathname) ||
    pathname.startsWith("/auth");

  if (isAuthRoute) {
    // Return only children for auth routes
    return <>{children}</>;
  }

  // Return sidebar and children for non-auth routes
  return (
    <div className="flex h-screen">
      <Sidebar />
      <main className="flex-1 overflow-auto p-6 md:p-8">{children}</main>
    </div>
  );
}
