import React from 'react';
import { Sparkles, Shield, HeartHandshake, Users, ArrowRight } from 'lucide-react';
import { BRANDING } from '../../config/branding';

interface HeroSectionProps {
  onOpenRegister: () => void;
  onNavigateToHow: () => void;
  onNavigateToProfiles: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onOpenRegister,
  onNavigateToHow,
  onNavigateToProfiles,
}) => {
  return (
    <section className="relative overflow-hidden pt-8 pb-16 lg:pt-14 lg:pb-24">
      {/* Background Decorative Mesh */}
      <div className="absolute inset-0 bg-islamic-light -z-10" />
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#D4AF37]/5 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#0F5132]/5 rounded-full blur-3xl -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Editorial Proposition & CTAs */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 text-xs font-semibold text-[#0F5132] tracking-wide uppercase">
              <span className="w-2 h-2 rounded-full bg-[#198754]" />
              <span>Plateforme certifiée de mise en relation matrimoniale</span>
            </div>

            <h1 className="font-serif-brand text-4xl sm:text-5xl lg:text-6xl font-bold text-[#0F5132] leading-[1.15] text-balance">
              Trouvez la personne qui partage vos valeurs.
            </h1>

            <p className="text-base sm:text-lg text-[#17201A]/85 leading-relaxed max-w-xl">
              Une plateforme de rencontre musulmane sérieuse dédiée aux personnes qui souhaitent construire une relation respectueuse, pudique et avancer sereinement vers le mariage (Nikah).
            </p>

            {/* CTAs */}
            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5">
              <button
                onClick={onOpenRegister}
                className="px-7 py-3.5 rounded-xl font-semibold text-white bg-[#0F5132] hover:bg-[#198754] shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 text-base group"
              >
                <Sparkles className="w-5 h-5 text-[#D4AF37] transition-transform group-hover:rotate-12" />
                <span>Créer mon profil</span>
              </button>

              <button
                onClick={onNavigateToHow}
                className="px-6 py-3.5 rounded-xl font-medium text-[#0F5132] bg-white hover:bg-slate-50 border border-[#0F5132]/20 shadow-sm transition-colors flex items-center justify-center gap-2 text-sm"
              >
                <span>Découvrir comment ça marche</span>
                <ArrowRight className="w-4 h-4 text-[#198754]" />
              </button>
            </div>

            {/* Reassurance Grid / Trust Proofs */}
            <div className="pt-6 grid grid-cols-2 sm:grid-cols-3 gap-4 border-t border-slate-200">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-lg bg-[#0F5132]/10 text-[#0F5132]">
                  <Shield className="w-4 h-4" />
                </div>
                <div className="text-xs">
                  <span className="font-semibold text-slate-900 block">Profils vérifiés</span>
                  <span className="text-slate-500">Contrôles d'authenticité</span>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-lg bg-[#0F5132]/10 text-[#0F5132]">
                  <HeartHandshake className="w-4 h-4" />
                </div>
                <div className="text-xs">
                  <span className="font-semibold text-slate-900 block">Option Wali</span>
                  <span className="text-slate-500">Tuteur ou proche associé</span>
                </div>
              </div>

              <div className="col-span-2 sm:col-span-1 flex items-center gap-2.5">
                <div className="p-2 rounded-lg bg-[#0F5132]/10 text-[#0F5132]">
                  <Users className="w-4 h-4" />
                </div>
                <div className="text-xs">
                  <span className="font-semibold text-slate-900 block">Démarche pudique</span>
                  <span className="text-slate-500">Zéro futilité</span>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Hero Visual Focal Carrier */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-white bg-slate-900">
              <img
                src={BRANDING.assets.heroImage}
                alt="Architecture islamique sereine et lumière dorée pour un mariage béni"
                className="w-full aspect-[4/3] object-cover transition-transform duration-700 hover:scale-105"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              
              {/* Overlay card for matrimonial context */}
              <div className="absolute bottom-4 left-4 right-4 p-4 rounded-xl bg-white/95 backdrop-blur-md border border-white/40 shadow-lg text-[#17201A]">
                <div className="flex items-center justify-between text-xs text-slate-600 mb-1">
                  <span className="font-medium text-[#0F5132]">Exemple de compatibilité</span>
                  <span className="font-bold text-[#198754]">92 % compatible</span>
                </div>
                <p className="text-sm font-semibold text-slate-900">
                  Projet matrimonial sérieux · Valeurs partagées
                </p>
                <div className="mt-2 flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-xs text-slate-500">
                    <span>Niamey, Niger</span>
                    <span>·</span>
                    <span>Enseignante</span>
                    <span>·</span>
                    <span>Master</span>
                  </div>
                  <button
                    onClick={onNavigateToProfiles}
                    className="text-xs font-semibold text-[#0F5132] hover:underline"
                  >
                    Voir les profils
                  </button>
                </div>
              </div>
            </div>

            {/* Subtle decorative gold badge */}
            <div className="absolute -top-3 -right-3 bg-[#D4AF37] text-[#17201A] text-[11px] font-bold px-3 py-1 rounded-full shadow-md">
              Orienté Nikah
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
