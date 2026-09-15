/**
 * Smart Industrial Air & Heat Risk Monitoring System
 * Risk Evaluation & Simulation Engine
 * 
 * Designed to be transparent and clear for a college presentation / viva review.
 */

import { RiskEvaluation, RiskLevel, SensorReading } from '../types';

/**
 * Evaluates environmental risk level using rule-based AI simulation logic.
 * 
 * Rules:
 * - LOW: Safe conditions (Temp < 35°C, AQI < 60, Exposure < 30 min)
 * - MEDIUM: Moderately unsafe (Temp 35-39.9°C OR AQI 60-79.9 OR Exposure 30-59.9 min)
 * - HIGH: Very high temp (>= 40°C), poor air quality (>= 80), prolonged exposure (>= 60 min),
 *         or severe compound conditions (e.g. Temp >= 38°C with AQI >= 70).
 */
export function evaluateRisk(
  temperature: number,
  airQuality: number,
  exposureDuration: number
): RiskEvaluation {
  // Score calculations (0-100 scale for UI feature importance visualization)
  const tempScore = Math.min(100, Math.max(0, Math.round(((temperature - 20) / (45 - 20)) * 100)));
  const aqiScore = Math.min(100, Math.max(0, Math.round((airQuality / 120) * 100)));
  const exposureScore = Math.min(100, Math.max(0, Math.round((exposureDuration / 90) * 100)));

  let riskLevel: RiskLevel = 'LOW';
  let reason = 'Safe environmental conditions detected at goldsmith workstation. Melting/soldering torches and acid pickling suction are operating safely.';
  let criticalFactor: string | undefined = undefined;

  // HIGH risk triggers:
  // 1. Temperature very high (>= 40°C) from melting crucible / soldering torch
  // 2. Air quality poor (AQI >= 80) from flux/borax/metal fumes/acid pickling
  // 3. Worker exposure duration long (>= 60 min) at soldering bench
  // 4. Combined severe threshold (Temp >= 38°C AND AQI >= 70)
  if (
    temperature >= 40 ||
    airQuality >= 80 ||
    exposureDuration >= 60 ||
    (temperature >= 38 && airQuality >= 70)
  ) {
    riskLevel = 'HIGH';
    if (temperature >= 40) criticalFactor = `Crucible/Torch Extreme Heat (${temperature.toFixed(1)}°C >= 40°C)`;
    else if (airQuality >= 80) criticalFactor = `Toxic Solder/Flux Fume Hazard (${airQuality} AQI >= 80)`;
    else if (exposureDuration >= 60) criticalFactor = `Prolonged Goldsmith Bench Exposure (${exposureDuration} min >= 60 min)`;
    else criticalFactor = `Compound Melting Heat & Soldering Fume Hazard (${temperature.toFixed(1)}°C + ${airQuality} AQI)`;

    reason = `Critical goldsmith hazard threshold breached! Primary factor: ${criticalFactor}. Extreme risk of metal fume inhalation, flux toxicity, and furnace heat exhaustion.`;
  }
  // MEDIUM risk triggers:
  // Moderately unsafe temperature (35°C - 39.9°C) OR air quality (60 - 79.9) OR exposure (30 - 59.9 min)
  else if (
    temperature >= 35 ||
    airQuality >= 60 ||
    exposureDuration >= 30
  ) {
    riskLevel = 'MEDIUM';
    const factors: string[] = [];
    if (temperature >= 35) factors.push(`Torch Radiant Heat (${temperature.toFixed(1)}°C)`);
    if (airQuality >= 60) factors.push(`Soldering Fume & Particulate Build-up (AQI ${airQuality})`);
    if (exposureDuration >= 30) factors.push(`Continuous Bench Shift (${exposureDuration} min)`);

    criticalFactor = factors.join(', ');
    reason = `Moderately unsafe conditions detected at goldsmith bench (${criticalFactor}). Preventive suction boost and hydration break advised.`;
  } else {
    riskLevel = 'LOW';
  }

  // Automatic Fan Speed Logic as specified in prompt:
  // LOW risk -> Fan 30%
  // MEDIUM risk -> Fan 60%
  // HIGH risk -> Fan 90%
  let fanSpeed = 30;
  if (riskLevel === 'MEDIUM') fanSpeed = 60;
  if (riskLevel === 'HIGH') fanSpeed = 90;

  // Alert System Logic as specified in prompt:
  // When risk is HIGH:
  // ⚠️ HIGH RISK DETECTED
  // "Increase ventilation / check suction system"
  // When risk is LOW or MEDIUM:
  // ✓ No Critical Alert
  const alertActive = riskLevel === 'HIGH';
  const alertMessage = alertActive
    ? 'Increase ventilation / check suction system'
    : 'No Critical Alert (Normal operating conditions)';

  const recommendedAction =
    riskLevel === 'HIGH'
      ? 'Halt gold soldering/smelting torches. Rotate goldsmith to clean-air recovery area. Increase fume suction hood to 90% and verify mechanical suction system filters.'
      : riskLevel === 'MEDIUM'
      ? 'Ensure goldsmith takes a hydration break. Verify soldering bench exhaust dampers. Maintain active air circulation at 60% fan speed.'
      : 'Maintain standard goldsmith monitoring protocols. Energy-saving baseline bench suction active at 30%.';

  return {
    riskLevel,
    reason,
    recommendedAction,
    fanSpeed,
    alertActive,
    alertMessage,
    tempScore,
    aqiScore,
    exposureScore,
    criticalFactor,
  };
}

