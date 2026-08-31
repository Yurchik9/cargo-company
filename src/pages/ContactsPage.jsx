import React, { useEffect } from 'react';
import { siteConfig } from '../config/siteConfig';
import { Phone, Send, MessageCircle, Clock, MapPin, ShieldCheck, Mail, Building2, ShoppingBag } from 'lucide-react';

export default function ContactsPage({ onOpenOrderModal }) {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "Контакти вантажників у Львові 24/7 | НІКА (+380990821475)";
  }, []);

  return (
    <main className="pt-8 pb-16 bg-slate-950 text-slate-100 min-h-screen space-y-12">
      <div className="max-w-7xl mx-auto px-4 space-y-12">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="text-amber-400 font-bold text-xs uppercase tracking-widest bg-amber-500/10 border border-amber-500/20 px-3 py-1 rounded-full">
            Контакти 24/7
          </span>
          <h1 className="text-3xl sm:text-5xl font-black text-white font-outfit uppercase">
            ЗВ'ЯЗОК З ДИСПЕТЧЕРОМ <span className="text-gradient-amber">У ЛЬВОВІ</span>
          </h1>
          <p className="text-slate-400 text-sm sm:text-base">
            Приймаємо замовлення та надаємо розрахунок вартості цілодобово без вихідних.
          </p>
        </div>

        {/* Large Contact Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Phone Numbers Box */}
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 space-y-6 shadow-2xl">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
                <Phone className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white font-outfit">Зателефонувати диспетчеру</h3>
                <p className="text-xs text-slate-400">Клікабельні номери для миттєвого дзвінка</p>
              </div>
            </div>

            <div className="space-y-3 pt-2">
              {siteConfig.phones.map((phone) => (
                <a
                  key={phone.raw}
                  href={`tel:${phone.raw}`}
                  className="flex items-center justify-between bg-slate-950 hover:bg-amber-500 hover:text-slate-950 text-white font-black text-xl p-4 rounded-2xl border border-slate-800 hover:border-amber-400 transition-all duration-300 group shadow-md"
                >
                  <span className="flex items-center gap-3">
                    <Phone className="w-5 h-5 text-amber-400 group-hover:text-slate-950" />
                    {phone.display}
                  </span>
                  <span className="text-xs font-bold uppercase tracking-wider bg-slate-900 group-hover:bg-slate-950 text-amber-400 group-hover:text-amber-300 px-3 py-1 rounded-xl">
                    Дзвінок
                  </span>
                </a>
              ))}
            </div>

            <button
              onClick={() => onOpenOrderModal()}
              className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black text-xs uppercase tracking-wider py-3.5 rounded-xl shadow-lg shadow-amber-500/20 flex items-center justify-center gap-2 transition-all hover:scale-[1.01] active:scale-95"
            >
              <ShoppingBag className="w-4 h-4 stroke-[2.5]" />
              Оформити онлайн замовлення
            </button>

            <div className="text-xs text-slate-400 flex items-center gap-2 pt-2">
              <Clock className="w-4 h-4 text-amber-400 shrink-0" />
              <span>Диспетчери на зв'язку 24/7/365</span>
            </div>
          </div>

          {/* Messengers Box */}
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 space-y-6 shadow-2xl">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-sky-500/10 border border-sky-500/20 flex items-center justify-center text-sky-400">
                <Send className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white font-outfit">Написати в Месенджери</h3>
                <p className="text-xs text-slate-400">Прямий перехід у чат без збереження номера</p>
              </div>
            </div>

            <div className="space-y-3 pt-2">
              <a
                href={siteConfig.messengers.telegram}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-between bg-sky-950/40 hover:bg-sky-600 hover:text-white text-sky-400 font-bold text-base p-4 rounded-2xl border border-sky-800/50 transition-all duration-300 group shadow-md"
              >
                <span className="flex items-center gap-3">
                  <Send className="w-5 h-5" />
                  НАПИСАТИ В TELEGRAM
                </span>
                <span className="text-xs bg-sky-900/60 group-hover:bg-white/20 text-sky-200 px-3 py-1 rounded-xl">
                  Перейти в Чат
                </span>
              </a>

              <a
                href={siteConfig.messengers.viber}
                className="flex items-center justify-between bg-purple-950/40 hover:bg-purple-600 hover:text-white text-purple-400 font-bold text-base p-4 rounded-2xl border border-purple-800/50 transition-all duration-300 group shadow-md"
              >
                <span className="flex items-center gap-3">
                  <MessageCircle className="w-5 h-5" />
                  НАПИСАТИ У VIBER
                </span>
                <span className="text-xs bg-purple-900/60 group-hover:bg-white/20 text-purple-200 px-3 py-1 rounded-xl">
                  Перейти в Чат
                </span>
              </a>
            </div>

            <div className="text-xs text-slate-400 flex items-center gap-2 pt-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Швидка відповідь протягом 2-5 хвилин</span>
            </div>
          </div>

        </div>

        {/* Location & Coverage Map Banner */}
        <div className="bg-slate-900/60 border border-slate-800 rounded-3xl p-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-2">
            <span className="text-xs font-bold text-amber-400 uppercase">Локація та геолокація</span>
            <h4 className="text-lg font-bold text-white font-outfit flex items-center gap-2">
              <MapPin className="w-5 h-5 text-amber-400" /> Львів та Львівська область
            </h4>
            <p className="text-xs text-slate-400">
              Працюємо в усіх районах Львова (Галицький, Франківський, Сихівський, Личаківський, Шевченківський, Залізничний) та по області.
            </p>
          </div>

          <div className="space-y-2">
            <span className="text-xs font-bold text-amber-400 uppercase">Графік роботи</span>
            <h4 className="text-lg font-bold text-white font-outfit flex items-center gap-2">
              <Clock className="w-5 h-5 text-amber-400" /> Безперервно 24/7
            </h4>
            <p className="text-xs text-slate-400">
              Виконуємо нічні завантаження, виїзди у святкові та вихідні дні за стандартними тарифами.
            </p>
          </div>

          <div className="space-y-2">
            <span className="text-xs font-bold text-amber-400 uppercase">Робота з бізнесом</span>
            <h4 className="text-lg font-bold text-white font-outfit flex items-center gap-2">
              <Building2 className="w-5 h-5 text-amber-400" /> Безготівковий розрахунок
            </h4>
            <p className="text-xs text-slate-400">
              Виставляємо рахунки для юридичних осіб, підписуємо договори та акти виконаних робіт.
            </p>
          </div>
        </div>

      </div>
    </main>
  );
}
