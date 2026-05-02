import { Encoder, Utils } from '@garmin/fitsdk';

export interface BodyCompositionData {
  /** When the measurement was taken */
  timestamp: Date,
  /** Body weight in kg */
  weight: number,
  /** Body fat percentage (0–100) */
  percentFat?: number,
  /** Body hydration/water percentage (0–100) */
  percentHydration?: number,
  /** Bone mass in kg */
  boneMass?: number,
  /** Skeletal muscle mass in kg */
  muscleMass?: number,
  /** Visceral fat mass in kg */
  visceralFatMass?: number,
  /** Visceral fat rating (integer index) */
  visceralFatRating?: number,
  /** Physique rating (integer index) */
  physiqueRating?: number,
  /** Metabolic age in years */
  metabolicAge?: number,
  /** Basal metabolic rate in kcal/day */
  basalMet?: number,
  /** Active metabolic rate / daily calorie intake in kcal/day */
  activeMet?: number
}

const OPTIONAL_FIELDS = [
  'percentFat',
  'percentHydration',
  'boneMass',
  'muscleMass',
  'visceralFatMass',
  'visceralFatRating',
  'physiqueRating',
  'metabolicAge',
  'basalMet',
  'activeMet'
] as const satisfies ReadonlyArray<keyof BodyCompositionData>;

/**
 * Encodes body composition data as a Garmin FIT weight-scale file.
 * Returns a Uint8Array that can be saved as a .fit file and uploaded to Garmin Connect.
 */
export function generateWeightFit(data: BodyCompositionData): Uint8Array<ArrayBuffer> {
  const encoder = new Encoder();
  const fitTimestamp = Utils.convertDateToDateTime(data.timestamp);

  encoder.onMesg(0, {
    type: 9, // File.WEIGHT
    manufacturer: 255,
    product: 0,
    serialNumber: 1,
    timeCreated: fitTimestamp
  });

  const weightScaleMesg: Record<string, number> = {
    timestamp: fitTimestamp,
    weight: data.weight
  };

  for (const key of OPTIONAL_FIELDS) {
    if (data[key] != null) {
      weightScaleMesg[key] = data[key];
    }
  }

  encoder.onMesg(30, weightScaleMesg);

  return encoder.close();
}
