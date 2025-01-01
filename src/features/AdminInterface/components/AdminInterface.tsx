// src/features/AdminInterface/components/AdminInterface.tsx
'use client';

import React from 'react';
import { 
  ArrowRightOnRectangleIcon, 
  MagnifyingGlassIcon,
  FunnelIcon,
  ArrowPathIcon 
} from '@heroicons/react/24/outline';
import { useAdminInterface } from '../hooks/useAdminInterface';

const AdminInterface: React.FC = () => {
  const {
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
  } = useAdminInterface();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-blue-600 text-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-16">
          <h1 className="text-2xl font-bold">Administration ELECAM</h1>
          <button 
            onClick={handleLogout} 
            className="hover:bg-blue-700 p-2 rounded-full transition-colors"
          >
            <ArrowRightOnRectangleIcon className="h-6 w-6" />
          </button>
        </div>
        {isLoading && (
          <div className="w-full bg-blue-700 h-1 animate-pulse"></div>
        )}
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Segment Control */}
        <div className="flex justify-center mb-6">
          <div className="flex bg-white rounded-lg shadow-md">
            <button
              onClick={() => setActiveSegment('voters')}
              className={`px-4 py-2 rounded-l-lg ${
                activeSegment === 'voters' 
                  ? 'bg-blue-600 text-white' 
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              Électeurs
            </button>
            <button
              onClick={() => setActiveSegment('results')}
              className={`px-4 py-2 rounded-r-lg ${
                activeSegment === 'results' 
                  ? 'bg-blue-600 text-white' 
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              Résultats
            </button>
          </div>
        </div>

        {/* Search and Filter */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-grow">
            <input
              type="text"
              placeholder="Rechercher..."
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            />
            <MagnifyingGlassIcon className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
          </div>
          
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value as 'all' | 'pending' | 'validated' | 'rejected')}
            className="w-full sm:w-auto px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">Tous</option>
            <option value="pending">En attente</option>
            <option value="validated">Validés</option>
            <option value="rejected">Rejetés</option>
          </select>
        </div>

        {/* Refresh Button */}
        <div className="flex justify-end mb-4">
          <button
            onClick={handleRefresh}
            disabled={isLoading}
            className="flex items-center gap-2 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 disabled:opacity-50"
          >
            <ArrowPathIcon className="h-5 w-5" />
            Actualiser
          </button>
        </div>

        {/* Content List */}
        <div className="bg-white shadow-md rounded-lg">
          {activeSegment === 'voters' ? (
            <ul className="divide-y divide-gray-200">
              {voterRegistrations.map(voter => (
                <li key={voter.id} className="px-6 py-4 flex justify-between items-center">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{voter.fullName}</h3>
                    <p className="text-sm text-gray-500">ID: {voter.idNumber}</p>
                    <p className="text-sm text-gray-500">Bureau: {voter.pollingStation}</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <select
                      value={voter.status}
                      onChange={(e) => handleStatusChange(voter.id, e.target.value)}
                      className={`px-3 py-1 rounded-full text-sm font-medium ${
                        voter.status === 'Validé' 
                          ? 'bg-green-100 text-green-800' 
                          : voter.status === 'Rejeté' 
                            ? 'bg-red-100 text-red-800' 
                            : 'bg-yellow-100 text-yellow-800'
                      }`}
                    >
                      <option value="En attente">En attente</option>
                      <option value="Validé">Validé</option>
                      <option value="Rejeté">Rejeté</option>
                    </select>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <ul className="divide-y divide-gray-200">
              {pollingResults.map(result => (
                <li key={result.stationId} className="px-6 py-4 flex justify-between items-center">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{result.location}</h3>
                    <p className="text-sm text-gray-500">Total des votes: {result.totalVotes}</p>
                    <p className="text-sm text-gray-500">Votes valides: {result.validVotes}</p>
                  </div>
                  <div
                    className={`px-3 py-1 rounded-full text-sm font-medium ${
                      result.status === 'Validé' 
                        ? 'bg-green-100 text-green-800' 
                        : result.status === 'Rejeté' 
                          ? 'bg-red-100 text-red-800' 
                          : 'bg-yellow-100 text-yellow-800'
                    }`}
                  >
                    {result.status}
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </main>

      {/* Toast Notification */}
      {showToast && (
        <div className="fixed top-4 right-4 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg">
          {toastMessage}
          <button 
            onClick={() => setShowToast(false)} 
            className="ml-4 text-sm underline"
          >
            Fermer
          </button>
        </div>
      )}

      {/* Alert Notification */}
      {showAlert && (
        <div className="fixed top-4 right-4 bg-red-500 text-white px-4 py-2 rounded-lg shadow-lg">
          {alertMessage}
          <button 
            onClick={() => setShowAlert(false)} 
            className="ml-4 text-sm underline"
          >
            Fermer
          </button>
        </div>
      )}
    </div>
  );
};

export default AdminInterface;