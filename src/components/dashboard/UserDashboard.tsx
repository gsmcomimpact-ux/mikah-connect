import React, { useState } from 'react';
import { 
  UserProfile, 
  UserAccount, 
  InterestRequest,
  CompatibilityScore 
} from '../../types';
import { StorageService } from '../../services/storage';
import { 
  User, 
  HeartHandshake, 
  MessageSquare, 
  Heart, 
  ShieldCheck, 
  Users, 
  Download, 
  Trash2, 
  Sliders, 
  CheckCircle2, 
  XCircle, 
  Crown, 
  Sparkles,
  Edit3,
  Save,
  Clock,
  ArrowRight
} from 'lucide-react';

interface UserDashboardProps {
  currentProfile: UserProfile;
  currentAccount: UserAccount;
  allProfiles: UserProfile[];
  onUpdateProfile: (updates: Partial<UserProfile>) => void;
  onOpenMessages: (otherProfileId?: string) => void;
  onOpenWaliModal: () => void;
  onOpenVerificationModal: () => void;
  onOpenPricingModal: () => void;
  onViewProfileDetails: (profile: UserProfile) => void;
  onLogout: () => void;
}

export const UserDashboard: React.FC<UserDashboardProps> = ({
  currentProfile,
  currentAccount,
  allProfiles,
  onUpdateProfile,
  onOpenMessages,
  onOpenWaliModal,
  onOpenVerificationModal,
  onOpenPricingModal,
  onViewProfileDetails,
  onLogout,
}) => {
  const [activeTab, setActiveTab] = useState<
    'profile' | 'requests' | 'favorites' | 'wali' | 'security' | 'subscription'
  >('profile');

  // Edit profile state
  const [isEditing, setIsEditing] = useState(false);
  const [displayName, setDisplayName] = useState(currentProfile.displayName);
  const [city, setCity] = useState(currentProfile.city);
  const [country, setCountry] = useState(currentProfile.country);
  const [occupation, setOccupation] = useState(currentProfile.occupation);
  const [bio, setBio] = useState(currentProfile.bio);
  const [marriageVision, setMarriageVision] = useState(currentProfile.marriageVision);
  const [familyValues, setFamilyValues] = useState(currentProfile.familyValues);

  // Interest requests
  const requests = StorageService.getInterestRequests();
  const receivedRequests = requests.filter((r) => r.receiverProfileId === currentProfile.id);
  const sentRequests = requests.filter((r) => r.senderProfileId === currentProfile.id);

  // Favorites
  const favoriteIds = StorageService.getFavorites();
  const favoriteProfiles = allProfiles.filter((p) => favoriteIds.includes(p.id));

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateProfile({
      displayName,
      city,
      country,
      occupation,
      bio,
      marriageVision,
      familyValues,
    });
    setIsEditing(false);
  };

  const handleAcceptRequest = (reqId: string) => {
    StorageService.updateInterestRequestStatus(reqId, 'accepted');
  };

  const handleDeclineRequest = (reqId: string) => {
    StorageService.updateInterestRequestStatus(reqId, 'declined');
  };

  const handleExportData = () => {
    StorageService.exportUserData();
  };

  const handleDeleteAccount = () => {
    if (window.confirm('Êtes-vous certain(e) de vouloir supprimer définitivement votre compte NIKAH CONNECT ? Toutes vos données seront effacées.')) {
      StorageService.deleteUserAccount();
      onLogout();
    }
  };

  return (
    <div className="py-10 bg-[#FAF9F6] min-h-[80vh]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* User Card Top Banner */}
        <div className="p-6 rounded-3xl bg-white border border-slate-200/90 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="relative">
              <img
                src={currentProfile.photoUrl}
                alt={currentProfile.displayName}
                className="w-20 h-20 rounded-2xl object-cover border-2 border-slate-100 shadow"
                referrerPolicy="no-referrer"
              />
              {currentProfile.verification.identityVerified && (
                <div className="absolute -bottom-1 -right-1 p-1 bg-[#198754] text-white rounded-full shadow" title="Identité vérifiée">
                  <ShieldCheck className="w-3.5 h-3.5" />
                </div>
              )}
            </div>

            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-serif-brand text-2xl font-bold text-slate-900">
                  {currentProfile.displayName}, {currentProfile.age} ans
                </h1>
                {currentProfile.isPremium ? (
                  <span className="text-[10px] font-bold text-[#D4AF37] bg-[#D4AF37]/10 px-2 py-0.5 rounded-full flex items-center gap-1">
                    <Crown className="w-3 h-3" /> Membre Premium
                  </span>
                ) : (
                  <span className="text-[10px] font-medium text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full">
                    Compte Gratuit
                  </span>
                )}
              </div>
              <div className="text-xs text-slate-500 mt-0.5">
                <span>{currentProfile.city}, {currentProfile.country}</span>
                <span className="mx-1">·</span>
                <span>{currentProfile.occupation}</span>
              </div>
              <div className="flex items-center gap-2 mt-2 text-[11px]">
                <button
                  onClick={onOpenVerificationModal}
                  className="text-emerald-700 hover:underline flex items-center gap-1 font-medium"
                >
                  <ShieldCheck className="w-3.5 h-3.5" /> Centre de vérification
                </button>
                <span className="text-slate-300">·</span>
                <button
                  onClick={onOpenWaliModal}
                  className="text-[#0F5132] hover:underline flex items-center gap-1 font-medium"
                >
                  <Users className="w-3.5 h-3.5" /> Option Wali ({currentProfile.wali.enabled ? 'Actif' : 'Désactivé'})
                </button>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <button
              onClick={() => onOpenMessages()}
              className="px-4 py-2.5 rounded-xl bg-[#0F5132] hover:bg-[#198754] text-white text-xs font-semibold shadow-sm transition-colors flex items-center gap-1.5"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Ouvrir ma messagerie</span>
            </button>

            {!currentProfile.isPremium && (
              <button
                onClick={onOpenPricingModal}
                className="px-4 py-2.5 rounded-xl bg-[#D4AF37] hover:bg-[#c49f2e] text-[#17201A] text-xs font-bold shadow-sm transition-colors flex items-center gap-1.5"
              >
                <Crown className="w-4 h-4" />
                <span>Passer Premium</span>
              </button>
            )}
          </div>
        </div>

        {/* Dashboard Navigation Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-slate-200">
          <button
            onClick={() => setActiveTab('profile')}
            className={`py-2 px-4 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors flex items-center gap-1.5 ${
              activeTab === 'profile'
                ? 'bg-[#0F5132] text-white shadow-sm'
                : 'bg-white text-slate-600 hover:text-slate-900 border border-slate-200'
            }`}
          >
            <User className="w-3.5 h-3.5" />
            <span>Mon Profil</span>
          </button>

          <button
            onClick={() => setActiveTab('requests')}
            className={`py-2 px-4 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors flex items-center gap-1.5 ${
              activeTab === 'requests'
                ? 'bg-[#0F5132] text-white shadow-sm'
                : 'bg-white text-slate-600 hover:text-slate-900 border border-slate-200'
            }`}
          >
            <HeartHandshake className="w-3.5 h-3.5" />
            <span>Mes Demandes ({receivedRequests.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('favorites')}
            className={`py-2 px-4 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors flex items-center gap-1.5 ${
              activeTab === 'favorites'
                ? 'bg-[#0F5132] text-white shadow-sm'
                : 'bg-white text-slate-600 hover:text-slate-900 border border-slate-200'
            }`}
          >
            <Heart className="w-3.5 h-3.5" />
            <span>Favoris ({favoriteProfiles.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('wali')}
            className={`py-2 px-4 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors flex items-center gap-1.5 ${
              activeTab === 'wali'
                ? 'bg-[#0F5132] text-white shadow-sm'
                : 'bg-white text-slate-600 hover:text-slate-900 border border-slate-200'
            }`}
          >
            <Users className="w-3.5 h-3.5" />
            <span>Tuteur / Wali</span>
          </button>

          <button
            onClick={() => setActiveTab('subscription')}
            className={`py-2 px-4 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors flex items-center gap-1.5 ${
              activeTab === 'subscription'
                ? 'bg-[#0F5132] text-white shadow-sm'
                : 'bg-white text-slate-600 hover:text-slate-900 border border-slate-200'
            }`}
          >
            <Crown className="w-3.5 h-3.5" />
            <span>Abonnement</span>
          </button>

          <button
            onClick={() => setActiveTab('security')}
            className={`py-2 px-4 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors flex items-center gap-1.5 ${
              activeTab === 'security'
                ? 'bg-[#0F5132] text-white shadow-sm'
                : 'bg-white text-slate-600 hover:text-slate-900 border border-slate-200'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Sécurité & Données</span>
          </button>
        </div>

        {/* Tab Content Panes */}
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8">
          
          {/* TAB 1: Mon Profil */}
          {activeTab === 'profile' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                <div>
                  <h3 className="font-serif-brand text-xl font-bold text-slate-900">
                    Présentation de votre profil
                  </h3>
                  <p className="text-xs text-slate-500">
                    Ces éléments sont visibles par les autres membres inscrits dans le respect des règles de pudeur.
                  </p>
                </div>
                {!isEditing ? (
                  <button
                    onClick={() => setIsEditing(true)}
                    className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-xl transition-colors flex items-center gap-1.5"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                    <span>Modifier</span>
                  </button>
                ) : (
                  <button
                    onClick={() => setIsEditing(false)}
                    className="px-4 py-2 border border-slate-200 text-slate-600 text-xs font-semibold rounded-xl"
                  >
                    Annuler
                  </button>
                )}
              </div>

              {!isEditing ? (
                <div className="space-y-6 text-xs text-slate-700">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="p-4 rounded-2xl bg-slate-50">
                      <span className="text-slate-400 block mb-1">Prénom / Pseudonyme :</span>
                      <span className="font-semibold text-slate-900">{currentProfile.displayName}</span>
                    </div>
                    <div className="p-4 rounded-2xl bg-slate-50">
                      <span className="text-slate-400 block mb-1">Profession :</span>
                      <span className="font-semibold text-slate-900">{currentProfile.occupation}</span>
                    </div>
                    <div className="p-4 rounded-2xl bg-slate-50">
                      <span className="text-slate-400 block mb-1">Localisation :</span>
                      <span className="font-semibold text-slate-900">{currentProfile.city}, {currentProfile.country}</span>
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-50 space-y-2">
                    <span className="text-slate-400 block font-semibold">Présentation personnelle (Bio) :</span>
                    <p className="text-slate-800 leading-relaxed whitespace-pre-line">
                      {currentProfile.bio}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="p-4 rounded-2xl bg-slate-50 space-y-1">
                      <span className="text-slate-400 block font-semibold">Vision du mariage :</span>
                      <p className="text-slate-800 leading-relaxed">
                        {currentProfile.marriageVision}
                      </p>
                    </div>

                    <div className="p-4 rounded-2xl bg-slate-50 space-y-1">
                      <span className="text-slate-400 block font-semibold">Vision de la famille :</span>
                      <p className="text-slate-800 leading-relaxed">
                        {currentProfile.familyValues}
                      </p>
                    </div>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSaveProfile} className="space-y-4 text-xs">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="font-semibold text-slate-700 block mb-1">Prénom ou pseudo</label>
                      <input
                        type="text"
                        value={displayName}
                        onChange={(e) => setDisplayName(e.target.value)}
                        className="w-full p-2.5 border border-slate-200 rounded-xl"
                      />
                    </div>
                    <div>
                      <label className="font-semibold text-slate-700 block mb-1">Profession</label>
                      <input
                        type="text"
                        value={occupation}
                        onChange={(e) => setOccupation(e.target.value)}
                        className="w-full p-2.5 border border-slate-200 rounded-xl"
                      />
                    </div>
                    <div>
                      <label className="font-semibold text-slate-700 block mb-1">Ville</label>
                      <input
                        type="text"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        className="w-full p-2.5 border border-slate-200 rounded-xl"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="font-semibold text-slate-700 block mb-1">Présentation (Bio)</label>
                    <textarea
                      rows={3}
                      value={bio}
                      onChange={(e) => setBio(e.target.value)}
                      className="w-full p-3 border border-slate-200 rounded-xl"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="font-semibold text-slate-700 block mb-1">Vision du mariage</label>
                      <textarea
                        rows={2}
                        value={marriageVision}
                        onChange={(e) => setMarriageVision(e.target.value)}
                        className="w-full p-3 border border-slate-200 rounded-xl"
                      />
                    </div>
                    <div>
                      <label className="font-semibold text-slate-700 block mb-1">Vision de la famille</label>
                      <textarea
                        rows={2}
                        value={familyValues}
                        onChange={(e) => setFamilyValues(e.target.value)}
                        className="w-full p-3 border border-slate-200 rounded-xl"
                      />
                    </div>
                  </div>

                  <div className="pt-2 flex justify-end">
                    <button
                      type="submit"
                      className="px-6 py-2.5 bg-[#0F5132] hover:bg-[#198754] text-white font-semibold rounded-xl shadow flex items-center gap-1.5"
                    >
                      <Save className="w-4 h-4" />
                      <span>Enregistrer les modifications</span>
                    </button>
                  </div>
                </form>
              )}
            </div>
          )}

          {/* TAB 2: Mes Demandes (Received & Sent) */}
          {activeTab === 'requests' && (
            <div className="space-y-6">
              <div>
                <h3 className="font-serif-brand text-xl font-bold text-slate-900">
                  Demandes d'intérêt & Compatibilités
                </h3>
                <p className="text-xs text-slate-500">
                  Gérez les sollicitations matrimoniales reçues et suivez vos envois.
                </p>
              </div>

              {/* Received Requests */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Demandes reçues ({receivedRequests.length})
                </h4>
                {receivedRequests.length > 0 ? (
                  <div className="divide-y divide-slate-100 border border-slate-200 rounded-2xl overflow-hidden">
                    {receivedRequests.map((req) => {
                      const sender = StorageService.getProfileById(req.senderProfileId);
                      return (
                        <div key={req.id} className="p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white">
                          <div className="flex items-center gap-3">
                            <img
                              src={sender?.photoUrl}
                              alt={sender?.displayName}
                              className="w-12 h-12 rounded-xl object-cover border border-slate-100"
                              referrerPolicy="no-referrer"
                            />
                            <div>
                              <button
                                onClick={() => sender && onViewProfileDetails(sender)}
                                className="font-semibold text-xs text-slate-900 hover:text-[#0F5132] text-left"
                              >
                                {sender?.displayName}, {sender?.age} ans
                              </button>
                              <span className="text-[11px] text-slate-500 block">
                                {sender?.city}, {sender?.country} · {sender?.occupation}
                              </span>
                              {req.message && (
                                <p className="text-[11px] text-slate-600 italic mt-1 bg-slate-50 p-2 rounded-lg">
                                  « {req.message} »
                                </p>
                              )}
                            </div>
                          </div>

                          <div className="flex items-center gap-2 self-end sm:self-center">
                            {req.status === 'pending' ? (
                              <>
                                <button
                                  onClick={() => handleAcceptRequest(req.id)}
                                  className="px-3 py-1.5 bg-[#0F5132] hover:bg-[#198754] text-white text-xs font-semibold rounded-lg transition-colors flex items-center gap-1"
                                >
                                  <CheckCircle2 className="w-3.5 h-3.5" />
                                  <span>Accepter l'échange</span>
                                </button>
                                <button
                                  onClick={() => handleDeclineRequest(req.id)}
                                  className="px-3 py-1.5 border border-slate-200 text-slate-500 hover:bg-slate-50 text-xs font-semibold rounded-lg transition-colors"
                                >
                                  Décliner avec courtoisie
                                </button>
                              </>
                            ) : req.status === 'accepted' ? (
                              <button
                                onClick={() => sender && onOpenMessages(sender.id)}
                                className="px-3 py-1.5 bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-semibold rounded-lg flex items-center gap-1.5"
                              >
                                <MessageSquare className="w-3.5 h-3.5" />
                                <span>Discuter</span>
                              </button>
                            ) : (
                              <span className="text-xs text-slate-400">Demande déclinée</span>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="p-8 text-center text-xs text-slate-400 bg-slate-50 rounded-2xl">
                    Aucune nouvelle demande reçue pour le moment.
                  </div>
                )}
              </div>

              {/* Sent Requests */}
              <div className="space-y-3 pt-4 border-t border-slate-100">
                <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Demandes envoyées ({sentRequests.length})
                </h4>
                {sentRequests.length > 0 ? (
                  <div className="divide-y divide-slate-100 border border-slate-200 rounded-2xl overflow-hidden">
                    {sentRequests.map((req) => {
                      const receiver = StorageService.getProfileById(req.receiverProfileId);
                      return (
                        <div key={req.id} className="p-4 flex items-center justify-between gap-4 bg-white text-xs">
                          <div className="flex items-center gap-3">
                            <img
                              src={receiver?.photoUrl}
                              alt={receiver?.displayName}
                              className="w-10 h-10 rounded-xl object-cover"
                              referrerPolicy="no-referrer"
                            />
                            <div>
                              <span className="font-semibold text-slate-900 block">
                                {receiver?.displayName}, {receiver?.age} ans
                              </span>
                              <span className="text-[11px] text-slate-500">
                                {receiver?.city}, {receiver?.country}
                              </span>
                            </div>
                          </div>

                          <div>
                            {req.status === 'accepted' ? (
                              <button
                                onClick={() => receiver && onOpenMessages(receiver.id)}
                                className="px-3 py-1.5 bg-emerald-50 text-emerald-800 font-semibold rounded-lg flex items-center gap-1"
                              >
                                <MessageSquare className="w-3.5 h-3.5" />
                                <span>Échange mutuel accepté</span>
                              </button>
                            ) : req.status === 'declined' ? (
                              <span className="text-slate-400">Non disponible</span>
                            ) : (
                              <span className="text-amber-700 bg-amber-50 px-2.5 py-1 rounded-md font-medium">
                                En attente de réponse
                              </span>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="p-8 text-center text-xs text-slate-400 bg-slate-50 rounded-2xl">
                    Vous n'avez pas encore envoyé de demande d'intérêt.
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TAB 3: Favoris */}
          {activeTab === 'favorites' && (
            <div className="space-y-4">
              <div>
                <h3 className="font-serif-brand text-xl font-bold text-slate-900">
                  Vos profils favoris
                </h3>
                <p className="text-xs text-slate-500">
                  Retrouvez rapidement les profils que vous avez enregistrés pour réflexion.
                </p>
              </div>

              {favoriteProfiles.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {favoriteProfiles.map((p) => (
                    <div key={p.id} className="p-4 rounded-2xl border border-slate-200 bg-slate-50/50 flex flex-col justify-between space-y-3">
                      <div className="flex items-center gap-3">
                        <img
                          src={p.photoUrl}
                          alt={p.displayName}
                          className="w-12 h-12 rounded-xl object-cover"
                          referrerPolicy="no-referrer"
                        />
                        <div>
                          <h4 className="font-semibold text-xs text-slate-900">{p.displayName}, {p.age} ans</h4>
                          <span className="text-[11px] text-slate-500">{p.city}, {p.country}</span>
                        </div>
                      </div>
                      <button
                        onClick={() => onViewProfileDetails(p)}
                        className="w-full py-2 bg-[#0F5132] text-white text-xs font-semibold rounded-lg hover:bg-[#198754] transition-colors"
                      >
                        Consulter la fiche
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-8 text-center text-xs text-slate-400 bg-slate-50 rounded-2xl">
                  Vous n'avez aucun profil en favori.
                </div>
              )}
            </div>
          )}

          {/* TAB 4: Wali / Tuteur */}
          {activeTab === 'wali' && (
            <div className="space-y-6">
              <div>
                <h3 className="font-serif-brand text-xl font-bold text-slate-900">
                  Option Personne de Confiance / Wali
                </h3>
                <p className="text-xs text-slate-500">
                  Paramétrez la présence protectrice d'un proche pour vous accompagner.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-[#0F5132]/5 border border-[#0F5132]/20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <span className="font-semibold text-xs text-slate-900 block">
                    Statut actuel : {currentProfile.wali.enabled ? 'Activé' : 'Désactivé'}
                  </span>
                  {currentProfile.wali.enabled ? (
                    <p className="text-[11px] text-slate-600 mt-0.5">
                      Personne associée : <strong>{currentProfile.wali.name}</strong> ({currentProfile.wali.relationship})
                    </p>
                  ) : (
                    <p className="text-[11px] text-slate-500 mt-0.5">
                      Aucune personne de confiance n'est actuellement affichée sur votre profil.
                    </p>
                  )}
                </div>

                <button
                  onClick={onOpenWaliModal}
                  className="px-4 py-2 bg-[#0F5132] hover:bg-[#198754] text-white text-xs font-semibold rounded-xl transition-colors shrink-0"
                >
                  Configurer le Wali
                </button>
              </div>
            </div>
          )}

          {/* TAB 5: Abonnement */}
          {activeTab === 'subscription' && (
            <div className="space-y-6">
              <div>
                <h3 className="font-serif-brand text-xl font-bold text-slate-900">
                  Statut de votre abonnement
                </h3>
                <p className="text-xs text-slate-500">
                  NIKAH CONNECT propose une formule accessible garantissant le sérieux et la modération active de la communauté.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className={`p-6 rounded-3xl border ${!currentProfile.isPremium ? 'border-[#0F5132] bg-[#0F5132]/5' : 'border-slate-200 bg-white'}`}>
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">Formule Gratuite</span>
                  <div className="text-2xl font-bold text-slate-900 mt-2">0 € <span className="text-xs font-normal text-slate-500">/ mois</span></div>
                  <ul className="mt-4 space-y-2 text-xs text-slate-600">
                    <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Profil vérifiable</li>
                    <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Consultation illimitée des fiches</li>
                    <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Jusqu'à 3 demandes d'intérêt par mois</li>
                  </ul>
                  {!currentProfile.isPremium && (
                    <div className="mt-6 text-xs font-semibold text-[#0F5132]">Formule active</div>
                  )}
                </div>

                <div className={`p-6 rounded-3xl border ${currentProfile.isPremium ? 'border-[#D4AF37] bg-[#D4AF37]/5' : 'border-[#D4AF37]/40 bg-white shadow-sm'}`}>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-[#D4AF37] uppercase tracking-wider">Membre Premium Sérieux</span>
                    <Crown className="w-5 h-5 text-[#D4AF37]" />
                  </div>
                  <div className="text-2xl font-bold text-slate-900 mt-2">14,90 € <span className="text-xs font-normal text-slate-500">/ mois</span></div>
                  <ul className="mt-4 space-y-2 text-xs text-slate-700">
                    <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-[#198754]" /> <strong>Demandes d'intérêt illimitées</strong></li>
                    <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-[#198754]" /> Filtres avancés & compatibilité approfondie</li>
                    <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-[#198754]" /> Badge Membre Sérieux sur votre profil</li>
                    <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-[#198754]" /> Traitement prioritaire de votre pièce d'identité</li>
                  </ul>
                  <div className="mt-6">
                    {currentProfile.isPremium ? (
                      <div className="text-xs font-semibold text-[#198754]">Votre statut Premium est actif</div>
                    ) : (
                      <button
                        onClick={onOpenPricingModal}
                        className="w-full py-2.5 bg-[#0F5132] hover:bg-[#198754] text-white text-xs font-semibold rounded-xl transition-colors shadow"
                      >
                        Activer mon abonnement Premium
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 6: Sécurité & Données */}
          {activeTab === 'security' && (
            <div className="space-y-6 text-xs text-slate-700">
              <div>
                <h3 className="font-serif-brand text-xl font-bold text-slate-900">
                  Sécurité, Données Personnelles & Confidentialité (RGPD)
                </h3>
                <p className="text-xs text-slate-500">
                  Consultez, exportez ou supprimez vos données en toute autonomie.
                </p>
              </div>

              {/* Data Export */}
              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <h4 className="font-semibold text-slate-900 text-xs">
                    Exportation complète de vos données (Portabilité RGPD)
                  </h4>
                  <p className="text-[11px] text-slate-500 mt-0.5">
                    Téléchargez une copie intégrale au format JSON de votre profil, préférences et historiques de demandes.
                  </p>
                </div>
                <button
                  onClick={handleExportData}
                  className="px-4 py-2 bg-white border border-slate-200 hover:bg-slate-100 text-slate-700 font-semibold rounded-xl transition-colors flex items-center gap-1.5 shrink-0"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Télécharger mes données</span>
                </button>
              </div>

              {/* Delete Account */}
              <div className="p-5 rounded-2xl bg-rose-50/50 border border-rose-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <h4 className="font-semibold text-rose-900 text-xs">
                    Suppression définitive du compte
                  </h4>
                  <p className="text-[11px] text-rose-700 mt-0.5">
                    Cette action est irréversible. Votre profil, vos conversations et vos demandes seront immédiatement effacés de nos serveurs.
                  </p>
                </div>
                <button
                  onClick={handleDeleteAccount}
                  className="px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white font-semibold rounded-xl transition-colors flex items-center gap-1.5 shrink-0"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Supprimer mon compte</span>
                </button>
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
