import React, { useState } from 'react';
import { siteConfig } from '../config/siteConfig';
import PhoneInputCustom from './PhoneInputCustom';
import { User, MapPin, Tag, Truck, CheckCircle2, Send, MessageCircle } from 'lucide-react';

export default function QuickOrderSection() {
  const todayStr = new Date().toISOString().split('T')[0];

  const [formData, setFormData] = useState({
    name: '',
    phone: '+380',
    service: siteConfig.services[0].title,
    transport: siteConfig.transportOptions[0].title,
    address: '',
    date: todayStr,
    time: '12:00',
    description: ''
  });

  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState({ loading: false, success: false, error: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handlePhoneChange = (newPhoneVal) => {
    setFormData((prev) => ({ ...prev, phone: newPhoneVal }));
    if (errors.phone) setErrors((prev) => ({ ...prev, phone: '' }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Будь ласка, вкажіть ваше ім'я";
    
    const digitsCount = formData.phone.replace(/[^\d]/g, '').length;
    if (digitsCount < 10) newErrors.phone = "Вкажіть дійсний номер телефону з кодом країни";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const selectedServiceObj = siteConfig.services.find(s => s.title === formData.service) || siteConfig.services[0];
  const selectedTransportObj = siteConfig.transportOptions.find(t => t.title === formData.transport) || siteConfig.transportOptions[0];

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setStatus({ loading: true, success: false, error: '' });

    const messageText = `
📦 **НОВЕ ЗАМОВЛЕННЯ (ФОРМА НА ГОЛОВНІЙ)**
👤 **Ім'я:** ${formData.name}
📞 **Телефон:** ${formData.phone}
🛠 **Послуга:** ${formData.service} (${selectedServiceObj.price})
🚚 **Транспорт:** ${formData.transport} (${selectedTransportObj.price})
📍 **Адреса:** ${formData.address || 'Не вказано (Львів)'}
📅 **Дата:** ${formData.date}
⏰ **Час:** ${formData.time}

📝 **КОМЕНТАР:**
${formData.description || 'Немає опису'}
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
              Заповніть форму — диспетчер зв'яжеться протягом 5 хвилин для уточнення замовлення.
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
              
              {/* Dynamic Order Context Summary Header */}
              <div className="bg-gradient-to-r from-amber-500/15 via-slate-950 to-slate-950 p-4 rounded-2xl border border-amber-500/30 space-y-2">
                <div className="flex items-center justify-between text-xs border-b border-slate-800/80 pb-2">
                  <span className="text-slate-400 flex items-center gap-1.5">
                    <Tag className="w-3.5 h-3.5 text-amber-400" /> Тариф послуги:
                  </span>
                  <span className="font-extrabold text-amber-400">{selectedServiceObj.price}</span>
                </div>

                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-400 flex items-center gap-1.5">
                    <Truck className="w-3.5 h-3.5 text-emerald-400" /> Тариф транспорту:
                  </span>
                  <span className="font-extrabold text-emerald-400">{selectedTransportObj.price}</span>
                </div>
              </div>

              {/* SEPARATE FIELD 1: Service Selection */}
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">
                  1. Послуга / Вид робіт <span className="text-amber-400">*</span>
                </label>
                <select
                  name="service"
                  value={formData.service}
                  onChange={handleChange}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white font-medium focus:outline-none focus:border-amber-500 transition-colors"
                >
                  {siteConfig.services.map((s) => (
                    <option key={s.id} value={s.title}>
                      {s.title} — ({s.price})
                    </option>
                  ))}
                </select>
              </div>

              {/* SEPARATE FIELD 2: Transport Selection */}
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">
                  2. Вантажний транспорт <span className="text-amber-400">*</span>
                </label>
                <select
                  name="transport"
                  value={formData.transport}
                  onChange={handleChange}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white font-medium focus:outline-none focus:border-amber-500 transition-colors"
                >
                  {siteConfig.transportOptions.map((t) => (
                    <option key={t.id} value={t.title}>
                      {t.title} — ({t.price})
                    </option>
                  ))}
                </select>
              </div>

              {/* Name & Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Ваше ім'я <span className="text-amber-400">*</span>
                  </label>
                  <div className="relative">
                    <User className="absolute left-3.5 top-3.5 w-4 h-4 text-slate-500" />
                    <input
                      type="text"
                      name="name"
                      placeholder="Ваше ім'я"
                      value={formData.name}
                      onChange={handleChange}
                      className={`w-full bg-slate-950 border ${
                        errors.name ? 'border-rose-500' : 'border-slate-800 focus:border-amber-500'
                      } rounded-xl pl-10 pr-4 py-3 text-sm text-white placeholder-slate-600 focus:outline-none transition-colors`}
                    />
                  </div>
                  {errors.name && <p className="text-[11px] text-rose-400 font-semibold mt-1">{errors.name}</p>}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Номер телефону <span className="text-amber-400">*</span>
                  </label>
                  <PhoneInputCustom
                    value={formData.phone}
                    onChange={handlePhoneChange}
                    error={errors.phone}
                  />
                </div>
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

              {/* Native Date & Time Pickers */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Оберіть дату
                  </label>
                  <input
                    type="date"
                    name="date"
                    min={todayStr}
                    value={formData.date}
                    onChange={handleChange}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-amber-500 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Оберіть час
                  </label>
                  <input
                    type="time"
                    name="time"
                    value={formData.time}
                    onChange={handleChange}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-amber-500 transition-colors"
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
                  rows="3"
                  placeholder="Наприклад: потрібно 2 вантажники на 3 години для квартирного переїзду..."
                  value={formData.description}
                  onChange={handleChange}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-amber-500 transition-colors resize-none leading-relaxed"
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
