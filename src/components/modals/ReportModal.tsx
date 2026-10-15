import React, { useState } from 'react';
import { X, ShieldAlert, Send } from 'lucide-react';
import { ReportItem } from '../../types';

interface ReportModalProps {
  reportedProfileId: string;
  onClose: () => void;
  onSubmitReport: (reason: ReportItem['reason'], description: string) => void;
}

export const ReportModal: React.FC<ReportModalProps> = ({
  reportedProfileId,
  onClose,
  onSubmitReport,
}) => {
  const [reason, setReason] = useState<ReportItem['reason']>('Demande d\'argent ou tentative d\'arnaque');
  const [description, setDescription] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmitReport(reason, description.trim());
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-md rounded-3xl shadow-2xl border border-slate-200 overflow-hidden">
        
        <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between bg-rose-50/50">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-rose-100 flex items-center justify-center text-rose-700">
              <ShieldAlert className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-serif-brand text-lg font-bold text-slate-900">
                Signaler un profil
              </h2>
              <span className="text-[11px] text-rose-700 font-medium block">
                Traitement confidentiel sous 24h
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

        <form onSubmit={handleSubmit} className="p-6 space-y-4 text-xs">
          <div>
            <label className="font-semibold text-slate-700 block mb-1">
              Motif principal du signalement *
            </label>
            <select
              value={reason}
              onChange={(e) => setReason(e.target.value as any)}
              className="w-full p-2.5 border border-slate-200 rounded-xl bg-white outline-none"
            >
              <option value="Demande d'argent ou tentative d'arnaque">Demande d'argent ou tentative d'arnaque</option>
              <option value="Faux profil / usurpation">Faux profil / usurpation d'identité</option>
              <option value="Propos déplacés ou irrespectueux">Propos déplacés ou contraires à la pudeur</option>
              <option value="Harcèlement">Harcèlement ou insistance anormale</option>
              <option value="Contenu inapproprié">Photo ou contenu inapproprié</option>
              <option value="Autre">Autre comportement abusif</option>
            </select>
          </div>

          <div>
            <label className="font-semibold text-slate-700 block mb-1">
              Précisions pour l'équipe de modération (facultatif)
            </label>
            <textarea
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Expliquez ce qui s'est passé..."
              className="w-full p-3 border border-slate-200 rounded-xl outline-none"
            />
          </div>

          <p className="text-[11px] text-slate-500 leading-relaxed">
            Votre identité ne sera jamais divulguée à la personne signalée. Les faux signalements répétés font également l'objet de sanctions.
          </p>

          <div className="pt-2 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl border border-slate-200 font-semibold text-slate-600 hover:bg-slate-50"
            >
              Annuler
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-semibold transition-colors shadow flex items-center gap-1.5"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Transmettre le signalement</span>
            </button>
          </div>
        </form>

      </div>
    </div>
  );
};
