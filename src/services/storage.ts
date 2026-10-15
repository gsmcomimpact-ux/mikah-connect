import {
  UserProfile,
  UserAccount,
  UserPreferences,
  InterestRequest,
  Conversation,
  Message,
  ReportItem,
  VerificationRequest,
  WaliGuardian
} from '../types';
import { SEED_PROFILES } from '../data/seedProfiles';

const STORAGE_KEYS = {
  CURRENT_USER: 'nikah_current_user',
  CURRENT_PROFILE: 'nikah_current_profile',
  ALL_PROFILES: 'nikah_all_profiles',
  PREFERENCES: 'nikah_user_preferences',
  INTEREST_REQUESTS: 'nikah_interest_requests',
  CONVERSATIONS: 'nikah_conversations',
  MESSAGES: 'nikah_messages',
  REPORTS: 'nikah_reports',
  VERIFICATIONS: 'nikah_verifications',
  FAVORITES: 'nikah_favorites',
  BLOCKED_USERS: 'nikah_blocked_users',
  AUDIT_LOGS: 'nikah_audit_logs',
};

// Resilient Storage Wrapper (Safe against iframe sandboxing / private browsing exceptions)
const memoryStore: Record<string, string> = {};

const safeStorage = {
  getItem: (key: string): string | null => {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        const val = window.localStorage.getItem(key);
        if (val !== null) return val;
      }
    } catch {
      // In sandboxed iframes or private modes, fallback smoothly
    }
    return memoryStore[key] ?? null;
  },
  setItem: (key: string, value: string): void => {
    memoryStore[key] = value;
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        window.localStorage.setItem(key, value);
      }
    } catch {
      // Ignore security/quota errors
    }
  },
  removeItem: (key: string): void => {
    delete memoryStore[key];
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        window.localStorage.removeItem(key);
      }
    } catch {
      // Ignore
    }
  },
  clear: (): void => {
    for (const k of Object.keys(memoryStore)) {
      delete memoryStore[k];
    }
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        window.localStorage.clear();
      }
    } catch {
      // Ignore
    }
  }
};

// Initial default user for seamless first-run experience
const DEFAULT_USER_ACCOUNT: UserAccount = {
  id: 'user-default-nadia',
  email: 'nadia.demo@nikahconnect.org',
  phone: '+33 6 12 34 56 78',
  role: 'user',
  isSuspended: false,
  profileId: 'prof-nadia-00',
};

const DEFAULT_USER_PROFILE: UserProfile = {
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
  bio: 'Attachée aux valeurs de bienveillance, de piété et de franchise. Je recherche un frère posé et responsable, engagé dans sa foi, pour cheminer ensemble vers un mariage solide et béni.',
  photoUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80',
  religiousPractice: 'Pratiquant(e) régulier(e)',
  prayerHabit: '5 prières quotidiennes',
  values: ['Bienveillance', 'Honnêteté', 'Éducation', 'Soutien mutuel', 'Pudeur (Haya)'],
  marriageVision: 'Construire un foyer stable (Mawadda wa Rahma), d\'entraide dans les épreuves et de partage dans la joie.',
  marriageHorizon: 'Dans les 6 mois',
  desireForChildren: 'Oui, certainement',
  acceptsPartnerWithChildren: true,
  relocationWillingness: 'Dans mon pays',
  familyValues: 'Respect mutuel, harmonie avec les familles et éducation bienveillante.',
  interests: ['Lecture', 'Technologies éthiques', 'Randonnée', 'Pâtisserie'],
  verification: {
    emailVerified: true,
    phoneVerified: true,
    identityVerified: false,
  },
  wali: {
    enabled: true,
    name: 'Moussa (Père)',
    relationship: 'Père',
    phone: '+33 6 99 ** ** 10',
    email: 'moussa.famille@example.org',
    wantsNotificationOnMatch: true,
    wantsIntroductionInChat: true,
  },
  isPremium: false,
  createdAt: '2026-01-05T09:00:00Z',
  lastActive: 'En ligne',
};

