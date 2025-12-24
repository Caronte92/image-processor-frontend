'use client';

import React, { createContext, useContext } from 'react';

type SubmenuContextValue = {
    items: string[];
    selected: string;
    setSelected: (value: string) => void;
};

const SubmenuContext = createContext<SubmenuContextValue | undefined>(undefined);

export function SubmenuProvider({
    items,
    selected,
    setSelected,
    children,
}: {
    items: string[];
    selected: string;
    setSelected: (value: string) => void;
    children: React.ReactNode;
}) {
    return <SubmenuContext.Provider value={{ items, selected, setSelected }}>{children}</SubmenuContext.Provider>;
}

export function useSubmenu() {
    const ctx = useContext(SubmenuContext);
    if (!ctx) {
        throw new Error('useSubmenu must be used within a SubmenuProvider');
    }
    return ctx;
}
