import React from 'react';
import { Link } from 'react-router-dom';
import { siteConfig } from '../config/siteConfig';
import { Truck, Phone, MapPin, Clock, Send, MessageCircle, ArrowUp } from 'lucide-react';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-950 border-t border-slate-900 text-slate-400 pt-16 pb-24 lg:pb-12 text-xs">
      <div className="max-w-7xl mx-auto px-4 space-y-12">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center text-slate-950 font-black text-xl">
                <Truck className="w-5 h-5 stroke-[2.5]" />
              </div>
              <span className="text-2xl font-black tracking-tight text-white font-outfit">
                {siteConfig.companyName}
              </span>
            </Link>

            <p className="text-slate-400 leading-relaxed max-w-sm">
              {siteConfig.tagline}
            </p>

            <div className="space-y-2 pt-2">
              <div className="flex items-center gap-2 text-slate-300">
                <Clock className="w-4 h-4 text-amber-400 shrink-0" />
                <span>{siteConfig.workHours}</span>
              </div>
              <div className="flex items-center gap-2 text-slate-300">
                <MapPin className="w-4 h-4 text-amber-400 shrink-0" />
                <span>{siteConfig.location}</span>
              </div>
            </div>

            <div className="flex items-center gap-3 pt-2">
              <a
                href={siteConfig.messengers.telegram}
                target="_blank"
                rel="noreferrer"
                className="p-2.5 rounded-xl bg-sky-950/60 border border-sky-800/50 text-sky-400 hover:bg-sky-500 hover:text-slate-950 transition-colors"
                title="Telegram"
              >
                <Send className="w-4 h-4" />
              </a>
              <a
                href={siteConfig.messengers.viber}
                className="p-2.5 rounded-xl bg-purple-950/60 border border-purple-800/50 text-purple-400 hover:bg-purple-500 hover:text-slate-950 transition-colors"
                title="Viber"
              >
                <MessageCircle className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white font-outfit uppercase">Навігація</h4>
            <ul className="space-y-2 font-medium">
              <li><a href="/" className="hover:text-amber-400 transition-colors">Головна</a></li>
              <li><a href="/#services" className="hover:text-amber-400 transition-colors">Послуги</a></li>
              <li><a href="/#prices" className="hover:text-amber-400 transition-colors">Ціни</a></li>
              <li><a href="/fleet" className="hover:text-amber-400 transition-colors">Вантажний автопарк</a></li>
              <li><a href="/#portfolio" className="hover:text-amber-400 transition-colors">Наші роботи</a></li>
              <li><a href="/#business" className="hover:text-amber-400 transition-colors">Для бізнесу</a></li>
              <li><a href="/contacts" className="hover:text-amber-400 transition-colors">Контакти</a></li>
            </ul>
          </div>

          {/* Services Links Column 1 */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white font-outfit uppercase">Послуги вантажників</h4>
            <ul className="space-y-2">
              {siteConfig.services.slice(0, 6).map(s => (
                <li key={s.id}>
                  <Link to={`/services/${s.id}`} className="hover:text-amber-400 transition-colors">
                    {s.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services Links Column 2 */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white font-outfit uppercase">Спеціальні роботи</h4>
            <ul className="space-y-2">
              {siteConfig.services.slice(6, 12).map(s => (
                <li key={s.id}>
                  <Link to={`/services/${s.id}`} className="hover:text-amber-400 transition-colors">
                    {s.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

        </div>

        {/* SEO Keywords Tag Cloud (TZ Line 180-194) */}
        <div className="pt-8 border-t border-slate-900 space-y-3">
          <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Популярні пошукові запити:</p>
          <div className="flex flex-wrap gap-2 text-[10px] text-slate-500">
            {["вантажники Львів", "грузчики Львів", "вантажники Львів ціна", "вантажні перевезення Львів", "переїзд Львів", "квартирний переїзд Львів", "офісний переїзд Львів", "такелажні роботи Львів", "підйом вантажу на поверх Львів", "вантажники на склад Львів", "підсобники Львів"].map((tag, i) => (
              <span key={i} className="bg-slate-900 px-2 py-1 rounded border border-slate-800/60">
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-500 text-[11px]">
          <p>© {new Date().getFullYear()} Служба вантажних перевезень «НІКА». Усі права захищено.</p>
          
          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 text-slate-400 hover:text-amber-400 transition-colors"
          >
            Нагору <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </footer>
  );
}
