import React, { useState } from 'react';
import { 
  User, 
  MapPin, 
  Lock, 
  Bell, 
  Globe, 
  CreditCard, 
  Shield, 
  Trash2, 
  Download, 
  CheckCircle, 
  AlertTriangle, 
  X,
  Plus,
  Save,
  QrCode,
  Smartphone,
  Mail,
  Zap,
  Check
} from 'lucide-react';
import { LanguageStrings } from '../types';

interface SettingsProps {
  strings: LanguageStrings;
  isProPlan: boolean;
  setIsProPlan: (isPro: boolean) => void;
  language: 'English' | 'Hindi';
  setLanguage: React.Dispatch<React.SetStateAction<'English' | 'Hindi'>>;
}

export const Settings: React.FC<SettingsProps> = ({ 
  strings, 
  isProPlan, 
  setIsProPlan, 
  language, 
  setLanguage 
}) => {
  const [activeSection, setActiveSection] = useState('profile');
  const [showUpsell, setShowUpsell] = useState(false);
  const [is2FAModalOpen, setIs2FAModalOpen] = useState(false);
  const [isBackupCodesOpen, setIsBackupCodesOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deleteConfirmation, setDeleteConfirmation] = useState('');

  // Profile State
  const [profile, setProfile] = useState({
    name: 'Adv. Rajesh Kumar',
    email: 'rajesh.k@lawfirm.com',
  });

  // Courts State
  const [jurisdictions, setJurisdictions] = useState([
    'High Court of Delhi',
    'Saket District Court',
    'Patiala House Court'
  ]);
  const [newCourt, setNewCourt] = useState('');
  const [defaultCourt, setDefaultCourt] = useState('High Court of Delhi');

  // Security State
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);

  // Notifications State
  const [notifications, setNotifications] = useState({
    email: true,
    sms: false,
    whatsapp: false,
    push: true
  });

  // Language State
  const [localizeEmails, setLocalizeEmails] = useState(true);

  const handleSaveProfile = () => {
    alert("Profile saved successfully!");
  };

  const handleAddCourt = () => {
    if (newCourt.trim()) {
      setJurisdictions([...jurisdictions, newCourt.trim()]);
      setNewCourt('');
    }
  };

  const handleRemoveCourt = (court: string) => {
    setJurisdictions(jurisdictions.filter(c => c !== court));
    if (defaultCourt === court) setDefaultCourt(jurisdictions[0] || '');
  };

  const toggle2FA = () => {
    if (twoFactorEnabled) {
      if (window.confirm("Are you sure you want to disable 2FA?")) {
        setTwoFactorEnabled(false);
      }
    } else {
      setIs2FAModalOpen(true);
    }
  };

  const confirm2FA = () => {
    setIs2FAModalOpen(false);
    setIsBackupCodesOpen(true);
    setTwoFactorEnabled(true);
  };

  const handleProToggle = (key: keyof typeof notifications) => {
    if (!isProPlan && (key === 'sms' || key === 'whatsapp')) {
      setShowUpsell(true);
      return;
    }
    setNotifications({ ...notifications, [key]: !notifications[key] });
  };

  const handleDeleteAccount = () => {
    if (deleteConfirmation === 'DELETE') {
      alert("Account deletion scheduled. You will be logged out.");
      setIsDeleteModalOpen(false);
    }
  };

  return (
    <div className="p-6 md:p-8 max-w-7xl mx-auto h-full flex flex-col md:flex-row gap-8 animate-fade-in relative">
      
      {/* Sidebar Navigation */}
      <div className="w-full md:w-64 flex-shrink-0 space-y-2">
         <h2 className="text-2xl font-bold text-slate-800 mb-6 px-2">{strings.settings}</h2>
         <NavButton id="profile" icon={User} label={strings.settingsProfile} active={activeSection} setActive={setActiveSection} />
         <NavButton id="courts" icon={MapPin} label={strings.settingsCourts} active={activeSection} setActive={setActiveSection} />
         <NavButton id="security" icon={Shield} label={strings.settingsSecurity} active={activeSection} setActive={setActiveSection} />
         <NavButton id="notifications" icon={Bell} label={strings.settingsNotifications} active={activeSection} setActive={setActiveSection} />
         <NavButton id="language" icon={Globe} label={strings.settingsLanguage} active={activeSection} setActive={setActiveSection} />
         <NavButton id="data" icon={Download} label={strings.settingsPrivacy} active={activeSection} setActive={setActiveSection} />
         
         <div className="pt-6 mt-6 border-t border-slate-200">
           <div className={`p-4 rounded-xl border ${isProPlan ? 'bg-gradient-to-br from-blue-600 to-indigo-700 text-white border-transparent' : 'bg-slate-50 border-slate-200'}`}>
              <div className="flex items-center gap-2 mb-2">
                 {isProPlan ? <Zap size={18} className="text-yellow-300" /> : <CreditCard size={18} className="text-slate-500" />}
                 <span className={`font-bold text-sm ${isProPlan ? 'text-white' : 'text-slate-700'}`}>
                    {isProPlan ? strings.planPro : strings.planBasic}
                 </span>
              </div>
              {!isProPlan && (
                 <button 
                   onClick={() => setIsProPlan(true)}
                   className="w-full py-2 bg-slate-900 text-white text-xs font-bold rounded-lg hover:bg-slate-800 transition-colors"
                 >
                    Upgrade
                 </button>
              )}
           </div>
         </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 space-y-6 max-w-3xl">
         
         {/* PROFILE SECTION */}
         {activeSection === 'profile' && (
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 md:p-8 animate-fade-in">
               <h3 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2">
                  <User size={20} className="text-blue-600" /> {strings.settingsProfile}
               </h3>
               
               <div className="flex items-center gap-6 mb-8">
                  <div className="w-20 h-20 rounded-full bg-slate-200 flex items-center justify-center text-2xl font-bold text-slate-500 relative group cursor-pointer">
                     {profile.name.charAt(0)}
                     <div className="absolute inset-0 bg-black/40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <span className="text-white text-xs font-medium">Edit</span>
                     </div>
                  </div>
                  <div>
                     <button className="text-sm font-medium text-blue-600 hover:underline mb-1">Upload New Picture</button>
                     <p className="text-xs text-slate-500">JPG, GIF or PNG. Max size of 800K</p>
                  </div>
               </div>

               <div className="space-y-4 max-w-md">
                  <div>
                     <label className="block text-sm font-medium text-slate-700 mb-1">{strings.fullName}</label>
                     <input 
                       type="text" 
                       value={profile.name}
                       onChange={(e) => setProfile({...profile, name: e.target.value})}
                       className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-100 focus:border-blue-500 outline-none"
                     />
                  </div>
                  <div>
                     <label className="block text-sm font-medium text-slate-700 mb-1">{strings.emailLabel}</label>
                     <input 
                       type="email" 
                       value={profile.email}
                       onChange={(e) => setProfile({...profile, email: e.target.value})}
                       className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-100 focus:border-blue-500 outline-none"
                     />
                  </div>
                  <div className="pt-4">
                     <button 
                       onClick={handleSaveProfile}
                       className="px-6 py-2.5 bg-blue-600 text-white font-medium rounded-xl hover:bg-blue-700 transition-colors flex items-center gap-2 shadow-sm"
                     >
                        <Save size={18} /> {strings.saveChanges}
                     </button>
                  </div>
               </div>
            </div>
         )}

         {/* COURTS SECTION */}
         {activeSection === 'courts' && (
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 md:p-8 animate-fade-in">
               <h3 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2">
                  <MapPin size={20} className="text-red-500" /> {strings.settingsCourts}
               </h3>
               
               <div className="mb-8">
                  <label className="block text-sm font-medium text-slate-700 mb-2">{strings.defaultCourt}</label>
                  <select 
                    value={defaultCourt}
                    onChange={(e) => setDefaultCourt(e.target.value)}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-100 focus:border-blue-500 outline-none"
                  >
                     {jurisdictions.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                  <p className="text-xs text-slate-500 mt-2">This court will be pre-selected when you create new cases.</p>
               </div>

               <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">{strings.myJurisdictions}</label>
                  <div className="flex gap-2 mb-4">
                     <input 
                       type="text" 
                       value={newCourt}
                       onChange={(e) => setNewCourt(e.target.value)}
                       placeholder={strings.addCourtPlaceholder}
                       className="flex-1 p-2.5 bg-white border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-100 focus:border-blue-500 outline-none"
                     />
                     <button 
                       onClick={handleAddCourt}
                       className="px-4 py-2 bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition-colors"
                     >
                        <Plus size={20} />
                     </button>
                  </div>

                  <div className="space-y-2">
                     {jurisdictions.map((court) => (
                        <div key={court} className="flex items-center justify-between p-3 bg-slate-50 border border-slate-100 rounded-lg group hover:border-blue-200 transition-colors">
                           <span className="text-sm font-medium text-slate-700">{court}</span>
                           <button 
                             onClick={() => handleRemoveCourt(court)}
                             className="text-slate-400 hover:text-red-500 p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                           >
                              <X size={16} />
                           </button>
                        </div>
                     ))}
                  </div>
               </div>
            </div>
         )}

         {/* SECURITY SECTION */}
         {activeSection === 'security' && (
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 md:p-8 animate-fade-in space-y-8">
               
               {/* Password Reset */}
               <div>
                  <h3 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2">
                     <Lock size={20} className="text-emerald-600" /> {strings.changePassword}
                  </h3>
                  <div className="grid md:grid-cols-2 gap-4 max-w-lg">
                     <div className="col-span-2">
                        <label className="block text-sm font-medium text-slate-700 mb-1">{strings.currentPassword}</label>
                        <input type="password" className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg outline-none" />
                     </div>
                     <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">{strings.newPassword}</label>
                        <input type="password" className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg outline-none" />
                     </div>
                     <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">{strings.confirmPasswordLabel}</label>
                        <input type="password" className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg outline-none" />
                     </div>
                     <div className="col-span-2 pt-2">
                        <button className="px-5 py-2 bg-white border border-slate-300 text-slate-700 font-medium rounded-lg hover:bg-slate-50 transition-colors text-sm">
                           Update Password
                        </button>
                     </div>
                  </div>
               </div>

               <div className="h-px bg-slate-100 w-full"></div>

               {/* 2FA */}
               <div>
                  <div className="flex justify-between items-start mb-4">
                     <div>
                        <h4 className="font-bold text-slate-800 mb-1">Two-Factor Authentication</h4>
                        <p className="text-sm text-slate-500 max-w-sm">{strings.twoFactorDesc}</p>
                     </div>
                     <button 
                        onClick={toggle2FA}
                        className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${
                           twoFactorEnabled 
                              ? 'bg-red-50 text-red-600 hover:bg-red-100' 
                              : 'bg-emerald-600 text-white hover:bg-emerald-700'
                        }`}
                     >
                        {twoFactorEnabled ? strings.disable2FA : strings.enable2FA}
                     </button>
                  </div>
                  
                  {twoFactorEnabled && (
                     <div className="bg-emerald-50 border border-emerald-100 rounded-xl p-4 flex items-center gap-3 text-sm text-emerald-800">
                        <CheckCircle size={18} className="text-emerald-600" />
                        2FA is currently active on your account.
                     </div>
                  )}

                  <div className="mt-4 p-4 border border-slate-200 rounded-xl bg-slate-50 opacity-60">
                     <div className="flex justify-between items-center">
                        <div>
                           <div className="flex items-center gap-2 font-medium text-slate-700 mb-1">
                              <Shield size={16} /> Enforce 2FA for Organization
                              <span className="text-[10px] bg-slate-900 text-white px-1.5 py-0.5 rounded font-bold">PRO</span>
                           </div>
                           <p className="text-xs text-slate-500">Require all team members to use 2FA.</p>
                        </div>
                        <Lock size={18} className="text-slate-400" />
                     </div>
                  </div>
               </div>
            </div>
         )}

         {/* NOTIFICATIONS SECTION */}
         {activeSection === 'notifications' && (
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 md:p-8 animate-fade-in">
               <h3 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2">
                  <Bell size={20} className="text-amber-500" /> {strings.settingsNotifications}
               </h3>
               
               <div className="space-y-6">
                  {/* Email */}
                  <div className="flex items-center justify-between">
                     <div className="flex items-center gap-3">
                        <div className="p-2 bg-blue-50 text-blue-600 rounded-lg"><Mail size={18} /></div>
                        <div>
                           <div className="font-medium text-slate-800">{strings.emailNotifications}</div>
                           <p className="text-xs text-slate-500">Daily summaries and critical alerts.</p>
                        </div>
                     </div>
                     <Toggle checked={notifications.email} onChange={() => handleProToggle('email')} />
                  </div>

                  {/* SMS (Pro) */}
                  <div className="flex items-center justify-between">
                     <div className="flex items-center gap-3">
                        <div className="p-2 bg-green-50 text-green-600 rounded-lg"><Smartphone size={18} /></div>
                        <div>
                           <div className="flex items-center gap-2">
                              <span className="font-medium text-slate-800">{strings.smsNotifications}</span>
                              <span className="text-[10px] bg-slate-900 text-white px-1.5 py-0.5 rounded font-bold">PRO</span>
                           </div>
                           <p className="text-xs text-slate-500">Instant alerts for hearing dates.</p>
                        </div>
                     </div>
                     <div onClick={() => !isProPlan && setShowUpsell(true)}>
                        <Toggle checked={notifications.sms} onChange={() => handleProToggle('sms')} disabled={!isProPlan} />
                     </div>
                  </div>

                  {/* WhatsApp (Pro) */}
                  <div className="flex items-center justify-between">
                     <div className="flex items-center gap-3">
                        <div className="p-2 bg-emerald-50 text-emerald-600 rounded-lg"><Smartphone size={18} /></div>
                        <div>
                           <div className="flex items-center gap-2">
                              <span className="font-medium text-slate-800">{strings.whatsappNotifications}</span>
                              <span className="text-[10px] bg-slate-900 text-white px-1.5 py-0.5 rounded font-bold">PRO</span>
                           </div>
                           <p className="text-xs text-slate-500">Send reminders directly to clients.</p>
                        </div>
                     </div>
                     <div onClick={() => !isProPlan && setShowUpsell(true)}>
                        <Toggle checked={notifications.whatsapp} onChange={() => handleProToggle('whatsapp')} disabled={!isProPlan} />
                     </div>
                  </div>
               </div>
            </div>
         )}

         {/* LANGUAGE SECTION */}
         {activeSection === 'language' && (
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 md:p-8 animate-fade-in">
               <h3 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2">
                  <Globe size={20} className="text-indigo-600" /> {strings.settingsLanguage}
               </h3>
               
               <div className="space-y-6 max-w-md">
                  <div>
                     <label className="block text-sm font-medium text-slate-700 mb-2">{strings.appLanguage}</label>
                     <div className="grid grid-cols-2 gap-4">
                        <button 
                          onClick={() => setLanguage('English')}
                          className={`p-4 rounded-xl border flex items-center gap-3 transition-all ${language === 'English' ? 'border-blue-600 bg-blue-50 text-blue-700' : 'border-slate-200 hover:bg-slate-50'}`}
                        >
                           <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${language === 'English' ? 'border-blue-600' : 'border-slate-400'}`}>
                              {language === 'English' && <div className="w-2 h-2 rounded-full bg-blue-600"></div>}
                           </div>
                           <span className="font-medium">English</span>
                        </button>
                        <button 
                          onClick={() => setLanguage('Hindi')}
                          className={`p-4 rounded-xl border flex items-center gap-3 transition-all ${language === 'Hindi' ? 'border-blue-600 bg-blue-50 text-blue-700' : 'border-slate-200 hover:bg-slate-50'}`}
                        >
                           <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${language === 'Hindi' ? 'border-blue-600' : 'border-slate-400'}`}>
                              {language === 'Hindi' && <div className="w-2 h-2 rounded-full bg-blue-600"></div>}
                           </div>
                           <span className="font-medium">हिन्दी (Hindi)</span>
                        </button>
                     </div>
                  </div>

                  <div className="flex items-center gap-3 p-4 bg-slate-50 rounded-xl">
                     <input 
                        type="checkbox" 
                        checked={localizeEmails}
                        onChange={e => setLocalizeEmails(e.target.checked)}
                        className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500 cursor-pointer"
                     />
                     <label className="text-sm text-slate-700 cursor-pointer select-none">
                        {strings.localizeEmails}
                     </label>
                  </div>
               </div>
            </div>
         )}

         {/* DATA & PRIVACY SECTION */}
         {activeSection === 'data' && (
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 md:p-8 animate-fade-in">
               <h3 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2">
                  <Shield size={20} className="text-slate-600" /> {strings.settingsPrivacy}
               </h3>
               
               <div className="space-y-6">
                  <div className="flex items-center justify-between p-4 border border-slate-200 rounded-xl">
                     <div>
                        <div className="font-medium text-slate-800">{strings.downloadData}</div>
                        <p className="text-xs text-slate-500">Export all your cases, clients, and invoices.</p>
                     </div>
                     <button className="flex items-center gap-2 px-4 py-2 border border-slate-300 rounded-lg text-sm font-medium hover:bg-slate-50 transition-colors">
                        <Download size={16} /> JSON
                     </button>
                  </div>

                  <div className="flex items-center justify-between p-4 border border-red-100 bg-red-50/30 rounded-xl">
                     <div>
                        <div className="font-medium text-red-700">{strings.deleteAccount}</div>
                        <p className="text-xs text-red-500">{strings.deleteAccountWarning}</p>
                     </div>
                     <button 
                        onClick={() => setIsDeleteModalOpen(true)}
                        className="flex items-center gap-2 px-4 py-2 bg-white border border-red-200 text-red-600 rounded-lg text-sm font-medium hover:bg-red-50 transition-colors"
                     >
                        <Trash2 size={16} /> Delete
                     </button>
                  </div>
               </div>
            </div>
         )}
      </div>

      {/* 2FA Setup Modal */}
      {is2FAModalOpen && (
         <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in">
            <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden">
               <div className="p-6 border-b border-slate-100 flex justify-between items-center">
                  <h3 className="text-xl font-bold text-slate-800">{strings.setup2FA}</h3>
                  <button onClick={() => setIs2FAModalOpen(false)}><X size={20} className="text-slate-400" /></button>
               </div>
               <div className="p-8 text-center">
                  <div className="w-48 h-48 bg-slate-100 mx-auto mb-6 rounded-xl flex items-center justify-center border-2 border-slate-200">
                     <QrCode size={120} className="text-slate-800" />
                  </div>
                  <p className="text-sm text-slate-600 mb-6">
                     Scan this QR code with your authenticator app (Google Authenticator, Authy, etc.)
                  </p>
                  <div className="bg-slate-100 p-3 rounded-lg font-mono text-sm mb-6 select-all">
                     XK92-JKS2-92KS-L29S
                  </div>
                  <button 
                     onClick={confirm2FA}
                     className="w-full py-3 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-colors"
                  >
                     I've Scanned It
                  </button>
               </div>
            </div>
         </div>
      )}

      {/* Backup Codes Modal */}
      {isBackupCodesOpen && (
         <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in">
            <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden">
               <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-emerald-50">
                  <div className="flex items-center gap-2 text-emerald-800">
                     <CheckCircle size={20} />
                     <h3 className="text-lg font-bold">2FA Enabled Successfully</h3>
                  </div>
                  <button onClick={() => setIsBackupCodesOpen(false)}><X size={20} className="text-emerald-800/50" /></button>
               </div>
               <div className="p-6">
                  <p className="text-sm text-slate-600 mb-4">
                     Save these backup codes in a secure place. You can use them to access your account if you lose your device.
                  </p>
                  <div className="grid grid-cols-2 gap-3 mb-6">
                     {['8291-0291', '1920-9281', '9281-1029', '1029-3829'].map(code => (
                        <div key={code} className="bg-slate-100 p-2 text-center rounded font-mono text-sm text-slate-700">
                           {code}
                        </div>
                     ))}
                  </div>
                  <button 
                     onClick={() => setIsBackupCodesOpen(false)}
                     className="w-full py-3 bg-slate-900 text-white font-bold rounded-xl hover:bg-slate-800 transition-colors"
                  >
                     Done
                  </button>
               </div>
            </div>
         </div>
      )}

      {/* Delete Confirmation Modal */}
      {isDeleteModalOpen && (
         <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in">
            <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden">
               <div className="p-6 bg-red-50 border-b border-red-100 flex items-center gap-3">
                  <div className="p-2 bg-red-100 rounded-full text-red-600"><AlertTriangle size={24} /></div>
                  <h3 className="text-xl font-bold text-red-900">Delete Account?</h3>
               </div>
               <div className="p-6 space-y-4">
                  <p className="text-sm text-slate-600 leading-relaxed">
                     This action cannot be undone. All your cases, client data, and drafts will be <strong>permanently deleted</strong>.
                  </p>
                  <div>
                     <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Type "DELETE" to confirm</label>
                     <input 
                        type="text" 
                        value={deleteConfirmation}
                        onChange={(e) => setDeleteConfirmation(e.target.value)}
                        className="w-full p-3 border border-red-200 rounded-xl focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-100"
                        placeholder="DELETE"
                     />
                  </div>
                  <div className="flex gap-3 pt-2">
                     <button 
                        onClick={() => setIsDeleteModalOpen(false)}
                        className="flex-1 py-3 text-slate-600 font-medium hover:bg-slate-50 rounded-xl"
                     >
                        Cancel
                     </button>
                     <button 
                        onClick={handleDeleteAccount}
                        disabled={deleteConfirmation !== 'DELETE'}
                        className="flex-1 py-3 bg-red-600 text-white font-bold rounded-xl hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                     >
                        Confirm Delete
                     </button>
                  </div>
               </div>
            </div>
         </div>
      )}

      {/* Pro Upsell Modal */}
      {showUpsell && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60] flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-white rounded-2xl shadow-2xl max-w-sm w-full overflow-hidden text-center p-8">
             <div className="w-16 h-16 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-6 text-white shadow-lg shadow-amber-200">
                <Lock size={32} />
             </div>
             <h2 className="text-2xl font-bold text-slate-800 mb-2">Pro Feature</h2>
             <p className="text-slate-500 mb-8">
               SMS and WhatsApp notifications are premium features. Upgrade to automate your client reminders.
             </p>
             <button 
               onClick={() => {setIsProPlan(true); setShowUpsell(false);}}
               className="w-full py-3 bg-slate-900 text-white rounded-xl font-bold hover:bg-slate-800 transition-all"
             >
               Upgrade to Pro
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

// Helper Components
const NavButton = ({ id, icon: Icon, label, active, setActive }: any) => (
   <button 
      onClick={() => setActive(id)}
      className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium text-sm ${
         active === id 
            ? 'bg-blue-50 text-blue-700 shadow-sm' 
            : 'text-slate-500 hover:bg-slate-50 hover:text-slate-800'
      }`}
   >
      <Icon size={18} className={active === id ? 'text-blue-600' : 'text-slate-400'} />
      {label}
   </button>
);

const Toggle = ({ checked, onChange, disabled }: any) => (
   <div className={`relative inline-block w-11 h-6 transition duration-200 ease-in ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}>
      <input 
         type="checkbox" 
         checked={checked}
         onChange={onChange}
         disabled={disabled}
         className="absolute block w-5 h-5 rounded-full bg-white border-4 appearance-none translate-x-0.5 top-0.5 checked:translate-x-5 transition-transform duration-200"
         style={{ cursor: disabled ? 'not-allowed' : 'pointer' }}
      />
      <div 
         className={`block overflow-hidden h-6 rounded-full transition-colors ${checked ? 'bg-blue-600' : 'bg-slate-200'}`}
         onClick={!disabled ? onChange : undefined}
      ></div>
   </div>
);