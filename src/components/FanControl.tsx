import React from 'react';
import { 
  Fan, 
  Cpu, 
  Sliders, 
  Power, 
  Gauge, 
  Zap, 
  Wind, 
  Volume2, 
  CheckCircle2,
  ArrowDown,
  AlertTriangle,
  RotateCw
} from 'lucide-react';
import { RiskEvaluation, RiskLevel } from '../types';

interface FanControlProps {
  autoFan: boolean;
  onToggleAutoFan: (auto: boolean) => void;
  fanSpeed: number;
  onManualSpeedChange: (speed: number) => void;
  fanStatus: 'ON' | 'OFF';
  onToggleFanPower: () => void;
  riskEvaluation: RiskEvaluation;
  onOpenSimulation: () => void;
}

export const FanControl: React.FC<FanControlProps> = ({
  autoFan,
  onToggleAutoFan,
  fanSpeed,
  onManualSpeedChange,
  fanStatus,
  onToggleFanPower,
  riskEvaluation,
  onOpenSimulation,
}) => {
  const { riskLevel } = riskEvaluation;

  // Calculate spinning animation duration: 100% -> 0.4s, 30% -> 1.8s
  const spinDuration = fanStatus === 'ON' && fanSpeed > 0
    ? `${Math.max(0.3, 2.2 - (fanSpeed / 100) * 1.8).toFixed(2)}s`
    : '0s';

  // Metrics derived from fan speed
  const rpm = fanStatus === 'ON' ? Math.round(fanSpeed * 22) : 0;
  const cfm = fanStatus === 'ON' ? Math.round(fanSpeed * 45) : 0;
  const watts = fanStatus === 'ON' ? Math.round(fanSpeed * 1.8) : 0;
  const db = fanStatus === 'ON' ? Math.round(35 + (fanSpeed / 100) * 35) : 0;

  return (
    <div className="space-y-6">
      {/* Primary Smart Fan Control Card Required by Prompt */}
      <div 
        id="smart-fan-control-card"
        className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl relative overflow-hidden"
      >
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-xl bg-teal-500/15 text-teal-400 border border-teal-500/30">
              <Fan className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white tracking-tight">
                Smart Fume Suction Hood &amp; Exhaust Fan Unit
              </h2>
              <p className="text-xs text-slate-400">
                Goldsmith Soldering Bench &amp; Furnace Suction Controller (PWM Automated)
              </p>
            </div>
          </div>

          {/* Mode Switch & Power Buttons */}
          <div className="flex items-center gap-3">
            {/* Auto / Manual Mode Toggle Required by Prompt */}
            <div className="bg-slate-800 p-1 rounded-xl border border-slate-700 flex">
              <button
                id="fan-mode-auto-btn"
                onClick={() => onToggleAutoFan(true)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
                  autoFan
                    ? 'bg-teal-500 text-slate-950 shadow-sm shadow-teal-500/30'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Cpu className="w-3.5 h-3.5" />
                <span>AUTO MODE</span>
                {autoFan && <span className="w-1.5 h-1.5 rounded-full bg-slate-950"></span>}
              </button>
              <button
                id="fan-mode-manual-btn"
                onClick={() => onToggleAutoFan(false)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
                  !autoFan
                    ? 'bg-amber-500 text-slate-950 shadow-sm shadow-amber-500/30'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Sliders className="w-3.5 h-3.5" />
                <span>MANUAL MODE</span>
                {!autoFan && <span className="w-1.5 h-1.5 rounded-full bg-slate-950"></span>}
              </button>
            </div>

            {/* Fan Master Power Switch */}
            <button
              id="fan-power-toggle-btn"
              onClick={onToggleFanPower}
              className={`p-2.5 rounded-xl border transition flex items-center gap-2 text-xs font-bold cursor-pointer ${
                fanStatus === 'ON'
                  ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40 hover:bg-emerald-500/30'
                  : 'bg-red-500/20 text-red-400 border-red-500/40 hover:bg-red-500/30'
              }`}
              title="Toggle Master Power"
            >
              <Power className="w-4 h-4" />
              <span>{fanStatus === 'ON' ? 'ON' : 'OFF'}</span>
            </button>
          </div>
        </div>

        {/* Status Display Specified in Prompt:
            AUTO MODE     ● ON
            Risk: HIGH
                   ↓
            Fan Speed: 90%
        */}
        <div className="mt-6 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          {/* Animated Graphic Rotating Fan */}
          <div className="lg:col-span-4 flex flex-col items-center justify-center p-6 bg-slate-850 bg-slate-800/50 border border-slate-700/60 rounded-2xl">
            <div className="relative w-44 h-44 flex items-center justify-center">
              {/* Outer Turbine Ring */}
              <div className="absolute inset-0 rounded-full border-4 border-slate-700/60 border-dashed animate-spin" style={{ animationDuration: '24s' }}></div>
              <div className="absolute inset-2 rounded-full border-2 border-slate-700/40"></div>

              {/* Fan Blades Graphic */}
              <div 
                className={`w-32 h-32 flex items-center justify-center text-teal-400 transition-all ${
                  fanStatus === 'ON' && fanSpeed > 0 ? 'fan-spinning' : 'opacity-40'
                }`}
                style={{ '--fan-duration': spinDuration } as React.CSSProperties}
              >
                <Fan className="w-full h-full stroke-[1.2] drop-shadow-[0_0_15px_rgba(20,184,166,0.3)]" />
              </div>

              {/* Center Hub Indicator */}
              <div className="absolute w-8 h-8 rounded-full bg-slate-900 border-2 border-teal-400 flex items-center justify-center shadow-lg">
                <span className={`w-2.5 h-2.5 rounded-full ${fanStatus === 'ON' ? 'bg-teal-400 animate-ping' : 'bg-red-500'}`}></span>
              </div>
            </div>

            <div className="mt-4 text-center">
              <span className="text-xs font-mono text-slate-400 uppercase tracking-widest block">
                Axial Suction Turbine #F-01
              </span>
              <span className="text-sm font-bold text-teal-300 font-mono mt-0.5 block">
                {fanStatus === 'ON' ? `${rpm} RPM • ACTIVE` : 'IDLE / POWER OFF'}
              </span>
            </div>
          </div>

          {/* Logic & Directives Display Specified in Prompt */}
          <div className="lg:col-span-8 space-y-5">
            {/* Auto Mode & Risk Cascading Mapping Box */}
            <div className="bg-slate-850 bg-slate-800/80 border border-slate-700/80 rounded-2xl p-5 shadow-inner">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-bold text-slate-400">
                    CURRENT STATE:
                  </span>
                  <span className="px-2.5 py-0.5 rounded-md text-xs font-mono font-bold bg-teal-950 text-teal-300 border border-teal-800">
                    {autoFan ? 'AUTO MODE' : 'MANUAL MODE'}
                  </span>
                </div>
                <div className="flex items-center gap-1.5 text-xs font-mono">
                  <span className={`w-2 h-2 rounded-full ${fanStatus === 'ON' ? 'bg-emerald-400 animate-pulse' : 'bg-red-500'}`}></span>
                  <span className={fanStatus === 'ON' ? 'text-emerald-400 font-bold' : 'text-red-400'}>
                    POWER: {fanStatus}
                  </span>
                </div>
              </div>

              {/* Exact flow required by prompt:
                  Risk: HIGH
                         ↓
                  Fan Speed: 90%
              */}
              <div className="mt-5 p-4 rounded-xl bg-slate-900/90 border border-slate-700/80 flex flex-col items-center justify-center">
                <div className="text-center">
                  <span className="text-xs text-slate-400 uppercase font-mono block">
                    Current Environmental Risk
                  </span>
                  <span className={`text-2xl font-black tracking-tight mt-0.5 block ${
                    riskLevel === 'HIGH' ? 'text-red-400' : riskLevel === 'MEDIUM' ? 'text-amber-400' : 'text-emerald-400'
                  }`}>
                    Risk: {riskLevel}
                  </span>
                </div>

                <div className="my-2 p-1.5 rounded-full bg-slate-800 border border-slate-700 text-teal-400">
                  <ArrowDown className="w-5 h-5 animate-bounce" />
                </div>

                <div className="text-center">
                  <span className="text-xs text-slate-400 uppercase font-mono block">
                    Target Automated Fan Speed
                  </span>
                  <span className="text-3xl font-black font-mono text-teal-400 mt-0.5 block">
                    Fan Speed: {fanSpeed}%
                  </span>
                </div>
              </div>
            </div>

            {/* In MANUAL MODE, provide slider to control fan speed */}
            {!autoFan && (
              <div 
                id="manual-fan-slider-container"
                className="p-5 rounded-2xl bg-amber-950/20 border border-amber-500/40 space-y-3"
              >
                <div className="flex items-center justify-between">
                  <label htmlFor="manual-fan-slider" className="text-xs font-bold text-amber-300 uppercase tracking-wider flex items-center gap-1.5">
                    <Sliders className="w-4 h-4 text-amber-400" />
                    Manual Fan Speed Slider (0% – 100%)
                  </label>
                  <span className="text-base font-black font-mono text-amber-300">
                    {fanSpeed}%
                  </span>
                </div>

                <input
                  id="manual-fan-slider"
                  type="range"
                  min="0"
                  max="100"
                  step="5"
                  value={fanSpeed}
                  onChange={(e) => onManualSpeedChange(Number(e.target.value))}
                  className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-amber-400"
                />

                <div className="flex justify-between text-[11px] font-mono text-slate-400">
                  <span>0% (Off)</span>
                  <span>30% (Low)</span>
                  <span>60% (Medium)</span>
                  <span>90% (High)</span>
                  <span>100% (Max)</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Exact Automatic Fan-Speed Logic Breakdown as required by prompt:
          LOW risk → Fan 30%
          MEDIUM risk → Fan 60%
          HIGH risk → Fan 90%
      */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Tier 1: LOW */}
        <div className={`p-5 rounded-xl border transition ${
          riskLevel === 'LOW' && autoFan 
            ? 'bg-emerald-950/40 border-emerald-500 text-emerald-200 ring-2 ring-emerald-500/40 shadow-lg' 
            : 'bg-slate-900 border-slate-800 text-slate-300'
        }`}>
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-400">
              Tier 1 • Safe
            </span>
            <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-slate-800 text-slate-300">
              Low Acoustic
            </span>
          </div>

          <div className="mt-3">
            <span className="text-lg font-bold text-white block">
              LOW risk → Fan 30%
            </span>
            <p className="text-xs text-slate-400 mt-1 leading-relaxed">
              Maintains gentle baseline air circulation, minimal energy consumption, and whisper-quiet workplace operation.
            </p>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-800/80 flex justify-between text-xs font-mono text-slate-400">
            <span>Airflow: ~1,350 CFM</span>
            <span>Draw: ~54W</span>
          </div>
        </div>

        {/* Tier 2: MEDIUM */}
        <div className={`p-5 rounded-xl border transition ${
          riskLevel === 'MEDIUM' && autoFan 
            ? 'bg-amber-950/40 border-amber-500 text-amber-200 ring-2 ring-amber-500/40 shadow-lg' 
            : 'bg-slate-900 border-slate-800 text-slate-300'
        }`}>
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-amber-400">
              Tier 2 • Caution
            </span>
            <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-slate-800 text-slate-300">
              Moderate Boost
            </span>
          </div>

          <div className="mt-3">
            <span className="text-lg font-bold text-white block">
              MEDIUM risk → Fan 60%
            </span>
            <p className="text-xs text-slate-400 mt-1 leading-relaxed">
              Ramps up intake and suction to purge accumulating particulates and heat pockets before hazardous thresholds are hit.
            </p>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-800/80 flex justify-between text-xs font-mono text-slate-400">
            <span>Airflow: ~2,700 CFM</span>
            <span>Draw: ~108W</span>
          </div>
        </div>

        {/* Tier 3: HIGH */}
        <div className={`p-5 rounded-xl border transition ${
          riskLevel === 'HIGH' && autoFan 
            ? 'bg-red-950/40 border-red-500 text-red-200 ring-2 ring-red-500/40 shadow-lg' 
            : 'bg-slate-900 border-slate-800 text-slate-300'
        }`}>
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-red-400">
              Tier 3 • Hazard
            </span>
            <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-red-950 text-red-300 border border-red-800">
              MAX TURBINE
            </span>
          </div>

          <div className="mt-3">
            <span className="text-lg font-bold text-white block">
              HIGH risk → Fan 90%
            </span>
            <p className="text-xs text-slate-400 mt-1 leading-relaxed">
              Maximum industrial suction and exhaust displacement to rapidly cool down the zone and extract hazardous ambient fumes.
            </p>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-800/80 flex justify-between text-xs font-mono text-slate-400">
            <span>Airflow: ~4,050 CFM</span>
            <span>Draw: ~162W</span>
          </div>
        </div>
      </div>

      {/* Industrial Hardware Actuator Specifications Box */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-lg flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <Zap className="w-4 h-4 text-amber-400" />
            Solid-State Actuator &amp; PWM Relay Specs
          </h3>
          <p className="text-xs text-slate-400">
            Simulated 25kHz PWM driver signal from microcontroller (ESP32 GPIO 18) to MOSFET bridge
          </p>
        </div>

        <div className="flex items-center gap-4 text-xs font-mono">
          <div className="bg-slate-800/80 px-3 py-2 rounded-lg border border-slate-700">
            <span className="text-slate-400 block text-[10px]">Noise Level</span>
            <span className="font-bold text-white">{db} dBA</span>
          </div>
          <div className="bg-slate-800/80 px-3 py-2 rounded-lg border border-slate-700">
            <span className="text-slate-400 block text-[10px]">Est. Power</span>
            <span className="font-bold text-white">{watts} Watts</span>
          </div>
          <div className="bg-slate-800/80 px-3 py-2 rounded-lg border border-slate-700">
            <span className="text-slate-400 block text-[10px]">Airflow Delivery</span>
            <span className="font-bold text-teal-400">{cfm} CFM</span>
          </div>
        </div>
      </div>
    </div>
  );
};
