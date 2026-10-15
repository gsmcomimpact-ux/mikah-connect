import React, { useState } from 'react';
import { VerificationBadges } from '../../types';
import { 
  X, 
  ShieldCheck, 
  Mail, 
  Phone, 
  FileCheck, 
  CheckCircle2, 
  Lock, 
  Send,
  AlertCircle
} from 'lucide-react';

interface VerificationModalProps {
  badges: VerificationBadges;
  onClose: () => void;
  onSubmitVerification: (type: 'email' | 'phone' | 'identity', docType?: 'CNI' | 'Passeport' | 'Permis', docNumber?: string) => void;
}

export const VerificationModal: React.FC<VerificationModalProps> = ({
  badges,
  onClose,
  onSubmitVerification,
}) => {
  const [activeTab, setActiveTab] = useState<'email' | 'phone' | 'identity'>('identity');
  
  // Phone simulation state
  const [phoneCode, setPhoneCode] = useState('');
  const [phoneCodeSent, setPhoneCodeSent] = useState(false);
  const [phoneSuccess, setPhoneSuccess] = useState(false);

  // Identity simulation state
  const [docType, setDocType] = useState<'CNI' | 'Passeport' | 'Permis'>('CNI');
  const [docNumber, setDocNumber] = useState('');
  const [identitySubmitted, setIdentitySubmitted] = useState(false);

  const handleSendPhoneSms = () => {
    setPhoneCodeSent(true);
  };

  const handleVerifyPhoneCode = () => {
    if (phoneCode.trim().length >= 4) {
      onSubmitVerification('phone');
      setPhoneSuccess(true);
    }
  };

  const handleIdentitySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (docNumber.trim().length >= 5) {
      onSubmitVerification('identity', docType, docNumber.trim());
      setIdentitySubmitted(true);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-xl rounded-3xl shadow-2xl border border-slate-200 overflow-hidden">
        
        {/* Header */}
        <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between bg-[#FAF9F6]">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-[#0F5132] flex items-center justify-center text-[#D4AF37]">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-serif-brand text-lg font-bold text-slate-900">
                Centre de Certification & Vérification
              </h2>
              <span className="text-[11px] text-[#0F5132] font-medium block">
                Inspirez confiance et augmentez votre compatibilité
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

        {/* Tab Selectors */}
        <div className="p-4 bg-slate-50 border-b border-slate-100 flex items-center justify-around gap-2 text-xs">
          <button
            onClick={() => setActiveTab('email')}
            className={`py-2 px-3 rounded-xl font-semibold flex items-center gap-1.5 transition-colors ${
              activeTab === 'email'
                ? 'bg-white text-[#0F5132] shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Mail className="w-4 h-4" />
            <span>Email</span>
            {badges.emailVerified && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />}
          </button>

          <button
            onClick={() => setActiveTab('phone')}
            className={`py-2 px-3 rounded-xl font-semibold flex items-center gap-1.5 transition-colors ${
              activeTab === 'phone'
                ? 'bg-white text-[#0F5132] shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Phone className="w-4 h-4" />
            <span>Téléphone</span>
            {badges.phoneVerified && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />}
          </button>

          <button
            onClick={() => setActiveTab('identity')}
            className={`py-2 px-3 rounded-xl font-semibold flex items-center gap-1.5 transition-colors ${
              activeTab === 'identity'
                ? 'bg-white text-[#0F5132] shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <FileCheck className="w-4 h-4" />
            <span>Identité (Badge d'or)</span>
            {badges.identityVerified && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />}
          </button>
        </div>

        {/* Tab Content */}
        <div className="p-6 space-y-5 text-xs text-slate-700">
          
          {/* Email Tab */}
          {activeTab === 'email' && (
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-100 flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                <div>
                  <h4 className="font-semibold text-emerald-900 text-sm">
                    Adresse email vérifiée
                  </h4>
                  <p className="text-[11px] text-emerald-700 mt-0.5 leading-relaxed">
                    Votre compte est relié à une adresse valide. Vous recevez nos alertes de messages et de compatibilité.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Phone Tab */}
          {activeTab === 'phone' && (
            <div className="space-y-4">
              {badges.phoneVerified || phoneSuccess ? (
                <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-100 flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                  <div>
                    <h4 className="font-semibold text-emerald-900 text-sm">
                      Numéro de téléphone vérifié
                    </h4>
                    <p className="text-[11px] text-emerald-700 mt-0.5">
                      Votre badge « Téléphone vérifié » est actif sur votre profil public.
                    </p>
                  </div>
                </div>
              ) : (
                <div className="space-y-3">
                  <p className="text-slate-600 leading-relaxed">
                    Recevez un code de validation à 4 chiffres par SMS pour certifier votre authenticité auprès des autres prétendants.
                  </p>

                  {!phoneCodeSent ? (
                    <button
                      onClick={handleSendPhoneSms}
                      className="w-full py-2.5 bg-[#0F5132] hover:bg-[#198754] text-white font-semibold rounded-xl transition-colors shadow"
                    >
                      Envoyer le code par SMS
                    </button>
                  ) : (
                    <div className="space-y-3">
                      <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                        <label className="font-semibold text-slate-700 block mb-1">
                          Entrez le code reçu (Code test : 4821) :
                        </label>
                        <input
                          type="text"
                          value={phoneCode}
                          onChange={(e) => setPhoneCode(e.target.value)}
                          placeholder="Ex : 4821"
                          maxLength={6}
                          className="w-full p-2 border border-slate-200 rounded-lg text-center tracking-widest text-base font-bold outline-none"
                        />
                      </div>
                      <button
                        onClick={handleVerifyPhoneCode}
                        className="w-full py-2.5 bg-[#0F5132] hover:bg-[#198754] text-white font-semibold rounded-xl transition-colors shadow"
                      >
                        Valider mon numéro
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {/* Identity Tab */}
          {activeTab === 'identity' && (
            <div className="space-y-4">
              {badges.identityVerified ? (
                <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-100 flex items-start gap-3">
                  <ShieldCheck className="w-6 h-6 text-emerald-600 shrink-0" />
                  <div>
                    <h4 className="font-semibold text-emerald-900 text-sm">
                      Identité officielle certifiée
                    </h4>
                    <p className="text-[11px] text-emerald-700 mt-0.5">
                      Félicitations, votre profil bénéficie du badge de confiance maximal. Vos documents originaux restent strictement masqués et protégés.
                    </p>
                  </div>
                </div>
              ) : identitySubmitted ? (
                <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-amber-700 shrink-0" />
                  <div>
                    <h4 className="font-semibold text-amber-900 text-sm">
                      Demande transmise avec succès
                    </h4>
                    <p className="text-[11px] text-amber-700 mt-0.5">
                      Votre justificatif a été transmis de manière chiffrée. Notre équipe de modération valide les demandes sous 24h.
                    </p>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleIdentitySubmit} className="space-y-4">
                  <div className="p-3.5 rounded-xl bg-[#FAF9F6] border border-slate-200 flex items-start gap-2.5">
                    <Lock className="w-4 h-4 text-[#0F5132] shrink-0 mt-0.5" />
                    <p className="text-[11px] text-slate-600 leading-relaxed">
                      <strong>Garantie de stricte confidentialité :</strong> Les pièces d'identité ne sont <strong>JAMAIS</strong> affichées sur le site ni communiquées à quiconque. Elles servent uniquement à certifier votre identité légale.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="font-semibold text-slate-700 block mb-1">
                        Type de document
                      </label>
                      <select
                        value={docType}
                        onChange={(e) => setDocType(e.target.value as any)}
                        className="w-full p-2.5 border border-slate-200 rounded-xl bg-white outline-none"
                      >
                        <option value="CNI">Carte Nationale d'Identité</option>
                        <option value="Passeport">Passeport</option>
                        <option value="Permis">Permis de conduire</option>
                      </select>
                    </div>

                    <div>
                      <label className="font-semibold text-slate-700 block mb-1">
                        Numéro de pièce (Masqué) *
                      </label>
                      <input
                        type="text"
                        required
                        value={docNumber}
                        onChange={(e) => setDocNumber(e.target.value)}
                        placeholder="Ex : 23AB45678"
                        className="w-full p-2.5 border border-slate-200 rounded-xl outline-none"
                      />
                    </div>
                  </div>

                  <div className="border-2 border-dashed border-slate-200 rounded-2xl p-6 text-center space-y-2 hover:border-[#0F5132] transition-colors bg-slate-50/50 cursor-pointer">
                    <FileCheck className="w-8 h-8 text-[#0F5132] mx-auto opacity-70" />
                    <span className="font-semibold text-slate-800 block">
                      Téléverser une photo recto de votre document
                    </span>
                    <span className="text-[10px] text-slate-400 block">
                      JPG, PNG ou PDF sécurisé · Max 10 Mo
                    </span>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-2.5 bg-[#0F5132] hover:bg-[#198754] text-white font-semibold rounded-xl transition-colors shadow flex items-center justify-center gap-2"
                  >
                    <Send className="w-4 h-4" />
                    <span>Soumettre pour vérification sécurisée</span>
                  </button>
                </form>
              )}
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
