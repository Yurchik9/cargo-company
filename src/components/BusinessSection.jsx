import React from 'react';
import { siteConfig } from '../config/siteConfig';
import { Building2, CheckCircle2, FileText, Users, ShieldCheck, Phone } from 'lucide-react';

export default function BusinessSection({ onOpenOrderModal }) {
  return (
    <section id="business" className="py-20 bg-slate-900/40 relative border-y border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4">
        <div className="bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 border border-slate-800 rounded-3xl p-8 sm:p-12 relative overflow-hidden shadow-2xl">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            <div className="lg:col-span-7 space-y-6">
              <span className="text-amber-400 font-bold text-xs uppercase tracking-widest bg-amber-500/10 border border-amber-500/20 px-3 py-1 rounded-full flex items-center gap-1.5 w-fit">
                <Building2 className="w-3.5 h-3.5" /> Б2Б & Корпоративні клієнти
              </span>

              <h2 className="text-3xl sm:text-4xl font-black text-white font-outfit uppercase">
                Потрібні вантажники на <span className="text-gradient-amber">постійну основу?</span>
              </h2>

              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                Надаємо постійні та разові бригади вантажників і підсобників для бізнесу. Працюємо з будь-якими обсягами та графіком 24/7.
              </p>

              <div className="space-y-3">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Працюємо з:</p>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                  {siteConfig.b2bClients.map((client, idx) => (
                    <div
                      key={idx}
                      className="bg-slate-950/80 border border-slate-800 p-2.5 rounded-xl text-xs font-semibold text-slate-200 flex items-center gap-2"
                    >
                      <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                      <span>{client}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 flex flex-wrap items-center gap-4">
                <button
                  onClick={() => onOpenOrderModal('Договір для бізнесу')}
                  className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs uppercase tracking-wider py-3.5 px-6 rounded-xl shadow-lg shadow-amber-500/20 transition-all hover:scale-105 active:scale-95"
                >
                  Отримати КП для бізнесу
                </button>

                <a
                  href={`tel:${siteConfig.phones[0].raw}`}
                  className="flex items-center gap-2 text-xs font-bold text-white hover:text-amber-400 transition-colors"
                >
                  <Phone className="w-4 h-4 text-amber-400" />
                  Пряма лінія: {siteConfig.phones[0].display}
                </a>
              </div>
            </div>

            {/* Right B2B Guarantee Box */}
            <div className="lg:col-span-5 bg-slate-950 border border-slate-800 rounded-2xl p-6 space-y-4">
              <h3 className="text-lg font-bold text-white font-outfit flex items-center gap-2">
                <FileText className="w-5 h-5 text-amber-400" /> Переваги для компаній:
              </h3>
              
              <ul className="space-y-3 text-xs text-slate-300">
                <li className="flex items-start gap-2.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span><strong>Офіційні договори</strong> та повний пакет закриваючих документів.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Users className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <span><strong>Оперативна заміна працівників</strong> за першою вимогою протягом 1 години.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <span><strong>Гнучка оплата</strong> — безготівковий розрахунок, відстрочка для постійних партнерів.</span>
                </li>
              </ul>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
