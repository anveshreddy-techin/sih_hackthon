import React from 'react';
import {
  MapPin,
  Clock,
  ShieldCheck,
  CheckCircle,
  AlertCircle,
  PauseCircle,
  XCircle,
  Truck,
  Users,
  ChevronRight,
  Sparkles,
  Volume2,
  Warehouse,
  Scale,
  Navigation
} from 'lucide-react';
import { ProcurementCentre } from '../types';
import { useLanguage } from '../context/LanguageContext';
import { useApp } from '../context/AppContext';
import { formatDistance } from '../utils/distance';
import { speakText } from '../utils/sound';

interface CentreCardProps {
  centre: ProcurementCentre;
}

export const CentreCard: React.FC<CentreCardProps> = ({ centre }) => {
  const { lang, t } = useLanguage();
  const { setSelectedCentre, setBookingCentre, setActiveTab } = useApp();

  const centreName =
    lang === 'te' && centre.name_te
      ? centre.name_te
      : lang === 'hi' && centre.name_hi
      ? centre.name_hi
      : centre.name;

  const centreType =
    lang === 'te' && centre.type_te ? centre.type_te : centre.type;

  const statusReason =
    lang === 'te' && centre.statusReason_te
      ? centre.statusReason_te
      : centre.statusReason;

  // Status configuration
  const getStatusBadge = () => {
    switch (centre.status) {
      case 'open':
        return {
          bg: 'bg-emerald-50 text-emerald-800 border-emerald-300',
          dot: 'bg-emerald-500',
          icon: CheckCircle,
          label: t('statusOpen'),
          pulse: true
        };
      case 'break':
        return {
          bg: 'bg-amber-50 text-amber-800 border-amber-300',
          dot: 'bg-amber-500',
          icon: PauseCircle,
          label: t('statusBreak'),
          pulse: false
        };
      case 'quota_full':
        return {
          bg: 'bg-orange-50 text-orange-800 border-orange-300',
          dot: 'bg-orange-500',
          icon: AlertCircle,
          label: t('statusQuotaFull'),
          pulse: false
        };
      case 'closed':
      default:
        return {
          bg: 'bg-rose-50 text-rose-800 border-rose-300',
          dot: 'bg-rose-500',
          icon: XCircle,
          label: t('statusClosed'),
          pulse: false
        };
    }
  };

  const statusInfo = getStatusBadge();
  const StatusIcon = statusInfo.icon;

  const handleSpeak = (e: React.MouseEvent) => {
    e.stopPropagation();
    const speech = `${centreName}. ${statusInfo.label}. ${statusReason || ''}. Now serving token ${
      centre.queue.currentlyServingToken
    }. ${centre.queue.activeQueueCount} vehicles waiting.`;
    speakText(speech, lang);
  };

  const openGoogleMaps = (e: React.MouseEvent) => {
    e.stopPropagation();
    const url = `https://www.google.com/maps/dir/?api=1&destination=${centre.lat},${centre.lng}`;
    window.open(url, '_blank');
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col justify-between overflow-hidden group hover:border-agri-300">
      {/* Top Header */}
      <div className="p-5 sm:p-6 pb-4">
        <div className="flex items-start justify-between gap-3 mb-2">
          {/* Badge & Type */}
          <div className="flex flex-wrap items-center gap-2">
            <span
              className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold border ${statusInfo.bg}`}
            >
              <span
                className={`w-2 h-2 rounded-full mr-1.5 ${statusInfo.dot} ${
                  statusInfo.pulse ? 'animate-ping' : ''
                }`}
              />
              <StatusIcon className="w-3.5 h-3.5 mr-1" />
              {statusInfo.label}
            </span>

            {centre.distanceKm !== undefined && (
              <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-slate-100 text-slate-700 border border-slate-200">
                <MapPin className="w-3 h-3 mr-1 text-agri-600" />
                {formatDistance(centre.distanceKm)} {t('distanceAway')}
              </span>
            )}
          </div>

          {/* Audio Status Button */}
          <button
            onClick={handleSpeak}
            className="p-2 rounded-xl bg-slate-50 hover:bg-agri-50 text-slate-500 hover:text-agri-700 transition cursor-pointer border border-slate-200"
            title={t('speakStatus')}
          >
            <Volume2 className="w-4 h-4" />
          </button>
        </div>

        {/* Centre Name & Address */}
        <h3
          onClick={() => setSelectedCentre(centre)}
          className="text-lg sm:text-xl font-bold text-slate-900 group-hover:text-agri-700 transition-colors cursor-pointer line-clamp-2"
        >
          {centreName}
        </h3>

        <p className="text-xs font-medium text-slate-500 mt-1 flex items-center gap-1">
          <span>{centreType}</span>
          <span>•</span>
          <span>
            {centre.mandal}, {centre.district}
          </span>
        </p>

        {/* Status explanation notice if any */}
        {statusReason && (
          <div className="mt-3 p-2.5 rounded-xl bg-slate-50 border border-slate-200/80 text-xs text-slate-600 flex items-start space-x-2">
            <Sparkles className="w-4 h-4 text-agri-600 shrink-0 mt-0.5" />
            <p className="line-clamp-2">{statusReason}</p>
          </div>
        )}

        {/* Operating Hours */}
        <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-600">
          <div className="flex items-center space-x-1.5">
            <Clock className="w-3.5 h-3.5 text-slate-400" />
            <span>
              {centre.timings.open} - {centre.timings.close}
            </span>
          </div>
          <span className="text-[11px] font-medium text-slate-400">
            {centre.timings.workingDays}
          </span>
        </div>

        {/* Accepted Crops Section */}
        <div className="mt-4">
          <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
            {t('acceptedCropsTitle')}
          </div>
          <div className="flex flex-wrap gap-1.5">
            {centre.acceptedCrops.map((crop) => {
              const cropTitle =
                lang === 'te' && crop.name_te ? crop.name_te : crop.name;
              return (
                <div
                  key={crop.cropId}
                  className="inline-flex items-center space-x-1.5 px-2.5 py-1 rounded-lg bg-emerald-50/80 border border-emerald-200 text-xs text-emerald-950 font-medium"
                >
                  <span className="font-semibold">{cropTitle}</span>
                  <span className="text-agri-700 font-bold">
                    ₹{crop.msp}
                  </span>
                  {crop.bonus ? (
                    <span className="text-[10px] px-1 py-0.2 rounded bg-amber-100 text-amber-900 font-bold border border-amber-300">
                      +₹{crop.bonus}
                    </span>
                  ) : null}
                </div>
              );
            })}
          </div>
        </div>

        {/* Live Queue Status Strip */}
        <div className="mt-4 p-3 rounded-xl bg-gradient-to-r from-slate-900 to-slate-800 text-white flex items-center justify-between shadow-xs">
          <div>
            <div className="text-[10px] uppercase tracking-wider text-slate-300 font-medium">
              {t('servingToken')}
            </div>
            <div className="text-base font-extrabold text-amber-400 tracking-wide font-mono">
              {centre.queue.currentlyServingToken || 'None'}
            </div>
          </div>

          <div className="text-right">
            <div className="text-[10px] uppercase tracking-wider text-slate-300 font-medium">
              {t('queueStatus')}
            </div>
            <div className="text-xs font-semibold text-white flex items-center justify-end space-x-1">
              <Truck className="w-3.5 h-3.5 text-agri-400" />
              <span>
                {centre.queue.activeQueueCount} {t('waitingFarmers')} (~{centre.queue.estimatedWaitTimeMinutes}m)
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Action Buttons */}
      <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center gap-2">
        <button
          onClick={() => setSelectedCentre(centre)}
          className="flex-1 py-2.5 px-3 rounded-xl bg-white border border-slate-300 hover:border-slate-400 text-slate-800 text-xs sm:text-sm font-semibold transition cursor-pointer text-center"
        >
          {t('viewDetailsBtn')}
        </button>

        <button
          onClick={() => setBookingCentre(centre)}
          disabled={centre.status === 'closed' || centre.status === 'quota_full'}
          className={`flex-1 py-2.5 px-3 rounded-xl text-xs sm:text-sm font-bold transition flex items-center justify-center space-x-1.5 shadow-sm cursor-pointer ${
            centre.status === 'closed' || centre.status === 'quota_full'
              ? 'bg-slate-200 text-slate-400 cursor-not-allowed'
              : 'bg-agri-600 hover:bg-agri-700 text-white shadow-agri-600/20'
          }`}
        >
          <span>{t('bookTokenBtn')}</span>
          <ChevronRight className="w-4 h-4" />
        </button>

        <button
          onClick={openGoogleMaps}
          className="p-2.5 rounded-xl bg-white border border-slate-300 hover:bg-slate-100 text-slate-700 transition cursor-pointer"
          title={t('getDirectionsBtn')}
        >
          <Navigation className="w-4 h-4 text-agri-600" />
        </button>
      </div>
    </div>
  );
};
