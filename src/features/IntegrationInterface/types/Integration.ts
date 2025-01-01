// src/features/IntegrationInterface/types/integration.ts
export type ApiStatus = 'active' | 'inactive';
export type ExportFormat = 'csv' | 'json' | 'pdf';
export type ExportFrequency = 'manual' | 'hourly' | 'daily';
export type ExportStatus = 'success' | 'failed' | 'pending';
export type ExportJobStatus = 'queued' | 'processing' | 'completed' | 'failed';

export interface ApiConfig {
    id: string;
    name: string;
    endpoint: string;
    key: string;
    status: ApiStatus;
    lastSync?: string;
}

export interface ExportConfig {
    id: string;
    format: ExportFormat;
    frequency: ExportFrequency;
    destination: string;
    lastExport?: string;
    status: ExportStatus;
}

export interface ApiKeyManagement {
    currentKey: string;
    lastRotation: string;
    expiresAt: string;
    permissions: string[];
}

export interface ExportResult {
    jobId: string;
    status: ExportJobStatus;
    progress: number;
    url?: string;
    error?: string;
}

export interface IntegrationState {
    activeTab: 'api' | 'export';
    showNewApiModal: boolean;
    showNewExportModal: boolean;
    showKeyManagementModal: boolean;
    showExportConfigModal: boolean;
    showExportProgressModal: boolean;
    isLoading: boolean;
    showToast: boolean;
    toastMessage: string;
    showAlert: boolean;
    alertMessage: string;
    selectedApiId: string;
    selectedExportId: string;
    selectedApiKeyInfo: ApiKeyManagement | null;
    currentExportJob: ExportResult | null;
    newApiConfig: Partial<ApiConfig>;
    newExportConfig: Partial<ExportConfig>;
    exportConfigForm: {
        format: ExportFormat;
        frequency: ExportFrequency;
        destination: string;
    };
}