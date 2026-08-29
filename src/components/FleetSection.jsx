import React from 'react';
import { siteConfig } from '../config/siteConfig';
import { Truck, CheckCircle2, ShieldCheck, Box, Weight, Ruler } from 'lucide-react';
import truckLoadingImg from '../assets/images/truck_loading.png';

export default function FleetSection({ onOpenOrderModal }) {
  return (
    <section id="fleet" className="py-20 bg-slate-950 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <span className="text-amber-400 font-bold text-xs uppercase tracking-widest bg-amber-500/10 border border-amber-500/20 px-3 py-1 rounded-full flex items-center gap-1.5 w-fit mx-auto">
            <Truck className="w-3.5 h-3.5" /> Власний автопарк
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white font-outfit uppercase">
            ВАНТАЖНИЙ ТРАНСПОРТ <span className="text-gradient-amber">У ЛЬВОВІ</span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base">
            Чисті та обладнані автомобілі від 1.5 до 5 тонн з гідробортом, рокдою та ременями фіксації.
          </p>
        </div>

        {/* Fleet Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {siteConfig.fleet.map((vehicle) => (
            <div
              key={vehicle.id}
              className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 flex flex-col justify-between hover:border-amber-500/50 transition-all duration-300 relative group"
            >
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <span className="bg-amber-500/20 text-amber-400 font-bold text-xs px-3 py-1 rounded-full border border-amber-500/30">
                    {vehicle.badge}
                  </span>
                  {vehicle.hydroboard && (
                    <span className="bg-emerald-500/20 text-emerald-400 font-bold text-[10px] px-2.5 py-0.5 rounded border border-emerald-500/30">
                      + Гідроборт та Рокла
                    </span>
                  )}
                </div>

                <div>
                  <h3 className="text-2xl font-bold text-white font-outfit group-hover:text-amber-400 transition-colors">
                    {vehicle.name}
                  </h3>
                  <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                    {vehicle.description}
                  </p>
                </div>

                {/* Characteristics Specification Grid */}
                <div className="grid grid-cols-2 gap-3 pt-4 border-t border-slate-800">
                  <div className="bg-slate-950 p-3 rounded-xl border border-slate-800/80">
                    <span className="text-[10px] text-slate-500 uppercase font-semibold flex items-center gap-1">
                      <Weight className="w-3.5 h-3.5 text-amber-400" /> Вантажопідйомність
                    </span>
                    <span className="text-sm font-extrabold text-white mt-1 block">{vehicle.payload}</span>
                  </div>

                  <div className="bg-slate-950 p-3 rounded-xl border border-slate-800/80">
                    <span className="text-[10px] text-slate-500 uppercase font-semibold flex items-center gap-1">
                      <Box className="w-3.5 h-3.5 text-amber-400" /> Об'єм кузова
                    </span>
                    <span className="text-sm font-extrabold text-white mt-1 block">{vehicle.volume}</span>
                  </div>

                  <div className="col-span-2 bg-slate-950 p-3 rounded-xl border border-slate-800/80">
                    <span className="text-[10px] text-slate-500 uppercase font-semibold flex items-center gap-1">
                      <Ruler className="w-3.5 h-3.5 text-amber-400" /> Габарити кузова
                    </span>
                    <span className="text-xs font-bold text-slate-300 mt-1 block">{vehicle.dimensions}</span>
                  </div>
                </div>

                {/* Features Badges */}
                <div className="flex flex-wrap gap-2 text-[11px] text-slate-300 pt-1">
                  <span className="bg-slate-950 px-2.5 py-1 rounded-lg border border-slate-800 flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-amber-400" /> Чистий кузов
                  </span>
                  <span className="bg-slate-950 px-2.5 py-1 rounded-lg border border-slate-800 flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-amber-400" /> Кріпильні ремені
                  </span>
                  {vehicle.hydroboard && (
                    <span className="bg-slate-950 px-2.5 py-1 rounded-lg border border-slate-800 flex items-center gap-1 text-emerald-400">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Гідроборт 1т
                    </span>
                  )}
                </div>
              </div>

              <div className="pt-6 mt-4 border-t border-slate-800">
                <button
                  onClick={() => onOpenOrderModal(`Замовлення авто: ${vehicle.name}`)}
                  className="w-full bg-slate-800 hover:bg-amber-500 hover:text-slate-950 text-white font-bold text-xs uppercase tracking-wider py-3 rounded-xl border border-slate-700 hover:border-amber-500 transition-all"
                >
                  ЗАМОВИТИ ЦЕЙ АВТОМОБІЛЬ
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
