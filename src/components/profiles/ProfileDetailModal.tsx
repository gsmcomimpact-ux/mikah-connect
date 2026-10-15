import React, { useState } from 'react';
import { UserProfile, CompatibilityScore } from '../../types';
import { 
  X, 
  MapPin, 
  Briefcase, 
  GraduationCap, 
  Globe2, 
  HeartHandshake, 
  ShieldCheck, 
  Sparkles, 
  Heart, 
  ShieldAlert, 
  Users, 
  BookOpen, 
  Send,
  CheckCircle2,
  Lock
} from 'lucide-react';

interface ProfileDetailModalProps {
  profile: UserProfile;
  currentUserProfile: UserProfile | null;
  compatibility?: CompatibilityScore;
  onClose: () => void;
  onSendInterest: (profile: UserProfile, customMessage?: string) => void;
  onReport: (profileId: string) => void;
  onBlock: (profileId: string) => void;
  hasAlreadySentInterest?: boolean;
}

export const ProfileDetailModal: React.FC<ProfileDetailModalProps> = ({
  profile,
  compatibility,
  onClose,
  onSendInterest,
  onReport,
  onBlock,
  hasAlreadySentInterest = false,
}) => {
  const [interestMessage, setInterestMessage] = useState('');
  const [showInterestInput, setShowInterestInput] = useState(false);

  const handleSend = () => {
    onSendInterest(profile, interestMessage.trim() || undefined);
    setShowInterestInput(false);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6">
      <div className="bg-white w-full max-w-3xl rounded-3xl shadow-2xl border border-slate-200 overflow-hidden relative max-h-[92vh] flex flex-col">
        
        {/* Sticky Header */}
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-[#FAF9F6] shrink-0">
          <div className="flex items-center gap-2 text-xs font-semibold text-[#0F5132]">
            <span className="w-2 h-2 rounded-full bg-[#198754]" />
            <span>Fiche matrimoniale certifiée</span>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-200/50 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="overflow-y-auto p-6 space-y-8 text-[#17201A]">
          
          {/* Hero Banner inside modal */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 pb-6 border-b border-slate-100">
            <div className="relative shrink-0">
              <img
                src={profile.photoUrl}
                alt={profile.displayName}
                className="w-28 h-28 sm:w-32 sm:h-32 rounded-2xl object-cover shadow-md border-2 border-white"
                referrerPolicy="no-referrer"
              />
              {profile.verification.identityVerified && (
                <div className="absolute -bottom-2 -right-2 p-1.5 bg-[#198754] text-white rounded-full shadow-md" title="Identité vérifiée">
                  <ShieldCheck className="w-4 h-4" />
                </div>
              )}
            </div>

            <div className="flex-1 space-y-2">
              <div className="flex flex-wrap items-center gap-3">
                <h2 className="font-serif-brand text-2xl sm:text-3xl font-bold text-slate-900">
                  {profile.displayName}, {profile.age} ans
                </h2>
                {profile.isPremium && (
                  <span className="text-[11px] font-semibold text-[#D4AF37] border border-[#D4AF37]/40 px-2 py-0.5 rounded-md">
                    Membre Sérieux
                  </span>
                )}
              </div>

              <div className="flex flex-wrap items-center gap-y-1 gap-x-3 text-xs text-slate-600">
                <span className="flex items-center gap-1 font-medium">
                  <MapPin className="w-3.5 h-3.5 text-[#0F5132]" />
                  {profile.city}, {profile.country}
                </span>
                <span aria-hidden="true">·</span>
                <span className="flex items-center gap-1">
                  <Briefcase className="w-3.5 h-3.5 text-slate-500" />
                  {profile.occupation}
                </span>
                <span aria-hidden="true">·</span>
                <span className="flex items-center gap-1">
                  <GraduationCap className="w-3.5 h-3.5 text-slate-500" />
                  {profile.education}
                </span>
              </div>

              {/* Badges strip */}
              <div className="pt-2 flex flex-wrap items-center gap-2 text-[11px]">
                {profile.verification.emailVerified && (
                  <span className="text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-100 flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" /> Email vérifié
                  </span>
                )}
                {profile.verification.phoneVerified && (
                  <span className="text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-100 flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" /> Téléphone vérifié
                  </span>
                )}
                {profile.verification.identityVerified && (
                  <span className="text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded border border-emerald-200 font-semibold flex items-center gap-1">
                    <ShieldCheck className="w-3 h-3" /> Identité certifiée
                  </span>
                )}
                {profile.wali.enabled && (
                  <span className="text-[#0F5132] bg-[#0F5132]/10 px-2 py-0.5 rounded font-medium flex items-center gap-1">
                    <Users className="w-3 h-3" /> Wali associé ({profile.wali.relationship})
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Compatibility Breakdown (Section 7) */}
          {compatibility && (
            <div className="p-5 rounded-2xl bg-[#0F5132]/5 border border-[#0F5132]/20 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-[#198754]" />
                  <h4 className="font-semibold text-slate-900 text-sm">
                    Indice de Compatibilité Prévisionnelle
                  </h4>
                </div>
                <span className="font-serif-brand font-bold text-xl text-[#0F5132]">
                  {compatibility.totalPercentage} %
                </span>
              </div>

              <div>
                <h5 className="text-xs font-semibold text-slate-700 mb-2">
                  Pourquoi cette compatibilité ?
                </h5>
                <ul className="space-y-1.5">
                  {compatibility.reasons.map((reason, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-xs text-slate-600">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#198754] shrink-0 mt-0.5" />
                      <span>{reason}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-2 border-t border-[#0F5132]/10 grid grid-cols-2 sm:grid-cols-5 gap-2 text-center text-[10px] text-slate-500 font-medium">
                <div>Valeurs : <span className="font-bold text-slate-800">{compatibility.breakdown.values}%</span></div>
                <div>Horizon : <span className="font-bold text-slate-800">{compatibility.breakdown.timeline}%</span></div>
                <div>Famille : <span className="font-bold text-slate-800">{compatibility.breakdown.family}%</span></div>
                <div>Lieu : <span className="font-bold text-slate-800">{compatibility.breakdown.geographic}%</span></div>
                <div>Mode de vie : <span className="font-bold text-slate-800">{compatibility.breakdown.lifestyle}%</span></div>
              </div>
            </div>
          )}

          {/* Bio & Presentation */}
          <div className="space-y-3">
            <h4 className="font-serif-brand text-lg font-bold text-[#0F5132] flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-[#D4AF37]" />
              <span>Présentation personnelle</span>
            </h4>
            <p className="text-sm text-slate-700 leading-relaxed whitespace-pre-line bg-[#FAF9F6] p-4 rounded-xl border border-slate-100">
              {profile.bio}
            </p>
          </div>

          {/* Spiritual & Values Profile */}
          <div className="space-y-3">
            <h4 className="font-serif-brand text-lg font-bold text-[#0F5132] flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#D4AF37]" />
              <span>Pratique religieuse & Valeurs</span>
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                <span className="text-slate-500 block mb-1">Pratique spirituelle :</span>
                <span className="font-semibold text-slate-900">{profile.religiousPractice}</span>
              </div>
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                <span className="text-slate-500 block mb-1">Assiduité à la prière :</span>
                <span className="font-semibold text-slate-900">{profile.prayerHabit}</span>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
              <span className="text-xs text-slate-500 block">Valeurs fondamentales :</span>
              <div className="flex flex-wrap gap-1.5">
                {profile.values.map((v, i) => (
                  <span key={i} className="text-xs font-medium text-slate-700 bg-white border border-slate-200 px-2.5 py-1 rounded-md">
                    {v}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Matrimonial Project & Family Vision */}
          <div className="space-y-3">
            <h4 className="font-serif-brand text-lg font-bold text-[#0F5132] flex items-center gap-2">
              <Heart className="w-4 h-4 text-[#D4AF37]" />
              <span>Projet matrimonial & Famille</span>
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                <span className="text-slate-500 block mb-1">Horizon souhaité :</span>
                <span className="font-semibold text-slate-900">{profile.marriageHorizon}</span>
              </div>
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                <span className="text-slate-500 block mb-1">Projet d'enfants :</span>
                <span className="font-semibold text-slate-900">{profile.desireForChildren}</span>
              </div>
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                <span className="text-slate-500 block mb-1">Mobilité géographique :</span>
                <span className="font-semibold text-slate-900">{profile.relocationWillingness}</span>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2 text-xs">
              <span className="text-slate-500 block font-medium">Vision du mariage :</span>
              <p className="text-slate-700 italic">« {profile.marriageVision} »</p>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2 text-xs">
              <span className="text-slate-500 block font-medium">Vision de la famille :</span>
              <p className="text-slate-700">{profile.familyValues}</p>
            </div>
          </div>

          {/* Interests & Languages */}
          <div className="space-y-3">
            <h4 className="font-serif-brand text-lg font-bold text-[#0F5132] flex items-center gap-2">
              <Globe2 className="w-4 h-4 text-[#D4AF37]" />
              <span>Centres d'intérêt & Langues</span>
            </h4>
            <div className="flex flex-wrap gap-2 text-xs">
              {profile.interests.map((it, i) => (
                <span key={i} className="px-3 py-1 bg-slate-100 rounded-md text-slate-700">
                  {it}
                </span>
              ))}
            </div>
            <div className="text-xs text-slate-600 flex items-center gap-2 pt-1">
              <span className="font-medium text-slate-500">Langues parlées :</span>
              <span>{profile.languages.join(' · ')}</span>
            </div>
          </div>

          {/* Privacy Reassurance Note */}
          <div className="p-4 rounded-xl bg-[#FAF9F6] border border-slate-200 flex items-center gap-3 text-xs text-slate-500">
            <Lock className="w-4 h-4 text-[#0F5132] shrink-0" />
            <span>
              Les coordonnées privées (téléphone, email, adresse) restent strictement confidentielles et ne sont jamais transmises sans accord réciproque.
            </span>
          </div>

        </div>

        {/* Footer Actions */}
        <div className="p-6 border-t border-slate-200 bg-white shrink-0 space-y-3">
          {showInterestInput && (
            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-700 block">
                Ajouter un mot de présentation respectueux (facultatif) :
              </label>
              <textarea
                value={interestMessage}
                onChange={(e) => setInterestMessage(e.target.value)}
                placeholder="Ex : As-salamu alaykum. J'ai été touché(e) par votre vision du mariage et vos valeurs..."
                rows={2}
                className="w-full text-xs p-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-[#0F5132] focus:border-transparent outline-none"
              />
            </div>
          )}

          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            {/* Moderation links */}
            <div className="flex items-center gap-4 text-xs text-slate-400">
              <button
                onClick={() => onReport(profile.id)}
                className="hover:text-amber-700 transition-colors flex items-center gap-1"
              >
                <ShieldAlert className="w-3.5 h-3.5" />
                <span>Signaler ce profil</span>
              </button>
              <span>·</span>
              <button
                onClick={() => onBlock(profile.id)}
                className="hover:text-rose-700 transition-colors"
              >
                Bloquer
              </button>
            </div>

            {/* Main Decision Buttons */}
            <div className="flex items-center gap-3 w-full sm:w-auto">
              <button
                onClick={onClose}
                className="py-2.5 px-4 rounded-xl border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors"
              >
                Fermer
              </button>

              {hasAlreadySentInterest ? (
                <div className="py-2.5 px-6 rounded-xl bg-emerald-50 text-emerald-800 text-xs font-semibold border border-emerald-200 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Demande déjà envoyée</span>
                </div>
              ) : showInterestInput ? (
                <button
                  onClick={handleSend}
                  className="py-2.5 px-6 rounded-xl bg-[#0F5132] hover:bg-[#198754] text-white text-xs font-semibold transition-colors flex items-center gap-1.5 shadow"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Confirmer la demande</span>
                </button>
              ) : (
                <button
                  onClick={() => setShowInterestInput(true)}
                  className="py-2.5 px-6 rounded-xl bg-[#0F5132] hover:bg-[#198754] text-white text-xs font-semibold transition-colors flex items-center gap-1.5 shadow"
                >
                  <HeartHandshake className="w-4 h-4 text-[#D4AF37]" />
                  <span>Envoyer une demande d'intérêt</span>
                </button>
              )}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
