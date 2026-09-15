import React, { useState } from 'react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer, 
  ReferenceLine, 
  ReferenceArea,
  AreaChart,
  Area
} from 'recharts';
import { 
  Clock, 
  Thermometer, 
  Wind, 
  AlertTriangle, 
  Download, 
  RotateCcw, 
  Calendar,
  Layers,
  Flame,
  CheckCircle2
} from 'lucide-react';
import { SensorReading } from '../types';

interface HistorySectionProps {
  history: SensorReading[];
  onResetHistory: () => void;
}

export const HistorySection: React.FC<HistorySectionProps> = ({
  history,
  onResetHistory,
}) => {
  const [activeChartTab, setActiveChartTab] = useState<'temp-aqi' | 'risk'>('temp-aqi');

  // Map history data for recharts with numeric risk level for graphing:
  // LOW = 1, MEDIUM = 2, HIGH = 3
  const chartData = history.map((item) => {
    let numericRisk = 1;
    if (item.riskLevel === 'MEDIUM') numericRisk = 2;
    if (item.riskLevel === 'HIGH') numericRisk = 3;

    return {
      ...item,
      numericRisk,
      isHighRisk: item.riskLevel === 'HIGH',
    };
  });

  // Count high risk periods
  const highRiskCount = history.filter((h) => h.riskLevel === 'HIGH').length;
  const maxTemp = Math.max(...history.map((h) => h.temperature));
  const maxAqi = Math.max(...history.map((h) => h.airQuality));

  // Custom tooltip for recharts
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload as SensorReading & { numericRisk: number };
      return (
        <div className="bg-slate-900 border border-slate-700 p-3 rounded-lg shadow-xl text-xs space-y-1 font-mono">
          <div className="font-bold text-white border-b border-slate-700 pb-1 flex justify-between gap-4">
            <span>Time: {label}</span>
            <span className={`px-1.5 py-0.5 rounded text-[10px] ${
              data.riskLevel === 'HIGH' 
                ? 'bg-red-950 text-red-300 border border-red-800' 
                : data.riskLevel === 'MEDIUM' 
                ? 'bg-amber-950 text-amber-300 border border-amber-800' 
                : 'bg-emerald-950 text-emerald-300 border border-emerald-800'
            }`}>
              {data.riskLevel} RISK
            </span>
          </div>
          <div className="text-orange-400">Temperature: {data.temperature.toFixed(1)}°C</div>
          <div className="text-cyan-400">Air Quality: {data.airQuality} AQI</div>
          <div className="text-indigo-400">Exposure: {data.exposureDuration} min</div>
          <div className="text-teal-400">Fan Speed: {data.fanSpeed}%</div>
          {data.riskLevel === 'HIGH' && (
            <div className="text-red-400 font-bold mt-1 text-[11px]">
              ⚠️ HIGH-RISK PERIOD
            </div>
          )}
        </div>
      );
    }
    return null;
  };

  const handleExportCSV = () => {
    const headers = 'Time,Temperature(°C),AirQuality(AQI),Exposure(min),RiskLevel,FanSpeed(%),Alert\n';
    const rows = history
      .map(
        (h) =>
          `${h.timeStr},${h.temperature},${h.airQuality},${h.exposureDuration},${h.riskLevel},${h.fanSpeed},"${h.alertMessage}"`
      )
      .join('\n');
    const blob = new Blob([headers + rows], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `industrial_safety_telemetry_${Date.now()}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      {/* Overview Stats Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 shadow">
          <span className="text-slate-400 text-xs block">Total Logged Samples</span>
          <span className="text-2xl font-bold font-mono text-white mt-1 block">
            {history.length}
          </span>
          <span className="text-[11px] text-slate-500 mt-1 block">5-minute intervals</span>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 shadow">
          <span className="text-slate-400 text-xs block">Peak Temperature</span>
          <span className="text-2xl font-bold font-mono text-orange-400 mt-1 block">
            {maxTemp.toFixed(1)}°C
          </span>
          <span className="text-[11px] text-slate-500 mt-1 block">Thermal stress ceiling</span>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 shadow">
          <span className="text-slate-400 text-xs block">Peak Air Quality</span>
          <span className="text-2xl font-bold font-mono text-cyan-400 mt-1 block">
            {maxAqi} AQI
          </span>
          <span className="text-[11px] text-slate-500 mt-1 block">Particulate surge</span>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 shadow">
          <span className="text-slate-400 text-xs block">High-Risk Periods</span>
          <span className={`text-2xl font-bold font-mono mt-1 block ${highRiskCount > 0 ? 'text-red-400' : 'text-emerald-400'}`}>
            {highRiskCount} Detected
          </span>
          <span className="text-[11px] text-slate-500 mt-1 block">
            {highRiskCount > 0 ? '⚠️ High-hazard intervals' : 'Safe operation'}
          </span>
        </div>
      </div>

      {/* Chart Section Container */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
          <div>
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <Calendar className="w-5 h-5 text-cyan-400" />
              Environmental Telemetry &amp; Risk Trend History
            </h2>
            <p className="text-xs text-slate-400">
              Interactive timeline showing Temperature, Air Quality, and High-Risk Periods
            </p>
          </div>

          {/* Chart View Switcher */}
          <div className="flex items-center gap-2">
            <div className="bg-slate-800 p-1 rounded-lg border border-slate-700 flex text-xs">
              <button
                onClick={() => setActiveChartTab('temp-aqi')}
                className={`px-3 py-1 rounded-md font-medium transition cursor-pointer ${
                  activeChartTab === 'temp-aqi'
                    ? 'bg-amber-500 text-slate-950 font-bold'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Temp &amp; Air Quality
              </button>
              <button
                onClick={() => setActiveChartTab('risk')}
                className={`px-3 py-1 rounded-md font-medium transition cursor-pointer ${
                  activeChartTab === 'risk'
                    ? 'bg-amber-500 text-slate-950 font-bold'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Risk Levels (Low/Med/High)
              </button>
            </div>

            <button
              onClick={handleExportCSV}
              className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-medium flex items-center gap-1.5 transition cursor-pointer"
              title="Download Telemetry CSV"
            >
              <Download className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Export CSV</span>
            </button>
          </div>
        </div>

        {/* Visual High-Risk Periods Highlighting Notice */}
        <div className="my-4 p-3 rounded-lg bg-red-950/20 border border-red-500/30 flex items-center justify-between text-xs">
          <div className="flex items-center gap-2 text-red-300">
            <AlertTriangle className="w-4 h-4 text-red-400 shrink-0" />
            <span>
              <strong>High-Risk Visual Zone:</strong> Shaded background zones and red threshold lines indicate when worker environmental safety limits were breached (e.g. 10:30–10:40).
            </span>
          </div>
          <span className="font-mono text-red-400 font-bold px-2 py-0.5 bg-red-950/80 rounded border border-red-800 hidden md:inline">
            Danger: ≥40°C or ≥80 AQI
          </span>
        </div>

        {/* Recharts Container */}
        <div className="h-80 w-full mt-4">
          {activeChartTab === 'temp-aqi' ? (
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData} margin={{ top: 10, right: 20, left: 0, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.5} />
                <XAxis 
                  dataKey="timeStr" 
                  stroke="#94a3b8" 
                  tick={{ fill: '#94a3b8', fontSize: 12 }} 
                />
                <YAxis 
                  yAxisId="left" 
                  stroke="#f97316" 
                  domain={[30, 46]} 
                  tick={{ fill: '#f97316', fontSize: 12 }}
                  label={{ value: 'Temp (°C)', angle: -90, position: 'insideLeft', fill: '#f97316', fontSize: 11 }}
                />
                <YAxis 
                  yAxisId="right" 
                  orientation="right" 
                  stroke="#06b6d4" 
                  domain={[40, 110]} 
                  tick={{ fill: '#06b6d4', fontSize: 12 }}
                  label={{ value: 'Air Quality (AQI)', angle: 90, position: 'insideRight', fill: '#06b6d4', fontSize: 11 }}
                />
                <Tooltip content={<CustomTooltip />} />
                <Legend 
                  verticalAlign="top" 
                  height={36} 
                  wrapperStyle={{ color: '#e2e8f0', fontSize: '12px' }} 
                />

                {/* Critical Safety Threshold Reference Lines */}
                <ReferenceLine 
                  yAxisId="left" 
                  y={40} 
                  label={{ value: 'Danger: 40°C', fill: '#ef4444', fontSize: 10, position: 'top' }} 
                  stroke="#ef4444" 
                  strokeDasharray="4 4" 
                />
                <ReferenceLine 
                  yAxisId="right" 
                  y={80} 
                  label={{ value: 'Danger: 80 AQI', fill: '#ef4444', fontSize: 10, position: 'top' }} 
                  stroke="#ef4444" 
                  strokeDasharray="4 4" 
                />

                {/* High Risk Period Reference Markers */}
                <ReferenceLine 
                  yAxisId="left" 
                  x="10:30" 
                  stroke="#ef4444" 
                  strokeDasharray="3 3"
                  strokeWidth={2}
                  label={{ value: '⚠️ High Risk Start (10:30)', fill: '#ef4444', fontSize: 10, position: 'insideTopLeft' }} 
                />
                <ReferenceLine 
                  yAxisId="left" 
                  x="10:40" 
                  stroke="#ef4444" 
                  strokeDasharray="3 3"
                  strokeWidth={2}
                  label={{ value: '⚠️ High Risk End (10:40)', fill: '#ef4444', fontSize: 10, position: 'insideTopRight' }} 
                />

                <Line 
                  yAxisId="left" 
                  type="monotone" 
                  dataKey="temperature" 
                  name="Temperature (°C)" 
                  stroke="#f97316" 
                  strokeWidth={2.5} 
                  dot={{ r: 4, fill: '#f97316' }} 
                  activeDot={{ r: 7 }} 
                />
                <Line 
                  yAxisId="right" 
                  type="monotone" 
                  dataKey="airQuality" 
                  name="Air Quality (AQI)" 
                  stroke="#06b6d4" 
                  strokeWidth={2.5} 
                  dot={{ r: 4, fill: '#06b6d4' }} 
                  activeDot={{ r: 7 }} 
                />
              </LineChart>
            </ResponsiveContainer>
          ) : (
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData} margin={{ top: 10, right: 20, left: 0, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.5} />
                <XAxis 
                  dataKey="timeStr" 
                  stroke="#94a3b8" 
                  tick={{ fill: '#94a3b8', fontSize: 12 }} 
                />
                <YAxis 
                  domain={[0.5, 3.5]} 
                  ticks={[1, 2, 3]} 
                  tickFormatter={(val) => (val === 3 ? 'HIGH' : val === 2 ? 'MED' : 'LOW')}
                  stroke="#94a3b8" 
                  tick={{ fill: '#94a3b8', fontSize: 11 }}
                />
                <Tooltip content={<CustomTooltip />} />
                <Legend 
                  verticalAlign="top" 
                  height={36} 
                  wrapperStyle={{ color: '#e2e8f0', fontSize: '12px' }} 
                />

                <ReferenceLine y={2.5} stroke="#ef4444" strokeDasharray="3 3" label={{ value: 'High Risk Threshold', fill: '#ef4444', fontSize: 10 }} />

                <defs>
                  <linearGradient id="riskGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#ef4444" stopOpacity={0.8}/>
                    <stop offset="50%" stopColor="#f59e0b" stopOpacity={0.6}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0.2}/>
                  </linearGradient>
                </defs>

                <Area 
                  type="stepAfter" 
                  dataKey="numericRisk" 
                  name="Risk Level (1=Low, 2=Medium, 3=High)" 
                  stroke="#f59e0b" 
                  strokeWidth={2.5}
                  fillOpacity={1} 
                  fill="url(#riskGradient)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          )}
        </div>
      </div>

      {/* Required Data Table from Prompt:
          Time       Temperature
          10:00      35°C
          10:10      36°C
          10:20      38°C
          10:30      40°C
      */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Clock className="w-4 h-4 text-amber-400" />
              Sensor Telemetry Records (Last 12–15 Readings)
            </h3>
            <p className="text-xs text-slate-400">
              Audit trail showing timestamps, sensor readings, predicted risk, and fan speed
            </p>
          </div>

          <button
            onClick={onResetHistory}
            className="self-start sm:self-auto flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset History Log</span>
          </button>
        </div>

        <div className="overflow-x-auto rounded-xl border border-slate-800">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-800/80 text-slate-400 font-semibold uppercase tracking-wider text-[11px] border-b border-slate-700">
              <tr>
                <th className="py-3 px-4">Time</th>
                <th className="py-3 px-4">Temperature</th>
                <th className="py-3 px-4">Air Quality</th>
                <th className="py-3 px-4">Exposure</th>
                <th className="py-3 px-4">Risk Level</th>
                <th className="py-3 px-4">Fan Speed</th>
                <th className="py-3 px-4">Alert Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 font-mono">
              {history.map((reading) => {
                const isHigh = reading.riskLevel === 'HIGH';
                const isMed = reading.riskLevel === 'MEDIUM';
                return (
                  <tr 
                    key={reading.id}
                    className={`transition hover:bg-slate-800/50 ${
                      isHigh ? 'bg-red-950/30 text-red-200 font-bold' : ''
                    }`}
                  >
                    <td className="py-2.5 px-4 font-semibold text-slate-200">
                      {reading.timeStr}
                    </td>
                    <td className="py-2.5 px-4">
                      <span className={reading.temperature >= 40 ? 'text-red-400 font-bold' : reading.temperature >= 35 ? 'text-amber-400' : 'text-emerald-400'}>
                        {reading.temperature.toFixed(1)}°C
                      </span>
                    </td>
                    <td className="py-2.5 px-4">
                      <span className={reading.airQuality >= 80 ? 'text-red-400 font-bold' : reading.airQuality >= 60 ? 'text-cyan-400' : 'text-slate-300'}>
                        {reading.airQuality} AQI
                      </span>
                    </td>
                    <td className="py-2.5 px-4 text-slate-300">
                      {reading.exposureDuration} min
                    </td>
                    <td className="py-2.5 px-4">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        isHigh 
                          ? 'bg-red-950 text-red-300 border border-red-700' 
                          : isMed 
                          ? 'bg-amber-950 text-amber-300 border border-amber-700' 
                          : 'bg-emerald-950 text-emerald-300 border border-emerald-700'
                      }`}>
                        {isHigh ? '🔴 HIGH' : isMed ? '🟡 MEDIUM' : '🟢 LOW'}
                      </span>
                    </td>
                    <td className="py-2.5 px-4 text-teal-400 font-semibold">
                      {reading.fanSpeed}%
                    </td>
                    <td className="py-2.5 px-4">
                      {isHigh ? (
                        <span className="text-red-400 flex items-center gap-1 font-sans text-xs">
                          <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
                          Ventilation Alert
                        </span>
                      ) : (
                        <span className="text-slate-500 font-sans text-xs">
                          Normal
                        </span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
