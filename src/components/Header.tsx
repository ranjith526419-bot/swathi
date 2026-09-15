import React from 'react';
import { 
  LayoutDashboard, 
  Activity, 
  Cpu, 
  BellRing, 
  LineChart, 
  Fan, 
  Info,
  Sliders,
  ShieldCheck,
  AlertTriangle,
  Flame,
  Radio
} from 'lucide-react';
import { RiskLevel } from '../types';

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  currentRisk: RiskLevel;
  alertActive: boolean;
  simulationAutoRunning: boolean;
  onToggleSimDrawer: () => void;
  currentTimeStr: string;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  currentRisk,
  alertActive,
  simulationAutoRunning,
  onToggleSimDrawer,
  currentTimeStr,
}) => {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'live', label: 'Live Monitoring', icon: Activity },
    { id: 'ai-prediction', label: 'AI Prediction', icon: Cpu },
    { id: 'alerts', label: 'Alerts', icon: BellRing, badge: alertActive },
    { id: 'history', label: 'History', icon: LineChart },
    { id: 'fan-control', label: 'Fan Control', icon: Fan },
    { id: 'project-info', label: 'Project Info', icon: Info },
  ];

  return (
    <header className="bg-slate-900/95 border-b border-slate-800 text-slate-100 sticky top-0 z-40 backdrop-blur-md shadow-lg">
      {/* Top Telemetry & Status Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between py-3 gap-3 border-b border-slate-800/80">
          {/* Logo & Title */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center shadow-md shadow-orange-500/20 border border-amber-400/30">
              <Flame className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-lg font-bold tracking-tight text-white flex items-center gap-2">
                  Smart Industrial Air &amp; Heat Risk Monitoring System
                </h1>
                <span className="hidden sm:inline-flex items-center px-2 py-0.5 rounded text-xs font-semibold bg-amber-950/80 text-amber-400 border border-amber-700/50">
                  Goldsmith Workshop Edition
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Goldsmith Workstation &amp; Jewelry Metallurgy • Torch Heat, Soldering Fumes &amp; Suction Telemetry
              </p>
            </div>
          </div>

          {/* Right Status Badges & Quick Controls */}
          <div className="flex items-center flex-wrap gap-2">
            {/* Simulation Status */}
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-slate-800 border border-slate-700 text-xs">
              <span className={`w-2 h-2 rounded-full ${simulationAutoRunning ? 'bg-emerald-400 animate-ping' : 'bg-amber-400'}`}></span>
              <Radio className="w-3.5 h-3.5 text-slate-400" />
              <span className="text-slate-300 font-medium">
                {simulationAutoRunning ? 'Live Sim Running' : 'Manual Sim Mode'}
              </span>
            </div>

            {/* Current Risk Badge */}
            <div 
              className={`flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-bold border transition-colors ${
                currentRisk === 'HIGH'
                  ? 'bg-red-950/80 border-red-500/80 text-red-300 animate-pulse'
                  : currentRisk === 'MEDIUM'
                  ? 'bg-amber-950/80 border-amber-500/80 text-amber-300'
                  : 'bg-emerald-950/80 border-emerald-500/80 text-emerald-300'
              }`}
            >
              {currentRisk === 'HIGH' ? (
                <AlertTriangle className="w-3.5 h-3.5 text-red-400" />
              ) : (
                <ShieldCheck className="w-3.5 h-3.5" />
              )}
              <span>
                {currentRisk === 'HIGH' ? '🔴 HIGH RISK' : currentRisk === 'MEDIUM' ? '🟡 MEDIUM RISK' : '🟢 LOW RISK'}
              </span>
            </div>

            {/* Live Clock */}
            <div className="hidden lg:flex items-center px-2.5 py-1 rounded-md bg-slate-850 bg-slate-800/60 border border-slate-700/60 text-xs text-slate-300 font-mono">
              {currentTimeStr}
            </div>

            {/* Sim Control Drawer Button */}
            <button
              id="header-toggle-sim-btn"
              onClick={onToggleSimDrawer}
              className="flex items-center gap-1.5 px-3 py-1 bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold rounded-md transition-all shadow-sm shadow-amber-500/20 active:scale-95 cursor-pointer"
              title="Open Environmental Simulation Controls"
            >
              <Sliders className="w-3.5 h-3.5" />
              <span>Simulate Sensors</span>
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <nav className="flex items-center space-x-1 overflow-x-auto py-2.5 scrollbar-none text-xs sm:text-sm font-medium">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                id={`nav-tab-${item.id}`}
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-all whitespace-nowrap cursor-pointer ${
                  isActive
                    ? 'bg-amber-500/15 text-amber-400 font-semibold border border-amber-500/30 shadow-inner'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-amber-400' : 'text-slate-400'}`} />
                <span>{item.label}</span>
                {item.badge && (
                  <span className="w-2 h-2 rounded-full bg-red-500 animate-ping ml-0.5"></span>
                )}
              </button>
            );
          })}
        </nav>
      </div>
    </header>
  );
};
