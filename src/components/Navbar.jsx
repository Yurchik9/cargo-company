import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { siteConfig } from '../config/siteConfig';
import { Phone, Send, MessageCircle, Clock, MapPin, Menu, X, ShieldCheck } from 'lucide-react';

export default function Navbar({ onOpenOrderModal }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: 'Головна', path: '/' },
    { name: 'Послуги та Ціни', path: '/services' },
    { name: 'Автопарк', path: '/fleet' },
    { name: 'Наші роботи', path: '/portfolio' },
    { name: 'Для бізнесу', path: '/business' },
    { name: 'Відгуки', path: '/reviews' },
    { name: 'Контакти', path: '/contacts' },
  ];

  const isLinkActive = (path) => {
    if (path === '/') return location.pathname === '/';
    if (path === '/services') return location.pathname.startsWith('/services') || location.pathname.startsWith('/prices');
    return location.pathname.startsWith(path);
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-slate-950/95 backdrop-blur-md border-b border-slate-800/80">
      {/* Top Banner Bar */}
      <div className="bg-gradient-to-r from-amber-500/10 via-amber-500/20 to-amber-500/10 border-b border-amber-500/20 py-1.5 text-xs text-slate-300">
        <div className="max-w-7xl mx-auto px-4 flex flex-wrap justify-between items-center gap-2">
          <div className="flex items-center gap-4 flex-wrap">
            <span className="flex items-center gap-1.5 text-amber-400 font-semibold">
              <Clock className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
              {siteConfig.workHours}
            </span>
            <span className="hidden md:flex items-center gap-1.5 text-slate-400">
              <MapPin className="w-3.5 h-3.5 text-amber-400" />
              {siteConfig.location}
            </span>
            <span className="hidden sm:flex items-center gap-1.5 text-emerald-400 font-medium">
              <ShieldCheck className="w-3.5 h-3.5" />
              Швидкий виїзд по Львову та області
            </span>
          </div>

          <div className="flex items-center gap-3 ml-auto">
            <a
              href={siteConfig.messengers.telegram}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1 text-sky-400 hover:text-sky-300 transition-colors font-medium"
              title="Написати у Telegram"
            >
              <Send className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Telegram</span>
            </a>
            <span className="text-slate-700">|</span>
            <a
              href={siteConfig.messengers.viber}
              className="flex items-center gap-1 text-purple-400 hover:text-purple-300 transition-colors font-medium"
              title="Написати у Viber"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Viber</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
        {/* Brand Name Only (No Icon, No Image Logo) */}
        <Link to="/" className="group">
          <div className="flex items-center gap-2">
            <span className="text-2xl sm:text-3xl font-black tracking-tight text-white font-outfit uppercase group-hover:text-amber-400 transition-colors">
              {siteConfig.companyName}
            </span>
            <span className="bg-amber-500/20 text-amber-400 text-[10px] sm:text-xs font-extrabold px-2 py-0.5 rounded border border-amber-500/30">
              ЛЬВІВ
            </span>
          </div>
          <p className="text-[11px] text-slate-400 tracking-wide font-medium leading-none mt-0.5">
            Вантажники та Перевезення Львів
          </p>
        </Link>

        {/* Desktop Nav Links */}
        <nav className="hidden lg:flex items-center gap-5 text-sm font-medium">
          {navLinks.map((link) => {
            const active = isLinkActive(link.path);
            return (
              <Link
                key={link.name}
                to={link.path}
                className={`transition-colors py-1 relative text-xs xl:text-sm font-semibold ${
                  active
                    ? 'text-amber-400 font-bold after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-amber-400'
                    : 'text-slate-300 hover:text-amber-300'
                }`}
              >
                {link.name}
              </Link>
            );
          })}
        </nav>

        {/* Phone Numbers & Action Button */}
        <div className="hidden sm:flex items-center gap-4">
          <div className="text-right">
            <a
              href={`tel:${siteConfig.phones[0].raw}`}
              className="block text-sm font-bold text-white hover:text-amber-400 transition-colors flex items-center justify-end gap-1.5"
            >
              <Phone className="w-3.5 h-3.5 text-amber-400 fill-amber-400/20" />
              {siteConfig.phones[0].display}
            </a>
            <a
              href={`tel:${siteConfig.phones[1].raw}`}
              className="block text-xs font-semibold text-slate-400 hover:text-amber-400 transition-colors"
            >
              {siteConfig.phones[1].display}
            </a>
          </div>

          <button
            onClick={onOpenOrderModal}
            className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-xs uppercase tracking-wider px-4 py-2.5 rounded-lg shadow-lg shadow-amber-500/25 hover:shadow-amber-500/40 transition-all hover:scale-105 active:scale-95"
          >
            Замовити
          </button>
        </div>

        {/* Mobile Hamburger Toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2 text-slate-300 hover:text-white focus:outline-none"
          aria-label="Перемикач меню"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-slate-900 border-b border-slate-800 px-4 py-4 space-y-4">
          <div className="flex flex-col space-y-2">
            {navLinks.map((link) => {
              const active = isLinkActive(link.path);
              return (
                <Link
                  key={link.name}
                  to={link.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`font-medium text-base py-2.5 border-b border-slate-800/50 flex items-center justify-between ${
                    active ? 'text-amber-400 font-bold' : 'text-slate-200 hover:text-amber-300'
                  }`}
                >
                  <span>{link.name}</span>
                </Link>
              );
            })}
          </div>

          <div className="pt-2 space-y-3">
            <div className="bg-slate-800/60 p-3 rounded-lg space-y-1">
              <p className="text-xs text-slate-400">Швидкий зв'язок 24/7:</p>
              {siteConfig.phones.map((phone) => (
                <a
                  key={phone.raw}
                  href={`tel:${phone.raw}`}
                  className="flex items-center gap-2 text-white font-bold text-base hover:text-amber-400"
                >
                  <Phone className="w-4 h-4 text-amber-400" />
                  {phone.display}
                </a>
              ))}
            </div>

            <div className="grid grid-cols-2 gap-2">
              <a
                href={siteConfig.messengers.telegram}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center gap-2 bg-sky-600/20 text-sky-400 border border-sky-500/30 py-2.5 rounded-lg text-sm font-semibold"
              >
                <Send className="w-4 h-4" /> Telegram
              </a>
              <a
                href={siteConfig.messengers.viber}
                className="flex items-center justify-center gap-2 bg-purple-600/20 text-purple-400 border border-purple-500/30 py-2.5 rounded-lg text-sm font-semibold"
              >
                <MessageCircle className="w-4 h-4" /> Viber
              </a>
            </div>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenOrderModal();
              }}
              className="w-full bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-bold text-sm py-3 rounded-lg uppercase tracking-wider text-center"
            >
              Замовити вантажників
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
