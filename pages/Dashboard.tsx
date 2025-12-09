import React from 'react';
import { 
  TrendingUp, 
  Users, 
  Briefcase, 
  Clock,
  ArrowUpRight,
  Gavel
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { LanguageStrings, Case } from '../types';

interface DashboardProps {
  strings: LanguageStrings;
  cases: Case[];
}

export const Dashboard: React.FC<DashboardProps> = ({ strings, cases }) => {
  const stats = [
    { label: strings.totalCases, value: cases.length.toString(), icon: Briefcase, color: 'text-blue-600', bg: 'bg-blue-50' },
    { label: strings.activeClients, value: '42', icon: Users, color: 'text-emerald-600', bg: 'bg-emerald-50' },
    { label: strings.upcomingHearings, value: '8', icon: Gavel, color: 'text-amber-600', bg: 'bg-amber-50' },
    { label: strings.revenue, value: '₹1.2L', icon: TrendingUp, color: 'text-purple-600', bg: 'bg-purple-50' },
  ];

  const chartData = [
    { name: 'Mon', cases: 4 },
    { name: 'Tue', cases: 3 },
    { name: 'Wed', cases: 7 },
    { name: 'Thu', cases: 2 },
    { name: 'Fri', cases: 6 },
    { name: 'Sat', cases: 1 },
  ];

  return (
    <div className="p-6 md:p-8 space-y-8 animate-fade-in">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">{strings.welcome}</h1>
          <p className="text-slate-500">Here is what is happening today.</p>
        </div>
        <div className="text-sm text-slate-500 bg-white px-4 py-2 rounded-full shadow-sm border border-slate-200">
          {new Date().toLocaleDateString('en-IN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <div key={idx} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start">
                <div className={`${stat.bg} p-3 rounded-xl`}>
                  <Icon className={stat.color} size={24} />
                </div>
                <span className="flex items-center text-xs font-medium text-green-600 bg-green-50 px-2 py-1 rounded-full">
                  +12% <ArrowUpRight size={12} className="ml-1" />
                </span>
              </div>
              <div className="mt-4">
                <h3 className="text-2xl font-bold text-slate-800">{stat.value}</h3>
                <p className="text-slate-500 text-sm mt-1">{stat.label}</p>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Hearings */}
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-bold text-slate-800">{strings.upcomingHearings}</h2>
            <button className="text-sm text-blue-600 font-medium hover:underline">View All</button>
          </div>
          <div className="space-y-4">
            {cases.slice(0, 3).map((c, i) => (
              <div key={i} className="flex items-center justify-between p-4 rounded-xl border border-slate-100 hover:bg-slate-50 transition-colors">
                <div className="flex items-center gap-4">
                  <div className="bg-blue-100 text-blue-600 p-3 rounded-lg font-bold text-center min-w-[60px]">
                    <div className="text-xs uppercase">{new Date(c.nextHearing).toLocaleString('default', { month: 'short' })}</div>
                    <div className="text-lg">{new Date(c.nextHearing).getDate()}</div>
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-800">{c.title}</h4>
                    <div className="flex items-center gap-2 text-sm text-slate-500 mt-1">
                      <span className="bg-slate-100 px-2 py-0.5 rounded text-xs">{c.court}</span>
                      <span>•</span>
                      <span>{c.cnrNumber}</span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-800">
                    {c.status}
                  </span>
                  <div className="text-xs text-slate-400 mt-2 flex items-center justify-end gap-1">
                    <Clock size={12} /> 10:30 AM
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Chart */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <h2 className="text-lg font-bold text-slate-800 mb-6">Case Activity</h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                <Tooltip cursor={{fill: '#f8fafc'}} contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}} />
                <Bar dataKey="cases" fill="#3b82f6" radius={[4, 4, 0, 0]} barSize={30} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};