"use client";

import { useCurrency } from "@/contexts/CurrencyContext";

interface ClientPriceProps {
    price: number;
    className?: string;
    style?: React.CSSProperties;
}

export default function ClientPrice({ price, className, style }: ClientPriceProps) {
    const { formatPrice } = useCurrency();

    return (
        <span className={className} style={style}>
            {formatPrice(price)}
        </span>
    );
}