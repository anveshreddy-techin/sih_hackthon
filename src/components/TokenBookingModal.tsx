import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import {
  X,
  User,
  Phone,
  CreditCard,
  FileText,
  Package,
  Truck,
  Calendar,
  Clock,
  CheckCircle2,
  ChevronRight,
  ChevronLeft,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { ProcurementCentre } from '../types';
import { useLanguage } from '../context/LanguageContext';
import { useApp } from '../context/AppContext';

interface TokenBookingModalProps {
  centre: ProcurementCentre | null;
  onClose: () => void;
}

export const TokenBookingModal: React.FC<TokenBookingModalProps> = ({ centre, onClose }) => {
  const { lang, t } = useLanguage();
  const { bookToken, setViewPassToken, setActiveTab } = useApp();

  const [step, setStep] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  // Form State
  const [farmerName, setFarmerName] = useState<string>('B. Mallesh Yadav');
  const [phone, setPhone] = useState<string>('9848012345');
  const [aadhaarLast4, setAadhaarLast4] = useState<string>('4492');
  const [passbookNo, setPassbookNo] = useState<string>('TS-WGL-2026-8812');

  const [selectedCropId, setSelectedCropId] = useState<string>(
    centre && centre.acceptedCrops.length > 0 ? centre.acceptedCrops[0].cropId : 'paddy-grade-a'
  );
  const [quantityQuintals, setQuantityQuintals] = useState<string>('40');
  const [vehicleType, setVehicleType] = useState<string>('Tractor-Trolley (ట్రాక్టర్)');
  const [vehicleNumber, setVehicleNumber] = useState<string>('TS 03 AA 4521');

  const todayStr = new Date().toISOString().split('T')[0];
  const [slotDate, setSlotDate] = useState<string>(todayStr);
  const [slotTime, setSlotTime] = useState<string>('11:00 AM - 12:00 PM');

  if (!centre) return null;

  const centreName =
    lang === 'te' && centre.name_te
      ? centre.name_te
      : lang === 'hi' && centre.name_hi
      ? centre.name_hi
      : centre.name;

  const currentCrop = centre.acceptedCrops.find((c) => c.cropId === selectedCropId) || centre.acceptedCrops[0];

  const qty = parseFloat(quantityQuintals) || 0;
  const unitRate = (currentCrop?.msp || 2300) + (currentCrop?.bonus || 0);
  const totalEstPayout = Math.round(qty * unitRate);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!farmerName.trim() || !phone.trim() || phone.length < 10) {
      setError('Please provide a valid farmer name and 10-digit phone number.');
      return;
    }

    try {
      setLoading(true);
      setError('');

      const token = await bookToken({
        centreId: centre.id,
        centreName: centre.name,
        farmerName,
        phone,
        aadhaarLast4,
        passbookNo,
        cropId: currentCrop.cropId,
        cropName: currentCrop.name,
        quantityQuintals: qty,
        vehicleType,
        vehicleNumber,
        slotDate,
        slotTime
      });

      // Confetti burst
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });

      setLoading(false);
      onClose();
      setViewPassToken(token);
      setActiveTab('queue');
    } catch (err: any) {
      setLoading(false);
      setError(err.message || 'Failed to generate token');
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-fadeIn">
      <div className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl border border-slate-200 overflow-hidden relative max-h-[95vh] flex flex-col">
        {/* Header */}
        <div className="p-6 bg-gradient-to-r from-agri-800 to-agri-700 text-white relative">
          <button
            onClick={onClose}
            className="absolute top-5 right-5 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="text-xs font-bold text-agri-200 uppercase tracking-wider mb-1">
            {centre.district} • {t('bookSlotTitle')}
          </div>
          <h2 className="text-xl sm:text-2xl font-extrabold pr-8">
            {centreName}
          </h2>

          {/* Stepper Dots */}
          <div className="flex items-center space-x-2 mt-4">
            <div
              className={`flex-1 h-1.5 rounded-full transition-all ${
                step >= 1 ? 'bg-amber-400' : 'bg-white/20'
              }`}
            />
            <div
              className={`flex-1 h-1.5 rounded-full transition-all ${
                step >= 2 ? 'bg-amber-400' : 'bg-white/20'
              }`}
            />
            <div
              className={`flex-1 h-1.5 rounded-full transition-all ${
                step >= 3 ? 'bg-amber-400' : 'bg-white/20'
              }`}
            />
          </div>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto flex-1 space-y-6">
          {error && (
            <div className="p-3 rounded-xl bg-rose-50 border border-rose-300 text-rose-800 text-xs font-bold">
              {error}
            </div>
          )}

          {/* STEP 1: Farmer Information */}
          {step === 1 && (
            <div className="space-y-4 animate-fadeIn">
              <div className="text-sm font-bold text-slate-900 border-b pb-2">
                {t('step1Title')}
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                  {t('farmerNameLabel')} *
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                  <input
                    type="text"
                    required
                    value={farmerName}
                    onChange={(e) => setFarmerName(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-agri-500 focus:outline-none"
                    placeholder="Enter full name as in Passbook"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    {t('farmerPhoneLabel')} *
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                    <input
                      type="tel"
                      required
                      maxLength={10}
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-agri-500 focus:outline-none"
                      placeholder="10-digit mobile number"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    {t('aadhaarLabel')}
                  </label>
                  <div className="relative">
                    <CreditCard className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                    <input
                      type="text"
                      maxLength={4}
                      value={aadhaarLast4}
                      onChange={(e) => setAadhaarLast4(e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-agri-500 focus:outline-none"
                      placeholder="e.g. 4589"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                  {t('passbookLabel')}
                </label>
                <div className="relative">
                  <FileText className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                  <input
                    type="text"
                    value={passbookNo}
                    onChange={(e) => setPassbookNo(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-agri-500 focus:outline-none"
                    placeholder="e.g. TS-WGL-2024-XXXX"
                  />
                </div>
              </div>
            </div>
          )}

          {/* STEP 2: Crop & Transport Details */}
          {step === 2 && (
            <div className="space-y-4 animate-fadeIn">
              <div className="text-sm font-bold text-slate-900 border-b pb-2">
                {t('step2Title')}
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                  {t('selectCropLabel')} *
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {centre.acceptedCrops.map((crop) => {
                    const isSelected = crop.cropId === selectedCropId;
                    const cropTitle =
                      lang === 'te' && crop.name_te ? crop.name_te : crop.name;
                    return (
                      <div
                        key={crop.cropId}
                        onClick={() => setSelectedCropId(crop.cropId)}
                        className={`p-3 rounded-2xl border-2 cursor-pointer transition flex items-center justify-between ${
                          isSelected
                            ? 'border-agri-600 bg-agri-50/80 shadow-xs'
                            : 'border-slate-200 hover:border-slate-300'
                        }`}
                      >
                        <div>
                          <div className="font-bold text-sm text-slate-900">
                            {cropTitle}
                          </div>
                          <div className="text-xs text-agri-700 font-bold">
                            MSP: ₹{crop.msp} {crop.bonus ? `+ ₹${crop.bonus} Bonus` : ''}
                          </div>
                        </div>
                        {isSelected && <CheckCircle2 className="w-5 h-5 text-agri-600" />}
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    {t('cropQuantityLabel')} *
                  </label>
                  <div className="relative">
                    <Package className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                    <input
                      type="number"
                      min="1"
                      max="1000"
                      required
                      value={quantityQuintals}
                      onChange={(e) => setQuantityQuintals(e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-agri-500 focus:outline-none font-bold"
                      placeholder="e.g. 40"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    {t('vehicleTypeLabel')}
                  </label>
                  <select
                    value={vehicleType}
                    onChange={(e) => setVehicleType(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-agri-500 focus:outline-none"
                  >
                    <option value="Tractor-Trolley (ట్రాక్టర్)">Tractor-Trolley (ట్రాక్టర్)</option>
                    <option value="Mini-Truck / DCM (డీసీఎం / బొలేరో)">Mini-Truck / DCM (డీసీఎం / బొలేరో)</option>
                    <option value="Auto Trolley (ఆటో ట్రాలీ)">Auto Trolley (ఆటో ట్రాలీ)</option>
                    <option value="Bullock Cart (ఎద్దుల బండి)">Bullock Cart (ఎద్దుల బండి)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                  {t('vehicleNumberLabel')}
                </label>
                <div className="relative">
                  <Truck className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                  <input
                    type="text"
                    value={vehicleNumber}
                    onChange={(e) => setVehicleNumber(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-agri-500 focus:outline-none"
                    placeholder="e.g. TS 03 AA 4521"
                  />
                </div>
              </div>
            </div>
          )}

          {/* STEP 3: Date, Slot & Review */}
          {step === 3 && (
            <div className="space-y-4 animate-fadeIn">
              <div className="text-sm font-bold text-slate-900 border-b pb-2">
                {t('step3Title')}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    {t('selectDateLabel')} *
                  </label>
                  <div className="relative">
                    <Calendar className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                    <input
                      type="date"
                      required
                      value={slotDate}
                      onChange={(e) => setSlotDate(e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-agri-500 focus:outline-none font-semibold"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    {t('selectSlotLabel')} *
                  </label>
                  <select
                    value={slotTime}
                    onChange={(e) => setSlotTime(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-agri-500 focus:outline-none font-semibold"
                  >
                    <option value="08:30 AM - 09:30 AM">08:30 AM - 09:30 AM (Early Slot)</option>
                    <option value="09:30 AM - 10:30 AM">09:30 AM - 10:30 AM</option>
                    <option value="10:30 AM - 11:30 AM">10:30 AM - 11:30 AM</option>
                    <option value="11:30 AM - 12:30 PM">11:30 AM - 12:30 PM</option>
                    <option value="02:00 PM - 03:00 PM">02:00 PM - 03:00 PM (Afternoon)</option>
                    <option value="03:00 PM - 04:00 PM">03:00 PM - 04:00 PM</option>
                  </select>
                </div>
              </div>

              {/* Earnings & Confirmation Summary Card */}
              <div className="p-4 rounded-2xl bg-gradient-to-r from-amber-500/10 via-emerald-500/10 to-agri-500/10 border border-agri-200 space-y-2">
                <div className="flex items-center justify-between text-xs text-slate-600">
                  <span>Procurement Rate:</span>
                  <span className="font-bold text-slate-900 font-mono">
                    ₹{unitRate}/Quintal (MSP ₹{currentCrop?.msp} {currentCrop?.bonus ? `+ Bonus ₹${currentCrop?.bonus}` : ''})
                  </span>
                </div>

                <div className="flex items-center justify-between text-xs text-slate-600">
                  <span>Quantity Booked:</span>
                  <span className="font-bold text-slate-900 font-mono">{qty} Quintals</span>
                </div>

                <div className="pt-2 border-t border-agri-300/60 flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-800 uppercase">
                    {t('estEarnings')}
                  </span>
                  <span className="text-xl font-black text-emerald-800 font-mono">
                    ₹{totalEstPayout.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* Stepper Navigation Buttons */}
          <div className="flex items-center justify-between pt-4 border-t border-slate-200">
            {step > 1 ? (
              <button
                type="button"
                onClick={() => setStep(step - 1)}
                className="px-4 py-2.5 rounded-xl border border-slate-300 text-slate-700 font-semibold text-xs sm:text-sm hover:bg-slate-100 transition flex items-center space-x-1 cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>{t('backBtn')}</span>
              </button>
            ) : (
              <div />
            )}

            {step < 3 ? (
              <button
                type="button"
                onClick={() => setStep(step + 1)}
                className="px-6 py-2.5 rounded-xl bg-agri-600 hover:bg-agri-700 text-white font-bold text-xs sm:text-sm shadow-md shadow-agri-600/20 transition flex items-center space-x-1 cursor-pointer"
              >
                <span>{t('nextBtn')}</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                type="submit"
                disabled={loading}
                className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-agri-600 to-emerald-600 hover:from-agri-700 hover:to-emerald-700 text-white font-black text-xs sm:text-sm shadow-lg shadow-agri-600/30 transition flex items-center space-x-2 cursor-pointer disabled:opacity-50"
              >
                <Sparkles className="w-4 h-4 text-amber-300" />
                <span>{loading ? 'Booking...' : t('confirmBookingBtn')}</span>
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};
