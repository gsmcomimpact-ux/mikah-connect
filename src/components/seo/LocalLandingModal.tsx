import React from 'react';
import { LOCAL_SEO_PAGES } from '../../data/localSeoPages';
import { X, MapPin, CheckCircle2, Sparkles, ArrowRight, Heart } from 'lucide-react';

interface LocalLandingModalProps {
  slug: string;
  onClose: () => void;
  onFilterCountry: (country: string) => void;
  onOpenRegister: () => void;
}

export const LocalLandingModal: React.FC<LocalLandingModalProps> = ({
  slug,
  onClose,
  onFilterCountry,
  onOpenRegister,
}) => {
  const pageData = LOCAL_SEO_PAGES.find((p) => p.slug === slug) || LOCAL_SEO_PAGES[0];

  const handleExploreLocal = () => {
    onFilterCountry(pageData.country);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between bg-[#FAF9F6] shrink-0">
          <div className="flex items-center gap-2">
            <MapPin className="w-5 h-5 text-[#0F5132]" />
            <div>
              <h2 className="font-serif-brand text-lg font-bold text-slate-900">
                Rencontre Musulmane en {pageData.country}
              </h2>
              <span className="text-[11px] text-[#0F5132] font-medium block">
                Trouver son futur conjoint pour le mariage
              </span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-200/50"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6 text-xs text-slate-700 leading-relaxed">
          
          <div className="space-y-2">
            <h3 className="font-serif-brand text-2xl font-bold text-[#0F5132]">
              {pageData.title}
            </h3>
            <p className="text-slate-600 text-sm">
              {pageData.description}
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-[#0F5132]/5 border border-[#0F5132]/20 space-y-2">
            <span className="font-bold text-[#0F5132] text-xs uppercase tracking-wider block">
              Spécificités de la communauté en {pageData.country}
            </span>
            <p className="text-slate-700">
              {pageData.communityHighlights}
            </p>
          </div>

          {/* Cities Grid */}
          <div className="space-y-2">
            <span className="font-semibold text-slate-900 block text-xs">
              Villes principales représentées :
            </span>
            <div className="flex flex-wrap gap-2">
              {pageData.cityList.map((city) => (
                <span
                  key={city}
                  className="px-3 py-1.5 rounded-xl bg-slate-100 font-medium text-slate-700 text-xs"
                >
                  📍 {city}
                </span>
              ))}
            </div>
          </div>

          {/* FAQ */}
          <div className="space-y-3 pt-2">
            <span className="font-serif-brand text-base font-bold text-slate-900 block">
              Questions fréquentes pour {pageData.country}
            </span>
            <div className="space-y-3">
              {pageData.faq.map((item, idx) => (
                <div key={idx} className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1">
                  <h4 className="font-semibold text-slate-900 text-xs flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#198754]" />
                    <span>{item.q}</span>
                  </h4>
                  <p className="text-slate-600 text-[11px] pl-5">
                    {item.a}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Action Footer */}
          <div className="pt-4 flex flex-col sm:flex-row items-center gap-3">
            <button
              onClick={handleExploreLocal}
              className="w-full sm:w-auto px-6 py-2.5 bg-[#0F5132] hover:bg-[#198754] text-white text-xs font-semibold rounded-xl transition-colors shadow flex items-center justify-center gap-2"
            >
              <span>Voir les profils en {pageData.country}</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => {
                onClose();
                onOpenRegister();
              }}
              className="w-full sm:w-auto px-6 py-2.5 bg-white border border-[#0F5132] text-[#0F5132] text-xs font-semibold rounded-xl hover:bg-slate-50 transition-colors"
            >
              Créer mon profil pour {pageData.country}
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
