import React, { useState } from 'react';
import { siteConfig } from '../config/siteConfig';
import { Calculator, Users, Clock, Truck, ArrowUpCircle, ArrowRight, ShieldCheck, Check, Tag } from 'lucide-react';

export default function CostCalculatorInline({ onApplyCalculation }) {
  const [workType, setWorkType] = useState('loaders'); // 'loaders', 'handymen', 'demolition', 'rigging'
  const [numLoaders, setNumLoaders] = useState(2);
  const [hours, setHours] = useState(2);
  const [vehicle, setVehicle] = useState('bus'); // 'none', 'bus', 'hydroboard', 'truck'
  const [hasElevator, setHasElevator] = useState(true);
  const [floors, setFloors] = useState(1);

  // Work type hourly rates per person
  const workTypeRates = {
    loaders: { label: 'Вантажники & Переїзд', rate: 350, serviceName: 'Вантажники Львів' },
    handymen: { label: 'Підсобні & Складські роботи', rate: 350, serviceName: 'Складські роботи' },
    demolition: { label: 'Демонтажні роботи', rate: 400, serviceName: 'Демонтажні роботи' },
    rigging: { label: 'Такелажні роботи (Сейфи/Обладнання)', rate: 500, serviceName: 'Такелажні роботи' },
  };

  const currentWorkType = workTypeRates[workType] || workTypeRates.loaders;

  // Vehicle rates
  const vehicleRates = {
    none: 0,
    bus: 450,        // 1.5t - 2t
    hydroboard: 650, // 3t hydroboard
    truck: 850       // 5t truck
  };

  const loaderTotal = numLoaders * Math.max(2, hours) * currentWorkType.rate;
  const transportTotal = vehicleRates[vehicle] * (vehicle === 'none' ? 0 : Math.max(2, hours));
  const floorFee = !hasElevator && floors > 1 ? (floors - 1) * 50 * numLoaders : 0;
  const estimatedTotal = loaderTotal + transportTotal + floorFee;

  const handleBookWithCalculation = () => {
    const vehicleMap = {
      none: "Без автомобіля (тільки вантажники)",
      bus: "Вантажний бус / Газель (1.5 - 2т)",
      hydroboard: "Бус з ГІДРОБОРТОМ (3т)",
      truck: "Вантажівка 5 тонн (35-40 м³)"
    };

    const vehicleTitle = vehicleMap[vehicle] || siteConfig.transportOptions[0].title;
    const elevatorText = hasElevator ? 'Є вантажний ліфт' : `Немає ліфта (${floors} поверх)`;

    const detailedComment = `🧮 РОЗРАХУНОК З КАЛЬКУЛЯТОРА:
• Вид робіт: ${currentWorkType.label} (${currentWorkType.rate} грн/год за чол)
• Кількість працівників: ${numLoaders} чол. на ${hours} год
• Вантажний транспорт: ${vehicleTitle}
• Умови підйому: ${elevatorText}
💰 Розрахункова сума: від ${estimatedTotal} грн`.trim();

    onApplyCalculation({
      service: currentWorkType.serviceName,
      transport: vehicleTitle,
      summary: detailedComment,
      estimatedTotal
    });
  };

  return (
    <section id="calculator" className="py-16 bg-slate-900/90 relative overflow-hidden border-y border-slate-800">
      <div className="max-w-5xl mx-auto px-4">
        
        {/* Header */}
        <div className="text-center space-y-3 mb-10">
          <span className="text-amber-400 font-bold text-xs uppercase tracking-widest bg-amber-500/10 border border-amber-500/20 px-3.5 py-1 rounded-full inline-flex items-center gap-1.5">
            <Calculator className="w-3.5 h-3.5" /> Онлайн-Розрахунок за Тарифами
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-white font-outfit uppercase">
            КАЛЬКУЛЯТОР ВАРТОСТІ <span className="text-gradient-amber">ПОСЛУГ</span>
          </h2>
          <p className="text-slate-400 text-sm max-w-xl mx-auto">
            Оберіть конкретний вид робіт та параметри замовлення для розрахунку реальної вартості.
          </p>
        </div>

        {/* Interactive Calculator Box */}
        <div className="bg-slate-950 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-8">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* Left Options */}
            <div className="space-y-6">
              
              {/* Work Type Selector */}
              <div>
                <label className="flex items-center justify-between text-xs font-bold text-slate-300 mb-2.5">
                  <span className="flex items-center gap-2">
                    <Tag className="w-4 h-4 text-amber-400" /> Оберіть вид робіт:
                  </span>
                  <span className="text-amber-400 text-xs font-bold">{currentWorkType.rate} грн/год</span>
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {Object.entries(workTypeRates).map(([key, val]) => (
                    <button
                      key={key}
                      type="button"
                      onClick={() => setWorkType(key)}
                      className={`p-3 rounded-2xl text-left border transition-all ${
                        workType === key
                          ? 'bg-amber-500/20 border-amber-500 text-white shadow-md shadow-amber-500/10'
                          : 'bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700'
                      }`}
                    >
                      <p className="text-xs font-bold">{val.label}</p>
                      <p className="text-[10px] text-amber-400 mt-0.5">{val.rate} грн/год</p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Loaders Selection */}
              <div>
                <label className="flex items-center justify-between text-xs font-bold text-slate-300 mb-2.5">
                  <span className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-amber-400" /> Кількість працівників:
                  </span>
                  <span className="text-amber-400 text-sm font-black">{numLoaders} чол.</span>
                </label>
                <div className="grid grid-cols-5 gap-2">
                  {[1, 2, 3, 4, 6].map((count) => (
                    <button
                      key={count}
                      type="button"
                      onClick={() => setNumLoaders(count)}
                      className={`py-2.5 rounded-xl text-xs font-extrabold border transition-all ${
                        numLoaders === count
                          ? 'bg-amber-500 text-slate-950 border-amber-400 shadow-lg shadow-amber-500/20'
                          : 'bg-slate-900 text-slate-300 border-slate-800 hover:border-slate-700'
                      }`}
                    >
                      {count} чол
                    </button>
                  ))}
                </div>
              </div>

              {/* Hours Slider */}
              <div>
                <label className="flex items-center justify-between text-xs font-bold text-slate-300 mb-2.5">
                  <span className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-amber-400" /> Тривалість замовлення (мін. 2 год):
                  </span>
                  <span className="text-amber-400 text-sm font-black">{hours} год</span>
                </label>
                <input
                  type="range"
                  min="2"
                  max="10"
                  step="1"
                  value={hours}
                  onChange={(e) => setHours(Number(e.target.value))}
                  className="w-full accent-amber-500 bg-slate-900 h-2.5 rounded-lg cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-slate-500 px-1 mt-1 font-semibold">
                  <span>2 год (мін)</span>
                  <span>4 год</span>
                  <span>6 год</span>
                  <span>8+ год</span>
                </div>
              </div>

              {/* Elevator / Floor */}
              <div className="bg-slate-900 p-4 rounded-2xl border border-slate-800 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-300 flex items-center gap-2">
                    <ArrowUpCircle className="w-4 h-4 text-amber-400" /> Наявність ліфта:
                  </span>
                  <button
                    type="button"
                    onClick={() => setHasElevator(!hasElevator)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-colors ${
                      hasElevator
                        ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30'
                        : 'bg-rose-500/20 text-rose-400 border-rose-500/30'
                    }`}
                  >
                    {hasElevator ? 'Є ліфт' : 'Немає ліфта'}
                  </button>
                </div>

                {!hasElevator && (
                  <div className="pt-2 border-t border-slate-800 flex items-center justify-between">
                    <span className="text-xs text-slate-400">Поверх пішого підйому:</span>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => setFloors(Math.max(1, floors - 1))}
                        className="w-8 h-8 bg-slate-950 border border-slate-700 rounded-lg text-white font-bold"
                      >
                        -
                      </button>
                      <span className="text-sm font-extrabold text-amber-400 w-6 text-center">{floors}</span>
                      <button
                        type="button"
                        onClick={() => setFloors(floors + 1)}
                        className="w-8 h-8 bg-slate-950 border border-slate-700 rounded-lg text-white font-bold"
                      >
                        +
                      </button>
                    </div>
                  </div>
                )}
              </div>

            </div>

            {/* Right Vehicle Options */}
            <div className="space-y-4">
              <label className="flex items-center gap-2 text-xs font-bold text-slate-300">
                <Truck className="w-4 h-4 text-amber-400" /> Оберіть вантажне авто:
              </label>

              <div className="space-y-2.5">
                {[
                  { id: 'none', label: 'Без авто (тільки вантажники)', price: '0 грн/год' },
                  { id: 'bus', label: 'Вантажний бус / Газель (1.5 - 2т)', price: 'від 450 грн/год' },
                  { id: 'hydroboard', label: 'Бус з ГІДРОБОРТОМ (3т)', price: 'від 650 грн/год' },
                  { id: 'truck', label: 'Вантажівка 5 тонн (35-40 м³)', price: 'від 850 грн/год' },
                ].map((v) => (
                  <button
                    key={v.id}
                    type="button"
                    onClick={() => setVehicle(v.id)}
                    className={`w-full p-3.5 rounded-2xl text-left border transition-all flex items-center justify-between ${
                      vehicle === v.id
                        ? 'bg-amber-500/15 border-amber-500 text-white shadow-md shadow-amber-500/10'
                        : 'bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700'
                    }`}
                  >
                    <div>
                      <p className="text-xs font-bold text-slate-200">{v.label}</p>
                      <p className="text-[11px] text-amber-400 mt-0.5">{v.price}</p>
                    </div>
                    {vehicle === v.id && (
                      <div className="w-5 h-5 rounded-full bg-amber-500 text-slate-950 flex items-center justify-center">
                        <Check className="w-3.5 h-3.5 stroke-[3]" />
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>

          </div>

          {/* Result Calculation Banner */}
          <div className="bg-gradient-to-r from-amber-500/20 via-amber-500/10 to-transparent p-6 rounded-2xl border border-amber-500/30 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="text-center sm:text-left space-y-1">
              <span className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Розрахована сума:</span>
              <div className="flex items-baseline justify-center sm:justify-start gap-2">
                <span className="text-3xl sm:text-4xl font-black text-amber-400 font-outfit">
                  від {estimatedTotal}
                </span>
                <span className="text-lg font-bold text-white">грн</span>
              </div>
              <p className="text-[11px] text-slate-400">
                {currentWorkType.label} ({numLoaders} чол × {hours} год @ {currentWorkType.rate} грн/год)
              </p>
            </div>

            <button
              onClick={handleBookWithCalculation}
              className="w-full sm:w-auto bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black text-sm uppercase tracking-wider py-4 px-8 rounded-xl shadow-xl shadow-amber-500/25 flex items-center justify-center gap-2 transition-all hover:scale-105 active:scale-95 whitespace-nowrap"
            >
              Замовити з цим розрахунком <ArrowRight className="w-4 h-4 stroke-[2.5]" />
            </button>
          </div>

        </div>

      </div>
    </section>
  );
}
