declare module '@garmin/fitsdk' {
  interface WeightScaleMesg {
    mesgNum?: number,
    timestamp?: number,
    weight?: number,
    percentFat?: number,
    percentHydration?: number,
    visceralFatMass?: number,
    boneMass?: number,
    muscleMass?: number,
    basalMet?: number,
    physiqueRating?: number,
    activeMet?: number,
    metabolicAge?: number,
    visceralFatRating?: number
  }

  interface FileIdMesg {
    mesgNum?: number,
    type?: number,
    manufacturer?: number,
    product?: number,
    serialNumber?: number,
    timeCreated?: number
  }

  class Encoder {
    constructor(options?: { fieldDescriptions?: Record<string, unknown> });
    onMesg(mesgNum: number, mesg: Record<string, unknown>): this;
    writeMesg(mesg: { mesgNum: number, [key: string]: unknown }): this;
    close(): Uint8Array<ArrayBuffer>;
  }

  namespace Utils {
    function convertDateToDateTime(date: Date): number;
    function convertDateTimeToDate(datetime: number): Date;
  }

  namespace Profile {
    namespace MesgNum {
      const FILE_ID: number;
      const WEIGHT_SCALE: number;
    }
  }
}
