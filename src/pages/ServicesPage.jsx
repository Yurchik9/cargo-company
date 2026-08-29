import React, { useEffect } from 'react';
import ServicesGrid from '../components/ServicesGrid';
import CtaBlock from '../components/CtaBlock';

export default function ServicesPage({ onOpenOrderModal }) {
  useEffect(() => {
    document.title = "Послуги вантажників та перевезень у Львові | НІКА";
  }, []);

  return (
    <main className="pt-6 pb-16 bg-slate-950 text-slate-100 min-h-screen space-y-12">
      <ServicesGrid onOpenOrderModal={onOpenOrderModal} />
      <CtaBlock onOpenOrderModal={onOpenOrderModal} />
    </main>
  );
}
