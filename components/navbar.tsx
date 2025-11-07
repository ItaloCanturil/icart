

"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useTheme } from "@/lib/themeContext";
import { Moon, Sun } from "lucide-react";

export function Navbar() {
  const { theme, toggleTheme } = useTheme();

  const isDark = theme === "dark";

  return (
    <div className="bg-primary text-primary-foreground p-4 flex justify-between items-center">
      <h1 className="text-lg font-semibold">Navbar</h1>

      <Input placeholder="Search products" />

      <Button
        variant="outline"
        onClick={toggleTheme}
        aria-label="Toggle theme"
        className="text-primary-foreground"
      >
        {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
        <span className="sr-only">Toggle theme</span>
      </Button>
    </div>
  );
}