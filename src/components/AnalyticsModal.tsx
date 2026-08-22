import React from 'react';
import {
  BarChart3,
  TrendingUp,
  Package,
  Clock,
  Building2,
  Users,
  CheckCircle2,
  PieChart,
  ArrowUpRight
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { useLanguage } from '../context/LanguageContext';

export const AnalyticsView: React.FC = () => {
  const { analytics, centres } = useApp();
  const { lang, t } = useLanguage();

  if (!analytics) return null;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-8 animate-fadeIn">
      {/* Analytics Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-950 rounded-3xl p-6 sm:p-8 text-white shadow-xl">
        <div className="flex items-center space-x-2 text-agri-400 text-xs font-bold uppercase tracking-wider mb-2">
          <BarChart3 className="w-4 h-4" />
          <span>Real-time State Agri-Procurement Transparency Dashboard</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-black">
          {lang === 'te' ? 'రాష్ట్ర స్థాయి సేకరణ విశ్లేషణలు' : 'Statewide Procurement & Quota Metrics'}
        </h2>
        <p className="text-xs sm:text-sm text-slate-400 mt-1">
          Live aggregation across all Agricultural Market Committees (AMC), PACS, Markfed & CCI Godowns.
        </p>
      </div>

      {/* 4 Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {/* Total Procured */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Total Procured Today
            </span>
            <div className="p-2 rounded-xl bg-agri-50 text-agri-600">
              <Package className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-4">
            <div className="text-2xl sm:text-3xl font-black text-slate-900 font-mono">
              {analytics.totalProcuredQuintals.toLocaleString()} <span className="text-sm font-normal text-slate-500">Qtl</span>
            </div>
            <div className="flex items-center space-x-1 text-xs font-bold text-emerald-600 mt-1">
              <ArrowUpRight className="w-3.5 h-3.5" />
              <span>{analytics.procurementPercentage}% of Daily Quota Fulfilled</span>
            </div>
          </div>
        </div>

        {/* Operational Centres */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Active Centres
            </span>
            <div className="p-2 rounded-xl bg-blue-50 text-blue-600">
              <Building2 className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-4">
            <div className="text-2xl sm:text-3xl font-black text-slate-900 font-mono">
              {analytics.openCentresCount} / {analytics.totalCentres}
            </div>
            <div className="text-xs font-semibold text-slate-500 mt-1">
              {Math.round((analytics.openCentresCount / analytics.totalCentres) * 100)}% Centres Open & Weighing
            </div>
          </div>
        </div>

        {/* Live Queue Load */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Farmers in Queue
            </span>
            <div className="p-2 rounded-xl bg-amber-50 text-amber-600">
              <Users className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-4">
            <div className="text-2xl sm:text-3xl font-black text-amber-600 font-mono">
              {analytics.totalActiveTokens} <span className="text-sm font-normal text-slate-500">vehicles</span>
            </div>
            <div className="text-xs font-semibold text-slate-500 mt-1">
              Average Token Wait: ~28 Mins
            </div>
          </div>
        </div>

        {/* Funds Disbursed via DBT */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Estimated DBT Payout
            </span>
            <div className="p-2 rounded-xl bg-emerald-50 text-emerald-600">
              <TrendingUp className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-4">
            <div className="text-2xl sm:text-3xl font-black text-emerald-800 font-mono">
              ₹{((analytics.totalProcuredQuintals * 2820) / 10000000).toFixed(2)} Cr
            </div>
            <div className="text-xs font-semibold text-emerald-700 mt-1 flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>48-Hr Direct Bank Deposit</span>
            </div>
          </div>
        </div>
      </div>

      {/* Commodity-wise Breakdown Chart Simulation */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
        <h3 className="text-lg font-extrabold text-slate-900 flex items-center gap-2">
          <PieChart className="w-5 h-5 text-agri-600" />
          <span>Commodity-wise Procurement Volume Today</span>
        </h3>

        <div className="space-y-4">
          {analytics.cropStats.map((cs) => {
            const cropPercent = Math.min(
              100,
              Math.round((cs.totalProcured / (analytics.totalProcuredQuintals || 1)) * 100)
            );
            const cropTitle = lang === 'te' && cs.name_te ? cs.name_te : cs.name;

            return (
              <div key={cs.name} className="space-y-1.5">
                <div className="flex items-center justify-between text-xs font-bold text-slate-800">
                  <span>{cropTitle}</span>
                  <span className="font-mono text-slate-600">
                    {cs.totalProcured.toLocaleString()} Quintals ({cropPercent}%)
                  </span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-3 overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-agri-500 to-agri-700 rounded-full transition-all duration-500"
                    style={{ width: `${cropPercent}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
