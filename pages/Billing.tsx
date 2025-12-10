import React, { useState } from 'react';
import { 
  CreditCard, 
  Check, 
  Download, 
  Zap, 
  HardDrive, 
  Bell, 
  Briefcase, 
  FileText,
  Shield,
  Clock,
  ChevronRight,
  Lock,
  X
} from 'lucide-react';
import { LanguageStrings, SubscriptionInvoice } from '../types';

interface BillingProps {
  strings: LanguageStrings;
  isProPlan: boolean;
  setIsProPlan: (isPro: boolean) => void;
}

const MOCK_HISTORY: SubscriptionInvoice[] = [
  { id: 'INV-SUB-2023-09', date: '2023-09-01', amount: 500, plan: 'Basic', status: 'Paid', period: 'Monthly' },
  { id: 'INV-SUB-2023-08', date: '2023-08-01', amount: 500, plan: 'Basic', status: 'Paid', period: 'Monthly' },
  { id: 'INV-SUB-2023-07', date: '2023-07-01', amount: 500, plan: 'Basic', status: 'Paid', period: 'Monthly' },
];

export const Billing: React.FC<BillingProps> = ({ strings, isProPlan, setIsProPlan }) => {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');
  const [showCheckout, setShowCheckout] = useState(false);
  const [checkoutStep, setCheckoutStep] = useState<'form' | 'processing' | 'success'>('form');

  // Usage Data
  const usageData = {
    storage: { used: 4.2, limit: isProPlan ? 10 : 0.5, unit: 'GB' },
    cases: { used: 45, limit: isProPlan ? 'Unlimited' : 50, unit: 'Active Cases' },
    drafts: { used: 12, limit: isProPlan ? 'Unlimited' : 5, unit: 'AI Drafts' },
    reminders: { used: 85, limit: isProPlan ? 1000 : 100, unit: 'SMS/WA' }
  };

  const handleUpgrade = () => {
    setShowCheckout(true);
    setCheckoutStep('form');
  };

  const processPayment = (e: React.FormEvent) => {
    e.preventDefault();
    setCheckoutStep('processing');
    setTimeout(() => {
      setCheckoutStep('success');
      setIsProPlan(true); // Actual Upgrade Logic
    }, 2000);
  };

  const closeCheckout = () => {
    setShowCheckout(false);
    setCheckoutStep('form');
  };

  const handleDownloadInvoice = (id: string) => {
    alert(`Downloading Invoice ${id}...`);
  };

  // Helper for progress bars
  const calculatePercentage = (used: number, limit: number | string) => {
    if (limit === 'Unlimited') return 20; // Visual placeholder for unlimited
    return Math.min(100, (used / (limit as number)) * 100);
  };

  return (
    <div className="p-6 md:p-8 max-w-7xl mx-auto h-full flex flex-col space-y-8 animate-fade-in">
      
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
           <h1 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
             <CreditCard className="text-blue-600" />
             {strings.billing}
           </h1>
           <p className="text-slate-500">Manage your subscription, payment methods, and invoices.</p>
        </div>
        {isProPlan && (
           <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-4 py-2 rounded-xl text-sm font-bold shadow-lg shadow-blue-200 flex items-center gap-2">
              <Zap size={16} className="text-yellow-300" />
              Pro Plan Active
           </div>
        )}
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        
        {/* Left Column: Plan & Usage */}
        <div className="w-full lg:w-2/3 space-y-8">
          
          {/* Current Plan Card */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
             <div className="p-6 border-b border-slate-100 flex justify-between items-start bg-slate-50/50">
                <div>
                   <h2 className="font-bold text-slate-800 text-lg mb-1">{strings.currentPlan}</h2>
                   <div className="text-sm text-slate-500">
                     {isProPlan ? 'Renews on Oct 1, 2024' : 'Trial expires in 3 days'}
                   </div>
                </div>
                <button className="text-sm font-medium text-blue-600 hover:text-blue-700 hover:underline">
                   {strings.manageSubscription}
                </button>
             </div>
             
             <div className="p-6 flex items-center justify-between">
                <div className="flex items-center gap-4">
                   <div className={`w-16 h-16 rounded-2xl flex items-center justify-center text-2xl font-bold shadow-sm ${isProPlan ? 'bg-blue-600 text-white' : 'bg-slate-200 text-slate-600'}`}>
                      {isProPlan ? 'Pro' : 'Bas'}
                   </div>
                   <div>
                      <div className="font-bold text-xl text-slate-900">{isProPlan ? strings.planPro : strings.planBasic}</div>
                      <div className="text-slate-500">{isProPlan ? '₹1,000 / month' : '₹500 / month'}</div>
                   </div>
                </div>
                {!isProPlan && (
                   <button 
                     onClick={handleUpgrade}
                     className="px-6 py-3 bg-slate-900 text-white rounded-xl font-bold shadow-lg shadow-slate-200 hover:bg-slate-800 transition-all transform hover:-translate-y-0.5"
                   >
                     {strings.upgradeNow}
                   </button>
                )}
             </div>
          </div>

          {/* Usage Stats */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
             <h2 className="font-bold text-slate-800 text-lg mb-6 flex items-center gap-2">
                <Zap size={20} className="text-amber-500" />
                {strings.usageLimits}
             </h2>
             
             <div className="grid md:grid-cols-2 gap-8">
                <UsageItem 
                  icon={HardDrive}
                  label="Storage"
                  used={usageData.storage.used}
                  limit={usageData.storage.limit}
                  unit={usageData.storage.unit}
                  percentage={calculatePercentage(usageData.storage.used, usageData.storage.limit)}
                  color="bg-purple-500"
                />
                <UsageItem 
                  icon={Briefcase}
                  label="Active Cases"
                  used={usageData.cases.used}
                  limit={usageData.cases.limit}
                  unit=""
                  percentage={calculatePercentage(usageData.cases.used, usageData.cases.limit)}
                  color="bg-blue-500"
                />
                <UsageItem 
                  icon={FileText}
                  label="AI Drafts (Monthly)"
                  used={usageData.drafts.used}
                  limit={usageData.drafts.limit}
                  unit=""
                  percentage={calculatePercentage(usageData.drafts.used, usageData.drafts.limit)}
                  color="bg-indigo-500"
                />
                <UsageItem 
                  icon={Bell}
                  label="Reminders Sent"
                  used={usageData.reminders.used}
                  limit={usageData.reminders.limit}
                  unit=""
                  percentage={calculatePercentage(usageData.reminders.used, usageData.reminders.limit)}
                  color="bg-green-500"
                />
             </div>
          </div>

          {/* Payment History */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
             <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
                <h2 className="font-bold text-slate-800 text-lg">{strings.paymentHistory}</h2>
                <button className="text-sm font-medium text-slate-500 flex items-center gap-1 hover:text-slate-800">
                   View All <ChevronRight size={14} />
                </button>
             </div>
             
             <div className="overflow-x-auto">
               <table className="w-full text-left text-sm text-slate-600">
                  <thead className="bg-slate-50 border-b border-slate-100 text-xs uppercase font-semibold text-slate-500">
                     <tr>
                        <th className="px-6 py-4">{strings.invoice}</th>
                        <th className="px-6 py-4">Status</th>
                        <th className="px-6 py-4">Amount</th>
                        <th className="px-6 py-4">Date</th>
                        <th className="px-6 py-4 text-right">Action</th>
                     </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                     {MOCK_HISTORY.map((inv) => (
                        <tr key={inv.id} className="hover:bg-slate-50 transition-colors">
                           <td className="px-6 py-4 font-medium text-slate-800 flex items-center gap-2">
                              <FileText size={16} className="text-slate-400" />
                              {inv.id}
                           </td>
                           <td className="px-6 py-4">
                              <span className="bg-green-100 text-green-700 px-2 py-1 rounded text-xs font-bold uppercase border border-green-200">
                                 {inv.status}
                              </span>
                           </td>
                           <td className="px-6 py-4 font-medium">₹{inv.amount}</td>
                           <td className="px-6 py-4">{inv.date}</td>
                           <td className="px-6 py-4 text-right">
                              <button 
                                onClick={() => handleDownloadInvoice(inv.id)}
                                className="text-slate-400 hover:text-blue-600 p-2 hover:bg-blue-50 rounded-lg transition-colors"
                                title={strings.downloadReceipt}
                              >
                                 <Download size={18} />
                              </button>
                           </td>
                        </tr>
                     ))}
                  </tbody>
               </table>
             </div>
          </div>

        </div>

        {/* Right Column: Upgrade / Upsell */}
        <div className="w-full lg:w-1/3">
           {!isProPlan ? (
             <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-3xl p-6 text-white shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/20 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none"></div>
                
                <div className="relative z-10">
                   <div className="flex justify-between items-center mb-6">
                      <h2 className="text-xl font-bold">{strings.upgradeToProTitle}</h2>
                      <div className="flex bg-slate-700/50 p-1 rounded-lg backdrop-blur-sm">
                         <button 
                           onClick={() => setBillingCycle('monthly')}
                           className={`px-3 py-1 rounded-md text-xs font-bold transition-all ${billingCycle === 'monthly' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-400 hover:text-white'}`}
                         >
                            {strings.monthly}
                         </button>
                         <button 
                           onClick={() => setBillingCycle('yearly')}
                           className={`px-3 py-1 rounded-md text-xs font-bold transition-all ${billingCycle === 'yearly' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-400 hover:text-white'}`}
                         >
                            {strings.yearly}
                         </button>
                      </div>
                   </div>

                   <div className="mb-6">
                      <div className="flex items-end gap-1 mb-2">
                         <span className="text-4xl font-bold">{billingCycle === 'monthly' ? '₹1,000' : '₹9,600'}</span>
                         <span className="text-slate-400 text-sm mb-1">{billingCycle === 'monthly' ? '/mo' : '/yr'}</span>
                      </div>
                      {billingCycle === 'yearly' && (
                         <span className="bg-green-500/20 text-green-400 text-xs font-bold px-2 py-0.5 rounded border border-green-500/30">
                            {strings.savePercent}
                         </span>
                      )}
                   </div>

                   <ul className="space-y-4 mb-8">
                      <ProFeatureItem text="Unlimited Active Cases" />
                      <ProFeatureItem text="Unlimited AI Drafting" />
                      <ProFeatureItem text="10GB Secure Storage" />
                      <ProFeatureItem text="WhatsApp Reminders" />
                      <ProFeatureItem text="Priority Support" />
                   </ul>

                   <button 
                     onClick={handleUpgrade}
                     className="w-full py-4 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-bold shadow-lg shadow-blue-900/50 transition-all transform hover:-translate-y-1 flex items-center justify-center gap-2"
                   >
                     {strings.upgradeNow} <ChevronRight size={18} />
                   </button>
                </div>
             </div>
           ) : (
             // Pro Plan Active State Widget
             <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-3xl p-8 text-white shadow-xl relative overflow-hidden h-full flex flex-col justify-center items-center text-center">
                 <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mb-6 backdrop-blur-md">
                    <Shield size={40} className="text-white" />
                 </div>
                 <h2 className="text-2xl font-bold mb-2">You are a Pro!</h2>
                 <p className="text-blue-100 mb-6">Thank you for supporting Adhivakta Flow. You have access to all premium features.</p>
                 <div className="w-full bg-white/10 rounded-xl p-4 text-left mb-6 backdrop-blur-sm border border-white/10">
                    <div className="text-xs text-blue-200 uppercase tracking-wide font-bold mb-1">Next Billing</div>
                    <div className="font-mono text-lg">Oct 01, 2024</div>
                 </div>
                 <button className="text-sm font-bold text-white hover:text-blue-200 underline">
                    Cancel Subscription
                 </button>
             </div>
           )}
        </div>
      </div>

      {/* Mock Checkout Modal */}
      {showCheckout && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-md z-[60] flex items-center justify-center p-4 animate-fade-in">
           <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden relative">
              
              {/* Modal Header */}
              <div className="bg-slate-50 px-6 py-4 border-b border-slate-100 flex justify-between items-center">
                 <div className="flex items-center gap-2">
                    <Shield size={18} className="text-green-600" />
                    <span className="font-bold text-slate-700 text-sm">Secure Checkout</span>
                 </div>
                 <button onClick={closeCheckout} className="text-slate-400 hover:text-slate-700">
                    <X size={20} />
                 </button>
              </div>

              {checkoutStep === 'form' && (
                 <form onSubmit={processPayment} className="p-6">
                    <div className="mb-6 flex items-center justify-between">
                       <div>
                          <p className="text-sm text-slate-500">Total to pay</p>
                          <h2 className="text-2xl font-bold text-slate-900">{billingCycle === 'monthly' ? '₹1,000.00' : '₹9,600.00'}</h2>
                       </div>
                       <div className="bg-blue-50 text-blue-700 px-3 py-1 rounded-lg text-sm font-bold">
                          Pro Plan
                       </div>
                    </div>

                    <div className="space-y-4 mb-6">
                       <div>
                          <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Card Number</label>
                          <div className="relative">
                             <CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                             <input type="text" placeholder="0000 0000 0000 0000" className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-blue-500 transition-all font-mono text-sm" required />
                          </div>
                       </div>
                       <div className="grid grid-cols-2 gap-4">
                          <div>
                             <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Expiry</label>
                             <input type="text" placeholder="MM/YY" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-blue-500 transition-all font-mono text-sm" required />
                          </div>
                          <div>
                             <label className="block text-xs font-bold text-slate-500 uppercase mb-1">CVV</label>
                             <input type="password" placeholder="123" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-blue-500 transition-all font-mono text-sm" required />
                          </div>
                       </div>
                       <div>
                          <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Cardholder Name</label>
                          <input type="text" placeholder="Enter Name on Card" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-blue-500 transition-all text-sm" required />
                       </div>
                    </div>

                    <button type="submit" className="w-full py-4 bg-green-600 hover:bg-green-700 text-white font-bold rounded-xl shadow-lg shadow-green-200 transition-all">
                       Pay Now
                    </button>
                    
                    <div className="mt-4 flex justify-center gap-2 opacity-50">
                       <div className="h-6 w-10 bg-slate-200 rounded"></div>
                       <div className="h-6 w-10 bg-slate-200 rounded"></div>
                       <div className="h-6 w-10 bg-slate-200 rounded"></div>
                    </div>
                 </form>
              )}

              {checkoutStep === 'processing' && (
                 <div className="p-12 text-center">
                    <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto mb-6"></div>
                    <h3 className="text-xl font-bold text-slate-800 mb-2">Processing Payment...</h3>
                    <p className="text-slate-500">Please do not close this window.</p>
                 </div>
              )}

              {checkoutStep === 'success' && (
                 <div className="p-12 text-center">
                    <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 text-green-600 animate-bounce">
                       <Check size={40} />
                    </div>
                    <h3 className="text-2xl font-bold text-slate-800 mb-2">Payment Successful!</h3>
                    <p className="text-slate-500 mb-8">Your Pro subscription is now active.</p>
                    <button onClick={closeCheckout} className="w-full py-3 bg-slate-900 text-white font-bold rounded-xl hover:bg-slate-800 transition-all">
                       Continue to Dashboard
                    </button>
                 </div>
              )}

           </div>
        </div>
      )}
    </div>
  );
};

const UsageItem = ({ icon: Icon, label, used, limit, unit, percentage, color }: any) => (
  <div className="flex items-center gap-4">
     <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-white shadow-sm ${color}`}>
        <Icon size={20} />
     </div>
     <div className="flex-1">
        <div className="flex justify-between items-end mb-1">
           <span className="font-bold text-slate-700 text-sm">{label}</span>
           <span className="text-xs text-slate-500 font-medium">
              {used} / {limit} {unit}
           </span>
        </div>
        <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
           <div 
             className={`h-full rounded-full transition-all duration-1000 ${percentage > 90 ? 'bg-red-500' : color.replace('bg-', 'bg-')}`} 
             style={{ width: `${percentage}%` }}
           ></div>
        </div>
     </div>
  </div>
);

const ProFeatureItem = ({ text }: { text: string }) => (
  <li className="flex items-center gap-3 text-sm text-slate-300">
     <div className="p-0.5 bg-green-500/20 rounded-full text-green-400">
        <Check size={14} />
     </div>
     {text}
  </li>
);