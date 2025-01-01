// src/features/SurveillanceInterface/types/surveillance.ts
export interface SecurityIncident {
    id: string;
    title: string;
    description: string;
    location: string;
    datetime: string;
    severity: 'Faible' | 'Moyen' | 'Élevé';
    status: 'Nouveau' | 'En cours' | 'Résolu';
    evidence?: string;
    actions?: string[];
    witnesses?: string[];
    updates?: {
      date: string;
      content: string;
      author: string;
    }[];
  }
  
  export interface NewIncidentData {
    title?: string;
    description?: string;
    location?: string;
    datetime?: string;
    severity?: 'Faible' | 'Moyen' | 'Élevé';
    status?: 'Nouveau' | 'En cours' | 'Résolu';
    evidence?: string;
  }
  
  export interface SurveillanceState {
    incidents: SecurityIncident[];
    selectedIncident: SecurityIncident | null;
    newIncident: Partial<SecurityIncident>;
    showNewIncidentModal: boolean;
    showToast: boolean;
    toastMessage: string;
    showAlert: boolean;
    alertMessage: string;
    isLoading: boolean;
  }