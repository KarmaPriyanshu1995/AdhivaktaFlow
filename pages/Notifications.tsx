import React, { useState } from 'react';
import { 
  Bell, 
  Check, 
  Filter, 
  Settings, 
  Clock, 
  AlertTriangle,
  FileText,
  CreditCard,
  Gavel
} from 'lucide-react';
import { LanguageStrings, Notification, NotificationType } from '../types';

interface NotificationsProps {
  strings: LanguageStrings;
  notifications: Notification[];
  setNotifications: React.Dispatch<React.SetStateAction<Notification[]>>;
}

export const Notifications: React.FC<NotificationsProps> = ({ strings, notifications, setNotifications }) => {
  const [filter, setFilter] = useState<'all' | 'unread' | 'alert' | 'billing'>('all');

  const filteredNotifs = notifications.filter(n => {
    if (filter === 'all') return true;
    if (filter === 'unread') return !n.read;
    return n.type === filter;
  });

  const markAsRead = (id: string) => {
    setNotifications(notifications.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const markAllRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  };

  const getIcon = (type: NotificationType) => {
    switch (type) {
      case 'alert': return <AlertTriangle size={20} className="text-amber-500" />;
      case 'billing': return <CreditCard size={20} className="text-green-500" />;
      case 'hearing': return <Gavel size={20} className="text-blue-500" />;
      default: return <FileText size={20} className="text-purple-500" />;
    }
  };

  return (
    <div className="p-6 md:p-8 max-w-5xl mx-auto h-full animate-fade-in">
       
       <div className="flex justify-between items-center mb-8">
          <div>
             <h1 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
                <Bell className="text-blue-600" /> {strings.notifications}
             </h1>
             <p className="text-slate-500">Stay updated on your cases and account activity.</p>
          </div>
          <div className="flex gap-3">
             <button 
                onClick={markAllRead}
                className="text-sm text-slate-600 font-medium hover:text-blue-600 px-4 py-2 hover:bg-slate-100 rounded-lg transition-colors"
             >
                {strings.markAllRead}
             </button>
             <button className="p-2 border border-slate-200 rounded-lg hover:bg-slate-50 text-slate-500">
                <Settings size={20} />
             </button>
          </div>
       </div>

       <div className="flex gap-6">
          
          {/* Sidebar Filter */}
          <div className="w-64 hidden md:block">
             <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-2 space-y-1">
                {['all', 'unread', 'hearing', 'billing', 'alert'].map(f => (
                   <button
                     key={f}
                     onClick={() => setFilter(f as any)}
                     className={`w-full text-left px-4 py-3 rounded-xl text-sm font-medium capitalize flex justify-between items-center ${
                        filter === f ? 'bg-blue-50 text-blue-700' : 'text-slate-600 hover:bg-slate-50'
                     }`}
                   >
                      {f}
                      {f === 'unread' && notifications.filter(n => !n.read).length > 0 && (
                         <span className="bg-blue-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                            {notifications.filter(n => !n.read).length}
                         </span>
                      )}
                   </button>
                ))}
             </div>
          </div>

          {/* List */}
          <div className="flex-1 space-y-4">
             {filteredNotifs.length > 0 ? (
                filteredNotifs.map(n => (
                   <div 
                     key={n.id} 
                     className={`bg-white p-5 rounded-2xl shadow-sm border border-slate-200 flex gap-4 transition-all hover:shadow-md ${!n.read ? 'border-l-4 border-l-blue-500' : ''}`}
                     onClick={() => markAsRead(n.id)}
                   >
                      <div className={`p-3 rounded-full h-fit flex-shrink-0 ${!n.read ? 'bg-blue-50' : 'bg-slate-100'}`}>
                         {getIcon(n.type)}
                      </div>
                      <div className="flex-1">
                         <div className="flex justify-between items-start mb-1">
                            <h3 className={`font-semibold ${!n.read ? 'text-slate-900' : 'text-slate-600'}`}>{n.title}</h3>
                            <span className="text-xs text-slate-400 flex items-center gap-1">
                               <Clock size={12} /> {n.date}
                            </span>
                         </div>
                         <p className="text-sm text-slate-500 leading-relaxed mb-3">{n.message}</p>
                         {n.linkAction && (
                            <button className="text-xs font-bold text-blue-600 hover:underline uppercase tracking-wide">
                               View Details
                            </button>
                         )}
                      </div>
                      {!n.read && (
                         <div className="self-center">
                            <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                         </div>
                      )}
                   </div>
                ))
             ) : (
                <div className="flex flex-col items-center justify-center h-64 bg-white rounded-2xl border border-slate-200 border-dashed">
                   <Bell size={40} className="text-slate-300 mb-4" />
                   <p className="text-slate-500 font-medium">No notifications in this view.</p>
                </div>
             )}
          </div>
       </div>
    </div>
  );
};