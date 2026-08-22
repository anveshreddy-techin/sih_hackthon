import React, { useEffect, useState } from 'react';
import QRCode from 'qrcode';
import {
  X,
  Download,
  Share2,
  Printer,
  ShieldCheck,
  CheckCircle2,
  Calendar,
  Clock,
  Truck,
  User,
  Package,
  FileText
} from 'lucide-react';
import { DigitalToken } from '../types';
import { useLanguage } from '../context/LanguageContext';
import { generateTokenPdf } from '../utils/pdfExport';

interface TokenPassModalProps {
  token: DigitalToken | null;
  onClose: () => void;
}

export const TokenPassModal: React.FC<TokenPassModalProps> = ({ token, onClose }) => {
  const { lang, t } = useLanguage();
  const [qrUrl, setQrUrl] = useState<string>('');
  const [isExporting, setIsExporting] = useState<boolean>(false);

  useEffect(() => {
    if (token) {
      const qrData = JSON.stringify({
        token: token.tokenNumber,
        centre: token.centreName,
        farmer: token.farmerName,
        crop: token.cropName,
        qty: token.quantityQuintals,
        slot: `${token.slotDate} ${token.slotTime}`,
        vehicle: token.vehicleNumber
      });

      QRCode.toDataURL(qrData, { width: 280, margin: 1 })
        .then((url) => setQrUrl(url))
        .catch((err) => console.error(err));
    }
  }, [token]);

  if (!token) return null;

  const handleDownload = async () => {
    try {
      setIsExporting(true);
      await generateTokenPdf(token);
      setIsExporting(false);
    } catch (e) {
      console.error('PDF export failed:', e);
      setIsExporting(false);
    }
  };

  const handleShareWhatsApp = () => {
    const text = `🌾 *KisanSetu Official Delivery Pass*\nToken: *${token.tokenNumber}*\nFarmer: ${token.farmerName}\nCentre: ${token.centreName}\nCrop: ${token.cropName} (${token.quantityQuintals} Quintals)\nSlot: ${token.slotDate} (${token.slotTime})\nVehicle: ${token.vehicleNumber}`;
    const url = `https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-fadeIn">
      <div className="bg-white w-full max-w-lg rounded-3xl shadow-2xl border border-slate-200 overflow-hidden relative max-h-[95vh] flex flex-col">
        {/* Pass Header */}
        <div className="p-6 bg-gradient-to-r from-agri-700 via-agri-800 to-agri-900 text-white relative text-center">
          <button
            onClick={onClose}
            className="absolute top-5 right-5 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-white/15 text-xs font-semibold mb-2">
            <ShieldCheck className="w-4 h-4 text-amber-300" />
            <span>{t('govtAuth')}</span>
          </div>

          <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight">
            {t('passTitle')}
          </h2>
          <p className="text-xs text-agri-100 mt-0.5 font-medium">
            Smart Grain Procurement Entry Authorization
          </p>
        </div>

        {/* Pass Printable Body */}
        <div className="p-6 overflow-y-auto space-y-5 flex-1 bg-slate-50/50">
          {/* Token Big Badge */}
          <div className="p-4 rounded-2xl bg-white border-2 border-agri-500 shadow-sm text-center">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">
              OFFICIAL TOKEN NUMBER
            </span>
            <div className="text-3xl font-black text-slate-900 tracking-wider font-mono mt-0.5">
              {token.tokenNumber}
            </div>

            {/* QR Code */}
            {qrUrl && (
              <div className="my-3 flex justify-center">
                <img
                  src={qrUrl}
                  alt="Token QR Code"
                  className="w-44 h-44 rounded-xl border border-slate-200 p-1 bg-white shadow-xs"
                />
              </div>
            )}

            <p className="text-xs font-semibold text-slate-500">
              {t('scanInstruction')}
            </p>
          </div>

          {/* Details Table */}
          <div className="bg-white rounded-2xl p-4 border border-slate-200 space-y-3 text-xs">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2">
              <span className="text-slate-500 flex items-center gap-1.5">
                <User className="w-3.5 h-3.5 text-agri-600" />
                <span>Farmer Name:</span>
              </span>
              <span className="font-bold text-slate-900 text-sm">
                {token.farmerName}
              </span>
            </div>

            <div className="flex items-center justify-between border-b border-slate-100 pb-2">
              <span className="text-slate-500">Mobile Phone:</span>
              <span className="font-bold text-slate-900 font-mono">
                +91 {token.phone}
              </span>
            </div>

            <div className="flex items-center justify-between border-b border-slate-100 pb-2">
              <span className="text-slate-500">Procurement Centre:</span>
              <span className="font-bold text-slate-900 text-right max-w-[220px]">
                {token.centreName}
              </span>
            </div>

            <div className="flex items-center justify-between border-b border-slate-100 pb-2">
              <span className="text-slate-500 flex items-center gap-1.5">
                <Package className="w-3.5 h-3.5 text-agri-600" />
                <span>Crop & Quantity:</span>
              </span>
              <span className="font-bold text-agri-800">
                {token.cropName} ({token.quantityQuintals} Quintals)
              </span>
            </div>

            <div className="flex items-center justify-between border-b border-slate-100 pb-2">
              <span className="text-slate-500 flex items-center gap-1.5">
                <Truck className="w-3.5 h-3.5 text-agri-600" />
                <span>Vehicle:</span>
              </span>
              <span className="font-bold text-slate-900 font-mono">
                {token.vehicleType} ({token.vehicleNumber})
              </span>
            </div>

            <div className="flex items-center justify-between border-b border-slate-100 pb-2">
              <span className="text-slate-500 flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-agri-600" />
                <span>Allocated Slot:</span>
              </span>
              <span className="font-bold text-amber-700">
                {token.slotDate} | {token.slotTime}
              </span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-slate-500">Passbook ID:</span>
              <span className="font-bold text-slate-700 font-mono">
                {token.passbookNo}
              </span>
            </div>
          </div>
        </div>

        {/* Modal Action Buttons */}
        <div className="p-4 sm:p-6 bg-slate-100 border-t border-slate-200 flex flex-wrap items-center justify-between gap-2">
          <button
            onClick={handleShareWhatsApp}
            className="flex-1 py-2.5 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm transition flex items-center justify-center space-x-1.5 cursor-pointer shadow-xs"
          >
            <Share2 className="w-4 h-4" />
            <span>WhatsApp</span>
          </button>

          <button
            onClick={handleDownload}
            disabled={isExporting}
            className="flex-1 py-2.5 px-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs sm:text-sm transition flex items-center justify-center space-x-1.5 cursor-pointer shadow-xs"
          >
            <Download className="w-4 h-4" />
            <span>{isExporting ? 'Generating...' : t('downloadPdf')}</span>
          </button>

          <button
            onClick={handlePrint}
            className="p-2.5 rounded-xl bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 transition cursor-pointer"
            title={t('printPass')}
          >
            <Printer className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
