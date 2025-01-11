// src/features/ElectionCalendarPage/hooks/useElectoralMapPage.ts
'use client';

import { useState, useCallback } from 'react';
import {
    MapData,
    ViewMode,
    MapLevel,
    ElectoralMapPageState
} from '../types/map-page';

export const useElectoralMapPage = () => {
    // Initial simulated data
    const [regionData, setRegionData] = useState<MapData>({
        region: 'Centre',
        participation: 67.5,
        registeredVoters: 1234567,
        resultsAvailable: true,
        results: [
            {
                candidate: 'Candidat A',
                votes: 45678,
                percentage: 45.6,
                party: 'Parti A'
            },
            {
                candidate: 'Candidat B',
                votes: 34567,
                percentage: 34.5,
                party: 'Parti B'
            },
            {
                candidate: 'Candidat C',
                votes: 19876,
                percentage: 19.9,
                party: 'Parti C'
            }
        ]
    });

    // State management
    const [state, setState] = useState<ElectoralMapPageState>({
        viewMode: 'general',
        selectedRegion: '',
        mapLevel: 'region',
        searchText: '',
        isLoading: false
    });

    // Region selection handler
    const handleRegionClick = useCallback((region: string | null = null) => {
        setState(prev => ({
            ...prev,
            isLoading: true,
            selectedRegion: region || ''
        }));

        // Simulate data loading
        const timer = setTimeout(() => {
            setState(prev => ({
                ...prev,
                isLoading: false
            }));

            // Optional: Update region data if needed
            if (region) {
                setRegionData(prev => ({
                    ...prev,
                    region: region
                }));
            }
        }, 1000);

        return () => clearTimeout(timer);
    }, []);

    // View mode toggle
    const toggleViewMode = useCallback((mode: ViewMode) => {
        setState(prev => ({ ...prev, viewMode: mode }));
    }, []);

    // Map level change
    const changeMapLevel = useCallback((level: MapLevel) => {
        setState(prev => ({ ...prev, mapLevel: level }));
    }, []);

    // Search text update
    const updateSearchText = useCallback((text: string) => {
        setState(prev => ({ ...prev, searchText: text }));
    }, []);

    // Get importance color for results
    const getImportanceColor = useCallback((importance: 'high' | 'medium' | 'low') => {
        switch (importance) {
            case 'high': return 'bg-red-500 text-white';
            case 'medium': return 'bg-yellow-500 text-black';
            case 'low': return 'bg-blue-500 text-white';
            default: return 'bg-gray-500 text-white';
        }
    }, []);

    return {
        regionData,
        state,
        handleRegionClick,
        toggleViewMode,
        changeMapLevel,
        updateSearchText,
        getImportanceColor
    };
};