import React, { useState } from 'react';
import { siteConfig } from '../config/siteConfig';
import { X, Calculator, Truck, Users, Clock, ArrowUpCircle, Check } from 'lucide-react';

export default function CostCalculatorModal({ isOpen, onClose, onApplyCalculation }) {
  const [numLoaders, setNumLoaders] = useState(2);
  const [hours, setHours] = useState(2);
  const [vehicle, setVehicle] = useState('bus'); // 'none', 'bus', 'hydroboard', 'truck'
  const [hasElevator, setHasElevator] = useState(true);
  const [floors, setFloors] = useState(1);

  if (!isOpen) return null;

  // Rate calculations
  const loaderHourlyRate = 350;
  const vehicleRates = {
    none: 0,
    bus: 450,        // 1.5t bus
    hydroboard: 650, // 3t hydroboard
    truck: 850       // 5t truck
  };

  const loaderTotal = numLoaders * Math.max(2, hours) * loaderHourlyRate;
  const transportTotal = vehicleRates[vehicle] * (vehicle === 'none' ? 0 : Math.max(2, hours));
  const floorFee = !hasElevator && floors > 1 ? (floors - 1) * 50 * numLoaders : 0;
  const estimatedTotal = loaderTotal + transportTotal + floorFee;

  const handleBookWithCalculation = () => {
    const summaryText = `${numLoaders} вантажники, ${hours} год, авто: ${vehicle}, поверх: ${floors}`;
    onApplyCalculation(summaryText);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-xl bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="bg-gradient-to-r from-amber-500/20 via-slate-900 to-slate-900 p-5 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <Calculator className="w-5 h-5" />
            </div>
            <div>
              <span className="text-amber-400 font-bold text-xs uppercase tracking-wider">Калькулятор 24/7</span>
              <h3 className="text-xl font-extrabold text-white font-outfit">Калькулятор вартості</h3>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 overflow-y-auto space-y-5">
          {/* Number of Loaders */}
          <div>
            <label className="flex items-center justify-between text-xs font-semibold text-slate-300 mb-2">
              <span className="flex items-center gap-1.5">
                <Users className="w-4 h-4 text-amber-400" /> Кількість вантажників:
              </span>
              <span className="text-amber-400 font-bold text-sm">{numLoaders} чол.</span>
            </label>
            <div className="grid grid-cols-5 gap-2">
              {[1, 2, 3, 4, 6].map((count) => (
                <button
                  key={count}
                  type="button"
                  onClick={() => setNumLoaders(count)}
                  className={`py-2 rounded-xl text-xs font-bold border transition-all ${
                    numLoaders === count
                      ? 'bg-amber-500 text-slate-950 border-amber-400 shadow-md shadow-amber-500/20'
                      : 'bg-slate-950 text-slate-300 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  {count} {count === 1 ? 'чол' : 'чол'}
                </button>
              ))}
            </div>
          </div>

          {/* Number of Hours */}
          <div>
            <label className="flex items-center justify-between text-xs font-semibold text-slate-300 mb-2">
              <span className="flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-amber-400" /> Орієнтовна тривалість (мін. 2 год):
              </span>
              <span className="text-amber-400 font-bold text-sm">{hours} год</span>
            </label>
            <input
              type="range"
              min="2"
              max="10"
              step="1"
              value={hours}
              onChange={(e) => setHours(Number(e.target.value))}
              className="w-full accent-amber-500 bg-slate-950 rounded-lg cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-500 px-1 mt-1">
              <span>2 год</span>
              <span>4 год</span>
              <span>6 год</span>
              <span>8 год</span>
              <span>10+ год</span>
            </div>
          </div>

          {/* Vehicle Type */}
          <div>
            <label className="flex items-center gap-1.5 text-xs font-semibold text-slate-300 mb-2">
              <Truck className="w-4 h-4 text-amber-400" /> Потрібен вантажний транспорт:
            </label>
            <div className="grid grid-cols-2 gap-2">
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
                  className={`p-3 rounded-xl text-left border transition-all ${
                    vehicle === v.id
                      ? 'bg-amber-500/10 border-amber-500 text-white'
                      : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
                  }`}
                >
                  <p className="text-xs font-bold">{v.label}</p>
                  <p className="text-[10px] text-amber-400 mt-0.5">{v.price}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Floor Lifting */}
          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                <ArrowUpCircle className="w-4 h-4 text-amber-400" /> Наявність вантажного ліфта:
              </span>
              <button
                type="button"
                onClick={() => setHasElevator(!hasElevator)}
                className={`px-3 py-1 rounded-lg text-xs font-bold border transition-colors ${
                  hasElevator
                    ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30'
                    : 'bg-rose-500/20 text-rose-400 border-rose-500/30'
                }`}
              >
                {hasElevator ? 'Є ліфт' : 'Немає ліфта (пішки)'}
              </button>
            </div>

            {!hasElevator && (
              <div className="pt-2 border-t border-slate-800 flex items-center justify-between">
                <span className="text-xs text-slate-400">Поверх занесення:</span>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setFloors(Math.max(1, floors - 1))}
                    className="w-7 h-7 bg-slate-900 border border-slate-700 rounded-lg text-white font-bold"
                  >
                    -
                  </button>
                  <span className="text-xs font-bold text-amber-400 w-6 text-center">{floors}</span>
                  <button
                    type="button"
                    onClick={() => setFloors(floors + 1)}
                    className="w-7 h-7 bg-slate-900 border border-slate-700 rounded-lg text-white font-bold"
                  >
                    +
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Estimated Total Display */}
          <div className="bg-gradient-to-br from-amber-500/20 to-amber-600/10 p-4 rounded-xl border border-amber-500/30 flex items-center justify-between">
            <div>
              <p className="text-xs text-slate-400 font-medium">Орієнтовна вартість:</p>
              <p className="text-2xl font-black text-amber-400 font-outfit">
                від {estimatedTotal} <span className="text-sm font-bold text-white">грн</span>
              </p>
              <p className="text-[10px] text-slate-400 mt-0.5">Точний розрахунок фіксується з диспетчером</p>
            </div>

            <button
              onClick={handleBookWithCalculation}
              className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs uppercase tracking-wider px-4 py-3 rounded-xl shadow-lg shadow-amber-500/20 active:scale-95 transition-transform"
            >
              Замовити з цим розрахунком
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
