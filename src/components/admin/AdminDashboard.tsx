import React, { useState } from 'react';
import { StorageService } from '../../services/storage';
import { UserProfile, ReportItem, VerificationRequest } from '../../types';
import { 
  ShieldCheck, 
  Users, 
  AlertTriangle, 
  CheckCircle2, 
  XCircle, 
  UserX, 
  FileCheck, 
  Activity, 
  Clock, 
  Search,
  MessageSquare,
  Lock
} from 'lucide-react';

interface AdminDashboardProps {
  onClose: () => void;
  onRefreshProfiles: () => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  onClose,
  onRefreshProfiles,
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'reports' | 'verifications' | 'audit'>('overview');

  const profiles = StorageService.getAllProfiles();
  const reports = StorageService.getAdminReports();
  const verifications = StorageService.getAdminVerifications();
  const auditLogs = StorageService.getAuditLogs();
  const convs = StorageService.getConversations();

  const verifiedCount = profiles.filter((p) => p.verification.identityVerified).length;
  const pendingReports = reports.filter((r) => r.status === 'pending');
  const pendingVerifs = verifications.filter((v) => v.status === 'pending');

  const handleReportAction = (reportId: string, action: 'ban' | 'warn' | 'dismiss') => {
    StorageService.handleReportAction(reportId, action);
    onRefreshProfiles();
  };

  const handleApproveVerif = (verifId: string) => {
    StorageService.approveVerification(verifId);
    onRefreshProfiles();
  };

