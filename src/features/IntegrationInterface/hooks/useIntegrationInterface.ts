// src/features/IntegrationInterface/hooks/useIntegrationInterface.ts
'use client';

import { useState, useCallback } from 'react';
import { 
    IntegrationState, 
    ApiConfig, 
    ExportConfig,
    ApiKeyManagement,
    ExportResult
} from '../types/Integration';

export const useIntegrationInterface = () => {
    // Simulated data
    const [apiConfigs] = useState<ApiConfig[]>([
        {
            id: 'api1',
            name: 'API Identification',
            endpoint: 'https://api.identification.cm/v1',
            key: '*****',
            status: 'active',
            lastSync: '2024-03-01T10:30:00'
        },
        {
            id: 'api2',
            name: 'API Géolocalisation',
            endpoint: 'https://api.geolocation.cm/v1',
            key: '*****',
            status: 'inactive',
            lastSync: '2024-02-28T15:45:00'
        }
    ]);

    const [exportConfigs] = useState<ExportConfig[]>([
        {
            id: 'exp1',
            format: 'csv',
            frequency: 'daily',
            destination: 'sftp://exports.elecam.cm/results',
            lastExport: '2024-03-01T00:00:00',
            status: 'success'
        },
        {
            id: 'exp2',
            format: 'json',
            frequency: 'hourly',
            destination: 'https://api.elecam.cm/webhooks/results',
            lastExport: '2024-03-01T12:00:00',
            status: 'pending'
        }
    ]);

    // Initial state
    const [state, setState] = useState<IntegrationState>({
        activeTab: 'api',
        showNewApiModal: false,
        showNewExportModal: false,
        showKeyManagementModal: false,
        showExportConfigModal: false,
        showExportProgressModal: false,
        isLoading: false,
        showToast: false,
        toastMessage: '',
        showAlert: false,
        alertMessage: '',
        selectedApiId: '',
        selectedExportId: '',
        selectedApiKeyInfo: null,
        currentExportJob: null,
        newApiConfig: { status: 'inactive' },
        newExportConfig: { 
            format: 'csv', 
            frequency: 'manual' 
        },
        exportConfigForm: {
            format: 'csv',
            frequency: 'manual',
            destination: ''
        }
    });

    // Toggle methods
    const toggleTab = useCallback((tab: 'api' | 'export') => {
        setState(prev => ({ ...prev, activeTab: tab }));
    }, []);

    const toggleModal = useCallback((modalName: keyof Pick<IntegrationState, 
        'showNewApiModal' | 
        'showNewExportModal' | 
        'showKeyManagementModal' | 
        'showExportConfigModal' | 
        'showExportProgressModal'>, 
        show?: boolean) => {
        setState(prev => ({ 
            ...prev, 
            [modalName]: show ?? !prev[modalName] 
        }));
    }, []);

    // Key Management
    const handleKeyManagement = useCallback((apiId: string) => {
        const keyInfo: ApiKeyManagement = {
            currentKey: '*****',
            lastRotation: new Date().toISOString(),
            expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
            permissions: ['read', 'write']
        };

        setState(prev => ({
            ...prev,
            selectedApiId: apiId,
            selectedApiKeyInfo: keyInfo,
            showKeyManagementModal: true
        }));
    }, []);

     // API Test Method
     const handleApiTest = useCallback(async (apiId: string) => {
        setState(prev => ({ ...prev, isLoading: true }));
        try {
            await new Promise(resolve => setTimeout(resolve, 2000)); // Simulate API call
            
            setState(prev => ({
                ...prev,
                showToast: true,
                toastMessage: 'Test API réussi - Connexion établie',
                isLoading: false
            }));
        } catch (error) {
            setState(prev => ({
                ...prev,
                showAlert: true,
                alertMessage: 'Échec du test de connexion API',
                isLoading: false
            }));
        }
    }, []);

    // Export Configuration
    const handleConfigureExport = useCallback((exportId: string) => {
        const currentConfig = exportConfigs.find(config => config.id === exportId);
        
        setState(prev => ({
            ...prev,
            selectedExportId: exportId,
            exportConfigForm: {
                format: currentConfig?.format || 'csv',
                frequency: currentConfig?.frequency || 'manual',
                destination: currentConfig?.destination || ''
            },
            showExportConfigModal: true
        }));
    }, [exportConfigs]);

    // Export Now
    const handleExportNow = useCallback((exportId: string) => {
        const exportJob: ExportResult = {
            jobId: `job_${Math.random().toString(36).substr(2, 9)}`,
            status: 'processing',
            progress: 0
        };

        setState(prev => ({
            ...prev,
            selectedExportId: exportId,
            currentExportJob: exportJob,
            showExportProgressModal: true
        }));
    }, []);

    // Utility Methods
    const closeToast = useCallback(() => {
        setState(prev => ({ ...prev, showToast: false }));
    }, []);

    const closeAlert = useCallback(() => {
        setState(prev => ({ ...prev, showAlert: false }));
    }, []);

    return {
        state,
        apiConfigs,
        exportConfigs,
        toggleTab,
        toggleModal,
        handleApiTest,
        handleKeyManagement,
        handleConfigureExport,
        handleExportNow,
        closeToast,
        closeAlert
    };
};