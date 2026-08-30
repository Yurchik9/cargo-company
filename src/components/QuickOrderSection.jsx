import React, { useState } from 'react';
import { siteConfig } from '../config/siteConfig';
import { ShoppingBag, User, Phone, MapPin, Calendar, Clock, FileText, CheckCircle2, Send } from 'lucide-react';

export default function QuickOrderSection() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    service: siteConfig.services[0].title,
    address: '',
    date: '',
    time: '',
    description: ''
  });

  const [status, setStatus] = useState({ loading: false, success: false, error: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ loading: true, success: false, error: '' });

    const messageText = `
📦 **НОВЕ ЗАМОВЛЕННЯ (ФОРМА НА САЙТІ)**
👤 **Ім'я:** ${formData.name}
📞 **Телефон:** ${formData.phone}
🛠 **Послуга:** ${formData.service}
📍 **Адреса:** ${formData.address || 'Не вказано'}
📅 **Дата:** ${formData.date || 'Терміново'}
⏰ **Час:** ${formData.time || 'Найближчий'}
📝 **Опис:** ${formData.description || 'Немає опису'}
    `.trim();

    try {
      if (siteConfig.telegramBot.enabled && siteConfig.telegramBot.botToken !== "YOUR_TELEGRAM_BOT_TOKEN_HERE") {
        await fetch(
          `https://api.telegram.org/bot${siteConfig.telegramBot.botToken}/sendMessage`,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              chat_id: siteConfig.telegramBot.chatId,
              text: messageText,
              parse_mode: 'Markdown'
            })
          }
        );
      }
      setTimeout(() => {
        setStatus({ loading: false, success: true, error: '' });
      }, 500);
    } catch (err) {
      setStatus({ loading: false, success: true, error: '' });
    }
  };

  return (
    <section id="order-form" className="py-16 bg-slate-950 relative">
      <div className="max-w-4xl mx-auto px-4">
        
        <div className="bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-10 shadow-2xl space-y-6">
          
          <div className="text-center space-y-2">
            <span className="text-amber-400 font-bold text-xs uppercase tracking-wider bg-amber-500/10 border border-amber-500/20 px-3 py-1 rounded-full">
              Швидке замовлення 24/7
            </span>
            <h2 className="text-2xl sm:text-4xl font-black text-white font-outfit uppercase">
              ФОРМА ЗАМОВЛЕННЯ <span className="text-gradient-amber">ВАНТАЖНИКІВ</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-400">
              Заповніть заявку — ми зателефонуємо протягом 5 хвилин для уточнення деталей.
            </p>
          </div>

          {status.success ? (
            <div className="py-8 text-center space-y-4">
              <div className="w-16 h-16 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto border border-emerald-500/30">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h3 className="text-2xl font-bold text-white font-outfit">Заявку успішно прийнято!</h3>
              <p className="text-xs sm:text-sm text-slate-300 max-w-md mx-auto">
                Диспетчер зв'яжеться з вами за номером <strong className="text-amber-400">{formData.phone}</strong> найближчим часом.
              </p>
              <button
                onClick={() => setStatus({ loading: false, success: false, error: '' })}
                className="bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs uppercase tracking-wider py-3 px-6 rounded-xl transition-colors"
              >
                Відправити ще одну заявку
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 pt-2">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Name */}
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Ім'я <span className="text-amber-400">*</span>
                  </label>
                  <div className="relative">
                    <User className="absolute left-3.5 top-3.5 w-4 h-4 text-slate-500" />
                    <input
                      type="text"
                      name="name"
                      required
                      placeholder="Ваше ім'я"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-10 pr-4 py-3 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-amber-500 transition-colors"
                    />
                  </div>
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Номер телефону <span className="text-amber-400">*</span>
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3.5 top-3.5 w-4 h-4 text-slate-500" />
                    <input
                      type="tel"
                      name="phone"
                      required
                      placeholder="+380 (__) ___-__-__"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-10 pr-4 py-3 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-amber-500 transition-colors"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Service */}
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Яка послуга потрібна
                  </label>
                  <select
                    name="service"
                    value={formData.service}
                    onChange={handleChange}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-amber-500 transition-colors"
                  >
                    {siteConfig.services.map((s) => (
                      <option key={s.id} value={s.title}>
                        {s.title} ({s.price})
                      </option>
                    ))}
                  </select>
                </div>

                {/* Address */}
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Адреса (район / вулиця / область)
                  </label>
                  <div className="relative">
                    <MapPin className="absolute left-3.5 top-3.5 w-4 h-4 text-slate-500" />
                    <input
                      type="text"
                      name="address"
                      placeholder="Адреса завантаження або вивантаження"
                      value={formData.address}
                      onChange={handleChange}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-10 pr-4 py-3 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-amber-500 transition-colors"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {/* Date */}
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Дата</label>
                  <input
                    type="text"
                    name="date"
                    placeholder="Терміново / 30.08"
                    value={formData.date}
                    onChange={handleChange}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-amber-500 transition-colors"
                  />
                </div>

                {/* Time */}
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Орієнтовний час</label>
                  <input
                    type="text"
                    name="time"
                    placeholder="Наприклад: 14:00"
                    value={formData.time}
                    onChange={handleChange}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-amber-500 transition-colors"
                  />
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Короткий опис роботи
                </label>
                <textarea
                  name="description"
                  rows="2"
                  placeholder="Наприклад: потрібно 2 вантажники на 3 години для квартирного переїзду..."
                  value={formData.description}
                  onChange={handleChange}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-amber-500 transition-colors resize-none"
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={status.loading}
                className="w-full bg-gradient-to-r from-amber-500 via-amber-400 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black text-sm uppercase tracking-wider py-4 rounded-xl shadow-xl shadow-amber-500/25 transition-all hover:scale-[1.01] active:scale-95 disabled:opacity-50"
              >
                {status.loading ? 'Надсилання...' : 'ЗАМОВИТИ ВАНТАЖНИКІВ'}
              </button>

            </form>
          )}

        </div>

      </div>
    </section>
  );
}
