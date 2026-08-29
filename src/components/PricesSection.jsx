import React from 'react';
import { siteConfig } from '../config/siteConfig';
import { Calculator, Tag, ShieldCheck, Clock } from 'lucide-react';

export default function PricesSection({ onOpenCalculator, onOpenOrderModal }) {
  return (
    <section id="prices" className="py-20 bg-slate-950 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <span className="text-amber-400 font-bold text-xs uppercase tracking-widest bg-amber-500/10 border border-amber-500/20 px-3 py-1 rounded-full">
            Прозоре ціноутворення
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white font-outfit uppercase">
            Оптимальні ціни без <span className="text-gradient-amber">прихованих доплат</span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base">
            Фіксуємо вартість робіт перед початком замовлення. Жодних несподіваних націнок.
          </p>
        </div>

        {/* Tariff Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {siteConfig.pricingExamples.map((item, idx) => (
            <div
              key={idx}
              className="bg-slate-900/90 border border-slate-800 rounded-3xl p-8 flex flex-col justify-between hover:border-amber-500/50 transition-all duration-300 relative group"
            >
              <div className="space-y-6">
                <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
                  <Tag className="w-6 h-6" />
                </div>

                <div>
                  <h3 className="text-2xl font-bold text-white font-outfit">{item.title}</h3>
                  <div className="mt-3">
                    <span className="text-3xl font-black text-amber-400 font-outfit">{item.price}</span>
                  </div>
                  <p className="text-xs text-slate-400 mt-3 leading-relaxed border-t border-slate-800 pt-3">
                    {item.note}
                  </p>
                </div>

                <div className="space-y-2 text-xs text-slate-300">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-amber-400 shrink-0" />
                    <span>Погодинна або фіксована оплата</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Гарантія цілісності вантажу</span>
                  </div>
                </div>
              </div>

              {/* Button: «ОТРИМАТИ РОЗРАХУНОК» (TZ Line 70-71) */}
              <div className="pt-8">
                <button
                  onClick={onOpenCalculator}
                  className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black text-xs uppercase tracking-wider py-3.5 rounded-xl shadow-lg shadow-amber-500/20 flex items-center justify-center gap-2 transition-all hover:scale-105 active:scale-95"
                >
                  <Calculator className="w-4 h-4" />
                  {item.cta}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Pricing Guarantee Banner */}
        <div className="mt-12 bg-slate-900/60 border border-slate-800 rounded-2xl p-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center md:text-left">
            <h4 className="text-lg font-bold text-white font-outfit">Потрібен індивідуальний кошторис?</h4>
            <p className="text-xs text-slate-400">
              Опишіть ваше завдання диспетчеру або завантажте список майна — розрахуємо точну вартість за 5 хвилин.
            </p>
          </div>
          <button
            onClick={() => onOpenOrderModal('Індивідуальний кошторис')}
            className="bg-slate-800 hover:bg-slate-700 text-amber-400 border border-amber-500/30 px-6 py-3 rounded-xl font-bold text-xs uppercase tracking-wider whitespace-nowrap transition-colors"
          >
            Зв'язатися з диспетчером
          </button>
        </div>

      </div>
    </section>
  );
}
