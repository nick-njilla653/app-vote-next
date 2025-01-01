// src/features/AdminInterface/hooks/useAdminInterface.ts
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { 
  VoterRegistration, 
  PollingResult, 
  ActiveSegment, 
  FilterStatus 
} from '../types/admin';

export const useAdminInterface = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [activeSegment, setActiveSegment] = useState<ActiveSegment>('voters');
  const [searchText, setSearchText] = useState('');
  const [filterStatus, setFilterStatus] = useState<FilterStatus>('all');
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');

  // Simulated data
  const [voterRegistrations] = useState<VoterRegistration[]>([
    {
      id: 'V001',
      fullName: 'Jean Dupont',
      idNumber: 'ID12345',
      pollingStation: 'Yaoundé-Centre-01',
      status: 'En attente'
    },
    {
      id: 'V002',
      fullName: 'Marie Claire',
      idNumber: 'ID12346',
      pollingStation: 'Yaoundé-Centre-02',
      status: 'Validé'
    }
  ]);

  const [pollingResults] = useState<PollingResult[]>([
    {
      stationId: 'PS001',
      location: 'Yaoundé-Centre-01',
      totalVotes: 500,
      validVotes: 480,
      invalidVotes: 20,
      status: 'En attente'
    },
    {
      stationId: 'PS002',
      location: 'Yaoundé-Centre-02',
      totalVotes: 600,
      validVotes: 585,
      invalidVotes: 15,
      status: 'Validé'
    }
  ]);

  // Authentication check
  useEffect(() => {
    const isAuth = typeof window !== 'undefined' && 
      localStorage.getItem('isLoggedIn') === 'true';
    const userRole = typeof window !== 'undefined' && 
      localStorage.getItem('userRole');
    
    if (!isAuth || userRole !== 'admin') {
      router.replace('/login');
    }
  }, [router]);

  const handleLogout = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('isLoggedIn');
      localStorage.removeItem('userRole');
    }
    router.replace('/login');
  };

  const handleRefresh = async () => {
    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      setToastMessage('Données actualisées');
      setShowToast(true);
    } finally {
      setIsLoading(false);
    }
  };

  const handleStatusChange = async (id: string, newStatus: string) => {
    setIsLoading(true);
    try {
      // Simulate status update
      await new Promise(resolve => setTimeout(resolve, 1000));
      setToastMessage('Statut mis à jour avec succès');
      setShowToast(true);
    } catch (error) {
      setAlertMessage('Erreur lors de la mise à jour du statut');
      setShowAlert(true);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    activeSegment,
    setActiveSegment,
    searchText,
    setSearchText,
    filterStatus,
    setFilterStatus,
    showToast,
    setShowToast,
    toastMessage,
    showAlert,
    setShowAlert,
    alertMessage,
    voterRegistrations,
    pollingResults,
    handleLogout,
    handleRefresh,
    handleStatusChange
  };
};