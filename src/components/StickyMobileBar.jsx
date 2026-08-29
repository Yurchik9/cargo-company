import React from 'react';
import { siteConfig } from '../config/siteConfig';
import { Phone, Send, MessageCircle, ShoppingBag } from 'lucide-react';

export default function StickyMobileBar({ onOpenOrderModal }) {
  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-slate-950/95 border-t border-slate-800 backdrop-blur-xl p-2 px-3 shadow-2xl">
      <div className="grid grid-cols-4 gap-1.5 max-w-md mx-auto text-center">
        {/* Phone Button */}
        <a
          href={`tel:${siteConfig.phones[0].raw}`}
          className="flex flex-col items-center justify-center py-2 px-1 rounded-xl bg-slate-900 border border-slate-800 text-amber-400 active:scale-95 transition-transform"
        >
          <Phone className="w-5 h-5 mb-0.5" />
          <span className="text-[10px] font-bold tracking-tight text-slate-200">Дзвінок</span>
        </a>

        {/* Telegram Button */}
        <a
          href={siteConfig.messengers.telegram}
          target="_blank"
          rel="noreferrer"
          className="flex flex-col items-center justify-center py-2 px-1 rounded-xl bg-sky-950/40 border border-sky-800/40 text-sky-400 active:scale-95 transition-transform"
        >
          <Send className="w-5 h-5 mb-0.5" />
          <span className="text-[10px] font-bold tracking-tight text-slate-200">Telegram</span>
        </a>

        {/* Viber Button */}
        <a
          href={siteConfig.messengers.viber}
          className="flex flex-col items-center justify-center py-2 px-1 rounded-xl bg-purple-950/40 border border-purple-800/40 text-purple-400 active:scale-95 transition-transform"
        >
          <MessageCircle className="w-5 h-5 mb-0.5" />
          <span className="text-[10px] font-bold tracking-tight text-slate-200">Viber</span>
        </a>

        {/* Order Button */}
        <button
          onClick={onOpenOrderModal}
          className="flex flex-col items-center justify-center py-2 px-1 rounded-xl bg-gradient-to-b from-amber-400 to-amber-600 text-slate-950 shadow-md shadow-amber-500/20 active:scale-95 transition-transform"
        >
          <ShoppingBag className="w-5 h-5 mb-0.5 stroke-[2.5]" />
          <span className="text-[10px] font-black tracking-tight uppercase">Замовити</span>
        </button>
      </div>
    </div>
  );
}
