// src/features/ElectionHomePage/hooks/useElectionData.ts
import { useState, useEffect } from 'react';
import {
  NewsItem,
  ElectionStats,
  GuideItem,
  MainFeature
} from '../types/home';

import ElectionCalendarPage from '@/features/ElectionCalendarPage/components/ElectionCalendarPage';


import {
  MapIcon,
  UserGroupIcon,
  CalendarIcon,
  InformationCircleIcon
} from '@heroicons/react/24/outline';

export const useElectionData = () => {
  const [newsItems, setNewsItems] = useState<NewsItem[]>([
    {
      id: 1,
      title: "Ouverture des inscriptions",
      description: "Les inscriptions pour les élections présidentielles sont maintenant ouvertes",
      date: "15 Dec 2024",
      category: "Inscription"
    },
    {
      id: 2,
      title: "Formation des scrutateurs",
      description: "Sessions de formation prévues dans toutes les régions",
      date: "20 Dec 2024",
      category: "Formation"
    },
    {
      id: 3,
      title: "Nouveaux bureaux de vote",
      description: "Ajout de 50 nouveaux bureaux de vote dans la région du Centre",
      date: "22 Dec 2024",
      category: "Infrastructure"
    }
  ]);

  const [electionStats, setElectionStats] = useState<ElectionStats>({
    totalRegistered: 6500000,
    totalCenters: 25000,
    activeObservers: 1200,
    completedRegistrations: 4500000
  });

  const guideItems: GuideItem[] = [
    {
      icon: UserGroupIcon,
      title: "S'inscrire",
      description: "Comment s'inscrire sur les listes électorales"
    },
    {
      icon: CalendarIcon,
      title: "Dates clés",
      description: "Calendrier des événements importants"
    },
    {
      icon: InformationCircleIcon,
      title: "Voter",
      description: "Le processus de vote expliqué"
    }
  ];

  const mainFeatures = [
    {
      title: 'Carte Électorale',
      description: 'Explorez la carte interactive des bureaux de vote',
      icon: MapIcon,
      path: '/map',
      gradient: 'linear-gradient(135deg, #4e54c8, #8f94fb)',
      animation: 'slide-right'
    },
    {
      title: 'Vérification',
      description: 'Vérifiez votre inscription sur la liste électorale',
      icon: UserGroupIcon,
      path: '/verify',
      gradient: 'linear-gradient(135deg, #11998e, #38ef7d)',
      animation: 'slide-up'
    },
    {
      title: 'Calendrier',
      description: 'Dates importantes du processus électoral',
      icon: CalendarIcon,
      path: '/ElectionCalendarPage',
      gradient: 'linear-gradient(135deg, #f6d365, #fda085)',
      animation: 'slide-left'
    }
  ];

  const [searchText, setSearchText] = useState<string>('');

  return {
    newsItems,
    electionStats,
    guideItems,
    mainFeatures,
    searchText,
    setSearchText
  };
};

export const useRefreshData = () => {
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    try {
      // Simulate data refresh
      await new Promise(resolve => setTimeout(resolve, 1500));
      // Here you would typically fetch fresh data
    } catch (error) {
      console.error('Refresh failed', error);
    } finally {
      setIsRefreshing(false);
    }
  };

  return { isRefreshing, handleRefresh };
};