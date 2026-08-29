import React, { useEffect } from 'react';
import FleetSection from '../components/FleetSection';
import CtaBlock from '../components/CtaBlock';

export default function FleetPage({ onOpenOrderModal }) {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "Вантажний транспорт у Львові | Авто з гідробортом та рокдою | НІКА";
  }, []);

  return (
    <main className="pt-8 pb-16 bg-slate-950 text-slate-100 min-h-screen space-y-12">
      <FleetSection onOpenOrderModal={onOpenOrderModal} />
      <CtaBlock onOpenOrderModal={onOpenOrderModal} />
    </main>
  );
}
