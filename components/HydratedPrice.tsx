"use client";

import { useCurrency } from "@/contexts/CurrencyContext";
import { useEffect, useState } from "react";

interface HydratedPriceProps {
    price: number;
    className?: string;
    style?: React.CSSProperties;
}

export default function HydratedPrice({ price, className, style }: HydratedPriceProps) {
    const { formatPrice } = useCurrency();
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    // Don't render anything during SSR to prevent hydration mismatch
    if (!isClient) {
        return null;
    }

    return (
        <span className={className} style={style}>
            {formatPrice(price)}
        </span>
    );
}