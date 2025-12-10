export enum CaseStatus {
  OPEN = 'Open',
  CLOSED = 'Closed',
  STAYED = 'Stayed',
  PENDING = 'Pending'
}

export enum CourtType {
  SUPREME_COURT = 'Supreme Court',
  HIGH_COURT = 'High Court',
  DISTRICT_COURT = 'District Court',
  TRIBUNAL = 'Tribunal'
}

export type EventType = 'Hearing' | 'Filing' | 'Judgment' | 'Client Meeting' | 'Evidence';

export interface CalendarEvent {
  id: string;
  title: string;
  type: EventType;
  date: string; // ISO Date String YYYY-MM-DD
  startTime: string; // HH:mm
  endTime: string; // HH:mm
  caseId?: string; // Optional for meetings, required for Hearings
  caseTitle?: string;
  description?: string;
  attendees?: string;
  reminders: {
    email: boolean;
    whatsapp: boolean; // Pro
    sms: boolean; // Pro
    reminderTime: number; // minutes before
  };
}

export interface Client {
  id: string;
  name: string;
  phone: string;
  email: string;
  address: string;
  status: 'Active' | 'Inactive';
  totalCases: number;
  pendingAmount: number;
  lastContact: string;
}

export interface Case {
  id: string;
  title: string;
  cnrNumber: string;
  clientName: string;
  court: CourtType;
  judge: string;
  nextHearing: string; // ISO Date string
  status: CaseStatus;
  notes: string;
}

export interface Hearing {
  id: string;
  date: string;
  title: string;
  outcome: string;
  attendees: string;
}

export interface CaseNote {
  id: string;
  date: string;
  text: string;
  isVoiceNote: boolean;
}

export interface Invoice {
  id: string;
  clientId: string;
  clientName: string;
  amount: number;
  date: string;
  status: 'Paid' | 'Unpaid' | 'Overdue';
}

export interface SubscriptionInvoice {
  id: string;
  date: string;
  amount: number;
  plan: 'Basic' | 'Pro';
  status: 'Paid' | 'Failed';
  period: 'Monthly' | 'Yearly';
}

export interface Evidence {
  id: string;
  fileName: string;
  caseId: string;
  caseTitle: string;
  uploadDate: string;
  size: string;
  type: 'pdf' | 'img' | 'doc';
  tags?: string[];
  uploader?: string;
}

export type Role = 'Admin' | 'Partner' | 'Associate' | 'Paralegal' | 'Client-viewer';

export interface TeamMember {
  id: string;
  name: string;
  email: string;
  role: Role;
  status: 'Active' | 'Pending' | 'Expired';
  accessLevel: 'All' | 'Assigned';
  assignedCases: string[]; // List of Case IDs
  joinedDate: string;
  avatar?: string;
}

export type NotificationType = 'alert' | 'hearing' | 'billing' | 'system';

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: NotificationType;
  date: string;
  read: boolean;
  linkAction?: string; // e.g., 'case:1' or 'billing'
}

export interface LanguageStrings {
  // App Strings
  dashboard: string;
  cases: string;
  clients: string;
  calendar: string;
  aiDrafts: string;
  billing: string;
  settings: string;
  team: string;
  evidenceLocker: string; // New
  notifications: string; // New
  newCase: string;
  search: string;
  upcomingHearings: string;
  revenue: string;
  totalCases: string;
  activeClients: string;
  welcome: string;

  // Global Search & Nav
  quickAdd: string;
  searchResults: string;
  noResults: string;
  searchPlaceholder: string;

  // Dashboard Specific
  quickActions: string;
  addCase: string;
  addClient: string;
  uploadEvidence: string;
  pendingInvoices: string;
  evidenceSummary: string;
  storageUsed: string;
  aiSuggestions: string;
  upgradeToPro: string;
  viewAll: string;
  recentActivity: string;

  // Cases Page
  filterByCourt: string;
  filterByStatus: string;
  exportData: string;
  proFeature: string;
  showing: string;
  of: string;
  entries: string;
  next: string;
  previous: string;
  noCasesFound: string;

  // Clients Page
  totalDue: string;
  bulkActions: string;
  sendEmail: string;
  archive: string;
  delete: string;
  clientDetails: string;
  editClient: string;
  caseHistory: string;
  noClientsFound: string;
  active: string;
  inactive: string;

