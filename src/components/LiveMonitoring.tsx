import React from 'react';
import { 
  Activity, 
  Thermometer, 
  Wind, 
  Clock, 
  Fan, 
  Play, 
  Pause, 
  RefreshCw, 
  Sliders, 
  Zap, 
  Cpu,
  Wifi,
  Gauge
} from 'lucide-react';
import { RiskEvaluation } from '../types';

interface LiveMonitoringProps {
  temperature: number;
  airQuality: number;
  exposureDuration: number;
  riskEvaluation: RiskEvaluation;
  fanStatus: 'ON' | 'OFF';
  fanSpeed: number;
  simulationAutoRunning: boolean;
  onToggleAutoSimulation: () => void;
  onOpenSimulation: () => void;
  onResetToDefaults: () => void;
  packetCount: number;
}

export const LiveMonitoring: React.FC<LiveMonitoringProps> = ({
  temperature,
  airQuality,
  exposureDuration,
  riskEvaluation,
  fanStatus,
  fanSpeed,
  simulationAutoRunning,
  onToggleAutoSimulation,
  onOpenSimulation,
  onResetToDefaults,
  packetCount,
}) => {
  const { riskLevel, alertActive } = riskEvaluation;

  return (
    <div className="space-y-6">
      {/* Header with Live Status & Controls */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-lg flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-cyan-500/15 text-cyan-400 border border-cyan-500/20">
              <Activity className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                Live Sensor Telemetry
                <span className="text-xs px-2 py-0.5 rounded font-mono font-medium bg-cyan-950 text-cyan-400 border border-cyan-800">
                  Node #01 • Industrial Zone A
                </span>
              </h2>
              <p className="text-xs text-slate-400">
                Simulated real-time sensor polling every 3 seconds (Temp 35°C–42°C, AQI 50–100, Exposure increasing)
              </p>
            </div>
          </div>
        </div>

        {/* Live Controller Actions */}
        <div className="flex flex-wrap items-center gap-2.5">
          <button
            id="live-toggle-stream-btn"
            onClick={onToggleAutoSimulation}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
              simulationAutoRunning
                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 hover:bg-amber-500/30'
                : 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-md shadow-emerald-600/20'
            }`}
          >
            {simulationAutoRunning ? (
              <>
                <Pause className="w-3.5 h-3.5" />
                <span>Pause Live Stream</span>
              </>
            ) : (
              <>
                <Play className="w-3.5 h-3.5" />
                <span>Resume Live Stream</span>
              </>
            )}
          </button>

          <button
            id="live-reset-btn"
            onClick={onResetToDefaults}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 transition cursor-pointer"
            title="Reset to 38°C, AQI 72, 24m exposure"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Reset Defaults</span>
          </button>

          <button
            id="live-open-sim-drawer-btn"
            onClick={onOpenSimulation}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-800 hover:bg-slate-700 text-amber-400 border border-slate-700 transition cursor-pointer"
          >
            <Sliders className="w-3.5 h-3.5" />
            <span>Manual Override</span>
          </button>
        </div>
      </div>

      {/* Main 5 Required Live Values from Prompt:
          - Temperature: 38°C
          - Air Quality: 72
          - Exposure Time: 24 min
          - Risk Level: 🟡 MEDIUM
          - Fan: ON
      */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {/* Metric 1: Temperature */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-4 shadow-md flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between text-slate-400 text-xs font-semibold">
              <span className="flex items-center gap-1.5">
                <Thermometer className="w-4 h-4 text-orange-400" />
                Temperature
              </span>
              <span className="font-mono text-[10px] text-slate-500">SHT31-IC</span>
            </div>
            <div className="mt-3 flex items-baseline justify-between">
              <div className="text-3xl font-extrabold font-mono text-white">
                {temperature.toFixed(1)}
                <span className="text-xl font-normal text-slate-400 ml-1">°C</span>
              </div>
            </div>
          </div>

          <div className="mt-3 pt-3 border-t border-slate-800/80">
            <div className="flex justify-between text-xs font-mono">
              <span className="text-slate-400">Simulation Bound:</span>
              <span className="text-orange-400 font-semibold">35°C – 42°C</span>
            </div>
            <div className="w-full bg-slate-800 rounded-full h-1.5 mt-1.5 overflow-hidden">
              <div 
                className="h-1.5 bg-orange-500 rounded-full transition-all duration-300"
                style={{ width: `${Math.min(100, Math.max(0, ((temperature - 30) / 15) * 100))}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* Metric 2: Air Quality */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-4 shadow-md flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between text-slate-400 text-xs font-semibold">
              <span className="flex items-center gap-1.5">
                <Wind className="w-4 h-4 text-cyan-400" />
                Air Quality
              </span>
              <span className="font-mono text-[10px] text-slate-500">MQ-135</span>
            </div>
            <div className="mt-3 flex items-baseline justify-between">
              <div className="text-3xl font-extrabold font-mono text-white">
                {airQuality}
                <span className="text-sm font-normal text-slate-400 ml-1">AQI</span>
              </div>
            </div>
          </div>

          <div className="mt-3 pt-3 border-t border-slate-800/80">
            <div className="flex justify-between text-xs font-mono">
              <span className="text-slate-400">Simulation Bound:</span>
              <span className="text-cyan-400 font-semibold">50 – 100</span>
            </div>
            <div className="w-full bg-slate-800 rounded-full h-1.5 mt-1.5 overflow-hidden">
              <div 
                className="h-1.5 bg-cyan-500 rounded-full transition-all duration-300"
                style={{ width: `${Math.min(100, Math.max(0, ((airQuality - 40) / 70) * 100))}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* Metric 3: Exposure Time */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-4 shadow-md flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between text-slate-400 text-xs font-semibold">
              <span className="flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-indigo-400" />
                Exposure Time
              </span>
              <span className="font-mono text-[10px] text-slate-500">TIMER</span>
            </div>
            <div className="mt-3 flex items-baseline justify-between">
              <div className="text-3xl font-extrabold font-mono text-white">
                {exposureDuration}
                <span className="text-sm font-normal text-slate-400 ml-1">min</span>
              </div>
            </div>
          </div>

          <div className="mt-3 pt-3 border-t border-slate-800/80">
            <div className="flex justify-between text-xs font-mono">
              <span className="text-slate-400">Trend:</span>
              <span className="text-indigo-400 font-semibold">+1 min / interval</span>
            </div>
            <div className="w-full bg-slate-800 rounded-full h-1.5 mt-1.5 overflow-hidden">
              <div 
                className="h-1.5 bg-indigo-500 rounded-full transition-all duration-300"
                style={{ width: `${Math.min(100, (exposureDuration / 60) * 100)}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* Metric 4: Risk Level */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-4 shadow-md flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between text-slate-400 text-xs font-semibold">
              <span className="flex items-center gap-1.5">
                <Cpu className="w-4 h-4 text-amber-400" />
                Risk Level
              </span>
              <span className="font-mono text-[10px] text-slate-500">AI ESTIMATE</span>
            </div>
            <div className="mt-3">
              <div className={`text-xl sm:text-2xl font-black tracking-tight ${
                riskLevel === 'HIGH' ? 'text-red-400' : riskLevel === 'MEDIUM' ? 'text-amber-400' : 'text-emerald-400'
              }`}>
                {riskLevel === 'HIGH' ? '🔴 HIGH' : riskLevel === 'MEDIUM' ? '🟡 MEDIUM' : '🟢 LOW'}
              </div>
            </div>
          </div>

          <div className="mt-3 pt-3 border-t border-slate-800/80">
            <div className="flex justify-between text-xs">
              <span className="text-slate-400">Status:</span>
              <span className={`font-semibold ${
                riskLevel === 'HIGH' ? 'text-red-400' : riskLevel === 'MEDIUM' ? 'text-amber-400' : 'text-emerald-400'
              }`}>
                {alertActive ? 'Action Required' : 'Monitored'}
              </span>
            </div>
            <div className="flex gap-1 mt-1.5">
              <div className={`h-1.5 flex-1 rounded-full ${riskLevel === 'LOW' ? 'bg-emerald-500' : 'bg-slate-800'}`}></div>
              <div className={`h-1.5 flex-1 rounded-full ${riskLevel === 'MEDIUM' ? 'bg-amber-500' : 'bg-slate-800'}`}></div>
              <div className={`h-1.5 flex-1 rounded-full ${riskLevel === 'HIGH' ? 'bg-red-500' : 'bg-slate-800'}`}></div>
            </div>
          </div>
        </div>

        {/* Metric 5: Fan */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-4 shadow-md flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between text-slate-400 text-xs font-semibold">
              <span className="flex items-center gap-1.5">
                <Fan 
                  className={`w-4 h-4 text-teal-400 ${fanStatus === 'ON' ? 'fan-spinning' : ''}`}
                  style={{ '--fan-duration': `${Math.max(0.5, 3 - (fanSpeed / 100) * 2.5)}s` } as React.CSSProperties}
                />
                Smart Fan
              </span>
              <span className="font-mono text-[10px] text-slate-500">PWM 12V</span>
            </div>
            <div className="mt-3 flex items-baseline justify-between">
              <div className="text-3xl font-extrabold font-mono text-white">
                {fanStatus}
              </div>
              <span className="text-sm font-semibold text-teal-400 font-mono">
                {fanSpeed}%
              </span>
            </div>
          </div>

          <div className="mt-3 pt-3 border-t border-slate-800/80">
            <div className="flex justify-between text-xs font-mono">
              <span className="text-slate-400">Control Mode:</span>
              <span className="text-teal-400 font-semibold">AUTOMATIC</span>
            </div>
            <div className="w-full bg-slate-800 rounded-full h-1.5 mt-1.5 overflow-hidden">
              <div 
                className="h-1.5 bg-teal-500 rounded-full transition-all duration-300"
                style={{ width: `${fanSpeed}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>

      {/* Industrial Hardware Telemetry Node details */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Sensor Specs Box 1 */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-lg space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-white text-sm flex items-center gap-2">
              <Thermometer className="w-4 h-4 text-orange-400" />
              Thermal Sensing Node
            </h3>
            <span className="px-2 py-0.5 rounded text-[11px] font-mono bg-emerald-950 text-emerald-300 border border-emerald-800">
              Online
            </span>
          </div>

          <div className="space-y-2 text-xs text-slate-300">
            <div className="flex justify-between py-1 border-b border-slate-800/80">
              <span className="text-slate-400">Hardware Sensor</span>
              <span className="font-mono text-slate-200">DHT22 / SHT31 Heat Mesh</span>
            </div>
            <div className="flex justify-between py-1 border-b border-slate-800/80">
              <span className="text-slate-400">Resolution / Accuracy</span>
              <span className="font-mono text-slate-200">±0.3°C / 0.1°C resolution</span>
            </div>
            <div className="flex justify-between py-1 border-b border-slate-800/80">
              <span className="text-slate-400">OSHA Safe Threshold</span>
              <span className="font-mono text-emerald-400">&lt; 35.0°C</span>
            </div>
            <div className="flex justify-between py-1">
              <span className="text-slate-400">Critical Heat Danger</span>
              <span className="font-mono text-red-400">≥ 40.0°C</span>
            </div>
          </div>

          <div className="p-3 bg-slate-800/60 rounded-lg text-xs text-slate-400 flex items-center justify-between">
            <span>Sampling Interval: 3,000 ms</span>
            <span className="font-mono text-cyan-400">Packets: #{packetCount}</span>
          </div>
        </div>

        {/* Sensor Specs Box 2 */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-lg space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-white text-sm flex items-center gap-2">
              <Wind className="w-4 h-4 text-cyan-400" />
              Air Quality &amp; Gas Node
            </h3>
            <span className="px-2 py-0.5 rounded text-[11px] font-mono bg-emerald-950 text-emerald-300 border border-emerald-800">
              Online
            </span>
          </div>

          <div className="space-y-2 text-xs text-slate-300">
            <div className="flex justify-between py-1 border-b border-slate-800/80">
              <span className="text-slate-400">Hardware Sensor</span>
              <span className="font-mono text-slate-200">MQ-135 / PMS5003 Dust</span>
            </div>
            <div className="flex justify-between py-1 border-b border-slate-800/80">
              <span className="text-slate-400">Target Fumes &amp; Gases</span>
              <span className="font-mono text-slate-200">Borax Flux, Solder Gas, Acid Vapors</span>
            </div>
            <div className="flex justify-between py-1 border-b border-slate-800/80">
              <span className="text-slate-400">Normal Range</span>
              <span className="font-mono text-emerald-400">0 – 59 AQI</span>
            </div>
            <div className="flex justify-between py-1">
              <span className="text-slate-400">Hazardous Ceiling</span>
              <span className="font-mono text-red-400">≥ 80 AQI</span>
            </div>
          </div>

          <div className="p-3 bg-slate-800/60 rounded-lg text-xs text-slate-400 flex items-center justify-between">
            <span>Suction Vent Interlock</span>
            <span className="font-mono text-emerald-400">Ready</span>
          </div>
        </div>

        {/* Sensor Specs Box 3 */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-lg space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-white text-sm flex items-center gap-2">
              <Gauge className="w-4 h-4 text-teal-400" />
              Automated Actuation Unit
            </h3>
            <span className="px-2 py-0.5 rounded text-[11px] font-mono bg-cyan-950 text-cyan-300 border border-cyan-800">
              Auto Synced
            </span>
          </div>

          <div className="space-y-2 text-xs text-slate-300">
            <div className="flex justify-between py-1 border-b border-slate-800/80">
              <span className="text-slate-400">Industrial Exhaust Fan</span>
              <span className="font-mono text-teal-300">High-CFM Axial Turbine</span>
            </div>
            <div className="flex justify-between py-1 border-b border-slate-800/80">
              <span className="text-slate-400">PWM Duty Cycle</span>
              <span className="font-mono text-slate-200">{fanSpeed}% Duty</span>
            </div>
            <div className="flex justify-between py-1 border-b border-slate-800/80">
              <span className="text-slate-400">Estimated Speed</span>
              <span className="font-mono text-slate-200">{Math.round(fanSpeed * 22)} RPM</span>
            </div>
            <div className="flex justify-between py-1">
              <span className="text-slate-400">Risk-Speed Rule</span>
              <span className="font-mono text-amber-300">{riskLevel} → {fanSpeed}%</span>
            </div>
          </div>

          <div className="p-3 bg-slate-800/60 rounded-lg text-xs text-slate-400 flex items-center justify-between">
            <span>Power Draw</span>
            <span className="font-mono text-slate-200">{(fanSpeed * 1.8).toFixed(0)} Watts</span>
          </div>
        </div>
      </div>
    </div>
  );
};
