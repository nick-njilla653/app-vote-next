// src/features/ScrutateurInterface/types/scrutateur.ts
export interface ElectionResults {
    candidateVotes: { [key: string]: number };
    totalVotes: number;
    invalidVotes: number;
    timestamp: string;
  }
  
  export interface ScrutateurInfo {
    id: string;
    name: string;
    pollingStation: string;
    role: string;
  }
  
  export interface ScrutateurState {
    results: ElectionResults;
    showToast: boolean;
    toastMessage: string;
    showAlert: boolean;
    alertMessage: string;
    isLoading: boolean;
  }