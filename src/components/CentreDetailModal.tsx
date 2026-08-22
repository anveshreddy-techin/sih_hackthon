import React, { useState } from 'react';
import {
  X,
  MapPin,
  Clock,
  Phone,
  HelpCircle,
  Warehouse,
  Package,
  Scale,
  Droplets,
  CheckCircle2,
  AlertTriangle,
  Sparkles,
  ChevronRight,
  ShieldAlert,
  Coffee,
  Volume2
} from 'lucide-react';
import { ProcurementCentre } from '../types';
import { useLanguage } from '../context/LanguageContext';
import { useApp } from '../context/AppContext';
import { speakText } from '../utils/sound';

interface CentreDetailModalProps {
  centre: ProcurementCentre | null;
  onClose: () => void;
}

export const CentreDetailModal: React.FC<CentreDetailModalProps> = ({ centre, onClose }) => {
  const { lang, t } = useLanguage();
  const { setBookingCentre } = useApp();
  const [testMoisture, setTestMoisture] = useState<string>('15.5');

  if (!centre) return null;

  const centreName =
    lang === 'te' && centre.name_te
      ? centre.name_te
      : lang === 'hi' && centre.name_hi
      ? centre.name_hi
      : centre.name;

  const centreType =
    lang === 'te' && centre.type_te ? centre.type_te : centre.type;

  const capacityPercent = Math.round(
    (centre.facilities.occupiedCapacityQuintals / centre.facilities.storageCapacityQuintals) * 100
  );

  const moistureNum = parseFloat(testMoisture) || 0;
  const isMoistureValid = moistureNum > 0 && moistureNum <= 17.0;

  const handleSpeak = () => {
    const text = `${centreName}. Operating hours ${centre.timings.open} to ${centre.timings.close}. Current storage capacity is ${capacityPercent}% full. ${centre.facilities.gunnyBagsStock} gunny bags available. Contact officer ${centre.contact.officerName} at ${centre.contact.phone}.`;
    speakText(text, lang);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-fadeIn">
      <div className="bg-white w-full max-w-3xl rounded-3xl shadow-2xl border border-slate-200 overflow-hidden relative max-h-[92vh] flex flex-col">
        {/* Modal Header */}
        <div className="p-6 bg-gradient-to-r from-agri-900 via-agri-800 to-slate-900 text-white relative">
          <button
            onClick={onClose}
            className="absolute top-5 right-5 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center space-x-2 mb-2">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-agri-500/30 text-agri-200 border border-agri-400/40 uppercase tracking-wider">
              {centre.district} • {centre.state}
            </span>
            <button
              onClick={handleSpeak}
              className="p-1 px-2 rounded-lg bg-white/15 hover:bg-white/25 text-xs flex items-center space-x-1 cursor-pointer"
            >
              <Volume2 className="w-3.5 h-3.5" />
              <span>{t('speakStatus')}</span>
            </button>
          </div>

          <h2 className="text-xl sm:text-2xl font-extrabold pr-8 leading-tight">
            {centreName}
          </h2>
          <p className="text-xs sm:text-sm text-agri-100/90 mt-1 flex items-center gap-1.5">
            <span>{centreType}</span>
            <span>•</span>
            <span>{centre.address}</span>
          </p>
        </div>

        {/* Scrollable Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1 text-slate-800">
          {/* Quick Stats Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200">
              <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                {t('servingToken')}
              </div>
              <div className="text-xl font-black text-amber-600 font-mono mt-1">
                {centre.queue.currentlyServingToken || 'Active'}
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200">
              <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                {t('queueStatus')}
              </div>
              <div className="text-xl font-black text-slate-900 mt-1">
                {centre.queue.activeQueueCount} <span className="text-xs font-normal text-slate-500">vehicles</span>
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200">
              <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                {t('estWaitTime')}
              </div>
              <div className="text-xl font-black text-slate-900 mt-1">
                ~{centre.queue.estimatedWaitTimeMinutes} <span className="text-xs font-normal text-slate-500">mins</span>
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200">
              <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                {t('gunnyBags')}
              </div>
              <div className="text-xl font-black text-agri-700 mt-1">
                {centre.facilities.gunnyBagsStock.toLocaleString()}
              </div>
            </div>
          </div>

          {/* Operating Hours & Officer Info */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-agri-600" />
                <span>{t('operatingHours')}</span>
              </h4>
              <p className="text-sm font-bold text-slate-900">
                {centre.timings.open} - {centre.timings.close}
              </p>
              <p className="text-xs text-slate-600">
                <span className="font-semibold">{t('lunchBreakTime')}:</span> {centre.timings.lunchBreak}
              </p>
              <p className="text-xs text-slate-500">
                {centre.timings.workingDays}
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                <Phone className="w-4 h-4 text-agri-600" />
                <span>{t('officerIncharge')}</span>
              </h4>
              <p className="text-sm font-bold text-slate-900">
                {centre.contact.officerName}
              </p>
              <div className="flex items-center space-x-3 text-xs text-slate-700">
                <a
                  href={`tel:${centre.contact.phone}`}
                  className="px-2.5 py-1 rounded-lg bg-agri-100 text-agri-800 font-bold hover:bg-agri-200 transition"
                >
                  📞 {centre.contact.phone}
                </a>
                <span className="text-slate-400">|</span>
                <span>Helpline: {centre.contact.helpdesk}</span>
              </div>
            </div>
          </div>

          {/* Godown Storage Capacity Bar */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
            <div className="flex items-center justify-between text-xs font-bold text-slate-700 mb-2">
              <span className="flex items-center gap-1.5">
                <Warehouse className="w-4 h-4 text-agri-600" />
                <span>{t('storageCapacity')}</span>
              </span>
              <span>
                {centre.facilities.occupiedCapacityQuintals.toLocaleString()} / {centre.facilities.storageCapacityQuintals.toLocaleString()} Quintals ({capacityPercent}% {t('occupied')})
              </span>
            </div>
            <div className="w-full bg-slate-200 rounded-full h-3 overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-500 ${
                  capacityPercent > 85 ? 'bg-rose-500' : capacityPercent > 65 ? 'bg-amber-500' : 'bg-agri-600'
                }`}
                style={{ width: `${Math.min(capacityPercent, 100)}%` }}
              />
            </div>
          </div>

          {/* Accepted Crops & MSP Table */}
          <div>
            <h4 className="text-sm font-extrabold text-slate-900 mb-3 flex items-center gap-2">
              <Package className="w-4 h-4 text-agri-600" />
              <span>{t('cropQuotas')}</span>
            </h4>

            <div className="overflow-x-auto rounded-2xl border border-slate-200">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-100 text-slate-700 uppercase font-bold tracking-wider">
                  <tr>
                    <th className="p-3">Crop Name</th>
                    <th className="p-3">Govt. MSP</th>
                    <th className="p-3">State Bonus</th>
                    <th className="p-3">Max Moisture</th>
                    <th className="p-3">Daily Quota</th>
                    <th className="p-3">Procured Today</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {centre.acceptedCrops.map((crop) => {
                    const cropName = lang === 'te' && crop.name_te ? crop.name_te : crop.name;
                    return (
                      <tr key={crop.cropId} className="hover:bg-slate-50 font-medium">
                        <td className="p-3 font-bold text-slate-900">{cropName}</td>
                        <td className="p-3 font-bold text-agri-700 font-mono">₹{crop.msp}/Qtl</td>
                        <td className="p-3">
                          {crop.bonus ? (
                            <span className="px-2 py-0.5 rounded-full bg-amber-100 text-amber-900 font-bold border border-amber-300">
                              +₹{crop.bonus}/Qtl
                            </span>
                          ) : (
                            <span className="text-slate-400">-</span>
                          )}
                        </td>
                        <td className="p-3 font-semibold text-slate-700">&le; {crop.maxMoisture}%</td>
                        <td className="p-3 font-mono">{crop.dailyQuotaQuintals.toLocaleString()} Qtl</td>
                        <td className="p-3 font-mono text-agri-800 font-bold">
                          {crop.procuredTodayQuintals.toLocaleString()} Qtl
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* Interactive Moisture Limit Checker Tool */}
          <div className="p-4 rounded-2xl bg-blue-50/80 border border-blue-200 space-y-2">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-bold uppercase tracking-wider text-blue-900 flex items-center gap-1.5">
                <Droplets className="w-4 h-4 text-blue-600" />
                <span>Smart Grain Moisture Self-Checker (తేమ శాతం తనిఖీ)</span>
              </h4>
              <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-blue-200 text-blue-900">
                Standard: &le; 17.0%
              </span>
            </div>

            <p className="text-xs text-blue-800">
              Enter your grain moisture meter reading to verify if your lot will be accepted without price deduction.
            </p>

            <div className="flex items-center gap-3 pt-1">
              <input
                type="number"
                step="0.1"
                min="5"
                max="30"
                value={testMoisture}
                onChange={(e) => setTestMoisture(e.target.value)}
                className="w-32 px-3 py-1.5 rounded-xl bg-white border border-blue-300 text-sm font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="e.g. 15.5"
              />
              <span className="text-xs font-bold text-slate-600">% Moisture</span>

              <div className="flex-1">
                {isMoistureValid ? (
                  <span className="inline-flex items-center text-xs font-bold text-emerald-700 bg-emerald-100 px-3 py-1.5 rounded-xl border border-emerald-300">
                    <CheckCircle2 className="w-4 h-4 mr-1 text-emerald-600" />
                    Eligible for 100% Full MSP Rate!
                  </span>
                ) : (
                  <span className="inline-flex items-center text-xs font-bold text-rose-700 bg-rose-100 px-3 py-1.5 rounded-xl border border-rose-300">
                    <AlertTriangle className="w-4 h-4 mr-1 text-rose-600" />
                    High moisture (&gt;17%). Sun-dry grain before delivery.
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Centre Amenities Checklist */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">
              {t('centreFacilities')}
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 text-xs">
              <div className="flex items-center space-x-2 p-2.5 rounded-xl bg-slate-50 border border-slate-200">
                <CheckCircle2 className={`w-4 h-4 ${centre.facilities.coveredYard ? 'text-emerald-600' : 'text-slate-300'}`} />
                <span className={centre.facilities.coveredYard ? 'text-slate-800 font-semibold' : 'text-slate-400'}>
                  {t('coveredYard')}
                </span>
              </div>

              <div className="flex items-center space-x-2 p-2.5 rounded-xl bg-slate-50 border border-slate-200">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span className="text-slate-800 font-semibold">{t('weighbridge')}</span>
              </div>

              <div className="flex items-center space-x-2 p-2.5 rounded-xl bg-slate-50 border border-slate-200">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span className="text-slate-800 font-semibold">{t('lab')}</span>
              </div>

              <div className="flex items-center space-x-2 p-2.5 rounded-xl bg-slate-50 border border-slate-200">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span className="text-slate-800 font-semibold">{t('water')}</span>
              </div>

              <div className="flex items-center space-x-2 p-2.5 rounded-xl bg-slate-50 border border-slate-200">
                <CheckCircle2 className={`w-4 h-4 ${centre.facilities.canteen ? 'text-emerald-600' : 'text-slate-300'}`} />
                <span className={centre.facilities.canteen ? 'text-slate-800 font-semibold' : 'text-slate-400'}>
                  {t('canteen')}
                </span>
              </div>

              <div className="flex items-center space-x-2 p-2.5 rounded-xl bg-slate-50 border border-slate-200">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span className="text-slate-800 font-semibold">{t('shed')}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 sm:p-6 bg-slate-50 border-t border-slate-200 flex items-center justify-between gap-3">
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl bg-white border border-slate-300 hover:bg-slate-100 text-slate-700 font-semibold text-sm transition cursor-pointer"
          >
            Close
          </button>

          <button
            onClick={() => {
              onClose();
              setBookingCentre(centre);
            }}
            disabled={centre.status === 'closed' || centre.status === 'quota_full'}
            className="px-6 py-2.5 rounded-xl bg-agri-600 hover:bg-agri-700 text-white font-bold text-sm shadow-md shadow-agri-600/30 transition flex items-center space-x-2 cursor-pointer disabled:bg-slate-300 disabled:cursor-not-allowed"
          >
            <span>{t('bookTokenBtn')}</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
