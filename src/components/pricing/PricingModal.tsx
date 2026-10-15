import React, { useState } from 'react';
import { X, CheckCircle2, Crown, Sparkles, Shield, HeartHandshake } from 'lucide-react';
import { UserProfile } from '../../types';

interface PricingModalProps {
  currentProfile: UserProfile;
  onClose: () => void;
  onUpgradeSuccess: () => void;
}

export const PricingModal: React.FC<PricingModalProps> = ({
  currentProfile,
  onClose,
  onUpgradeSuccess,
}) => {
  const [selectedPlan, setSelectedPlan] = useState<'1month' | '3months'>('3months');
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSimulateSubscribe = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      onUpgradeSuccess();
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl border border-slate-200 overflow-hidden">
        
        {/* Header */}
        <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between bg-[#FAF9F6]">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-[#D4AF37]/20 flex items-center justify-center text-[#D4AF37]">
              <Crown className="w-5 h-5 text-[#0F5132]" />
            </div>
            <div>
              <h2 className="font-serif-brand text-lg font-bold text-slate-900">
                Formules d'Accompagnement Matrimonial
              </h2>
              <span className="text-[11px] text-[#0F5132] font-medium block">
                Investissez sereinement dans votre futur foyer
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

        {/* Body */}
        <div className="p-6 sm:p-8 space-y-6">
          <div className="text-center max-w-md mx-auto space-y-2">
            <h3 className="font-serif-brand text-2xl font-bold text-[#0F5132]">
              L'adhésion pour les démarches sérieuses
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Une modeste participation permet de maintenir une modération humaine continue, de vérifier l'authenticité des profils et d'éliminer toute démarche superficielle.
            </p>
          </div>

          {/* Pricing Options */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            <div
              onClick={() => setSelectedPlan('1month')}
              className={`p-5 rounded-2xl border-2 cursor-pointer transition-all ${
                selectedPlan === '1month'
                  ? 'border-[#0F5132] bg-[#0F5132]/5 shadow-sm'
                  : 'border-slate-200 hover:border-slate-300'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-700 uppercase">1 Mois</span>
                {selectedPlan === '1month' && <span className="w-3 h-3 rounded-full bg-[#0F5132]" />}
              </div>
              <div className="mt-2 text-2xl font-bold text-slate-900">
                19,90 € <span className="text-xs font-normal text-slate-500">/ mois</span>
              </div>
              <p className="text-[11px] text-slate-500 mt-1">Sans engagement, renouvelable au besoin</p>
            </div>

            <div
              onClick={() => setSelectedPlan('3months')}
              className={`p-5 rounded-2xl border-2 cursor-pointer transition-all relative ${
                selectedPlan === '3months'
                  ? 'border-[#0F5132] bg-[#0F5132]/5 shadow-md'
                  : 'border-slate-200 hover:border-slate-300'
              }`}
            >
              <span className="absolute -top-2.5 right-4 bg-[#D4AF37] text-[#17201A] text-[10px] font-bold px-2 py-0.5 rounded-full shadow">
                Recommandé (Économisez 30%)
              </span>
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-700 uppercase">3 Mois (Engagement Serein)</span>
                {selectedPlan === '3months' && <span className="w-3 h-3 rounded-full bg-[#0F5132]" />}
              </div>
              <div className="mt-2 text-2xl font-bold text-slate-900">
                13,90 € <span className="text-xs font-normal text-slate-500">/ mois</span>
              </div>
              <p className="text-[11px] text-slate-500 mt-1">Soit 41,70 € facturés une seule fois</p>
            </div>

          </div>

          {/* Premium Features List */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2.5 text-xs text-slate-700">
            <span className="font-semibold text-slate-900 block text-xs">
              Avantages inclus avec le statut Membre Premium :
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#198754]" />
                <span>Demandes d'intérêt illimitées</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#198754]" />
                <span>Messagerie prioritaire illimitée</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#198754]" />
                <span>Badge or « Membre Sérieux »</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#198754]" />
                <span>Certification d'identité accélérée</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#198754]" />
                <span>Filtres de recherche exclusifs</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#198754]" />
                <span>Support modération privilégié</span>
              </div>
            </div>
          </div>

          {/* Action button */}
          <button
            onClick={handleSimulateSubscribe}
            disabled={isProcessing}
            className="w-full py-3 bg-[#0F5132] hover:bg-[#198754] text-white font-semibold rounded-xl transition-all shadow-md flex items-center justify-center gap-2 text-sm"
          >
            <Crown className="w-4 h-4 text-[#D4AF37]" />
            <span>{isProcessing ? 'Activation en cours...' : 'Activer mon statut Membre Sérieux'}</span>
          </button>

          <p className="text-[11px] text-center text-slate-400">
            Paiement chiffré SSL · Facturation discrète · Annulable en un clic depuis votre espace
          </p>

        </div>

      </div>
    </div>
  );
};
