import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { siteConfig } from '../config/siteConfig';
import CtaBlock from '../components/CtaBlock';
import { CheckCircle2, ArrowLeft, Phone, Clock, ShieldCheck, ShoppingBag, Calculator } from 'lucide-react';
import loadersWorkingImg from '../assets/images/loaders_working.png';

export default function ServiceDetail({ onOpenOrderModal, onOpenCalculator }) {
  const { serviceId } = useParams();
  const service = siteConfig.services.find((s) => s.id === serviceId) || siteConfig.services[0];

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = `${service.title} у Львові — Ціна від ${service.price} | НІКА`;
  }, [service]);

  return (
    <main className="pt-8 pb-16 bg-slate-950 text-slate-100 min-h-screen space-y-12">
      <div className="max-w-7xl mx-auto px-4 space-y-8">
        
        {/* Back Link */}
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-xs font-bold text-slate-400 hover:text-amber-400 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> На головну сторінку
        </Link>

        {/* Top Banner */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 sm:p-12 relative overflow-hidden shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-7 space-y-6">
              <span className="text-amber-400 font-bold text-xs uppercase tracking-wider bg-amber-500/10 border border-amber-500/20 px-3 py-1 rounded-full">
                Послуга у Львові 24/7
              </span>

              <h1 className="text-3xl sm:text-5xl font-black text-white font-outfit uppercase">
                {service.title} <span className="text-gradient-amber">у Львові</span>
              </h1>

              <p className="text-slate-300 text-base leading-relaxed">
                {service.shortDesc} Повний спектр робіт з гарантією дбайливого ставлення до майна та дотриманням термінів.
              </p>

              <div className="bg-slate-950/80 p-4 rounded-2xl border border-slate-800 flex items-center justify-between flex-wrap gap-4">
                <div>
                  <span className="text-xs text-slate-400 font-medium">Вартість послуги:</span>
                  <p className="text-2xl font-black text-amber-400 font-outfit">{service.price}</p>
                  <p className="text-[11px] text-slate-400 mt-0.5">{service.minOrder}</p>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => onOpenOrderModal(service.title)}
                    className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs uppercase tracking-wider py-3 px-5 rounded-xl shadow-lg shadow-amber-500/20 active:scale-95 transition-transform"
                  >
                    Замовити послугу
                  </button>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5">
              <img
                src={loadersWorkingImg}
                alt={service.title}
                className="w-full h-80 object-cover rounded-2xl border border-slate-800 shadow-xl"
              />
            </div>

          </div>
        </div>

        {/* Detailed Info Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          <div className="lg:col-span-2 bg-slate-900/60 border border-slate-800 rounded-3xl p-8 space-y-6">
            <h2 className="text-2xl font-bold text-white font-outfit">Що входить у послугу «{service.title}»:</h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {service.features.map((feat, idx) => (
                <div key={idx} className="bg-slate-950 p-4 rounded-xl border border-slate-800 flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                  <span className="text-sm text-slate-200 font-medium">{feat}</span>
                </div>
              ))}
            </div>

            <div className="pt-4 border-t border-slate-800 space-y-3">
              <h3 className="text-lg font-bold text-white font-outfit">Як відбувається замовлення:</h3>
              <ol className="list-decimal list-inside text-xs text-slate-300 space-y-2 leading-relaxed">
                <li><strong>Дзвінок або заявка:</strong> Диспетчер уточнює обсяг робіт, наявність ліфта та необхідне авто.</li>
                <li><strong>Розрахунок вартості:</strong> Фіксуємо підсумкову ціну перед початком завантаження.</li>
                <li><strong>Оперативний виїзд:</strong> Бригада вантажників прибуває протягом 30-45 хвилин.</li>
                <li><strong>Виконання та оплата:</strong> Робота виконується дбайливо, оплата за фактом завершення.</li>
              </ol>
            </div>
          </div>

          {/* Quick Contact Card */}
          <div className="bg-gradient-to-br from-amber-500/10 to-slate-900 border border-amber-500/30 rounded-3xl p-6 space-y-6 flex flex-col justify-between">
            <div className="space-y-4">
              <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">Диспетчерська служба</span>
              <h3 className="text-xl font-bold text-white font-outfit">Потрібна термінова консультація?</h3>
              <p className="text-xs text-slate-300">
                Зателефонуйте зараз — наш черговий менеджер розрахує точну кількість працівників.
              </p>

              <div className="space-y-2 pt-2">
                {siteConfig.phones.map((p) => (
                  <a
                    key={p.raw}
                    href={`tel:${p.raw}`}
                    className="flex items-center gap-2 bg-slate-950 hover:bg-slate-900 border border-slate-800 text-white font-bold text-sm p-3 rounded-xl hover:text-amber-400 transition-colors"
                  >
                    <Phone className="w-4 h-4 text-amber-400" />
                    {p.display}
                  </a>
                ))}
              </div>
            </div>

            <button
              onClick={() => onOpenOrderModal(service.title)}
              className="w-full bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs uppercase tracking-wider py-3.5 rounded-xl shadow-lg shadow-amber-500/20 active:scale-95 transition-transform"
            >
              Оформити заявку 24/7
            </button>
          </div>

        </div>

      </div>

      <CtaBlock onOpenOrderModal={onOpenOrderModal} />
    </main>
  );
}
