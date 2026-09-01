import React from 'react';
import { siteConfig } from '../config/siteConfig';
import { Phone, Calculator, ShoppingBag, Clock, Award, CheckCircle } from 'lucide-react';
import smartMovingBannerImg from '../assets/images/smart_moving_logo.jpg';

export default function HeroSection({ onOpenOrderModal, onOpenCalculator }) {
  const handleHeroOrderClick = () => {
    const formElement = document.getElementById('order-form');
    if (formElement) {
      formElement.scrollIntoView({ behavior: 'smooth' });
    } else {
      onOpenOrderModal();
    }
  };

  return (
    <section className="relative pt-8 pb-16 lg:py-24 overflow-hidden bg-slate-950">
      {/* Background Gradients & Glow Effects */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-amber-500/10 blur-[140px] pointer-events-none rounded-full" />
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/5 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Hero Content */}
          <div className="lg:col-span-7 space-y-6 text-left">
            {/* Top Badge */}
            <div className="inline-flex items-center gap-2 bg-amber-500/10 border border-amber-500/30 px-3.5 py-1.5 rounded-full text-xs font-bold text-amber-400">
              <Clock className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
              <span>ПРАЦЮЄМО 24/7 • ВИЇЗД ПО ЛЬВОВУ ЗА 30 ХВИЛИН</span>
            </div>

            {/* Main Title */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white font-outfit uppercase leading-[1.1]">
              Вантажники та вантажні перевезення <span className="text-gradient-amber">у Львові</span>
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-slate-300 font-medium leading-relaxed max-w-2xl">
              {siteConfig.tagline}
            </p>

            {/* Feature Bullets Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 pt-2">
              {siteConfig.badges.map((badge, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-2 bg-slate-900/80 border border-slate-800/80 px-3 py-2 rounded-xl text-xs text-slate-200 font-semibold"
                >
                  <CheckCircle className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                  <span>{badge}</span>
                </div>
              ))}
            </div>

            <p className="text-xs text-slate-400 font-medium italic pt-1">
              • Працюємо з квартирами, офісами, складами, підприємствами та важким обладнанням.
            </p>

            {/* 3 Primary Action Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-4">
              <button
                type="button"
                onClick={handleHeroOrderClick}
                className="flex items-center justify-center gap-2.5 bg-gradient-to-r from-amber-500 via-amber-400 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black text-sm uppercase tracking-wider py-4 px-6 rounded-xl shadow-xl shadow-amber-500/25 hover:shadow-amber-500/40 transition-all hover:scale-105 active:scale-95 cursor-pointer"
              >
                <ShoppingBag className="w-5 h-5 stroke-[2.5]" />
                ЗАМОВИТИ ВАНТАЖНИКІВ
              </button>

              <button
                type="button"
                onClick={() => onOpenCalculator()}
                className="flex items-center justify-center gap-2 bg-slate-900 hover:bg-slate-800 border border-amber-500/40 text-amber-400 font-bold text-sm uppercase tracking-wider py-4 px-6 rounded-xl shadow-lg hover:border-amber-400 transition-all hover:scale-105 active:scale-95 cursor-pointer"
              >
                <Calculator className="w-5 h-5" />
                РОЗРАХУВАТИ ВАРТІСТЬ
              </button>

              <a
                href={`tel:${siteConfig.phones[0].raw}`}
                className="flex items-center justify-center gap-2 bg-slate-900 hover:bg-slate-800 border border-slate-700 text-white font-bold text-sm uppercase tracking-wider py-4 px-6 rounded-xl transition-all hover:scale-105 active:scale-95"
              >
                <Phone className="w-5 h-5 text-amber-400" />
                ЗАТЕЛЕФОНУВАТИ
              </a>
            </div>

            {/* Trust Counters */}
            <div className="pt-6 border-t border-slate-800/80 grid grid-cols-3 gap-4 text-center sm:text-left">
              <div>
                <span className="block text-2xl font-black text-white font-outfit">8+ Років</span>
                <span className="text-xs text-slate-400">Досвіду у Львові</span>
              </div>
              <div>
                <span className="block text-2xl font-black text-amber-400 font-outfit">24/7</span>
                <span className="text-xs text-slate-400">Без вихідних</span>
              </div>
              <div>
                <span className="block text-2xl font-black text-emerald-400 font-outfit">30 хв</span>
                <span className="text-xs text-slate-400">Середній виїзд</span>
              </div>
            </div>
          </div>

          {/* Right Hero Visual Poster Image */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-3xl overflow-hidden border border-amber-500/30 shadow-2xl shadow-amber-500/10 group">
              <img
                src={smartMovingBannerImg}
                alt="SMART MOVING Львів - Вантажні перевезення"
                className="w-full h-[480px] object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />

              {/* Float Overlay Badge */}
              <div className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl glass-card border border-amber-500/30 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5 font-outfit">
                    <Award className="w-4 h-4" /> SMART MOVING ЛЬВІВ
                  </span>
                  <span className="text-[10px] bg-emerald-500/20 text-emerald-400 font-bold px-2 py-0.5 rounded border border-emerald-500/30">
                    24/7 Без вихідних
                  </span>
                </div>
                <p className="text-sm font-bold text-white">
                  Професійні квартирні переїзди, вантажники та збірка меблів по Львову та області.
                </p>
                <p className="text-xs text-slate-300">
                  Телефонуйте зараз: <strong className="text-amber-400">{siteConfig.phones[0].display}</strong>
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
