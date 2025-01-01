// src/features/IntegrationInterface/components/IntegrationInterface.tsx
'use client';

import React from 'react';
import {
  AdjustmentsHorizontalIcon,
  CloudArrowDownIcon,
  KeyIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
  XMarkIcon
} from '@heroicons/react/24/outline';
import { useIntegrationInterface } from '../hooks/useIntegrationInterface';

const IntegrationInterface: React.FC = () => {
  const {
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
  } = useIntegrationInterface();

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'inactive': return 'bg-gray-100 text-gray-800';
      case 'success': return 'bg-green-100 text-green-800';
      case 'failed': return 'bg-red-100 text-red-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <header className="bg-blue-600 text-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-16">
          <h1 className="text-2xl font-bold">Intégration & Export</h1>
          <button
            onClick={() => toggleModal(
              state.activeTab === 'api'
                ? 'showNewApiModal'
                : 'showNewExportModal'
            )}
            className="hover:bg-blue-700 p-2 rounded-full transition-colors"
          >
            <AdjustmentsHorizontalIcon className="h-6 w-6" />
          </button>
        </div>
        {state.isLoading && (
          <div className="w-full bg-blue-700 h-1 animate-pulse"></div>
        )}
      </header>

      {/* Tab Navigation */}
      <div className="flex justify-center my-4">
        <div className="flex bg-white rounded-lg shadow-md">
          <button
            onClick={() => toggleTab('api')}
            className={`px-4 py-2 rounded-l-lg ${state.activeTab === 'api'
                ? 'bg-blue-600 text-white'
                : 'text-gray-600 hover:bg-gray-100'
              }`}
          >
            APIs
          </button>
          <button
            onClick={() => toggleTab('export')}
            className={`px-4 py-2 rounded-r-lg ${state.activeTab === 'export'
                ? 'bg-blue-600 text-white'
                : 'text-gray-600 hover:bg-gray-100'
              }`}
          >
            Exports
          </button>
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-grow container mx-auto px-4 py-8">
        {state.activeTab === 'api' ? (
          <div className="space-y-6">
            {apiConfigs.map((api) => (
              <div
                key={api.id}
                className="bg-white shadow-md rounded-lg p-6"
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      {api.name}
                    </h3>
                    <p className="text-sm text-gray-600">{api.endpoint}</p>
                  </div>
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(api.status)
                      }`}
                  >
                    {api.status === 'active' ? 'Actif' : 'Inactif'}
                  </span>
                </div>

                {api.lastSync && (
                  <div className="text-sm text-gray-600 mb-4">
                    Dernière synchronisation: {new Date(api.lastSync).toLocaleString()}
                  </div>
                )}

                <div className="flex space-x-4">
                  <button
                    onClick={() => handleApiTest(api.id)}
                    disabled={state.isLoading}
                    className="flex-grow bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 disabled:opacity-50"
                  >
                    Tester la connexion
                  </button>
                  <button
                    onClick={() => handleKeyManagement(api.id)}
                    className="flex-grow bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600"
                  >
                    <KeyIcon className="h-5 w-5 mr-2 inline" />
                    Gérer la clé
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-6">
            {exportConfigs.map((config) => (
              <div
                key={config.id}
                className="bg-white shadow-md rounded-lg p-6"
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      Export {config.format.toUpperCase()}
                    </h3>
                    <p className="text-sm text-gray-600">{config.destination}</p>
                  </div>
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(config.status)
                      }`}
                  >
                    {config.status}
                  </span>
                </div>

                <div className="mb-4">
                  <div className="text-sm text-gray-600">
                    Fréquence: {config.frequency}
                  </div>
                  {config.lastExport && (
                    <div className="text-sm text-gray-600">
                      Dernier export: {new Date(config.lastExport).toLocaleString()}
                    </div>
                  )}
                </div>

                <div className="flex space-x-4">
                  <button
                    onClick={() => handleExportNow(config.id)}
                    disabled={state.isLoading}
                    className="flex-grow bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 disabled:opacity-50"
                  >
                    // src/features/IntegrationInterface/components/IntegrationInterface.tsx (continuation)
                    <CloudArrowDownIcon className="h-5 w-5 mr-2 inline" />
                    Exporter maintenant
                  </button>
                  <button
                    onClick={() => handleConfigureExport(config.id)}
                    className="flex-grow bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600"
                  >
                    <AdjustmentsHorizontalIcon className="h-5 w-5 mr-2 inline" />
                    Configurer
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* Key Management Modal */}
      {state.showKeyManagementModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
          <div className="bg-white rounded-lg max-w-md w-full p-6 relative">
            <button
              onClick={() => toggleModal('showKeyManagementModal', false)}
              className="absolute top-4 right-4 text-gray-600 hover:text-gray-900"
            >
              <XMarkIcon className="h-6 w-6" />
            </button>

            <h2 className="text-2xl font-bold mb-6">Gestion de la clé API</h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Clé actuelle
                </label>
                <input
                  type="text"
                  readOnly
                  value="*****"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Dernière rotation
                  </label>
                  <p className="mt-1 text-sm text-gray-900">
                    {new Date().toLocaleString()}
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Expire le
                  </label>
                  <p className="mt-1 text-sm text-gray-900">
                    {new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toLocaleString()}
                  </p>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Permissions
                </label>
                <div className="flex space-x-2">
                  <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs">
                    Lecture
                  </span>
                  <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs">
                    Écriture
                  </span>
                </div>
              </div>

              <button
                onClick={() => {/* Implement key regeneration */ }}
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700"
              >
                Générer une nouvelle clé
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Export Configuration Modal */}
      {state.showExportConfigModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
          <div className="bg-white rounded-lg max-w-md w-full p-6 relative">
            <button
              onClick={() => toggleModal('showExportConfigModal', false)}
              className="absolute top-4 right-4 text-gray-600 hover:text-gray-900"
            >
              <XMarkIcon className="h-6 w-6" />
            </button>

            <h2 className="text-2xl font-bold mb-6">Configuration de l'export</h2>

            <div className="space-y-4">
              <div>
                <label htmlFor="export-format" className="block text-sm font-medium text-gray-700 mb-2">
                  Format
                </label>
                <select
                  id="export-format"
                  className="block w-full rounded-md border-gray-300 shadow-sm"
                >
                  <option value="csv">CSV</option>
                  <option value="json">JSON</option>
                  <option value="pdf">PDF</option>
                </select>
              </div>

              <div>
                <label htmlFor="export-frequency" className="block text-sm font-medium text-gray-700 mb-2">
                  Fréquence
                </label>
                <select
                  id="export-frequency"
                  className="block w-full rounded-md border-gray-300 shadow-sm"
                >
                  <option value="manual">Manuel</option>
                  <option value="hourly">Toutes les heures</option>
                  <option value="daily">Quotidien</option>
                </select>
              </div>

              <div>
                <label htmlFor="export-destination" className="block text-sm font-medium text-gray-700 mb-2">
                  Destination
                </label>
                <input
                  type="text"
                  id="export-destination"
                  placeholder="sftp://exemple.com/exports/"
                  className="block w-full rounded-md border-gray-300 shadow-sm"
                />
              </div>

              <button
                onClick={() => {/* Implement save configuration */ }}
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700"
              >
                Sauvegarder la configuration
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Export Progress Modal */}
      {state.showExportProgressModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <h2 className="text-2xl font-bold mb-4">Progression de l'export</h2>

            <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
              <div
                className="bg-blue-600 h-2.5 rounded-full"
                style={{ width: '50%' }}
              ></div>
            </div>

            <div className="text-center mb-4">
              <p className="text-xl font-semibold">50%</p>
              <p className="text-gray-600">En cours de traitement</p>
            </div>

            <button
              onClick={() => toggleModal('showExportProgressModal', false)}
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700"
            >
              Fermer
            </button>
          </div>
        </div>
      )}

      {/* New API Modal */}
      {state.showNewApiModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
          <div className="bg-white rounded-lg max-w-md w-full p-6 relative">
            <button
              onClick={() => toggleModal('showNewApiModal', false)}
              className="absolute top-4 right-4 text-gray-600 hover:text-gray-900"
            >
              <XMarkIcon className="h-6 w-6" />
            </button>

            <h2 className="text-2xl font-bold mb-6">Nouvelle API</h2>

            <div className="space-y-4">
              <div>
                <label htmlFor="api-name" className="block text-sm font-medium text-gray-700 mb-2">
                  Nom
                </label>
                <input
                  type="text"
                  id="api-name"
                  className="block w-full rounded-md border-gray-300 shadow-sm"
                  placeholder="Nom de l'API"
                />
              </div>

              <div>
                <label htmlFor="api-endpoint" className="block text-sm font-medium text-gray-700 mb-2">
                  Endpoint
                </label>
                <input
                  type="text"
                  id="api-endpoint"
                  className="block w-full rounded-md border-gray-300 shadow-sm"
                  placeholder="URL de l'endpoint"
                />
              </div>

              <div>
                <label htmlFor="api-key" className="block text-sm font-medium text-gray-700 mb-2">
                  Clé API
                </label>
                <input
                  type="password"
                  id="api-key"
                  className="block w-full rounded-md border-gray-300 shadow-sm"
                  placeholder="Clé d'API"
                />
              </div>

              <button
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700"
              >
                Ajouter l'API
              </button>
            </div>
          </div>
        </div>
      )}

      {/* New Export Modal */}
      {state.showNewExportModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
          <div className="bg-white rounded-lg max-w-md w-full p-6 relative">
            <button
              onClick={() => toggleModal('showNewExportModal', false)}
              className="absolute top-4 right-4 text-gray-600 hover:text-gray-900"
            >
              <XMarkIcon className="h-6 w-6" />
            </button>

            <h2 className="text-2xl font-bold mb-6">Nouvel Export</h2>

            <div className="space-y-4">
              <div>
                <label htmlFor="export-format" className="block text-sm font-medium text-gray-700 mb-2">
                  Format
                </label>
                <select
                  id="export-format"
                  className="block w-full rounded-md border-gray-300 shadow-sm"
                >
                  <option value="csv">CSV</option>
                  <option value="json">JSON</option>
                  <option value="pdf">PDF</option>
                </select>
              </div>

              <div>
                <label htmlFor="export-frequency" className="block text-sm font-medium text-gray-700 mb-2">
                  Fréquence
                </label>
                <select
                  id="export-frequency"
                  className="block w-full rounded-md border-gray-300 shadow-sm"
                >
                  <option value="manual">Manuel</option>
                  <option value="hourly">Toutes les heures</option>
                  <option value="daily">Quotidien</option>
                </select>
              </div>

              <div>
                <label htmlFor="export-destination" className="block text-sm font-medium text-gray-700 mb-2">
                  Destination
                </label>
                <input
                  type="text"
                  id="export-destination"
                  className="block w-full rounded-md border-gray-300 shadow-sm"
                  placeholder="sftp://exemple.com/exports/"
                />
              </div>

              <button
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700"
              >
                Configurer l'export
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Toast Notification */}
      {state.showToast && (
        <div className="fixed top-4 right-4 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg flex items-center">
          <span>{state.toastMessage}</span>
          <button
            onClick={closeToast}
            className="ml-4 text-sm underline"
          >
            Fermer
          </button>
        </div>
      )}

      {/* Alert Notification */}
      {state.showAlert && (
        <div className="fixed top-4 right-4 bg-red-500 text-white px-4 py-2 rounded-lg shadow-lg flex items-center">
          <span>{state.alertMessage}</span>
          <button
            onClick={closeAlert}
            className="ml-4 text-sm underline"
          >
            Fermer
          </button>
        </div>
      )}
    </div>
  );
};

export default IntegrationInterface;