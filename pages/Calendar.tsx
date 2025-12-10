import React, { useState } from 'react';
import { 
  ChevronLeft, 
  ChevronRight, 
  Plus, 
  Calendar as CalendarIcon, 
  Clock, 
  MapPin, 
  Lock, 
  X,
  Bell,
  MessageSquare,
  Mail,
  Smartphone
} from 'lucide-react';
import { LanguageStrings, CalendarEvent, Case, EventType } from '../types';

interface CalendarProps {
  strings: LanguageStrings;
  cases: Case[];
  isProPlan: boolean;
}

// Mock Data
const MOCK_EVENTS: CalendarEvent[] = [
  {
    id: '1',
    title: 'Bail Hearing - Sharma vs State',
    type: 'Hearing',
    date: new Date().toISOString().split('T')[0], // Today
    startTime: '10:00',
    endTime: '11:00',
    caseId: '1',
    caseTitle: 'Sharma vs State of Maharashtra',
    reminders: { email: true, whatsapp: false, sms: false, reminderTime: 60 }
  },
  {
    id: '2',
    title: 'Evidence Submission Deadline',
    type: 'Evidence',
    date: new Date().toISOString().split('T')[0], // Today
    startTime: '14:00',
    endTime: '15:00',
    caseId: '2',
    caseTitle: 'Land Dispute: Plot 44A',
    reminders: { email: true, whatsapp: true, sms: false, reminderTime: 1440 }
  },
  {
    id: '3',
    title: 'Client Meeting - New Litigation',
    type: 'Client Meeting',
    date: new Date(Date.now() + 86400000).toISOString().split('T')[0], // Tomorrow
    startTime: '16:00',
    endTime: '17:00',
    reminders: { email: true, whatsapp: false, sms: false, reminderTime: 30 }
  }
];

const EVENT_COLORS: Record<EventType, string> = {
  'Hearing': 'bg-blue-100 text-blue-700 border-blue-200',
  'Filing': 'bg-orange-100 text-orange-700 border-orange-200',
  'Judgment': 'bg-purple-100 text-purple-700 border-purple-200',
  'Client Meeting': 'bg-green-100 text-green-700 border-green-200',
  'Evidence': 'bg-red-100 text-red-700 border-red-200'
};

