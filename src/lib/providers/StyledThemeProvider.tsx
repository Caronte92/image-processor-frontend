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

export default function StyledThemeProvider({ children }: { children: React.ReactNode }) {
    const getInitialTheme = (): ThemeMode => {
        if (typeof window !== 'undefined') {
            const storedTheme = (localStorage.getItem('theme') as ThemeMode | null) ?? null;
            if (storedTheme === 'light' || storedTheme === 'dark') return storedTheme;
            const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
            return prefersDark ? 'dark' : 'light';
        }
        return 'light';
    };

    const [themeMode, setThemeMode] = useState<ThemeMode>(() => getInitialTheme());
    const [dynamicTheme, setDynamicTheme] = useState<IActiveTheme>(() => createDynamicTheme(getInitialTheme()));

    useEffect(() => {
        localStorage.setItem('theme', themeMode);
    }, [themeMode]);

    // Actualizar el tema dinámico cuando cambia el themeMode
    useEffect(() => {
        const newDynamicTheme = createDynamicTheme(themeMode);
        setDynamicTheme(newDynamicTheme);
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
