import React from 'react';
import { 
  Info, 
  Cpu, 
  Layers, 
  CheckCircle2, 
  Terminal, 
  GraduationCap, 
  HelpCircle, 
  FileText,
  Activity,
  Fan,
  Bell,
  LineChart,
  Flame,
  Thermometer,
  Wind,
  Clock
} from 'lucide-react';

export const ProjectInfo: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* Primary Project Explanation Required by Prompt */}
      <div 
        id="project-info-overview"
        className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl relative overflow-hidden"
      >
        <div className="flex items-start gap-4">
          <div className="p-3 rounded-xl bg-amber-500/15 text-amber-400 border border-amber-500/30 shrink-0">
            <GraduationCap className="w-7 h-7" />
          </div>

          <div className="space-y-3">
            <div className="flex items-center gap-2 flex-wrap">
              <h2 className="text-xl font-bold text-white tracking-tight">
                Project Overview &amp; Reviewer Abstract
              </h2>
              <span className="px-2.5 py-0.5 rounded text-xs font-mono font-bold bg-amber-950 text-amber-300 border border-amber-700">
                35% Project Prototype Review
              </span>
            </div>

            {/* Exact Quote Required by Prompt */}
            <div className="p-4 rounded-xl bg-slate-850 bg-slate-800/80 border border-slate-700 text-slate-200 text-sm leading-relaxed font-medium">
              "Smart Industrial Air &amp; Heat Risk Monitoring System uses environmental sensor data such as temperature, air quality and exposure duration to estimate workplace risk levels. The prototype demonstrates how monitoring, AI-based risk prediction, alerts, historical analysis and automatic fan control can work together."
            </div>

            <p className="text-xs text-slate-400 leading-relaxed">
              Tailored for <strong className="text-amber-300">goldsmith workshops and jewelry metallurgy units</strong> where artisans face extreme radiant heat from melting crucibles/soldering torches, and toxic airborne particulates from flux (borax/fluoride), acid pickling (sulfuric/nitric), and molten alloy fumes.
            </p>
          </div>
        </div>
      </div>

      {/* System Architecture & Review Presentation Guide */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Core Architecture Block Diagram */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-lg space-y-4">
          <div className="flex items-center gap-2 text-white font-bold text-sm">
            <Layers className="w-4 h-4 text-cyan-400" />
            <h3>System Architecture &amp; Signal Pipeline</h3>
          </div>
          <p className="text-xs text-slate-400">
            End-to-end signal flow from physical sensing simulation to autonomous actuation:
          </p>

          <div className="space-y-3 text-xs">
            {/* Step 1 */}
            <div className="p-3 rounded-lg bg-slate-800/60 border border-slate-700 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <span className="w-6 h-6 rounded-full bg-cyan-500/20 text-cyan-400 font-mono font-bold flex items-center justify-center text-xs">
                  1
                </span>
                <div>
                  <span className="font-bold text-slate-200 block">Sensing Layer (Simulated Telemetry)</span>
                  <span className="text-[11px] text-slate-400">DHT22 (Temperature) + MQ-135 (Air Quality) + Shift Chronometer</span>
                </div>
              </div>
              <span className="text-[10px] font-mono text-cyan-400">INPUT</span>
            </div>

            {/* Step 2 */}
            <div className="p-3 rounded-lg bg-slate-800/60 border border-slate-700 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <span className="w-6 h-6 rounded-full bg-amber-500/20 text-amber-400 font-mono font-bold flex items-center justify-center text-xs">
                  2
                </span>
                <div>
                  <span className="font-bold text-slate-200 block">Rule-Based AI Inference Model</span>
                  <span className="text-[11px] text-slate-400">Multi-criteria fuzzy decision rules estimating LOW / MEDIUM / HIGH risk</span>
                </div>
              </div>
              <span className="text-[10px] font-mono text-amber-400">PROCESSING</span>
            </div>

            {/* Step 3 */}
            <div className="p-3 rounded-lg bg-slate-800/60 border border-slate-700 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <span className="w-6 h-6 rounded-full bg-teal-500/20 text-teal-400 font-mono font-bold flex items-center justify-center text-xs">
                  3
                </span>
                <div>
                  <span className="font-bold text-slate-200 block">Actuation &amp; Control Feedback</span>
                  <span className="text-[11px] text-slate-400">Smart Fan auto-scales duty cycle: Low (30%) → Med (60%) → High (90%)</span>
                </div>
              </div>
              <span className="text-[10px] font-mono text-teal-400">ACTUATION</span>
            </div>

            {/* Step 4 */}
            <div className="p-3 rounded-lg bg-slate-800/60 border border-slate-700 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <span className="w-6 h-6 rounded-full bg-red-500/20 text-red-400 font-mono font-bold flex items-center justify-center text-xs">
                  4
                </span>
                <div>
                  <span className="font-bold text-slate-200 block">Safety Alert Dispatch &amp; History Logging</span>
                  <span className="text-[11px] text-slate-400">Visual hazard triggers, suction check alerts, audit trail analytics</span>
                </div>
              </div>
              <span className="text-[10px] font-mono text-red-400">SAFETY</span>
            </div>
          </div>
        </div>

        {/* Student Viva Review Q&A Cheat Sheet */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-lg space-y-4">
          <div className="flex items-center gap-2 text-white font-bold text-sm">
            <HelpCircle className="w-4 h-4 text-amber-400" />
            <h3>College Reviewer Q&amp;A Cheat Sheet</h3>
          </div>
          <p className="text-xs text-slate-400">
            Key points for a student to explain clearly during their project presentation:
          </p>

          <div className="space-y-3 text-xs">
            <div className="p-3 bg-slate-800/60 rounded-lg border border-slate-700">
              <strong className="text-amber-300 block mb-1">
                Q1: Why is this rule-based AI instead of a deep neural network?
              </strong>
              <p className="text-slate-300 leading-relaxed text-[11px]">
                In industrial safety edge hardware (like microcontrollers), rule-based expert systems provide zero latency, 100% explainability, and deterministic safety compliance without needing expensive cloud GPU infrastructure.
              </p>
            </div>

            <div className="p-3 bg-slate-800/60 rounded-lg border border-slate-700">
              <strong className="text-amber-300 block mb-1">
                Q2: How does the Smart Fan respond to environmental risk?
              </strong>
              <p className="text-slate-300 leading-relaxed text-[11px]">
                In Auto Mode, the fan duty cycle maps directly to the estimated risk: Low Risk sets 30% speed (energy-saving), Medium sets 60% speed (preventive air flow), and High sets 90% speed (critical suction exhaust).
              </p>
            </div>

            <div className="p-3 bg-slate-800/60 rounded-lg border border-slate-700">
              <strong className="text-amber-300 block mb-1">
                Q3: What hardware will be used in the 100% final completion phase?
              </strong>
              <p className="text-slate-300 leading-relaxed text-[11px]">
                ESP32 dual-core microcontroller, DHT22 temperature sensor, MQ-135 gas/smoke sensor, 12V 4-wire PWM industrial fan, and an I2C OLED display or RS-485 Modbus telemetry bridge.
              </p>
            </div>

            <div className="p-3 bg-slate-800/60 rounded-lg border border-slate-700">
              <strong className="text-amber-300 block mb-1">
                Q4: Why is this specialized for Goldsmith &amp; Jewelry workshops?
              </strong>
              <p className="text-slate-300 leading-relaxed text-[11px]">
                Goldsmiths work in close proximity to butane/oxygen torches, molten gold crucibles (1064°C), borax/fluoride flux gases, and pickling acid vapors. Automated suction extraction prevents metal fume fever and occupational respiratory illness.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Goldsmith Workshop Hazards Matrix */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-lg space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Flame className="w-4 h-4 text-amber-400" />
            <h3 className="font-bold text-white text-sm">
              Goldsmith Workshop Occupational Hazard Matrix
            </h3>
          </div>
          <span className="text-[11px] font-mono text-amber-400 font-semibold">
            Micro-Environment Safety Protocol
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
          <div className="p-3.5 rounded-lg bg-slate-800/60 border border-slate-700 space-y-1.5">
            <span className="text-orange-400 font-bold block flex items-center gap-1.5">
              <Thermometer className="w-3.5 h-3.5" />
              1. Torch &amp; Crucible Heat
            </span>
            <p className="text-slate-300 text-[11px] leading-relaxed">
              Open flame micro-torches and electric melting furnaces generate severe ambient radiant heat (35°C–42°C+), causing dehydration, eye strain, and heat exhaustion.
            </p>
          </div>

          <div className="p-3.5 rounded-lg bg-slate-800/60 border border-slate-700 space-y-1.5">
            <span className="text-cyan-400 font-bold block flex items-center gap-1.5">
              <Wind className="w-3.5 h-3.5" />
              2. Flux &amp; Acid Fumes (AQI)
            </span>
            <p className="text-slate-300 text-[11px] leading-relaxed">
              Borax flux breakdown, zinc/cadmium solder vapors, and sulfuric/nitric acid pickling baths release irritant gases, monitored via the MQ-135 particulate node.
            </p>
          </div>

          <div className="p-3.5 rounded-lg bg-slate-800/60 border border-slate-700 space-y-1.5">
            <span className="text-indigo-400 font-bold block flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5" />
              3. Bench Exposure Duration
            </span>
            <p className="text-slate-300 text-[11px] leading-relaxed">
              High precision stone setting and filigree soldering enforce prolonged sedentary posture under fume hoods, necessitating automated shift rotation alarms.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
