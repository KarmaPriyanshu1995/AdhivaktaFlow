import React, { useState } from 'react';
import { 
  Search, 
  Plus, 
  MoreVertical, 
  Phone, 
  Mail, 
  MapPin, 
  Briefcase, 
  IndianRupee, 
  X, 
  Edit2, 
  Archive, 
  Trash2, 
  Send,
  CheckSquare,
  Square,
  Lock,
  ChevronRight
} from 'lucide-react';
import { LanguageStrings, Client } from '../types';

interface ClientsProps {
  strings: LanguageStrings;
  isProPlan: boolean;
}

// Mock Data
const MOCK_CLIENTS: Client[] = [
  { id: '1', name: 'Rajesh Sharma', phone: '+91 98765 43210', email: 'rajesh@example.com', address: 'Mumbai, MH', status: 'Active', totalCases: 2, pendingAmount: 5000, lastContact: '2023-10-15' },
  { id: '2', name: 'Amit Verma', phone: '+91 91234 56789', email: 'amit@example.com', address: 'Delhi, DL', status: 'Active', totalCases: 1, pendingAmount: 0, lastContact: '2023-10-10' },
  { id: '3', name: 'Innovate Systems Ltd', phone: '+91 99887 76655', email: 'legal@innovate.com', address: 'Bangalore, KA', status: 'Active', totalCases: 3, pendingAmount: 45000, lastContact: '2023-10-05' },
  { id: '4', name: 'Suresh Raina', phone: '+91 88776 65544', email: 'suresh@example.com', address: 'Chennai, TN', status: 'Inactive', totalCases: 0, pendingAmount: 0, lastContact: '2023-08-20' },
  { id: '5', name: 'Priya Patel', phone: '+91 77665 54433', email: 'priya@example.com', address: 'Ahmedabad, GJ', status: 'Active', totalCases: 1, pendingAmount: 12000, lastContact: '2023-10-12' },
];

