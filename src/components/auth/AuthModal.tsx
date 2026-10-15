import React, { useState } from 'react';
import { X, Lock, Mail, Sparkles, ArrowRight, ShieldCheck } from 'lucide-react';
import { UserAccount, UserProfile } from '../../types';
import { SEED_PROFILES } from '../../data/seedProfiles';

interface AuthModalProps {
  onClose: () => void;
  onSuccess: (user: UserAccount, profile: UserProfile) => void;
  onSwitchToRegister: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  onClose,
  onSuccess,
  onSwitchToRegister,
}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Veuillez remplir tous les champs');
      return;
    }

    // Connect with entered email or fallback
    const targetSeed = SEED_PROFILES.find((p) => p.displayName.toLowerCase() === email.toLowerCase());
    if (targetSeed) {
      onSuccess(
        {
          id: targetSeed.userId,
          email: `${targetSeed.displayName.toLowerCase()}@example.org`,
          phone: '+33 6 00 00 00 00',
          role: 'user',
          isSuspended: false,
          profileId: targetSeed.id,
        },
        targetSeed
      );
    } else {
      // Default demo account
      onSuccess(
        {
          id: 'user-default-nadia',
          email: email.trim(),
          phone: '+33 6 12 34 56 78',
          role: 'user',
          isSuspended: false,
          profileId: 'prof-nadia-00',
        },
        {
          id: 'prof-nadia-00',
          userId: 'user-default-nadia',
          displayName: 'Nadia',
          age: 27,
          gender: 'femme',
          city: 'Paris',
          country: 'France',
          occupation: 'Architecte Logicielle Cloud',
          education: 'Bac +5 / Master',
          languages: ['Français', 'Anglais', 'Arabe'],
          maritalStatus: 'celibataire',
          childrenCount: 0,
          bio: 'Attachée aux valeurs de bienveillance, de piété et de franchise. Je recherche un frère posé et responsable pour cheminer ensemble.',
          photoUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80',
          religiousPractice: 'Pratiquant(e) régulier(e)',
          prayerHabit: '5 prières quotidiennes',
          values: ['Bienveillance', 'Honnêteté', 'Éducation', 'Pudeur (Haya)'],
          marriageVision: 'Construire un foyer stable de miséricorde et d\'affection mutuelle.',
          marriageHorizon: 'Dans les 6 mois',
          desireForChildren: 'Oui, certainement',
          acceptsPartnerWithChildren: true,
          relocationWillingness: 'Dans mon pays',
          familyValues: 'Respect mutuel et harmonie avec les familles.',
          interests: ['Lecture', 'Technologies éthiques', 'Randonnée'],
          verification: { emailVerified: true, phoneVerified: true, identityVerified: false },
          wali: {
            enabled: true,
            name: 'Moussa (Père)',
            relationship: 'Père',
            phone: '+33 6 99 ** ** 10',
            email: 'moussa@example.org',
            wantsNotificationOnMatch: true,
            wantsIntroductionInChat: true,
          },
          isPremium: false,
          createdAt: '2026-01-05T09:00:00Z',
          lastActive: 'En ligne',
        }
      );
    }
  };

  const handleQuickDemoLogin = (profile: UserProfile) => {
    onSuccess(
      {
        id: profile.userId,
        email: `${profile.displayName.toLowerCase()}@nikahconnect.demo`,
        phone: '+33 6 00 00 00 00',
        role: 'user',
        isSuspended: false,
        profileId: profile.id,
      },
      profile
    );
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-md rounded-3xl shadow-2xl border border-slate-200 overflow-hidden">
        
        {/* Header */}
        <div className="p-6 pb-4 border-b border-slate-100 flex items-center justify-between bg-[#FAF9F6]">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-[#0F5132] flex items-center justify-center text-[#D4AF37] font-serif-brand font-bold">
              ن
            </div>
            <div>
              <h2 className="font-serif-brand text-lg font-bold text-slate-900">
                Connexion à votre espace
              </h2>
              <span className="text-[11px] text-[#0F5132] font-medium block">
                Accès sécurisé & confidentiel
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
        <div className="p-6 space-y-5">
          {error && (
            <div className="p-3 rounded-lg bg-rose-50 border border-rose-200 text-rose-700 text-xs">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            <div>
              <label className="font-semibold text-slate-700 block mb-1">
                Adresse email
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="nom@exemple.com"
                  className="w-full pl-9 pr-3 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#0F5132] outline-none"
                />
              </div>
            </div>

            <div>
              <label className="font-semibold text-slate-700 block mb-1">
                Mot de passe
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-9 pr-3 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#0F5132] outline-none"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-2.5 bg-[#0F5132] hover:bg-[#198754] text-white font-semibold rounded-xl transition-colors shadow flex items-center justify-center gap-2"
            >
              <span>Se connecter</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* Quick Demo Selector */}
          <div className="pt-4 border-t border-slate-100 space-y-2">
            <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block text-center">
              Comptes Démonstration Rapide
            </span>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <button
                type="button"
                onClick={() => {
                  const tariq = SEED_PROFILES.find((p) => p.displayName === 'Tariq')!;
                  handleQuickDemoLogin(tariq);
                }}
                className="p-2 border border-slate-200 hover:border-[#0F5132] rounded-xl text-left bg-slate-50 hover:bg-white transition-all"
              >
                <span className="font-bold text-slate-900 block">Tariq, 32 ans</span>
                <span className="text-[10px] text-slate-500">Paris · Ingénieur</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  const amina = SEED_PROFILES.find((p) => p.displayName === 'Amina')!;
                  handleQuickDemoLogin(amina);
                }}
                className="p-2 border border-slate-200 hover:border-[#0F5132] rounded-xl text-left bg-slate-50 hover:bg-white transition-all"
              >
                <span className="font-bold text-slate-900 block">Amina, 28 ans</span>
                <span className="text-[10px] text-slate-500">Niamey · Enseignante</span>
              </button>
            </div>
          </div>

          {/* Switch to Register */}
          <div className="pt-2 text-center text-xs text-slate-500">
            Pas encore de profil ?{' '}
            <button
              onClick={() => {
                onClose();
                onSwitchToRegister();
              }}
              className="font-semibold text-[#0F5132] hover:underline"
            >
              Créer mon profil gratuitement
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
