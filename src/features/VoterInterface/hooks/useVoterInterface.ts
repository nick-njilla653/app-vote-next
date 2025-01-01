// src/features/VoterInterface/hooks/useVoterInterface.ts
'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { VoterState, VoterInfo, Notification } from '../types/Voter';

export const useVoterInterface = () => {
  const router = useRouter();

  // Initial state
  const [state, setState] = useState<VoterState>({
    isLoading: false,
    isLoggedIn: false,
    showAlert: false,
    voterInfo: {
      id: "12345",
      fullName: "Jean Dupont",
      pollingStation: "Centre de Vote Yaoundé-Centre",
      registrationDate: "15/11/2024",
      votingStatus: "Non voté",
      notifications: [
        {
          id: 1,
          title: "Rappel Élections",
          message: "Les élections auront lieu dans 5 jours",
          date: "01/12/2024",
          isRead: false
        },
        {
          id: 2,
          title: "Mise à jour du bureau",
          message: "Votre bureau de vote a été confirmé",
          date: "28/11/2024",
          isRead: true
        }
      ]
    }
  });

  // Authentication check
  useEffect(() => {
    const isAuth = typeof window !== 'undefined' && 
      localStorage.getItem('isLoggedIn') === 'true';
    const userRole = typeof window !== 'undefined' && 
      localStorage.getItem('userRole');
    
    if (!isAuth || userRole !== 'electeur') {
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

  // Mark notification as read
  const markNotificationAsRead = useCallback((notificationId: number) => {
    setState(prev => ({
      ...prev,
      voterInfo: {
        ...prev.voterInfo,
        notifications: prev.voterInfo.notifications.map(notification => 
          notification.id === notificationId 
            ? { ...notification, isRead: true } 
            : notification
        )
      }
    }));
  }, []);

  // Close alert
  const closeAlert = useCallback(() => {
    setState(prev => ({ ...prev, showAlert: false }));
  }, []);

  return {
    state,
    handleLogout,
    markNotificationAsRead,
    closeAlert
  };
};