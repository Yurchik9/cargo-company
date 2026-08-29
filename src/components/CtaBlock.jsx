import React from 'react';
import { siteConfig } from '../config/siteConfig';
import { ShoppingBag, Send, MessageCircle, Phone, Sparkles } from 'lucide-react';

export default function CtaBlock({ onOpenOrderModal }) {
  return (
    <section className="py-16 bg-gradient-to-br from-amber-500/20 via-slate-950 to-slate-950 border-t border-amber-500/20 relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 text-center space-y-8 relative z-10">
        
        <div className="space-y-3 max-w-2xl mx-auto">
          <span className="inline-flex items-center gap-1.5 text-amber-400 font-bold text-xs uppercase tracking-widest bg-amber-500/10 border border-amber-500/30 px-3.5 py-1 rounded-full">
            <Sparkles className="w-3.5 h-3.5" /> Швидка консультація та виїзд 24/7
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white font-outfit uppercase">
            ПОТРІБНІ ВАНТАЖНИКИ?
          </h2>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Опишіть завдання — ми швидко зорієнтуємо по кількості працівників та підрахуємо точну вартість.
          </p>
        </div>

        {/* 4 Action Buttons Grid (TZ Lines 174-177) */}
        <div className="flex flex-wrap items-center justify-center gap-3 max-w-3xl mx-auto">
          {/* Order Button */}
          <button
            onClick={() => onOpenOrderModal()}
            className="flex items-center justify-center gap-2 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black text-sm uppercase tracking-wider py-4 px-6 rounded-xl shadow-xl shadow-amber-500/25 transition-all hover:scale-105 active:scale-95"
          >
            <ShoppingBag className="w-5 h-5 stroke-[2.5]" />
            ЗАМОВИТИ ВАНТАЖНИКІВ
          </button>

          {/* Telegram */}
          <a
            href={siteConfig.messengers.telegram}
            target="_blank"
            rel="noreferrer"
            className="flex items-center justify-center gap-2 bg-sky-600/20 hover:bg-sky-600/30 text-sky-400 border border-sky-500/40 font-bold text-sm uppercase tracking-wider py-4 px-6 rounded-xl transition-all hover:scale-105 active:scale-95"
          >
            <Send className="w-5 h-5" />
            НАПИСАТИ В TELEGRAM
          </a>

          {/* Viber */}
          <a
            href={siteConfig.messengers.viber}
            className="flex items-center justify-center gap-2 bg-purple-600/20 hover:bg-purple-600/30 text-purple-400 border border-purple-500/40 font-bold text-sm uppercase tracking-wider py-4 px-6 rounded-xl transition-all hover:scale-105 active:scale-95"
          >
            <MessageCircle className="w-5 h-5" />
            НАПИСАТИ У VIBER
          </a>

          {/* Phone */}
          <a
            href={`tel:${siteConfig.phones[0].raw}`}
            className="flex items-center justify-center gap-2 bg-slate-900 hover:bg-slate-800 border border-slate-700 text-white font-bold text-sm uppercase tracking-wider py-4 px-6 rounded-xl transition-all hover:scale-105 active:scale-95"
          >
            <Phone className="w-5 h-5 text-amber-400" />
            ЗАТЕЛЕФОНУВАТИ
          </a>
        </div>

      </div>
    </section>
  );
}