  // Calendar Page
  addEvent: string;
  monthView: string;
  weekView: string;
  today: string;
  eventType: string;
  reminders: string;
  linkedCase: string;
  saveEvent: string;
  eventDetails: string;

  // AI Drafts Page
  caseCategory: string;
  docPurpose: string;
  partiesInvolved: string;
  keyFacts: string;
  generateDraft: string;
  generatedDoc: string;
  copy: string;
  download: string;
  saveToCase: string;
  drafting: string;

  // Billing Page
  currentPlan: string;
  usageLimits: string;
  upgradeToProTitle: string;
  paymentHistory: string;
  monthly: string;
  yearly: string;
  savePercent: string;
  upgradeNow: string;
  manageSubscription: string;
  invoice: string;
  downloadReceipt: string;
  nextBillingDate: string;

  // Team Page
  inviteMember: string;
  teamMembers: string;
  role: string;
  accessLevel: string;
  seatsUsed: string;
  resendInvite: string;
  cancelInvite: string;
  assignCases: string;
  viewAllCases: string;
  assignedCasesOnly: string;
  permissionRequired: string;
  pendingAcceptance: string;

  // Evidence Locker
  filterByType: string;
  gridView: string;
  listView: string;
  storageQuota: string;
  uploadFile: string;

  // Notifications
  markAllRead: string;
  notificationPreferences: string;
  noNotifications: string;

  // Settings Page
  settingsProfile: string;
  settingsCourts: string;
  settingsSecurity: string;
  settingsNotifications: string;
  settingsLanguage: string;
  settingsBilling: string;
  settingsPrivacy: string;
  fullName: string;
  saveChanges: string;
  myJurisdictions: string;
  addCourtPlaceholder: string;
  defaultCourt: string;
  changePassword: string;
  currentPassword: string;
  newPassword: string;
  enable2FA: string;
  disable2FA: string;
  twoFactorDesc: string;
  setup2FA: string;
  emailNotifications: string;
  smsNotifications: string;
  whatsappNotifications: string;
  appLanguage: string;
  localizeEmails: string;
  downloadData: string;
  deleteAccount: string;
  deleteAccountWarning: string;

  // Case Detail
  backToCases: string;
  overview: string;
  hearings: string;
  evidence: string;
  notes: string;
  caseInfo: string;
  courtDetails: string;
  timeline: string;
  addHearing: string;
  voiceToText: string;
  saveNote: string;

  // Landing Page Strings
  heroTitle: string;
  heroSubtitle: string;
  startTrial: string;
  login: string;
  features: string;
  pricing: string;
  testimonials: string;
  featureCaseMgmt: string;
  featureAiDrafting: string;
  planBasic: string;
  planPro: string;

  // Login Page Strings
  loginTitle: string;
  loginSubtitle: string;
  emailLabel: string;
  passwordLabel: string;
  forgotPassword: string;
  signIn: string;
  orContinueWith: string;
  dontHaveAccount: string;
  signUp: string;

  // Signup Page Strings
  createAccount: string;
  fullNameLabel: string;
  confirmPasswordLabel: string;
  agreeTerms: string;
  alreadyHaveAccount: string;
  verifyEmailTitle: string;
  verifyEmailSubtitle: string;
  enterOtp: string;
  verifyBtn: string;
  resendCode: string;

  // Forgot Password Strings
  resetPasswordTitle: string;
  resetPasswordSubtitle: string;
  sendResetLink: string;
  backToLogin: string;
  resetEmailSentTitle: string;
  resetEmailSentSubtitle: string;
  openEmailApp: string;
  didntReceiveEmail: string;
}

