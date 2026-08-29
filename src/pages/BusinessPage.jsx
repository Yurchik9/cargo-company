import React, { useEffect } from 'react';
import BusinessSection from '../components/BusinessSection';
import CtaBlock from '../components/CtaBlock';

export default function BusinessPage({ onOpenOrderModal }) {
  useEffect(() => {
    document.title = "Послуги вантажників для бізнесу та складів у Львові | НІКА";
  }, []);

  return (
    <main className="pt-6 pb-16 bg-slate-950 text-slate-100 min-h-screen space-y-12">
      <BusinessSection onOpenOrderModal={onOpenOrderModal} />
      <CtaBlock onOpenOrderModal={onOpenOrderModal} />
    </main>
  );
}
