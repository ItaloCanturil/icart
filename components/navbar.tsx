"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useTheme } from "@/lib/themeContext";
import { Moon, Sun } from "lucide-react";
import { useState } from "react";

export function Navbar() {
	const { theme, toggleTheme } = useTheme();
	const [navFocus, setNavFocus] = useState(false);

	const isDark = theme === "dark";

	return (
		<div className="bg-secondary p-4 flex justify-between items-center">
			<h1 className="text-lg font-semibold text-secondary-foreground">
				BeroShop
			</h1>

			<Input
				placeholder="Procurar produtos"
				className={`transition-all duration-300 ease-in-out shadow-lg ${
					navFocus ? "w-64" : "w-44"
				}`}
				onFocus={() => setNavFocus(true)}
				onBlur={() => setNavFocus(false)}
			/>

			<Button
				variant="outline"
				onClick={toggleTheme}
				aria-label="Toggle theme"
				className="text-primary-foreground"
			>
				{isDark ? (
					<Sun className="h-4 w-4 text-secondary-foreground" />
				) : (
					<Moon className="h-4 w-4" />
				)}
				<span className="sr-only">Toggle theme</span>
			</Button>
		</div>
	);
}
