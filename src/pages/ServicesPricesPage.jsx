import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { siteConfig } from '../config/siteConfig';
import CostCalculatorInline from '../components/CostCalculatorInline';
import CtaBlock from '../components/CtaBlock';
import {
  Users, Truck, Home, Building2, Boxes, HardHat, Weight, ArrowUpCircle, Cog, Wrench, Hammer, Trash2,
  ArrowRight, ShoppingBag, Check, Calculator, Tag, ShieldCheck, Clock, Filter
} from 'lucide-react';

const iconMap = {
  Users, Truck, Home, Building2, Boxes, HardHat, Weight, ArrowUpCircle, Cog, Wrench, Hammer, Trash2
};

const CATEGORIES = [
  { id: 'all', name: 'Всі послуги' },
  { id: 'moving', name: 'Квартирні та Офісні переїзди' },
  { id: 'loaders', name: 'Вантажники та Підсобники' },
  { id: 'rigging', name: 'Такелажні роботи та Обладнання' },
  { id: 'special', name: 'Спеціальні & Вивіз сміття' },
];

export default function ServicesPricesPage({ onOpenOrderModal }) {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "Послуги та Ціни вантажників у Львові | НІКА 24/7";
  }, []);

  const filterServices = (services) => {
    if (selectedCategory === 'all') return services;
    if (selectedCategory === 'moving') {
      return services.filter(s => s.id === 'apartment-moving' || s.id === 'office-moving' || s.id === 'cargo-transportation');
    }
    if (selectedCategory === 'loaders') {
      return services.filter(s => s.id === 'loaders-lviv' || s.id === 'warehouse-work' || s.id === 'handymen' || s.id === 'demolition-work');
    }
    if (selectedCategory === 'rigging') {
      return services.filter(s => s.id === 'rigging-work' || s.id === 'heavy-equipment' || s.id === 'furniture-assembly');
    }
    if (selectedCategory === 'special') {
      return services.filter(s => s.id === 'floor-lifting' || s.id === 'trash-removal');
    }
    return services;
  };

  const filteredServices = filterServices(siteConfig.services);

  const handleOrderService = (service) => {
    onOpenOrderModal(service.title);
  };

  return (
    <main className="pt-8 pb-16 bg-slate-950 text-slate-100 min-h-screen space-y-16">
      <div className="max-w-7xl mx-auto px-4 space-y-12">
        
        {/* Unified Page Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="text-amber-400 font-bold text-xs uppercase tracking-widest bg-amber-500/10 border border-amber-500/20 px-3 py-1 rounded-full inline-flex items-center gap-1.5">
            <Tag className="w-3.5 h-3.5" /> Прозорі Тарифи та Послуги 24/7
          </span>
          <h1 className="text-3xl sm:text-5xl font-black text-white font-outfit uppercase">
            ПОСЛУГИ ТА ЦІНИ <span className="text-gradient-amber">У ЛЬВОВІ</span>
          </h1>
          <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
            Повний каталог послуг вантажників, перевезень та такелажних робіт із прозорим розрахунком вартості без прихованих платежів.
          </p>
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 max-w-4xl mx-auto">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold border transition-all ${
                selectedCategory === cat.id
                  ? 'bg-amber-500 text-slate-950 border-amber-400 shadow-lg shadow-amber-500/20 scale-105'
                  : 'bg-slate-900/80 text-slate-300 border-slate-800 hover:border-slate-700 hover:text-white'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Unified Service & Pricing Grid Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredServices.map((service) => {
            const IconComponent = iconMap[service.iconName] || Users;

            return (
              <div
                key={service.id}
                className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-7 flex flex-col justify-between hover:border-amber-500/50 transition-all duration-300 group shadow-xl hover:-translate-y-1 relative"
              >
                <div className="space-y-4">
                  {/* Top Badge & Icon */}
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-slate-950 to-slate-900 border border-slate-800 flex items-center justify-center text-amber-400 group-hover:scale-110 group-hover:bg-amber-500 group-hover:text-slate-950 transition-all duration-300">
                      <IconComponent className="w-6 h-6 stroke-[2]" />
                    </div>
                    <div className="text-right">
                      <span className="text-sm font-black text-amber-400 font-outfit bg-amber-500/10 px-3 py-1 rounded-xl border border-amber-500/20 block">
                        {service.price}
                      </span>
                    </div>
                  </div>

                  {/* Title & Description */}
                  <div>
                    <h3 className="text-xl font-bold text-white font-outfit group-hover:text-amber-400 transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                      {service.shortDesc}
                    </p>
                    <p className="text-[11px] text-amber-400/90 font-medium italic mt-2">
                      {service.minOrder}
                    </p>
                  </div>

                  {/* Features List */}
                  <ul className="space-y-2 pt-3 border-t border-slate-800/80">
                    {service.features.map((feat, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-xs text-slate-300 font-medium">
                        <Check className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Card Action Buttons */}
                <div className="pt-6 mt-6 border-t border-slate-800/80 flex items-center justify-between gap-3">
                  <Link
                    to={`/services/${service.id}`}
                    className="text-xs font-bold text-slate-400 hover:text-white flex items-center gap-1 transition-colors"
                  >
                    Детальніше <ArrowRight className="w-3.5 h-3.5" />
                  </Link>

                  <button
                    onClick={() => handleOrderService(service)}
                    className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black text-xs uppercase tracking-wider px-4 py-2.5 rounded-xl shadow-lg shadow-amber-500/20 flex items-center gap-1.5 transition-all hover:scale-105 active:scale-95"
                  >
                    <ShoppingBag className="w-4 h-4 stroke-[2.5]" />
                    ЗАМОВИТИ
                  </button>
                </div>

              </div>
            );
          })}
        </div>

        {/* Embedded Calculator Section */}
        <CostCalculatorInline onApplyCalculation={(calcData) => onOpenOrderModal(calcData)} />

      </div>

      <CtaBlock onOpenOrderModal={onOpenOrderModal} />
    </main>
  );
}
