// src/features/AdminInterface/types/admin.ts
export interface VoterRegistration {
    id: string;
    fullName: string;
    idNumber: string;
    pollingStation: string;
    status: 'En attente' | 'Validé' | 'Rejeté';
  }
  
  export interface PollingResult {
    stationId: string;
    location: string;
    totalVotes: number;
    validVotes: number;
    invalidVotes: number;
    status: 'En attente' | 'Validé' | 'Rejeté';
  }
  
  export type ActiveSegment = 'voters' | 'results';
  export type FilterStatus = 'all' | 'pending' | 'validated' | 'rejected';