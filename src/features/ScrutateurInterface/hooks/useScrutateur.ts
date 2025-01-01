// src/features/ScrutateurInterface/hooks/useScrutateur.ts
'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { 
  ElectionResults, 
  ScrutateurInfo, 
  ScrutateurState 
} from '../types/Scrutateur';

export const useScrutateur = () => {
  const router = useRouter();

  // Initial state for election results
  const [state, setState] = useState<ScrutateurState>({
    results: {
      candidateVotes: {
        'Candidat A': 0,
        'Candidat B': 0,
        'Candidat C': 0
      },
      totalVotes: 0,
      invalidVotes: 0,
      timestamp: ''
    },
    showToast: false,
    toastMessage: '',
    showAlert: false,
    alertMessage: '',
    isLoading: false
  });

  // Scrutateur information
  const mockScrutateurInfo: ScrutateurInfo = {
    id: "SCR123",
    name: "Pierre Dupont",
    pollingStation: "Bureau 042 - Yaoundé Centre",
    role: "Scrutateur Principal"
  };

  // Authentication check
  useEffect(() => {
    const isAuth = typeof window !== 'undefined' && 
      localStorage.getItem('isLoggedIn') === 'true';
    const userRole = typeof window !== 'undefined' && 
      localStorage.getItem('userRole');
    
    if (!isAuth || userRole !== 'scrutateur') {
      router.replace('/login');
    }
  }, [router]);

  // Logout handler
  const handleLogout = useCallback(() => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('isLoggedIn');
      localStorage.removeItem('userRole');
    }
    router.replace('/login');
  }, [router]);

  // Vote input handler
  const handleVoteInput = useCallback((candidate: string, value: string) => {
    setState(prevState => {
      const votes = parseInt(value) || 0;
      const newCandidateVotes = {
        ...prevState.results.candidateVotes,
        [candidate]: votes
      };
      
      const totalVotes = Object.values(newCandidateVotes).reduce((a, b) => a + b, 0) + prevState.results.invalidVotes;
      
      return {
        ...prevState,
        results: {
          ...prevState.results,
          candidateVotes: newCandidateVotes,
          totalVotes
        }
      };
    });
  }, []);

  // Invalid votes handler
  const handleInvalidVotes = useCallback((value: string) => {
    setState(prevState => {
      const invalidVotes = parseInt(value) || 0;
      const totalVotes = Object.values(prevState.results.candidateVotes).reduce((a, b) => a + b, 0) + invalidVotes;
      
      return {
        ...prevState,
        results: {
          ...prevState.results,
          invalidVotes,
          totalVotes
        }
      };
    });
  }, []);

  // Results validation
  const validateResults = useCallback(() => {
    const totalVotes = state.results.totalVotes;

    if (totalVotes === 0) {
      setState(prevState => ({
        ...prevState,
        showAlert: true,
        alertMessage: 'Le nombre total de votes ne peut pas être zéro.'
      }));
      return false;
    }

    if (totalVotes > 1000) {
      setState(prevState => ({
        ...prevState,
        showAlert: true,
        alertMessage: 'Le nombre de votes dépasse la capacité du bureau.'
      }));
      return false;
    }

    return true;
  }, [state.results.totalVotes]);

  // Submit handler
  const handleSubmit = useCallback(async () => {
    if (validateResults()) {
      setState(prevState => ({ ...prevState, isLoading: true }));
      try {
        // Simulation d'envoi des données
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        setState(prevState => ({
          ...prevState,
          results: {
            ...prevState.results,
            timestamp: new Date().toISOString()
          },
          showToast: true,
          toastMessage: 'Résultats soumis avec succès !'
        }));
      } catch (error) {
        setState(prevState => ({
          ...prevState,
          showAlert: true,
          alertMessage: 'Erreur lors de la soumission'
        }));
      } finally {
        setState(prevState => ({ ...prevState, isLoading: false }));
      }
    }
  }, [validateResults]);

  // Close toast/alert handlers
  const closeToast = useCallback(() => {
    setState(prevState => ({ ...prevState, showToast: false }));
  }, []);

  const closeAlert = useCallback(() => {
    setState(prevState => ({ ...prevState, showAlert: false }));
  }, []);

  return {
    state,
    mockScrutateurInfo,
    handleLogout,
    handleVoteInput,
    handleInvalidVotes,
    handleSubmit,
    closeToast,
    closeAlert
  };
};