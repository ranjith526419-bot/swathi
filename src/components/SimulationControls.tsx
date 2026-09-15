import React from 'react';
import { 
  Sliders, 
  Radio, 
  RefreshCw, 
  Play, 
  Pause, 
  Thermometer, 
  Wind, 
  Clock, 
  Sparkles, 
  ShieldCheck, 
  AlertTriangle, 
  Flame,
  ArrowRight,
  Fan,
  X
} from 'lucide-react';
import { RiskEvaluation, RiskLevel } from '../types';

interface SimulationControlsProps {
  temperature: number;
  setTemperature: (t: number) => void;
  airQuality: number;
  setAirQuality: (a: number) => void;
  exposureDuration: number;
  setExposureDuration: (e: number) => void;
  riskEvaluation: RiskEvaluation;
  fanSpeed: number;
  simulationAutoRunning: boolean;
  onToggleAutoSimulation: () => void;
  onClose?: () => void;
  isModalOrDrawer?: boolean;
}

export const SimulationControls: React.FC<SimulationControlsProps> = ({
  temperature,
  setTemperature,
  airQuality,
  setAirQuality,
  exposureDuration,
  setExposureDuration,
  riskEvaluation,
  fanSpeed,
  simulationAutoRunning,
  onToggleAutoSimulation,
  onClose,
  isModalOrDrawer = false,
}) => {
  const { riskLevel, alertActive } = riskEvaluation;

  // Presets
  const applyPreset = (temp: number, aqi: number, exp: number) => {
    setTemperature(temp);
    setAirQuality(aqi);
    setExposureDuration(exp);
  };

  return (
    <div className="bg-slate-900 border border-slate-700/80 rounded-2xl p-6 shadow-2xl relative">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-800">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-lg bg-amber-500/20 text-amber-400 border border-amber-500/30">
            <Sliders className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-bold text-white text-base">
                Interactive Environmental Sensor Simulation
              </h3>
              {/* Simulation Mode Indicator Required by Prompt */}
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-mono font-bold bg-amber-950 text-amber-300 border border-amber-700/70 animate-pulse">
                <Radio className="w-3 h-3" />
                SIMULATION MODE
              </span>
            </div>
            <p className="text-xs text-slate-400">
              Drag sliders to simulate sensor changes and observe automated cascade across Risk, Alerts, and Fan Speed.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            id="sim-toggle-auto-btn"
            onClick={onToggleAutoSimulation}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
              simulationAutoRunning
                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 hover:bg-amber-500/30'
                : 'bg-emerald-600 hover:bg-emerald-500 text-white'
            }`}
          >
            {simulationAutoRunning ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
            <span>{simulationAutoRunning ? 'Live Stream Active' : 'Start Live Sim'}</span>
          </button>

          {isModalOrDrawer && onClose && (
            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>

      {/* Quick Demonstration Scenario Presets (Very useful for college examiners!) */}
      <div className="my-4">
        <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-2">
          One-Click Examination Presets:
        </span>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
          {/* Safe Baseline */}
          <button
            id="preset-safe-btn"
            onClick={() => applyPreset(28, 42, 15)}
            className="p-3 rounded-xl bg-slate-800/80 hover:bg-slate-800 border border-emerald-500/30 text-left transition cursor-pointer group"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-emerald-400 flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5" />
                1. Stone Setting (Safe)
              </span>
              <span className="text-[10px] font-mono text-slate-400">LOW</span>
            </div>
            <p className="text-[11px] text-slate-400 mt-1">
              28°C • 42 AQI • 15m → Fan 30%
            </p>
          </button>

          {/* Medium / Prompt Default */}
          <button
            id="preset-medium-btn"
            onClick={() => applyPreset(38, 72, 24)}
            className="p-3 rounded-xl bg-slate-800/80 hover:bg-slate-800 border border-amber-500/30 text-left transition cursor-pointer group"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-amber-400 flex items-center gap-1.5">
                <AlertTriangle className="w-3.5 h-3.5" />
                2. Gold Soldering (Default)
              </span>
              <span className="text-[10px] font-mono text-slate-400">MEDIUM</span>
            </div>
            <p className="text-[11px] text-slate-400 mt-1">
              38°C • 72 AQI • 24m → Fan 60%
            </p>
          </button>

          {/* Prompt Example: 43°C, 85 AQI, 50 min -> HIGH */}
          <button
            id="preset-high-btn"
            onClick={() => applyPreset(43, 85, 50)}
            className="p-3 rounded-xl bg-slate-800/80 hover:bg-slate-800 border border-red-500/40 text-left transition cursor-pointer group"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-red-400 flex items-center gap-1.5">
                <Flame className="w-3.5 h-3.5" />
                3. Gold Smelting Peak (Hazard)
              </span>
              <span className="text-[10px] font-mono text-red-400 font-bold">HIGH</span>
            </div>
            <p className="text-[11px] text-slate-400 mt-1">
              43°C • 85 AQI • 50m → Fan 90%
            </p>
          </button>
        </div>
      </div>

      {/* Sliders Required by Prompt */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 pt-2">
        {/* Slider 1: Temperature */}
        <div className="bg-slate-850 bg-slate-800/60 border border-slate-700/80 rounded-xl p-4 space-y-3">
          <div className="flex items-center justify-between">
            <label htmlFor="sim-temp-slider" className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
              <Thermometer className="w-4 h-4 text-orange-400" />
              Temperature (°C)
            </label>
            <span className="text-base font-extrabold font-mono text-orange-400">
              {temperature.toFixed(1)}°C
            </span>
          </div>

          <input
            id="sim-temp-slider"
            type="range"
            min="25"
            max="48"
            step="0.5"
            value={temperature}
            onChange={(e) => setTemperature(parseFloat(e.target.value))}
            className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-orange-500"
          />

          <div className="flex justify-between text-[10px] font-mono text-slate-400">
            <span>25°C</span>
            <span className="text-amber-400">35°C (Med)</span>
            <span className="text-red-400 font-bold">40°C (High)</span>
            <span>48°C</span>
          </div>
        </div>

        {/* Slider 2: Air Quality */}
        <div className="bg-slate-850 bg-slate-800/60 border border-slate-700/80 rounded-xl p-4 space-y-3">
          <div className="flex items-center justify-between">
            <label htmlFor="sim-aqi-slider" className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
              <Wind className="w-4 h-4 text-cyan-400" />
              Air Quality (AQI)
            </label>
            <span className="text-base font-extrabold font-mono text-cyan-400">
              {airQuality} AQI
            </span>
          </div>

          <input
            id="sim-aqi-slider"
            type="range"
            min="20"
            max="130"
            step="1"
            value={airQuality}
            onChange={(e) => setAirQuality(parseInt(e.target.value, 10))}
            className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-cyan-500"
          />

          <div className="flex justify-between text-[10px] font-mono text-slate-400">
            <span>20</span>
            <span className="text-amber-400">60 (Med)</span>
            <span className="text-red-400 font-bold">80 (High)</span>
            <span>130</span>
          </div>
        </div>

        {/* Slider 3: Exposure Duration */}
        <div className="bg-slate-850 bg-slate-800/60 border border-slate-700/80 rounded-xl p-4 space-y-3">
          <div className="flex items-center justify-between">
            <label htmlFor="sim-exposure-slider" className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-indigo-400" />
              Worker Exposure (min)
            </label>
            <span className="text-base font-extrabold font-mono text-indigo-400">
              {exposureDuration} min
            </span>
          </div>

          <input
            id="sim-exposure-slider"
            type="range"
            min="0"
            max="90"
            step="1"
            value={exposureDuration}
            onChange={(e) => setExposureDuration(parseInt(e.target.value, 10))}
            className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-indigo-500"
          />

          <div className="flex justify-between text-[10px] font-mono text-slate-400">
            <span>0m</span>
            <span className="text-amber-400">30m (Med)</span>
            <span className="text-red-400 font-bold">60m (High)</span>
            <span>90m</span>
          </div>
        </div>
      </div>

      {/* Real-time Cascading Output Banner (Matches prompt's exact demonstration example) */}
      <div className="mt-5 p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center flex-wrap gap-2 text-xs font-mono text-slate-300">
          <span className="text-slate-400">Current Input:</span>
          <span className="text-orange-400 font-bold">{temperature.toFixed(1)}°C</span>
          <span>+</span>
          <span className="text-cyan-400 font-bold">{airQuality} AQI</span>
          <span>+</span>
          <span className="text-indigo-400 font-bold">{exposureDuration} min</span>
        </div>

        <div className="flex items-center flex-wrap gap-2 text-xs font-mono">
          <ArrowRight className="w-4 h-4 text-slate-500 hidden md:inline" />

          {/* Risk Badge */}
          <div className={`px-2.5 py-1 rounded font-bold border ${
            riskLevel === 'HIGH' 
              ? 'bg-red-950 text-red-300 border-red-700' 
              : riskLevel === 'MEDIUM' 
              ? 'bg-amber-950 text-amber-300 border-amber-700' 
              : 'bg-emerald-950 text-emerald-300 border-emerald-700'
          }`}>
            Risk = {riskLevel === 'HIGH' ? '🔴 HIGH' : riskLevel === 'MEDIUM' ? '🟡 MEDIUM' : '🟢 LOW'}
          </div>

          {/* Alert Badge */}
          <div className={`px-2.5 py-1 rounded font-bold border ${
            alertActive 
              ? 'bg-red-950 text-red-300 border-red-700 animate-pulse' 
              : 'bg-slate-800 text-slate-300 border-slate-700'
          }`}>
            Alert = {alertActive ? 'HIGH RISK DETECTED' : 'No Critical Alert'}
          </div>

          {/* Fan Badge */}
          <div className="px-2.5 py-1 rounded font-bold bg-teal-950 text-teal-300 border border-teal-800 flex items-center gap-1">
            <Fan className="w-3.5 h-3.5" />
            <span>Fan = {fanSpeed}%</span>
          </div>
        </div>
      </div>
    </div>
  );
};
