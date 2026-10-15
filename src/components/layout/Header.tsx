import React, { useState } from 'react';
import { UserProfile } from '../../types';
import { 
  ShieldCheck, 
  MessageSquare, 
  User, 
  Menu, 
  X, 
  SlidersHorizontal,
  LogOut,
  Sparkles
} from 'lucide-react';

interface HeaderProps {
  currentProfile: UserProfile | null;
  activeView: string;
  onNavigate: (view: string) => void;
  onOpenLogin: () => void;
  onOpenRegister: () => void;
  onLogout: () => void;
  unreadCount: number;
  isAdmin: boolean;
  onToggleAdmin: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentProfile,
  activeView,
  onNavigate,
  onOpenLogin,
  onOpenRegister,
  onLogout,
  unreadCount,
  isAdmin,
  onToggleAdmin,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (view: string) => {
    onNavigate(view);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-[#FAF9F6]/95 backdrop-blur-md border-b border-[#0F5132]/10 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Zone 1: Single text element wordmark */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => handleNavClick('home')}
              className="group flex items-center gap-2.5 text-left focus:outline-none"
            >
              <div className="w-10 h-10 rounded-lg bg-[#0F5132] flex items-center justify-center text-[#D4AF37] shadow-sm transition-transform group-hover:scale-105">
                <span className="font-serif-brand font-bold text-xl tracking-wider">ن</span>
              </div>
              <div>
                <span className="font-serif-brand text-2xl font-bold tracking-tight text-[#0F5132]">
                  NIKAH CONNECT
                </span>
                <span className="block text-[10px] uppercase tracking-widest text-[#198754] font-medium -mt-1">
                  Mariage & Éthique Islamique
                </span>
              </div>
            </button>
          </div>

          {/* Zone 2: 4-6 clean text navigation links */}
          <nav className="hidden lg:flex items-center gap-8 text-sm font-medium text-[#17201A]/80">
            <button
              onClick={() => handleNavClick('home')}
              className={`hover:text-[#0F5132] transition-colors py-1 relative ${
                activeView === 'home' ? 'text-[#0F5132] font-semibold' : ''
              }`}
            >
              Accueil
              {activeView === 'home' && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#0F5132] rounded-full" />
              )}
            </button>

            <button
              onClick={() => handleNavClick('how-it-works')}
              className={`hover:text-[#0F5132] transition-colors py-1 relative ${
                activeView === 'how-it-works' ? 'text-[#0F5132] font-semibold' : ''
              }`}
            >
              Comment ça marche
              {activeView === 'how-it-works' && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#0F5132] rounded-full" />
              )}
            </button>

