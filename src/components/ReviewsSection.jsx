import React from 'react';
import { Star, Quote, CheckCircle, ThumbsUp } from 'lucide-react';

export default function ReviewsSection() {
  const reviews = [
    {
      id: 1,
      name: "Андрій Ковальчук",
      role: "Квартирний переїзд (вул. Стрийська)",
      rating: 5,
      date: "Вчора",
      text: "Замовляв 2 вантажників і бус для квартирного переїзду. Запізнень не було, приїхали рівно о 10:00. Працювали дуже швидко, диван та шафу розібрали й зібрали без жодної подряпини. Рекомендую!",
      badge: "Перевірене замовлення"
    },
    {
      id: 2,
      name: "Олена Мартинюк",
      role: "Офісний переїзд БЦ «Сихів»",
      rating: 5,
      date: "3 дні тому",
      text: "Потрібно було терміново перевезти офісні меблі та 4 великих сейфи. Бригада зі спеціальними такелажними пасами впоралася бездоганно. Ціна відповідала попередньому розрахунку.",
      badge: "Офісний переїзд"
    },
    {
      id: 3,
      name: "Володимир",
      role: "Перевезення верстата (Такелаж)",
      rating: 5,
      date: "Тиждень тому",
      text: "Дуже вдячний хлопцям! Важкий верстат 1.2 тонни занесли в цех без пошкоджень підлоги. Використовували роклу та гідроборт. Справжні професіонали своєї справи.",
      badge: "Важкий такелаж"
    }
  ];

  return (
    <section className="py-20 bg-slate-900/60 relative">
      <div className="max-w-7xl mx-auto px-4">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 bg-amber-500/10 border border-amber-500/20 px-3 py-1 rounded-full text-amber-400 text-xs font-bold">
            <Star className="w-3.5 h-3.5 fill-amber-400" />
            <span>Середня оцінка 4.98 / 5.0 (Понад 450 відгуків)</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white font-outfit uppercase">
            ВІДГУКИ <span className="text-gradient-amber">КЛІЄНТІВ</span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base">
            Що кажуть про нас мешканці та бізнес Львова після виконання робіт.
          </p>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((rev) => (
            <div
              key={rev.id}
              className="bg-slate-950 border border-slate-800 rounded-3xl p-6 sm:p-8 flex flex-col justify-between space-y-6 relative hover:border-amber-500/40 transition-all duration-300 shadow-xl"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-amber-400">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400" />
                    ))}
                  </div>
                  <span className="text-[10px] text-slate-500 font-semibold">{rev.date}</span>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed italic">
                  "{rev.text}"
                </p>
              </div>

              <div className="pt-4 border-t border-slate-900 flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-bold text-white font-outfit">{rev.name}</h4>
                  <p className="text-[11px] text-slate-400 mt-0.5">{rev.role}</p>
                </div>
                <span className="text-[10px] bg-emerald-500/10 text-emerald-400 font-bold px-2 py-0.5 rounded border border-emerald-500/20">
                  {rev.badge}
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
