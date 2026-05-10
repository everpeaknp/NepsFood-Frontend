"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type Currency = 'USD' | 'NPR';

interface CurrencyContextType {
    currency: Currency;
    setCurrency: (currency: Currency) => void;
    formatPrice: (price: number | string | null | undefined) => string;
    isHydrated: boolean;
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

// Conversion rate: 1 USD = 132 NPR (approximate)
const USD_TO_NPR = 132;

export function CurrencyProvider({ children }: { children: ReactNode }) {
    const [currency, setCurrency] = useState<Currency>('NPR');
    const [isHydrated, setIsHydrated] = useState(false);

    useEffect(() => {
        // Load saved currency preference from localStorage after hydration
        const savedCurrency = localStorage.getItem('currency') as Currency;
        if (savedCurrency && (savedCurrency === 'USD' || savedCurrency === 'NPR')) {
            setCurrency(savedCurrency);
        }
        setIsHydrated(true);
    }, []);

    useEffect(() => {
        // Save currency preference to localStorage
        if (isHydrated) {
            localStorage.setItem('currency', currency);
        }
    }, [currency, isHydrated]);

    const formatPrice = (price: number | string | null | undefined): string => {
        // Prices from backend are already in NPR, so just format them
        // No conversion needed
        const numPrice = typeof price === 'number' ? price : parseFloat(String(price || 0));
        
        if (isNaN(numPrice)) {
            return 'NPR 0';
        }
        
        return `NPR ${numPrice.toFixed(0)}`;
    };

    return (
        <CurrencyContext.Provider value={{ currency, setCurrency, formatPrice, isHydrated }}>
            {children}
        </CurrencyContext.Provider>
    );
}

export function useCurrency() {
    const context = useContext(CurrencyContext);
    if (context === undefined) {
        throw new Error('useCurrency must be used within a CurrencyProvider');
    }
    return context;
}