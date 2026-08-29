import React from 'react';
import { siteConfig } from '../config/siteConfig';
import { ShieldCheck, Award, Clock, Truck, MapPin, Zap, Calculator, CheckCircle2 } from 'lucide-react';

const icons = [Award, ShieldCheck, Zap, Truck, MapPin, Clock, Calculator, CheckCircle2];

export default function WhyUsSection() {
  return (
    <section className="py-20 bg-slate-950 relative">
      <div className="max-w-7xl mx-auto px-4">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <span className="text-amber-400 font-bold text-xs uppercase tracking-widest bg-amber-500/10 border border-amber-500/20 px-3 py-1 rounded-full">
            Наші переваги
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white font-outfit uppercase">
            ЧОМУ КЛІЄНТИ ОБИРАЮТЬ <span className="text-gradient-amber">СЛУЖБУ НІКА</span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base">
            За 8 років роботи ми зарекомендували себе як один з найідеальніших сервісів вантажників у Львові.
          </p>
        </div>

        {/* 8 Advantages Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {siteConfig.whyChooseUs.map((item, idx) => {
            const IconComp = icons[idx % icons.length];
            return (
              <div
                key={idx}
                className="bg-slate-900/80 border border-slate-800/90 rounded-2xl p-6 hover:border-amber-500/40 transition-all duration-300 group hover:-translate-y-1 space-y-3"
              >
                <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 group-hover:bg-amber-500 group-hover:text-slate-950 transition-colors">
                  <IconComp className="w-6 h-6 stroke-[2]" />
                </div>

                <h3 className="text-lg font-bold text-white font-outfit group-hover:text-amber-400 transition-colors">
                  {item.title}
                </h3>

                <p className="text-xs text-slate-400 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