export const ENGLISH_STRINGS: LanguageStrings = {
  dashboard: "Dashboard",
  cases: "Case Files",
  clients: "Clients",
  calendar: "Calendar",
  aiDrafts: "AI Drafter",
  billing: "Billing & Invoices",
  settings: "Settings",
  team: "Team Management",
  evidenceLocker: "Evidence Locker",
  notifications: "Notifications",
  newCase: "+ New Case",
  search: "Search cases, clients...",
  upcomingHearings: "Upcoming Hearings",
  revenue: "Total Revenue",
  totalCases: "Total Cases",
  activeClients: "Active Clients",
  welcome: "Welcome back, Advocate",
  
  // Global
  quickAdd: "Quick Add",
  searchResults: "Search Results",
  noResults: "No results found",
  searchPlaceholder: "Search cases, clients, files...",

  // Dashboard
  quickActions: "Quick Actions",
  addCase: "Add Case",
  addClient: "Add Client",
  uploadEvidence: "Upload Document",
  pendingInvoices: "Pending Invoices",
  evidenceSummary: "Evidence Summary",
  storageUsed: "Storage Used",
  aiSuggestions: "AI Suggestions",
  upgradeToPro: "Upgrade to Pro",
  viewAll: "View All",
  recentActivity: "Recent Activity",

  // Cases
  filterByCourt: "Filter by Court",
  filterByStatus: "Filter by Status",
  exportData: "Export Data",
  proFeature: "Pro Feature",
  showing: "Showing",
  of: "of",
  entries: "entries",
  next: "Next",
  previous: "Previous",
  noCasesFound: "No cases found matching your criteria.",

  // Clients
  totalDue: "Total Due",
  bulkActions: "Bulk Actions",
  sendEmail: "Send Email",
  archive: "Archive",
  delete: "Delete",
  clientDetails: "Client Details",
  editClient: "Edit Client",
  caseHistory: "Case History",
  noClientsFound: "No clients found.",
  active: "Active",
  inactive: "Inactive",

  // Calendar
  addEvent: "Add Event",
  monthView: "Month",
  weekView: "Week",
  today: "Today",
  eventType: "Event Type",
  reminders: "Reminders",
  linkedCase: "Linked Case",
  saveEvent: "Save Event",
  eventDetails: "Event Details",

  // AI Drafts
  caseCategory: "Case Category",
  docPurpose: "Document Purpose",
  partiesInvolved: "Parties Involved",
  keyFacts: "Key Facts & Context",
  generateDraft: "Generate Draft",
  generatedDoc: "Generated Document",
  copy: "Copy",
  download: "Download",
  saveToCase: "Save to Case",
  drafting: "Drafting...",

  // Billing
  currentPlan: "Current Plan",
  usageLimits: "Usage & Limits",
  upgradeToProTitle: "Upgrade to Pro",
  paymentHistory: "Payment History",
  monthly: "Monthly",
  yearly: "Yearly",
  savePercent: "Save 20%",
  upgradeNow: "Upgrade Now",
  manageSubscription: "Manage Subscription",
  invoice: "Invoice",
  downloadReceipt: "Download Receipt",
  nextBillingDate: "Next billing date",

  // Team
  inviteMember: "Invite Member",
  teamMembers: "Team Members",
  role: "Role",
  accessLevel: "Access Level",
  seatsUsed: "Seats Used",
  resendInvite: "Resend Invite",
  cancelInvite: "Cancel Invite",
  assignCases: "Assign Cases",
  viewAllCases: "View All Cases",
  assignedCasesOnly: "Assigned Cases Only",
  permissionRequired: "Permission required — Ask Admin",
  pendingAcceptance: "Pending Acceptance",

  // Evidence Locker
  filterByType: "Filter by Type",
  gridView: "Grid View",
  listView: "List View",
  storageQuota: "Storage Quota",
  uploadFile: "Upload File",

  // Notifications
  markAllRead: "Mark all as read",
  notificationPreferences: "Notification Preferences",
  noNotifications: "No new notifications",

  // Settings
  settingsProfile: "Profile",
  settingsCourts: "Court Preferences",
  settingsSecurity: "Security",
  settingsNotifications: "Notifications",
  settingsLanguage: "Language & Region",
  settingsBilling: "Plan",
  settingsPrivacy: "Data & Privacy",
  fullName: "Full Name",
  saveChanges: "Save Changes",
  myJurisdictions: "My Jurisdictions",
  addCourtPlaceholder: "Add a court (e.g., Delhi High Court)",
  defaultCourt: "Default Court for New Cases",
  changePassword: "Change Password",
  currentPassword: "Current Password",
  newPassword: "New Password",
  enable2FA: "Enable 2FA",
  disable2FA: "Disable 2FA",
  twoFactorDesc: "Add an extra layer of security to your account.",
  setup2FA: "Setup 2FA",
  emailNotifications: "Email Notifications",
  smsNotifications: "SMS Alerts",
  whatsappNotifications: "WhatsApp Alerts",
  appLanguage: "App Language",
  localizeEmails: "Localize Transactional Emails",
  downloadData: "Download My Data",
  deleteAccount: "Delete Account",
  deleteAccountWarning: "This action is permanent and cannot be undone.",

  // Case Detail
  backToCases: "Back to Cases",
  overview: "Overview",
  hearings: "Hearings",
  evidence: "Evidence",
  notes: "Notes & Voice",
  caseInfo: "Case Information",
  courtDetails: "Court Details",
  timeline: "Case Timeline",
  addHearing: "Add Hearing",
  voiceToText: "Voice to Text",
  saveNote: "Save Note",

  // Landing
  heroTitle: "Modern Case Management for Indian Advocates",
  heroSubtitle: "Manage cases, clients, and courts in one place. AI-powered drafting for the modern legal era.",
  startTrial: "Start Free Trial",
  login: "Login",
  features: "Features",
  pricing: "Pricing",
  testimonials: "Testimonials",
  featureCaseMgmt: "Case Management",
  featureAiDrafting: "AI Legal Drafting",
  planBasic: "Basic Plan",
  planPro: "Pro Plan",

  // Login
  loginTitle: "Sign in to your account",
  loginSubtitle: "Welcome back! Please enter your details.",
  emailLabel: "Email",
  passwordLabel: "Password",
  forgotPassword: "Forgot password?",
  signIn: "Sign in",
  orContinueWith: "Or continue with",
  dontHaveAccount: "Don't have an account?",
  signUp: "Sign up",

  // Signup
  createAccount: "Create your account",
  fullNameLabel: "Full Name",
  confirmPasswordLabel: "Confirm Password",
  agreeTerms: "I agree to the Terms of Service and Privacy Policy",
  alreadyHaveAccount: "Already have an account?",
  verifyEmailTitle: "Verify your email",
  verifyEmailSubtitle: "We sent a verification code to",
  enterOtp: "Enter 6-digit code",
  verifyBtn: "Verify Email",
  resendCode: "Resend Code",

  // Forgot Password
  resetPasswordTitle: "Reset your password",
  resetPasswordSubtitle: "Enter your email address and we'll send you a link to reset your password.",
  sendResetLink: "Send Reset Link",
  backToLogin: "Back to Login",
  resetEmailSentTitle: "Check your email",
  resetEmailSentSubtitle: "We have sent a password reset link to",
  openEmailApp: "Open Email App",
  didntReceiveEmail: "Didn't receive the email?",
};

