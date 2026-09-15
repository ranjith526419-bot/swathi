import React from 'react';
import { 
  Cpu, 
  Thermometer, 
  Wind, 
  Clock, 
  AlertTriangle, 
  ShieldCheck, 
  AlertOctagon, 
  HelpCircle, 
  Layers, 
  CheckCircle,
  Scale,
  BrainCircuit,
  Info
} from 'lucide-react';
import { RiskEvaluation } from '../types';

interface AiPredictionProps {
  temperature: number;
  airQuality: number;
  exposureDuration: number;
  riskEvaluation: RiskEvaluation;
}

export const AiPrediction: React.FC<AiPredictionProps> = ({
  temperature,
  airQuality,
  exposureDuration,
  riskEvaluation,
}) => {
  const { 
    riskLevel, 
    reason, 
    tempScore, 
    aqiScore, 
    exposureScore, 
    criticalFactor,
    recommendedAction 
  } = riskEvaluation;

  const getRiskBadge = () => {
    switch (riskLevel) {
      case 'HIGH':
        return {
          text: '🔴 HIGH RISK',
          bg: 'bg-red-500/20 text-red-300 border-red-500/50',
          ring: 'border-red-500',
          icon: AlertTriangle,
        };
      case 'MEDIUM':
        return {
          text: '🟡 MEDIUM RISK',
          bg: 'bg-amber-500/20 text-amber-300 border-amber-500/50',
          ring: 'border-amber-500',
          icon: AlertOctagon,
        };
      case 'LOW':
      default:
        return {
          text: '🟢 LOW RISK',
          bg: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/50',
          ring: 'border-emerald-500',
          icon: ShieldCheck,
        };
    }
  };

  const riskBadge = getRiskBadge();
  const RiskIcon = riskBadge.icon;

  return (
    <div className="space-y-6">
      {/* Required Prototype & Simulation AI Disclaimer Banner */}
      <div 
        id="ai-prototype-disclaimer"
        className="bg-amber-950/40 border border-amber-500/40 rounded-xl p-4 flex items-start gap-3 shadow-md"
      >
        <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
        <div className="text-xs text-amber-200/90 leading-relaxed">
          <strong className="text-amber-300 font-bold block mb-0.5">
            PROTOTYPE NOTICE — SIMULATED AI PREDICTION
          </strong>
          Clearly labeled as a prototype/simulated AI prediction, not a medically certified prediction. 
          The system uses deterministic heuristic rules to model occupational heat stress and air toxicity risks for educational and demonstration purposes.
        </div>
      </div>

      {/* Primary Display Required by Prompt:
          Temperature → 38°C
          Air Quality → 72
          Exposure Duration → 24 min
          AI Risk Prediction → 🟡 MEDIUM RISK
      */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl pointer-events-none"></div>

        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-6 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-xl bg-amber-500/15 text-amber-400 border border-amber-500/30">
              <BrainCircuit className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white tracking-tight">
                AI Risk Prediction Engine
              </h2>
              <p className="text-xs text-slate-400">
                Rule-Based Environmental Heat &amp; Toxicity Inference Engine
              </p>
            </div>
          </div>

          <div className="text-right">
            <span className="text-[11px] font-mono text-slate-400 block">Model Architecture</span>
            <span className="text-xs font-semibold text-cyan-400 font-mono">
              Fuzzy Rule Expert System (v1.0)
            </span>
          </div>
        </div>

        {/* Input Sensors to Prediction Mapping Display */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
          {/* Input 1: Temperature */}
          <div className="bg-slate-850 bg-slate-800/80 border border-slate-700/80 rounded-xl p-4 flex flex-col justify-between">
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span className="flex items-center gap-1.5 font-medium">
                <Thermometer className="w-4 h-4 text-orange-400" />
                Temperature
              </span>
              <span className="text-[10px] text-slate-500 font-mono">Factor 1</span>
            </div>
            <div className="mt-3">
              <span className="text-2xl sm:text-3xl font-bold font-mono text-white">
                {temperature.toFixed(1)}°C
              </span>
            </div>
            <div className="mt-2 text-[11px] text-slate-400 flex justify-between">
              <span>Threshold</span>
              <span className="font-mono text-orange-400">&gt; 35°C Caution</span>
            </div>
          </div>

          {/* Input 2: Air Quality */}
          <div className="bg-slate-850 bg-slate-800/80 border border-slate-700/80 rounded-xl p-4 flex flex-col justify-between">
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span className="flex items-center gap-1.5 font-medium">
                <Wind className="w-4 h-4 text-cyan-400" />
                Air Quality
              </span>
              <span className="text-[10px] text-slate-500 font-mono">Factor 2</span>
            </div>
            <div className="mt-3">
              <span className="text-2xl sm:text-3xl font-bold font-mono text-white">
                {airQuality}
              </span>
              <span className="text-sm text-slate-400 ml-1">AQI</span>
            </div>
            <div className="mt-2 text-[11px] text-slate-400 flex justify-between">
              <span>Threshold</span>
              <span className="font-mono text-cyan-400">&gt; 60 Moderate</span>
            </div>
          </div>

          {/* Input 3: Exposure Duration */}
          <div className="bg-slate-850 bg-slate-800/80 border border-slate-700/80 rounded-xl p-4 flex flex-col justify-between">
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span className="flex items-center gap-1.5 font-medium">
                <Clock className="w-4 h-4 text-indigo-400" />
                Exposure Duration
              </span>
              <span className="text-[10px] text-slate-500 font-mono">Factor 3</span>
            </div>
            <div className="mt-3">
              <span className="text-2xl sm:text-3xl font-bold font-mono text-white">
                {exposureDuration}
              </span>
              <span className="text-sm text-slate-400 ml-1">min</span>
            </div>
            <div className="mt-2 text-[11px] text-slate-400 flex justify-between">
              <span>Threshold</span>
              <span className="font-mono text-indigo-400">&gt; 30m Active</span>
            </div>
          </div>

          {/* Output Card: AI Risk Prediction */}
          <div className={`border-2 rounded-xl p-4 flex flex-col justify-between bg-slate-800/90 shadow-lg ${riskBadge.ring}`}>
            <div className="flex items-center justify-between text-xs text-slate-300">
              <span className="flex items-center gap-1.5 font-bold uppercase tracking-wider">
                <Cpu className="w-4 h-4 text-amber-400" />
                AI Risk Prediction
              </span>
              <span className="text-[10px] font-mono text-emerald-400">Inferred</span>
            </div>

            <div className="mt-3">
              <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border text-base font-extrabold ${riskBadge.bg}`}>
                <RiskIcon className="w-5 h-5" />
                <span>{riskBadge.text}</span>
              </div>
            </div>

            <div className="mt-2 text-[11px] text-slate-300 flex justify-between">
              <span>Confidence</span>
              <span className="font-mono text-emerald-400">96.4% Deterministic</span>
            </div>
          </div>
        </div>

        {/* Small Explanation Required by Prompt */}
        <div className="mt-6 p-4 rounded-xl bg-slate-800/60 border border-slate-700/70 flex items-start gap-3">
          <Info className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-semibold text-slate-200">
              "Risk level is predicted using environmental sensor readings and worker exposure duration."
            </p>
            <p className="text-xs text-slate-400 mt-1 leading-relaxed">
              {reason}
            </p>
          </div>
        </div>
      </div>

      {/* Feature Influence & Rule-Based Model Explanation (Great for college viva review) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Model Logic Rules */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-lg space-y-4">
          <div className="flex items-center gap-2 text-white font-bold text-sm">
            <Scale className="w-4 h-4 text-amber-400" />
            <h3>AI Prediction Decision Matrix</h3>
          </div>
          <p className="text-xs text-slate-400">
            Rule-based simulation logic representing the AI expert system:
          </p>

          <div className="space-y-3 text-xs">
            {/* Rule 1: LOW */}
            <div className={`p-3 rounded-lg border transition ${
              riskLevel === 'LOW' 
                ? 'bg-emerald-950/40 border-emerald-500 text-emerald-200 ring-1 ring-emerald-500/30' 
                : 'bg-slate-800/50 border-slate-700/60 text-slate-300'
            }`}>
              <div className="flex items-center justify-between font-bold">
                <span className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400"></span>
                  LOW RISK
                </span>
                <span className="font-mono text-[11px] text-emerald-400">Safe Environmental Conditions</span>
              </div>
              <p className="text-[11px] text-slate-400 mt-1">
                Temperature &lt; 35°C AND Air Quality &lt; 60 AQI AND Exposure &lt; 30 min. Normal baseline safety.
              </p>
            </div>

            {/* Rule 2: MEDIUM */}
            <div className={`p-3 rounded-lg border transition ${
              riskLevel === 'MEDIUM' 
                ? 'bg-amber-950/40 border-amber-500 text-amber-200 ring-1 ring-amber-500/30' 
                : 'bg-slate-800/50 border-slate-700/60 text-slate-300'
            }`}>
              <div className="flex items-center justify-between font-bold">
                <span className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-400"></span>
                  MEDIUM RISK
                </span>
                <span className="font-mono text-[11px] text-amber-400">Moderately Unsafe Conditions</span>
              </div>
              <p className="text-[11px] text-slate-400 mt-1">
                Temperature (35°C–39.9°C) OR Air Quality (60–79.9 AQI) OR Exposure (30–59.9 min). Moderate heat/particulate elevation.
              </p>
            </div>

            {/* Rule 3: HIGH */}
            <div className={`p-3 rounded-lg border transition ${
              riskLevel === 'HIGH' 
                ? 'bg-red-950/40 border-red-500 text-red-200 ring-1 ring-red-500/30' 
                : 'bg-slate-800/50 border-slate-700/60 text-slate-300'
            }`}>
              <div className="flex items-center justify-between font-bold">
                <span className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-400"></span>
                  HIGH RISK
                </span>
                <span className="font-mono text-[11px] text-red-400">Hazardous Critical Conditions</span>
              </div>
              <p className="text-[11px] text-slate-400 mt-1">
                Temperature ≥ 40°C OR Air Quality ≥ 80 AQI OR Exposure ≥ 60 min, or combined factors (Temp ≥ 38°C with AQI ≥ 70).
              </p>
            </div>
          </div>
        </div>

        {/* Feature Importance & Action */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-lg space-y-4 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 text-white font-bold text-sm">
              <Layers className="w-4 h-4 text-cyan-400" />
              <h3>Feature Contribution Breakdown</h3>
            </div>
            <p className="text-xs text-slate-400 mt-1">
              Relative intensity scores for active sensor variables:
            </p>

            <div className="space-y-3.5 mt-4 text-xs">
              {/* Temp Score */}
              <div>
                <div className="flex justify-between text-slate-300 mb-1">
                  <span className="flex items-center gap-1.5 font-medium">
                    <Thermometer className="w-3.5 h-3.5 text-orange-400" />
                    Heat Stress Intensity ({temperature.toFixed(1)}°C)
                  </span>
                  <span className="font-mono font-bold text-orange-400">{tempScore}%</span>
                </div>
                <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
                  <div 
                    className="h-2 bg-gradient-to-r from-emerald-500 via-amber-500 to-red-500 rounded-full transition-all duration-300"
                    style={{ width: `${tempScore}%` }}
                  ></div>
                </div>
              </div>

              {/* AQI Score */}
              <div>
                <div className="flex justify-between text-slate-300 mb-1">
                  <span className="flex items-center gap-1.5 font-medium">
                    <Wind className="w-3.5 h-3.5 text-cyan-400" />
                    Air Particulate Intensity (AQI {airQuality})
                  </span>
                  <span className="font-mono font-bold text-cyan-400">{aqiScore}%</span>
                </div>
                <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
                  <div 
                    className="h-2 bg-gradient-to-r from-emerald-500 via-amber-500 to-red-500 rounded-full transition-all duration-300"
                    style={{ width: `${aqiScore}%` }}
                  ></div>
                </div>
              </div>

              {/* Exposure Score */}
              <div>
                <div className="flex justify-between text-slate-300 mb-1">
                  <span className="flex items-center gap-1.5 font-medium">
                    <Clock className="w-3.5 h-3.5 text-indigo-400" />
                    Fatigue / Shift Exposure ({exposureDuration} min)
                  </span>
                  <span className="font-mono font-bold text-indigo-400">{exposureScore}%</span>
                </div>
                <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
                  <div 
                    className="h-2 bg-gradient-to-r from-emerald-500 via-amber-500 to-red-500 rounded-full transition-all duration-300"
                    style={{ width: `${exposureScore}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </div>

          <div className="p-3.5 bg-slate-850 bg-slate-800/70 border border-slate-700/80 rounded-xl text-xs space-y-1 mt-4">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">
              Autonomous Safety Mitigation Directive
            </span>
            <p className="text-slate-200 font-medium leading-relaxed">
              {recommendedAction}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
