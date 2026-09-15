/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { Header } from './components/Header';
import { DashboardHome } from './components/DashboardHome';
import { LiveMonitoring } from './components/LiveMonitoring';
import { AiPrediction } from './components/AiPrediction';
import { AlertSystem } from './components/AlertSystem';
import { HistorySection } from './components/HistorySection';
import { FanControl } from './components/FanControl';
import { SimulationControls } from './components/SimulationControls';
import { ProjectInfo } from './components/ProjectInfo';
import { evaluateRisk, generateInitialHistory } from './utils/riskLogic';
import { SensorReading } from './types';
import { Sliders, Radio, Sparkles, ChevronUp, ChevronDown } from 'lucide-react';

export default function App() {
  // Navigation tab
  const [activeTab, setActiveTab] = useState<string>('dashboard');

  // Core Sensor Telemetry State (Initialized to prompt defaults: Temp 38°C, AQI 72, Exposure 24 min)
  const [temperature, setTemperature] = useState<number>(38.0);
  const [airQuality, setAirQuality] = useState<number>(72);
  const [exposureDuration, setExposureDuration] = useState<number>(24);

  // Fan State (Prompt default: ON)
  const [fanStatus, setFanStatus] = useState<'ON' | 'OFF'>('ON');
  const [autoFan, setAutoFan] = useState<boolean>(true);
  const [manualFanSpeed, setManualFanSpeed] = useState<number>(60);

  // Simulation State
  const [simulationAutoRunning, setSimulationAutoRunning] = useState<boolean>(true);
  const [showSimDrawer, setShowSimDrawer] = useState<boolean>(false);
  const [showQuickSimBar, setShowQuickSimBar] = useState<boolean>(true);
  const [packetCount, setPacketCount] = useState<number>(142);

  // History State
  const [history, setHistory] = useState<SensorReading[]>(() => generateInitialHistory());

  // Clock
  const [currentTimeStr, setCurrentTimeStr] = useState<string>('10:55:00 AM');

  // Evaluate risk dynamically whenever sensor values change
  const riskEvaluation = evaluateRisk(temperature, airQuality, exposureDuration);

  // Active fan speed: auto (based on risk) or manual
  const effectiveFanSpeed = fanStatus === 'OFF' 
    ? 0 
    : autoFan 
    ? riskEvaluation.fanSpeed 
    : manualFanSpeed;

  // Real-time clock update
  useEffect(() => {
    const updateTime = () => {
      const d = new Date();
      setCurrentTimeStr(
        d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })
      );
    };
    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  // Simulated live sensor updates every 3.5 seconds
  // Specifications from prompt:
  // "Temperature can change between 35°C and 42°C."
  // "Air quality can change between 50 and 100."
  // "Exposure duration should gradually increase."
  useEffect(() => {
    if (!simulationAutoRunning) return;

    const interval = setInterval(() => {
      setTemperature((prev) => {
        // Random fluctuation between -0.4 and +0.4
        const delta = (Math.random() - 0.48) * 0.8;
        const next = Math.round((prev + delta) * 10) / 10;
        // Clamp strictly between 35.0°C and 42.0°C
        return Math.min(42.0, Math.max(35.0, next));
      });

      setAirQuality((prev) => {
        // Random fluctuation between -2 and +2
        const delta = Math.floor((Math.random() - 0.48) * 4);
        const next = prev + delta;
        // Clamp strictly between 50 and 100
        return Math.min(100, Math.max(50, next));
      });

      setPacketCount((p) => p + 1);
    }, 3500);

    return () => clearInterval(interval);
  }, [simulationAutoRunning]);

  // Gradual increase of exposure duration (e.g. every 20 seconds of simulation adds +1 min)
  useEffect(() => {
    if (!simulationAutoRunning) return;

    const expInterval = setInterval(() => {
      setExposureDuration((prev) => (prev >= 120 ? 0 : prev + 1));
    }, 20000);

    return () => clearInterval(expInterval);
  }, [simulationAutoRunning]);

  // Periodically append new live telemetry reading to history
  const historyAppendRef = useRef<number>(Date.now());
  useEffect(() => {
    // Append every 25 seconds if live streaming
    if (!simulationAutoRunning) return;

    const histInterval = setInterval(() => {
      const now = new Date();
      const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      const currentEval = evaluateRisk(temperature, airQuality, exposureDuration);

      const newReading: SensorReading = {
        id: `stream-${Date.now()}`,
        timeStr,
        timestamp: Date.now(),
        temperature,
        airQuality,
        exposureDuration,
        riskLevel: currentEval.riskLevel,
        fanSpeed: effectiveFanSpeed,
        fanStatus,
        alertActive: currentEval.alertActive,
        alertMessage: currentEval.alertMessage,
      };

      setHistory((prev) => {
        const updated = [...prev, newReading];
        // Keep last 15 readings
        if (updated.length > 15) {
          return updated.slice(updated.length - 15);
        }
        return updated;
      });
    }, 25000);

    return () => clearInterval(histInterval);
  }, [simulationAutoRunning, temperature, airQuality, exposureDuration, effectiveFanSpeed, fanStatus]);

  // Reset to prompt initial defaults
  const handleResetToDefaults = () => {
    setTemperature(38.0);
    setAirQuality(72);
    setExposureDuration(24);
    setFanStatus('ON');
    setAutoFan(true);
    setManualFanSpeed(60);
  };

  const handleResetHistory = () => {
    setHistory(generateInitialHistory());
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-amber-500 selection:text-slate-950">
      {/* Top Header & Navigation */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        currentRisk={riskEvaluation.riskLevel}
        alertActive={riskEvaluation.alertActive}
        simulationAutoRunning={simulationAutoRunning}
        onToggleSimDrawer={() => setShowSimDrawer(true)}
        currentTimeStr={currentTimeStr}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        {/* Render Tab Content */}
        {activeTab === 'dashboard' && (
          <DashboardHome
            temperature={temperature}
            airQuality={airQuality}
            exposureDuration={exposureDuration}
            riskEvaluation={riskEvaluation}
            fanStatus={fanStatus}
            fanSpeed={effectiveFanSpeed}
            autoFan={autoFan}
            onNavigate={setActiveTab}
            onOpenSimulation={() => setShowSimDrawer(true)}
          />
        )}

        {activeTab === 'live' && (
          <LiveMonitoring
            temperature={temperature}
            airQuality={airQuality}
            exposureDuration={exposureDuration}
            riskEvaluation={riskEvaluation}
            fanStatus={fanStatus}
            fanSpeed={effectiveFanSpeed}
            simulationAutoRunning={simulationAutoRunning}
            onToggleAutoSimulation={() => setSimulationAutoRunning(!simulationAutoRunning)}
            onOpenSimulation={() => setShowSimDrawer(true)}
            onResetToDefaults={handleResetToDefaults}
            packetCount={packetCount}
          />
        )}

        {activeTab === 'ai-prediction' && (
          <AiPrediction
            temperature={temperature}
            airQuality={airQuality}
            exposureDuration={exposureDuration}
            riskEvaluation={riskEvaluation}
          />
        )}

        {activeTab === 'alerts' && (
          <AlertSystem
            riskEvaluation={riskEvaluation}
            temperature={temperature}
            airQuality={airQuality}
            exposureDuration={exposureDuration}
            onOpenSimulation={() => setShowSimDrawer(true)}
            onNavigate={setActiveTab}
          />
        )}

        {activeTab === 'history' && (
          <HistorySection
            history={history}
            onResetHistory={handleResetHistory}
          />
        )}

        {activeTab === 'fan-control' && (
          <FanControl
            autoFan={autoFan}
            onToggleAutoFan={setAutoFan}
            fanSpeed={effectiveFanSpeed}
            onManualSpeedChange={setManualFanSpeed}
            fanStatus={fanStatus}
            onToggleFanPower={() => setFanStatus(fanStatus === 'ON' ? 'OFF' : 'ON')}
            riskEvaluation={riskEvaluation}
            onOpenSimulation={() => setShowSimDrawer(true)}
          />
        )}

        {activeTab === 'project-info' && (
          <ProjectInfo />
        )}

        {/* Floating / Bottom Collapsible Quick Simulation Controller for Reviewers */}
        <div className="pt-4 border-t border-slate-900">
          <div className="bg-slate-900/95 border border-slate-800 rounded-xl p-4 shadow-xl">
            <div className="flex items-center justify-between">
              <button
                onClick={() => setShowQuickSimBar(!showQuickSimBar)}
                className="flex items-center gap-2 text-xs font-bold text-slate-300 hover:text-white transition cursor-pointer"
              >
                <Sliders className="w-4 h-4 text-amber-400" />
                <span>Interactive College Reviewer Simulation Bar</span>
                <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-amber-950/80 text-amber-300 border border-amber-800">
                  Demo Controls
                </span>
                {showQuickSimBar ? <ChevronUp className="w-3.5 h-3.5 text-slate-400" /> : <ChevronDown className="w-3.5 h-3.5 text-slate-400" />}
              </button>

              <button
                onClick={() => setShowSimDrawer(true)}
                className="text-xs text-amber-400 hover:text-amber-300 font-semibold cursor-pointer underline underline-offset-4"
              >
                Open Full Simulation Suite →
              </button>
            </div>

            {showQuickSimBar && (
              <div className="mt-4 pt-3 border-t border-slate-800">
                <SimulationControls
                  temperature={temperature}
                  setTemperature={setTemperature}
                  airQuality={airQuality}
                  setAirQuality={setAirQuality}
                  exposureDuration={exposureDuration}
                  setExposureDuration={setExposureDuration}
                  riskEvaluation={riskEvaluation}
                  fanSpeed={effectiveFanSpeed}
                  simulationAutoRunning={simulationAutoRunning}
                  onToggleAutoSimulation={() => setSimulationAutoRunning(!simulationAutoRunning)}
                />
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Modal / Drawer for Full Simulation Controls */}
      {showSimDrawer && (
        <div 
          id="sim-modal-backdrop"
          className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto"
        >
          <div className="max-w-3xl w-full my-8">
            <SimulationControls
              temperature={temperature}
              setTemperature={setTemperature}
              airQuality={airQuality}
              setAirQuality={setAirQuality}
              exposureDuration={exposureDuration}
              setExposureDuration={setExposureDuration}
              riskEvaluation={riskEvaluation}
              fanSpeed={effectiveFanSpeed}
              simulationAutoRunning={simulationAutoRunning}
              onToggleAutoSimulation={() => setSimulationAutoRunning(!simulationAutoRunning)}
              onClose={() => setShowSimDrawer(false)}
              isModalOrDrawer={true}
            />
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="border-t border-slate-900 bg-slate-950 py-6 text-xs text-slate-500 text-center space-y-1">
        <p className="font-medium text-slate-400">
          Smart Industrial Air &amp; Heat Risk Monitoring System • Goldsmith &amp; Jewelry Metallurgy Edition (35% Review Prototype)
        </p>
        <p className="text-[11px] text-slate-600">
          Simulated Goldsmith Environmental Telemetry (Torch Heat DHT22, Solder/Flux Fumes MQ-135, Bench Suction Hood PWM Relay).
        </p>
      </footer>
    </div>
  );
}
