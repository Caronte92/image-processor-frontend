'use client';

import { IActiveTheme, createDynamicTheme } from '@/theme';
import { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { ThemeProvider, useTheme } from 'styled-components';

type ThemeMode = 'light' | 'dark';

interface IThemeToggleContext {
    themeMode: ThemeMode;
    toggleTheme: () => void;
}

const ThemeToggleContext = createContext<IThemeToggleContext>({
    themeMode: 'light',
    toggleTheme: () => {},
});

export const useThemeToggle = () => useContext(ThemeToggleContext);

export const useAppTheme = () => {
    const theme = useTheme();
    const { toggleTheme } = useThemeToggle();

    return {
        ...theme,
        toggleTheme,
    };
};

export default function StyledThemeProvider({ children, initialThemeMode }: { children: React.ReactNode; initialThemeMode: ThemeMode }) {
    const [themeMode, setThemeMode] = useState<ThemeMode>(initialThemeMode);
    const [dynamicTheme, setDynamicTheme] = useState<IActiveTheme>(() => createDynamicTheme(initialThemeMode));

    useEffect(() => {
        const storedTheme = (localStorage.getItem('theme') as ThemeMode | null) ?? null;
        let next: ThemeMode | null = null;
        if (storedTheme === 'light' || storedTheme === 'dark') {
            next = storedTheme;
        } else if (window.matchMedia) {
            next = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
        }
        if (next && next !== themeMode) {
            setThemeMode(next);
        }
    }, []);

    useEffect(() => {
        try {
            localStorage.setItem('theme', themeMode);
        } catch {
            void 0;
        }
        try {
            document.cookie = `theme=${themeMode}; path=/; max-age=31536000; samesite=lax`;
        } catch {
            void 0;
        }
        setDynamicTheme(createDynamicTheme(themeMode));
    }, [themeMode]);

    const toggleTheme = useCallback(() => {
        setThemeMode(prev => (prev === 'light' ? 'dark' : 'light'));
    }, []);

    return (
        <ThemeToggleContext.Provider value={{ themeMode, toggleTheme }}>
            <ThemeProvider theme={dynamicTheme}>{children}</ThemeProvider>
        </ThemeToggleContext.Provider>
    );
}
