import React, { useState, useEffect } from 'react';
import { StorageService, subscribeToStorage } from './services/storage';
import { UserProfile, UserAccount, UserPreferences } from './types';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { HeroSection } from './components/home/HeroSection';
import { HowItWorksSection } from './components/home/HowItWorksSection';
import { WhyUsSection } from './components/home/WhyUsSection';
import { TestimonialsSection } from './components/home/TestimonialsSection';
import { ProfileSearch } from './components/profiles/ProfileSearch';
import { ProfileDetailModal } from './components/profiles/ProfileDetailModal';
import { UserDashboard } from './components/dashboard/UserDashboard';
import { MessagingModal } from './components/messages/MessagingModal';
import { AuthModal } from './components/auth/AuthModal';
import { RegisterWizard } from './components/auth/RegisterWizard';
import { WaliModal } from './components/wali/WaliModal';
import { VerificationModal } from './components/verification/VerificationModal';
import { PricingModal } from './components/pricing/PricingModal';
import { BlogSection } from './components/blog/BlogSection';
import { AdminDashboard } from './components/admin/AdminDashboard';
import { LegalPagesModal } from './components/legal/LegalPagesModal';
import { LocalLandingModal } from './components/seo/LocalLandingModal';
import { ReportModal } from './components/modals/ReportModal';
import { calculateCompatibility } from './services/matchingEngine';
import { Sparkles, CheckCircle2, HeartHandshake } from 'lucide-react';

