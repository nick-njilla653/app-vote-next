// src/features/ElectionCalendarPage/hooks/useElectionCalendar.ts
'use client';

import { useState, useMemo, useCallback } from 'react';
import { 
    EventItem, 
    ViewMode, 
    CalendarState, 
    EventImportance 
} from '../types/Calendar';

export const useElectionCalendar = () => {
    // Simulated events data
    const [events] = useState<EventItem[]>([
        {
            id: 1,
            title: "Début des inscriptions",
            date: "2024-12-15",
            description: "Ouverture officielle des inscriptions sur les listes électorales",
            location: "Tout le territoire",
            type: "Inscription",
            importance: "high"
        },
        {
            id: 2,
            title: "Formation des agents électoraux",
            date: "2024-12-20",
            description: "Session de formation pour les agents des bureaux de vote",
            location: "Centre de formation - Yaoundé",
            type: "Formation",
            importance: "medium"
        },
        {
            id: 3,
            title: "Distribution du matériel électoral",
            date: "2024-12-22",
            description: "Distribution des urnes et bulletins de vote",
            location: "Centres régionaux",
            type: "Logistique",
            importance: "high"
        }
    ]);

    // State management
    const [state, setState] = useState<CalendarState>({
        viewMode: 'list',
        searchText: '',
        selectedMonth: 'Décembre',
        showAlert: false
    });

    // Importance color mapping
    const getImportanceColor = useCallback((importance: EventImportance) => {
        switch (importance) {
            case 'high': return 'text-red-500';
            case 'medium': return 'text-yellow-500';
            default: return 'text-blue-500';
        }
    }, []);

    // Event filtering
    const filteredEvents = useMemo(() => {
        return events.filter(item =>
            item.title.toLowerCase().includes(state.searchText.toLowerCase()) ||
            item.description.toLowerCase().includes(state.searchText.toLowerCase())
        );
    }, [events, state.searchText]);

    // View mode toggle
    const toggleViewMode = useCallback((mode: ViewMode) => {
        setState(prev => ({ ...prev, viewMode: mode }));
    }, []);

    // Search text update
    const updateSearchText = useCallback((text: string) => {
        setState(prev => ({ ...prev, searchText: text }));
    }, []);

    // Month selection
    const updateSelectedMonth = useCallback((month: string) => {
        setState(prev => ({ ...prev, selectedMonth: month }));
    }, []);

    // Alert handling
    const toggleAlert = useCallback((show?: boolean) => {
        setState(prev => ({ 
            ...prev, 
            showAlert: show ?? !prev.showAlert 
        }));
    }, []);

    // Calendar grid generation
    const generateCalendarGrid = useCallback(() => {
        return Array(35).fill(null).map((_, index) => {
            const day = index + 1;
            const hasEvent = events.some(event =>
                new Date(event.date).getDate() === day
            );

            return {
                day,
                hasEvent
            };
        });
    }, [events]);

    return {
        events,
        filteredEvents,
        state,
        getImportanceColor,
        toggleViewMode,
        updateSearchText,
        updateSelectedMonth,
        toggleAlert,
        generateCalendarGrid
    };
};