import React, { useState } from 'react';
import { 
  UserPlus, 
  Shield, 
  Mail, 
  Trash2, 
  Clock, 
  CheckCircle, 
  X, 
  MoreVertical, 
  Briefcase, 
  Lock, 
  Search, 
  Filter,
  Users
} from 'lucide-react';
import { LanguageStrings, TeamMember, Case, Role } from '../types';

interface TeamProps {
  strings: LanguageStrings;
  cases: Case[];
  isProPlan: boolean;
  setIsProPlan: (isPro: boolean) => void;
}

// Mock Data
const MOCK_MEMBERS: TeamMember[] = [
  {
    id: 'm1',
    name: 'Adv. Rajesh Kumar',
    email: 'rajesh.k@lawfirm.com',
    role: 'Admin',
    status: 'Active',
    accessLevel: 'All',
    assignedCases: [],
    joinedDate: '2023-01-15',
    avatar: 'R'
  },
  {
    id: 'm2',
    name: 'Priya Singh',
    email: 'priya.s@lawfirm.com',
    role: 'Associate',
    status: 'Active',
    accessLevel: 'Assigned',
    assignedCases: ['1', '2'],
    joinedDate: '2023-06-20',
    avatar: 'P'
  },
  {
    id: 'm3',
    name: 'Vikram Malhotra',
    email: 'vikram.m@lawfirm.com',
    role: 'Paralegal',
    status: 'Pending',
    accessLevel: 'Assigned',
    assignedCases: ['1'],
    joinedDate: '2023-10-14'
  }
];

const ROLES: Role[] = ['Admin', 'Partner', 'Associate', 'Paralegal', 'Client-viewer'];

