import React, { useState } from 'react';
import { WaliGuardian } from '../../types';
import { X, Users, ShieldCheck, Check, HeartHandshake, Info } from 'lucide-react';

interface WaliModalProps {
  currentWali: WaliGuardian;
  onClose: () => void;
  onSave: (wali: WaliGuardian) => void;
}

export const WaliModal: React.FC<WaliModalProps> = ({
  currentWali,
  onClose,
  onSave,
}) => {
  const [enabled, setEnabled] = useState(currentWali.enabled);
  const [name, setName] = useState(currentWali.name);
  const [relationship, setRelationship] = useState<WaliGuardian['relationship']>(currentWali.relationship || 'Père');
  const [phone, setPhone] = useState(currentWali.phone || '');
  const [email, setEmail] = useState(currentWali.email || '');
  const [wantsNotificationOnMatch, setWantsNotificationOnMatch] = useState(currentWali.wantsNotificationOnMatch);
  const [wantsIntroductionInChat, setWantsIntroductionInChat] = useState(currentWali.wantsIntroductionInChat);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      enabled,
      name: name.trim(),
      relationship,
      phone: phone.trim(),
      email: email.trim(),
      wantsNotificationOnMatch,
      wantsIntroductionInChat,
    });
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-lg rounded-3xl shadow-2xl border border-slate-200 overflow-hidden">
        
        {/* Header */}
        <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between bg-[#FAF9F6]">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-[#0F5132] flex items-center justify-center text-[#D4AF37]">
              <Users className="w-4 h-4" />
            </div>
            <div>
              <h2 className="font-serif-brand text-lg font-bold text-slate-900">
                Option Personne de Confiance / Wali
              </h2>
              <span className="text-[11px] text-[#0F5132] font-medium block">
                Accompagnement bienveillant et protecteur
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

        {/* Form Body */}
        <form onSubmit={handleSave} className="p-6 space-y-5 text-xs text-slate-700">
          
          {/* Explanation Banner */}
          <div className="p-4 rounded-xl bg-[#0F5132]/5 border border-[#0F5132]/20 flex items-start gap-3">
            <Info className="w-4 h-4 text-[#0F5132] shrink-0 mt-0.5" />
            <p className="text-[11px] text-slate-600 leading-relaxed">
              Cette fonctionnalité est <strong>entièrement facultative</strong>. Elle permet d'informer vos prétendants sérieux qu'un membre respecté de votre famille ou un accompagnateur est associé à votre démarche matrimoniale.
            </p>
          </div>

          {/* Toggle Enable */}
          <div className="flex items-center justify-between p-4 rounded-xl bg-slate-50 border border-slate-200">
            <div>
              <span className="font-semibold text-slate-900 block text-xs">
                Activer la mention du Wali / Personne de confiance
              </span>
              <span className="text-[11px] text-slate-500">
                Affiche un badge respectueux sur votre profil
              </span>
            </div>
            <button
              type="button"
              onClick={() => setEnabled(!enabled)}
              className={`w-12 h-6 rounded-full transition-colors relative ${
                enabled ? 'bg-[#0F5132]' : 'bg-slate-300'
              }`}
            >
              <span
                className={`w-5 h-5 rounded-full bg-white shadow-md block transition-transform absolute top-0.5 ${
                  enabled ? 'left-6' : 'left-0.5'
                }`}
              />
            </button>
          </div>

          {enabled && (
            <div className="space-y-4 pt-2">
              <div>
                <label className="font-semibold text-slate-700 block mb-1">
                  Prénom ou nom de la personne de confiance *
                </label>
                <input
                  type="text"
                  required={enabled}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Ex : Ibrahim (Mon père)"
                  className="w-full p-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#0F5132] outline-none"
                />
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">
                  Lien de parenté ou rôle *
                </label>
                <select
                  value={relationship}
                  onChange={(e) => setRelationship(e.target.value as any)}
                  className="w-full p-2.5 border border-slate-200 rounded-xl bg-white outline-none"
                >
                  <option value="Père">Père</option>
                  <option value="Frère">Frère</option>
                  <option value="Oncle">Oncle</option>
                  <option value="Tuteur légal">Tuteur légal</option>
                  <option value="Accompagnateur de confiance">Accompagnateur de confiance</option>
                </select>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">
                    Numéro de contact (Privé)
                  </label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+33 6 ... ou +227 ..."
                    className="w-full p-2.5 border border-slate-200 rounded-xl outline-none"
                  />
                </div>

                <div>
                  <label className="font-semibold text-slate-700 block mb-1">
                    Adresse Email (Privée)
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="wali@exemple.org"
                    className="w-full p-2.5 border border-slate-200 rounded-xl outline-none"
                  />
                </div>
              </div>

              {/* Preferences */}
              <div className="space-y-2 pt-2 border-t border-slate-100">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={wantsNotificationOnMatch}
                    onChange={(e) => setWantsNotificationOnMatch(e.target.checked)}
                    className="rounded text-[#0F5132] focus:ring-[#0F5132]"
                  />
                  <span className="text-[11px] text-slate-600">
                    Informer le prétendant que les coordonnées du Wali seront fournies dès accord mutuel
                  </span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={wantsIntroductionInChat}
                    onChange={(e) => setWantsIntroductionInChat(e.target.checked)}
                    className="rounded text-[#0F5132] focus:ring-[#0F5132]"
                  />
                  <span className="text-[11px] text-slate-600">
                    Afficher la mention « Wali informé » dans l'en-tête de la messagerie
                  </span>
                </label>
              </div>
            </div>
          )}

          {/* Footer Save */}
          <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl border border-slate-200 font-semibold hover:bg-slate-50 transition-colors"
            >
              Annuler
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-[#0F5132] hover:bg-[#198754] text-white font-semibold rounded-xl shadow transition-colors flex items-center gap-1.5"
            >
              <Check className="w-4 h-4" />
              <span>Enregistrer les préférences</span>
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};
