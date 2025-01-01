// src/features/TransversalInterface/hooks/useTransversalInterface.ts
'use client';

import { useState, useCallback } from 'react';
import { 
  TransversalState, 
  Credentials, 
  SupportTicket, 
  FAQ, 
  UserRole 
} from '../types/Transversal';

export const useTransversalInterface = () => {
  // Simulated FAQ data
  const faqs: FAQ[] = [
    {
      question: "Comment puis-je vérifier mon bureau de vote ?",
      answer: "Vous pouvez vérifier votre bureau de vote en utilisant votre numéro d'électeur sur la page de recherche.",
      category: "Inscription"
    },
    {
      question: "Que faire en cas de problème technique ?",
      answer: "Contactez immédiatement le support technique via le formulaire de contact ou appelez le numéro d'urgence.",
      category: "Technique"
    },
    {
      question: "Comment signaler une irrégularité ?",
      answer: "Les observateurs peuvent utiliser le formulaire de signalement dans leur interface dédiée.",
      category: "Sécurité"
    }
  ];

  // Initial state
  const [state, setState] = useState<TransversalState>({
    isLoggedIn: false,
    credentials: {
      username: '',
      password: '',
      role: '' as UserRole
    },
    isLoading: false,
    loginError: '',
    showSupportModal: false,
    supportTicket: {
      subject: '',
      message: '',
      category: ''
    },
    searchQuery: '',
    showToast: false,
    toastMessage: ''
  });

  // Login handler
  const handleLogin = useCallback(async (e?: React.FormEvent) => {
    if (e) e.preventDefault();

    const { credentials } = state;

    // Validation
    if (!credentials.role || !credentials.username || !credentials.password) {
      setState(prev => ({
        ...prev,
        loginError: 'Veuillez remplir tous les champs'
      }));
      return false;
    }

    setState(prev => ({ 
      ...prev, 
      isLoading: true,
      loginError: '' 
    }));

    try {
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Simulation of credentials validation
      const validCredentials = {
        électeur: { user: 'voter', pass: 'voter123' },
        scrutateur: { user: 'counter', pass: 'counter123' },
        admin: { user: 'admin', pass: 'admin123' },
        observateur: { user: 'observer', pass: 'observer123' }
      };

      const roleCheck = validCredentials[credentials.role];
      if (roleCheck &&
        credentials.username === roleCheck.user &&
        credentials.password === roleCheck.pass) {
        
        setState(prev => ({
          ...prev,
          isLoggedIn: true,
          showToast: true,
          toastMessage: 'Connexion réussie'
        }));
        return true;
      } else {
        setState(prev => ({
          ...prev,
          loginError: 'Identifiants invalides pour ce rôle'
        }));
        return false;
      }
    } catch (error) {
      setState(prev => ({
        ...prev,
        loginError: 'Erreur de connexion'
      }));
      return false;
    } finally {
      setState(prev => ({ ...prev, isLoading: false }));
    }
  }, [state]);

  // Support ticket submission
  const handleSupportTicket = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();

    setState(prev => ({ ...prev, isLoading: true }));

    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setState(prev => ({
        ...prev,
        showSupportModal: false,
        showToast: true,
        toastMessage: 'Ticket de support envoyé avec succès',
        supportTicket: { subject: '', message: '', category: '' }
      }));
    } catch (error) {
      setState(prev => ({
        ...prev,
        showToast: true,
        toastMessage: 'Erreur lors de l\'envoi du ticket'
      }));
    } finally {
      setState(prev => ({ ...prev, isLoading: false }));
    }
  }, []);

  // Filter FAQs based on search query
  const filteredFAQs = useCallback(() => {
    return faqs.filter(faq =>
      faq.question.toLowerCase().includes(state.searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(state.searchQuery.toLowerCase())
    );
  }, [faqs, state.searchQuery]);

  // In the hooks file, add a state for expanded FAQs
const [expandedFAQs, setExpandedFAQs] = useState<number[]>([]);

// Method to toggle FAQ expansion
const toggleFAQ = useCallback((index: number) => {
  setExpandedFAQs(prev => 
    prev.includes(index)
      ? prev.filter(i => i !== index)
      : [...prev, index]
  );
}, []);

  // State update methods
  const updateCredentials = useCallback((updates: Partial<Credentials>) => {
    setState(prev => ({
      ...prev,
      credentials: { ...prev.credentials, ...updates }
    }));
  }, []);

  const updateSupportTicket = useCallback((updates: Partial<SupportTicket>) => {
    setState(prev => ({
      ...prev,
      supportTicket: { ...prev.supportTicket, ...updates }
    }));
  }, []);

  const toggleSupportModal = useCallback((show: boolean) => {
    setState(prev => ({ ...prev, showSupportModal: show }));
  }, []);

  const closeToast = useCallback(() => {
    setState(prev => ({ ...prev, showToast: false }));
  }, []);

  return {
    state,
    faqs,
    handleLogin,
    toggleFAQ,
    expandedFAQs,
    handleSupportTicket,
    filteredFAQs,
    updateCredentials,
    updateSupportTicket,
    toggleSupportModal,
    closeToast
  };
};