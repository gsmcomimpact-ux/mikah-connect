import React from 'react';
import { UserProfile, CompatibilityScore } from '../../types';
import { 
  ShieldCheck, 
  MapPin, 
  Briefcase, 
  GraduationCap, 
  Globe2, 
  HeartHandshake, 
  Heart, 
  Sparkles,
  Users
} from 'lucide-react';

interface ProfileCardProps {
  profile: UserProfile;
  compatibility?: CompatibilityScore;
  isFavorite: boolean;
  onViewDetails: (profile: UserProfile) => void;
  onSendInterest: (profile: UserProfile) => void;
  onToggleFavorite: (profileId: string) => void;
  hasAlreadySentInterest?: boolean;
}

export const ProfileCard: React.FC<ProfileCardProps> = ({
  profile,
  compatibility,
  isFavorite,
  onViewDetails,
  onSendInterest,
  onToggleFavorite,
  hasAlreadySentInterest = false,
}) => {
  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm hover:shadow-md hover:border-[#0F5132]/30 transition-all flex flex-col justify-between overflow-hidden group">
      
      {/* Top Header: Identity & Photo in modest banner */}
      <div>
        <div className="p-5 pb-4 flex items-start gap-4">
          {/* Modest Avatar Frame (dignified, not dominant) */}
          <div className="relative shrink-0">
            <img
              src={profile.photoUrl}
              alt={profile.displayName}
              className="w-20 h-20 rounded-xl object-cover border-2 border-slate-100 shadow-sm"
              referrerPolicy="no-referrer"
            />
            {profile.verification.identityVerified && (
              <div 
                className="absolute -bottom-1 -right-1 p-1 bg-[#198754] text-white rounded-full shadow"
                title="Identité vérifiée"
              >
                <ShieldCheck className="w-3.5 h-3.5" />
              </div>
            )}
          </div>

          {/* Core Info */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-1">
              <div>
                <h3 className="font-serif-brand font-bold text-lg text-slate-900 truncate">
                  {profile.displayName}, {profile.age} ans
                </h3>
                <div className="flex items-center gap-1 text-xs text-slate-600 mt-0.5">
                  <MapPin className="w-3.5 h-3.5 text-[#0F5132] shrink-0" />
                  <span className="truncate">{profile.city}, {profile.country}</span>
                </div>
              </div>

              {/* Favorite Button */}
              <button
                onClick={() => onToggleFavorite(profile.id)}
                className={`p-2 rounded-lg transition-colors ${
                  isFavorite 
                    ? 'text-rose-600 bg-rose-50' 
                    : 'text-slate-400 hover:text-slate-600 hover:bg-slate-100'
                }`}
                title={isFavorite ? 'Retirer des favoris' : 'Ajouter aux favoris'}
              >
                <Heart className={`w-4 h-4 ${isFavorite ? 'fill-rose-600' : ''}`} />
              </button>
            </div>

            {/* Compatibility % if available */}
            {compatibility && (
              <div className="mt-2 flex items-center gap-1.5 text-xs">
                <Sparkles className="w-3.5 h-3.5 text-[#198754]" />
                <span className="font-bold text-[#198754] font-mono tabular-nums">
                  {compatibility.totalPercentage} % compatible
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Unboxed Metadata (Zero-Pill Rule) */}
        <div className="px-5 py-2.5 bg-[#FAF9F6] border-y border-slate-100 text-xs text-slate-600 space-y-1.5">
          <div className="flex items-center gap-2 truncate">
            <Briefcase className="w-3.5 h-3.5 text-[#0F5132] shrink-0" />
            <span className="truncate font-medium">{profile.occupation}</span>
          </div>

          <div className="flex items-center gap-2 text-slate-500 text-[11px]">
            <GraduationCap className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <span>{profile.education}</span>
            <span aria-hidden="true">·</span>
            <Globe2 className="w-3 h-3 text-slate-400 shrink-0" />
            <span className="truncate">{profile.languages.slice(0, 2).join(', ')}</span>
          </div>
        </div>

        {/* Bio Excerpt & Matrimonial Vision */}
        <div className="p-5 pt-3 space-y-2 text-xs text-slate-600">
          <p className="line-clamp-2 leading-relaxed">
            {profile.bio}
          </p>

          <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
            <span className="font-medium text-[#0F5132]">
              Horizon : {profile.marriageHorizon}
            </span>
            {profile.wali.enabled && (
              <span className="flex items-center gap-1 text-[#0F5132]" title="Wali impliqué">
                <Users className="w-3 h-3" /> Wali actif
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Action Footer */}
      <div className="p-5 pt-0 grid grid-cols-2 gap-2">
        <button
          onClick={() => onViewDetails(profile)}
          className="w-full py-2.5 px-3 rounded-lg text-xs font-semibold text-[#0F5132] bg-[#0F5132]/5 hover:bg-[#0F5132]/10 transition-colors text-center truncate"
        >
          Voir le profil
        </button>

        <button
          onClick={() => onSendInterest(profile)}
          disabled={hasAlreadySentInterest}
          className={`w-full py-2.5 px-3 rounded-lg text-xs font-semibold transition-colors flex items-center justify-center gap-1.5 truncate ${
            hasAlreadySentInterest
              ? 'bg-emerald-50 text-emerald-700 border border-emerald-200 cursor-default'
              : 'bg-[#0F5132] hover:bg-[#198754] text-white shadow-sm'
          }`}
        >
          <HeartHandshake className="w-3.5 h-3.5" />
          <span>{hasAlreadySentInterest ? 'Demande envoyée' : 'Envoyer une demande'}</span>
        </button>
      </div>

    </div>
  );
};
