// src/features/SurveillanceInterface/hooks/useSurveillance.ts
'use client';

import { useState, useCallback, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { 
  SecurityIncident, 
  NewIncidentData, 
  SurveillanceState 
} from '../types/Surveillance';

export const useSurveillance = () => {
  const router = useRouter();
  
  // Initial state
  const [state, setState] = useState<SurveillanceState>({
    incidents: [
      {
        id: 'INC001',
        title: 'Tentative d\'intimidation',
        description: 'Un groupe de personnes suspectes a été observé tentant d\'influencer les électeurs à l\'entrée du bureau de vote. Le groupe est composé d\'environ 5 personnes portant des badges non officiels.',
        location: 'Bureau de vote 042 - Yaoundé-Centre',
        datetime: '2024-12-03T10:30:00',
        severity: 'Moyen',
        status: 'En cours',
        actions: [
          'Notification aux forces de l\'ordre',
          'Rapport transmis au responsable du bureau de vote'
        ],
        witnesses: [
          'Jean Dupont - Observateur principal',
          'Marie Claire - Électrice'
        ],
        updates: [
          {
            date: '2024-12-03T10:45:00',
            content: 'Les forces de l\'ordre sont arrivées sur place',
            author: 'Pierre Dikoto'
          }
        ]
      },
      {
        id: 'INC002',
        title: 'Problème technique',
        description: 'Panne d\'électricité affectant le processus de vote. Les lampes de secours ont été activées mais la situation reste préoccupante.',
        location: 'Centre de vote Douala-Est',
        datetime: '2024-12-03T11:15:00',
        severity: 'Élevé',
        status: 'Résolu',
        actions: [
          'Contact avec la compagnie d\'électricité',
          'Mise en place de générateurs de secours'
        ],
        updates: [
          {
            date: '2024-12-03T11:45:00',
            content: 'Électricité rétablie, reprise normale des opérations',
            author: 'Sarah Ndeme'
          }
        ]
      }
    ],
    selectedIncident: null,
    newIncident: {
      title: '',
      description: '',
      location: '',
      datetime: new Date().toISOString(),
      severity: 'Moyen',
      status: 'Nouveau'
    },
    showNewIncidentModal: false,
    showToast: false,
    toastMessage: '',
    showAlert: false,
    alertMessage: '',
    isLoading: false
  });

  // Authentication check
  useEffect(() => {
    const isAuth = typeof window !== 'undefined' && 
      localStorage.getItem('isLoggedIn') === 'true';
    const userRole = typeof window !== 'undefined' && 
      localStorage.getItem('userRole');
    
    if (!isAuth || userRole !== 'observateur') {
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

  // Refresh handler
  const handleRefresh = useCallback(async () => {
    setState(prev => ({ ...prev, isLoading: true }));
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      setState(prev => ({
        ...prev,
        showToast: true,
        toastMessage: 'Liste des incidents mise à jour',
        isLoading: false
      }));
    } catch (error) {
      setState(prev => ({
        ...prev,
        showToast: true,
        toastMessage: 'Erreur lors de l\'actualisation',
        isLoading: false
      }));
    }
  }, []);

  // New incident submission
  const handleSubmitIncident = useCallback(async () => {
    const { newIncident } = state;

    // Validate required fields
    if (!newIncident.title || !newIncident.description || !newIncident.location) {
      setState(prev => ({
        ...prev,
        showAlert: true,
        alertMessage: 'Veuillez remplir tous les champs requis'
      }));
      return;
    }

    setState(prev => ({ ...prev, isLoading: true }));

    try {
      await new Promise(resolve => setTimeout(resolve, 1000));

      const incident: SecurityIncident = {
        id: `INC${Math.floor(Math.random() * 1000)}`,
        title: newIncident.title!,
        description: newIncident.description!,
        location: newIncident.location!,
        datetime: newIncident.datetime || new Date().toISOString(),
        severity: newIncident.severity || 'Moyen',
        status: 'Nouveau',
        actions: [],
        updates: [],
        witnesses: [],
        evidence: newIncident.evidence
      };

      setState(prev => ({
        ...prev,
        incidents: [incident, ...prev.incidents],
        showNewIncidentModal: false,
        newIncident: {},
        showToast: true,
        toastMessage: 'Incident signalé avec succès',
        isLoading: false
      }));
    } catch (error) {
      setState(prev => ({
        ...prev,
        showAlert: true,
        alertMessage: 'Erreur lors de la soumission de l\'incident',
        isLoading: false
      }));
    }
  }, [state]);

  // Utility functions
  const getStatusColor = useCallback((status: string) => {
    switch (status) {
      case 'Nouveau': return 'blue';
      case 'En cours': return 'yellow';
      case 'Résolu': return 'green';
      default: return 'gray';
    }
  }, []);

  const getSeverityColor = useCallback((severity: string) => {
    switch (severity) {
      case 'Élevé': return 'red';
      case 'Moyen': return 'yellow';
      case 'Faible': return 'green';
      default: return 'gray';
    }
  }, []);

  // Modal and state update handlers
  const openIncidentDetails = useCallback((incident: SecurityIncident) => {
    setState(prev => ({ ...prev, selectedIncident: incident }));
  }, []);

  const closeIncidentDetails = useCallback(() => {
    setState(prev => ({ ...prev, selectedIncident: null }));
  }, []);

  const openNewIncidentModal = useCallback(() => {
    setState(prev => ({ ...prev, showNewIncidentModal: true }));
  }, []);

  const closeNewIncidentModal = useCallback(() => {
    setState(prev => ({ 
      ...prev, 
      showNewIncidentModal: false,
      newIncident: {
        title: '',
        description: '',
        location: '',
        datetime: new Date().toISOString(),
        severity: 'Moyen',
        status: 'Nouveau'
      }
    }));
  }, []);

  const updateNewIncident = useCallback((updates: Partial<NewIncidentData>) => {
    setState(prev => ({
      ...prev,
      newIncident: { ...prev.newIncident, ...updates }
    }));
  }, []);

  const closeToast = useCallback(() => {
    setState(prev => ({ ...prev, showToast: false }));
  }, []);

  const closeAlert = useCallback(() => {
    setState(prev => ({ ...prev, showAlert: false }));
  }, []);

  return {
    state,
    handleLogout,
    handleRefresh,
    handleSubmitIncident,
    getStatusColor,
    getSeverityColor,
    openIncidentDetails,
    closeIncidentDetails,
    openNewIncidentModal,
    closeNewIncidentModal,
    updateNewIncident,
    closeToast,
    closeAlert
  };
};