// src/features/LoginPage/hooks/useLogin.ts
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { LoginCredentials, LoginErrorState } from '../types/login';

export const useLogin = () => {
  const router = useRouter();
  const [credentials, setCredentials] = useState<LoginCredentials>({
    username: '',
    password: '',
    role: 'electeur'
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorState, setErrorState] = useState<LoginErrorState>({
    showAlert: false,
    showToast: false,
    errorMessage: ''
  });

  const validateCredentials = (creds: LoginCredentials): boolean => {
    console.log('Vérification des identifiants:', creds);
    
    switch (creds.role) {
      case 'admin':
        return creds.username === 'admin' && creds.password === 'admin123';
      case 'scrutateur':
        return creds.username === 'scrutateur' && creds.password === 'scr123';
      case 'observateur':
        return creds.username === 'observateur' && creds.password === 'obs123';
      case 'electeur':
        return creds.username === '12345' && creds.password === 'password';
      default:
        return false;
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Tentative de connexion avec:', credentials);
    setIsLoading(true);
    setErrorState(prev => ({ ...prev, errorMessage: '' }));

    try {
      // Simuler une requête d'authentification
      await new Promise(resolve => setTimeout(resolve, 1500));

      const isValid = validateCredentials(credentials);
      console.log('Validation des identifiants:', isValid);

      if (isValid) {
        console.log('Redirection vers:', `/${credentials.role}`);
        localStorage.setItem('userRole', credentials.role);
        localStorage.setItem('isLoggedIn', 'true');
        
        // Rediriger vers l'interface appropriée
        switch (credentials.role) {
          case 'admin':
            router.push('/AdminInterface');
            break;
          case 'scrutateur':
            router.push('/ScrutateurInterface');
            break;
          case 'observateur':
            router.push('/SurveillanceInterface');
            break;
          case 'electeur':
            router.push('/VoterInterface');
            break;
        }
      } else {
        setErrorState({
          showAlert: true,
          showToast: false,
          errorMessage: 'Identifiants invalides'
        });
      }
    } catch (error) {
      console.error('Erreur lors de la connexion:', error);
      setErrorState({
        showAlert: true,
        showToast: false,
        errorMessage: 'Erreur de connexion au serveur'
      });
    } finally {
      setIsLoading(false);
    }
  };

  return {
    credentials,
    setCredentials,
    showPassword,
    setShowPassword,
    isLoading,
    errorState,
    setErrorState,
    handleLogin
  };
};