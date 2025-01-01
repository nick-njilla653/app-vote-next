// src/features/ElectionCalendarPage/types/calendar.ts
export type ViewMode = 'calendar' | 'list';
export type EventImportance = 'high' | 'medium' | 'low';

export interface EventItem {
    id: number;
    title: string;
    date: string;
    description: string;
    location?: string;
    type: string;
    importance: EventImportance;
}

export interface CalendarState {
    viewMode: ViewMode;
    searchText: string;
    selectedMonth: string;
    showAlert: boolean;
}