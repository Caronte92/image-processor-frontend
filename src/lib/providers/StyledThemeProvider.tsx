'use client';

import { ThemeProvider, useTheme } from 'styled-components';
import { IActiveTheme, createDynamicTheme } from '@/theme';
import { useState, useEffect, useCallback, createContext, useContext } from 'react';

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
        toggleTheme
    };
};

export default function StyledThemeProvider({ children }: { children: React.ReactNode }) {
    const [themeMode, setThemeMode] = useState<ThemeMode>('light');
    const [dynamicTheme, setDynamicTheme] = useState<IActiveTheme>(() => 
        createDynamicTheme('light')
    );

    useEffect(() => {
        const storedTheme = localStorage.getItem('theme') as ThemeMode | null;
        if (storedTheme) {
            setThemeMode(storedTheme);
            setDynamicTheme(createDynamicTheme(storedTheme));
        } else {
            const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
            const initialTheme = prefersDark ? 'dark' : 'light';
            setThemeMode(initialTheme);
            setDynamicTheme(createDynamicTheme(initialTheme));
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('theme', themeMode);
    }, [themeMode]);

    // Actualizar el tema dinámico cuando cambia el themeMode
    useEffect(() => {
        const newDynamicTheme = createDynamicTheme(themeMode);
        setDynamicTheme(newDynamicTheme);
    }, [themeMode]);

    const toggleTheme = useCallback(() => {
        setThemeMode((prev) => (prev === 'light' ? 'dark' : 'light'));
    }, [themeMode]);

    return (
        <ThemeToggleContext.Provider value={{ themeMode, toggleTheme }}>
            <ThemeProvider theme={dynamicTheme}>{children}</ThemeProvider>
        </ThemeToggleContext.Provider>
    );
}