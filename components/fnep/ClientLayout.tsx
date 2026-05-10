'use client';

import { ReactNode } from 'react';
import { ReactLenis } from 'lenis/react';
import LoadingScreen from './LoadingScreen';

interface ClientLayoutProps {
  children: ReactNode;
}

export default function ClientLayout({ children }: ClientLayoutProps) {
  return (
    <ReactLenis root>
      <LoadingScreen />
      <div className="min-h-screen bg-white selection:bg-neps-blue selection:text-white">
        {children}
      </div>
    </ReactLenis>
  );
}