export const Calendar: React.FC<CalendarProps> = ({ strings, cases, isProPlan }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [view, setView] = useState<'Month' | 'Week'>('Month');
  const [events, setEvents] = useState<CalendarEvent[]>(MOCK_EVENTS);
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showUpsell, setShowUpsell] = useState(false);

  // Form State
  const [formData, setFormData] = useState<Partial<CalendarEvent>>({
    type: 'Hearing',
    date: new Date().toISOString().split('T')[0],
    startTime: '09:00',
    endTime: '10:00',
    reminders: { email: true, whatsapp: false, sms: false, reminderTime: 60 }
  });

  // Calendar Logic
  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDay = new Date(year, month, 1).getDay();
    
    const days = [];
    // Previous month filler
    for (let i = 0; i < firstDay; i++) {
      days.push(null);
    }
    // Current month
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(new Date(year, month, i));
    }
    return days;
  };

  const weekStart = new Date(currentDate);
  weekStart.setDate(currentDate.getDate() - currentDate.getDay()); // Sunday start
  
  const getWeekDays = () => {
    const days = [];
    for (let i = 0; i < 7; i++) {
      const d = new Date(weekStart);
      d.setDate(weekStart.getDate() + i);
      days.push(d);
    }
    return days;
  };

  const handlePrev = () => {
    const newDate = new Date(currentDate);
    if (view === 'Month') newDate.setMonth(newDate.getMonth() - 1);
    else newDate.setDate(newDate.getDate() - 7);
    setCurrentDate(newDate);
  };

  const handleNext = () => {
    const newDate = new Date(currentDate);
    if (view === 'Month') newDate.setMonth(newDate.getMonth() + 1);
    else newDate.setDate(newDate.getDate() + 7);
    setCurrentDate(newDate);
  };

  const handleEventClick = (event: CalendarEvent) => {
    setSelectedEvent(event);
    setFormData(event);
    setIsModalOpen(true);
  };

  const handleAddEvent = () => {
    setSelectedEvent(null);
    setFormData({
      type: 'Hearing',
      date: currentDate.toISOString().split('T')[0],
      startTime: '09:00',
      endTime: '10:00',
      reminders: { email: true, whatsapp: false, sms: false, reminderTime: 60 }
    });
    setIsModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    // Validate Hearing/Evidence has case
    if (['Hearing', 'Evidence', 'Filing', 'Judgment'].includes(formData.type!) && !formData.caseId) {
      alert("Please link a Case for this event type.");
      return;
    }

    const newEvent: CalendarEvent = {
      id: selectedEvent ? selectedEvent.id : Math.random().toString(),
      ...formData as CalendarEvent,
      caseTitle: cases.find(c => c.id === formData.caseId)?.title || ''
    };

    if (selectedEvent) {
      setEvents(events.map(ev => ev.id === newEvent.id ? newEvent : ev));
    } else {
      setEvents([...events, newEvent]);
    }
    setIsModalOpen(false);
  };

  const handleLockedFeature = (e: React.MouseEvent) => {
    if (!isProPlan) {
      e.preventDefault();
      setShowUpsell(true);
    }
  };

  const filteredEvents = (date: Date) => {
    const dateStr = date.toISOString().split('T')[0];
    return events.filter(e => e.date === dateStr);
  };

  return (
    <div className="p-6 md:p-8 h-full flex flex-col relative">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
        <div className="flex items-center gap-4">
           <h1 className="text-2xl font-bold text-slate-800">{strings.calendar}</h1>
           <div className="flex bg-slate-100 rounded-lg p-1">
              <button 
                onClick={() => setView('Month')}
                className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all ${view === 'Month' ? 'bg-white shadow-sm text-blue-600' : 'text-slate-500 hover:text-slate-800'}`}
              >
                {strings.monthView}
              </button>
              <button 
                onClick={() => setView('Week')}
                className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all ${view === 'Week' ? 'bg-white shadow-sm text-blue-600' : 'text-slate-500 hover:text-slate-800'}`}
              >
                {strings.weekView}
              </button>
           </div>
        </div>

        <div className="flex items-center gap-4 w-full md:w-auto justify-between md:justify-end">
          <div className="flex items-center gap-2 bg-white border border-slate-200 rounded-xl px-2 py-1">
            <button onClick={handlePrev} className="p-1 hover:bg-slate-100 rounded-lg"><ChevronLeft size={20} /></button>
            <span className="font-semibold text-slate-700 min-w-[140px] text-center">
              {currentDate.toLocaleDateString('en-IN', { month: 'long', year: 'numeric' })}
            </span>
            <button onClick={handleNext} className="p-1 hover:bg-slate-100 rounded-lg"><ChevronRight size={20} /></button>
          </div>
          
          <button 
            onClick={handleAddEvent}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl font-medium flex items-center gap-2 shadow-lg shadow-blue-200 transition-all"
          >
            <Plus size={20} />
            <span className="hidden sm:inline">{strings.addEvent}</span>
          </button>
        </div>
      </div>

      {/* Calendar Grid */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 flex-1 overflow-hidden flex flex-col">
        
        {/* Days Header */}
        <div className="grid grid-cols-7 border-b border-slate-200 bg-slate-50">
           {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day, i) => (
              <div key={day} className={`py-3 text-center text-xs font-bold text-slate-500 uppercase ${i===0 || i===6 ? 'bg-slate-50/50' : ''}`}>
                 {day}
              </div>
           ))}
        </div>

        {/* MONTH VIEW */}
        {view === 'Month' && (
          <div className="grid grid-cols-7 flex-1 auto-rows-fr">
            {getDaysInMonth(currentDate).map((date, idx) => (
               <div key={idx} className={`min-h-[100px] border-b border-r border-slate-100 p-2 relative group hover:bg-slate-50/30 transition-colors ${!date ? 'bg-slate-50/30' : ''}`}>
                  {date && (
                    <>
                      <div className={`text-sm font-medium mb-1 ${
                        date.toDateString() === new Date().toDateString() 
                          ? 'w-7 h-7 bg-blue-600 text-white rounded-full flex items-center justify-center shadow-md shadow-blue-200' 
                          : 'text-slate-700'
                      }`}>
                        {date.getDate()}
                      </div>
                      <div className="space-y-1">
                         {filteredEvents(date).map(ev => (
                           <div 
                             key={ev.id} 
                             onClick={(e) => { e.stopPropagation(); handleEventClick(ev); }}
                             className={`text-[10px] px-2 py-1 rounded border truncate cursor-pointer font-medium hover:brightness-95 transition-all ${EVENT_COLORS[ev.type]}`}
                             title={ev.title}
                           >
                             {ev.startTime} {ev.title}
                           </div>
                         ))}
                      </div>
                    </>
                  )}
               </div>
            ))}
          </div>
        )}

        {/* WEEK VIEW */}
        {view === 'Week' && (
           <div className="flex-1 overflow-y-auto">
              {/* Desktop Time Grid */}
              <div className="hidden md:grid grid-cols-7 min-h-[600px]">
                 {getWeekDays().map((day, idx) => {
                   const dayEvents = filteredEvents(day);
                   const isToday = day.toDateString() === new Date().toDateString();
                   return (
                     <div key={idx} className="border-r border-slate-100 min-h-full relative group">
                        <div className={`text-center py-2 border-b border-slate-100 sticky top-0 bg-white z-10 ${isToday ? 'bg-blue-50' : ''}`}>
                           <div className={`text-xs uppercase font-bold ${isToday ? 'text-blue-600' : 'text-slate-500'}`}>{day.toLocaleDateString('en-IN', { weekday: 'short' })}</div>
                           <div className={`text-lg font-bold ${isToday ? 'text-blue-600' : 'text-slate-800'}`}>{day.getDate()}</div>
                        </div>
                        {/* Time Slots (simplified for visual mock) */}
                        <div className="relative h-full p-1 pt-2 space-y-2">
                           {dayEvents.map(ev => (
                              <div 
                                key={ev.id}
                                onClick={() => handleEventClick(ev)}
                                className={`p-2 rounded-lg border text-xs cursor-pointer shadow-sm hover:shadow-md transition-all ${EVENT_COLORS[ev.type]}`}
                              >
                                 <div className="font-bold mb-0.5">{ev.startTime}</div>
                                 <div className="font-semibold truncate">{ev.title}</div>
                                 {ev.caseTitle && <div className="opacity-75 truncate text-[10px]">{ev.caseTitle}</div>}
                              </div>
                           ))}
                           {/* Empty slot indicators for visual structure */}
                           {[9, 10, 11, 12, 13, 14, 15, 16, 17].map(hour => (
                             <div key={hour} className="absolute w-full border-t border-slate-50 border-dashed left-0" style={{ top: `${(hour - 8) * 60}px` }}></div>
                           ))}
                        </div>
                     </div>
                   );
                 })}
              </div>

              {/* Mobile Week List */}
              <div className="md:hidden space-y-4 p-4">
                 {getWeekDays().map((day, idx) => {
                    const dayEvents = filteredEvents(day);
                    const isToday = day.toDateString() === new Date().toDateString();
                    return (
                       <div key={idx} className={`rounded-xl border ${isToday ? 'border-blue-200 bg-blue-50/30' : 'border-slate-100 bg-white'}`}>
                          <div className="p-3 border-b border-slate-100/50 flex items-center justify-between">
                             <div className="flex items-center gap-2">
                                <span className={`text-sm font-bold ${isToday ? 'text-blue-600' : 'text-slate-500'}`}>{day.toLocaleDateString('en-IN', { weekday: 'short' })}</span>
                                <span className={`text-sm font-bold ${isToday ? 'text-blue-900' : 'text-slate-900'}`}>{day.getDate()} {day.toLocaleDateString('en-IN', { month: 'short' })}</span>
                             </div>
                             {isToday && <span className="text-[10px] font-bold bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full">Today</span>}
                          </div>
                          <div className="p-2 space-y-2">
                             {dayEvents.length > 0 ? dayEvents.map(ev => (
                                <div 
                                  key={ev.id} 
                                  onClick={() => handleEventClick(ev)}
                                  className={`p-3 rounded-lg border flex items-center gap-3 ${EVENT_COLORS[ev.type]}`}
                                >
                                   <div className="flex flex-col items-center min-w-[40px] border-r border-black/10 pr-3">
                                      <span className="text-xs font-bold">{ev.startTime}</span>
                                      <span className="text-[10px] opacity-70">{ev.endTime}</span>
                                   </div>
                                   <div className="min-w-0">
                                      <h4 className="text-sm font-bold truncate">{ev.title}</h4>
                                      <p className="text-xs opacity-80 truncate">{ev.type} • {ev.caseTitle || 'No Case Linked'}</p>
                                   </div>
                                </div>
                             )) : (
                                <div className="text-xs text-center py-2 text-slate-400">No events scheduled</div>
                             )}
                          </div>
                       </div>
                    );
                 })}
              </div>
           </div>
        )}
      </div>

      {/* Add/Edit Event Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in">
           <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full overflow-hidden flex flex-col max-h-[90vh]">
              <div className="p-5 border-b border-slate-100 flex justify-between items-center bg-slate-50">
                 <h2 className="text-xl font-bold text-slate-800">{selectedEvent ? 'Edit Event' : strings.addEvent}</h2>
                 <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-700 p-1 hover:bg-slate-200 rounded-full">
                    <X size={20} />
                 </button>
              </div>
              
              <form onSubmit={handleSave} className="p-6 overflow-y-auto flex-1 space-y-5">
                 
                 {/* Title */}
                 <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Event Title *</label>
                    <input 
                      type="text" 
                      required
                      value={formData.title || ''}
                      onChange={e => setFormData({...formData, title: e.target.value})}
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-100 focus:border-blue-500 outline-none"
                      placeholder="e.g. Bail Hearing"
                    />
                 </div>

                 {/* Type & Case Link */}
                 <div className="grid grid-cols-2 gap-4">
                    <div>
                       <label className="block text-sm font-medium text-slate-700 mb-1">{strings.eventType}</label>
                       <select 
                         value={formData.type}
                         onChange={e => setFormData({...formData, type: e.target.value as EventType})}
                         className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-100 focus:border-blue-500 outline-none"
                       >
                         {Object.keys(EVENT_COLORS).map(type => (
                           <option key={type} value={type}>{type}</option>
                         ))}
                       </select>
                    </div>
                    <div>
                       <label className="block text-sm font-medium text-slate-700 mb-1">
                          {strings.linkedCase} {['Hearing', 'Evidence', 'Filing', 'Judgment'].includes(formData.type!) && <span className="text-red-500">*</span>}
                       </label>
                       <select 
                         value={formData.caseId || ''}
                         onChange={e => setFormData({...formData, caseId: e.target.value})}
                         className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-100 focus:border-blue-500 outline-none"
                         required={['Hearing', 'Evidence', 'Filing', 'Judgment'].includes(formData.type!)}
                       >
                         <option value="">Select Case...</option>
                         {cases.map(c => <option key={c.id} value={c.id}>{c.title}</option>)}
                       </select>
                    </div>
                 </div>

                 {/* Date & Time */}
                 <div className="grid grid-cols-3 gap-4">
                    <div className="col-span-1">
                       <label className="block text-sm font-medium text-slate-700 mb-1">Date</label>
                       <input 
                         type="date" 
                         required
                         value={formData.date}
                         onChange={e => setFormData({...formData, date: e.target.value})}
                         className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg outline-none" 
                       />
                    </div>
                    <div className="col-span-1">
                       <label className="block text-sm font-medium text-slate-700 mb-1">Start</label>
                       <input 
                         type="time" 
                         required
                         value={formData.startTime}
                         onChange={e => setFormData({...formData, startTime: e.target.value})}
                         className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg outline-none" 
                       />
                    </div>
                    <div className="col-span-1">
                       <label className="block text-sm font-medium text-slate-700 mb-1">End</label>
                       <input 
                         type="time" 
                         required
                         value={formData.endTime}
                         onChange={e => setFormData({...formData, endTime: e.target.value})}
                         className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg outline-none" 
                       />
                    </div>
                 </div>

                 {/* Description */}
                 <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Description</label>
                    <textarea 
                      rows={3}
                      value={formData.description || ''}
                      onChange={e => setFormData({...formData, description: e.target.value})}
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-100 focus:border-blue-500 outline-none resize-none" 
                    ></textarea>
                 </div>

                 {/* Reminders Section */}
                 <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                    <h3 className="font-bold text-slate-800 mb-3 flex items-center gap-2">
                       <Bell size={16} /> {strings.reminders}
                    </h3>
                    
                    <div className="space-y-3">
                       {/* Email (Free) */}
                       <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                             <div className="p-1.5 bg-white border border-slate-200 rounded text-slate-600"><Mail size={16} /></div>
                             <span className="text-sm font-medium text-slate-700">Email Notification</span>
                          </div>
                          <div className="relative inline-block w-10 h-6 align-middle select-none transition duration-200 ease-in">
                             <input 
                               type="checkbox" 
                               checked={formData.reminders?.email}
                               onChange={e => setFormData({...formData, reminders: {...formData.reminders!, email: e.target.checked}})}
                               className="toggle-checkbox absolute block w-4 h-4 rounded-full bg-white border-4 appearance-none cursor-pointer translate-x-0.5 top-1 checked:translate-x-4 transition-transform duration-200"
                               style={{backgroundColor: formData.reminders?.email ? '#2563EB' : '#CBD5E1'}}
                             />
                             <label className={`toggle-label block overflow-hidden h-6 rounded-full bg-slate-200 cursor-pointer ${formData.reminders?.email ? 'bg-blue-200' : ''}`}></label>
                          </div>
                       </div>

                       {/* SMS (Pro) */}
                       <div className="flex items-center justify-between opacity-90">
                          <div className="flex items-center gap-3">
                             <div className="p-1.5 bg-white border border-slate-200 rounded text-slate-600"><MessageSquare size={16} /></div>
                             <span className="text-sm font-medium text-slate-700">SMS Reminder <span className="text-[10px] bg-slate-900 text-white px-1.5 py-0.5 rounded ml-1">PRO</span></span>
                          </div>
                          <div onClick={handleLockedFeature} className="relative cursor-pointer">
                             {isProPlan ? (
                               <div className="relative inline-block w-10 h-6 align-middle select-none">
                                 <input 
                                   type="checkbox" 
                                   checked={formData.reminders?.sms}
                                   onChange={e => setFormData({...formData, reminders: {...formData.reminders!, sms: e.target.checked}})}
                                   className="absolute block w-4 h-4 rounded-full bg-white border-4 appearance-none cursor-pointer translate-x-0.5 top-1 checked:translate-x-4 transition-transform duration-200"
                                   style={{backgroundColor: formData.reminders?.sms ? '#2563EB' : '#CBD5E1'}}
                                 />
                                 <label className={`block overflow-hidden h-6 rounded-full bg-slate-200 ${formData.reminders?.sms ? 'bg-blue-200' : ''}`}></label>
                               </div>
                             ) : (
                               <Lock size={18} className="text-slate-400" />
                             )}
                          </div>
                       </div>

                       {/* WhatsApp (Pro) */}
                       <div className="flex items-center justify-between opacity-90">
                          <div className="flex items-center gap-3">
                             <div className="p-1.5 bg-white border border-slate-200 rounded text-slate-600"><Smartphone size={16} /></div>
                             <span className="text-sm font-medium text-slate-700">WhatsApp <span className="text-[10px] bg-slate-900 text-white px-1.5 py-0.5 rounded ml-1">PRO</span></span>
                          </div>
                          <div onClick={handleLockedFeature} className="relative cursor-pointer">
                             {isProPlan ? (
                               <div className="relative inline-block w-10 h-6 align-middle select-none">
                                 <input 
                                   type="checkbox" 
                                   checked={formData.reminders?.whatsapp}
                                   onChange={e => setFormData({...formData, reminders: {...formData.reminders!, whatsapp: e.target.checked}})}
                                   className="absolute block w-4 h-4 rounded-full bg-white border-4 appearance-none cursor-pointer translate-x-0.5 top-1 checked:translate-x-4 transition-transform duration-200"
                                   style={{backgroundColor: formData.reminders?.whatsapp ? '#2563EB' : '#CBD5E1'}}
                                 />
                                 <label className={`block overflow-hidden h-6 rounded-full bg-slate-200 ${formData.reminders?.whatsapp ? 'bg-blue-200' : ''}`}></label>
                               </div>
                             ) : (
                               <Lock size={18} className="text-slate-400" />
                             )}
                          </div>
                       </div>

                       {/* Pro Timing Config */}
                       {isProPlan && (formData.reminders?.sms || formData.reminders?.whatsapp) && (
                          <div className="mt-2 pt-2 border-t border-slate-200/50">
                             <label className="text-xs font-semibold text-slate-500 mb-1 block">Remind me:</label>
                             <div className="flex gap-2">
                                {[60, 180, 1440].map(time => (
                                   <button 
                                     key={time}
                                     type="button"
                                     onClick={() => setFormData({...formData, reminders: {...formData.reminders!, reminderTime: time}})}
                                     className={`px-3 py-1 text-xs rounded-full border ${
                                       formData.reminders?.reminderTime === time 
                                         ? 'bg-blue-600 text-white border-blue-600' 
                                         : 'bg-white text-slate-600 border-slate-200'
                                     }`}
                                   >
                                      {time === 60 ? '1 Hour' : time === 180 ? '3 Hours' : '1 Day'}
                                   </button>
                                ))}
                             </div>
                          </div>
                       )}
                    </div>
                 </div>
              </form>

              <div className="p-4 border-t border-slate-100 bg-white flex justify-end gap-3">
                 <button onClick={() => setIsModalOpen(false)} className="px-5 py-2.5 text-slate-600 font-medium hover:bg-slate-50 rounded-xl transition-colors">
                    Cancel
                 </button>
                 <button onClick={handleSave} className="px-6 py-2.5 bg-blue-600 text-white font-medium rounded-xl hover:bg-blue-700 shadow-lg shadow-blue-200 transition-all">
                    {strings.saveEvent}
                 </button>
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
             <h2 className="text-2xl font-bold text-slate-800 mb-2">Automated Reminders</h2>
             <p className="text-slate-500 mb-8">Reduce no-shows by sending WhatsApp & SMS reminders directly to clients. Available on Pro Plan.</p>
             <button onClick={() => setShowUpsell(false)} className="w-full py-3 bg-slate-900 text-white rounded-xl font-bold hover:bg-slate-800 transition-all">
               Maybe Later
             </button>
          </div>
        </div>
      )}

    </div>
  );
};