"use client";

import { useMemo } from "react";

import Link from "next/link";
import { useRouter } from "next/navigation";

import {
  LayoutDashboard,
  LogIn,
  LogOut,
  ShoppingCart,
  User,
} from "lucide-react";
import { toast } from "sonner";
import { useShallow } from "zustand/react/shallow";

import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/stores/auth";
import { useCartStore } from "@/stores/cart";

import { Badge } from "../ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { ThemeToggle } from "./theme-toggle";

// const navItems = [
//   { href: "/", label: "Explore", icon: "" },
// ];

export function Navbar() {
  const [user, logout, isAuthenticated] = useAuthStore(
    useShallow((state) => [state.user, state.logout, state.isAuthenticated])
  );
  const router = useRouter();
  const items = useCartStore(useShallow((state) => state.items));

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

  const handleLogout = () => {
    logout();
    toast.success("Logged out successfully");
    router.push("/sign-in");
  };

  return (
    <header className="bg-card/80 sticky top-0 z-50 border-b backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 lg:px-8">
        <Link href="/" className="flex items-center gap-2.5">
          <div className="bg-primary flex h-8 w-8 items-center justify-center rounded-lg">
            <LayoutDashboard className="text-primary-foreground h-4.5 w-4.5" />
          </div>
          <span className="text-foreground text-lg font-bold tracking-tight">
            POS
          </span>
        </Link>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          {isAuthenticated && user ? (
            <>
              <Button
                variant="outline"
                size="icon"
                className="relative"
                onClick={() => router.push("/cart")}
              >
                <ShoppingCart className="h-5 w-5" />
                {totalItems > 0 && (
                  <Badge
                    variant="default"
                    className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 text-xs"
                  >
                    {totalItems}
                  </Badge>
                )}
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="cursor-pointer gap-2">
                    <User className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-fit">
                  <DropdownMenuLabel>
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm leading-none font-medium">
                        {user.name}
                      </p>
                      <p className="text-muted-foreground text-xs leading-none">
                        {user.email}
                      </p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={handleLogout}
                    className="text-muted-foreground hover:text-foreground cursor-pointer gap-2"
                  >
                    <LogOut className="hover:text-foreground h-4 w-4" />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            // <Button
            //   variant="ghost"
            //   size="sm"
            //   onClick={handleLogout}
            //   className="text-muted-foreground hover:text-foreground gap-2"
            // >
            //   <LogOut className="h-4 w-4" />
            //   Logout
            // </Button>
            <>
              <Link href="/sign-in">
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-muted-foreground hover:text-foreground gap-2"
                >
                  <LogIn className="h-4 w-4" />
                  Sign In
                </Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
