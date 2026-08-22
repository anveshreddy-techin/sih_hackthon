import React, { useState } from 'react';
import {
  TrendingUp,
  ShieldCheck,
  Calculator,
  Droplets,
  ArrowUpRight,
  ArrowDownRight,
  Search,
  Sparkles
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { useLanguage } from '../context/LanguageContext';

export const PriceBoard: React.FC = () => {
  const { mspCatalog } = useApp();
  const { lang, t } = useLanguage();

  const [search, setSearch] = useState<string>('');
  const [calcCropId, setCalcCropId] = useState<string>('paddy-grade-a');
  const [calcQty, setCalcQty] = useState<string>('50');

  const filteredCrops = mspCatalog.filter((c) => {
    const q = search.toLowerCase();
    return (
      c.name.toLowerCase().includes(q) ||
      (c.name_te && c.name_te.toLowerCase().includes(q)) ||
      (c.name_hi && c.name_hi.toLowerCase().includes(q)) ||
      c.category.toLowerCase().includes(q)
    );
  });

  const selectedCrop = mspCatalog.find((c) => c.id === calcCropId) || mspCatalog[0];
  const qty = parseFloat(calcQty) || 0;
  const stateBonus = selectedCrop?.id.includes('paddy') ? 500 : selectedCrop?.id.includes('chilli') ? 1000 : 0;
  const mspTotal = qty * (selectedCrop ? selectedCrop.msp : 0);
  const bonusTotal = qty * stateBonus;
  const grandTotal = mspTotal + bonusTotal;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-8 animate-fadeIn">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-agri-950 to-slate-900 rounded-3xl p-6 sm:p-8 text-white relative overflow-hidden shadow-lg">
        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-agri-500/20 text-agri-300 text-xs font-bold uppercase tracking-wider mb-2 border border-agri-500/30">
            <ShieldCheck className="w-4 h-4 text-agri-400" />
            <span>Government Minimum Support Price (MSP) 2026</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-black tracking-tight">
            {lang === 'te'
              ? 'కనీస మద్దతు ధరల పట్టిక & బోనస్ వివరాలు'
              : lang === 'hi'
              ? 'न्यूनतम समर्थन मूल्य (MSP) एवं बोनस सूची'
              : 'Live MSP Price Board & Government Incentives'}
          </h2>

          <p className="text-xs sm:text-sm text-slate-300 mt-2 leading-relaxed">
            Guaranteed floor prices fixed by the Commission for Agricultural Costs and Prices (CACP) with direct DBT payment to farmer accounts within 48 hours.
          </p>
        </div>

        {/* Decorative background shape */}
        <div className="absolute -right-12 -bottom-12 w-64 h-64 rounded-full bg-agri-500/10 blur-2xl" />
      </div>

      {/* Interactive Revenue & Bonus Calculator Widget */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
        <div className="flex items-center justify-between border-b pb-3">
          <div className="flex items-center space-x-2">
            <div className="p-2 rounded-xl bg-agri-50 text-agri-700">
              <Calculator className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-extrabold text-slate-900 text-base">
                Smart Farmer Revenue & Bonus Calculator
              </h3>
              <p className="text-xs text-slate-500">
                Calculate total MSP payout + state procurement bonus for your crop lot
              </p>
            </div>
          </div>
          <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800">
            100% DBT Transfer
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
              Select Crop
            </label>
            <select
              value={calcCropId}
              onChange={(e) => setCalcCropId(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm font-semibold bg-slate-50 focus:ring-2 focus:ring-agri-500 focus:outline-none"
            >
              {mspCatalog.map((crop) => (
                <option key={crop.id} value={crop.id}>
                  {crop.icon} {lang === 'te' ? crop.name_te : crop.name} (MSP: ₹{crop.msp})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
              Quantity (Quintals / క్వింటాళ్లు)
            </label>
            <input
              type="number"
              min="1"
              max="1000"
              value={calcQty}
              onChange={(e) => setCalcQty(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm font-bold bg-slate-50 focus:ring-2 focus:ring-agri-500 focus:outline-none"
              placeholder="e.g. 50"
            />
          </div>

          <div className="p-4 rounded-2xl bg-gradient-to-tr from-agri-50 to-emerald-50 border border-agri-200 flex flex-col justify-between">
            <div className="flex items-center justify-between text-xs text-slate-600 font-medium">
              <span>MSP Base: ₹{mspTotal.toLocaleString()}</span>
              {bonusTotal > 0 && <span className="text-amber-800 font-bold">+ Bonus: ₹{bonusTotal.toLocaleString()}</span>}
            </div>
            <div className="flex items-center justify-between mt-1">
              <span className="text-xs font-bold uppercase text-slate-800">Total Payout:</span>
              <span className="text-xl font-black text-emerald-800 font-mono">
                ₹{grandTotal.toLocaleString()}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Search Filter for Price Table */}
      <div className="flex items-center justify-between gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search crop by name, category, or variety..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-agri-500 shadow-xs"
          />
        </div>

        <span className="text-xs font-bold text-slate-500 hidden sm:inline">
          Showing {filteredCrops.length} Commodities
        </span>
      </div>

      {/* Comprehensive Price Catalog Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredCrops.map((crop) => {
          const cropTitle =
            lang === 'te' && crop.name_te
              ? crop.name_te
              : lang === 'hi' && crop.name_hi
              ? crop.name_hi
              : crop.name;

          const isMspHigher = crop.msp >= crop.marketAvg;

          return (
            <div
              key={crop.id}
              className="bg-white rounded-3xl p-5 border border-slate-200 shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between gap-2 mb-2">
                  <span className="text-3xl">{crop.icon}</span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 uppercase">
                    {crop.season}
                  </span>
                </div>

                <h3 className="font-extrabold text-base text-slate-900 leading-snug">
                  {cropTitle}
                </h3>
                <span className="text-xs font-medium text-slate-400">
                  {crop.category} • Per {crop.unit}
                </span>

                {/* Rates Comparison */}
                <div className="grid grid-cols-2 gap-3 mt-4 pt-3 border-t border-slate-100">
                  <div className="p-3 rounded-2xl bg-emerald-50/80 border border-emerald-200">
                    <span className="text-[10px] font-bold text-emerald-800 uppercase tracking-wider block">
                      Govt MSP Rate
                    </span>
                    <div className="text-lg font-black text-emerald-900 font-mono mt-0.5">
                      ₹{crop.msp.toLocaleString()}
                    </div>
                  </div>

                  <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200">
                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">
                      Market Average
                    </span>
                    <div className="text-lg font-bold text-slate-700 font-mono mt-0.5">
                      ₹{crop.marketAvg.toLocaleString()}
                    </div>
                  </div>
                </div>
              </div>

              {/* Moisture & Trend info */}
              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                <div className="flex items-center space-x-1 text-slate-600 font-medium">
                  <Droplets className="w-3.5 h-3.5 text-blue-500" />
                  <span>Max Moisture: &le;{crop.maxMoisture}%</span>
                </div>

                <div className="flex items-center space-x-1 text-emerald-700 font-bold">
                  <ArrowUpRight className="w-3.5 h-3.5" />
                  <span>{crop.priceTrend}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
