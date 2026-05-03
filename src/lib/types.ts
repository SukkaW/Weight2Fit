export type Unit = 'metric' | 'imperial';

export interface FormValues {
  timestamp: Date | null,
  weight: string,
  height: string,
  bodyFat: string,
  boneMass: string,
  muscleMass: string,
  bodyWater: string,
  visceralFat: string,
  metabolicAge: string
}
