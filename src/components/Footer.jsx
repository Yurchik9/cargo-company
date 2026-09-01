import React from 'react';
import { Link } from 'react-router-dom';
import { siteConfig } from '../config/siteConfig';
import { MapPin, Clock, Send, MessageCircle, ArrowUp, Phone } from 'lucide-react';

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
            <Link to="/" className="group">
              <div className="flex items-center gap-2">
                <span className="text-2xl font-black tracking-tight text-white font-outfit uppercase group-hover:text-amber-400 transition-colors">
                  {siteConfig.companyName}
                </span>
                <span className="bg-amber-500/20 text-amber-400 text-[10px] font-bold px-1.5 py-0.5 rounded border border-amber-500/30">
                  ЛЬВІВ
                </span>
              </div>
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
              <div className="flex items-center gap-2 text-slate-300">
                <Phone className="w-4 h-4 text-amber-400 shrink-0" />
                <span>{siteConfig.phones[0].display} | {siteConfig.phones[1].display}</span>
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
              <li><Link to="/" className="hover:text-amber-400 transition-colors">Головна</Link></li>
              <li><Link to="/services" className="hover:text-amber-400 transition-colors">Послуги та Ціни</Link></li>
              <li><Link to="/fleet" className="hover:text-amber-400 transition-colors">Вантажний автопарк</Link></li>
              <li><Link to="/portfolio" className="hover:text-amber-400 transition-colors">Наші роботи</Link></li>
              <li><Link to="/business" className="hover:text-amber-400 transition-colors">Для бізнесу</Link></li>
              <li><Link to="/reviews" className="hover:text-amber-400 transition-colors">Відгуки клієнтів</Link></li>
              <li><Link to="/contacts" className="hover:text-amber-400 transition-colors">Контакти</Link></li>
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

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-500 text-[11px]">
          <p>© {new Date().getFullYear()} Служба вантажних перевезень «SMART MOVING». Усі права захищено.</p>
          
          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 text-slate-400 hover:text-amber-400 transition-colors font-bold uppercase tracking-wider cursor-pointer"
          >
            Нагору <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </footer>
  );
}
