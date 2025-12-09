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

export interface Client {
  id: string;
  name: string;
  phone: string;
  email: string;
  address: string;
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

export interface Invoice {
  id: string;
  clientId: string;
  clientName: string;
  amount: number;
  date: string;
  status: 'Paid' | 'Unpaid' | 'Overdue';
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
  newCase: string;
  search: string;
  upcomingHearings: string;
  revenue: string;
  totalCases: string;
  activeClients: string;
  welcome: string;

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
}

export const ENGLISH_STRINGS: LanguageStrings = {
  dashboard: "Dashboard",
  cases: "Case Files",
  clients: "Clients",
  calendar: "Calendar",
  aiDrafts: "AI Drafter",
  billing: "Billing & Invoices",
  settings: "Settings",
  newCase: "+ New Case",
  search: "Search cases, clients...",
  upcomingHearings: "Upcoming Hearings",
  revenue: "Total Revenue",
  totalCases: "Total Cases",
  activeClients: "Active Clients",
  welcome: "Welcome back, Advocate",

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
};

export const HINDI_STRINGS: LanguageStrings = {
  dashboard: "डैशबोर्ड",
  cases: "मुकदमे (Cases)",
  clients: "मुवक्किल (Clients)",
  calendar: "कैलेंडर",
  aiDrafts: "AI ड्राफ्टिंग",
  billing: "बिल और चालान",
  settings: "सेटिंग्स",
  newCase: "+ नया मुकदमा",
  search: "खोजें...",
  upcomingHearings: "आगामी सुनवाई",
  revenue: "कुल राजस्व",
  totalCases: "कुल मुकदमे",
  activeClients: "सक्रिय मुवक्किल",
  welcome: "स्वागत है, अधिवक्ता जी",

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
};