import React, { useState, useEffect } from 'react';
import {
  Mic,
  MicOff,
  Volume2,
  X,
  Sparkles,
  Bot,
  ArrowRight
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useApp } from '../context/AppContext';
import { speakText } from '../utils/sound';

interface VoiceAssistantProps {
  isOpen: boolean;
  onClose: () => void;
}

export const VoiceAssistant: React.FC<VoiceAssistantProps> = ({ isOpen, onClose }) => {
  const { lang, t } = useLanguage();
  const { setSearchQuery, setSelectedCrop, setSelectedStatus, setActiveTab } = useApp();

  const [isListening, setIsListening] = useState<boolean>(false);
  const [transcript, setTranscript] = useState<string>('');
  const [responseMsg, setResponseMsg] = useState<string>('');
  const [recognition, setRecognition] = useState<any>(null);

  useEffect(() => {
    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (SpeechRecognition) {
      const recog = new SpeechRecognition();
      recog.continuous = false;
      recog.interimResults = true;

      if (lang === 'te') {
        recog.lang = 'te-IN';
      } else if (lang === 'hi') {
        recog.lang = 'hi-IN';
      } else {
        recog.lang = 'en-IN';
      }

      recog.onresult = (event: any) => {
        const current = event.resultIndex;
        const text = event.results[current][0].transcript;
        setTranscript(text);

        if (event.results[current].isFinal) {
          handleVoiceCommand(text);
        }
      };

      recog.onend = () => {
        setIsListening(false);
      };

      recog.onerror = (err: any) => {
        console.warn('Speech recognition error:', err);
        setIsListening(false);
      };

      setRecognition(recog);
    }
  }, [lang]);

  const toggleListening = () => {
    if (!recognition) {
      alert('Speech Recognition is not supported on this browser. Try Chrome/Edge.');
      return;
    }

    if (isListening) {
      recognition.stop();
      setIsListening(false);
    } else {
      setTranscript('');
      setResponseMsg('');
      recognition.start();
      setIsListening(true);
    }
  };

  const handleVoiceCommand = (text: string) => {
    const lower = text.toLowerCase();
    let reply = '';

    // Smart intent matching for Telugu, Hindi, English
    if (lower.includes('వరి') || lower.includes('paddy') || lower.includes('धान')) {
      setSelectedCrop('paddy-grade-a');
      setActiveTab('centres');
      reply =
        lang === 'te'
          ? 'వరి సేకరణ కేంద్రాల వివరాలు చూపిస్తున్నాను.'
          : lang === 'hi'
          ? 'धान खरीद केंद्रों की सूची दिखाई जा रही है।'
          : 'Filtering procurement centres accepting Paddy.';
    } else if (lower.includes('పత్తి') || lower.includes('cotton') || lower.includes('कपास')) {
      setSelectedCrop('cotton-long');
      setActiveTab('centres');
      reply =
        lang === 'te'
          ? 'పత్తి కొనుగోలు కేంద్రాల వివరాలు చూపిస్తున్నాను.'
          : 'Showing procurement centres accepting Cotton.';
    } else if (lower.includes('మిర్చి') || lower.includes('chilli') || lower.includes('గుంటూరు')) {
      setSelectedCrop('chilli');
      setActiveTab('centres');
      reply =
        lang === 'te'
          ? 'మిర్చి కొనుగోలు కేంద్రాల వివరాలు చూపిస్తున్నాను.'
          : 'Showing Red Chilli procurement centres.';
    } else if (lower.includes('మ్యాప్') || lower.includes('map') || lower.includes('దూరం')) {
      setActiveTab('map');
      reply =
        lang === 'te'
          ? 'సేకరణ కేంద్రాల ఇంటరాక్టివ్ మ్యాప్ తెరుస్తున్నాను.'
          : 'Opening interactive procurement map.';
    } else if (lower.includes('ధర') || lower.includes('రేట్') || lower.includes('price') || lower.includes('msp')) {
      setActiveTab('prices');
      reply =
        lang === 'te'
          ? 'కనీస మద్దతు ధరల పట్టిక చూపిస్తున్నాను.'
          : 'Displaying MSP price catalog.';
    } else if (lower.includes('టోకెన్') || lower.includes('token') || lower.includes('క్యూ')) {
      setActiveTab('queue');
      reply =
        lang === 'te'
          ? 'మీ డిజిటల్ టోకెన్ మరియు లైవ్ క్యూ స్థితిని తెరుస్తున్నాను.'
          : 'Opening your live token and queue tracker.';
    } else {
      setSearchQuery(text);
      setActiveTab('centres');
      reply = `Searching centres for: "${text}"`;
    }

    setResponseMsg(reply);
    speakText(reply, lang);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4 animate-fadeIn">
      <div className="bg-white w-full max-w-md rounded-3xl shadow-2xl border border-slate-200 overflow-hidden relative p-6 text-center space-y-6">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-slate-100 text-slate-500 transition cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Assistant Avatar */}
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-agri-600 to-agri-400 text-white flex items-center justify-center mx-auto shadow-lg shadow-agri-600/30">
          <Bot className="w-8 h-8" />
        </div>

        <div>
          <h3 className="text-xl font-extrabold text-slate-900">
            {lang === 'te' ? 'కిసాన్ వాయిస్ సహాయకుడు' : lang === 'hi' ? 'किसान आवाज सहायक' : 'Kisan Voice Assistant'}
          </h3>
          <p className="text-xs text-slate-500 mt-1">
            {t('voicePrompt')}
          </p>
        </div>

        {/* Microphone Pulse Circle */}
        <div className="py-4">
          <button
            onClick={toggleListening}
            className={`w-24 h-24 rounded-full flex items-center justify-center mx-auto transition-all duration-300 shadow-xl cursor-pointer ${
              isListening
                ? 'bg-rose-600 text-white scale-110 shadow-rose-600/40 animate-pulse'
                : 'bg-agri-600 hover:bg-agri-700 text-white shadow-agri-600/30'
            }`}
          >
            {isListening ? (
              <Mic className="w-10 h-10 animate-bounce-soft" />
            ) : (
              <Mic className="w-10 h-10" />
            )}
          </button>

          <p className="text-xs font-bold text-slate-600 mt-3">
            {isListening ? t('listening') : 'Tap to start speaking'}
          </p>
        </div>

        {/* Transcript Box */}
        {transcript && (
          <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-left">
            <span className="text-[10px] font-bold text-slate-400 uppercase">You said:</span>
            <p className="text-sm font-semibold text-slate-800 italic mt-0.5">"{transcript}"</p>
          </div>
        )}

        {/* Response Box */}
        {responseMsg && (
          <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-300 text-left flex items-start space-x-2">
            <Sparkles className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
            <p className="text-xs font-bold text-emerald-900 leading-relaxed">{responseMsg}</p>
          </div>
        )}

        {/* Preset Sample Questions */}
        <div className="text-left space-y-2 pt-2 border-t border-slate-100">
          <span className="text-[10px] font-bold text-slate-400 uppercase">Try asking:</span>
          <div className="flex flex-wrap gap-1.5 text-xs">
            <button
              onClick={() => handleVoiceCommand('వరి కేంద్రాలు ఎక్కడ ఉన్నాయి?')}
              className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 transition cursor-pointer"
            >
              🌾 వరి కేంద్రాలు (Paddy)
            </button>
            <button
              onClick={() => handleVoiceCommand('పత్తి ధర ఎంత?')}
              className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 transition cursor-pointer"
            >
              ☁️ పత్తి ధర (Cotton MSP)
            </button>
            <button
              onClick={() => handleVoiceCommand('మ్యాప్ చూపించు')}
              className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 transition cursor-pointer"
            >
              🗺️ మ్యాప్ (Map View)
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
