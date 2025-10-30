"use client";

import { error } from "console";
import { useContext, createContext, useEffect, useState, ReactNode } from "react";
import { flushSync } from "react-dom";

interface ThemeContextType {
    theme: 'light' | 'dark',
    toggleTheme: () => void,
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export function ThemeProvider({ children }: { children: ReactNode}) {
    const [theme, setTheme] = useState<ThemeContextType['theme']>('light');
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        const stored = localStorage.getItem('theme');
        const isDark = stored !== 'light';
        const initalTheme = isDark ? 'dark' : 'light';
        setTheme(initalTheme);
        localStorage.setItem('theme', initalTheme);
    }, []);

    useEffect(() => {
        if (mounted) localStorage.setItem('theme', theme);
    }, [theme, mounted]);

    function toggleTheme() {
        const newTheme = theme === 'light' ? 'dark' : 'light';
        if (!document.startViewTransition) {
            setTheme(newTheme);
            document.body.classList.toggle('dark', newTheme === 'dark');
            return;
        }
        document.startViewTransition(() => {
            flushSync(() => {
                setTheme(newTheme);
            });
        });
    };

    if (!mounted) return <>{ children }</>

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