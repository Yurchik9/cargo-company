import React, { useState } from 'react';
import loadersWorkingImg from '../assets/images/loaders_working.png';
import truckLoadingImg from '../assets/images/truck_loading.png';
import apartmentMovingImg from '../assets/images/apartment_moving.png';
import heavyRiggingImg from '../assets/images/heavy_rigging.png';
import { Camera, Eye, X, CheckCircle2 } from 'lucide-react';

export default function PortfolioSection() {
  const [activeImage, setActiveImage] = useState(null);

  const portfolioItems = [
    {
      id: 1,
      title: "Перенесення обладнання на пасах",
      category: "Такелаж & Вантажники",
      desc: "Професійні вантажники в уніформі несуть важкий сейф/техніку за допомогою спеціальних такелажних ременів.",
      image: loadersWorkingImg,
      badge: "Вантажники на пасах"
    },
    {
      id: 2,
      title: "Завантаження автомобіля з гідробортом",
      category: "Вантажні перевезення",
      desc: "Завантаження палетованого вантажу та побутової техніки в чистий кузов за допомогою рокли та гідроборта.",
      image: truckLoadingImg,
      badge: "Гідроборт & Рокла"
    },
    {
      id: 3,
      title: "Квартирний переїзд та занесення меблів",
      category: "Квартирний переїзд",
      desc: "Занесення м'яких меблів та побутової техніки у захисній плівці по сходових маршах без пошкодження стін.",
      image: apartmentMovingImg,
      badge: "Пакування & Сходи"
    },
    {
      id: 4,
      title: "Промисловий такелаж та верстати",
      category: "Такелажні роботи",
      desc: "Переміщення та транспортування важкого поліграфічного та медичного обладнання масою понад 3 тонни.",
      image: heavyRiggingImg,
      badge: "Важкий такелаж"
    }
  ];

  return (
    <section id="portfolio" className="py-20 bg-slate-900/80 relative">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <span className="text-amber-400 font-bold text-xs uppercase tracking-widest bg-amber-500/10 border border-amber-500/20 px-3 py-1 rounded-full flex items-center gap-1.5 w-fit mx-auto">
            <Camera className="w-3.5 h-3.5" /> Фотозвіт об'єктів
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white font-outfit uppercase">
            НАШІ РОБОТИ ТА <span className="text-gradient-amber">ПРОЦЕС РОБОТИ</span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base">
            Реальні фотографії з наших викликів: завантаження авто, такелажні роботи на пасах, складські та переїзди.
          </p>
        </div>

        {/* Portfolio Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {portfolioItems.map((item) => (
            <div
              key={item.id}
              onClick={() => setActiveImage(item)}
              className="group relative bg-slate-950 rounded-3xl overflow-hidden border border-slate-800 shadow-xl cursor-pointer hover:border-amber-500/50 transition-all duration-500"
            >
              <div className="relative h-72 sm:h-80 overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent opacity-90 group-hover:opacity-75 transition-opacity" />

                {/* Badge */}
                <div className="absolute top-4 left-4 bg-amber-500/90 text-slate-950 font-bold text-[10px] uppercase tracking-wider px-3 py-1 rounded-full shadow-lg">
                  {item.badge}
                </div>

                {/* Hover Eye Icon */}
                <div className="absolute top-4 right-4 w-10 h-10 rounded-full bg-slate-950/60 text-amber-400 border border-white/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <Eye className="w-5 h-5" />
                </div>
              </div>

              {/* Caption Content */}
              <div className="p-6 space-y-2">
                <span className="text-xs text-amber-400 font-semibold">{item.category}</span>
                <h3 className="text-xl font-bold text-white font-outfit group-hover:text-amber-400 transition-colors">
                  {item.title}
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Image Lightbox Modal */}
      {activeImage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-md">
          <div className="relative max-w-4xl w-full bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl space-y-4 p-4">
            <button
              onClick={() => setActiveImage(null)}
              className="absolute top-6 right-6 z-10 p-2 text-white bg-slate-950/80 rounded-full hover:bg-amber-500 hover:text-slate-950 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
            <img
              src={activeImage.image}
              alt={activeImage.title}
              className="w-full max-h-[70vh] object-contain rounded-2xl bg-black"
            />
            <div className="p-2 space-y-1 text-left">
              <span className="text-xs font-bold text-amber-400">{activeImage.category}</span>
              <h4 className="text-xl font-bold text-white">{activeImage.title}</h4>
              <p className="text-xs text-slate-300">{activeImage.desc}</p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
