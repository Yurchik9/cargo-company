import React, { useEffect } from 'react';
import PortfolioSection from '../components/PortfolioSection';
import CtaBlock from '../components/CtaBlock';

export default function PortfolioPage({ onOpenOrderModal }) {
  useEffect(() => {
    document.title = "Наші роботи — Фотозвіт вантажників у Львові | НІКА";
  }, []);

  return (
    <main className="pt-6 pb-16 bg-slate-950 text-slate-100 min-h-screen space-y-12">
      <PortfolioSection />
      <CtaBlock onOpenOrderModal={onOpenOrderModal} />
    </main>
  );
}
