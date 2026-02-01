import React from 'react';
import { Cpu, Activity, AlertCircle } from 'lucide-react';
import { clsx } from 'clsx'; // Utility untuk menggabungkan class dengan rapi

interface AgentCardProps {
  name: string;
  role: string;
  status: 'active' | 'idle' | 'error';
  uptime: string;
}

const AgentCard: React.FC<AgentCardProps> = ({ name, role, status, uptime }) => {
  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg border border-slate-200 dark:border-slate-700 transition-all hover:scale-105">
      <div className="flex justify-between items-start mb-4">
        <div className="p-3 bg-blue-100 dark:bg-slate-700 rounded-lg">
          <Cpu className="w-6 h-6 text-blue-600 dark:text-blue-400" />
        </div>
        
        {/* Badge Status Dinamis */}
        <span className={clsx(
          "px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider",
          status === 'active' && "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
          status === 'idle' && "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400",
          status === 'error' && "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
        )}>
          {status}
        </span>
      </div>

      <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-1">{name}</h3>
      <p className="text-slate-500 dark:text-slate-400 text-sm mb-4">{role}</p>

      <div className="flex items-center text-sm text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-slate-900/50 p-2 rounded-md">
        {status === 'error' ? (
           <AlertCircle className="w-4 h-4 mr-2 text-red-500" />
        ) : (
           <Activity className="w-4 h-4 mr-2 text-green-500" />
        )}
        <span>Uptime: <span className="font-mono font-semibold">{uptime}</span></span>
      </div>
    </div>
  );
};

export default AgentCard;