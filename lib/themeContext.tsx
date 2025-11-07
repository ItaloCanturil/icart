"use client";

import { useContext, createContext, useEffect, useState, ReactNode } from "react";
import { flushSync } from "react-dom";

interface ThemeContextType {
    theme: 'light' | 'dark',
    toggleTheme: () => void,
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export function ThemeProvider({ children }: { children: ReactNode}) {
    const [theme, setTheme] = useState<ThemeContextType['theme']>('light');

    // Initialize theme from localStorage and sync the root .dark class
    useEffect(() => {
        const stored = typeof window !== 'undefined' ? localStorage.getItem('theme') : null;
        const isDark = stored !== 'light';
        const initialTheme: ThemeContextType['theme'] = isDark ? 'dark' : 'light';
        setTheme(initialTheme);
        if (typeof window !== 'undefined') {
            localStorage.setItem('theme', initialTheme);
            document.documentElement.classList.toggle('dark', initialTheme === 'dark');
        }
    }, []);

    // Persist theme and toggle the root .dark class whenever theme changes
    useEffect(() => {
        if (typeof window !== 'undefined') {
            localStorage.setItem('theme', theme);
            document.documentElement.classList.toggle('dark', theme === 'dark');
        }
    }, [theme]);

    function toggleTheme() {
        const newTheme = theme === 'light' ? 'dark' : 'light';
        if (!document.startViewTransition) {
            setTheme(newTheme);
            return;
        }
        document.startViewTransition(() => {
            flushSync(() => {
                setTheme(newTheme);
            });
        });
    };

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            { children }
        </ThemeContext.Provider>
    )
}

export function useTheme() {
    const context = useContext(ThemeContext);
    if (!context) throw new Error('useTheme must be used within a ThemeProvider');
    return context;
}