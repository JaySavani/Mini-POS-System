"use client";

import Link from "next/link";

import { Code2, LogIn } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

import { ThemeToggle } from "./theme-toggle";

// const navItems = [
//   { href: "/", label: "Explore", icon: "" },
// ];

export function Navbar() {
  //   const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="bg-card/80 sticky top-0 z-50 border-b backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 lg:px-8">
        <Link href="/" className="flex items-center gap-2.5">
          <div className="bg-primary flex h-8 w-8 items-center justify-center rounded-lg">
            <Code2 className="text-primary-foreground h-4.5 w-4.5" />
          </div>
          <span className="text-foreground text-lg font-bold tracking-tight">
            POS
          </span>
        </Link>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          {
            //   (
            //     <Button
            //       variant="ghost"
            //       size="sm"
            //       onClick={() => signOut()}
            //       className="text-muted-foreground hover:text-foreground gap-2"
            //     >
            //       <LogOut className="h-4 w-4" />
            //       Logout
            //     </Button>
            //   ) :
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
          }
        </div>
      </div>
    </header>
  );
}
