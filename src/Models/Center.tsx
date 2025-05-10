/**
 * Mirrors the Java BloodCenter class from com.example.dami
 * - id          : Long    → number
 * - nameadmin   : String  → string
 * - nameCenter  : String  → string
 * - latitude    : double  → number
 * - longitude   : double  → number
 */
export interface BloodCenter {
    id: number;             // unique identifier
    idadmin: number;      // administrator’s name
    nameCenter: string;     // center’s name
    latitude: number;       // geographic latitude
    longitude: number;      // geographic longitude
  }
  