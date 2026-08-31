import React, { useState, useEffect } from 'react';

export default function PhoneInputCustom({ value, onChange, error, required = true }) {
  const [digits, setDigits] = useState('');

  // Extract national 9 digits from +380XXXXXXXXX or raw digits
  useEffect(() => {
    if (value) {
      let raw = value.replace(/[^\d]/g, '');
      if (raw.startsWith('380')) raw = raw.slice(3);
      else if (raw.startsWith('0')) raw = raw.slice(1);
      setDigits(raw.slice(0, 9));
    }
  }, []);

  const formatDisplay = (numDigits) => {
    let result = '+380 ';
    if (numDigits.length > 0) result += '(' + numDigits.slice(0, 2);
    if (numDigits.length >= 2) result += ') ';
    if (numDigits.length > 2) result += numDigits.slice(2, 5);
    if (numDigits.length >= 5) result += '-' + numDigits.slice(5, 7);
    if (numDigits.length >= 7) result += '-' + numDigits.slice(7, 9);
    return result;
  };

  const handleInputChange = (e) => {
    const inputVal = e.target.value;
    // Extract only digits
    let cleaned = inputVal.replace(/[^\d]/g, '');
    if (cleaned.startsWith('380')) cleaned = cleaned.slice(3);
    else if (cleaned.startsWith('0') && cleaned.length > 9) cleaned = cleaned.slice(1);
    
    const sliced = cleaned.slice(0, 9);
    setDigits(sliced);

    // Pass formatted full international phone string to form
    const fullPhone = sliced.length > 0 ? `+380${sliced}` : '';
    onChange(fullPhone);
  };

  return (
    <div className="space-y-1">
      <div className="relative flex items-center">
        {/* Fixed Ukrainian Flag Badge */}
        <div className="absolute left-3 flex items-center gap-1.5 pointer-events-none select-none text-xs font-bold text-slate-300">
          <span className="text-base leading-none">🇺🇦</span>
          <span className="text-amber-400 font-extrabold">+380</span>
        </div>

        <input
          type="tel"
          required={required}
          placeholder="(99) 082-14-75"
          value={formatDisplay(digits) === '+380 ' ? '' : formatDisplay(digits).replace('+380 ', '')}
          onChange={handleInputChange}
          className={`w-full bg-slate-950 border ${
            error ? 'border-rose-500 focus:border-rose-400' : 'border-slate-800 focus:border-amber-500'
          } rounded-xl pl-20 pr-3 py-2.5 text-xs sm:text-sm text-white placeholder-slate-600 font-medium focus:outline-none transition-colors tracking-wide`}
        />
      </div>

      {error && <p className="text-[11px] text-rose-400 font-semibold pl-1">{error}</p>}
    </div>
  );
}
