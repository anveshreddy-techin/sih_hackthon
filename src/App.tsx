import React, { useState } from 'react';
import {
  Search,
  MapPin,
  Filter,
  Compass,
  CheckCircle2,
  AlertCircle,
  Sprout,
  ShieldCheck,
  PhoneCall,
  SlidersHorizontal,
  ChevronDown,
  Layers
} from 'lucide-react';
import { useApp } from './context/AppContext';
import { useLanguage } from './context/LanguageContext';
import { Navbar } from './components/Navbar';
import { AlertBanner } from './components/AlertBanner';
import { CentreCard } from './components/CentreCard';
import { MandiMapView } from './components/MandiMapView';
import { PriceBoard } from './components/PriceBoard';
import { LiveQueueTracker } from './components/LiveQueueTracker';
import { CentreDetailModal } from './components/CentreDetailModal';
import { TokenBookingModal } from './components/TokenBookingModal';
import { TokenPassModal } from './components/TokenPassModal';
import { VoiceAssistant } from './components/VoiceAssistant';
import { AdminDashboard } from './components/AdminDashboard';
import { AnalyticsView } from './components/AnalyticsModal';

export const App: React.FC = () => {
  const {
    centres,
    activeTab,
    setActiveTab,
    userRole,
    searchQuery,
    setSearchQuery,
    selectedCrop,
    setSelectedCrop,
    selectedDistrict,
    setSelectedDistrict,
    selectedStatus,
    setSelectedStatus,
    selectedRadius,
    setSelectedRadius,
    selectedCentre,
    setSelectedCentre,
    bookingCentre,
    setBookingCentre,
    viewPassToken,
    setViewPassToken,
    mspCatalog
  } = useApp();

  const { lang, t } = useLanguage();
  const [isVoiceOpen, setIsVoiceOpen] = useState<boolean>(false);

  // Extract unique districts from centres
  const districts = Array.from(new Set(centres.map((c) => c.district)));

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      {/* Top Navbar */}
      <Navbar onOpenVoice={() => setIsVoiceOpen(true)} />

      {/* Live Alerts & Weather advisories */}
      <AlertBanner />

      {/* Main Content Area */}
      <main className="flex-1 pb-16">
        {/* OFFICER PORTAL */}
        {userRole === 'admin' ? (
          <AdminDashboard />
        ) : activeTab === 'map' ? (
          /* INTERACTIVE MAP VIEW */
          <MandiMapView />
        ) : activeTab === 'prices' ? (
          /* MSP & PRICE BOARD */
          <PriceBoard />
        ) : activeTab === 'queue' ? (
          /* DIGITAL TOKEN & QUEUE TRACKER */
          <LiveQueueTracker />
        ) : activeTab === 'analytics' ? (
          /* TRANSPARENCY ANALYTICS */
          <AnalyticsView />
        ) : (
          /* FARMER PORTAL: CENTRES FINDER */
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6 animate-fadeIn">
            {/* Hero Search Section */}
            <div className="bg-gradient-to-r from-agri-900 via-agri-800 to-slate-900 rounded-3xl p-6 sm:p-10 text-white shadow-xl relative overflow-hidden">
              <div className="relative z-10 max-w-3xl">
                <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-agri-500/20 text-agri-300 text-xs font-bold uppercase tracking-wider mb-3 border border-agri-400/30">
                  <Sprout className="w-4 h-4 text-agri-400" />
                  <span>{lang === 'te' ? 'రైతు సేకరణ సమాచార వేదిక' : 'Smart Farmer Procurement Network'}</span>
                </div>

                <h1 className="text-2xl sm:text-4xl font-black tracking-tight leading-tight">
                  {lang === 'te'
                    ? 'సమీప ధాన్యం సేకరణ కేంద్రాలు & లైవ్ టోకెన్ వివరాలు'
                    : lang === 'hi'
                    ? 'निकटतम खरीद केंद्र एवं लाइव डिजिटल कतार'
                    : 'Find Nearby Procurement Centres & Book Digital Tokens'}
                </h1>

                <p className="text-xs sm:text-base text-agri-100/90 mt-2 max-w-2xl leading-relaxed">
                  {lang === 'te'
                    ? 'కేంద్రం పని వేళలు, స్వీకరించే పంటలు, కనీస మద్దతు ధర (MSP) మరియు లైవ్ క్యూ స్థితిని తెలుసుకొని డిజిటల్ టోకెన్ పొందండి.'
                    : 'Check live open/closed status, accepted crops, MSP rates, and avoid long queues by booking your digital delivery slot.'}
                </p>

                {/* Search Bar Input */}
                <div className="mt-6 flex flex-col sm:flex-row gap-2">
                  <div className="relative flex-1">
                    <Search className="w-5 h-5 text-slate-400 absolute left-4 top-3.5" />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder={t('searchPlaceholder')}
                      className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-white text-slate-900 placeholder:text-slate-400 text-xs sm:text-sm font-medium shadow-md focus:outline-none focus:ring-2 focus:ring-agri-400"
                    />
                  </div>

                  <button
                    onClick={() => setIsVoiceOpen(true)}
                    className="px-5 py-3.5 rounded-2xl bg-agri-600 hover:bg-agri-500 text-white font-bold text-xs sm:text-sm transition flex items-center justify-center space-x-2 shadow-md cursor-pointer"
                  >
                    <span>{t('voiceSearch')}</span>
                  </button>
                </div>
              </div>

              {/* Decorative shapes */}
              <div className="absolute -right-16 -bottom-16 w-80 h-80 rounded-full bg-agri-500/10 blur-3xl" />
            </div>

            {/* Filter Pills Bar */}
            <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs flex flex-wrap items-center justify-between gap-3">
              <div className="flex flex-wrap items-center gap-2 text-xs">
                {/* Crop Filter */}
                <div className="flex items-center space-x-1">
                  <span className="font-bold text-slate-500 uppercase tracking-wider hidden sm:inline">
                    Crop:
                  </span>
                  <select
                    value={selectedCrop}
                    onChange={(e) => setSelectedCrop(e.target.value)}
                    className="px-3 py-2 rounded-xl bg-slate-50 border border-slate-300 font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-agri-500 cursor-pointer"
                  >
                    <option value="all">{t('allCrops')}</option>
                    {mspCatalog.map((crop) => (
                      <option key={crop.id} value={crop.id}>
                        {crop.icon} {lang === 'te' ? crop.name_te : crop.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* District Filter */}
                <div className="flex items-center space-x-1">
                  <span className="font-bold text-slate-500 uppercase tracking-wider hidden sm:inline">
                    District:
                  </span>
                  <select
                    value={selectedDistrict}
                    onChange={(e) => setSelectedDistrict(e.target.value)}
                    className="px-3 py-2 rounded-xl bg-slate-50 border border-slate-300 font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-agri-500 cursor-pointer"
                  >
                    <option value="all">{t('allDistricts')}</option>
                    {districts.map((d) => (
                      <option key={d} value={d}>
                        {d}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Status Filter */}
                <div className="flex items-center space-x-1">
                  <span className="font-bold text-slate-500 uppercase tracking-wider hidden sm:inline">
                    Status:
                  </span>
                  <select
                    value={selectedStatus}
                    onChange={(e) => setSelectedStatus(e.target.value)}
                    className="px-3 py-2 rounded-xl bg-slate-50 border border-slate-300 font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-agri-500 cursor-pointer"
                  >
                    <option value="all">{t('allStatuses')}</option>
                    <option value="open">{t('statusOpen')}</option>
                    <option value="break">{t('statusBreak')}</option>
                    <option value="quota_full">{t('statusQuotaFull')}</option>
                    <option value="closed">{t('statusClosed')}</option>
                  </select>
                </div>

                {/* Max Distance Radius Filter */}
                <div className="flex items-center space-x-1">
                  <span className="font-bold text-slate-500 uppercase tracking-wider hidden sm:inline">
                    Radius:
                  </span>
                  <select
                    value={selectedRadius}
                    onChange={(e) => setSelectedRadius(e.target.value)}
                    className="px-3 py-2 rounded-xl bg-slate-50 border border-slate-300 font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-agri-500 cursor-pointer"
                  >
                    <option value="all">{t('anyDistance')}</option>
                    <option value="5">{t('within5km')}</option>
                    <option value="15">{t('within15km')}</option>
                    <option value="30">{t('within30km')}</option>
                    <option value="50">{t('within50km')}</option>
                  </select>
                </div>
              </div>

              {/* Counter tag */}
              <div className="text-xs font-bold text-slate-500">
                <span className="text-agri-700 font-extrabold">{centres.length}</span> {t('centresFound')}
              </div>
            </div>

            {/* Centres Grid */}
            {centres.length === 0 ? (
              <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 space-y-3">
                <div className="w-16 h-16 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
                  <Compass className="w-8 h-8" />
                </div>
                <h3 className="text-lg font-bold text-slate-900">
                  No Procurement Centres Found
                </h3>
                <p className="text-xs text-slate-500 max-w-sm mx-auto">
                  Try clearing your filters or changing the search keyword to view other procurement centres.
                </p>
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedCrop('all');
                    setSelectedDistrict('all');
                    setSelectedStatus('all');
                    setSelectedRadius('all');
                  }}
                  className="px-4 py-2 rounded-xl bg-slate-900 text-white text-xs font-bold transition hover:bg-slate-800 cursor-pointer"
                >
                  Clear All Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {centres.map((centre) => (
                  <CentreCard key={centre.id} centre={centre} />
                ))}
              </div>
            )}
          </div>
        )}
      </main>

      {/* Modals & Overlays */}
      {selectedCentre && (
        <CentreDetailModal
          centre={selectedCentre}
          onClose={() => setSelectedCentre(null)}
        />
      )}

      {bookingCentre && (
        <TokenBookingModal
          centre={bookingCentre}
          onClose={() => setBookingCentre(null)}
        />
      )}

      {viewPassToken && (
        <TokenPassModal
          token={viewPassToken}
          onClose={() => setViewPassToken(null)}
        />
      )}

      <VoiceAssistant
        isOpen={isVoiceOpen}
        onClose={() => setIsVoiceOpen(false)}
      />

      {/* Footer */}
      <footer className="bg-slate-900 text-white border-t border-slate-800 text-xs py-8 px-4 sm:px-6 lg:px-8 mt-auto">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-lg bg-agri-600 flex items-center justify-center text-white font-bold">
              <Sprout className="w-5 h-5" />
            </div>
            <div>
              <div className="font-extrabold text-sm text-white">KisanSetu • కిసాన్ సేతు (Anvesh SIH Project)</div>
              <div className="text-slate-400 text-[11px]">
                Smart Farmer Procurement Schedule & Status Information System | Developed by Anvesh
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-6 text-slate-400 text-[11px]">
            <div className="flex items-center space-x-1.5">
              <PhoneCall className="w-3.5 h-3.5 text-agri-400" />
              <span>Toll Free: 1800-425-0033</span>
            </div>
            <span>•</span>
            <span>Civil Supplies Dept & Rythu Bandhu Hub</span>
          </div>
        </div>
      </footer>
    </div>
  );
};
