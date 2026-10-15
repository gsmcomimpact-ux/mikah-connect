import React, { useState } from 'react';
import { X, ShieldAlert, Lock, HeartHandshake, FileText, Mail } from 'lucide-react';
import { BRANDING } from '../../config/branding';

interface LegalPagesModalProps {
  initialPage: string;
  onClose: () => void;
}

export const LegalPagesModal: React.FC<LegalPagesModalProps> = ({
  initialPage,
  onClose,
}) => {
  const [currentPage, setCurrentPage] = useState<string>(initialPage || 'terms');

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-3xl rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-[#FAF9F6] shrink-0">
          <div className="flex items-center gap-2">
            <span className="font-serif-brand text-lg font-bold text-slate-900">
              Informations Légales & Sécurité
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-200/50"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Sub-nav tabs */}
        <div className="px-6 py-2.5 bg-slate-50 border-b border-slate-100 flex items-center gap-2 overflow-x-auto text-xs shrink-0">
          <button
            onClick={() => setCurrentPage('terms')}
            className={`px-3 py-1.5 rounded-lg font-semibold transition-colors ${
              currentPage === 'terms' ? 'bg-[#0F5132] text-white' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Conditions Générales (CGU)
          </button>

          <button
            onClick={() => setCurrentPage('security')}
            className={`px-3 py-1.5 rounded-lg font-semibold transition-colors ${
              currentPage === 'security' ? 'bg-[#0F5132] text-white' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Sécurité & Anti-Arnaque
          </button>

          <button
            onClick={() => setCurrentPage('privacy')}
            className={`px-3 py-1.5 rounded-lg font-semibold transition-colors ${
              currentPage === 'privacy' ? 'bg-[#0F5132] text-white' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Confidentialité & RGPD
          </button>

          <button
            onClick={() => setCurrentPage('community')}
            className={`px-3 py-1.5 rounded-lg font-semibold transition-colors ${
              currentPage === 'community' ? 'bg-[#0F5132] text-white' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Charte de Bienséance
          </button>

          <button
            onClick={() => setCurrentPage('contact')}
            className={`px-3 py-1.5 rounded-lg font-semibold transition-colors ${
              currentPage === 'contact' ? 'bg-[#0F5132] text-white' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Contact & Assistance
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6 text-xs text-slate-700 leading-relaxed">
          
          {currentPage === 'terms' && (
            <div className="space-y-4">
              <h3 className="font-serif-brand text-xl font-bold text-slate-900">
                Conditions Générales d'Utilisation (CGU)
              </h3>
              <p>
                La plateforme <strong>NIKAH CONNECT</strong> est exclusivement dédiée à la recherche d'un conjoint en vue du mariage dans le respect des valeurs de l'Islam.
              </p>
              <h4 className="font-bold text-slate-900 text-sm">1. Engagement de sincérité</h4>
              <p>
                Tout utilisateur s'engage sur l'honneur à fournir des renseignements fidèles sur son identité, sa situation matrimoniale, son projet familial et ses intentions. Toute usurpation d'identité ou intention frivole entraîne la radiation immédiate.
              </p>
              <h4 className="font-bold text-slate-900 text-sm">2. Respect mutuel et pudeur</h4>
              <p>
                Les échanges doivent demeurer empreints de courtoisie et de retenue. Tout propos insultant, harcèlement ou contenu à caractère sexuel est strictement banni et passible de poursuites.
              </p>
            </div>
          )}

          {currentPage === 'security' && (
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 flex items-start gap-3">
                <ShieldAlert className="w-5 h-5 text-amber-700 shrink-0" />
                <div>
                  <h4 className="font-bold text-amber-900 text-sm">
                    Recommandations Absolues de Sécurité
                  </h4>
                  <p className="text-[11px] text-amber-800 mt-1">
                    Pour votre sécurité, NIKAH CONNECT vous rappelle les règles indispensables de vigilance face aux abus en ligne.
                  </p>
                </div>
              </div>

              <h4 className="font-bold text-slate-900 text-sm">Règle n°1 : Ne versez jamais d'argent</h4>
              <p>
                Sous aucun prétexte (urgence médicale, problème familial, frais de voyage, visa, blocage de compte bancaire), vous ne devez verser ou transférer de l'argent à un membre. Une personne sincère ne sollicite jamais d'aide financière sur une plateforme matrimoniale.
              </p>

              <h4 className="font-bold text-slate-900 text-sm">Règle n°2 : Ne communiquez pas vos coordonnées bancaires</h4>
              <p>
                Aucun représentant de NIKAH CONNECT ne vous demandera votre mot de passe ou vos informations bancaires par message.
              </p>

              <h4 className="font-bold text-slate-900 text-sm">Règle n°3 : Signalez tout comportement suspect</h4>
              <p>
                Si un utilisateur vous semble suspect, insiste pour obtenir de l'argent ou utilise un vocabulaire inapproprié, cliquez immédiatement sur le bouton <strong>Signaler</strong>. Notre équipe réagit sans délai.
              </p>
            </div>
          )}

          {currentPage === 'privacy' && (
            <div className="space-y-4">
              <h3 className="font-serif-brand text-xl font-bold text-slate-900">
                Politique de Confidentialité & RGPD
              </h3>
              <p>
                Nous collectons uniquement les informations indispensables à votre mise en relation matrimoniale. Vos données ne sont jamais cédées, vendues ou louées à des tiers.
              </p>
              <h4 className="font-bold text-slate-900 text-sm">Données strictement masquées</h4>
              <p>
                Votre adresse email, votre numéro de téléphone et vos justificatifs d'identité ne sont <strong>jamais affichés publiquement</strong> sur votre profil.
              </p>
              <h4 className="font-bold text-slate-900 text-sm">Droit d'accès et d'effacement</h4>
              <p>
                Conformément à la réglementation européenne (RGPD), vous disposez à tout instant d'un droit de téléchargement de l'ensemble de vos données ainsi que du droit de suppression immédiate de votre compte depuis votre espace utilisateur.
              </p>
            </div>
          )}

          {currentPage === 'community' && (
            <div className="space-y-4">
              <h3 className="font-serif-brand text-xl font-bold text-slate-900">
                Charte Communautaire & Bienséance (Adab)
              </h3>
              <p>
                Notre communauté est un sanctuaire de respect. Pour préserver cette ambiance pieuse et noble, chaque membre s'engage à :
              </p>
              <ul className="space-y-2 list-disc pl-5">
                <li>Privilégier la sincérité du cœur et la transparence.</li>
                <li>Répondre avec politesse, même en cas de refus d'une demande.</li>
                <li>Respecter la pudeur (Al-Haya) dans le choix des mots et des photos.</li>
                <li>Favoriser l'implication de la famille ou du tuteur (Wali) pour concrétiser le mariage.</li>
              </ul>
            </div>
          )}

          {currentPage === 'contact' && (
            <div className="space-y-4">
              <h3 className="font-serif-brand text-xl font-bold text-slate-900">
                Contact & Équipe de Modération
              </h3>
              <p>
                Notre équipe est à votre disposition pour toute question, assistance ou signalement urgent.
              </p>
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-[#0F5132]" />
                  <span>Support général : <strong>{BRANDING.contact.supportEmail}</strong></span>
                </div>
                <div className="flex items-center gap-2">
                  <ShieldAlert className="w-4 h-4 text-amber-700" />
                  <span>Pôle Modération & Sécurité : <strong>{BRANDING.contact.moderationEmail}</strong></span>
                </div>
                <span className="text-[11px] text-slate-500 block pt-1">
                  Délai moyen de prise en charge : {BRANDING.contact.responseDelay}.
                </span>
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