export const Clients: React.FC<ClientsProps> = ({ strings, isProPlan }) => {
  const [clients, setClients] = useState<Client[]>(MOCK_CLIENTS);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<'All' | 'Active' | 'Inactive'>('All');
  const [selectedClientId, setSelectedClientId] = useState<string | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedClients, setSelectedClients] = useState<Set<string>>(new Set());
  const [showUpsell, setShowUpsell] = useState(false);

  // New Client Form State
  const [newClient, setNewClient] = useState({ name: '', phone: '', email: '', address: '' });

  // Filter Logic
  const filteredClients = clients.filter(c => {
    const matchesSearch = c.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          c.phone.includes(searchTerm) || 
                          c.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'All' || c.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  // Selected Client Details
  const activeClient = clients.find(c => c.id === selectedClientId);

  const toggleSelectClient = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const newSet = new Set(selectedClients);
    if (newSet.has(id)) {
      newSet.delete(id);
    } else {
      newSet.add(id);
    }
    setSelectedClients(newSet);
  };

  const toggleSelectAll = () => {
    if (selectedClients.size === filteredClients.length) {
      setSelectedClients(new Set());
    } else {
      setSelectedClients(new Set(filteredClients.map(c => c.id)));
    }
  };

  const handleBulkAction = () => {
    if (!isProPlan) {
      setShowUpsell(true);
    } else {
      alert("Pro Action Executed!");
    }
  };

  const handleAddClient = (e: React.FormEvent) => {
    e.preventDefault();
    const newId = (clients.length + 1).toString();
    const client: Client = {
      id: newId,
      ...newClient,
      status: 'Active',
      totalCases: 0,
      pendingAmount: 0,
      lastContact: new Date().toISOString().split('T')[0]
    };
    setClients([client, ...clients]);
    setIsAddModalOpen(false);
    setNewClient({ name: '', phone: '', email: '', address: '' });
  };

  return (
    <div className="p-6 md:p-8 h-full flex flex-col relative">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">{strings.clients}</h1>
          <p className="text-slate-500">{strings.activeClients}: {clients.filter(c => c.status === 'Active').length}</p>
        </div>
        <button 
          onClick={() => setIsAddModalOpen(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl font-medium flex items-center gap-2 shadow-lg shadow-blue-200 transition-all"
        >
          <Plus size={20} />
          {strings.addClient}
        </button>
      </div>

      {/* Main Container */}
      <div className="flex gap-6 h-full relative">
        
        {/* Clients List */}
        <div className={`flex-1 bg-white rounded-2xl shadow-sm border border-slate-200 flex flex-col overflow-hidden transition-all ${selectedClientId ? 'w-2/3' : 'w-full'}`}>
          
          {/* Toolbar */}
          <div className="p-4 border-b border-slate-100 flex flex-col sm:flex-row gap-4 justify-between items-center bg-slate-50/50">
             <div className="relative w-full sm:w-80 group">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors" size={18} />
                <input 
                  type="text"
                  placeholder={strings.search}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400 text-sm"
                />
             </div>
             
             <div className="flex items-center gap-2 w-full sm:w-auto">
                <select 
                   value={filterStatus}
                   onChange={(e) => setFilterStatus(e.target.value as any)}
                   className="p-2 bg-white border border-slate-200 rounded-lg text-sm text-slate-700 focus:outline-none focus:border-blue-400"
                >
                   <option value="All">All Status</option>
                   <option value="Active">Active</option>
                   <option value="Inactive">Inactive</option>
                </select>
             </div>
          </div>

          {/* Bulk Action Bar (Pro) */}
          {selectedClients.size > 0 && (
             <div className="bg-slate-900 text-white p-3 px-6 flex items-center justify-between animate-fade-in">
                <div className="text-sm font-medium">{selectedClients.size} selected</div>
                <div className="flex gap-4">
                   <button onClick={handleBulkAction} className="flex items-center gap-2 text-xs hover:text-blue-300 transition-colors">
                      <Mail size={16} /> {strings.sendEmail} {!isProPlan && <Lock size={10} />}
                   </button>
                   <button onClick={handleBulkAction} className="flex items-center gap-2 text-xs hover:text-blue-300 transition-colors">
                      <Archive size={16} /> {strings.archive} {!isProPlan && <Lock size={10} />}
                   </button>
                   <button onClick={handleBulkAction} className="flex items-center gap-2 text-xs hover:text-red-300 transition-colors">
                      <Trash2 size={16} /> {strings.delete} {!isProPlan && <Lock size={10} />}
                   </button>
                </div>
             </div>
          )}

          {/* Table Header */}
          <div className="grid grid-cols-12 gap-4 px-6 py-3 bg-slate-50 border-b border-slate-200 text-xs font-semibold text-slate-500 uppercase tracking-wider">
             <div className="col-span-1 flex items-center">
                <button onClick={toggleSelectAll} className="text-slate-400 hover:text-blue-600">
                   {selectedClients.size > 0 && selectedClients.size === filteredClients.length ? <CheckSquare size={16} /> : <Square size={16} />}
                </button>
             </div>
             <div className="col-span-4">Client Name</div>
             <div className="col-span-3 hidden md:block">Contact</div>
             <div className="col-span-2 hidden md:block text-center">Cases</div>
             <div className="col-span-2 text-right">Balance</div>
          </div>

          {/* List Content */}
          <div className="overflow-y-auto flex-1">
             {filteredClients.length > 0 ? (
                filteredClients.map(client => (
                   <div 
                      key={client.id}
                      onClick={() => setSelectedClientId(client.id)}
                      className={`grid grid-cols-12 gap-4 px-6 py-4 border-b border-slate-50 items-center cursor-pointer transition-colors ${
                         selectedClientId === client.id ? 'bg-blue-50 border-blue-100' : 'hover:bg-slate-50'
                      }`}
                   >
                      <div className="col-span-1 flex items-center" onClick={(e) => e.stopPropagation()}>
                         <button onClick={(e) => toggleSelectClient(client.id, e)} className={`${selectedClients.has(client.id) ? 'text-blue-600' : 'text-slate-300 hover:text-slate-500'}`}>
                            {selectedClients.has(client.id) ? <CheckSquare size={16} /> : <Square size={16} />}
                         </button>
                      </div>
                      <div className="col-span-11 md:col-span-4 flex items-center gap-3">
                         <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold text-white shadow-sm
                            ${client.status === 'Active' ? 'bg-gradient-to-br from-blue-500 to-indigo-600' : 'bg-slate-400'}`}
                         >
                            {client.name.charAt(0)}
                         </div>
                         <div>
                            <h3 className={`font-semibold text-sm ${selectedClientId === client.id ? 'text-blue-700' : 'text-slate-800'}`}>{client.name}</h3>
                            <span className={`text-[10px] px-1.5 py-0.5 rounded border ${client.status === 'Active' ? 'bg-green-50 text-green-700 border-green-200' : 'bg-slate-100 text-slate-500 border-slate-200'}`}>
                               {client.status}
                            </span>
                         </div>
                      </div>
                      <div className="col-span-3 hidden md:block text-sm text-slate-600">
                         <div className="flex items-center gap-2 mb-1"><Phone size={12} className="text-slate-400" /> {client.phone}</div>
                         <div className="flex items-center gap-2"><Mail size={12} className="text-slate-400" /> <span className="truncate max-w-[120px]">{client.email}</span></div>
                      </div>
                      <div className="col-span-2 hidden md:block text-center">
                         <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-800">
                            {client.totalCases}
                         </span>
                      </div>
                      <div className="col-span-2 hidden md:block text-right">
                         <div className={`font-bold text-sm ${client.pendingAmount > 0 ? 'text-red-600' : 'text-green-600'}`}>
                            ₹{client.pendingAmount.toLocaleString()}
                         </div>
                         <div className="text-[10px] text-slate-400">{strings.totalDue}</div>
                      </div>
                   </div>
                ))
             ) : (
                <div className="flex flex-col items-center justify-center h-64 text-slate-400">
                   <p>{strings.noClientsFound}</p>
                </div>
             )}
          </div>
        </div>

        {/* Slide-over Preview Panel */}
        {selectedClientId && activeClient && (
           <div className="fixed inset-y-0 right-0 w-full md:w-[400px] bg-white shadow-2xl z-50 transform transition-transform duration-300 animate-slide-in-right border-l border-slate-200 flex flex-col">
              
              {/* Slide-over Header */}
              <div className="p-6 border-b border-slate-100 flex justify-between items-start bg-slate-50/50">
                 <div className="flex gap-4">
                    <div className="w-14 h-14 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl flex items-center justify-center text-white text-xl font-bold shadow-lg shadow-blue-200">
                       {activeClient.name.charAt(0)}
                    </div>
                    <div>
                       <h2 className="text-xl font-bold text-slate-900">{activeClient.name}</h2>
                       <p className="text-sm text-slate-500 flex items-center gap-1">
                          <MapPin size={12} /> {activeClient.address}
                       </p>
                    </div>
                 </div>
                 <button onClick={() => setSelectedClientId(null)} className="p-2 text-slate-400 hover:text-slate-700 rounded-full hover:bg-slate-200 transition-colors">
                    <X size={20} />
                 </button>
              </div>

              {/* Slide-over Content */}
              <div className="flex-1 overflow-y-auto p-6 space-y-8">
                 
                 {/* Quick Actions */}
                 <div className="flex gap-3">
                    <button className="flex-1 py-2 bg-blue-50 text-blue-700 rounded-xl font-medium text-sm hover:bg-blue-100 transition-colors flex items-center justify-center gap-2">
                       <Phone size={16} /> Call
                    </button>
                    <button className="flex-1 py-2 bg-slate-50 text-slate-700 rounded-xl font-medium text-sm hover:bg-slate-100 transition-colors flex items-center justify-center gap-2">
                       <Mail size={16} /> Email
                    </button>
                    <button className="p-2 bg-slate-50 text-slate-700 rounded-xl hover:bg-slate-100 transition-colors">
                       <MoreVertical size={18} />
                    </button>
                 </div>

                 {/* Contact Details */}
                 <div className="space-y-4">
                    <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">{strings.clientDetails}</h3>
                    <div className="space-y-3 text-sm">
                       <div className="flex justify-between py-2 border-b border-slate-50">
                          <span className="text-slate-500">Phone</span>
                          <span className="text-slate-800 font-medium">{activeClient.phone}</span>
                       </div>
                       <div className="flex justify-between py-2 border-b border-slate-50">
                          <span className="text-slate-500">Email</span>
                          <span className="text-slate-800 font-medium truncate max-w-[200px]">{activeClient.email}</span>
                       </div>
                       <div className="flex justify-between py-2 border-b border-slate-50">
                          <span className="text-slate-500">Last Contact</span>
                          <span className="text-slate-800 font-medium">{activeClient.lastContact}</span>
                       </div>
                    </div>
                 </div>

                 {/* Case History Mock */}
                 <div>
                    <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-4">{strings.caseHistory}</h3>
                    <div className="space-y-3">
                       <div className="p-3 border border-slate-100 rounded-xl hover:border-blue-200 transition-colors cursor-pointer group">
                          <div className="flex justify-between mb-1">
                             <span className="font-semibold text-slate-800 text-sm group-hover:text-blue-600">Sharma vs State</span>
                             <span className="text-[10px] bg-blue-100 text-blue-700 px-1.5 py-0.5 rounded">Active</span>
                          </div>
                          <p className="text-xs text-slate-500">Last Hearing: 15 Oct 2023</p>
                       </div>
                       <div className="p-3 border border-slate-100 rounded-xl hover:border-blue-200 transition-colors cursor-pointer group">
                          <div className="flex justify-between mb-1">
                             <span className="font-semibold text-slate-800 text-sm group-hover:text-blue-600">Property Dispute 44A</span>
                             <span className="text-[10px] bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded">Closed</span>
                          </div>
                          <p className="text-xs text-slate-500">Judgment Delivered</p>
                       </div>
                    </div>
                 </div>

                 {/* Billing Summary */}
                 <div className="bg-slate-50 p-4 rounded-xl">
                    <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-4">Financials</h3>
                    <div className="flex justify-between items-center mb-2">
                       <span className="text-sm text-slate-500">Total Billed</span>
                       <span className="font-semibold text-slate-800">₹85,000</span>
                    </div>
                    <div className="flex justify-between items-center">
                       <span className="text-sm text-slate-500">Pending</span>
                       <span className="font-bold text-red-600">₹{activeClient.pendingAmount.toLocaleString()}</span>
                    </div>
                 </div>

              </div>

              {/* Slide-over Footer */}
              <div className="p-4 border-t border-slate-200 bg-white">
                 <button className="w-full py-3 bg-slate-900 text-white rounded-xl font-medium hover:bg-slate-800 transition-colors flex items-center justify-center gap-2">
                    <Edit2 size={16} /> {strings.editClient}
                 </button>
              </div>
           </div>
        )}

      </div>

      {/* Add Client Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in">
           <div className="bg-white rounded-2xl shadow-xl max-w-lg w-full overflow-hidden">
              <div className="p-6 border-b border-slate-100 flex justify-between items-center">
                 <h2 className="text-xl font-bold text-slate-800">{strings.addClient}</h2>
                 <button onClick={() => setIsAddModalOpen(false)} className="text-slate-400 hover:text-slate-700">
                    <X size={20} />
                 </button>
              </div>
              <form onSubmit={handleAddClient} className="p-6 space-y-4">
                 <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Full Name *</label>
                    <input 
                      type="text" 
                      required
                      value={newClient.name}
                      onChange={e => setNewClient({...newClient, name: e.target.value})}
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-100 focus:border-blue-500 outline-none" 
                    />
                 </div>
                 <div className="grid grid-cols-2 gap-4">
                    <div>
                       <label className="block text-sm font-medium text-slate-700 mb-1">Phone *</label>
                       <input 
                         type="tel" 
                         required
                         value={newClient.phone}
                         onChange={e => setNewClient({...newClient, phone: e.target.value})}
                         className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-100 focus:border-blue-500 outline-none" 
                       />
                    </div>
                    <div>
                       <label className="block text-sm font-medium text-slate-700 mb-1">Email</label>
                       <input 
                         type="email" 
                         value={newClient.email}
                         onChange={e => setNewClient({...newClient, email: e.target.value})}
                         className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-100 focus:border-blue-500 outline-none" 
                       />
                    </div>
                 </div>
                 <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Address</label>
                    <textarea 
                      rows={3}
                      value={newClient.address}
                      onChange={e => setNewClient({...newClient, address: e.target.value})}
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-100 focus:border-blue-500 outline-none resize-none" 
                    ></textarea>
                 </div>
                 <div className="pt-4 flex justify-end gap-3">
                    <button type="button" onClick={() => setIsAddModalOpen(false)} className="px-4 py-2 text-slate-600 hover:bg-slate-50 rounded-lg">Cancel</button>
                    <button type="submit" className="px-6 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700">Save Client</button>
                 </div>
              </form>
           </div>
        </div>
      )}

      {/* Pro Upsell Modal (Bulk Action) */}
      {showUpsell && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60] flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-white rounded-2xl shadow-2xl max-w-sm w-full overflow-hidden text-center p-8">
             <div className="w-16 h-16 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-6 text-white shadow-lg shadow-amber-200">
                <Lock size={32} />
             </div>
             <h2 className="text-2xl font-bold text-slate-800 mb-2">Pro Feature</h2>
             <p className="text-slate-500 mb-8">Bulk actions like Email and Archive are available on the Pro plan.</p>
             <button onClick={() => setShowUpsell(false)} className="w-full py-3 bg-slate-900 text-white rounded-xl font-bold hover:bg-slate-800">Got it</button>
          </div>
        </div>
      )}
    </div>
  );
};