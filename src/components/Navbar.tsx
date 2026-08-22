import React from 'react';
import {
  Sprout,
  MapPin,
  Compass,
  TrendingUp,
  Ticket,
  ShieldCheck,
  Languages,
  Mic,
  BarChart3,
  RefreshCw,
  Locate
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useApp } from '../context/AppContext';
import { Language } from '../types';

interface NavbarProps {
  onOpenVoice: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenVoice }) => {
  const { lang, setLang, t } = useLanguage();
  const {
    activeTab,
    setActiveTab,
    userRole,
    setUserRole,
    activeToken,
    detectUserLocation,
    isLocating,
    refreshAll,
    loading
  } = useApp();

  const handleLangChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setLang(e.target.value as Language);
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-sm">
      {/* Top Banner / Ticker bar */}
      <div className="bg-gradient-to-r from-agri-800 via-agri-700 to-agri-900 text-white text-xs py-1.5 px-4">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center space-x-2">
            <span className="inline-block w-2 h-2 rounded-full bg-agri-300 animate-ping" />
            <span className="font-semibold tracking-wide uppercase text-agri-100">
              Kharif/Rabi 2026 Procurement Portal
            </span>
            <span className="hidden sm:inline text-agri-200">|</span>
            <span className="hidden sm:inline text-agri-100">
              Govt. Guaranteed MSP + ₹500 State Incentive Active
            </span>
          </div>

          <div className="flex items-center space-x-4">
            <button
              onClick={() => detectUserLocation()}
              disabled={isLocating}
              className="flex items-center space-x-1 text-agri-100 hover:text-white transition cursor-pointer"
              title="Detect Location via GPS"
            >
              <Locate className={`w-3.5 h-3.5 ${isLocating ? 'animate-spin' : ''}`} />
              <span>{isLocating ? t('detectingLoc') : t('useGps')}</span>
            </button>

            <button
              onClick={() => refreshAll()}
              className="flex items-center space-x-1 text-agri-100 hover:text-white transition cursor-pointer"
              title="Refresh Live Data"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
              <span className="hidden md:inline">Live Sync</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Brand Logo */}
          <div
            onClick={() => setActiveTab('centres')}
            className="flex items-center space-x-3 cursor-pointer group"
          >
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-tr from-agri-600 to-agri-500 flex items-center justify-center shadow-md shadow-agri-600/30 group-hover:scale-105 transition-transform">
              <Sprout className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
                  {lang === 'te' ? 'కిసాన్ సేతు' : lang === 'hi' ? 'किसान सेतु' : 'KisanSetu'}
                </span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-agri-100 text-agri-800 uppercase tracking-wider border border-agri-300">
                  Govt Agri
                </span>
              </div>
              <p className="text-xs text-slate-500 font-medium hidden sm:block">
                {t('tagline')}
              </p>
            </div>
          </div>

          {/* Desktop Nav Items */}
          <nav className="hidden lg:flex items-center space-x-1">
            <button
              onClick={() => setActiveTab('centres')}
              className={`px-3.5 py-2 rounded-lg text-sm font-semibold transition flex items-center space-x-2 ${
                activeTab === 'centres'
                  ? 'bg-agri-50 text-agri-700 border border-agri-200 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <Compass className="w-4 h-4" />
              <span>{t('findCentres')}</span>
            </button>

            <button
              onClick={() => setActiveTab('map')}
              className={`px-3.5 py-2 rounded-lg text-sm font-semibold transition flex items-center space-x-2 ${
                activeTab === 'map'
                  ? 'bg-agri-50 text-agri-700 border border-agri-200 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <MapPin className="w-4 h-4" />
              <span>{t('mapView')}</span>
            </button>

            <button
              onClick={() => setActiveTab('prices')}
              className={`px-3.5 py-2 rounded-lg text-sm font-semibold transition flex items-center space-x-2 ${
                activeTab === 'prices'
                  ? 'bg-agri-50 text-agri-700 border border-agri-200 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <TrendingUp className="w-4 h-4" />
              <span>{t('mspPrices')}</span>
            </button>

            <button
              onClick={() => setActiveTab('queue')}
              className={`px-3.5 py-2 rounded-lg text-sm font-semibold transition flex items-center space-x-2 relative ${
                activeTab === 'queue'
                  ? 'bg-agri-600 text-white shadow-md shadow-agri-600/20'
                  : activeToken
                  ? 'bg-amber-50 text-amber-900 border border-amber-300 animate-pulse'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <Ticket className="w-4 h-4" />
              <span>{t('myToken')}</span>
              {activeToken && (
                <span className="ml-1.5 px-1.5 py-0.5 rounded-full text-[11px] font-bold bg-amber-500 text-white">
                  {activeToken.tokenNumber}
                </span>
              )}
            </button>

            <button
              onClick={() => setActiveTab('analytics')}
              className={`px-3 py-2 rounded-lg text-sm font-semibold transition flex items-center space-x-2 ${
                activeTab === 'analytics'
                  ? 'bg-agri-50 text-agri-700 border border-agri-200 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <BarChart3 className="w-4 h-4" />
              <span>{t('analytics')}</span>
            </button>
          </nav>

          {/* Right Controls: Voice, Language Selector, Portal Switch */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            {/* Voice Assistant Button */}
            <button
              onClick={onOpenVoice}
              className="p-2 sm:px-3 sm:py-2 rounded-xl bg-agri-50 text-agri-700 border border-agri-300 hover:bg-agri-100 transition flex items-center space-x-1.5 shadow-xs"
              title="Voice Assistant (వాయిస్ సహాయకుడు)"
            >
              <Mic className="w-4 h-4 text-agri-600 animate-pulse" />
              <span className="hidden sm:inline text-xs font-semibold">
                {lang === 'te' ? 'వాయిస్' : lang === 'hi' ? 'आवाज' : 'Voice'}
              </span>
            </button>

            {/* Language Switcher */}
            <div className="relative flex items-center">
              <div className="absolute left-2.5 pointer-events-none text-slate-400">
                <Languages className="w-4 h-4" />
              </div>
              <select
                value={lang}
                onChange={handleLangChange}
                className="pl-8 pr-3 py-1.5 text-xs sm:text-sm font-semibold bg-slate-100 border border-slate-300 rounded-xl text-slate-800 hover:border-slate-400 focus:outline-none focus:ring-2 focus:ring-agri-500 cursor-pointer"
              >
                <option value="en">English (EN)</option>
                <option value="te">తెలుగు (Telugu)</option>
                <option value="hi">हिंदी (Hindi)</option>
              </select>
            </div>

            {/* Role Switcher: Farmer / Officer */}
            <button
              onClick={() => {
                if (userRole === 'farmer') {
                  setUserRole('admin');
                  setActiveTab('admin');
                } else {
                  setUserRole('farmer');
                  setActiveTab('centres');
                }
              }}
              className={`px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-xl text-xs sm:text-sm font-bold transition flex items-center space-x-1.5 cursor-pointer shadow-xs ${
                userRole === 'admin'
                  ? 'bg-slate-900 text-amber-400 border border-slate-700'
                  : 'bg-slate-800 text-white hover:bg-slate-900'
              }`}
            >
              <ShieldCheck className="w-4 h-4 text-amber-400" />
              <span>{userRole === 'admin' ? t('farmerMode') : t('officerPortal')}</span>
            </button>
          </div>
        </div>

        {/* Mobile Sub-Navigation */}
        <div className="lg:hidden flex items-center justify-around py-2 border-t border-slate-200 overflow-x-auto gap-1 text-xs">
          <button
            onClick={() => setActiveTab('centres')}
            className={`px-2.5 py-1.5 rounded-lg font-semibold flex items-center space-x-1 ${
              activeTab === 'centres' ? 'bg-agri-600 text-white' : 'text-slate-600'
            }`}
          >
            <Compass className="w-3.5 h-3.5" />
            <span>{t('findCentres')}</span>
          </button>

          <button
            onClick={() => setActiveTab('map')}
            className={`px-2.5 py-1.5 rounded-lg font-semibold flex items-center space-x-1 ${
              activeTab === 'map' ? 'bg-agri-600 text-white' : 'text-slate-600'
            }`}
          >
            <MapPin className="w-3.5 h-3.5" />
            <span>{t('mapView')}</span>
          </button>

          <button
            onClick={() => setActiveTab('prices')}
            className={`px-2.5 py-1.5 rounded-lg font-semibold flex items-center space-x-1 ${
              activeTab === 'prices' ? 'bg-agri-600 text-white' : 'text-slate-600'
            }`}
          >
            <TrendingUp className="w-3.5 h-3.5" />
            <span>{t('mspPrices')}</span>
          </button>

          <button
            onClick={() => setActiveTab('queue')}
            className={`px-2.5 py-1.5 rounded-lg font-semibold flex items-center space-x-1 ${
              activeTab === 'queue'
                ? 'bg-agri-600 text-white'
                : activeToken
                ? 'bg-amber-100 text-amber-900 border border-amber-300'
                : 'text-slate-600'
            }`}
          >
            <Ticket className="w-3.5 h-3.5" />
            <span>{t('myToken')}</span>
            {activeToken && <span className="w-2 h-2 rounded-full bg-amber-500 animate-ping" />}
          </button>
        </div>
      </div>
    </header>
  );
};
