// src/features/TransversalInterface/types/transversal.ts
export type UserRole = 'électeur' | 'scrutateur' | 'admin' | 'observateur';

export interface Credentials {
  username: string;
  password: string;
  role: UserRole;
}

export interface FAQ {
  question: string;
  answer: string;
  category: string;
}

export interface SupportTicket {
  subject: string;
  message: string;
  category: string;
}

export interface TransversalState {
  isLoggedIn: boolean;
  credentials: Credentials;
  isLoading: boolean;
  loginError: string;
  showSupportModal: boolean;
  supportTicket: SupportTicket;
  searchQuery: string;
  showToast: boolean;
  toastMessage: string;
}