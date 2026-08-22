import React, { useEffect } from 'react';
import {
  Ticket,
  Truck,
  Clock,
  CheckCircle2,
  AlertCircle,
  QrCode,
  Download,
  Share2,
  Volume2,
  RotateCcw,
  Sparkles,
  PhoneCall,
  ShieldCheck,
  Droplets,
  Scale,
  CreditCard
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { useLanguage } from '../context/LanguageContext';
import { playQueueChime, speakText } from '../utils/sound';

export const LiveQueueTracker: React.FC = () => {
  const {
    activeToken,
    centres,
    allTokens,
    setViewPassToken,
    updateTokenStatus,
    setActiveToken
  } = useApp();
  const { lang, t } = useLanguage();

  if (!activeToken) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 text-center">
        <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm space-y-4 max-w-lg mx-auto">
          <div className="w-16 h-16 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center mx-auto border border-amber-200">
            <Ticket className="w-8 h-8" />
          </div>
          <h3 className="text-xl font-bold text-slate-900">
            {lang === 'te' ? 'ఎటువంటి క్రియాశీల టోకెన్ లేదు' : 'No Active Digital Token'}
          </h3>
          <p className="text-xs sm:text-sm text-slate-500">
            {lang === 'te'
              ? 'మీరు ఇంకా ఎటువంటి సేకరణ స్లాట్ బుక్ చేసుకోలేదు. సమీప సేకరణ కేంద్రాన్ని ఎంచుకుని టోకెన్ పొందండి.'
              : 'You have not booked a crop delivery token yet. Search nearby procurement centres to book an instant slot.'}
          </p>
        </div>
      </div>
    );
  }

  // Find the centre corresponding to active token
  const centre = centres.find((c) => c.id === activeToken.centreId);

  // Determine queue position
  const waitingTokens = allTokens.filter(
    (t) =>
      t.centreId === activeToken.centreId &&
      ['BOOKED', 'CHECKED_IN', 'TESTING', 'WEIGHING'].includes(t.status)
  );

  const tokenIndex = waitingTokens.findIndex(
    (t) => t.tokenNumber === activeToken.tokenNumber
  );

  const tokensAhead = tokenIndex >= 0 ? tokenIndex : 0;
  const estimatedMinsLeft = (tokensAhead + 1) * (centre?.queue.avgMinutesPerToken || 8);

  const stages = [
    { key: 'BOOKED', label: t('stage1'), icon: Ticket },
    { key: 'CHECKED_IN', label: t('stage2'), icon: Truck },
    { key: 'TESTING', label: t('stage3'), icon: Droplets },
    { key: 'WEIGHING', label: t('stage4'), icon: Scale },
    { key: 'PAID', label: t('stage5'), icon: CreditCard }
  ];

  const getStageIndex = (status: string) => {
    switch (status) {
      case 'BOOKED':
        return 0;
      case 'CHECKED_IN':
        return 1;
      case 'TESTING':
        return 2;
      case 'WEIGHING':
        return 3;
      case 'PAID':
      case 'COMPLETED':
        return 4;
      default:
        return 0;
    }
  };

  const currentStageIdx = getStageIndex(activeToken.status);

  // Play chime if token is actively being tested or weighed
  const handleAnnounce = () => {
    const text = `Attention Farmer ${activeToken.farmerName}. Your token number is ${
      activeToken.tokenNumber
    }. Current status is ${activeToken.status}. There are ${tokensAhead} vehicles ahead of you at ${
      centre?.name || 'Procurement Centre'
    }.`;
    speakText(text, lang);
  };

  const handleSimulateCheckin = async () => {
    await updateTokenStatus(activeToken.tokenNumber, {
      status: 'CHECKED_IN'
    });
  };

  const handleCancelToken = async () => {
    if (confirm('Are you sure you want to cancel this delivery token?')) {
      await updateTokenStatus(activeToken.tokenNumber, {
        status: 'CANCELLED'
      });
      setActiveToken(null);
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-6 animate-fadeIn">
      {/* Live Queue Hero Card */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-lg overflow-hidden">
        {/* Top Dark Header */}
        <div className="bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 text-white p-6 sm:p-8 relative">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <div className="flex items-center space-x-2">
                <span className="inline-block w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
                  {t('liveQueueTitle')}
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black mt-1">
                {activeToken.centreName}
              </h2>
              <p className="text-xs sm:text-sm text-slate-400 mt-1">
                Farmer: <span className="text-white font-bold">{activeToken.farmerName}</span> ({activeToken.phone})
              </p>
            </div>

            {/* View Pass Button */}
            <button
              onClick={() => setViewPassToken(activeToken)}
              className="px-4 py-2.5 rounded-2xl bg-agri-600 hover:bg-agri-500 text-white font-bold text-xs sm:text-sm shadow-md transition flex items-center space-x-2 cursor-pointer"
            >
              <QrCode className="w-4 h-4" />
              <span>{t('viewPassBtn')}</span>
            </button>
          </div>

          {/* Tokens Metric Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6 pt-6 border-t border-slate-800">
            {/* Your Token */}
            <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 flex items-center justify-between">
              <div>
                <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                  {t('yourTokenNo')}
                </div>
                <div className="text-2xl sm:text-3xl font-black text-amber-400 font-mono mt-0.5">
                  {activeToken.tokenNumber}
                </div>
              </div>
              <div className="p-3 rounded-xl bg-amber-400/10 text-amber-400">
                <Ticket className="w-6 h-6" />
              </div>
            </div>

            {/* Now Serving */}
            <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 flex items-center justify-between">
              <div>
                <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                  {t('servingToken')}
                </div>
                <div className="text-2xl sm:text-3xl font-black text-emerald-400 font-mono mt-0.5">
                  {centre?.queue.currentlyServingToken || 'KST-042'}
                </div>
              </div>
              <div className="p-3 rounded-xl bg-emerald-400/10 text-emerald-400">
                <Truck className="w-6 h-6" />
              </div>
            </div>

            {/* Estimated Wait */}
            <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 flex items-center justify-between">
              <div>
                <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                  {t('timeRemaining')}
                </div>
                <div className="text-2xl sm:text-3xl font-black text-white font-mono mt-0.5">
                  ~{estimatedMinsLeft} <span className="text-sm font-normal text-slate-400">mins</span>
                </div>
              </div>
              <div className="p-3 rounded-xl bg-blue-400/10 text-blue-400">
                <Clock className="w-6 h-6" />
              </div>
            </div>
          </div>
        </div>

        {/* Live Multi-Stage Progress Stepper */}
        <div className="p-6 sm:p-8 bg-slate-50 border-b border-slate-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-extrabold text-slate-900 uppercase tracking-wider">
              {t('currentStage')}
            </h3>
            <button
              onClick={handleAnnounce}
              className="p-1.5 px-3 rounded-xl bg-white border border-slate-300 hover:bg-slate-100 text-xs font-semibold text-slate-700 flex items-center space-x-1.5 cursor-pointer shadow-xs"
            >
              <Volume2 className="w-3.5 h-3.5 text-agri-600" />
              <span>{t('speakStatus')}</span>
            </button>
          </div>

          <div className="relative">
            {/* Horizontal Line connecting stages */}
            <div className="hidden sm:block absolute top-1/2 left-6 right-6 h-1 bg-slate-200 -translate-y-1/2 z-0" />
            <div
              className="hidden sm:block absolute top-1/2 left-6 h-1 bg-agri-600 -translate-y-1/2 z-0 transition-all duration-700"
              style={{ width: `${(currentStageIdx / (stages.length - 1)) * 100}%` }}
            />

            <div className="grid grid-cols-1 sm:grid-cols-5 gap-3 relative z-10">
              {stages.map((st, idx) => {
                const isPassed = idx <= currentStageIdx;
                const isCurrent = idx === currentStageIdx;
                const StageIcon = st.icon;

                return (
                  <div
                    key={st.key}
                    className={`p-3.5 rounded-2xl transition-all text-center flex sm:flex-col items-center gap-3 sm:gap-2 ${
                      isCurrent
                        ? 'bg-agri-600 text-white shadow-lg shadow-agri-600/30 scale-105'
                        : isPassed
                        ? 'bg-emerald-100 text-emerald-950 border border-emerald-300'
                        : 'bg-white text-slate-400 border border-slate-200'
                    }`}
                  >
                    <div
                      className={`w-9 h-9 rounded-full flex items-center justify-center ${
                        isCurrent
                          ? 'bg-white text-agri-700'
                          : isPassed
                          ? 'bg-emerald-600 text-white'
                          : 'bg-slate-100 text-slate-400'
                      }`}
                    >
                      <StageIcon className="w-5 h-5" />
                    </div>
                    <div className="text-left sm:text-center">
                      <div className="text-xs font-bold leading-tight">{st.label}</div>
                      <div className={`text-[10px] font-semibold uppercase mt-0.5 ${isCurrent ? 'text-agri-100' : 'text-slate-500'}`}>
                        {isCurrent ? '● IN PROGRESS' : isPassed ? '✓ DONE' : 'WAITING'}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Live Slot & Token Summary Table */}
        <div className="p-6 sm:p-8 space-y-4">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
              <span className="text-slate-400 uppercase font-bold">Crop & Quantity</span>
              <p className="font-bold text-slate-900 text-sm mt-0.5">
                {activeToken.cropName} ({activeToken.quantityQuintals} Quintals)
              </p>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
              <span className="text-slate-400 uppercase font-bold">Allocated Slot</span>
              <p className="font-bold text-slate-900 text-sm mt-0.5">
                {activeToken.slotDate} | {activeToken.slotTime}
              </p>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
              <span className="text-slate-400 uppercase font-bold">Transport Vehicle</span>
              <p className="font-bold text-slate-900 text-sm mt-0.5">
                {activeToken.vehicleType} ({activeToken.vehicleNumber})
              </p>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
              <span className="text-slate-400 uppercase font-bold">Pattadar Passbook</span>
              <p className="font-bold text-slate-900 text-sm mt-0.5">
                {activeToken.passbookNo}
              </p>
            </div>
          </div>

          {/* Gate Check-in Simulation for Demo */}
          {activeToken.status === 'BOOKED' && (
            <div className="p-4 rounded-2xl bg-amber-50 border border-amber-300 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center space-x-3">
                <Truck className="w-5 h-5 text-amber-700" />
                <span className="text-xs font-bold text-amber-900">
                  Are you arriving at the procurement centre gate? Check in to notify the gate operator.
                </span>
              </div>
              <button
                onClick={handleSimulateCheckin}
                className="px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold transition cursor-pointer"
              >
                Simulate Gate Check-in
              </button>
            </div>
          )}

          {/* Action Buttons */}
          <div className="pt-4 flex flex-wrap items-center justify-between gap-3 border-t border-slate-200">
            <button
              onClick={handleCancelToken}
              className="px-4 py-2 rounded-xl border border-rose-300 text-rose-700 hover:bg-rose-50 text-xs font-bold transition cursor-pointer"
            >
              {t('cancelTokenBtn')}
            </button>

            <div className="flex items-center space-x-2">
              <button
                onClick={() => setViewPassToken(activeToken)}
                className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs sm:text-sm shadow-md transition flex items-center space-x-1.5 cursor-pointer"
              >
                <Download className="w-4 h-4" />
                <span>{t('downloadPdf')}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
