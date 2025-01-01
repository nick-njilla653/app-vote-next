// src/features/VoterInterface/types/voter.ts
export interface Notification {
    id: number;
    title: string;
    message: string;
    date: string;
    isRead: boolean;
  }
  
  export interface VoterInfo {
    id: string;
    fullName: string;
    pollingStation: string;
    registrationDate: string;
    votingStatus: 'Non voté' | 'Voté';
    notifications: Notification[];
  }
  
  export interface VoterState {
    isLoading: boolean;
    isLoggedIn: boolean;
    showAlert: boolean;
    voterInfo: VoterInfo;
  }