export const HINDI_STRINGS: LanguageStrings = {
  dashboard: "डैशबोर्ड",
  cases: "मुकदमे (Cases)",
  clients: "मुवक्किल (Clients)",
  calendar: "कैलेंडर",
  aiDrafts: "AI ड्राफ्टिंग",
  billing: "बिल और चालान",
  settings: "सेटिंग्स",
  team: "टीम प्रबंधन",
  evidenceLocker: "साक्ष्य लॉकर",
  notifications: "सूचनाएं",
  newCase: "+ नया मुकदमा",
  search: "खोजें...",
  upcomingHearings: "आगामी सुनवाई",
  revenue: "कुल राजस्व",
  totalCases: "कुल मुकदमे",
  activeClients: "सक्रिय मुवक्किल",
  welcome: "स्वागत है, अधिवक्ता जी",

  // Global
  quickAdd: "त्वरित जोड़ें",
  searchResults: "खोज परिणाम",
  noResults: "कोई परिणाम नहीं मिला",
  searchPlaceholder: "मामले, ग्राहक, फाइलें खोजें...",

  // Dashboard
  quickActions: "त्वरित कार्रवाई",
  addCase: "नया मुकदमा",
  addClient: "नया मुवक्किल",
  uploadEvidence: "दस्तावेज़ अपलोड",
  pendingInvoices: "लंबित चालान",
  evidenceSummary: "साक्ष्य सारांश",
  storageUsed: "संग्रहण उपयोग",
  aiSuggestions: "AI सुझाव",
  upgradeToPro: "प्रो में अपग्रेड करें",
  viewAll: "सभी देखें",
  recentActivity: "हाल की गतिविधि",

  // Cases
  filterByCourt: "अदालत द्वारा फ़िल्टर करें",
  filterByStatus: "स्थिति द्वारा फ़िल्टर करें",
  exportData: "डेटा निर्यात करें",
  proFeature: "प्रो फ़ीचर",
  showing: "दिखाया जा रहा है",
  of: "में से",
  entries: "प्रविष्टियाँ",
  next: "अगला",
  previous: "पिछला",
  noCasesFound: "आपके मानदंडों से मेल खाने वाले कोई मामले नहीं मिले।",

  // Clients
  totalDue: "कुल बकाया",
  bulkActions: "सामूहिक कार्रवाई",
  sendEmail: "ईमेल भेजें",
  archive: "संग्रहित करें",
  delete: "हटाएं",
  clientDetails: "मुवक्किल विवरण",
  editClient: "संपादित करें",
  caseHistory: "केस इतिहास",
  noClientsFound: "कोई मुवक्किल नहीं मिला।",
  active: "सक्रिय",
  inactive: "निष्क्रिय",

  // Calendar
  addEvent: "घटना जोड़ें",
  monthView: "महीना",
  weekView: "सप्ताह",
  today: "आज",
  eventType: "घटना का प्रकार",
  reminders: "रिमाइंडर",
  linkedCase: "संबंधित केस",
  saveEvent: "सहेजें",
  eventDetails: "विवरण",

  // AI Drafts
  caseCategory: "केस श्रेणी",
  docPurpose: "दस्तावेज़ का उद्देश्य",
  partiesInvolved: "संबंधित पक्ष",
  keyFacts: "मुख्य तथ्य और संदर्भ",
  generateDraft: "ड्राफ्ट उत्पन्न करें",
  generatedDoc: "उत्पन्न दस्तावेज़",
  copy: "कॉपी",
  download: "डाउनलोड",
  saveToCase: "केस में सहेजें",
  drafting: "ड्राफ्टिंग चल रही है...",

  // Billing
  currentPlan: "वर्तमान प्लान",
  usageLimits: "उपयोग और सीमाएं",
  upgradeToProTitle: "प्रो में अपग्रेड करें",
  paymentHistory: "भुगतान इतिहास",
  monthly: "मासिक",
  yearly: "वार्षिक",
  savePercent: "20% बचाएं",
  upgradeNow: "अभी अपग्रेड करें",
  manageSubscription: "सदस्यता प्रबंधित करें",
  invoice: "चालान",
  downloadReceipt: "रसीद डाउनलोड करें",
  nextBillingDate: "अगली बिलिंग तिथि",

  // Team
  inviteMember: "सदस्य आमंत्रित करें",
  teamMembers: "टीम के सदस्य",
  role: "भूमिका",
  accessLevel: "पहुँच स्तर",
  seatsUsed: "सीटों का उपयोग",
  resendInvite: "आमंत्रण पुनः भेजें",
  cancelInvite: "आमंत्रण रद्द करें",
  assignCases: "केस असाइन करें",
  viewAllCases: "सभी केस देखें",
  assignedCasesOnly: "केवल असाइन किए गए केस",
  permissionRequired: "अनुमति आवश्यक है - एडमिन से पूछें",
  pendingAcceptance: "स्वीकृति लंबित",

  // Evidence Locker
  filterByType: "प्रकार से फ़िल्टर",
  gridView: "ग्रिड दृश्य",
  listView: "सूची दृश्य",
  storageQuota: "संग्रहण कोटा",
  uploadFile: "फाइल अपलोड करें",

  // Notifications
  markAllRead: "सभी को पढ़ा हुआ चिह्नित करें",
  notificationPreferences: "अधिसूचना प्राथमिकताएं",
  noNotifications: "कोई नई सूचना नहीं",

  // Settings
  settingsProfile: "प्रोफ़ाइल",
  settingsCourts: "न्यायालय प्राथमिकताएं",
  settingsSecurity: "सुरक्षा",
  settingsNotifications: "सूचनाएं",
  settingsLanguage: "भाषा और क्षेत्र",
  settingsBilling: "योजना",
  settingsPrivacy: "डेटा और गोपनीयता",
  fullName: "पूरा नाम",
  saveChanges: "परिवर्तन सहेजें",
  myJurisdictions: "मेरे क्षेत्राधिकार",
  addCourtPlaceholder: "न्यायालय जोड़ें (जैसे, दिल्ली उच्च न्यायालय)",
  defaultCourt: "नए मामलों के लिए डिफ़ॉल्ट न्यायालय",
  changePassword: "पासवर्ड बदलें",
  currentPassword: "वर्तमान पासवर्ड",
  newPassword: "नया पासवर्ड",
  enable2FA: "2FA सक्षम करें",
  disable2FA: "2FA अक्षम करें",
  twoFactorDesc: "अपने खाते में सुरक्षा की एक अतिरिक्त परत जोड़ें।",
  setup2FA: "2FA सेट करें",
  emailNotifications: "ईमेल सूचनाएं",
  smsNotifications: "SMS अलर्ट",
  whatsappNotifications: "WhatsApp अलर्ट",
  appLanguage: "ऐप भाषा",
  localizeEmails: "लेनदेन संबंधी ईमेल का अनुवाद करें",
  downloadData: "मेरा डेटा डाउनलोड करें",
  deleteAccount: "खाता हटाएं",
  deleteAccountWarning: "यह कार्रवाई स्थायी है और इसे पूर्ववत नहीं किया जा सकता है।",

  // Case Detail
  backToCases: "मामलों पर वापस",
  overview: "अवलोकन",
  hearings: "सुनवाई",
  evidence: "सबूत",
  notes: "नोट्स और आवाज़",
  caseInfo: "केस जानकारी",
  courtDetails: "न्यायालय विवरण",
  timeline: "केस टाइमलाइन",
  addHearing: "सुनवाई जोड़ें",
  voiceToText: "वॉयस टू टेक्स्ट",
  saveNote: "नोट सहेजें",

  // Landing
  heroTitle: "भारतीय अधिवक्ताओं के लिए आधुनिक केस प्रबंधन",
  heroSubtitle: "अपने सभी केस, मुवक्किल और कोर्ट की जानकारी एक ही जगह प्रबंधित करें। आधुनिक युग के लिए AI-संचालित ड्राफ्टिंग।",
  startTrial: "मुफ्त ट्रायल शुरू करें",
  login: "लॉग इन",
  features: "विशेषताएं",
  pricing: "मूल्य निर्धारण",
  testimonials: "प्रशंसापत्र",
  featureCaseMgmt: "केस प्रबंधन",
  featureAiDrafting: "AI कानूनी ड्राफ्टिंग",
  planBasic: "बेसिक प्लान",
  planPro: "प्रो प्लान",

  // Login
  loginTitle: "अपने खाते में साइन इन करें",
  loginSubtitle: "वापसी पर स्वागत है! कृपया अपना विवरण दर्ज करें।",
  emailLabel: "ईमेल",
  passwordLabel: "पासवर्ड",
  forgotPassword: "पासवर्ड भूल गए?",
  signIn: "साइन इन",
  orContinueWith: "या इसके साथ जारी रखें",
  dontHaveAccount: "खाता नहीं है?",
  signUp: "साइन अप",

  // Signup
  createAccount: "अपना खाता बनाएं",
  fullNameLabel: "पूरा नाम",
  confirmPasswordLabel: "पासवर्ड की पुष्टि करें",
  agreeTerms: "मैं सेवा की शर्तों और गोपनीयता नीति से सहमत हूं",
  alreadyHaveAccount: "क्या आपके पास पहले से एक खाता है?",
  verifyEmailTitle: "अपना ईमेल सत्यापित करें",
  verifyEmailSubtitle: "हमने सत्यापन कोड भेजा है",
  enterOtp: "6-अंकीय कोड दर्ज करें",
  verifyBtn: "ईमेल सत्यापित करें",
  resendCode: "कोड पुनः भेजें",

  // Forgot Password
  resetPasswordTitle: "अपना पासवर्ड रीसेट करें",
  resetPasswordSubtitle: "अपना ईमेल पता दर्ज करें और हम आपको पासवर्ड रीसेट करने के लिए एक लिंक भेजेंगे।",
  sendResetLink: "रीसेट लिंक भेजें",
  backToLogin: "लॉगिन पर वापस जाएं",
  resetEmailSentTitle: "अपना ईमेल चेक करें",
  resetEmailSentSubtitle: "हमने पासवर्ड रीसेट लिंक भेजा है",
  openEmailApp: "ईमेल ऐप खोलें",
  didntReceiveEmail: "ईमेल प्राप्त नहीं हुआ?",
};