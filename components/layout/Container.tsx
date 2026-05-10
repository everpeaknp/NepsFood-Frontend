import { ReactNode } from 'react';

interface ContainerProps {
    children: ReactNode;
    className?: string;
    as?: 'div' | 'section' | 'header' | 'footer' | 'nav';
}

/**
 * Global Container Component
 * Provides consistent horizontal spacing across all screen sizes
 * Matches the Header spacing system for perfect alignment
 */
export default function Container({
    children,
    className = '',
    as: Component = 'div'
}: ContainerProps) {
    return (
        <Component className={`w-full px-4 sm:px-6 lg:px-10 xl:px-16 2xl:px-24 ${className}`}>
            {children}
        </Component>
    );
}
