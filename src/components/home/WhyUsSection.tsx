import React from 'react';
import { 
  HeartHandshake, 
  ShieldCheck, 
  Lock, 
  Sparkles, 
  Users, 
  ShieldAlert,
  CheckCircle2
} from 'lucide-react';
import { BRANDING } from '../../config/branding';

export const WhyUsSection: React.FC = () => {
  const pillars = [
    {
      title: 'Rencontres exclusivement sérieuses',
      desc: 'Aucun espace pour la frivolité ou les approches éphémères. 100% des membres sont engagés dans une recherche matrimoniale sincère.',
      icon: HeartHandshake,
    },
    {
      title: 'Respect scrupuleux des valeurs',
      desc: 'Un environnement conçu selon les préceptes de pudeur (Haya) et de bienveillance (Husn al-Khuluq).',
      icon: Sparkles,
    },
    {
      title: 'Profils rigoureusement vérifiés',
      desc: 'Triple niveau de contrôle : email, téléphone par code sécurisé et validation d\'identité avec masquage des données sensibles.',
      icon: ShieldCheck,
    },
    {
      title: 'Protection totale de la vie privée',
      desc: 'Aucune coordonnée personnelle (numéro, email, adresse) n\'est affichée publiquement. Vos données ne sont jamais vendues.',
      icon: Lock,
    },
    {
      title: 'Outils intelligents anti-arnaque',
      desc: 'Détection proactive des tentatives de fraude financière et blocage immédiat de tout comportement suspect.',
      icon: ShieldAlert,
    },
    {
      title: 'Option Wali & Accompagnateur',
      desc: 'Possibilité facultative d\'associer un tuteur ou un proche de confiance pour chaperonner et bénir la démarche dès le départ.',
      icon: Users,
    },
  ];

  return (
    <section className="py-20 bg-[#FAF9F6] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <span className="text-xs font-bold tracking-widest uppercase text-[#0F5132]">
            Éthique, Sérénité & Sécurité
          </span>
          <h2 className="font-serif-brand text-3xl sm:text-4xl font-bold text-[#0F5132]">
            Pourquoi choisir NIKAH CONNECT ?
          </h2>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            Nous avons repensé la mise en relation pour offrir aux célibataires musulmans un cadre honorable qui préserve ce qu'ils ont de plus précieux.
          </p>
        </div>

        {/* Visual + Pillars Bento Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Visual Trust Asset */}
          <div className="lg:col-span-5 space-y-6">
            <div className="relative rounded-2xl overflow-hidden shadow-xl border border-[#D4AF37]/30 bg-[#0F5132]">
              <img
                src={BRANDING.assets.trustImage}
                alt="Symbole de confiance, d'alliance éthique et de paix matrimoniale"
                className="w-full aspect-[4/3] object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 text-white space-y-1">
                <span className="text-[11px] font-semibold tracking-wider uppercase text-[#D4AF37]">
                  Pacte de Sérénité
                </span>
                <h4 className="font-serif-brand text-xl font-bold">
                  « Et parmi Ses signes, Il a créé de vous, pour vous, des épouses... »
                </h4>
                <p className="text-xs text-white/80">
                  Sourate Ar-Rum (Les Romains), Verset 21
                </p>
              </div>
            </div>

            {/* Key trust statement */}
            <div className="p-5 rounded-xl bg-white border border-slate-200/80 shadow-sm space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold text-[#0F5132]">
                <CheckCircle2 className="w-4 h-4 text-[#198754]" />
                <span>Charte de Modération Humaine 24/7</span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Chaque signalement est instruit avec diligence par notre équipe dédiée pour garantir un espace sans harcèlement ni arnaque.
              </p>
            </div>
          </div>

          {/* Pillars Grid */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-5">
            {pillars.map((pillar, idx) => {
              const Icon = pillar.icon;
              return (
                <div
                  key={idx}
                  className="p-5 rounded-xl bg-white border border-slate-200 hover:border-[#0F5132]/40 transition-colors shadow-sm space-y-2"
                >
                  <div className="w-9 h-9 rounded-lg bg-[#0F5132]/10 text-[#0F5132] flex items-center justify-center">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h4 className="font-semibold text-sm text-slate-900">
                    {pillar.title}
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {pillar.desc}
                  </p>
                </div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
};
