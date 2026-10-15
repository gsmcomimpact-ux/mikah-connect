import React, { useState, useMemo } from 'react';
import { UserProfile, CompatibilityScore } from '../../types';
import { ProfileCard } from './ProfileCard';
import { calculateCompatibility } from '../../services/matchingEngine';
import { 
  Filter, 
  RotateCcw, 
  Search, 
  Sparkles, 
  SlidersHorizontal, 
  CheckCircle2, 
  MapPin, 
  UserCheck 
} from 'lucide-react';

interface ProfileSearchProps {
  profiles: UserProfile[];
  currentProfile: UserProfile | null;
  favorites: string[];
  sentInterestIds: string[];
  onViewDetails: (profile: UserProfile) => void;
  onSendInterest: (profile: UserProfile) => void;
  onToggleFavorite: (profileId: string) => void;
}

export const ProfileSearch: React.FC<ProfileSearchProps> = ({
  profiles,
  currentProfile,
  favorites,
  sentInterestIds,
  onViewDetails,
  onSendInterest,
  onToggleFavorite,
}) => {
  // Filters State
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGender, setSelectedGender] = useState<'tous' | 'homme' | 'femme'>('tous');
  const [selectedCountry, setSelectedCountry] = useState<string>('tous');
  const [ageMin, setAgeMin] = useState<number>(20);
  const [ageMax, setAgeMax] = useState<number>(50);
  const [selectedStatus, setSelectedStatus] = useState<string>('tous');
  const [selectedEducation, setSelectedEducation] = useState<string>('tous');
  const [verifiedOnly, setVerifiedOnly] = useState<boolean>(false);
  const [waliOnly, setWaliOnly] = useState<boolean>(false);
  const [sortBy, setSortBy] = useState<'compatibilite' | 'recent' | 'age'>('compatibilite');
  const [showFiltersMobile, setShowFiltersMobile] = useState<boolean>(false);

  // Extract unique countries
  const countries = useMemo(() => {
    const list = Array.from(new Set(profiles.map((p) => p.country)));
    return list.sort();
  }, [profiles]);

  // Compute compatibilities map for current user
  const compatibilities = useMemo(() => {
    const map = new Map<string, CompatibilityScore>();
    if (!currentProfile) return map;
    profiles.forEach((p) => {
      if (p.id !== currentProfile.id) {
        map.set(p.id, calculateCompatibility(currentProfile, p));
      }
    });
    return map;
  }, [profiles, currentProfile]);

  // Filtered & Sorted profiles
  const filteredProfiles = useMemo(() => {
    return profiles.filter((p) => {
      // Exclude self if logged in
      if (currentProfile && p.id === currentProfile.id) return false;

      // Text search
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesName = p.displayName.toLowerCase().includes(q);
        const matchesCity = p.city.toLowerCase().includes(q);
        const matchesJob = p.occupation.toLowerCase().includes(q);
        const matchesBio = p.bio.toLowerCase().includes(q);
        if (!matchesName && !matchesCity && !matchesJob && !matchesBio) return false;
      }

      // Gender filter
      if (selectedGender !== 'tous' && p.gender !== selectedGender) return false;

      // Country filter
      if (selectedCountry !== 'tous' && p.country !== selectedCountry) return false;

      // Age range
      if (p.age < ageMin || p.age > ageMax) return false;

      // Status
      if (selectedStatus !== 'tous' && p.maritalStatus !== selectedStatus) return false;

      // Education
      if (selectedEducation !== 'tous' && p.education !== selectedEducation) return false;

      // Badges
      if (verifiedOnly && !p.verification.identityVerified) return false;
      if (waliOnly && !p.wali.enabled) return false;

      return true;
    }).sort((a, b) => {
      if (sortBy === 'compatibilite') {
        const scoreA = compatibilities.get(a.id)?.totalPercentage || 0;
        const scoreB = compatibilities.get(b.id)?.totalPercentage || 0;
        return scoreB - scoreA;
      }
      if (sortBy === 'age') {
        return a.age - b.age;
      }
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });
  }, [
    profiles,
    currentProfile,
    searchQuery,
    selectedGender,
    selectedCountry,
    ageMin,
    ageMax,
    selectedStatus,
    selectedEducation,
    verifiedOnly,
    waliOnly,
    sortBy,
    compatibilities,
  ]);

  const handleReset = () => {
    setSearchQuery('');
    setSelectedGender('tous');
    setSelectedCountry('tous');
    setAgeMin(20);
    setAgeMax(50);
    setSelectedStatus('tous');
    setSelectedEducation('tous');
    setVerifiedOnly(false);
    setWaliOnly(false);
    setSortBy('compatibilite');
  };

  return (
    <div className="py-12 bg-[#FAF9F6]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-[#0F5132] uppercase tracking-wider">
              <Sparkles className="w-4 h-4 text-[#D4AF37]" />
              <span>Moteur de Découverte Matrimoniale</span>
            </div>
            <h1 className="font-serif-brand text-3xl sm:text-4xl font-bold text-[#0F5132] mt-1">
              Découvrir les profils compatibles
            </h1>
            <p className="text-sm text-slate-600 mt-1 max-w-2xl">
              Parcourez les profils vérifiés de personnes prêtes pour le mariage. Filtrez selon vos critères géographiques, spirituels et personnels.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowFiltersMobile(!showFiltersMobile)}
              className="md:hidden px-4 py-2 bg-white border border-slate-200 rounded-lg text-xs font-semibold text-slate-700 flex items-center gap-2 shadow-sm"
            >
              <SlidersHorizontal className="w-4 h-4 text-[#0F5132]" />
              <span>{showFiltersMobile ? 'Masquer filtres' : 'Afficher filtres'}</span>
            </button>

            <div className="flex items-center gap-2 text-xs text-slate-600">
              <span className="font-semibold text-slate-900">{filteredProfiles.length}</span> profils trouvés
            </div>
          </div>
        </div>

        {/* Filter Controls Bar */}
        <div className={`p-6 rounded-2xl bg-white border border-slate-200/90 shadow-sm space-y-5 ${showFiltersMobile ? 'block' : 'hidden md:block'}`}>
          {/* Top Row: Search & Gender & Country & Sort */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            
            {/* Search Input */}
            <div className="relative">
              <label className="text-[11px] font-semibold text-slate-500 block mb-1">
                Recherche mot-clé ou ville
              </label>
              <div className="relative">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Ex : Niamey, Ingénieur, Lecture..."
                  className="w-full pl-9 pr-3 py-2 text-xs border border-slate-200 rounded-lg focus:ring-2 focus:ring-[#0F5132] outline-none"
                />
              </div>
            </div>

            {/* Gender Select */}
            <div>
              <label className="text-[11px] font-semibold text-slate-500 block mb-1">
                Je recherche
              </label>
              <select
                value={selectedGender}
                onChange={(e) => setSelectedGender(e.target.value as any)}
                className="w-full py-2 px-3 text-xs border border-slate-200 rounded-lg bg-white focus:ring-2 focus:ring-[#0F5132] outline-none"
              >
                <option value="tous">Tous les profils</option>
                <option value="femme">Une femme</option>
                <option value="homme">Un homme</option>
              </select>
            </div>

            {/* Country Select */}
            <div>
              <label className="text-[11px] font-semibold text-slate-500 block mb-1">
                Pays de résidence
              </label>
              <select
                value={selectedCountry}
                onChange={(e) => setSelectedCountry(e.target.value)}
                className="w-full py-2 px-3 text-xs border border-slate-200 rounded-lg bg-white focus:ring-2 focus:ring-[#0F5132] outline-none"
              >
                <option value="tous">Tous les pays</option>
                {countries.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>

            {/* Sorting */}
            <div>
              <label className="text-[11px] font-semibold text-slate-500 block mb-1">
                Trier par
              </label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="w-full py-2 px-3 text-xs border border-slate-200 rounded-lg bg-white focus:ring-2 focus:ring-[#0F5132] outline-none"
              >
                <option value="compatibilite">Score de compatibilité</option>
                <option value="recent">Nouveaux inscrits</option>
                <option value="age">Âge croissant</option>
              </select>
            </div>

          </div>

          {/* Second Row: Age range, Matrimonial Status, Education, Toggles */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-3 border-t border-slate-100 items-end">
            
            {/* Age Min / Max */}
            <div>
              <label className="text-[11px] font-semibold text-slate-500 block mb-1">
                Tranche d'âge ({ageMin} à {ageMax} ans)
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  min={18}
                  max={70}
                  value={ageMin}
                  onChange={(e) => setAgeMin(Number(e.target.value))}
                  className="w-1/2 py-1.5 px-2 text-xs border border-slate-200 rounded-lg text-center"
                />
                <span className="text-slate-400 text-xs">à</span>
                <input
                  type="number"
                  min={18}
                  max={70}
                  value={ageMax}
                  onChange={(e) => setAgeMax(Number(e.target.value))}
                  className="w-1/2 py-1.5 px-2 text-xs border border-slate-200 rounded-lg text-center"
                />
              </div>
            </div>

            {/* Situation matrimoniale */}
            <div>
              <label className="text-[11px] font-semibold text-slate-500 block mb-1">
                Situation matrimoniale
              </label>
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="w-full py-2 px-3 text-xs border border-slate-200 rounded-lg bg-white outline-none"
              >
                <option value="tous">Indifférent</option>
                <option value="celibataire">Célibataire (jamais marié/e)</option>
                <option value="divorce">Divorcé(e)</option>
                <option value="veuf">Veuf / Veuve</option>
              </select>
            </div>

            {/* Niveau d'études */}
            <div>
              <label className="text-[11px] font-semibold text-slate-500 block mb-1">
                Niveau d'études
              </label>
              <select
                value={selectedEducation}
                onChange={(e) => setSelectedEducation(e.target.value)}
                className="w-full py-2 px-3 text-xs border border-slate-200 rounded-lg bg-white outline-none"
              >
                <option value="tous">Indifférent</option>
                <option value="Bac">Bac</option>
                <option value="Bac +2 / Licence">Bac +2 / Licence</option>
                <option value="Bac +5 / Master">Bac +5 / Master</option>
                <option value="Doctorat / Études supérieures">Doctorat / Études sup.</option>
              </select>
            </div>

            {/* Checkbox toggles & Reset */}
            <div className="flex items-center justify-between gap-2 pt-2">
              <label className="flex items-center gap-1.5 text-xs text-slate-700 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={verifiedOnly}
                  onChange={(e) => setVerifiedOnly(e.target.checked)}
                  className="rounded text-[#0F5132] focus:ring-[#0F5132]"
                />
                <span className="truncate">Certifiés uniquement</span>
              </label>

              <button
                onClick={handleReset}
                className="text-xs text-slate-500 hover:text-slate-800 flex items-center gap-1 hover:underline ml-auto"
                title="Réinitialiser les filtres"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Réinitialiser</span>
              </button>
            </div>

          </div>
        </div>

        {/* Profiles Grid */}
        {filteredProfiles.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProfiles.map((p) => (
              <ProfileCard
                key={p.id}
                profile={p}
                compatibility={compatibilities.get(p.id)}
                isFavorite={favorites.includes(p.id)}
                onViewDetails={onViewDetails}
                onSendInterest={onSendInterest}
                onToggleFavorite={onToggleFavorite}
                hasAlreadySentInterest={sentInterestIds.includes(p.id)}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-white rounded-2xl border border-slate-200 p-8 space-y-4">
            <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center mx-auto text-slate-400">
              <Search className="w-6 h-6" />
            </div>
            <h3 className="font-semibold text-lg text-slate-800">
              Aucun profil ne correspond à vos filtres actuels
            </h3>
            <p className="text-xs text-slate-500 max-w-md mx-auto leading-relaxed">
              Essayez d'élargir votre tranche d'âge ou de retirer certains critères sélectifs pour découvrir d'autres membres compatibles.
            </p>
            <button
              onClick={handleReset}
              className="px-4 py-2 bg-[#0F5132] text-white text-xs font-semibold rounded-lg hover:bg-[#198754] transition-colors"
            >
              Réinitialiser les filtres
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
