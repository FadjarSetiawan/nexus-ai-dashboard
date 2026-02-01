import React, { useState } from 'react';
import { LayoutDashboard, Users, Settings, Sun, Moon, Bell, ShieldAlert, Filter, Activity } from 'lucide-react';
import AgentCard from './components/AgentCard';
import LogConsole from './components/LogConsole';
import { ThemeProvider, useTheme } from './context/ThemeContext';

// --- DATA DUMMY ---
const AGENTS = [
  { id: 1, name: 'Alpha-1', role: 'NLP Processor', status: 'active', uptime: '48h 12m' },
  { id: 2, name: 'Beta-X', role: 'Image Recognition', status: 'idle', uptime: '12h 05m' },
  { id: 3, name: 'Gamma-Ray', role: 'Data Miner', status: 'active', uptime: '72h 00m' },
  { id: 4, name: 'Delta-Core', role: 'Security Bot', status: 'error', uptime: '0h 00m' },
  { id: 5, name: 'Epsilon-V', role: 'Chat Assistant', status: 'active', uptime: '24h 45m' },
  { id: 6, name: 'Zeta-Prime', role: 'Payment Gateway', status: 'idle', uptime: '5h 30m' },
] as const;

// --- KOMPONEN KONTEN UTAMA ---
const DashboardContent = () => {
  const { theme, toggleTheme } = useTheme();
  
  // STATE MANAGEMENT (Disini letak "Otak"-nya)
  const [activeTab, setActiveTab] = useState<'dashboard' | 'agents' | 'settings'>('dashboard');
  const [filterStatus, setFilterStatus] = useState<'all' | 'active' | 'error'>('all');

  // LOGIKA FILTERING
  const filteredAgents = AGENTS.filter(agent => {
    if (filterStatus === 'all') return true;
    return agent.status === filterStatus;
  });

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-nexus-900 transition-colors duration-300 flex font-sans">
      
      {/* --- SIDEBAR NAVIGASI --- */}
      <aside className="hidden md:flex flex-col w-64 bg-white dark:bg-nexus-800 border-r border-slate-200 dark:border-slate-700 p-6 shadow-xl z-10">
        <div className="flex items-center gap-3 mb-10">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/30">
            <Activity className="text-white w-6 h-6" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-slate-800 dark:text-white tracking-wider">NEXUS AI</h1>
            <p className="text-[10px] text-slate-500 font-mono tracking-widest uppercase">System v2.0</p>
          </div>
        </div>

        <nav className="space-y-2 flex-1">
          <NavItem 
            icon={<LayoutDashboard />} 
            label="Monitor" 
            active={activeTab === 'dashboard'} 
            onClick={() => setActiveTab('dashboard')}
          />
          <NavItem 
            icon={<Users />} 
            label="All Agents" 
            active={activeTab === 'agents'} 
            onClick={() => setActiveTab('agents')}
          />
          <NavItem 
            icon={<Settings />} 
            label="Settings" 
            active={activeTab === 'settings'} 
            onClick={() => setActiveTab('settings')}
          />
        </nav>
      </aside>

      {/* --- KONTEN KANAN --- */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden">
        
        {/* HEADER */}
        <header className="h-20 border-b border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-nexus-900/50 backdrop-blur-md flex justify-between items-center px-8 shrink-0">
          <div>
            <h2 className="text-2xl font-bold text-slate-800 dark:text-white capitalize">
              {activeTab === 'dashboard' ? 'Command Center' : activeTab}
            </h2>
            <p className="text-slate-500 dark:text-slate-400 text-xs mt-1">
              Connect to secure server: <span className="text-green-500 font-mono">192.168.1.1 (Stable)</span>
            </p>
          </div>

          <div className="flex items-center gap-4">
            <button className="p-2 text-slate-400 hover:text-blue-500 transition-colors relative">
              <Bell className="w-6 h-6" />
              <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
            </button>
            <button 
              onClick={toggleTheme}
              className="p-2 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-yellow-400 hover:scale-110 transition-transform shadow-sm"
            >
              {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
          </div>
        </header>

        {/* SCROLLABLE AREA */}
        <div className="flex-1 overflow-y-auto p-4 md:p-8">

          {/* === HALAMAN DASHBOARD === */}
          {activeTab === 'dashboard' && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
              
              {/* KOLOM KIRI: FILTER & GRID */}
              <div className="lg:col-span-2 space-y-6">
                
                {/* FILTER BUTTONS (FITUR BARU) */}
                <div className="flex gap-3 overflow-x-auto pb-2">
                   <FilterBtn 
                      label="All Systems" 
                      active={filterStatus === 'all'} 
                      onClick={() => setFilterStatus('all')} 
                   />
                   <FilterBtn 
                      label="Active Only" 
                      active={filterStatus === 'active'} 
                      onClick={() => setFilterStatus('active')} 
                      color="green"
                   />
                   <FilterBtn 
                      label="Critical Errors" 
                      active={filterStatus === 'error'} 
                      onClick={() => setFilterStatus('error')} 
                      color="red"
                   />
                </div>

                {/* GRID AGENTS */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {filteredAgents.length > 0 ? (
                    filteredAgents.map((agent) => (
                      <div key={agent.id} onClick={() => alert(`Connecting to terminal: ${agent.name}...`)} className="cursor-pointer">
                        <AgentCard {...agent} />
                      </div>
                    ))
                  ) : (
                    <div className="col-span-2 p-12 text-center border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-xl">
                      <p className="text-slate-500">No agents found with this status.</p>
                    </div>
                  )}
                </div>
              </div>

              {/* KOLOM KANAN: SIDEBAR WIDGETS */}
              <div className="lg:col-span-1 space-y-6">
                <LogConsole />
                
                {/* STATUS CARD */}
                <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl p-6 text-white shadow-2xl relative overflow-hidden group">
                  <div className="relative z-10">
                    <div className="flex items-center gap-2 mb-2 opacity-80">
                      <ShieldAlert className="w-5 h-5" />
                      <span className="text-sm font-semibold tracking-wider">SYSTEM STATUS</span>
                    </div>
                    <div className="text-4xl font-black mb-1">98.4%</div>
                    <p className="text-blue-100 text-sm">Operational capability is optimal.</p>
                  </div>
                  {/* Dekorasi Background */}
                  <Activity className="absolute -right-4 -bottom-4 w-32 h-32 text-white opacity-10 group-hover:scale-110 transition-transform duration-500" />
                </div>
              </div>
            </div>
          )}

          {/* === HALAMAN AGENTS (PLACEHOLDER) === */}
          {activeTab === 'agents' && (
            <div className="bg-white dark:bg-slate-800 p-8 rounded-xl border border-slate-200 dark:border-slate-700 text-center">
              <Users className="w-16 h-16 mx-auto text-slate-300 mb-4" />
              <h3 className="text-xl font-bold text-slate-700 dark:text-slate-200">Full Agent Directory</h3>
              <p className="text-slate-500">This module is under development for Phase 2.</p>
            </div>
          )}

          {/* === HALAMAN SETTINGS (PLACEHOLDER) === */}
          {activeTab === 'settings' && (
            <div className="bg-white dark:bg-slate-800 p-8 rounded-xl border border-slate-200 dark:border-slate-700">
              <h3 className="text-xl font-bold text-slate-700 dark:text-slate-200 mb-6">System Configuration</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center p-4 bg-slate-50 dark:bg-slate-900 rounded-lg">
                  <span>Enable Auto-Healing</span>
                  <div className="w-10 h-5 bg-green-500 rounded-full relative"><div className="w-4 h-4 bg-white rounded-full absolute right-0.5 top-0.5 shadow"></div></div>
                </div>
                <div className="flex justify-between items-center p-4 bg-slate-50 dark:bg-slate-900 rounded-lg">
                  <span>Notifications</span>
                  <div className="w-10 h-5 bg-slate-300 dark:bg-slate-600 rounded-full relative"><div className="w-4 h-4 bg-white rounded-full absolute left-0.5 top-0.5 shadow"></div></div>
                </div>
              </div>
            </div>
          )}

        </div>
      </main>
    </div>
  );
};

// --- KOMPONEN KECIL (HELPER COMPONENTS) ---

const NavItem = ({ icon, label, active = false, onClick }: { icon: any, label: string, active?: boolean, onClick: () => void }) => (
  <button 
    onClick={onClick}
    className={`w-full flex items-center gap-3 p-3 rounded-lg transition-all duration-200 ${
    active 
      ? 'bg-blue-50 dark:bg-blue-600 text-blue-600 dark:text-white font-semibold shadow-md translate-x-1' 
      : 'text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700/50 hover:text-slate-900 dark:hover:text-slate-200'
  }`}>
    {icon}
    <span>{label}</span>
  </button>
);

const FilterBtn = ({ label, active, onClick, color = 'blue' }: { label: string, active: boolean, onClick: () => void, color?: string }) => (
  <button
    onClick={onClick}
    className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
      active
        ? 'bg-slate-800 text-white dark:bg-white dark:text-slate-900 shadow-lg scale-105'
        : 'bg-white text-slate-600 border border-slate-200 dark:bg-slate-800 dark:border-slate-700 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700'
    }`}
  >
    {label}
  </button>
);

// --- APP ROOT ---
function App() {
  return (
    <ThemeProvider>
      <DashboardContent />
    </ThemeProvider>
  );
}

export default App;