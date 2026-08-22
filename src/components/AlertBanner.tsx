import React, { useState } from 'react';
import {
  AlertTriangle,
  BellRing,
  Info,
  CheckCircle2,
  Volume2,
  ChevronRight,
  X
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { useLanguage } from '../context/LanguageContext';
import { speakText } from '../utils/sound';

export const AlertBanner: React.FC = () => {
  const { announcements } = useApp();
  const { lang, t } = useLanguage();
  const [dismissed, setDismissed] = useState<Record<string, boolean>>({});

  const activeAlerts = announcements.filter(a => a.isActive && !dismissed[a.id]);

  if (activeAlerts.length === 0) return null;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
      <div className="space-y-2">
        {activeAlerts.map(alert => {
          const isWarning = alert.severity === 'warning' || alert.severity === 'alert';
          const isSuccess = alert.severity === 'success';

          const title = (lang === 'te' && alert.title_te) ? alert.title_te : (lang === 'hi' && alert.title_hi) ? alert.title_hi : alert.title;
          const message = (lang === 'te' && alert.message_te) ? alert.message_te : alert.message;

          const handleSpeak = () => {
            speakText(`${title}. ${message}`, lang);
          };

          return (
            <div
              key={alert.id}
              className={`rounded-2xl p-4 transition-all duration-300 border shadow-xs flex items-start justify-between gap-3 ${
                isWarning
                  ? 'bg-amber-50/90 border-amber-300 text-amber-950'
                  : isSuccess
                  ? 'bg-emerald-50/90 border-emerald-300 text-emerald-950'
                  : 'bg-blue-50/90 border-blue-300 text-blue-950'
              }`}
            >
              <div className="flex items-start space-x-3.5 flex-1">
                <div className={`p-2 rounded-xl mt-0.5 ${
                  isWarning ? 'bg-amber-200/80 text-amber-800' : isSuccess ? 'bg-emerald-200/80 text-emerald-800' : 'bg-blue-200/80 text-blue-800'
                }`}>
                  {isWarning ? (
                    <AlertTriangle className="w-5 h-5" />
                  ) : isSuccess ? (
                    <CheckCircle2 className="w-5 h-5" />
                  ) : (
                    <BellRing className="w-5 h-5" />
                  )}
                </div>

                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <span className="font-bold text-sm sm:text-base">
                      {title}
                    </span>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider ${
                      isWarning ? 'bg-amber-200 text-amber-900' : isSuccess ? 'bg-emerald-200 text-emerald-900' : 'bg-blue-200 text-blue-900'
                    }`}>
                      {alert.centreName}
                    </span>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                    {message}
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center space-x-1.5 self-start">
                <button
                  onClick={handleSpeak}
                  className="p-2 rounded-xl bg-white/80 hover:bg-white text-slate-700 hover:text-agri-700 transition shadow-xs cursor-pointer"
                  title={t('speakStatus')}
                >
                  <Volume2 className="w-4 h-4" />
                </button>

                <button
                  onClick={() => setDismissed(prev => ({ ...prev, [alert.id]: true }))}
                  className="p-2 rounded-xl hover:bg-black/5 text-slate-500 hover:text-slate-700 transition cursor-pointer"
                  title="Dismiss"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
