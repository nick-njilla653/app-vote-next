// src/features/ElectionCalendarPage/types/map-page.ts
export type ViewMode = 'general' | 'participation' | 'results';
export type MapLevel = 'region' | 'department' | 'district';

export interface MapData {
    region: string;
    participation: number;
    registeredVoters: number;
    resultsAvailable: boolean;
    results?: {
        candidate: string;
        votes: number;
        percentage: number;
        party: string;
    }[];
}

export interface ElectoralMapPageState {
    viewMode: ViewMode;
    selectedRegion: string;
    mapLevel: MapLevel;
    searchText: string;
    isLoading: boolean;
}