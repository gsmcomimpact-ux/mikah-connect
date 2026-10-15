import React, { useState } from 'react';
import { 
  X, 
  ArrowRight, 
  ArrowLeft, 
  CheckCircle2, 
  Sparkles, 
  User, 
  Heart, 
  BookOpen, 
  Sliders,
  ShieldCheck
} from 'lucide-react';
import { 
  Gender, 
  MaritalStatus, 
  EducationLevel, 
  MarriageHorizon, 
  ChildrenDesire, 
  ReligiousPracticeLevel, 
  UserProfile, 
  UserAccount,
  UserPreferences
} from '../../types';

interface RegisterWizardProps {
  onClose: () => void;
  onSuccess: (user: UserAccount, profile: UserProfile, prefs: UserPreferences) => void;
}

export const RegisterWizard: React.FC<RegisterWizardProps> = ({
  onClose,
  onSuccess,
}) => {
  const [currentStep, setCurrentStep] = useState<number>(1);

  // Step 1: Account & Base
  const [displayName, setDisplayName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [birthDate, setBirthDate] = useState('1998-05-15');
  const [country, setCountry] = useState('France');
  const [city, setCity] = useState('');

  // Step 2: Personal info
  const [gender, setGender] = useState<Gender>('femme');
  const [maritalStatus, setMaritalStatus] = useState<MaritalStatus>('celibataire');
  const [childrenCount, setChildrenCount] = useState<number>(0);
  const [occupation, setOccupation] = useState('');
  const [education, setEducation] = useState<EducationLevel>('Bac +5 / Master');
  const [languagesInput, setLanguagesInput] = useState('Français, Arabe');
  const [bio, setBio] = useState('');

  // Step 3: Religious Profile
  const [religiousPractice, setReligiousPractice] = useState<ReligiousPracticeLevel>('Pratiquant(e) régulier(e)');
  const [prayerHabit, setPrayerHabit] = useState<'5 prières quotidiennes' | 'Régulière avec assiduité' | 'En progression constante' | 'Personnel'>('5 prières quotidiennes');
  const [selectedValues, setSelectedValues] = useState<string[]>(['Bienveillance', 'Honnêteté', 'Pudeur (Haya)']);
  const [marriageVision, setMarriageVision] = useState('');

  // Step 4: Matrimonial Project
  const [marriageHorizon, setMarriageHorizon] = useState<MarriageHorizon>('Dans les 6 mois');
  const [desireForChildren, setDesireForChildren] = useState<ChildrenDesire>('Oui, certainement');
  const [acceptsPartnerWithChildren, setAcceptsPartnerWithChildren] = useState<boolean>(true);
  const [relocationWillingness, setRelocationWillingness] = useState<'Dans mon pays' | 'Prêt(e) à déménager' | 'À discuter'>('Dans mon pays');
  const [familyValues, setFamilyValues] = useState('');

  // Step 5: Partner Preferences
  const [prefAgeMin, setPrefAgeMin] = useState<number>(24);
  const [prefAgeMax, setPrefAgeMax] = useState<number>(36);
  const [prefCountry, setPrefCountry] = useState<string>('France');

  const availableValues = [
    'Bienveillance',
    'Honnêteté',
    'Pudeur (Haya)',
    'Éducation & Savoir',
    'Soutien mutuel',
    'Douceur',
    'Loyauté',
    'Générosité',
    'Patience',
    'Sens des responsabilités',
    'Hospitalité'
  ];

  const toggleValue = (val: string) => {
    if (selectedValues.includes(val)) {
      setSelectedValues(selectedValues.filter((v) => v !== val));
    } else {
      setSelectedValues([...selectedValues, val]);
    }
  };

  // Helper validation
  const validateStep = (step: number): boolean => {
    if (step === 1) {
      return Boolean(displayName.trim() && email.trim() && phone.trim() && password.length >= 6 && city.trim());
    }
    if (step === 2) {
      return Boolean(occupation.trim() && bio.trim().length >= 20);
    }
    if (step === 3) {
      return Boolean(selectedValues.length >= 2 && marriageVision.trim().length >= 15);
    }
    if (step === 4) {
      return Boolean(familyValues.trim().length >= 10);
    }
    return true;
  };

  const handleNext = () => {
    if (currentStep < 5) {
      setCurrentStep(currentStep + 1);
    } else {
      handleSubmit();
    }
  };

  const calculateAge = (dateString: string): number => {
    const today = new Date();
    const birth = new Date(dateString);
    let age = today.getFullYear() - birth.getFullYear();
    const m = today.getMonth() - birth.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) {
      age--;
    }
    return Math.max(18, age || 25);
  };

  const handleSubmit = () => {
    const newUserId = `user-${Date.now()}`;
    const newProfileId = `prof-${Date.now()}`;
    const calculatedAge = calculateAge(birthDate);

    const languages = languagesInput
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean);

    const newAccount: UserAccount = {
      id: newUserId,
      email: email.trim(),
      phone: phone.trim(),
      role: 'user',
      isSuspended: false,
      profileId: newProfileId,
    };

    const newProfile: UserProfile = {
      id: newProfileId,
      userId: newUserId,
      displayName: displayName.trim(),
      age: calculatedAge,
      gender,
      city: city.trim(),
      country,
      occupation: occupation.trim(),
      education,
      languages: languages.length > 0 ? languages : ['Français'],
      maritalStatus,
      childrenCount,
      bio: bio.trim(),
      photoUrl: gender === 'femme'
        ? 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=600&q=80'
        : 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80',
      religiousPractice,
      prayerHabit,
      values: selectedValues,
      marriageVision: marriageVision.trim(),
      marriageHorizon,
      desireForChildren,
      acceptsPartnerWithChildren,
      relocationWillingness,
      familyValues: familyValues.trim(),
      interests: ['Lecture', 'Spiritualité', 'Famille', 'Nature', 'Cuisine'],
      verification: {
        emailVerified: true,
        phoneVerified: false,
        identityVerified: false,
      },
      wali: {
        enabled: gender === 'femme',
        name: gender === 'femme' ? 'Tuteur familial' : '',
        relationship: 'Père',
        wantsNotificationOnMatch: false,
        wantsIntroductionInChat: false,
      },
      isPremium: false,
      createdAt: new Date().toISOString(),
      lastActive: 'À l\'instant',
    };

    const newPreferences: UserPreferences = {
      ageMin: prefAgeMin,
      ageMax: prefAgeMax,
      countries: [prefCountry],
      acceptChildren: acceptsPartnerWithChildren ? 'oui' : 'indifferent',
      mobilityPreference: 'indifferent',
      verifiedOnly: false,
    };

    onSuccess(newAccount, newProfile, newPreferences);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[92vh]">
        
        {/* Header */}
        <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between bg-[#FAF9F6]">
          <div>
            <span className="text-[11px] font-bold text-[#0F5132] uppercase tracking-wider block">
              Inscription Sérieuse & Mariage
            </span>
            <h2 className="font-serif-brand text-xl font-bold text-slate-900">
              Étape {currentStep} sur 5
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-200/50"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Stepper Progress bar */}
        <div className="w-full bg-slate-100 h-1.5">
          <div
            className="bg-[#0F5132] h-1.5 transition-all duration-300"
            style={{ width: `${(currentStep / 5) * 100}%` }}
          />
        </div>

        {/* Form Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1 text-slate-800">
          
          {/* STEP 1: Identité & Compte */}
          {currentStep === 1 && (
            <div className="space-y-4">
              <div className="space-y-1">
                <h3 className="font-semibold text-base text-slate-900 flex items-center gap-2">
                  <User className="w-4 h-4 text-[#0F5132]" />
                  <span>Vos coordonnées & sécurité du compte</span>
                </h3>
                <p className="text-xs text-slate-500">
                  Votre prénom ou pseudonyme sera visible. Votre email et votre numéro restent strictement privés.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">
                    Prénom ou Pseudonyme *
                  </label>
                  <input
                    type="text"
                    required
                    value={displayName}
                    onChange={(e) => setDisplayName(e.target.value)}
                    placeholder="Ex : Amina ou Tariq"
                    className="w-full p-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#0F5132] outline-none"
                  />
                </div>

                <div>
                  <label className="font-semibold text-slate-700 block mb-1">
                    Date de naissance *
                  </label>
                  <input
                    type="date"
                    required
                    value={birthDate}
                    onChange={(e) => setBirthDate(e.target.value)}
                    className="w-full p-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#0F5132] outline-none"
                  />
                </div>

                <div>
                  <label className="font-semibold text-slate-700 block mb-1">
                    Adresse Email (Confidentielle) *
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="nom@exemple.com"
                    className="w-full p-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#0F5132] outline-none"
                  />
                </div>

                <div>
                  <label className="font-semibold text-slate-700 block mb-1">
                    Numéro de Téléphone (Confidentiel) *
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+33 6 ... ou +227 90 ..."
                    className="w-full p-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#0F5132] outline-none"
                  />
                </div>

                <div>
                  <label className="font-semibold text-slate-700 block mb-1">
                    Mot de passe * (min 6 caractères)
                  </label>
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full p-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#0F5132] outline-none"
                  />
                </div>

                <div>
                  <label className="font-semibold text-slate-700 block mb-1">
                    Pays de résidence *
                  </label>
                  <select
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    className="w-full p-2.5 border border-slate-200 rounded-xl bg-white focus:ring-2 focus:ring-[#0F5132] outline-none"
                  >
                    <option value="France">France</option>
                    <option value="Niger">Niger</option>
                    <option value="Sénégal">Sénégal</option>
                    <option value="Côte d'Ivoire">Côte d'Ivoire</option>
                    <option value="Burkina Faso">Burkina Faso</option>
                    <option value="Belgique">Belgique</option>
                    <option value="Canada">Canada</option>
                    <option value="Algérie">Algérie</option>
                    <option value="Maroc">Maroc</option>
                    <option value="Tunisie">Tunisie</option>
                  </select>
                </div>

                <div className="sm:col-span-2">
                  <label className="font-semibold text-slate-700 block mb-1">
                    Ville de résidence *
                  </label>
                  <input
                    type="text"
                    required
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="Ex : Niamey, Paris, Dakar, Abidjan..."
                    className="w-full p-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#0F5132] outline-none"
                  />
                </div>
              </div>
            </div>
          )}

          {/* STEP 2: Informations personnelles */}
          {currentStep === 2 && (
            <div className="space-y-4 text-xs">
              <div className="space-y-1">
                <h3 className="font-semibold text-base text-slate-900 flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-[#0F5132]" />
                  <span>Informations personnelles & Parcours</span>
                </h3>
                <p className="text-slate-500">
                  Ces renseignements permettent d'évaluer la maturité et les affinités mutuelles.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Sexe *</label>
                  <select
                    value={gender}
                    onChange={(e) => setGender(e.target.value as Gender)}
                    className="w-full p-2.5 border border-slate-200 rounded-xl bg-white outline-none"
                  >
                    <option value="femme">Une femme</option>
                    <option value="homme">Un homme</option>
                  </select>
                </div>

                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Situation matrimoniale *</label>
                  <select
                    value={maritalStatus}
                    onChange={(e) => setMaritalStatus(e.target.value as MaritalStatus)}
                    className="w-full p-2.5 border border-slate-200 rounded-xl bg-white outline-none"
                  >
                    <option value="celibataire">Célibataire (jamais marié/e)</option>
                    <option value="divorce">Divorcé(e)</option>
                    <option value="veuf">Veuf / Veuve</option>
                  </select>
                </div>

                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Nombre d'enfants à charge</label>
                  <input
                    type="number"
                    min={0}
                    max={10}
                    value={childrenCount}
                    onChange={(e) => setChildrenCount(Number(e.target.value))}
                    className="w-full p-2.5 border border-slate-200 rounded-xl outline-none"
                  />
                </div>

                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Profession *</label>
                  <input
                    type="text"
                    required
                    value={occupation}
                    onChange={(e) => setOccupation(e.target.value)}
                    placeholder="Ex : Enseignante, Médecin, Ingénieur..."
                    className="w-full p-2.5 border border-slate-200 rounded-xl outline-none"
                  />
                </div>

                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Niveau d'études *</label>
                  <select
                    value={education}
                    onChange={(e) => setEducation(e.target.value as EducationLevel)}
                    className="w-full p-2.5 border border-slate-200 rounded-xl bg-white outline-none"
                  >
                    <option value="Bac">Bac</option>
                    <option value="Bac +2 / Licence">Bac +2 / Licence</option>
                    <option value="Bac +5 / Master">Bac +5 / Master</option>
                    <option value="Doctorat / Études supérieures">Doctorat / Études supérieures</option>
                    <option value="Autre parcours">Autre parcours</option>
                  </select>
                </div>

                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Langues parlées</label>
                  <input
                    type="text"
                    value={languagesInput}
                    onChange={(e) => setLanguagesInput(e.target.value)}
                    placeholder="Ex : Français, Arabe, Anglais"
                    className="w-full p-2.5 border border-slate-200 rounded-xl outline-none"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="font-semibold text-slate-700 block mb-1">
                    Présentation personnelle (Bio sincère, min. 20 car.) *
                  </label>
                  <textarea
                    rows={3}
                    required
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    placeholder="Décrivez votre caractère, vos aspirations, ce qui vous anime au quotidien..."
                    className="w-full p-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#0F5132] outline-none"
                  />
                </div>
              </div>
            </div>
          )}

          {/* STEP 3: Profil religieux respectueux */}
          {currentStep === 3 && (
            <div className="space-y-4 text-xs">
              <div className="space-y-1">
                <h3 className="font-semibold text-base text-slate-900 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-[#0F5132]" />
                  <span>Profil religieux & Valeurs éthiques</span>
                </h3>
                <p className="text-slate-500">
                  Ces questions sont traitées avec bienveillance et sans jugement de valeur. Elles aident à trouver un rythme spirituel harmonieux.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Pratique religieuse au quotidien</label>
                  <select
                    value={religiousPractice}
                    onChange={(e) => setReligiousPractice(e.target.value as ReligiousPracticeLevel)}
                    className="w-full p-2.5 border border-slate-200 rounded-xl bg-white outline-none"
                  >
                    <option value="Très pratiquant(e) au quotidien">Très pratiquant(e) au quotidien</option>
                    <option value="Pratiquant(e) régulier(e)">Pratiquant(e) régulier(e)</option>
                    <option value="En cheminement / Progression">En cheminement / Progression</option>
                    <option value="Attachement culturel et spirituel">Attachement culturel et spirituel</option>
                  </select>
                </div>

                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Assiduité à la prière (Salat)</label>
                  <select
                    value={prayerHabit}
                    onChange={(e) => setPrayerHabit(e.target.value as any)}
                    className="w-full p-2.5 border border-slate-200 rounded-xl bg-white outline-none"
                  >
                    <option value="5 prières quotidiennes">5 prières quotidiennes</option>
                    <option value="Régulière avec assiduité">Régulière avec assiduité</option>
                    <option value="En progression constante">En progression constante</option>
                    <option value="Personnel">Cheminement personnel</option>
                  </select>
                </div>

                <div className="sm:col-span-2">
                  <label className="font-semibold text-slate-700 block mb-2">
                    Sélectionnez au moins 2 valeurs essentielles pour vous :
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {availableValues.map((val) => {
                      const isSel = selectedValues.includes(val);
                      return (
                        <button
                          key={val}
                          type="button"
                          onClick={() => toggleValue(val)}
                          className={`px-3 py-1.5 rounded-lg border text-xs font-medium transition-colors ${
                            isSel
                              ? 'bg-[#0F5132] text-white border-[#0F5132]'
                              : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                          }`}
                        >
                          {val}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="sm:col-span-2">
                  <label className="font-semibold text-slate-700 block mb-1">
                    Votre vision du mariage (Mawadda & Rahma) *
                  </label>
                  <textarea
                    rows={2}
                    required
                    value={marriageVision}
                    onChange={(e) => setMarriageVision(e.target.value)}
                    placeholder="Ex : Un partenariat d'âmes tourné vers l'agrément divin, fondé sur l'entraide mutuelle..."
                    className="w-full p-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#0F5132] outline-none"
                  />
                </div>
              </div>
            </div>
          )}

          {/* STEP 4: Projet matrimonial */}
          {currentStep === 4 && (
            <div className="space-y-4 text-xs">
              <div className="space-y-1">
                <h3 className="font-semibold text-base text-slate-900 flex items-center gap-2">
                  <Heart className="w-4 h-4 text-[#0F5132]" />
                  <span>Projet matrimonial & Vision de la famille</span>
                </h3>
                <p className="text-slate-500">
                  Clarifier vos objectifs concrets pour avancer sans incertitude.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">
                    Horizon souhaité pour concrétiser le mariage *
                  </label>
                  <select
                    value={marriageHorizon}
                    onChange={(e) => setMarriageHorizon(e.target.value as MarriageHorizon)}
                    className="w-full p-2.5 border border-slate-200 rounded-xl bg-white outline-none"
                  >
                    <option value="Dans les 6 mois">Dans les 6 mois</option>
                    <option value="D'ici 1 an">D'ici 1 an</option>
                    <option value="D'ici 2 ans">D'ici 2 ans</option>
                    <option value="Dès que la bonne personne est trouvée">Dès que la bonne personne est trouvée</option>
                  </select>
                </div>

                <div>
                  <label className="font-semibold text-slate-700 block mb-1">
                    Souhaitez-vous avoir des enfants ? *
                  </label>
                  <select
                    value={desireForChildren}
                    onChange={(e) => setDesireForChildren(e.target.value as ChildrenDesire)}
                    className="w-full p-2.5 border border-slate-200 rounded-xl bg-white outline-none"
                  >
                    <option value="Oui, certainement">Oui, certainement</option>
                    <option value="Ouvert à en discuter">Ouvert à en discuter</option>
                    <option value="Non / Pas dans l'immédiat">Non / Pas dans l'immédiat</option>
                  </select>
                </div>

                <div>
                  <label className="font-semibold text-slate-700 block mb-1">
                    Acceptez-vous un(e) partenaire ayant déjà des enfants ?
                  </label>
                  <div className="flex items-center gap-4 pt-1">
                    <label className="flex items-center gap-1.5 cursor-pointer">
                      <input
                        type="radio"
                        checked={acceptsPartnerWithChildren}
                        onChange={() => setAcceptsPartnerWithChildren(true)}
                      />
                      <span>Oui, avec bienveillance</span>
                    </label>
                    <label className="flex items-center gap-1.5 cursor-pointer">
                      <input
                        type="radio"
                        checked={!acceptsPartnerWithChildren}
                        onChange={() => setAcceptsPartnerWithChildren(false)}
                      />
                      <span>Préférence sans enfants</span>
                    </label>
                  </div>
                </div>

                <div>
                  <label className="font-semibold text-slate-700 block mb-1">
                    Mobilité géographique
                  </label>
                  <select
                    value={relocationWillingness}
                    onChange={(e) => setRelocationWillingness(e.target.value as any)}
                    className="w-full p-2.5 border border-slate-200 rounded-xl bg-white outline-none"
                  >
                    <option value="Dans mon pays">Dans mon pays de résidence</option>
                    <option value="Prêt(e) à déménager">Prêt(e) à déménager</option>
                    <option value="À discuter">Ouvert(e) à la discussion</option>
                  </select>
                </div>

                <div className="sm:col-span-2">
                  <label className="font-semibold text-slate-700 block mb-1">
                    Votre vision de l'harmonie familiale *
                  </label>
                  <textarea
                    rows={2}
                    required
                    value={familyValues}
                    onChange={(e) => setFamilyValues(e.target.value)}
                    placeholder="Ex : Respect des liens de parenté, écoute bienveillante, éducation saine..."
                    className="w-full p-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#0F5132] outline-none"
                  />
                </div>
              </div>
            </div>
          )}

          {/* STEP 5: Préférences de recherche */}
          {currentStep === 5 && (
            <div className="space-y-4 text-xs">
              <div className="space-y-1">
                <h3 className="font-semibold text-base text-slate-900 flex items-center gap-2">
                  <Sliders className="w-4 h-4 text-[#0F5132]" />
                  <span>Vos critères recherchés chez votre futur(e) époux/se</span>
                </h3>
                <p className="text-slate-500">
                  Définissez vos préférences pour optimiser le calcul de compatibilité.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">
                    Tranche d'âge souhaitée ({prefAgeMin} à {prefAgeMax} ans)
                  </label>
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      min={18}
                      max={65}
                      value={prefAgeMin}
                      onChange={(e) => setPrefAgeMin(Number(e.target.value))}
                      className="w-1/2 p-2.5 border border-slate-200 rounded-xl text-center"
                    />
                    <span>à</span>
                    <input
                      type="number"
                      min={18}
                      max={65}
                      value={prefAgeMax}
                      onChange={(e) => setPrefAgeMax(Number(e.target.value))}
                      className="w-1/2 p-2.5 border border-slate-200 rounded-xl text-center"
                    />
                  </div>
                </div>

                <div>
                  <label className="font-semibold text-slate-700 block mb-1">
                    Pays prioritaire
                  </label>
                  <select
                    value={prefCountry}
                    onChange={(e) => setPrefCountry(e.target.value)}
                    className="w-full p-2.5 border border-slate-200 rounded-xl bg-white outline-none"
                  >
                    <option value="France">France</option>
                    <option value="Niger">Niger</option>
                    <option value="Sénégal">Sénégal</option>
                    <option value="Côte d'Ivoire">Côte d'Ivoire</option>
                    <option value="Belgique">Belgique</option>
                    <option value="Canada">Canada</option>
                    <option value="Tous">Tous les pays</option>
                  </select>
                </div>

                <div className="sm:col-span-2 p-4 rounded-xl bg-[#0F5132]/5 border border-[#0F5132]/20 space-y-2">
                  <div className="flex items-center gap-2 text-xs font-bold text-[#0F5132]">
                    <ShieldCheck className="w-4 h-4 text-[#198754]" />
                    <span>Engagement d'authenticité & de respect</span>
                  </div>
                  <p className="text-slate-600 leading-relaxed text-[11px]">
                    En validant votre inscription, vous certifiez sur l'honneur l'exactitude de vos déclarations et vous vous engagez à respecter les règles de bienséance et de pudeur islamique de la communauté NIKAH CONNECT.
                  </p>
                </div>
              </div>
            </div>
          )}

        </div>

        {/* Footer Navigation */}
        <div className="p-6 border-t border-slate-100 bg-[#FAF9F6] flex items-center justify-between">
          {currentStep > 1 ? (
            <button
              onClick={() => setCurrentStep(currentStep - 1)}
              className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900 flex items-center gap-1.5 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Précédent</span>
            </button>
          ) : (
            <div />
          )}

          <button
            onClick={handleNext}
            disabled={!validateStep(currentStep)}
            className={`px-6 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all ${
              validateStep(currentStep)
                ? 'bg-[#0F5132] hover:bg-[#198754] text-white shadow-md'
                : 'bg-slate-200 text-slate-400 cursor-not-allowed'
            }`}
          >
            <span>{currentStep === 5 ? 'Créer mon profil et commencer' : 'Continuer'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
};
