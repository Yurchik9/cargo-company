import React from 'react';
import { Link } from 'react-router-dom';
import { siteConfig } from '../config/siteConfig';
import {
  Users,
  Truck,
  Home,
  Building2,
  Boxes,
  HardHat,
  Weight,
  ArrowUpCircle,
  Cog,
  Wrench,
  Hammer,
  Trash2,
  ArrowRight,
  ShoppingBag,
  Check
} from 'lucide-react';

const iconMap = {
  Users,
  Truck,
  Home,
  Building2,
  Boxes,
  HardHat,
  Weight,
  ArrowUpCircle,
  Cog,
  Wrench,
  Hammer,
  Trash2
};

export default function ServicesGrid({ onOpenOrderModal }) {
  return (
    <section id="services" className="py-20 bg-slate-900/50 relative">
      <div className="max-w-7xl mx-auto px-4">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <span className="text-amber-400 font-bold text-xs uppercase tracking-widest bg-amber-500/10 border border-amber-500/20 px-3 py-1 rounded-full">
            Наші послуги у Львові
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white font-outfit uppercase">
            Повний спектр послуг <span className="text-gradient-amber">вантажників та авто</span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base">
            Оберіть необхідну послугу або замовте розрахунок вартості. Бригади вантажників готові до виїзду цілодобово.
          </p>
        </div>

        {/* 12 Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {siteConfig.services.map((service) => {
            const IconComponent = iconMap[service.iconName] || Users;

            return (
              <div
                key={service.id}
                className="bg-slate-950/80 border border-slate-800 rounded-2xl p-6 flex flex-col justify-between hover:border-amber-500/50 transition-all duration-300 group hover:-translate-y-1 shadow-lg hover:shadow-amber-500/10"
              >
                <div className="space-y-4">
                  {/* Top Header & Icon */}
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-slate-900 to-slate-800 border border-slate-700/80 flex items-center justify-center text-amber-400 group-hover:scale-110 group-hover:bg-amber-500 group-hover:text-slate-950 transition-all duration-300">
                      <IconComponent className="w-6 h-6 stroke-[2]" />
                    </div>
                    <span className="text-xs font-bold text-amber-400 bg-amber-500/10 px-2.5 py-1 rounded-lg border border-amber-500/20">
                      {service.price}
                    </span>
                  </div>

                  {/* Title & Short Description */}
                  <div>
                    <h3 className="text-xl font-bold text-white font-outfit group-hover:text-amber-400 transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                      {service.shortDesc}
                    </p>
                  </div>

                  {/* Features checklist */}
                  <ul className="space-y-1.5 pt-2 border-t border-slate-900">
                    {service.features.map((feat, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-xs text-slate-300">
                        <Check className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Bottom Action Button - «ЗАМОВИТИ» (TZ Line 42) */}
                <div className="pt-6 mt-4 border-t border-slate-900 flex items-center justify-between gap-3">
                  <Link
                    to={`/services/${service.id}`}
                    className="text-xs font-semibold text-slate-400 hover:text-white flex items-center gap-1 transition-colors"
                  >
                    Детальніше <ArrowRight className="w-3.5 h-3.5" />
                  </Link>

                  <button
                    onClick={() => onOpenOrderModal(service.title)}
                    className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold text-xs uppercase tracking-wider px-4 py-2.5 rounded-xl shadow-md shadow-amber-500/15 flex items-center gap-1.5 transition-all hover:scale-105 active:scale-95"
                  >
                    <ShoppingBag className="w-4 h-4 stroke-[2.5]" />
                    ЗАМОВИТИ
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