            <button
              onClick={() => handleNavClick('profiles')}
              className={`hover:text-[#0F5132] transition-colors py-1 relative ${
                activeView === 'profiles' ? 'text-[#0F5132] font-semibold' : ''
              }`}
            >
              Découvrir les profils
              {activeView === 'profiles' && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#0F5132] rounded-full" />
              )}
            </button>

            <button
              onClick={() => handleNavClick('blog')}
              className={`hover:text-[#0F5132] transition-colors py-1 relative ${
                activeView === 'blog' ? 'text-[#0F5132] font-semibold' : ''
              }`}
            >
              Conseils & Mariage
              {activeView === 'blog' && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#0F5132] rounded-full" />
              )}
            </button>

            <button
              onClick={() => handleNavClick('why-us')}
              className={`hover:text-[#0F5132] transition-colors py-1 relative ${
                activeView === 'why-us' ? 'text-[#0F5132] font-semibold' : ''
              }`}
            >
              Pourquoi nous
              {activeView === 'why-us' && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#0F5132] rounded-full" />
              )}
            </button>
          </nav>

          {/* Zone 3: 1-2 primary actions */}
          <div className="hidden sm:flex items-center gap-3">
            {/* Mode Modération / Admin switch */}
            <button
              onClick={onToggleAdmin}
              title="Basculer vers l'administration et modération"
              className={`px-2.5 py-1.5 rounded-md text-xs font-medium border transition-colors flex items-center gap-1.5 ${
                isAdmin 
                  ? 'bg-amber-100 text-amber-900 border-amber-300' 
                  : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
              }`}
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>{isAdmin ? 'Admin actif' : 'Espace Admin'}</span>
            </button>

            {currentProfile ? (
              <div className="flex items-center gap-3">
                <button
                  onClick={() => handleNavClick('messages')}
                  className="relative p-2 rounded-lg text-slate-700 hover:bg-[#F3F4F6] transition-colors"
                  title="Mes conversations"
                >
                  <MessageSquare className="w-5 h-5 text-[#0F5132]" />
                  {unreadCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-[#198754] text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                      {unreadCount}
                    </span>
                  )}
                </button>

                <button
                  onClick={() => handleNavClick('dashboard')}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#0F5132]/5 hover:bg-[#0F5132]/10 border border-[#0F5132]/15 text-[#0F5132] font-medium text-sm transition-colors"
                >
                  <User className="w-4 h-4" />
                  <span className="truncate max-w-[120px]">{currentProfile.displayName}</span>
                </button>

                <button
                  onClick={onLogout}
                  className="p-2 text-slate-400 hover:text-rose-600 transition-colors"
                  title="Déconnexion"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <button
                  onClick={onOpenLogin}
                  className="px-4 py-2 text-sm font-medium text-[#0F5132] hover:text-[#198754] transition-colors"
                >
                  Connexion
                </button>
                <button
                  onClick={onOpenRegister}
                  className="px-5 py-2.5 text-sm font-semibold text-white bg-[#0F5132] hover:bg-[#198754] rounded-lg shadow-sm transition-all hover:shadow whitespace-nowrap flex items-center gap-1.5"
                >
                  <Sparkles className="w-4 h-4 text-[#D4AF37]" />
                  <span>Créer mon profil</span>
                </button>
              </div>
            )}
          </div>

          {/* Mobile menu trigger */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-700 hover:bg-slate-100"
              aria-label="Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 bg-[#FAF9F6] px-4 pt-3 pb-6 space-y-3">
          <nav className="flex flex-col space-y-2">
            <button
              onClick={() => handleNavClick('home')}
              className="text-left px-3 py-2 rounded-md font-medium text-slate-800 hover:bg-slate-100"
            >
              Accueil
            </button>
            <button
              onClick={() => handleNavClick('how-it-works')}
              className="text-left px-3 py-2 rounded-md font-medium text-slate-800 hover:bg-slate-100"
            >
              Comment ça marche
            </button>
            <button
              onClick={() => handleNavClick('profiles')}
              className="text-left px-3 py-2 rounded-md font-medium text-slate-800 hover:bg-slate-100"
            >
              Découvrir les profils
            </button>
            <button
              onClick={() => handleNavClick('blog')}
              className="text-left px-3 py-2 rounded-md font-medium text-slate-800 hover:bg-slate-100"
            >
              Conseils & Mariage
            </button>
            <button
              onClick={() => handleNavClick('why-us')}
              className="text-left px-3 py-2 rounded-md font-medium text-slate-800 hover:bg-slate-100"
            >
              Pourquoi nous
            </button>
          </nav>

          <div className="pt-3 border-t border-slate-200 flex flex-col gap-2">
            {currentProfile ? (
              <>
                <button
                  onClick={() => handleNavClick('dashboard')}
                  className="w-full py-2.5 text-center font-medium bg-[#0F5132] text-white rounded-lg"
                >
                  Mon Espace ({currentProfile.displayName})
                </button>
                <button
                  onClick={() => handleNavClick('messages')}
                  className="w-full py-2 text-center text-sm font-medium text-[#0F5132] border border-[#0F5132]/30 rounded-lg flex items-center justify-center gap-2"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Messagerie ({unreadCount} non lus)</span>
                </button>
                <button
                  onClick={onToggleAdmin}
                  className="w-full py-2 text-center text-xs font-medium text-amber-800 bg-amber-50 rounded-lg"
                >
                  {isAdmin ? 'Quitter la vue Admin' : 'Consulter l\'Espace Admin'}
                </button>
                <button
                  onClick={onLogout}
                  className="w-full py-2 text-center text-xs text-rose-600 hover:underline"
                >
                  Se déconnecter
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => { setMobileMenuOpen(false); onOpenRegister(); }}
                  className="w-full py-2.5 text-center font-semibold bg-[#0F5132] text-white rounded-lg"
                >
                  Créer mon profil
                </button>
                <button
                  onClick={() => { setMobileMenuOpen(false); onOpenLogin(); }}
                  className="w-full py-2 text-center text-sm font-medium text-[#0F5132] border border-[#0F5132]/30 rounded-lg"
                >
                  Se connecter
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
