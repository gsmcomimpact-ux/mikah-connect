// Domain Types for NIKAH CONNECT

export type Gender = 'homme' | 'femme';

export type MaritalStatus = 'celibataire' | 'divorce' | 'veuf';

export type EducationLevel = 
  | 'Bac'
  | 'Bac +2 / Licence'
  | 'Bac +5 / Master'
  | 'Doctorat / Études supérieures'
  | 'Autre parcours';

export type MarriageHorizon = 
  | 'Dans les 6 mois'
  | 'D\'ici 1 an'
  | 'D\'ici 2 ans'
  | 'Dès que la bonne personne est trouvée';

export type ChildrenDesire = 
  | 'Oui, certainement'
  | 'Ouvert à en discuter'
  | 'Non / Pas dans l\'immédiat';

export type ReligiousPracticeLevel = 
  | 'Très pratiquant(e) au quotidien'
  | 'Pratiquant(e) régulier(e)'
  | 'En cheminement / Progression'
  | 'Attachement culturel et spirituel';

export interface WaliGuardian {
  enabled: boolean;
  name: string;
  relationship: 'Père' | 'Frère' | 'Oncle' | 'Tuteur légal' | 'Accompagnateur de confiance';
  phone?: string;
  email?: string;
  wantsNotificationOnMatch: boolean;
  wantsIntroductionInChat: boolean;
}

export interface VerificationBadges {
  emailVerified: boolean;
  phoneVerified: boolean;
  identityVerified: boolean;
}

export interface UserPreferences {
  ageMin: number;
  ageMax: number;
  countries: string[];
  educationLevels?: EducationLevel[];
  maritalStatuses?: MaritalStatus[];
  acceptChildren: 'oui' | 'indifferent' | 'non';
  mobilityPreference: 'meme_pays' | 'ouvert_mobilite' | 'indifferent';
  verifiedOnly: boolean;
}

export interface UserProfile {
  id: string;
  userId: string;
  displayName: string;
  age: number;
  gender: Gender;
  city: string;
  country: string;
  occupation: string;
  education: EducationLevel;
  languages: string[];
  maritalStatus: MaritalStatus;
  childrenCount: number;
  bio: string;
  photoUrl: string;
  
  // Religious & Spiritual Profile
  religiousPractice: ReligiousPracticeLevel;
  prayerHabit: '5 prières quotidiennes' | 'Régulière avec assiduité' | 'En progression constante' | 'Personnel';
  values: string[];
  marriageVision: string;
  
  // Matrimonial Project
  marriageHorizon: MarriageHorizon;
  desireForChildren: ChildrenDesire;
  acceptsPartnerWithChildren: boolean;
  relocationWillingness: 'Dans mon pays' | 'Prêt(e) à déménager' | 'À discuter';
  familyValues: string;
  interests: string[];
  
  // Safety & Trust
  verification: VerificationBadges;
  wali: WaliGuardian;
  isPremium: boolean;
  createdAt: string;
  lastActive: string;
}

export interface UserAccount {
  id: string;
  email: string;
  phone: string;
  role: 'user' | 'admin';
  isSuspended: boolean;
  profileId: string;
}

export interface CompatibilityScore {
  totalPercentage: number;
  reasons: string[];
  breakdown: {
    values: number;
    timeline: number;
    lifestyle: number;
    geographic: number;
    family: number;
  };
}

export interface InterestRequest {
  id: string;
  senderProfileId: string;
  receiverProfileId: string;
  status: 'pending' | 'accepted' | 'declined';
  message?: string;
  createdAt: string;
  isMutual?: boolean;
}

export interface Message {
  id: string;
  conversationId: string;
  senderProfileId: string;
  content: string;
  sentAt: string;
  isRead: boolean;
  isFlaggedForScam?: boolean;
}

export interface Conversation {
  id: string;
  participantIds: string[];
  createdAt: string;
  lastMessageAt: string;
  lastMessageText: string;
  unreadCountFor: Record<string, number>;
  isBlockedBy?: string;
}

export interface ReportItem {
  id: string;
  reporterProfileId: string;
  reportedProfileId: string;
  reason: 
    | 'Demande d\'argent ou tentative d\'arnaque'
    | 'Faux profil / usurpation'
    | 'Propos déplacés ou irrespectueux'
    | 'Harcèlement'
    | 'Contenu inapproprié'
    | 'Autre';
  description: string;
  status: 'pending' | 'reviewed' | 'action_taken' | 'dismissed';
  createdAt: string;
}

export interface VerificationRequest {
  id: string;
  profileId: string;
  type: 'email' | 'phone' | 'identity';
  documentType?: 'CNI' | 'Passeport' | 'Permis';
  documentNumberMasked?: string;
  status: 'pending' | 'approved' | 'rejected';
  submittedAt: string;
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  category: string;
  readTime: string;
  publishDate: string;
  excerpt: string;
  content: string[];
  author: string;
  authorRole: string;
}

export interface LocalSeoPage {
  slug: string;
  country: string;
  title: string;
  description: string;
  cityList: string[];
  communityHighlights: string;
  faq: { q: string; a: string }[];
}
