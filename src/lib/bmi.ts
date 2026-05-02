import type { Unit } from './types';

export function calcBMI(weight: string, height: string, unit: Unit): string | null {
  const w = Number.parseFloat(weight);
  const h = Number.parseFloat(height);
  if (!w || !h) return null;
  const bmi = unit === 'metric' ? w / ((h / 100) ** 2) : (703 * w) / (h * h);
  return Number.isFinite(bmi) && bmi > 0 ? bmi.toFixed(1) : null;
}

export function bmiInfo(bmi: string | null) {
  if (!bmi) return null;
  const v = Number.parseFloat(bmi);
  if (v < 18.5) return { label: 'Underweight', color: 'oklch(55% 0.18 200)' };
  if (v < 25) return { label: 'Normal weight', color: 'var(--success)' };
  if (v < 30) return { label: 'Overweight', color: 'oklch(60% 0.18 60)' };
  return { label: 'Obese', color: 'oklch(55% 0.2 25)' };
}
