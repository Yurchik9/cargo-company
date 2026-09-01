import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import HeroSection from '../components/HeroSection';
import { siteConfig } from '../config/siteConfig';
import { ArrowRight, ShoppingBag } from 'lucide-react';
import WhyUsSection from '../components/WhyUsSection';
import QuickOrderSection from '../components/QuickOrderSection';
import CtaBlock from '../components/CtaBlock';

export default function HomePage({ onOpenOrderModal, onOpenCalculator }) {
  useEffect(() => {
    document.title = "SMART MOVING - Вантажники та Вантажні Перевезення у Львові 24/7";
  }, []);

  return (
    <main className="space-y-0">
      {/* 1. Main Hero Section */}
      <HeroSection onOpenOrderModal={onOpenOrderModal} onOpenCalculator={onOpenCalculator} />

      {/* 2. Popular Services Preview */}
      <section className="py-16 bg-slate-950">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
            <div>
              <span className="text-amber-400 font-bold text-xs uppercase tracking-widest bg-amber-500/10 border border-amber-500/20 px-3 py-1 rounded-full">
                Наші послуги
              </span>
              <h2 className="text-3xl font-black text-white font-outfit uppercase mt-2">
                ПОСЛУГИ ВАНТАЖНИКІВ <span className="text-gradient-amber">У ЛЬВОВІ</span>
              </h2>
            </div>

            <Link
              to="/services"
              className="inline-flex items-center gap-2 text-xs font-bold text-amber-400 hover:text-amber-300 bg-amber-500/10 border border-amber-500/30 px-4 py-2.5 rounded-xl transition-colors w-fit"
            >
              Переглянути всі 12 послуг <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {siteConfig.services.slice(0, 6).map((service) => (
              <div
                key={service.id}
                className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 flex flex-col justify-between hover:border-amber-500/40 transition-all group shadow-lg"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-bold text-white font-outfit group-hover:text-amber-400 transition-colors">
                      {service.title}
                    </h3>
                    <span className="text-[11px] font-bold text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
                      {service.price}
                    </span>
                  </div>

                  <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                    {service.shortDesc}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-slate-800/80 flex items-center justify-between">
                  <Link
                    to={`/services/${service.id}`}
                    className="text-xs text-slate-400 hover:text-white font-semibold flex items-center gap-1"
                  >
                    Детальніше <ArrowRight className="w-3.5 h-3.5" />
                  </Link>

                  <button
                    onClick={() => onOpenOrderModal(service.title)}
                    className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold text-[11px] uppercase tracking-wider px-3.5 py-2 rounded-lg transition-transform active:scale-95 flex items-center gap-1"
                  >
                    <ShoppingBag className="w-3.5 h-3.5 stroke-[2.5]" />
                    ЗАМОВИТИ
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Why Choose Us */}
      <WhyUsSection />

      {/* 4. Quick Order Form */}
      <QuickOrderSection />

      {/* 5. Bottom CTA */}
      <CtaBlock onOpenOrderModal={onOpenOrderModal} />
    </main>
  );
}
