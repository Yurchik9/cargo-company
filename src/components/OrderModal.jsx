import React, { useState, useEffect } from 'react';
import { siteConfig } from '../config/siteConfig';
import PhoneInputCustom from './PhoneInputCustom';
import { X, Send, Phone, CheckCircle2, Clock, MapPin, User, Tag, Sparkles, Truck, ShieldCheck, MessageCircle } from 'lucide-react';

export default function OrderModal({ isOpen, onClose, initialService = '', initialContextState = null }) {
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

  // Default comment templates per service category
  const getDefaultCommentForService = (serviceTitle) => {
    if (!serviceTitle) return '';
    const titleLower = serviceTitle.toLowerCase();

    if (titleLower.includes('монтаж') || titleLower.includes('збірка')) {
      return 'Монтаж та збірка меблів. Потрібно змонтувати/зібрати меблі (кухня, шафа-купе, ліжко, стінка). Маємо власний електроінструмент.';
    }
    if (titleLower.includes('квартирний')) {
      return 'Квартирний переїзд. Потрібно завантажити та підняти меблі (диван, шафа, побутова техніка). Є крихкі речі.';
    }
    if (titleLower.includes('офісний')) {
      return 'Офісний переїзд. Перевезення 5+ робочих місць, оргтехніки, документів та сейфу.';
    }
    if (titleLower.includes('такелаж')) {
      return 'Такелажні роботи. Потрібно перемістити важке обладнання/сейф вагою понад 300 кг за допомогою ременів.';
    }
    if (titleLower.includes('склад')) {
      return 'Складські роботи. Потрібні вантажники на зміну для розвантаження фури / розфокусування палет.';
    }
    if (titleLower.includes('підйом') || titleLower.includes('поверх')) {
      return 'Підйом вантажу на поверхи. Будматеріали в мішках / гіпсокартон. Потрібно уточнити наявність ліфта.';
    }
    if (titleLower.includes('демонтаж')) {
      return 'Демонтажні роботи. Демонтаж плит, перегородок, фасування будівельного сміття в мішки.';
    }
    if (titleLower.includes('вивіз') || titleLower.includes('сміття')) {
      return 'Вивіз будівельного сміття та старих меблів з завантаженням у вантажівку.';
    }
    return `Замовлення послуги: ${serviceTitle}. Опишіть обсяг робіт...`;
  };

  // Sync state when modal opens or initialService / contextState changes
  useEffect(() => {
    if (isOpen) {
      let initialSvc = siteConfig.services[0].title;
      let initialTrp = siteConfig.transportOptions[0].title;
      let initialDesc = '';

      if (initialContextState) {
        if (initialContextState.service) initialSvc = initialContextState.service;
        if (initialContextState.transport) initialTrp = initialContextState.transport;
        if (initialContextState.description) {
          initialDesc = initialContextState.description;
        } else {
          initialDesc = getDefaultCommentForService(initialSvc);
        }
      } else if (initialService) {
        const matchedVehicle = siteConfig.fleet.find(
          (v) => v.name.toLowerCase() === initialService.toLowerCase() || initialService.toLowerCase().includes(v.name.toLowerCase())
        );
        if (matchedVehicle) {
          initialSvc = "Вантажні перевезення";
          const matchedTrpOption = siteConfig.transportOptions.find(t => t.title.toLowerCase().includes(matchedVehicle.name.toLowerCase().split(' ')[0])) || siteConfig.transportOptions[2];
          initialTrp = matchedTrpOption.title;
          initialDesc = `Замовлення автомобіля: ${matchedVehicle.name}. Потрібна доставка вантажу po Львову/області.`;
        } else {
          const matchedSvc = siteConfig.services.find(
            (s) => s.title.toLowerCase() === initialService.toLowerCase() || initialService.toLowerCase().includes(s.title.toLowerCase())
          );
          if (matchedSvc) {
            initialSvc = matchedSvc.title;
            if (matchedSvc.id === 'cargo-transportation' || matchedSvc.id === 'apartment-moving' || matchedSvc.id === 'office-moving') {
              initialTrp = siteConfig.transportOptions[1].title;
            }
            initialDesc = getDefaultCommentForService(matchedSvc.title);
          } else {
            initialDesc = initialService;
          }
        }
      } else {
        initialDesc = getDefaultCommentForService(initialSvc);
      }

      setFormData({
        name: '',
        phone: '+380',
        service: initialSvc,
        transport: initialTrp,
        address: '',
        date: todayStr,
        time: '12:00',
        description: initialDesc
      });
      setErrors({});
      setStatus({ loading: false, success: false, error: '' });
    }
  }, [isOpen, initialService, initialContextState, todayStr]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      const updated = { ...prev, [name]: value };
      if (name === 'service') {
        const isCalcComment = prev.description && (prev.description.includes('РОЗРАХУНОК З КАЛЬКУЛЯТОРА') || prev.description.includes('Калькулятор:'));
        if (!isCalcComment) {
          updated.description = getDefaultCommentForService(value);
        }
      }
      return updated;
    });

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

    const payload = {
      name: formData.name,
      phone: formData.phone,
      service: `${formData.service} (${selectedServiceObj.price})`,
      category: `${formData.service} (${selectedServiceObj.price})`,
      transport: `${formData.transport} (${selectedTransportObj.price})`,
      car: `${formData.transport} (${selectedTransportObj.price})`,
      address: formData.address || 'Не вказано (Львів)',
      date: formData.date,
      time: formData.time,
      description: formData.description || 'Без додаткових приміток',
      comments: formData.description || 'Без додаткових приміток'
    };

    try {
      // 1. Send via Vercel Serverless Function endpoint /api/send-order
      const serverlessRes = await fetch('/api/send-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      }).catch(() => null);

      if (serverlessRes && serverlessRes.ok) {
        setStatus({ loading: false, success: true, error: '' });
        return;
      }

      // 2. Direct Telegram Bot API fallback if configured on client side
      if (siteConfig.telegramBot.enabled && siteConfig.telegramBot.botToken !== "YOUR_TELEGRAM_BOT_TOKEN_HERE") {
        const messageText = `
📦 **НОВЕ ЗАМОВЛЕННЯ (SMART MOVING ЛЬВІВ)**
👤 **Ім'я:** ${formData.name}
📞 **Телефон:** ${formData.phone}
🛠 **Послуга:** ${formData.service} (${selectedServiceObj.price})
🚚 **Транспорт:** ${formData.transport} (${selectedTransportObj.price})
📍 **Адреса:** ${formData.address || 'Не вказано (Львів)'}
📅 **Дата:** ${formData.date}
⏰ **Час:** ${formData.time}

📝 **КОМЕНТАР ТА РОЗРАХУНОК:**
${formData.description || 'Без додаткових приміток'}
        `.trim();

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
        ).catch(() => null);
      }

      setTimeout(() => {
        setStatus({ loading: false, success: true, error: '' });
      }, 300);
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

        {/* Modal Body */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-4">
          
          {status.success ? (
            /* Success State */
            <div className="py-6 text-center space-y-5">
              <div className="w-16 h-16 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto border border-emerald-500/30">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              
              <div className="space-y-2">
                <h4 className="text-2xl font-black text-white font-outfit">Заявку прийнято!</h4>
                <p className="text-xs sm:text-sm text-slate-300 max-w-md mx-auto">
                  Дякуємо, <strong className="text-white">{formData.name}</strong>! Диспетчер зателефонує вам на <strong className="text-amber-400">{formData.phone}</strong> протягом <span className="text-amber-400 font-bold">5 хвилин</span>.
                </p>
              </div>

              {/* Order Summary Badge */}
              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 text-left space-y-2 text-xs">
                <div className="flex items-center justify-between text-slate-400 border-b border-slate-800/80 pb-2">
                  <span>Обрана послуга:</span>
                  <span className="font-bold text-amber-400">{formData.service} ({selectedServiceObj.price})</span>
                </div>
                <div className="flex items-center justify-between text-slate-400">
                  <span>Вантажне авто:</span>
                  <span className="font-bold text-emerald-400">{formData.transport}</span>
                </div>
              </div>

              {/* Direct Messenger Buttons */}
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
              
              {/* Context Summary Header */}
              <div className="bg-gradient-to-r from-amber-500/15 via-slate-950 to-slate-950 p-3.5 rounded-2xl border border-amber-500/30 space-y-2">
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
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white font-medium focus:outline-none focus:border-amber-500 transition-colors"
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
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white font-medium focus:outline-none focus:border-amber-500 transition-colors"
                >
                  {siteConfig.transportOptions.map((t) => (
                    <option key={t.id} value={t.title}>
                      {t.title} — ({t.price})
                    </option>
                  ))}
                </select>
              </div>

              {/* Name & Phone Input */}
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
                      placeholder="Наприклад: Тарас"
                      value={formData.name}
                      onChange={handleChange}
                      className={`w-full bg-slate-950 border ${
                        errors.name ? 'border-rose-500 focus:border-rose-400' : 'border-slate-800 focus:border-amber-500'
                      } rounded-xl pl-9 pr-3 py-2.5 text-xs sm:text-sm text-white placeholder-slate-600 focus:outline-none transition-colors`}
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

              {/* Native Date & Time Pickers */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
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
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-amber-500 transition-colors"
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
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-amber-500 transition-colors"
                  />
                </div>
              </div>

              {/* Description / Auto-inserted Template Comment */}
              <div>
                <label className="flex items-center justify-between text-xs font-semibold text-slate-300 mb-1">
                  <span>Опис / Коментар до замовлення</span>
                  <span className="text-[10px] text-amber-400 font-bold">Розрахунок заповнено</span>
                </label>
                <textarea
                  name="description"
                  rows="5"
                  placeholder="Опишіть ваше завдання..."
                  value={formData.description}
                  onChange={handleChange}
                  className="w-full bg-slate-950 border border-amber-500/40 rounded-xl p-3 text-xs sm:text-sm text-white placeholder-slate-600 focus:outline-none focus:border-amber-500 transition-colors resize-none font-mono leading-relaxed"
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