export const Team: React.FC<TeamProps> = ({ strings, cases, isProPlan, setIsProPlan }) => {
  const [members, setMembers] = useState<TeamMember[]>(MOCK_MEMBERS);
  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);
  const [isAccessModalOpen, setIsAccessModalOpen] = useState(false);
  const [showUpsell, setShowUpsell] = useState(false);
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);

  // Invite Form State
  const [inviteEmail, setInviteEmail] = useState('');
  const [inviteRole, setInviteRole] = useState<Role>('Associate');
  const [inviteAccess, setInviteAccess] = useState<'All' | 'Assigned'>('Assigned');
  const [inviteCases, setInviteCases] = useState<Set<string>>(new Set());

  const seatsLimit = isProPlan ? 5 : 1;
  const seatsUsed = members.length;
  const seatsPercentage = (seatsUsed / seatsLimit) * 100;

  const handleInviteClick = () => {
    if (seatsUsed >= seatsLimit) {
      setShowUpsell(true);
      return;
    }
    setInviteEmail('');
    setInviteRole('Associate');
    setInviteAccess('Assigned');
    setInviteCases(new Set());
    setIsInviteModalOpen(true);
  };

  const handleSendInvite = (e: React.FormEvent) => {
    e.preventDefault();
    const newMember: TeamMember = {
      id: Math.random().toString(),
      name: inviteEmail.split('@')[0], // Mock name
      email: inviteEmail,
      role: inviteRole,
      status: 'Pending',
      accessLevel: inviteAccess,
      assignedCases: Array.from(inviteCases),
      joinedDate: new Date().toISOString().split('T')[0]
    };
    setMembers([...members, newMember]);
    setIsInviteModalOpen(false);
  };

  const handleResendInvite = (member: TeamMember) => {
    alert(`Invite resent to ${member.email}`);
  };

  const handleCancelInvite = (id: string) => {
    if (window.confirm("Are you sure you want to cancel this invite?")) {
      setMembers(members.filter(m => m.id !== id));
    }
  };

  const openAccessModal = (member: TeamMember) => {
    setSelectedMember(member);
    setInviteCases(new Set(member.assignedCases));
    setIsAccessModalOpen(true);
  };

  const saveAccessSettings = () => {
    if (selectedMember) {
      const updatedMembers = members.map(m => 
        m.id === selectedMember.id 
          ? { ...m, assignedCases: Array.from(inviteCases) } 
          : m
      );
      setMembers(updatedMembers);
      setIsAccessModalOpen(false);
    }
  };

  const toggleCaseSelection = (caseId: string) => {
    const newSet = new Set(inviteCases);
    if (newSet.has(caseId)) newSet.delete(caseId);
    else newSet.add(caseId);
    setInviteCases(newSet);
  };

  return (
    <div className="p-6 md:p-8 h-full flex flex-col relative">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
            <Users className="text-blue-600" />
            {strings.team}
          </h1>
          <p className="text-slate-500">Manage your firm's staff, roles, and case access.</p>
        </div>
        <button 
          onClick={handleInviteClick}
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl font-medium flex items-center gap-2 shadow-lg shadow-blue-200 transition-all"
        >
          <UserPlus size={20} />
          {strings.inviteMember}
        </button>
      </div>

      {/* Seats Usage Banner */}
      <div className="mb-8 bg-white p-6 rounded-2xl shadow-sm border border-slate-200 flex flex-col md:flex-row items-center gap-6">
         <div className="flex-1 w-full">
            <div className="flex justify-between items-center mb-2">
               <span className="font-semibold text-slate-700">{strings.seatsUsed}</span>
               <span className={`text-sm font-bold ${seatsPercentage >= 80 ? 'text-amber-600' : 'text-slate-600'}`}>
                 {seatsUsed} / {seatsLimit}
               </span>
            </div>
            <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden">
               <div 
                 className={`h-full rounded-full transition-all duration-1000 ${seatsPercentage >= 100 ? 'bg-red-500' : seatsPercentage >= 80 ? 'bg-amber-500' : 'bg-blue-500'}`}
                 style={{ width: `${seatsPercentage}%` }}
               ></div>
            </div>
         </div>
         <div className="flex items-center gap-4 w-full md:w-auto">
            {seatsPercentage >= 80 && (
               <div className="text-xs text-amber-600 bg-amber-50 px-3 py-1.5 rounded-lg border border-amber-100 font-medium">
                  Running low on seats!
               </div>
            )}
            {!isProPlan && (
               <button 
                 onClick={() => setShowUpsell(true)}
                 className="whitespace-nowrap px-4 py-2 bg-slate-900 text-white rounded-lg text-sm font-bold hover:bg-slate-800 transition-colors flex items-center gap-2"
               >
                  <Lock size={14} className="text-amber-400" /> Unlock More Seats
               </button>
            )}
            {isProPlan && seatsPercentage >= 100 && (
               <button 
                 onClick={() => setShowUpsell(true)}
                 className="whitespace-nowrap px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-bold hover:bg-blue-700 transition-colors"
               >
                  Add Seats
               </button>
            )}
         </div>
      </div>

      {/* Members List */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 flex-1 overflow-hidden flex flex-col">
         {/* Table Header */}
         <div className="grid grid-cols-12 gap-4 px-6 py-4 bg-slate-50 border-b border-slate-200 text-xs font-semibold text-slate-500 uppercase tracking-wider">
            <div className="col-span-4">{strings.teamMembers}</div>
            <div className="col-span-2">{strings.role}</div>
            <div className="col-span-2">Status</div>
            <div className="col-span-3">{strings.accessLevel}</div>
            <div className="col-span-1 text-right">Action</div>
         </div>

         {/* Table Body */}
         <div className="overflow-y-auto flex-1">
            {members.map(member => (
               <div key={member.id} className="grid grid-cols-12 gap-4 px-6 py-4 border-b border-slate-50 items-center hover:bg-slate-50/50 transition-colors group">
                  
                  {/* Member Info */}
                  <div className="col-span-4 flex items-center gap-3">
                     <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold text-white shadow-sm
                        ${member.status === 'Active' ? 'bg-gradient-to-br from-indigo-500 to-purple-600' : 'bg-slate-300'}`}
                     >
                        {member.avatar || member.name.charAt(0)}
                     </div>
                     <div>
                        <h3 className="font-semibold text-slate-800 text-sm">{member.name}</h3>
                        <p className="text-xs text-slate-500">{member.email}</p>
                     </div>
                  </div>

                  {/* Role */}
                  <div className="col-span-2">
                     <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border
                        ${member.role === 'Admin' ? 'bg-purple-50 text-purple-700 border-purple-100' :
                          member.role === 'Partner' ? 'bg-blue-50 text-blue-700 border-blue-100' :
                          'bg-slate-100 text-slate-600 border-slate-200'}`}
                     >
                        <Shield size={12} />
                        {member.role}
                     </span>
                  </div>

                  {/* Status */}
                  <div className="col-span-2">
                     {member.status === 'Active' ? (
                        <span className="inline-flex items-center gap-1 text-xs font-bold text-green-600 bg-green-50 px-2 py-1 rounded-md">
                           <CheckCircle size={12} /> Active
                        </span>
                     ) : (
                        <div className="flex flex-col items-start gap-1">
                           <span className="inline-flex items-center gap-1 text-xs font-bold text-amber-600 bg-amber-50 px-2 py-1 rounded-md">
                              <Clock size={12} /> Pending
                           </span>
                           <button 
                             onClick={() => handleResendInvite(member)}
                             className="text-[10px] text-blue-600 hover:underline font-medium"
                           >
                             {strings.resendInvite}
                           </button>
                        </div>
                     )}
                  </div>

                  {/* Access Level */}
                  <div className="col-span-3">
                     <div className="flex items-center gap-2">
                        <span className="text-sm text-slate-700">
                           {member.accessLevel === 'All' ? strings.viewAllCases : `${member.assignedCases.length} Assigned Cases`}
                        </span>
                        {member.accessLevel === 'Assigned' && (
                           <button 
                             onClick={() => openAccessModal(member)}
                             className="text-xs text-blue-600 font-medium hover:bg-blue-50 px-2 py-1 rounded transition-colors opacity-0 group-hover:opacity-100"
                           >
                              Edit
                           </button>
                        )}
                     </div>
                  </div>

                  {/* Actions */}
                  <div className="col-span-1 text-right relative">
                     {member.status === 'Pending' ? (
                        <button 
                           onClick={() => handleCancelInvite(member.id)}
                           className="text-red-400 hover:text-red-600 p-2 hover:bg-red-50 rounded-lg transition-colors"
                           title={strings.cancelInvite}
                        >
                           <X size={18} />
                        </button>
                     ) : member.role !== 'Admin' ? (
                        <button className="text-slate-400 hover:text-slate-600 p-2 hover:bg-slate-100 rounded-lg transition-colors">
                           <MoreVertical size={18} />
                        </button>
                     ) : (
                        <span className="text-xs text-slate-300 italic">Owner</span>
                     )}
                  </div>
               </div>
            ))}
         </div>
      </div>

      {/* Invite Member Modal */}
      {isInviteModalOpen && (
         <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in">
            <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full overflow-hidden flex flex-col max-h-[90vh]">
               <div className="p-5 border-b border-slate-100 flex justify-between items-center bg-slate-50">
                  <h2 className="text-xl font-bold text-slate-800">{strings.inviteMember}</h2>
                  <button onClick={() => setIsInviteModalOpen(false)} className="text-slate-400 hover:text-slate-700 p-1 hover:bg-slate-200 rounded-full">
                     <X size={20} />
                  </button>
               </div>
               
               <form onSubmit={handleSendInvite} className="p-6 space-y-6">
                  <div>
                     <label className="block text-sm font-medium text-slate-700 mb-1">Email Address</label>
                     <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                        <input 
                           type="email" 
                           required
                           value={inviteEmail}
                           onChange={e => setInviteEmail(e.target.value)}
                           className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-100 focus:border-blue-500 outline-none"
                           placeholder="colleague@lawfirm.com"
                        />
                     </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                     <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">{strings.role}</label>
                        <select 
                           value={inviteRole}
                           onChange={e => setInviteRole(e.target.value as Role)}
                           className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-100 focus:border-blue-500 outline-none"
                        >
                           {ROLES.map(role => <option key={role} value={role}>{role}</option>)}
                        </select>
                     </div>
                     <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">{strings.accessLevel}</label>
                        <select 
                           value={inviteAccess}
                           onChange={e => setInviteAccess(e.target.value as any)}
                           className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-100 focus:border-blue-500 outline-none"
                        >
                           <option value="All">{strings.viewAllCases}</option>
                           <option value="Assigned">{strings.assignedCasesOnly}</option>
                        </select>
                     </div>
                  </div>

                  {/* Case Selection (if Assigned) */}
                  {inviteAccess === 'Assigned' && (
                     <div className="border border-slate-200 rounded-xl p-4 bg-slate-50">
                        <label className="block text-xs font-bold text-slate-500 uppercase mb-3">Select Cases to Assign</label>
                        <div className="max-h-40 overflow-y-auto space-y-2 pr-2">
                           {cases.map(c => (
                              <label key={c.id} className="flex items-center gap-3 p-2 bg-white border border-slate-100 rounded-lg cursor-pointer hover:border-blue-300 transition-colors">
                                 <input 
                                    type="checkbox"
                                    checked={inviteCases.has(c.id)}
                                    onChange={() => toggleCaseSelection(c.id)}
                                    className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                                 />
                                 <span className="text-sm text-slate-700 truncate">{c.title}</span>
                              </label>
                           ))}
                        </div>
                     </div>
                  )}

                  <div className="pt-2 flex justify-end gap-3">
                     <button type="button" onClick={() => setIsInviteModalOpen(false)} className="px-5 py-2.5 text-slate-600 font-medium hover:bg-slate-50 rounded-xl transition-colors">
                        Cancel
                     </button>
                     <button type="submit" className="px-6 py-2.5 bg-blue-600 text-white font-medium rounded-xl hover:bg-blue-700 shadow-lg shadow-blue-200 transition-all">
                        Send Invite
                     </button>
                  </div>
               </form>
            </div>
         </div>
      )}

      {/* Access Assignment Modal */}
      {isAccessModalOpen && selectedMember && (
         <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in">
            <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full overflow-hidden flex flex-col max-h-[90vh]">
               <div className="p-5 border-b border-slate-100 flex justify-between items-center bg-slate-50">
                  <div>
                     <h2 className="text-xl font-bold text-slate-800">{strings.assignCases}</h2>
                     <p className="text-sm text-slate-500">For {selectedMember.name}</p>
                  </div>
                  <button onClick={() => setIsAccessModalOpen(false)} className="text-slate-400 hover:text-slate-700 p-1 hover:bg-slate-200 rounded-full">
                     <X size={20} />
                  </button>
               </div>
               
               <div className="p-6 flex-1 overflow-y-auto">
                   {/* Search */}
                   <div className="relative mb-4">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                      <input 
                         type="text" 
                         placeholder="Search cases..."
                         className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-blue-400"
                      />
                   </div>

                   {/* Case List */}
                   <div className="space-y-2">
                       {cases.map(c => (
                          <label key={c.id} className="flex items-center gap-3 p-3 bg-white border border-slate-200 rounded-xl cursor-pointer hover:border-blue-400 hover:bg-blue-50 transition-all">
                             <div className="relative flex items-center">
                                <input 
                                   type="checkbox"
                                   checked={inviteCases.has(c.id)}
                                   onChange={() => toggleCaseSelection(c.id)}
                                   className="w-5 h-5 text-blue-600 border-slate-300 rounded focus:ring-blue-500"
                                />
                             </div>
                             <div className="flex-1 min-w-0">
                                <h4 className="text-sm font-semibold text-slate-800 truncate">{c.title}</h4>
                                <p className="text-xs text-slate-500">{c.cnrNumber} • {c.court}</p>
                             </div>
                             {inviteCases.has(c.id) && <CheckCircle size={18} className="text-blue-600" />}
                          </label>
                       ))}
                   </div>
               </div>

               <div className="p-4 border-t border-slate-100 bg-slate-50 flex justify-between items-center">
                  <span className="text-sm text-slate-500 font-medium">{inviteCases.size} cases selected</span>
                  <div className="flex gap-3">
                     <button onClick={() => setIsAccessModalOpen(false)} className="px-4 py-2 text-slate-600 font-medium hover:bg-slate-200 rounded-lg transition-colors">
                        Cancel
                     </button>
                     <button onClick={saveAccessSettings} className="px-5 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 shadow-md transition-all">
                        Save Access
                     </button>
                  </div>
               </div>
            </div>
         </div>
      )}

      {/* Upgrade / Seats Modal */}
      {showUpsell && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60] flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-white rounded-2xl shadow-2xl max-w-sm w-full overflow-hidden text-center p-8">
             <div className="w-16 h-16 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-6 text-white shadow-lg shadow-amber-200">
                <Lock size={32} />
             </div>
             <h2 className="text-2xl font-bold text-slate-800 mb-2">{isProPlan ? "Add More Seats" : "Upgrade Team Size"}</h2>
             <p className="text-slate-500 mb-8">
               {isProPlan 
                  ? "You have reached the limit of 5 seats on your current plan. Contact sales to add more."
                  : "Invite up to 5 team members and assign cases with granular permissions on the Pro plan."
               }
             </p>
             <button 
               onClick={() => {
                 if (!isProPlan) setIsProPlan(true); 
                 setShowUpsell(false);
               }} 
               className="w-full py-3 bg-slate-900 text-white rounded-xl font-bold hover:bg-slate-800 transition-all"
             >
               {isProPlan ? "Contact Sales" : "Upgrade to Pro"}
             </button>
             <button onClick={() => setShowUpsell(false)} className="mt-4 text-sm text-slate-500 hover:text-slate-800">
               Cancel
             </button>
          </div>
        </div>
      )}
    </div>
  );
};