const DEFAULT_PREFERENCES: UserPreferences = {
  ageMin: 25,
  ageMax: 38,
  countries: ['France', 'Niger', 'Sénégal', 'Belgique', 'Côte d\'Ivoire', 'Canada'],
  acceptChildren: 'indifferent',
  mobilityPreference: 'indifferent',
  verifiedOnly: false,
};

type StorageListener = () => void;
const listeners: Set<StorageListener> = new Set();

export function subscribeToStorage(fn: StorageListener) {
  listeners.add(fn);
  return () => {
    listeners.delete(fn);
  };
}

function notifyListeners() {
  listeners.forEach((fn) => fn());
}

export class StorageService {
  static initialize() {
    if (!safeStorage.getItem(STORAGE_KEYS.ALL_PROFILES)) {
      safeStorage.setItem(STORAGE_KEYS.ALL_PROFILES, JSON.stringify(SEED_PROFILES));
    }
    if (!safeStorage.getItem(STORAGE_KEYS.CURRENT_USER)) {
      safeStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(DEFAULT_USER_ACCOUNT));
    }
    if (!safeStorage.getItem(STORAGE_KEYS.CURRENT_PROFILE)) {
      safeStorage.setItem(STORAGE_KEYS.CURRENT_PROFILE, JSON.stringify(DEFAULT_USER_PROFILE));
    }
    if (!safeStorage.getItem(STORAGE_KEYS.PREFERENCES)) {
      safeStorage.setItem(STORAGE_KEYS.PREFERENCES, JSON.stringify(DEFAULT_PREFERENCES));
    }
    if (!safeStorage.getItem(STORAGE_KEYS.INTEREST_REQUESTS)) {
      const initialRequests: InterestRequest[] = [
        {
          id: 'req-init-1',
          senderProfileId: 'prof-tariq-02',
          receiverProfileId: 'prof-nadia-00',
          status: 'pending',
          message: 'As-salamu alaykum. Votre profil m\'inspire beaucoup de respect. Vos valeurs d\'honnêteté et votre projet de mariage correspondent à ce que je recherche.',
          createdAt: '2026-03-01T14:00:00Z',
        }
      ];
      safeStorage.setItem(STORAGE_KEYS.INTEREST_REQUESTS, JSON.stringify(initialRequests));
    }
    if (!safeStorage.getItem(STORAGE_KEYS.CONVERSATIONS)) {
      const initialConv: Conversation = {
        id: 'conv-init-1',
        participantIds: ['prof-nadia-00', 'prof-idriss-06'],
        createdAt: '2026-03-02T10:00:00Z',
        lastMessageAt: '2026-03-02T10:30:00Z',
        lastMessageText: 'As-salamu alaykum Nadia, j\'ai beaucoup apprécié votre vision équilibrée du mariage.',
        unreadCountFor: { 'prof-nadia-00': 1 },
      };
      safeStorage.setItem(STORAGE_KEYS.CONVERSATIONS, JSON.stringify([initialConv]));

      const initialMsgs: Message[] = [
        {
          id: 'msg-1',
          conversationId: 'conv-init-1',
          senderProfileId: 'prof-idriss-06',
          content: 'As-salamu alaykum Nadia, j\'ai beaucoup apprécié votre vision équilibrée du mariage et votre sensibilité à la spiritualité.',
          sentAt: '2026-03-02T10:30:00Z',
          isRead: false,
        }
      ];
      safeStorage.setItem(STORAGE_KEYS.MESSAGES, JSON.stringify(initialMsgs));
    }
    if (!safeStorage.getItem(STORAGE_KEYS.FAVORITES)) {
      safeStorage.setItem(STORAGE_KEYS.FAVORITES, JSON.stringify(['prof-tariq-02']));
    }
    if (!safeStorage.getItem(STORAGE_KEYS.BLOCKED_USERS)) {
      safeStorage.setItem(STORAGE_KEYS.BLOCKED_USERS, JSON.stringify([]));
    }
    if (!safeStorage.getItem(STORAGE_KEYS.REPORTS)) {
      safeStorage.setItem(STORAGE_KEYS.REPORTS, JSON.stringify([]));
    }
    if (!safeStorage.getItem(STORAGE_KEYS.VERIFICATIONS)) {
      safeStorage.setItem(STORAGE_KEYS.VERIFICATIONS, JSON.stringify([]));
    }
    if (!safeStorage.getItem(STORAGE_KEYS.AUDIT_LOGS)) {
      safeStorage.setItem(STORAGE_KEYS.AUDIT_LOGS, JSON.stringify([
        { id: 'log-1', timestamp: new Date().toISOString(), action: 'Système initialisé avec modération active' }
      ]));
    }
  }

  // Account & Profile
  static getCurrentUser(): UserAccount | null {
    const data = safeStorage.getItem(STORAGE_KEYS.CURRENT_USER);
    return data ? JSON.parse(data) : DEFAULT_USER_ACCOUNT;
  }

  static getCurrentProfile(): UserProfile | null {
    const data = safeStorage.getItem(STORAGE_KEYS.CURRENT_PROFILE);
    return data ? JSON.parse(data) : DEFAULT_USER_PROFILE;
  }

  static setCurrentProfile(profile: UserProfile | null) {
    if (profile) {
      safeStorage.setItem(STORAGE_KEYS.CURRENT_PROFILE, JSON.stringify(profile));
    } else {
      safeStorage.removeItem(STORAGE_KEYS.CURRENT_PROFILE);
    }
    notifyListeners();
  }

  static setCurrentUser(user: UserAccount | null) {
    if (user) {
      safeStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(user));
    } else {
      safeStorage.removeItem(STORAGE_KEYS.CURRENT_USER);
    }
    notifyListeners();
  }

  static getAllProfiles(): UserProfile[] {
    const data = safeStorage.getItem(STORAGE_KEYS.ALL_PROFILES);
    return data ? JSON.parse(data) : SEED_PROFILES;
  }

  static getProfileById(id: string): UserProfile | undefined {
    const current = this.getCurrentProfile();
    if (current && current.id === id) return current;
    const profiles = this.getAllProfiles();
    return profiles.find((p) => p.id === id);
  }

  static updateCurrentProfile(updates: Partial<UserProfile>): UserProfile {
    const current = this.getCurrentProfile() || DEFAULT_USER_PROFILE;
    const updated = { ...current, ...updates };
    safeStorage.setItem(STORAGE_KEYS.CURRENT_PROFILE, JSON.stringify(updated));
    notifyListeners();
    return updated;
  }

  static getPreferences(): UserPreferences {
    const data = safeStorage.getItem(STORAGE_KEYS.PREFERENCES);
    return data ? JSON.parse(data) : DEFAULT_PREFERENCES;
  }

  static updatePreferences(prefs: Partial<UserPreferences>): UserPreferences {
    const current = this.getPreferences();
    const updated = { ...current, ...prefs };
    safeStorage.setItem(STORAGE_KEYS.PREFERENCES, JSON.stringify(updated));
    notifyListeners();
    return updated;
  }

  // Interest Requests (Demandes d'intérêt)
  static getInterestRequests(): InterestRequest[] {
    const data = safeStorage.getItem(STORAGE_KEYS.INTEREST_REQUESTS);
    return data ? JSON.parse(data) : [];
  }

  static sendInterestRequest(toProfileId: string, customMessage?: string): InterestRequest {
    const current = this.getCurrentProfile();
    if (!current) throw new Error('Utilisateur non connecté');

    const requests = this.getInterestRequests();
    
    // Check if other profile already sent an interest to us -> Mutual match!
    const existingOpposite = requests.find(
      (r) => r.senderProfileId === toProfileId && r.receiverProfileId === current.id
    );

    const isMutual = !!existingOpposite;
    if (existingOpposite) {
      existingOpposite.status = 'accepted';
      existingOpposite.isMutual = true;
    }

    const newRequest: InterestRequest = {
      id: `req-${Date.now()}`,
      senderProfileId: current.id,
      receiverProfileId: toProfileId,
      status: isMutual ? 'accepted' : 'pending',
      message: customMessage || 'Je suis intéressé(e) par votre profil pour un projet sérieux.',
      createdAt: new Date().toISOString(),
      isMutual,
    };

    requests.push(newRequest);
    safeStorage.setItem(STORAGE_KEYS.INTEREST_REQUESTS, JSON.stringify(requests));

    // If mutual, automatically open a conversation!
    if (isMutual) {
      this.getOrCreateConversation(toProfileId);
    }

    notifyListeners();
    return newRequest;
  }

  static updateInterestRequestStatus(requestId: string, status: 'accepted' | 'declined') {
    const requests = this.getInterestRequests();
    const target = requests.find((r) => r.id === requestId);
    if (target) {
      target.status = status;
      if (status === 'accepted') {
        target.isMutual = true;
        this.getOrCreateConversation(target.senderProfileId);
      }
      safeStorage.setItem(STORAGE_KEYS.INTEREST_REQUESTS, JSON.stringify(requests));
      notifyListeners();
    }
  }

  // Favorites
  static getFavorites(): string[] {
    const data = safeStorage.getItem(STORAGE_KEYS.FAVORITES);
    return data ? JSON.parse(data) : [];
  }

  static toggleFavorite(profileId: string): boolean {
    const favs = this.getFavorites();
    let isFav = false;
    let next: string[];
    if (favs.includes(profileId)) {
      next = favs.filter((id) => id !== profileId);
      isFav = false;
    } else {
      next = [...favs, profileId];
      isFav = true;
    }
    safeStorage.setItem(STORAGE_KEYS.FAVORITES, JSON.stringify(next));
    notifyListeners();
    return isFav;
  }

  // Conversations & Messages
  static getConversations(): Conversation[] {
    const data = safeStorage.getItem(STORAGE_KEYS.CONVERSATIONS);
    const convs: Conversation[] = data ? JSON.parse(data) : [];
    const current = this.getCurrentProfile();
    if (!current) return [];
    return convs.filter((c) => c.participantIds.includes(current.id));
  }

  static getOrCreateConversation(otherProfileId: string): Conversation {
    const current = this.getCurrentProfile();
    if (!current) throw new Error('Utilisateur non connecté');

    const convs = this.getConversations();
    const existing = convs.find((c) => c.participantIds.includes(otherProfileId));
    if (existing) return existing;

    const newConv: Conversation = {
      id: `conv-${Date.now()}`,
      participantIds: [current.id, otherProfileId],
      createdAt: new Date().toISOString(),
      lastMessageAt: new Date().toISOString(),
      lastMessageText: 'Début de l\'échange respectueux',
      unreadCountFor: {},
    };

    const allData = safeStorage.getItem(STORAGE_KEYS.CONVERSATIONS);
    const allConvs: Conversation[] = allData ? JSON.parse(allData) : [];
    allConvs.push(newConv);
    safeStorage.setItem(STORAGE_KEYS.CONVERSATIONS, JSON.stringify(allConvs));
    notifyListeners();
    return newConv;
  }

  static getMessages(conversationId: string): Message[] {
    const data = safeStorage.getItem(STORAGE_KEYS.MESSAGES);
    const msgs: Message[] = data ? JSON.parse(data) : [];
    return msgs.filter((m) => m.conversationId === conversationId);
  }

  static sendMessage(conversationId: string, content: string): Message {
    const current = this.getCurrentProfile();
    if (!current) throw new Error('Non connecté');

    // Anti-scam keyword filter check
    const scamKeywords = ['argent', 'virement', 'western union', 'crypto', 'euros urgent', 'compte bancaire', 'rib', 'paypal'];
    const lower = content.toLowerCase();
    const isFlagged = scamKeywords.some(keyword => lower.includes(keyword));

    const newMsg: Message = {
      id: `msg-${Date.now()}`,
      conversationId,
      senderProfileId: current.id,
      content,
      sentAt: new Date().toISOString(),
      isRead: false,
      isFlaggedForScam: isFlagged,
    };

    const data = safeStorage.getItem(STORAGE_KEYS.MESSAGES);
    const msgs: Message[] = data ? JSON.parse(data) : [];
    msgs.push(newMsg);
    safeStorage.setItem(STORAGE_KEYS.MESSAGES, JSON.stringify(msgs));

    // Update conversation last message
    const convData = safeStorage.getItem(STORAGE_KEYS.CONVERSATIONS);
    const convs: Conversation[] = convData ? JSON.parse(convData) : [];
    const conv = convs.find(c => c.id === conversationId);
    if (conv) {
      conv.lastMessageAt = newMsg.sentAt;
      conv.lastMessageText = content.slice(0, 60);
      safeStorage.setItem(STORAGE_KEYS.CONVERSATIONS, JSON.stringify(convs));
    }

    notifyListeners();
    return newMsg;
  }

  // Wali Settings
  static updateWali(waliSettings: WaliGuardian) {
    const current = this.getCurrentProfile();
    if (current) {
      this.updateCurrentProfile({ wali: waliSettings });
    }
  }

  // Verification
  static submitVerification(type: 'email' | 'phone' | 'identity', docType?: 'CNI' | 'Passeport' | 'Permis', docNumber?: string) {
    const current = this.getCurrentProfile();
    if (!current) return;

    const data = safeStorage.getItem(STORAGE_KEYS.VERIFICATIONS);
    const list: VerificationRequest[] = data ? JSON.parse(data) : [];
    
    if (type === 'email') {
      current.verification.emailVerified = true;
      this.setCurrentProfile(current);
    } else if (type === 'phone') {
      current.verification.phoneVerified = true;
      this.setCurrentProfile(current);
    } else {
      const req: VerificationRequest = {
        id: `verif-${Date.now()}`,
        profileId: current.id,
        type,
        documentType: docType,
        documentNumberMasked: docNumber ? `***${docNumber.slice(-4)}` : '***8901',
        status: 'pending',
        submittedAt: new Date().toISOString(),
      };
      list.push(req);
      safeStorage.setItem(STORAGE_KEYS.VERIFICATIONS, JSON.stringify(list));
    }

    notifyListeners();
  }

  // Moderation & Reports
  static reportUser(reportedProfileId: string, reason: ReportItem['reason'], description: string) {
    const current = this.getCurrentProfile();
    const data = safeStorage.getItem(STORAGE_KEYS.REPORTS);
    const reports: ReportItem[] = data ? JSON.parse(data) : [];

    const newReport: ReportItem = {
      id: `rep-${Date.now()}`,
      reporterProfileId: current ? current.id : 'anonyme',
      reportedProfileId,
      reason,
      description,
      status: 'pending',
      createdAt: new Date().toISOString(),
    };

    reports.push(newReport);
    safeStorage.setItem(STORAGE_KEYS.REPORTS, JSON.stringify(reports));

    this.addAuditLog(`Signalement déposé contre le profil ${reportedProfileId} : ${reason}`);
    notifyListeners();
  }

  static blockUser(profileId: string) {
    const data = safeStorage.getItem(STORAGE_KEYS.BLOCKED_USERS);
    const blocked: string[] = data ? JSON.parse(data) : [];
    if (!blocked.includes(profileId)) {
      blocked.push(profileId);
      safeStorage.setItem(STORAGE_KEYS.BLOCKED_USERS, JSON.stringify(blocked));
      this.addAuditLog(`Profil ${profileId} bloqué par l'utilisateur`);
      notifyListeners();
    }
  }

  static getBlockedUsers(): string[] {
    const data = safeStorage.getItem(STORAGE_KEYS.BLOCKED_USERS);
    return data ? JSON.parse(data) : [];
  }

  // Admin capabilities
  static getAdminReports(): ReportItem[] {
    const data = safeStorage.getItem(STORAGE_KEYS.REPORTS);
    return data ? JSON.parse(data) : [];
  }

  static getAdminVerifications(): VerificationRequest[] {
    const data = safeStorage.getItem(STORAGE_KEYS.VERIFICATIONS);
    return data ? JSON.parse(data) : [];
  }

  static approveVerification(requestId: string) {
    const data = safeStorage.getItem(STORAGE_KEYS.VERIFICATIONS);
    const list: VerificationRequest[] = data ? JSON.parse(data) : [];
    const item = list.find(r => r.id === requestId);
    if (item) {
      item.status = 'approved';
      safeStorage.setItem(STORAGE_KEYS.VERIFICATIONS, JSON.stringify(list));

      const current = this.getCurrentProfile();
      if (current && current.id === item.profileId) {
        current.verification.identityVerified = true;
        this.setCurrentProfile(current);
      }
      this.addAuditLog(`Vérification d'identité approuvée pour ${item.profileId}`);
      notifyListeners();
    }
  }

  static handleReportAction(reportId: string, action: 'ban' | 'warn' | 'dismiss') {
    const data = safeStorage.getItem(STORAGE_KEYS.REPORTS);
    const reports: ReportItem[] = data ? JSON.parse(data) : [];
    const target = reports.find(r => r.id === reportId);
    if (target) {
      target.status = action === 'dismiss' ? 'dismissed' : 'action_taken';
      safeStorage.setItem(STORAGE_KEYS.REPORTS, JSON.stringify(reports));

      if (action === 'ban') {
        const all = this.getAllProfiles();
        const filtered = all.filter(p => p.id !== target.reportedProfileId);
        safeStorage.setItem(STORAGE_KEYS.ALL_PROFILES, JSON.stringify(filtered));
        this.addAuditLog(`Profil banni définitivement : ${target.reportedProfileId}`);
      } else if (action === 'warn') {
        this.addAuditLog(`Avertissement formel envoyé au profil : ${target.reportedProfileId}`);
      }
      notifyListeners();
    }
  }

  static addAuditLog(action: string) {
    const data = safeStorage.getItem(STORAGE_KEYS.AUDIT_LOGS);
    const logs = data ? JSON.parse(data) : [];
    logs.unshift({ id: `log-${Date.now()}`, timestamp: new Date().toISOString(), action });
    safeStorage.setItem(STORAGE_KEYS.AUDIT_LOGS, JSON.stringify(logs.slice(0, 50)));
  }

  static getAuditLogs() {
    const data = safeStorage.getItem(STORAGE_KEYS.AUDIT_LOGS);
    return data ? JSON.parse(data) : [];
  }

  // GDPR Data Export & Delete
  static exportUserData() {
    const user = this.getCurrentUser();
    const profile = this.getCurrentProfile();
    const prefs = this.getPreferences();
    const requests = this.getInterestRequests().filter(r => r.senderProfileId === profile?.id || r.receiverProfileId === profile?.id);
    const convs = this.getConversations();

    const data = {
      exportDate: new Date().toISOString(),
      account: user,
      profile,
      preferences: prefs,
      interests: requests,
      conversationsSummary: convs.length,
      note: 'Conformité RGPD & Protection des données personnelles NIKAH CONNECT'
    };

    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `nikah-connect-donnees-${profile?.displayName || 'utilisateur'}.json`;
    a.click();
    URL.revokeObjectURL(url);
  }

  static deleteUserAccount() {
    safeStorage.removeItem(STORAGE_KEYS.CURRENT_USER);
    safeStorage.removeItem(STORAGE_KEYS.CURRENT_PROFILE);
    notifyListeners();
  }

  static resetToDefaults() {
    safeStorage.clear();
    this.initialize();
    notifyListeners();
  }
}

// Automatically initialize synchronously on load
StorageService.initialize();
