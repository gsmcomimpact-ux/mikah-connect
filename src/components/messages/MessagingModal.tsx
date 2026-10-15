import React, { useState, useEffect, useRef } from 'react';
import { 
  UserProfile, 
  Conversation, 
  Message 
} from '../../types';
import { StorageService } from '../../services/storage';
import { 
  X, 
  Send, 
  ShieldAlert, 
  Users, 
  Trash2, 
  AlertTriangle, 
  CheckCircle2, 
  Lock,
  ArrowLeft
} from 'lucide-react';

interface MessagingModalProps {
  currentProfile: UserProfile;
  initialOtherProfileId?: string;
  onClose: () => void;
  onReport: (profileId: string) => void;
  onBlock: (profileId: string) => void;
}

export const MessagingModal: React.FC<MessagingModalProps> = ({
  currentProfile,
  initialOtherProfileId,
  onClose,
  onReport,
  onBlock,
}) => {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [activeConvId, setActiveConvId] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessageText, setNewMessageText] = useState('');
  const [warningScamDetected, setWarningScamDetected] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Load conversations
  useEffect(() => {
    const list = StorageService.getConversations();
    setConversations(list);

    if (initialOtherProfileId) {
      const conv = StorageService.getOrCreateConversation(initialOtherProfileId);
      setActiveConvId(conv.id);
    } else if (list.length > 0 && !activeConvId) {
      setActiveConvId(list[0].id);
    }
  }, [initialOtherProfileId]);

  // Load messages for active conversation
  useEffect(() => {
    if (activeConvId) {
      const msgs = StorageService.getMessages(activeConvId);
      setMessages(msgs);
      setTimeout(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
      }, 50);
    }
  }, [activeConvId]);

  // Get active other profile
  const activeConv = conversations.find((c) => c.id === activeConvId);
  const otherProfileId = activeConv?.participantIds.find((id) => id !== currentProfile.id);
  const otherProfile = otherProfileId ? StorageService.getProfileById(otherProfileId) : null;

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessageText.trim() || !activeConvId) return;

    // Check anti-scam keywords
    const lower = newMessageText.toLowerCase();
    if (lower.includes('argent') || lower.includes('virement') || lower.includes('western union') || lower.includes('paypal') || lower.includes('euros')) {
      setWarningScamDetected(true);
    } else {
      setWarningScamDetected(false);
    }

    const created = StorageService.sendMessage(activeConvId, newMessageText.trim());
    setMessages([...messages, created]);
    setNewMessageText('');

    // Refresh conversation list
    setConversations(StorageService.getConversations());
    setTimeout(() => {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 50);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-sm flex items-center justify-center p-2 sm:p-4">
      <div className="bg-white w-full max-w-4xl h-[90vh] rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col">
        
        {/* Modal Top Header */}
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-[#FAF9F6] shrink-0">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-[#0F5132] flex items-center justify-center text-[#D4AF37] font-bold text-sm">
              ن
            </div>
            <div>
              <h2 className="font-serif-brand text-lg font-bold text-slate-900">
                Messagerie Matrimoniale Sécurisée
              </h2>
              <span className="text-[11px] text-[#0F5132] font-medium flex items-center gap-1">
                <Lock className="w-3 h-3" /> Échanges chiffrés & courtois
              </span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-200/50"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Anti-Scam Persistent Reassurance Banner (Section 15) */}
        <div className="bg-amber-50 border-b border-amber-200 px-4 py-2 flex items-center justify-between gap-3 text-xs text-amber-900 shrink-0">
          <div className="flex items-center gap-2 truncate">
            <ShieldAlert className="w-4 h-4 text-amber-700 shrink-0" />
            <span className="truncate">
              <strong>Règle de sécurité absolue :</strong> Ne transférez jamais d'argent et ne communiquez jamais vos coordonnées bancaires.
            </span>
          </div>
          <span className="text-[10px] text-amber-700 uppercase font-bold shrink-0 hidden sm:inline">
            Modération Active
          </span>
        </div>

        {/* Content Body: Sidebar + Chat Panel */}
        <div className="flex-1 flex overflow-hidden">
          
          {/* Sidebar: Conversations */}
          <div className={`w-full md:w-80 border-r border-slate-100 bg-[#FAF9F6] flex flex-col shrink-0 ${activeConvId ? 'hidden md:flex' : 'flex'}`}>
            <div className="p-4 border-b border-slate-100">
              <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                Vos conversations ({conversations.length})
              </h3>
            </div>

            <div className="flex-1 overflow-y-auto divide-y divide-slate-100">
              {conversations.length > 0 ? (
                conversations.map((conv) => {
                  const otherId = conv.participantIds.find((id) => id !== currentProfile.id);
                  const profile = otherId ? StorageService.getProfileById(otherId) : null;
                  const isActive = conv.id === activeConvId;

                  return (
                    <button
                      key={conv.id}
                      onClick={() => setActiveConvId(conv.id)}
                      className={`w-full p-4 flex items-start gap-3 text-left transition-colors ${
                        isActive ? 'bg-white shadow-sm' : 'hover:bg-white/60'
                      }`}
                    >
                      <img
                        src={profile?.photoUrl || 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=600&q=80'}
                        alt={profile?.displayName || 'Membre'}
                        className="w-12 h-12 rounded-xl object-cover shrink-0 border border-slate-200"
                        referrerPolicy="no-referrer"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <h4 className="font-semibold text-xs text-slate-900 truncate">
                            {profile?.displayName || 'Membre'}
                          </h4>
                          <span className="text-[10px] text-slate-400">
                            {profile?.city}
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-500 truncate mt-0.5">
                          {conv.lastMessageText || 'Nouvel échange respectueux'}
                        </p>
                        {profile?.wali.enabled && (
                          <span className="inline-flex items-center gap-1 text-[10px] text-[#0F5132] mt-1 font-medium">
                            <Users className="w-2.5 h-2.5" /> Wali actif
                          </span>
                        )}
                      </div>
                    </button>
                  );
                })
              ) : (
                <div className="p-8 text-center text-xs text-slate-500">
                  Aucune conversation active pour le moment.
                </div>
              )}
            </div>
          </div>

          {/* Active Chat Column */}
          {activeConvId && otherProfile ? (
            <div className="flex-1 flex flex-col bg-white overflow-hidden">
              
              {/* Chat Sub-Header */}
              <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-white shrink-0">
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setActiveConvId(null)}
                    className="md:hidden p-1.5 rounded-lg text-slate-500 hover:bg-slate-100"
                  >
                    <ArrowLeft className="w-5 h-5" />
                  </button>

                  <img
                    src={otherProfile.photoUrl}
                    alt={otherProfile.displayName}
                    className="w-10 h-10 rounded-xl object-cover border border-slate-200"
                    referrerPolicy="no-referrer"
                  />
                  <div>
                    <h3 className="font-semibold text-sm text-slate-900">
                      {otherProfile.displayName}, {otherProfile.age} ans
                    </h3>
                    <div className="flex items-center gap-2 text-[11px] text-slate-500">
                      <span>{otherProfile.city}, {otherProfile.country}</span>
                      {otherProfile.wali.enabled && (
                        <span className="text-[#0F5132] font-semibold flex items-center gap-1">
                          · <Users className="w-3 h-3" /> Wali ({otherProfile.wali.relationship}) notifié
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Moderation Actions */}
                <div className="flex items-center gap-2 text-xs">
                  <button
                    onClick={() => onReport(otherProfile.id)}
                    className="text-amber-700 hover:bg-amber-50 p-2 rounded-lg transition-colors"
                    title="Signaler un comportement suspect ou abusif"
                  >
                    <ShieldAlert className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => onBlock(otherProfile.id)}
                    className="text-rose-600 hover:bg-rose-50 p-2 rounded-lg transition-colors"
                    title="Bloquer cet utilisateur"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Messages Flow */}
              <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-[#FAF9F6]">
                <div className="p-3 rounded-xl bg-white border border-slate-200/80 text-center text-xs text-slate-500 max-w-md mx-auto">
                  <span className="font-semibold text-[#0F5132] block">Cadre de bienveillance & pudeur</span>
                  Vos messages doivent rester courtois, sincères et orientés vers le mariage.
                </div>

                {messages.map((m) => {
                  const isMe = m.senderProfileId === currentProfile.id;
                  return (
                    <div
                      key={m.id}
                      className={`flex flex-col ${isMe ? 'items-end' : 'items-start'}`}
                    >
                      <div
                        className={`max-w-md p-3.5 rounded-2xl text-xs leading-relaxed shadow-sm ${
                          isMe
                            ? 'bg-[#0F5132] text-white rounded-br-none'
                            : 'bg-white text-slate-800 border border-slate-200/90 rounded-bl-none'
                        }`}
                      >
                        {m.content}
                      </div>
                      <span className="text-[10px] text-slate-400 mt-1 px-1">
                        {new Date(m.sentAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                  );
                })}
                <div ref={messagesEndRef} />
              </div>

              {/* Suspicious keyword alert */}
              {warningScamDetected && (
                <div className="bg-rose-50 border-t border-rose-200 px-4 py-2 text-rose-800 text-xs flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 shrink-0 text-rose-600" />
                  <span>
                    Avertissement sécurité : Les termes financiers sont surveillés. Ne sollicitez ni n'acceptez aucun transfert d'argent.
                  </span>
                </div>
              )}

              {/* Message Input Box */}
              <form onSubmit={handleSendMessage} className="p-4 border-t border-slate-100 bg-white flex items-center gap-2 shrink-0">
                <input
                  type="text"
                  value={newMessageText}
                  onChange={(e) => setNewMessageText(e.target.value)}
                  placeholder="Écrivez un message respectueux..."
                  className="flex-1 p-2.5 text-xs border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#0F5132] outline-none"
                />
                <button
                  type="submit"
                  disabled={!newMessageText.trim()}
                  className={`p-2.5 rounded-xl transition-colors ${
                    newMessageText.trim()
                      ? 'bg-[#0F5132] hover:bg-[#198754] text-white'
                      : 'bg-slate-100 text-slate-400 cursor-not-allowed'
                  }`}
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>

            </div>
          ) : (
            <div className="flex-1 hidden md:flex items-center justify-center p-8 text-center text-slate-400 text-xs">
              Sélectionnez une conversation à gauche pour échanger.
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
