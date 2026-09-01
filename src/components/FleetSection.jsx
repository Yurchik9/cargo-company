import React from 'react';
import { siteConfig } from '../config/siteConfig';
import { Truck, CheckCircle2, Weight, Box, Ruler, Clock, MapPin, DollarSign } from 'lucide-react';

export default function FleetSection({ onOpenOrderModal }) {
  return (
    <section id="fleet" className="py-20 bg-slate-950 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <span className="text-amber-400 font-bold text-xs uppercase tracking-widest bg-amber-500/10 border border-amber-500/20 px-3.5 py-1.5 rounded-full flex items-center gap-1.5 w-fit mx-auto">
            <Truck className="w-3.5 h-3.5" /> Власний вантажний автопарк
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white font-outfit uppercase">
            ВАНТАЖНИЙ ТРАНСПОРТ <span className="text-gradient-amber">У ЛЬВОВІ</span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base">
            Офіційні тарифи на вантажні мікроавтобуси та авто з гідробортом по Львову та області.
          </p>
        </div>

        {/* Fleet Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {siteConfig.fleet.map((vehicle) => (
            <div
              key={vehicle.id}
              className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-7 flex flex-col justify-between hover:border-amber-500/50 transition-all duration-300 relative group shadow-xl hover:-translate-y-1"
            >
              <div className="space-y-5">
                
                {/* Top Badge & Rate Header */}
                <div className="flex items-center justify-between gap-2">
                  <span className="bg-amber-500/20 text-amber-400 font-extrabold text-xs px-3 py-1 rounded-full border border-amber-500/30">
                    {vehicle.badge}
                  </span>
                  <span className="text-amber-400 font-black text-sm font-outfit bg-slate-950 px-3 py-1 rounded-xl border border-slate-800">
                    {vehicle.hourlyRate}
                  </span>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-white font-outfit group-hover:text-amber-400 transition-colors">
                    {vehicle.name}
                  </h3>
                  <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                    {vehicle.description}
                  </p>
                </div>

                {/* Characteristics Grid */}
                <div className="grid grid-cols-2 gap-2.5 pt-2">
                  <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-800/80">
                    <span className="text-[10px] text-slate-500 uppercase font-semibold flex items-center gap-1">
                      <Weight className="w-3.5 h-3.5 text-amber-400" /> Вантажопідйомність
                    </span>
                    <span className="text-xs font-extrabold text-white mt-0.5 block">{vehicle.payload}</span>
                  </div>

                  <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-800/80">
                    <span className="text-[10px] text-slate-500 uppercase font-semibold flex items-center gap-1">
                      <Box className="w-3.5 h-3.5 text-amber-400" /> Об'єм кузова
                    </span>
                    <span className="text-xs font-extrabold text-white mt-0.5 block">{vehicle.volume}</span>
                  </div>

                  <div className="col-span-2 bg-slate-950 p-2.5 rounded-xl border border-slate-800/80">
                    <span className="text-[10px] text-slate-500 uppercase font-semibold flex items-center gap-1">
                      <Ruler className="w-3.5 h-3.5 text-amber-400" /> Габарити кузова
                    </span>
                    <span className="text-xs font-bold text-slate-300 mt-0.5 block">{vehicle.dimensions}</span>
                  </div>
                </div>

                {/* Detailed Tariff Box */}
                <div className="bg-slate-950/80 p-3 rounded-2xl border border-slate-800 space-y-1.5 text-xs text-slate-300">
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="text-slate-400 flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-amber-400" /> Мінімальне замовлення:
                    </span>
                    <span className="font-bold text-white">{vehicle.minOrder}</span>
                  </div>

                  <div className="flex items-center justify-between text-[11px]">
                    <span className="text-slate-400 flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-sky-400" /> Додаткова точка:
                    </span>
                    <span className="font-bold text-sky-300">{vehicle.extraPointFee}</span>
                  </div>

                  <div className="flex items-center justify-between text-[11px]">
                    <span className="text-slate-400 flex items-center gap-1">
                      <DollarSign className="w-3.5 h-3.5 text-emerald-400" /> Понад 10 км (область):
                    </span>
                    <span className="font-bold text-emerald-400">{vehicle.perKmFee}</span>
                  </div>
                </div>

              </div>

              {/* Action Button */}
              <div className="pt-5 mt-4 border-t border-slate-800">
                <button
                  onClick={() => onOpenOrderModal(vehicle.name)}
                  className="w-full bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs uppercase tracking-wider py-3 rounded-xl shadow-lg shadow-amber-500/20 active:scale-95 transition-all"
                >
                  ЗАМОВИТИ АВТОМОБІЛЬ
                </button>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