/**
 * Generates sample historical data (12-15 data points) matching the college review example:
 * 10:00 35°C (Low/Medium)
 * 10:10 36°C (Medium)
 * 10:20 38°C (Medium)
 * 10:30 40°C (High Risk Period)
 * Demonstrating high-risk periods clearly!
 */
export function generateInitialHistory(): SensorReading[] {
  const baseData = [
    { timeStr: '10:00', temp: 35.0, aqi: 52, exposure: 5 },
    { timeStr: '10:05', temp: 35.4, aqi: 56, exposure: 10 },
    { timeStr: '10:10', temp: 36.2, aqi: 62, exposure: 14 },
    { timeStr: '10:15', temp: 36.8, aqi: 65, exposure: 18 },
    { timeStr: '10:20', temp: 38.0, aqi: 72, exposure: 24 }, // Initial prompt baseline
    { timeStr: '10:25', temp: 38.6, aqi: 74, exposure: 28 },
    { timeStr: '10:30', temp: 40.2, aqi: 82, exposure: 33 }, // HIGH RISK PERIOD START
    { timeStr: '10:35', temp: 41.5, aqi: 86, exposure: 38 }, // HIGH RISK PEAK
    { timeStr: '10:40', temp: 40.8, aqi: 83, exposure: 42 }, // HIGH RISK
    { timeStr: '10:45', temp: 39.4, aqi: 76, exposure: 46 }, // Moderated down by fan
    { timeStr: '10:50', temp: 38.5, aqi: 73, exposure: 50 },
    { timeStr: '10:55', temp: 38.0, aqi: 72, exposure: 24 }, // Current default steady state
  ];

  const now = Date.now();
  const stepMs = 5 * 60 * 1000;

  return baseData.map((d, index) => {
    const evalResult = evaluateRisk(d.temp, d.aqi, d.exposure);
    return {
      id: `hist-${index}`,
      timeStr: d.timeStr,
      timestamp: now - (baseData.length - 1 - index) * stepMs,
      temperature: d.temp,
      airQuality: d.aqi,
      exposureDuration: d.exposure,
      riskLevel: evalResult.riskLevel,
      fanSpeed: evalResult.fanSpeed,
      fanStatus: 'ON',
      alertActive: evalResult.alertActive,
      alertMessage: evalResult.alertMessage,
    };
  });
}
