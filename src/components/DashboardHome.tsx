import React from 'react';
import { 
  Thermometer, 
  Wind, 
  Clock, 
  AlertOctagon, 
  Fan, 
  ShieldCheck, 
  Activity, 
  ArrowUpRight,
  Cpu,
  Sliders,
  CheckCircle2,
  AlertTriangle
} from 'lucide-react';
import { RiskEvaluation, RiskLevel } from '../types';

interface DashboardHomeProps {
  temperature: number;
  airQuality: number;
  exposureDuration: number;
  riskEvaluation: RiskEvaluation;
  fanStatus: 'ON' | 'OFF';
  fanSpeed: number;
  autoFan: boolean;
  onNavigate: (tab: string) => void;
  onOpenSimulation: () => void;
}

export const DashboardHome: React.FC<DashboardHomeProps> = ({
  temperature,
  airQuality,
  exposureDuration,
  riskEvaluation,
  fanStatus,
  fanSpeed,
  autoFan,
  onNavigate,
  onOpenSimulation,
}) => {
  const { riskLevel, alertActive, criticalFactor } = riskEvaluation;

  // Determine Risk styling
  const getRiskDisplay = (level: RiskLevel) => {
    switch (level) {
      case 'HIGH':
        return {
          icon: AlertTriangle,
          badge: '🔴 HIGH',
          cardBg: 'bg-red-950/20 border-red-500/40 text-red-400',
          textColor: 'text-red-400',
          desc: 'Critical risk! Heat stress & toxicity threshold exceeded.',
        };
      case 'MEDIUM':
        return {
          icon: AlertOctagon,
          badge: '🟡 MEDIUM',
          cardBg: 'bg-amber-950/20 border-amber-500/40 text-amber-400',
          textColor: 'text-amber-400',
          desc: 'Moderate caution. Elevated workplace stress factors.',
        };
      case 'LOW':
      default:
        return {
          icon: ShieldCheck,
          badge: '🟢 LOW',
          cardBg: 'bg-emerald-950/20 border-emerald-500/40 text-emerald-400',
          textColor: 'text-emerald-400',
          desc: 'Safe operating parameters within OSHA standards.',
        };
    }
  };

  const riskInfo = getRiskDisplay(riskLevel);

  return (
    <div className="space-y-6">
      {/* Short System Status Message Banner (Required by prompt) */}
      <div 
        id="system-status-banner"
        className={`p-4 rounded-xl border flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-md ${
          alertActive 
            ? 'bg-red-950/40 border-red-500/50 text-red-200' 
            : 'bg-slate-800/80 border-slate-700 text-slate-200'
        }`}
      >
        <div className="flex items-center gap-3">
          <div className={`p-2.5 rounded-lg ${alertActive ? 'bg-red-500/20 text-red-400' : 'bg-cyan-500/20 text-cyan-400'}`}>
            <Activity className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-semibold text-slate-100 text-base">
                Monitoring environmental conditions in real time.
              </span>
              <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Goldsmith workshop environmental telemetry active. Soldering torch heat, flux fumes &amp; automated suction hood sync enabled.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 self-end sm:self-auto">
          <button
            id="dash-open-sim-btn"
            onClick={onOpenSimulation}
            className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-700/80 hover:bg-slate-700 text-slate-200 border border-slate-600 transition flex items-center gap-1.5 cursor-pointer"
          >
            <Sliders className="w-3.5 h-3.5 text-amber-400" />
            <span>Simulate Sensor Inputs</span>
          </button>
        </div>
      </div>

      {/* 6 Summary Cards Required by Prompt */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Card 1: Current Temperature */}
        <div 
          id="summary-card-temperature"
          onClick={() => onNavigate('live')}
          className="bg-slate-850 bg-slate-900/90 border border-slate-800 hover:border-slate-700 rounded-xl p-5 shadow-lg transition duration-200 group cursor-pointer"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-lg bg-orange-500/15 text-orange-400 border border-orange-500/20">
                <Thermometer className="w-5 h-5" />
              </div>
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                Current Temperature
              </span>
            </div>
            <ArrowUpRight className="w-4 h-4 text-slate-600 group-hover:text-slate-300 transition" />
          </div>

          <div className="mt-4 flex items-baseline justify-between">
            <div>
              <span className="text-3xl font-extrabold font-mono text-white">
                {temperature.toFixed(1)}
              </span>
              <span className="text-xl font-bold text-slate-400 ml-1">°C</span>
            </div>
            <span className={`text-xs px-2 py-0.5 rounded font-medium ${
              temperature >= 40 
                ? 'bg-red-950 text-red-300 border border-red-800' 
                : temperature >= 35 
                ? 'bg-amber-950 text-amber-300 border border-amber-800' 
                : 'bg-emerald-950 text-emerald-300 border border-emerald-800'
            }`}>
              {temperature >= 40 ? 'Extreme Heat' : temperature >= 35 ? 'Elevated' : 'Comfortable'}
            </span>
          </div>

          {/* Temperature Range Bar */}
          <div className="mt-3">
            <div className="w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
              <div 
                className={`h-1.5 rounded-full transition-all duration-500 ${
                  temperature >= 40 ? 'bg-red-500' : temperature >= 35 ? 'bg-amber-500' : 'bg-emerald-500'
                }`}
                style={{ width: `${Math.min(100, Math.max(10, ((temperature - 20) / (45 - 20)) * 100))}%` }}
              ></div>
            </div>
            <div className="flex justify-between text-[10px] text-slate-500 mt-1 font-mono">
              <span>Safe &lt;35°C</span>
              <span>Warning 35-39°C</span>
              <span>Danger ≥40°C</span>
            </div>
          </div>
        </div>

        {/* Card 2: Air Quality */}
        <div 
          id="summary-card-airquality"
          onClick={() => onNavigate('live')}
          className="bg-slate-850 bg-slate-900/90 border border-slate-800 hover:border-slate-700 rounded-xl p-5 shadow-lg transition duration-200 group cursor-pointer"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-lg bg-cyan-500/15 text-cyan-400 border border-cyan-500/20">
                <Wind className="w-5 h-5" />
              </div>
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                Air Quality
              </span>
            </div>
            <ArrowUpRight className="w-4 h-4 text-slate-600 group-hover:text-slate-300 transition" />
          </div>

          <div className="mt-4 flex items-baseline justify-between">
            <div>
              <span className="text-3xl font-extrabold font-mono text-white">
                {airQuality}
              </span>
              <span className="text-sm font-semibold text-slate-400 ml-1.5">AQI</span>
            </div>
            <span className={`text-xs px-2 py-0.5 rounded font-medium ${
              airQuality >= 80 
                ? 'bg-red-950 text-red-300 border border-red-800' 
                : airQuality >= 60 
                ? 'bg-amber-950 text-amber-300 border border-amber-800' 
                : 'bg-emerald-950 text-emerald-300 border border-emerald-800'
            }`}>
              {airQuality >= 80 ? 'Poor / Particulate' : airQuality >= 60 ? 'Moderate' : 'Good Quality'}
            </span>
          </div>

          <div className="mt-3">
            <div className="w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
              <div 
                className={`h-1.5 rounded-full transition-all duration-500 ${
                  airQuality >= 80 ? 'bg-red-500' : airQuality >= 60 ? 'bg-amber-500' : 'bg-emerald-500'
                }`}
                style={{ width: `${Math.min(100, (airQuality / 120) * 100)}%` }}
              ></div>
            </div>
            <div className="flex justify-between text-[10px] text-slate-500 mt-1 font-mono">
              <span>0-59 Good</span>
              <span>60-79 Moderate</span>
              <span>80+ Poor</span>
            </div>
          </div>
        </div>

        {/* Card 3: Exposure Duration */}
        <div 
          id="summary-card-exposure"
          onClick={() => onNavigate('live')}
          className="bg-slate-850 bg-slate-900/90 border border-slate-800 hover:border-slate-700 rounded-xl p-5 shadow-lg transition duration-200 group cursor-pointer"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-lg bg-indigo-500/15 text-indigo-400 border border-indigo-500/20">
                <Clock className="w-5 h-5" />
              </div>
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                Exposure Duration
              </span>
            </div>
            <ArrowUpRight className="w-4 h-4 text-slate-600 group-hover:text-slate-300 transition" />
          </div>

          <div className="mt-4 flex items-baseline justify-between">
            <div>
              <span className="text-3xl font-extrabold font-mono text-white">
                {exposureDuration}
              </span>
              <span className="text-sm font-semibold text-slate-400 ml-1.5">min</span>
            </div>
            <span className={`text-xs px-2 py-0.5 rounded font-medium ${
              exposureDuration >= 60 
                ? 'bg-red-950 text-red-300 border border-red-800' 
                : exposureDuration >= 30 
                ? 'bg-amber-950 text-amber-300 border border-amber-800' 
                : 'bg-emerald-950 text-emerald-300 border border-emerald-800'
            }`}>
              {exposureDuration >= 60 ? 'Prolonged Shift' : exposureDuration >= 30 ? 'Active Shift' : 'Safe Interval'}
            </span>
          </div>

          <div className="mt-3">
            <div className="w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
              <div 
                className={`h-1.5 rounded-full transition-all duration-500 ${
                  exposureDuration >= 60 ? 'bg-red-500' : exposureDuration >= 30 ? 'bg-amber-500' : 'bg-emerald-500'
                }`}
                style={{ width: `${Math.min(100, (exposureDuration / 90) * 100)}%` }}
              ></div>
            </div>
            <div className="flex justify-between text-[10px] text-slate-500 mt-1 font-mono">
              <span>0-29 Safe</span>
              <span>30-59 Active</span>
              <span>60+ Fatigue</span>
            </div>
          </div>
        </div>

        {/* Card 4: Current Risk */}
        <div 
          id="summary-card-risk"
          onClick={() => onNavigate('ai-prediction')}
          className={`border rounded-xl p-5 shadow-lg transition duration-200 group cursor-pointer ${riskInfo.cardBg}`}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-lg bg-slate-800/80 border border-slate-700">
                <riskInfo.icon className={`w-5 h-5 ${riskInfo.textColor}`} />
              </div>
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-300">
                Current Risk
              </span>
            </div>
            <ArrowUpRight className="w-4 h-4 text-slate-400 group-hover:text-white transition" />
          </div>

          <div className="mt-4 flex items-baseline justify-between">
            <span className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              {riskInfo.badge}
            </span>
            <span className="text-xs font-mono uppercase bg-slate-900/60 px-2 py-0.5 rounded border border-slate-700">
              AI Estimated
            </span>
          </div>

          <p className="mt-3 text-xs text-slate-300 line-clamp-2 leading-relaxed">
            {riskInfo.desc}
          </p>
        </div>

        {/* Card 5: Fan Status */}
        <div 
          id="summary-card-fan"
          onClick={() => onNavigate('fan-control')}
          className="bg-slate-850 bg-slate-900/90 border border-slate-800 hover:border-slate-700 rounded-xl p-5 shadow-lg transition duration-200 group cursor-pointer"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-lg bg-teal-500/15 text-teal-400 border border-teal-500/20">
                <Fan 
                  className={`w-5 h-5 ${fanStatus === 'ON' ? 'fan-spinning' : ''}`}
                  style={{ '--fan-duration': `${Math.max(0.5, 3 - (fanSpeed / 100) * 2.5)}s` } as React.CSSProperties}
                />
              </div>
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                Fan Status
              </span>
            </div>
            <ArrowUpRight className="w-4 h-4 text-slate-600 group-hover:text-slate-300 transition" />
          </div>

          <div className="mt-4 flex items-baseline justify-between">
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-extrabold font-mono text-white">
                {fanStatus}
              </span>
              <span className="text-sm font-semibold text-teal-400 font-mono">
                {fanSpeed}% Speed
              </span>
            </div>
            <span className="text-xs px-2 py-0.5 rounded font-mono font-medium bg-slate-800 text-slate-300 border border-slate-700">
              {autoFan ? 'AUTO MODE' : 'MANUAL'}
            </span>
          </div>

          <p className="mt-3 text-xs text-slate-400">
            {autoFan 
              ? `Auto-regulated by risk: ${riskLevel} → ${fanSpeed}%` 
              : `Manual override engaged: fixed at ${fanSpeed}%`}
          </p>
        </div>

        {/* Card 6: Alert Status */}
        <div 
          id="summary-card-alert"
          onClick={() => onNavigate('alerts')}
          className={`border rounded-xl p-5 shadow-lg transition duration-200 group cursor-pointer ${
            alertActive 
              ? 'bg-red-950/30 border-red-500/50 text-red-300 alert-pulsing' 
              : 'bg-slate-850 bg-slate-900/90 border-slate-800 hover:border-slate-700 text-slate-300'
          }`}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className={`p-2 rounded-lg border ${
                alertActive 
                  ? 'bg-red-500/20 text-red-400 border-red-500/30' 
                  : 'bg-emerald-500/15 text-emerald-400 border-emerald-500/20'
              }`}>
                {alertActive ? <AlertTriangle className="w-5 h-5" /> : <CheckCircle2 className="w-5 h-5" />}
              </div>
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                Alert Status
              </span>
            </div>
            <ArrowUpRight className="w-4 h-4 text-slate-600 group-hover:text-slate-300 transition" />
          </div>

          <div className="mt-4 flex items-baseline justify-between">
            <span className={`text-2xl sm:text-3xl font-extrabold tracking-tight ${
              alertActive ? 'text-red-400' : 'text-emerald-400'
            }`}>
              {alertActive ? 'CRITICAL' : 'Normal'}
            </span>
            <span className={`text-xs px-2 py-0.5 rounded font-medium ${
              alertActive 
                ? 'bg-red-900/60 text-red-200 border border-red-700' 
                : 'bg-emerald-900/60 text-emerald-200 border border-emerald-700'
            }`}>
              {alertActive ? 'Action Required' : 'All Clear'}
            </span>
          </div>

          <p className="mt-3 text-xs leading-relaxed text-slate-400">
            {alertActive 
              ? '⚠️ High risk detected. Suction ventilation boost requested.' 
              : '✓ No critical alert. Environment within safe baseline.'}
          </p>
        </div>
      </div>

      {/* Industrial Facility Overview Strip */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-5 shadow-lg">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <Cpu className="w-4 h-4 text-amber-400" />
              <span>Goldsmith Workstation Subsystems Status</span>
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Simulated goldsmith bench telemetry nodes (College Review Prototype)
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
            <div className="bg-slate-800/80 border border-slate-700/80 rounded-lg p-2.5">
              <span className="text-slate-400 block text-[11px]">Torch &amp; Hearth Heat</span>
              <span className="font-semibold text-emerald-400 flex items-center gap-1.5 mt-0.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                DHT22 Online
              </span>
            </div>
            <div className="bg-slate-800/80 border border-slate-700/80 rounded-lg p-2.5">
              <span className="text-slate-400 block text-[11px]">Flux &amp; Acid Fumes</span>
              <span className="font-semibold text-emerald-400 flex items-center gap-1.5 mt-0.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                MQ-135 Active
              </span>
            </div>
            <div className="bg-slate-800/80 border border-slate-700/80 rounded-lg p-2.5">
              <span className="text-slate-400 block text-[11px]">Bench Suction Hood</span>
              <span className="font-semibold text-cyan-400 flex items-center gap-1.5 mt-0.5">
                <span className="w-2 h-2 rounded-full bg-cyan-400"></span>
                PWM {fanSpeed}%
              </span>
            </div>
            <div className="bg-slate-800/80 border border-slate-700/80 rounded-lg p-2.5">
              <span className="text-slate-400 block text-[11px]">Goldsmith Risk AI</span>
              <span className="font-semibold text-amber-400 flex items-center gap-1.5 mt-0.5">
                <span className="w-2 h-2 rounded-full bg-amber-400"></span>
                Rule Matrix
              </span>
            </div>
          </div>
        </div>

        {criticalFactor && (
          <div className="mt-4 pt-3 border-t border-slate-800 flex items-center gap-2 text-xs text-amber-300/90">
            <AlertOctagon className="w-4 h-4 text-amber-400 shrink-0" />
            <span>
              <strong>Active Environmental Trigger:</strong> {criticalFactor}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};
