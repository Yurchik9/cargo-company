import React, { useState, useEffect } from 'react';
import { siteConfig } from '../config/siteConfig';
import { X, Send, Phone, CheckCircle2, Clock, Calendar, MapPin, User, Tag, Sparkles, Truck, Box, ShieldCheck, MessageCircle } from 'lucide-react';

export default function OrderModal({ isOpen, onClose, initialService = '' }) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    service: '',
    address: '',
    date: '',
    time: '',
    description: ''
  });

  const [status, setStatus] = useState({ loading: false, success: false, error: '' });

  // Sync state when modal opens or initialService prop changes
  useEffect(() => {
    if (isOpen) {
      const defaultService = initialService || siteConfig.services[0].title;
      setFormData({
        name: '',
        phone: '',
        service: defaultService,
        address: '',
        date: '',
        time: '',
        description: ''
      });
      setStatus({ loading: false, success: false, error: '' });
    }
  }, [isOpen, initialService]);

  if (!isOpen) return null;

  // Helper to resolve info about currently selected service or vehicle
  const getItemDetails = (serviceName) => {
    if (!serviceName) return null;

    // Search in siteConfig.services
    const matchedService = siteConfig.services.find(
      (s) => s.title.toLowerCase() === serviceName.toLowerCase() || serviceName.toLowerCase().includes(s.title.toLowerCase())
    );
    if (matchedService) {
      return {
        category: 'Послуги вантажників',
        title: matchedService.title,
        price: matchedService.price,
        note: matchedService.minOrder,
        features: matchedService.features.slice(0, 2),
        icon: 'service'
      };
    }

    // Search in siteConfig.fleet
    const matchedFleet = siteConfig.fleet.find(
      (v) => v.name.toLowerCase() === serviceName.toLowerCase() || serviceName.toLowerCase().includes(v.name.toLowerCase())
    );
    if (matchedFleet) {
      return {
        category: 'Вантажний автопарк',
        title: matchedFleet.name,
        price: matchedFleet.payload,
        note: `${matchedFleet.volume} | ${matchedFleet.dimensions.split('|')[0]}`,
        features: [
          matchedFleet.hydroboard ? 'З Гідробортом 1т' : 'Чистий кузов',
          matchedFleet.palletJack ? 'З Роклою' : 'Кріпильні ремені'
        ],
        icon: 'truck'
      };
    }

    // Calculation or custom service
    if (serviceName.includes('калькулятора') || serviceName.includes('Розрахунок')) {
      return {
        category: 'Точний розрахунок',
        title: serviceName.replace('Розрахунок з калькулятора:', '').trim(),
        price: 'Індивідуальний кошторис',
        note: 'Параметри з калькулятора збережено',
        features: ['Точна ціна перед початком', 'Фіксація тарифу'],
        icon: 'calc'
      };
    }

    return {
      category: 'Послуга вантажників',
      title: serviceName,
      price: 'від 350 грн/год',
      note: 'Мінімальне замовлення — від 2 годин',
      features: ['Досвідчені працівники', 'Швидкий виїзд за 30 хв'],
      icon: 'custom'
    };
  };

  const activeItemDetails = getItemDetails(formData.service);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const setQuickDate = (dateVal) => {
    setFormData((prev) => ({ ...prev, date: dateVal }));
  };

  const setQuickTime = (timeVal) => {
    setFormData((prev) => ({ ...prev, time: timeVal }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ loading: true, success: false, error: '' });

    const messageText = `
📦 **НОВЕ ЗАМОВЛЕННЯ З САЙТУ (НІКА)**
👤 **Ім'я:** ${formData.name}
📞 **Телефон:** ${formData.phone}
🛠 **Послуга / Об'єкт:** ${formData.service}
💰 **Тариф / Категорія:** ${activeItemDetails?.price || 'від 350 грн/год'}
📍 **Адреса:** ${formData.address || 'Не вказано (Львів)'}
📅 **Дата:** ${formData.date || 'Терміново'}
⏰ **Час:** ${formData.time || 'Найближчий'}
📝 **Опис:** ${formData.description || 'Без додаткового опису'}
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
      console.warn('Bot submission notice:', err);
      setStatus({ loading: false, success: true, error: '' });
    }
  };

  const resetAndClose = () => {
    setStatus({ loading: false, success: false, error: '' });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/85 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-xl bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl overflow-hidden max-h-[92vh] flex flex-col">
        
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-amber-500/20 via-slate-900 to-slate-900 p-4 sm:p-5 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <span className="text-amber-400 font-bold text-[10px] uppercase tracking-widest bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
                Виїзд по Львову 24/7
              </span>
              <h3 className="text-lg sm:text-xl font-extrabold text-white font-outfit mt-0.5">
                Оформлення замовлення
              </h3>
            </div>
          </div>
          <button
            onClick={resetAndClose}
            className="p-2 text-slate-400 hover:text-white rounded-xl hover:bg-slate-800 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Modal Content Body */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-4">
          
          {status.success ? (
            /* Success State */
            <div className="py-6 text-center space-y-5">
              <div className="w-16 h-16 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto border border-emerald-500/30">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              
              <div className="space-y-2">
                <h4 className="text-2xl font-black text-white font-outfit">Заявку успішно прийнято!</h4>
                <p className="text-xs sm:text-sm text-slate-300 max-w-md mx-auto">
                  Дякуємо, <strong className="text-white">{formData.name}</strong>! Диспетчер зателефонує вам на номер <strong className="text-amber-400">{formData.phone}</strong> протягом <span className="text-amber-400 font-bold">5 хвилин</span>.
                </p>
              </div>

              {/* Order Summary Badge */}
              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 text-left space-y-2 text-xs">
                <div className="flex items-center justify-between text-slate-400 border-b border-slate-800/80 pb-2">
                  <span>Замовлений об'єкт:</span>
                  <span className="font-bold text-amber-400">{formData.service}</span>
                </div>
                <div className="flex items-center justify-between text-slate-400">
                  <span>Тариф / Ціна:</span>
                  <span className="font-bold text-emerald-400">{activeItemDetails?.price}</span>
                </div>
              </div>

              {/* Messenger Direct Action Buttons */}
              <div className="bg-slate-900 p-4 rounded-2xl border border-slate-800 space-y-3 text-left">
                <p className="text-xs font-bold text-slate-300">Бажаєте написати диспетчеру напряму?</p>
                <div className="grid grid-cols-2 gap-2">
                  <a
                    href={siteConfig.messengers.telegram}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center justify-center gap-2 bg-sky-600/20 text-sky-400 border border-sky-500/30 p-2.5 rounded-xl text-xs font-bold hover:bg-sky-600 hover:text-white transition-colors"
                  >
                    <Send className="w-4 h-4" /> Telegram
                  </a>
                  <a
                    href={siteConfig.messengers.viber}
                    className="flex items-center justify-center gap-2 bg-purple-600/20 text-purple-400 border border-purple-500/30 p-2.5 rounded-xl text-xs font-bold hover:bg-purple-600 hover:text-white transition-colors"
                  >
                    <MessageCircle className="w-4 h-4" /> Viber
                  </a>
                </div>
              </div>

              <button
                onClick={resetAndClose}
                className="w-full bg-slate-800 hover:bg-slate-700 text-white font-bold py-3.5 rounded-xl text-xs uppercase tracking-wider transition-colors"
              >
                Закрити вікно
              </button>
            </div>
          ) : (
            /* Form State */
            <form onSubmit={handleSubmit} className="space-y-4">
              
              {/* Dynamic Selected Service / Vehicle Summary Card */}
              {activeItemDetails && (
                <div className="bg-gradient-to-r from-amber-500/15 via-slate-950 to-slate-950 p-3.5 sm:p-4 rounded-2xl border border-amber-500/30 space-y-2">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[10px] font-extrabold text-amber-400 uppercase tracking-wider bg-amber-500/20 px-2 py-0.5 rounded border border-amber-500/30">
                      {activeItemDetails.category}
                    </span>
                    <span className="text-xs font-black text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded border border-emerald-500/20">
                      {activeItemDetails.price}
                    </span>
                  </div>

                  <div>
                    <h4 className="text-sm sm:text-base font-extrabold text-white font-outfit">
                      {activeItemDetails.title}
                    </h4>
                    <p className="text-[11px] text-slate-400 mt-0.5">
                      {activeItemDetails.note}
                    </p>
                  </div>

                  {activeItemDetails.features && (
                    <div className="flex flex-wrap gap-2 pt-1 border-t border-slate-900 text-[10px] text-slate-300">
                      {activeItemDetails.features.map((feat, idx) => (
                        <span key={idx} className="flex items-center gap-1 bg-slate-900/90 px-2 py-0.5 rounded border border-slate-800">
                          <ShieldCheck className="w-3 h-3 text-amber-400" /> {feat}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* Service / Vehicle Dropdown Selector */}
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">
                  Обрати послугу або транспорт <span className="text-amber-400">*</span>
                </label>
                <select
                  name="service"
                  value={formData.service}
                  onChange={handleChange}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white font-medium focus:outline-none focus:border-amber-500 transition-colors"
                >
                  <optgroup label="--- ПОСЛУГИ ВАНТАЖНИКІВ ---">
                    {siteConfig.services.map((s) => (
                      <option key={s.id} value={s.title}>
                        {s.title} ({s.price})
                      </option>
                    ))}
                  </optgroup>
                  <optgroup label="--- ВАНТАЖНИЙ АВТОПАРК ---">
                    {siteConfig.fleet.map((v) => (
                      <option key={v.id} value={v.name}>
                        {v.name} ({v.payload})
                      </option>
                    ))}
                  </optgroup>
                  {!siteConfig.services.some(s => s.title === formData.service) &&
                   !siteConfig.fleet.some(v => v.name === formData.service) && (
                    <option value={formData.service}>{formData.service}</option>
                  )}
                </select>
              </div>

              {/* Name & Phone Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Ваше ім'я <span className="text-amber-400">*</span>
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 w-4 h-4 text-slate-500" />
                    <input
                      type="text"
                      name="name"
                      required
                      placeholder="Наприклад: Тарас"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-3 py-2.5 text-xs sm:text-sm text-white placeholder-slate-600 focus:outline-none focus:border-amber-500 transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Номер телефону <span className="text-amber-400">*</span>
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-3 w-4 h-4 text-slate-500" />
                    <input
                      type="tel"
                      name="phone"
                      required
                      placeholder="+380 (__) ___-__-__"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-3 py-2.5 text-xs sm:text-sm text-white placeholder-slate-600 focus:outline-none focus:border-amber-500 transition-colors"
                    />
                  </div>
                </div>
              </div>

              {/* Address */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Адреса роботи у Львові або області
                </label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-3 w-4 h-4 text-slate-500" />
                  <input
                    type="text"
                    name="address"
                    placeholder="Район / вул. Франка / Львівська обл."
                    value={formData.address}
                    onChange={handleChange}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-3 py-2.5 text-xs sm:text-sm text-white placeholder-slate-600 focus:outline-none focus:border-amber-500 transition-colors"
                  />
                </div>
              </div>

              {/* Date & Time Grid with Quick Pills */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Дата виконання</label>
                  <input
                    type="text"
                    name="date"
                    placeholder="Терміново / 30.08"
                    value={formData.date}
                    onChange={handleChange}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs sm:text-sm text-white placeholder-slate-600 focus:outline-none focus:border-amber-500 transition-colors"
                  />
                  <div className="flex gap-1.5 pt-1">
                    {['Сьогодні', 'Завтра', 'У вихідні'].map((d) => (
                      <button
                        key={d}
                        type="button"
                        onClick={() => setQuickDate(d)}
                        className="text-[10px] bg-slate-950 hover:bg-slate-800 text-slate-400 hover:text-amber-400 px-2 py-0.5 rounded border border-slate-800 transition-colors"
                      >
                        {d}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Орієнтовний час</label>
                  <input
                    type="text"
                    name="time"
                    placeholder="Наприклад: 14:00"
                    value={formData.time}
                    onChange={handleChange}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs sm:text-sm text-white placeholder-slate-600 focus:outline-none focus:border-amber-500 transition-colors"
                  />
                  <div className="flex gap-1.5 pt-1">
                    {['Зараз (30 хв)', '10:00', '14:00'].map((t) => (
                      <button
                        key={t}
                        type="button"
                        onClick={() => setQuickTime(t)}
                        className="text-[10px] bg-slate-950 hover:bg-slate-800 text-slate-400 hover:text-amber-400 px-2 py-0.5 rounded border border-slate-800 transition-colors"
                      >
                        {t}
                      </button>
                    ))}
                  </div>
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
                  placeholder="Наприклад: 3-й поверх без ліфта, потрібно 2 вантажники для занесення дивану..."
                  value={formData.description}
                  onChange={handleChange}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs sm:text-sm text-white placeholder-slate-600 focus:outline-none focus:border-amber-500 transition-colors resize-none"
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={status.loading}
                className="w-full bg-gradient-to-r from-amber-500 via-amber-400 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black text-xs sm:text-sm uppercase tracking-wider py-3.5 rounded-xl shadow-xl shadow-amber-500/25 transition-all hover:scale-[1.01] active:scale-95 disabled:opacity-50"
              >
                {status.loading ? 'Надсилання...' : 'ПОДАТИ ЗАЯВКУ ТА РОЗРАХУВАТИ'}
              </button>

            </form>
          )}

        </div>
      </div>
    </div>
  );
}
