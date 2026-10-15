import React from 'react';
import { UserCheck, Sliders, Sparkles, MessageCircleHeart, Shield, ArrowRight } from 'lucide-react';

interface HowItWorksProps {
  onOpenRegister: () => void;
  onNavigateToProfiles: () => void;
}

export const HowItWorksSection: React.FC<HowItWorksProps> = ({
  onOpenRegister,
  onNavigateToProfiles,
}) => {
  const steps = [
    {
      number: '01',
      title: 'Créez votre profil',
      description: 'Présentez votre personnalité, votre sensibilité spirituelle, vos valeurs fondamentales et votre vision concrète du mariage.',
      icon: UserCheck,
      details: ['Renseignement soigné', 'Pudeur préservée', 'Aucune coordonnée publique'],
    },
    {
      number: '02',
      title: 'Définissez vos critères',
      description: 'Précisez vos attentes : tranche d’âge, pays, situation matrimoniale, études, projet d’enfants, rythme religieux et implication du Wali.',
      icon: Sliders,
      details: ['Filtres géographiques', 'Horizon de mariage', 'Projet familial'],
    },
    {
      number: '03',
      title: 'Découvrez des profils compatibles',
      description: 'Le moteur de compatibilité multi-critères met en avant les personnes qui partagent véritablement vos aspirations de vie.',
      icon: Sparkles,
      details: ['Score expliqué en toute transparence', 'Affinités réelles', 'Zéro superficialité'],
    },
    {
      number: '04',
      title: 'Échangez dans le respect',
      description: 'Initiez des échanges sécurisés, dans un cadre serein. Possibilité d’associer une personne de confiance ou un tuteur (Wali).',
      icon: MessageCircleHeart,
      details: ['Messagerie sécurisée', 'Option Wali intégrée', 'Surveillance anti-arnaque'],
    },
  ];

  return (
    <section className="py-20 bg-white border-y border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <span className="text-xs font-bold tracking-widest uppercase text-[#0F5132]">
            Une démarche claire & méthodique
          </span>
          <h2 className="font-serif-brand text-3xl sm:text-4xl font-bold text-[#0F5132]">
            Comment fonctionne NIKAH CONNECT
          </h2>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            Un cheminement pensé pour préserver la dignité, la sincérité et faciliter la rencontre matrimoniale dans le respect de l'éthique islamique.
          </p>
        </div>

        {/* 4 Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step) => {
            const Icon = step.icon;
            return (
              <div
                key={step.number}
                className="relative p-6 rounded-2xl bg-[#FAF9F6] border border-slate-200/80 hover:border-[#0F5132]/40 hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-serif-brand font-bold text-2xl text-[#D4AF37]">
                      {step.number}
                    </span>
                    <div className="w-10 h-10 rounded-xl bg-[#0F5132]/10 text-[#0F5132] flex items-center justify-center">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  <h3 className="font-semibold text-lg text-slate-900 mb-2">
                    {step.title}
                  </h3>

                  <p className="text-xs text-slate-600 leading-relaxed mb-4">
                    {step.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-200/60 space-y-1.5">
                  {step.details.map((detail, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-[11px] text-slate-500">
                      <span className="w-1 h-1 rounded-full bg-[#198754]" />
                      <span>{detail}</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Banner Action */}
        <div className="mt-14 p-8 rounded-2xl bg-gradient-to-r from-[#0F5132] to-[#198754] text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="space-y-1 text-center md:text-left">
            <h4 className="font-serif-brand text-2xl font-bold">
              Prêt(e) à entamer cette noble démarche ?
            </h4>
            <p className="text-xs sm:text-sm text-white/80 max-w-xl">
              L'inscription prend moins de 5 minutes et chaque nouveau profil est examiné par notre équipe de modération.
            </p>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={onOpenRegister}
              className="px-6 py-3 rounded-xl font-semibold bg-[#D4AF37] hover:bg-[#c49f2e] text-[#17201A] transition-colors text-sm shadow"
            >
              Créer mon profil
            </button>
            <button
              onClick={onNavigateToProfiles}
              className="px-5 py-3 rounded-xl font-medium bg-white/10 hover:bg-white/20 text-white transition-colors text-sm border border-white/20 flex items-center gap-1.5"
            >
              <span>Explorer</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};
