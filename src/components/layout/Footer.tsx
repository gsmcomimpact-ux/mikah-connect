import React from 'react';
import { ShieldAlert, Heart, Lock, CheckCircle2 } from 'lucide-react';
import { LOCAL_SEO_PAGES } from '../../data/localSeoPages';

interface FooterProps {
  onOpenLegal: (page: string) => void;
  onOpenLocalSeo: (slug: string) => void;
  onNavigate: (view: string) => void;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenLegal,
  onOpenLocalSeo,
  onNavigate,
}) => {
  return (
    <footer className="bg-[#17201A] text-[#FAF9F6] border-t border-[#0F5132]/30 mt-20 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Anti-Scam & Safety Highlight Banner */}
        <div className="mb-12 p-6 rounded-2xl bg-[#0F5132]/30 border border-[#D4AF37]/30 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-start gap-3.5">
            <div className="p-2.5 rounded-xl bg-[#D4AF37]/15 text-[#D4AF37] shrink-0">
              <ShieldAlert className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-base font-semibold text-white">
                Engagement de Sécurité & Vigilance Anti-Arnaque
              </h4>
              <p className="text-xs text-[#FAF9F6]/80 mt-1 max-w-2xl leading-relaxed">
                Ne transférez jamais d'argent à une personne rencontrée en ligne et ne communiquez jamais vos informations bancaires. Sur NIKAH CONNECT, la recherche matrimoniale s'effectue dans la dignité, la transparence et le respect mutuel.
              </p>
            </div>
          </div>
          <button
            onClick={() => onOpenLegal('security')}
            className="px-4 py-2 rounded-lg text-xs font-semibold bg-[#D4AF37] hover:bg-[#c49f2e] text-[#17201A] transition-colors shrink-0"
          >
            Consignes de sécurité
          </button>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-white/10">
          
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-md bg-[#0F5132] flex items-center justify-center text-[#D4AF37] font-serif-brand font-bold text-lg">
                ن
              </div>
              <span className="font-serif-brand text-2xl font-bold tracking-tight text-white">
                NIKAH CONNECT
              </span>
            </div>
            <p className="text-xs text-[#FAF9F6]/75 leading-relaxed max-w-sm">
              Plateforme moderne et éthique de rencontre islamique orientée exclusivement vers le mariage (Nikah). Mise en relation fondée sur les valeurs, la spiritualité partagée et la préservation de la pudeur.
            </p>
            <div className="flex items-center gap-3 pt-2 text-xs text-[#D4AF37]">
              <span className="flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" /> Profils vérifiés
              </span>
              <span>·</span>
              <span className="flex items-center gap-1">
                <Lock className="w-3.5 h-3.5" /> Données chiffrées
              </span>
              <span>·</span>
              <span className="flex items-center gap-1">
                <Heart className="w-3.5 h-3.5" /> Démarche éthique
              </span>
            </div>
          </div>

          {/* Navigation Links */}
          <div>
            <h5 className="text-xs font-bold uppercase tracking-wider text-[#D4AF37] mb-3">
              Navigation
            </h5>
            <ul className="space-y-2 text-xs text-[#FAF9F6]/80">
              <li>
                <button onClick={() => onNavigate('home')} className="hover:text-white transition-colors">
                  Accueil
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('how-it-works')} className="hover:text-white transition-colors">
                  Comment ça marche
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('profiles')} className="hover:text-white transition-colors">
                  Rechercher des profils
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('blog')} className="hover:text-white transition-colors">
                  Conseils & Mariage
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('why-us')} className="hover:text-white transition-colors">
                  Pourquoi nous choisir
                </button>
              </li>
            </ul>
          </div>

          {/* Local Pages / Regional SEO */}
          <div>
            <h5 className="text-xs font-bold uppercase tracking-wider text-[#D4AF37] mb-3">
              Rencontres par Pays
            </h5>
            <ul className="space-y-2 text-xs text-[#FAF9F6]/80">
              {LOCAL_SEO_PAGES.map((page) => (
                <li key={page.slug}>
                  <button
                    onClick={() => onOpenLocalSeo(page.slug)}
                    className="hover:text-white transition-colors text-left"
                  >
                    Rencontre {page.country}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal & Safety */}
          <div>
            <h5 className="text-xs font-bold uppercase tracking-wider text-[#D4AF37] mb-3">
              Éthique & Légal
            </h5>
            <ul className="space-y-2 text-xs text-[#FAF9F6]/80">
              <li>
                <button onClick={() => onOpenLegal('terms')} className="hover:text-white transition-colors">
                  Conditions Générales (CGU)
                </button>
              </li>
              <li>
                <button onClick={() => onOpenLegal('privacy')} className="hover:text-white transition-colors">
                  Confidentialité & RGPD
                </button>
              </li>
              <li>
                <button onClick={() => onOpenLegal('community')} className="hover:text-white transition-colors">
                  Charte de Respect & Bienséance
                </button>
              </li>
              <li>
                <button onClick={() => onOpenLegal('security')} className="hover:text-white transition-colors">
                  Sécurité & Signalement
                </button>
              </li>
              <li>
                <button onClick={() => onOpenLegal('contact')} className="hover:text-white transition-colors">
                  Contact & Assistance
                </button>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-[11px] text-[#FAF9F6]/60 gap-4">
          <p>© {new Date().getFullYear()} NIKAH CONNECT. Tous droits réservés. Plateforme de mariage islamique éthique.</p>
          <div className="flex items-center gap-4">
            <span>Aucune coordonnée publique</span>
            <span>·</span>
            <span>Hébergement sécurisé</span>
            <span>·</span>
            <span>Non affilié à des réseaux de rencontre non éthiques</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
