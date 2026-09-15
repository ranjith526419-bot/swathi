/**
 * Smart Industrial Air & Heat Risk Monitoring System
 * Core TypeScript Definitions
 */

export type RiskLevel = 'LOW' | 'MEDIUM' | 'HIGH';

export interface SensorReading {
  id: string;
  timeStr: string; // e.g. "10:00"
  timestamp: number;
  temperature: number; // in °C
  airQuality: number; // AQI index (0-150+)
  exposureDuration: number; // in minutes
  riskLevel: RiskLevel;
  fanSpeed: number; // 0 - 100%
  fanStatus: 'ON' | 'OFF';
  alertActive: boolean;
  alertMessage: string;
}

export interface RiskEvaluation {
  riskLevel: RiskLevel;
  reason: string;
  recommendedAction: string;
  fanSpeed: number; // Auto fan speed for this risk level
  alertActive: boolean;
  alertMessage: string;
  tempScore: number;
  aqiScore: number;
  exposureScore: number;
  criticalFactor?: string;
}

export interface SystemLog {
  id: string;
  timestamp: string;
  type: 'INFO' | 'WARNING' | 'CRITICAL';
  message: string;
  source: 'SENSOR' | 'AI_ENGINE' | 'FAN_CONTROLLER' | 'SIMULATOR';
}
