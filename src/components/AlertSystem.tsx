import React, { useState } from 'react';
import { 
  AlertTriangle, 
  CheckCircle2, 
  ShieldAlert, 
  Wind, 
  Thermometer, 
  Bell, 
  Check, 
  Flame, 
  Siren,
  Sliders,
  Volume2,
  VolumeX,
  Clock
} from 'lucide-react';
import { RiskEvaluation } from '../types';

interface AlertSystemProps {
  riskEvaluation: RiskEvaluation;
  temperature: number;
  airQuality: number;
  exposureDuration: number;
  onOpenSimulation: () => void;
  onNavigate: (tab: string) => void;
}

export const AlertSystem: React.FC<AlertSystemProps> = ({
  riskEvaluation,
  temperature,
  airQuality,
  exposureDuration,
  onOpenSimulation,
  onNavigate,
}) => {
  const { alertActive, alertMessage, riskLevel, criticalFactor } = riskEvaluation;
  const [acknowledged, setAcknowledged] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(false);

  // Protocols checklist for HIGH risk
  const [checklist, setChecklist] = useState({
    ventilation: true,
    evacuate: false,
    hydration: false,
    supervisor: false,
  });

  const toggleCheck = (key: keyof typeof checklist) => {
    setChecklist((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="space-y-6">
      {/* Required Primary Alert Card from Prompt */}
      <div 
        id="primary-alert-card"
        className={`rounded-2xl border p-6 shadow-2xl transition-all duration-300 relative overflow-hidden ${
          alertActive 
            ? 'bg-gradient-to-br from-red-950/80 via-slate-900 to-red-950/40 border-red-500/80 alert-pulsing' 
            : 'bg-slate-900/90 border-slate-800'
        }`}
      >
        {/* Visual Industrial Hazard Stripes on Top Border when Alert Active */}
        {alertActive && (
          <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-red-500 via-amber-500 to-red-500 animate-pulse"></div>
        )}

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-5 border-b border-slate-800/80">
          <div className="flex items-center gap-3.5">
            <div className={`p-3.5 rounded-xl border ${
              alertActive 
                ? 'bg-red-500/20 text-red-400 border-red-500/50 animate-bounce' 
                : 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30'
            }`}>
              {alertActive ? <Siren className="w-8 h-8" /> : <CheckCircle2 className="w-8 h-8" />}
            </div>

            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs uppercase font-mono tracking-widest text-slate-400">
                  Industrial Safety Dispatch
                </span>
                <span className={`text-[10px] px-2 py-0.5 rounded font-bold uppercase font-mono ${
                  alertActive 
                    ? 'bg-red-900 text-red-200 border border-red-700' 
                    : 'bg-emerald-900 text-emerald-200 border border-emerald-700'
                }`}>
                  {alertActive ? 'PRIORITY 1 - HAZARD' : 'STATUS NORMAL'}
                </span>
              </div>

              {/* Exact display text required by prompt */}
              <h2 className={`text-2xl sm:text-3xl font-black tracking-tight mt-1 ${
                alertActive ? 'text-red-400' : 'text-emerald-400'
              }`}>
                {alertActive ? '⚠️ HIGH RISK DETECTED' : '✓ No Critical Alert'}
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setSoundEnabled(!soundEnabled)}
              className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 text-xs flex items-center gap-1.5 cursor-pointer"
              title="Toggle Audio Siren Simulation"
            >
              {soundEnabled ? <Volume2 className="w-4 h-4 text-amber-400" /> : <VolumeX className="w-4 h-4 text-slate-400" />}
              <span className="hidden sm:inline">{soundEnabled ? 'Siren On' : 'Siren Muted'}</span>
            </button>
            <button
              onClick={onOpenSimulation}
              className="px-3 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-amber-400 border border-slate-700 text-xs font-semibold flex items-center gap-1.5 cursor-pointer"
            >
              <Sliders className="w-3.5 h-3.5" />
              <span>Simulate Risk</span>
            </button>
          </div>
        </div>

        {/* Alert Sub-Message Specified in Prompt */}
        <div className="mt-5">
          <div className={`p-4 rounded-xl border flex items-center gap-3 ${
            alertActive 
              ? 'bg-red-900/30 border-red-500/40 text-red-200' 
              : 'bg-slate-800/40 border-slate-700/60 text-slate-300'
          }`}>
            <Wind className={`w-5 h-5 shrink-0 ${alertActive ? 'text-red-400 animate-spin' : 'text-slate-400'}`} />
            <div>
              <span className="text-xs uppercase font-mono text-slate-400 block">
                Primary Action Directive:
              </span>
              <p className="text-base font-bold text-white tracking-wide">
                "{alertMessage}"
              </p>
            </div>
          </div>

          {criticalFactor && alertActive && (
            <p className="mt-3 text-xs text-red-300 font-mono">
              <strong>Trigger condition:</strong> {criticalFactor} (Worker duration: {exposureDuration}m, Temp: {temperature.toFixed(1)}°C, AQI: {airQuality})
            </p>
          )}
        </div>
      </div>

      {/* Industrial Safety Action Checklist & Fan Interlock */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Emergency Protocols Checklist */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-lg space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-white text-sm flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 text-amber-400" />
              Goldsmith Workshop Safety Emergency Protocols
            </h3>
            <span className="text-xs text-slate-400 font-mono">
              Jewelry Metallurgy Protocol
            </span>
          </div>

          <p className="text-xs text-slate-400">
            {alertActive 
              ? 'Automated containment steps initiated. Goldsmiths must verify standard safety countermeasures below:' 
              : 'Standard operational status. Standing safety precautions:'}
          </p>

          <div className="space-y-2.5 text-xs">
            <div 
              onClick={() => toggleCheck('ventilation')}
              className={`p-3 rounded-lg border flex items-center justify-between cursor-pointer transition ${
                checklist.ventilation 
                  ? 'bg-slate-800 border-teal-500/60 text-slate-200' 
                  : 'bg-slate-850 bg-slate-800/40 border-slate-700/60 text-slate-400'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <div className={`w-4 h-4 rounded border flex items-center justify-center ${
                  checklist.ventilation ? 'bg-teal-500 border-teal-400 text-slate-950' : 'border-slate-600'
                }`}>
                  {checklist.ventilation && <Check className="w-3 h-3 stroke-[3]" />}
                </div>
                <span><strong>Suction Hood Boost:</strong> Goldsmith bench fume suction ramped to 90%</span>
              </div>
              <span className="text-[10px] font-mono text-teal-400">AUTOMATIC</span>
            </div>

            <div 
              onClick={() => toggleCheck('evacuate')}
              className={`p-3 rounded-lg border flex items-center justify-between cursor-pointer transition ${
                checklist.evacuate 
                  ? 'bg-slate-800 border-emerald-500/60 text-slate-200' 
                  : 'bg-slate-850 bg-slate-800/40 border-slate-700/60 text-slate-400'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <div className={`w-4 h-4 rounded border flex items-center justify-center ${
                  checklist.evacuate ? 'bg-emerald-500 border-emerald-400 text-slate-950' : 'border-slate-600'
                }`}>
                  {checklist.evacuate && <Check className="w-3 h-3 stroke-[3]" />}
                </div>
                <span><strong>Torch Halt &amp; Rest:</strong> Extinguish melting torches; rotate artisan away from bench</span>
              </div>
              <span className="text-[10px] font-mono text-slate-400">MANUAL</span>
            </div>

            <div 
              onClick={() => toggleCheck('hydration')}
              className={`p-3 rounded-lg border flex items-center justify-between cursor-pointer transition ${
                checklist.hydration 
                  ? 'bg-slate-800 border-emerald-500/60 text-slate-200' 
                  : 'bg-slate-850 bg-slate-800/40 border-slate-700/60 text-slate-400'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <div className={`w-4 h-4 rounded border flex items-center justify-center ${
                  checklist.hydration ? 'bg-emerald-500 border-emerald-400 text-slate-950' : 'border-slate-600'
                }`}>
                  {checklist.hydration && <Check className="w-3 h-3 stroke-[3]" />}
                </div>
                <span><strong>Hydration &amp; Cool Air:</strong> Cool water intake to counteract soldering heat dehydration</span>
              </div>
              <span className="text-[10px] font-mono text-slate-400">MANUAL</span>
            </div>

            <div 
              onClick={() => toggleCheck('supervisor')}
              className={`p-3 rounded-lg border flex items-center justify-between cursor-pointer transition ${
                checklist.supervisor 
                  ? 'bg-slate-800 border-emerald-500/60 text-slate-200' 
                  : 'bg-slate-850 bg-slate-800/40 border-slate-700/60 text-slate-400'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <div className={`w-4 h-4 rounded border flex items-center justify-center ${
                  checklist.supervisor ? 'bg-emerald-500 border-emerald-400 text-slate-950' : 'border-slate-600'
                }`}>
                  {checklist.supervisor && <Check className="w-3 h-3 stroke-[3]" />}
                </div>
                <span><strong>Check Suction Filter:</strong> Verify baghouse exhaust and acid pickling scrubber</span>
              </div>
              <span className="text-[10px] font-mono text-slate-400">MAINTENANCE</span>
            </div>
          </div>
        </div>

        {/* Incident Log & Live Fan Interlock */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-lg flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-white text-sm flex items-center gap-2">
                <Bell className="w-4 h-4 text-cyan-400" />
                Alert System Telemetry &amp; Actuation Link
              </h3>
              <span className="text-xs text-slate-400 font-mono">
                Interlock Loop: Active
              </span>
            </div>

            <div className="mt-4 space-y-3 text-xs">
              <div className="p-3 bg-slate-800/60 border border-slate-700/70 rounded-lg flex items-center justify-between">
                <div>
                  <span className="text-slate-400 block text-[11px]">Active Risk State</span>
                  <span className="font-bold text-slate-100 mt-0.5 block">{riskLevel} RISK</span>
                </div>
                <div className="text-right">
                  <span className="text-slate-400 block text-[11px]">Fan Auto-Command</span>
                  <span className="font-bold text-teal-400 mt-0.5 block">
                    {riskLevel === 'HIGH' ? '90% MAX BOOST' : riskLevel === 'MEDIUM' ? '60% MODERATE' : '30% BASELINE'}
                  </span>
                </div>
              </div>

              <div className="p-3 bg-slate-800/60 border border-slate-700/70 rounded-lg flex items-center justify-between">
                <div>
                  <span className="text-slate-400 block text-[11px]">Suction Valve Actuator</span>
                  <span className="font-bold text-emerald-400 mt-0.5 block">
                    {alertActive ? 'OPEN 100% (Emergency Vent)' : 'NOMINAL (50% Flow)'}
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-slate-400 block text-[11px]">Worker Alarm Horn</span>
                  <span className={`font-bold mt-0.5 block ${alertActive ? 'text-red-400' : 'text-slate-400'}`}>
                    {alertActive ? 'ACTIVE (Strobe + Siren)' : 'STANDBY'}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
            <button
              onClick={() => onNavigate('fan-control')}
              className="text-xs text-teal-400 hover:text-teal-300 font-semibold cursor-pointer underline underline-offset-4"
            >
              Configure Smart Fan Control →
            </button>

            <button
              onClick={() => setAcknowledged(!acknowledged)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition cursor-pointer ${
                acknowledged 
                  ? 'bg-slate-800 text-slate-400 border-slate-700' 
                  : 'bg-slate-700 hover:bg-slate-600 text-white border-slate-600'
              }`}
            >
              {acknowledged ? '✓ Alert Acknowledged' : 'Acknowledge Event'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
