import React, { useEffect } from 'react';
import PricesSection from '../components/PricesSection';
import CostCalculatorInline from '../components/CostCalculatorInline';
import CtaBlock from '../components/CtaBlock';

export default function PricesPage({ onOpenOrderModal, onOpenCalculator }) {
  useEffect(() => {
    document.title = "Ціни та Тарифи вантажників у Львові | НІКА";
  }, []);

  return (
    <main className="pt-6 pb-16 bg-slate-950 text-slate-100 min-h-screen space-y-12">
      <PricesSection onOpenCalculator={onOpenCalculator} onOpenOrderModal={onOpenOrderModal} />
      <CostCalculatorInline onApplyCalculation={(calcSummary) => onOpenOrderModal(`Розрахунок з калькулятора: ${calcSummary}`)} />
      <CtaBlock onOpenOrderModal={onOpenOrderModal} />
    </main>
  );
}