  return (
    <div className="py-10 bg-slate-900 text-slate-100 min-h-[90vh]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Top Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400 uppercase tracking-widest">
              <ShieldCheck className="w-4 h-4" />
              <span>Console d'Administration & Modération Éthique</span>
            </div>
            <h1 className="font-serif-brand text-2xl sm:text-3xl font-bold text-white mt-1">
              Tableau de bord Superviseur NIKAH CONNECT
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-xl transition-colors border border-slate-700"
            >
              Fermer l'espace Admin
            </button>
          </div>
        </div>

        {/* Global Statistics Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          <div className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700/80">
            <span className="text-[11px] text-slate-400 block">Total Membres</span>
            <span className="text-xl font-bold font-mono tabular-nums text-white mt-1 block">
              {profiles.length}
            </span>
          </div>

          <div className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700/80">
            <span className="text-[11px] text-slate-400 block">Profils Certifiés</span>
            <span className="text-xl font-bold font-mono tabular-nums text-emerald-400 mt-1 block">
              {verifiedCount}
            </span>
          </div>

          <div className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700/80">
            <span className="text-[11px] text-slate-400 block">Signalements Actifs</span>
            <span className="text-xl font-bold font-mono tabular-nums text-rose-400 mt-1 block">
              {pendingReports.length}
            </span>
          </div>

          <div className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700/80">
            <span className="text-[11px] text-slate-400 block">Vérifications en attente</span>
            <span className="text-xl font-bold font-mono tabular-nums text-amber-400 mt-1 block">
              {pendingVerifs.length}
            </span>
          </div>

          <div className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700/80">
            <span className="text-[11px] text-slate-400 block">Conversations en cours</span>
            <span className="text-xl font-bold font-mono tabular-nums text-cyan-400 mt-1 block">
              {convs.length}
            </span>
          </div>

          <div className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700/80">
            <span className="text-[11px] text-slate-400 block">Membres Premium</span>
            <span className="text-xl font-bold font-mono tabular-nums text-[#D4AF37] mt-1 block">
              {profiles.filter((p) => p.isPremium).length}
            </span>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-2 border-b border-slate-800 pb-2">
          <button
            onClick={() => setActiveTab('overview')}
            className={`py-2 px-4 rounded-xl text-xs font-semibold transition-colors ${
              activeTab === 'overview'
                ? 'bg-emerald-600 text-white'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            Vue d'ensemble & Membres
          </button>

          <button
            onClick={() => setActiveTab('reports')}
            className={`py-2 px-4 rounded-xl text-xs font-semibold transition-colors relative ${
              activeTab === 'reports'
                ? 'bg-emerald-600 text-white'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <span>Signalements & Sécurité</span>
            {pendingReports.length > 0 && (
              <span className="ml-1.5 px-1.5 py-0.2 bg-rose-500 text-white rounded-full text-[10px]">
                {pendingReports.length}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('verifications')}
            className={`py-2 px-4 rounded-xl text-xs font-semibold transition-colors relative ${
              activeTab === 'verifications'
                ? 'bg-emerald-600 text-white'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <span>Demandes d'Identité</span>
            {pendingVerifs.length > 0 && (
              <span className="ml-1.5 px-1.5 py-0.2 bg-amber-500 text-slate-900 font-bold rounded-full text-[10px]">
                {pendingVerifs.length}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('audit')}
            className={`py-2 px-4 rounded-xl text-xs font-semibold transition-colors ${
              activeTab === 'audit'
                ? 'bg-emerald-600 text-white'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            Journal d'Audit
          </button>
        </div>

        {/* Tab 1: Overview & All Profiles table */}
        {activeTab === 'overview' && (
          <div className="bg-slate-800/60 rounded-3xl border border-slate-700/80 p-6 space-y-4">
            <h3 className="font-semibold text-base text-white">
              Annuaire des profils actifs ({profiles.length})
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-300">
                <thead className="bg-slate-900/60 text-slate-400 uppercase tracking-wider text-[10px]">
                  <tr>
                    <th className="p-3">Profil</th>
                    <th className="p-3">Âge & Sexe</th>
                    <th className="p-3">Localisation</th>
                    <th className="p-3">Profession</th>
                    <th className="p-3">Statut Certif</th>
                    <th className="p-3">Wali</th>
                    <th className="p-3">Formule</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-700/50">
                  {profiles.map((p) => (
                    <tr key={p.id} className="hover:bg-slate-700/30">
                      <td className="p-3 flex items-center gap-2">
                        <img
                          src={p.photoUrl}
                          alt={p.displayName}
                          className="w-8 h-8 rounded-lg object-cover"
                          referrerPolicy="no-referrer"
                        />
                        <span className="font-semibold text-white">{p.displayName}</span>
                      </td>
                      <td className="p-3">{p.age} ans · {p.gender}</td>
                      <td className="p-3">{p.city}, {p.country}</td>
                      <td className="p-3 truncate max-w-[150px]">{p.occupation}</td>
                      <td className="p-3">
                        {p.verification.identityVerified ? (
                          <span className="text-emerald-400 flex items-center gap-1">
                            <CheckCircle2 className="w-3.5 h-3.5" /> Vérifié
                          </span>
                        ) : (
                          <span className="text-slate-400">Non certifié</span>
                        )}
                      </td>
                      <td className="p-3">
                        {p.wali.enabled ? (
                          <span className="text-emerald-300">Actif ({p.wali.relationship})</span>
                        ) : (
                          <span className="text-slate-500">—</span>
                        )}
                      </td>
                      <td className="p-3">
                        {p.isPremium ? (
                          <span className="text-[#D4AF37] font-semibold">Premium</span>
                        ) : (
                          <span className="text-slate-400">Gratuit</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Tab 2: Reports Queue */}
        {activeTab === 'reports' && (
          <div className="bg-slate-800/60 rounded-3xl border border-slate-700/80 p-6 space-y-4">
            <h3 className="font-semibold text-base text-white flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-rose-400" />
              <span>File de modération des signalements ({reports.length})</span>
            </h3>

            {reports.length > 0 ? (
              <div className="space-y-3">
                {reports.map((rep) => {
                  const reportedProfile = StorageService.getProfileById(rep.reportedProfileId);
                  return (
                    <div
                      key={rep.id}
                      className="p-4 rounded-2xl bg-slate-900/60 border border-slate-700 flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-rose-400 text-xs">
                            Motif : {rep.reason}
                          </span>
                          <span className="text-[10px] text-slate-500">
                            {new Date(rep.createdAt).toLocaleString()}
                          </span>
                        </div>
                        <p className="text-xs text-slate-300">
                          Profil mis en cause : <strong>{reportedProfile?.displayName || rep.reportedProfileId}</strong> ({reportedProfile?.city || 'Inconnu'})
                        </p>
                        <p className="text-xs text-slate-400 italic">
                          Détails : « {rep.description || 'Aucun commentaire supplémentaire'} »
                        </p>
                        <span className="text-[10px] text-slate-500 uppercase tracking-wider block">
                          Statut : {rep.status}
                        </span>
                      </div>

                      {rep.status === 'pending' && (
                        <div className="flex items-center gap-2 shrink-0">
                          <button
                            onClick={() => handleReportAction(rep.id, 'ban')}
                            className="px-3 py-1.5 bg-rose-600 hover:bg-rose-700 text-white text-xs font-semibold rounded-lg transition-colors flex items-center gap-1"
                          >
                            <UserX className="w-3.5 h-3.5" />
                            <span>Bannir le compte</span>
                          </button>

                          <button
                            onClick={() => handleReportAction(rep.id, 'warn')}
                            className="px-3 py-1.5 bg-amber-600 hover:bg-amber-700 text-white text-xs font-semibold rounded-lg transition-colors"
                          >
                            Avertir
                          </button>

                          <button
                            onClick={() => handleReportAction(rep.id, 'dismiss')}
                            className="px-3 py-1.5 bg-slate-700 hover:bg-slate-600 text-slate-300 text-xs font-semibold rounded-lg transition-colors"
                          >
                            Classer sans suite
                          </button>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="p-8 text-center text-xs text-slate-400">
                Aucun signalement en attente. La communauté respecte les règles de bienveillance.
              </div>
            )}
          </div>
        )}

        {/* Tab 3: Verification requests */}
        {activeTab === 'verifications' && (
          <div className="bg-slate-800/60 rounded-3xl border border-slate-700/80 p-6 space-y-4">
            <h3 className="font-semibold text-base text-white flex items-center gap-2">
              <FileCheck className="w-4 h-4 text-emerald-400" />
              <span>Demandes de validation de pièces officielles ({verifications.length})</span>
            </h3>

            {verifications.length > 0 ? (
              <div className="space-y-3">
                {verifications.map((v) => {
                  const prof = StorageService.getProfileById(v.profileId);
                  return (
                    <div
                      key={v.id}
                      className="p-4 rounded-2xl bg-slate-900/60 border border-slate-700 flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
                    >
                      <div>
                        <span className="font-bold text-white text-xs block">
                          Candidat : {prof?.displayName || v.profileId} ({prof?.age} ans, {prof?.city})
                        </span>
                        <div className="text-xs text-slate-400 mt-1">
                          Document soumis : {v.documentType} · Numéro masqué : {v.documentNumberMasked}
                        </div>
                        <span className="text-[10px] text-slate-500">
                          Reçu le {new Date(v.submittedAt).toLocaleString()} · Statut : {v.status}
                        </span>
                      </div>

                      {v.status === 'pending' && (
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleApproveVerif(v.id)}
                            className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold rounded-xl flex items-center gap-1.5"
                          >
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            <span>Approuver & Attribuer le badge</span>
                          </button>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="p-8 text-center text-xs text-slate-400">
                Aucune demande d'identité en attente de validation.
              </div>
            )}
          </div>
        )}

        {/* Tab 4: Audit Logs */}
        {activeTab === 'audit' && (
          <div className="bg-slate-800/60 rounded-3xl border border-slate-700/80 p-6 space-y-4">
            <h3 className="font-semibold text-base text-white flex items-center gap-2">
              <Clock className="w-4 h-4 text-slate-400" />
              <span>Journal d'audit de sécurité et de modération</span>
            </h3>

            <div className="divide-y divide-slate-700/50">
              {auditLogs.map((log: any) => (
                <div key={log.id} className="py-2.5 flex items-center justify-between text-xs">
                  <span className="text-slate-300">{log.action}</span>
                  <span className="text-[10px] text-slate-500 font-mono">
                    {new Date(log.timestamp).toLocaleTimeString()}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
