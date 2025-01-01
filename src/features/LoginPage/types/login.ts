// src/features/LoginPage/types/login.ts
export interface LoginCredentials {
    username: string;
    password: string;
    role: 'admin' | 'scrutateur' | 'observateur' | 'electeur';
  }
  
  export interface LoginErrorState {
    showAlert: boolean;
    showToast: boolean;
    errorMessage: string;
  }