export default function App() {
  // Initialize storage
  useEffect(() => {
    StorageService.initialize();
  }, []);

  // State
  const [currentAccount, setCurrentAccount] = useState<UserAccount | null>(() => StorageService.getCurrentUser());
  const [currentProfile, setCurrentProfile] = useState<UserProfile | null>(() => StorageService.getCurrentProfile());
  const [allProfiles, setAllProfiles] = useState<UserProfile[]>(() => StorageService.getAllProfiles());
  const [favorites, setFavorites] = useState<string[]>(() => StorageService.getFavorites());
  
  // Navigation & Views
  const [activeView, setActiveView] = useState<string>('home');
  const [isAdminMode, setIsAdminMode] = useState<boolean>(false);

  // Modals
  const [showAuthModal, setShowAuthModal] = useState<boolean>(false);
  const [showRegisterModal, setShowRegisterModal] = useState<boolean>(false);
  const [showWaliModal, setShowWaliModal] = useState<boolean>(false);
  const [showVerificationModal, setShowVerificationModal] = useState<boolean>(false);
  const [showPricingModal, setShowPricingModal] = useState<boolean>(false);
  const [showMessagingModal, setShowMessagingModal] = useState<boolean>(false);
  const [messagingTargetProfileId, setMessagingTargetProfileId] = useState<string | undefined>();
  const [selectedProfileDetail, setSelectedProfileDetail] = useState<UserProfile | null>(null);
  const [legalModalPage, setLegalModalPage] = useState<string | null>(null);
  const [localSeoSlug, setLocalSeoSlug] = useState<string | null>(null);
  const [reportTargetProfileId, setReportTargetProfileId] = useState<string | null>(null);

  // Notification Toast
  const [toastMessage, setToastMessage] = useState<{ title: string; desc: string; type?: 'success' | 'mutual' } | null>(null);

  // Refresh data on storage updates
  useEffect(() => {
    const unsubscribe = subscribeToStorage(() => {
      setCurrentAccount(StorageService.getCurrentUser());
      setCurrentProfile(StorageService.getCurrentProfile());
      setAllProfiles(StorageService.getAllProfiles());
      setFavorites(StorageService.getFavorites());
    });
    return unsubscribe;
  }, []);

  const triggerToast = (title: string, desc: string, type: 'success' | 'mutual' = 'success') => {
    setToastMessage({ title, desc, type });
    setTimeout(() => {
      setToastMessage(null);
    }, 4500);
  };

  // Sent interest request IDs
  const interestRequests = StorageService.getInterestRequests();
  const sentInterestIds = currentProfile
    ? interestRequests.filter((r) => r.senderProfileId === currentProfile.id).map((r) => r.receiverProfileId)
    : [];

  // Unread count
  const unreadMessagesCount = 1; // Simulated default

  // Handlers
  const handleLoginSuccess = (user: UserAccount, profile: UserProfile) => {
    StorageService.setCurrentUser(user);
    StorageService.setCurrentProfile(profile);
    setShowAuthModal(false);
    triggerToast('Connexion réussie', `Bienvenue ${profile.displayName} sur NIKAH CONNECT.`);
  };

  const handleRegisterSuccess = (user: UserAccount, profile: UserProfile, prefs: UserPreferences) => {
    StorageService.setCurrentUser(user);
    StorageService.setCurrentProfile(profile);
    StorageService.updatePreferences(prefs);
    setShowRegisterModal(false);
    setActiveView('profiles');
    triggerToast(
      'Profil créé avec succès',
      'Votre fiche est active. Découvrez dès maintenant les profils compatibles avec vos valeurs.'
    );
  };

  const handleLogout = () => {
    StorageService.setCurrentUser(null);
    StorageService.setCurrentProfile(null as any);
    setActiveView('home');
    triggerToast('Déconnexion effectuée', 'À bientôt sur NIKAH CONNECT.');
  };

  const handleSendInterest = (targetProfile: UserProfile, customMessage?: string) => {
    if (!currentProfile) {
      setShowAuthModal(true);
      return;
    }

    const created = StorageService.sendInterestRequest(targetProfile.id, customMessage);
    if (created.isMutual) {
      triggerToast(
        'Compatibilité mutuelle !',
        `Vous et ${targetProfile.displayName} avez manifesté un intérêt partagé. Une conversation est désormais ouverte.`,
        'mutual'
      );
    } else {
      triggerToast(
        'Demande d\'intérêt transmise',
        `Votre message respectueux a été envoyé à ${targetProfile.displayName}.`
      );
    }
  };

  const handleToggleFavorite = (profileId: string) => {
    const isNowFav = StorageService.toggleFavorite(profileId);
    triggerToast(
      isNowFav ? 'Ajouté aux favoris' : 'Retiré des favoris',
      isNowFav ? 'Ce profil a été enregistré dans votre espace personnel.' : 'Profil retiré.'
    );
  };

  const handleReportUser = (reportedId: string, reason: any, desc: string) => {
    StorageService.reportUser(reportedId, reason, desc);
    triggerToast(
      'Signalement enregistré',
      'Notre équipe de modération analyse votre signalement avec la plus grande diligence.'
    );
  };

  const handleBlockUser = (profileId: string) => {
    StorageService.blockUser(profileId);
    if (selectedProfileDetail?.id === profileId) {
      setSelectedProfileDetail(null);
    }
    triggerToast('Utilisateur bloqué', 'Vous ne recevrez plus aucune sollicitation de ce profil.');
  };

  const handleOpenMessages = (otherId?: string) => {
    if (!currentProfile) {
      setShowAuthModal(true);
      return;
    }
    setMessagingTargetProfileId(otherId);
    setShowMessagingModal(true);
  };

  const handleUpgradeSuccess = () => {
    if (currentProfile) {
      const updated = StorageService.updateCurrentProfile({ isPremium: true });
      setCurrentProfile(updated);
      setShowPricingModal(false);
      triggerToast(
        'Statut Membre Premium activé',
        'Vous bénéficiez désormais des demandes illimitées et du badge Membre Sérieux.'
      );
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF9F6] text-[#17201A]">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-24 right-4 sm:right-8 z-50 max-w-sm w-full bg-white rounded-2xl shadow-2xl border border-slate-200 p-4 flex items-start gap-3 animate-in fade-in slide-in-from-top-4 duration-300">
          <div className={`p-2 rounded-xl shrink-0 ${
            toastMessage.type === 'mutual' ? 'bg-[#D4AF37]/20 text-[#D4AF37]' : 'bg-[#0F5132]/10 text-[#0F5132]'
          }`}>
            {toastMessage.type === 'mutual' ? <HeartHandshake className="w-5 h-5 text-[#0F5132]" /> : <CheckCircle2 className="w-5 h-5" />}
          </div>
          <div className="flex-1 min-w-0">
            <h4 className="font-semibold text-xs text-slate-900 truncate">
              {toastMessage.title}
            </h4>
            <p className="text-[11px] text-slate-600 mt-0.5 leading-relaxed">
              {toastMessage.desc}
            </p>
          </div>
        </div>
      )}

      {/* Main Header */}
      <Header
        currentProfile={currentProfile}
        activeView={activeView}
        onNavigate={(view) => {
          if (view === 'messages') {
            handleOpenMessages();
          } else {
            setActiveView(view);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }
        }}
        onOpenLogin={() => setShowAuthModal(true)}
        onOpenRegister={() => setShowRegisterModal(true)}
        onLogout={handleLogout}
        unreadCount={unreadMessagesCount}
        isAdmin={isAdminMode}
        onToggleAdmin={() => setIsAdminMode(!isAdminMode)}
      />

      {/* View Rendering */}
      <main className="flex-1">
        {isAdminMode ? (
          <AdminDashboard
            onClose={() => setIsAdminMode(false)}
            onRefreshProfiles={() => setAllProfiles(StorageService.getAllProfiles())}
          />
        ) : activeView === 'home' ? (
          <>
            <HeroSection
              onOpenRegister={() => setShowRegisterModal(true)}
              onNavigateToHow={() => {
                setActiveView('how-it-works');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              onNavigateToProfiles={() => {
                setActiveView('profiles');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            />
            <HowItWorksSection
              onOpenRegister={() => setShowRegisterModal(true)}
              onNavigateToProfiles={() => {
                setActiveView('profiles');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            />
            <WhyUsSection />
            <TestimonialsSection />
          </>
        ) : activeView === 'how-it-works' ? (
          <HowItWorksSection
            onOpenRegister={() => setShowRegisterModal(true)}
            onNavigateToProfiles={() => {
              setActiveView('profiles');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        ) : activeView === 'profiles' ? (
          <ProfileSearch
            profiles={allProfiles}
            currentProfile={currentProfile}
            favorites={favorites}
            sentInterestIds={sentInterestIds}
            onViewDetails={(profile) => setSelectedProfileDetail(profile)}
            onSendInterest={(profile) => handleSendInterest(profile)}
            onToggleFavorite={handleToggleFavorite}
          />
        ) : activeView === 'blog' ? (
          <BlogSection />
        ) : activeView === 'why-us' ? (
          <WhyUsSection />
        ) : activeView === 'dashboard' && currentProfile && currentAccount ? (
          <UserDashboard
            currentProfile={currentProfile}
            currentAccount={currentAccount}
            allProfiles={allProfiles}
            onUpdateProfile={(updates) => {
              const updated = StorageService.updateCurrentProfile(updates);
              setCurrentProfile(updated);
              triggerToast('Profil mis à jour', 'Vos modifications ont été enregistrées avec succès.');
            }}
            onOpenMessages={handleOpenMessages}
            onOpenWaliModal={() => setShowWaliModal(true)}
            onOpenVerificationModal={() => setShowVerificationModal(true)}
            onOpenPricingModal={() => setShowPricingModal(true)}
            onViewProfileDetails={(p) => setSelectedProfileDetail(p)}
            onLogout={handleLogout}
          />
        ) : (
          <ProfileSearch
            profiles={allProfiles}
            currentProfile={currentProfile}
            favorites={favorites}
            sentInterestIds={sentInterestIds}
            onViewDetails={(profile) => setSelectedProfileDetail(profile)}
            onSendInterest={(profile) => handleSendInterest(profile)}
            onToggleFavorite={handleToggleFavorite}
          />
        )}
      </main>

      {/* Footer */}
      <Footer
        onOpenLegal={(page) => setLegalModalPage(page)}
        onOpenLocalSeo={(slug) => setLocalSeoSlug(slug)}
        onNavigate={(view) => {
          setActiveView(view);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />

      {/* --- Modals & Overlays --- */}

      {/* Auth Modal */}
      {showAuthModal && (
        <AuthModal
          onClose={() => setShowAuthModal(false)}
          onSuccess={handleLoginSuccess}
          onSwitchToRegister={() => {
            setShowAuthModal(false);
            setShowRegisterModal(true);
          }}
        />
      )}

      {/* 5-Step Registration Wizard */}
      {showRegisterModal && (
        <RegisterWizard
          onClose={() => setShowRegisterModal(false)}
          onSuccess={handleRegisterSuccess}
        />
      )}

      {/* Detailed Profile Modal */}
      {selectedProfileDetail && (
        <ProfileDetailModal
          profile={selectedProfileDetail}
          currentUserProfile={currentProfile}
          compatibility={
            currentProfile
              ? calculateCompatibility(currentProfile, selectedProfileDetail)
              : undefined
          }
          onClose={() => setSelectedProfileDetail(null)}
          onSendInterest={(profile, customMsg) => {
            handleSendInterest(profile, customMsg);
          }}
          onReport={(profileId) => setReportTargetProfileId(profileId)}
          onBlock={handleBlockUser}
          hasAlreadySentInterest={sentInterestIds.includes(selectedProfileDetail.id)}
        />
      )}

      {/* Secure Messaging Modal */}
      {showMessagingModal && currentProfile && (
        <MessagingModal
          currentProfile={currentProfile}
          initialOtherProfileId={messagingTargetProfileId}
          onClose={() => setShowMessagingModal(false)}
          onReport={(profileId) => setReportTargetProfileId(profileId)}
          onBlock={handleBlockUser}
        />
      )}

      {/* Wali / Personne de confiance Modal */}
      {showWaliModal && currentProfile && (
        <WaliModal
          currentWali={currentProfile.wali}
          onClose={() => setShowWaliModal(false)}
          onSave={(waliData) => {
            StorageService.updateWali(waliData);
            setShowWaliModal(false);
            triggerToast('Option Wali enregistrée', 'Vos paramètres de personne de confiance ont été mis à jour.');
          }}
        />
      )}

      {/* Verification Modal */}
      {showVerificationModal && currentProfile && (
        <VerificationModal
          badges={currentProfile.verification}
          onClose={() => setShowVerificationModal(false)}
          onSubmitVerification={(type, docType, docNumber) => {
            StorageService.submitVerification(type, docType, docNumber);
            triggerToast(
              'Demande enregistrée',
              type === 'identity'
                ? 'Votre justificatif est en cours d\'examen par la modération.'
                : 'Badge activé sur votre profil.'
            );
          }}
        />
      )}

      {/* Freemium & Premium Pricing Modal */}
      {showPricingModal && currentProfile && (
        <PricingModal
          currentProfile={currentProfile}
          onClose={() => setShowPricingModal(false)}
          onUpgradeSuccess={handleUpgradeSuccess}
        />
      )}

      {/* Legal & Safety Modal */}
      {legalModalPage && (
        <LegalPagesModal
          initialPage={legalModalPage}
          onClose={() => setLegalModalPage(null)}
        />
      )}

      {/* Regional Local SEO Landing Modal */}
      {localSeoSlug && (
        <LocalLandingModal
          slug={localSeoSlug}
          onClose={() => setLocalSeoSlug(null)}
          onFilterCountry={(country) => {
            setActiveView('profiles');
            // User can see profiles in that country
          }}
          onOpenRegister={() => setShowRegisterModal(true)}
        />
      )}

      {/* User Report Modal */}
      {reportTargetProfileId && (
        <ReportModal
          reportedProfileId={reportTargetProfileId}
          onClose={() => setReportTargetProfileId(null)}
          onSubmitReport={(reason, desc) => handleReportUser(reportTargetProfileId, reason, desc)}
        />
      )}

    </div>
  );
}
