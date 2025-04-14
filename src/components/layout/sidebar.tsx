"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { History, LogOut, Menu, User, Dumbbell, X } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useState, useEffect } from "react";
import { logout } from "@/app/auth/actions";

// Navigation items configuration
const navigationItems = [
  {
    name: "Profil",
    href: "/profile",
    icon: User,
  },
  {
    name: "Aktualny Plan",
    href: "/plan",
    icon: Dumbbell,
  },
  {
    name: "Historia Planów",
    href: "/history",
    icon: History,
  },
];

interface SidebarProps {
  className?: string;
}

export function Sidebar({ className }: SidebarProps) {
  const pathname = usePathname();
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Handle responsive behavior
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    // Set initial state
    handleResize();

    // Add event listener
    window.addEventListener("resize", handleResize);

    // Clean up
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Navigation items with active state
  const renderNavItems = () => {
    return navigationItems.map((item) => (
      <Link
        key={item.href}
        href={item.href}
        className={cn(
          "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all hover:bg-accent",
          pathname === item.href
            ? "bg-accent text-accent-foreground"
            : "text-muted-foreground hover:text-foreground"
        )}
        onClick={() => isMobile && setIsMobileOpen(false)}
      >
        <item.icon className="h-4 w-4" />
        <span>{item.name}</span>
      </Link>
    ));
  };

  // Desktop sidebar
  const DesktopSidebar = () => (
    <div className={cn("hidden h-screen border-r md:block w-64", className)}>
      <div className="flex h-full flex-col gap-4 p-4">
        <div className="px-3 py-2">
          <h2 className="text-lg font-semibold tracking-tight">Body Planner</h2>
        </div>
        <div className="flex-1 space-y-1">{renderNavItems()}</div>
        <form className="w-full" action={logout}>
          <Button
            variant="outline"
            size="sm"
            className="flex items-center gap-2 w-full"
            type="submit"
          >
            <LogOut className="h-4 w-4" />
            <span>Sign Out</span>
          </Button>
        </form>
      </div>
    </div>
  );

  // Mobile sidebar (Sheet component)
  const MobileSidebar = () => (
    <Sheet open={isMobileOpen} onOpenChange={setIsMobileOpen}>
      <SheetTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="md:hidden fixed left-4 top-4 z-40"
        >
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="p-0 w-64">
        <div className="flex h-full flex-col gap-4 p-4">
          <div className="flex items-center justify-between px-3 py-2">
            <h2 className="text-lg font-semibold tracking-tight">
              Body Planner
            </h2>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMobileOpen(false)}
            >
              <X className="h-4 w-4" />
              <span className="sr-only">Close menu</span>
            </Button>
          </div>
          <div className="flex-1 space-y-1">{renderNavItems()}</div>
          <form action={logout}>
            <Button
              variant="outline"
              size="sm"
              className="flex items-center gap-2"
              type="submit"
            >
              <LogOut className="h-4 w-4" />
              <span>Logout</span>
            </Button>
          </form>
        </div>
      </SheetContent>
    </Sheet>
  );

  return (
    <>
      <DesktopSidebar />
      <MobileSidebar />
    </>
  );
}
