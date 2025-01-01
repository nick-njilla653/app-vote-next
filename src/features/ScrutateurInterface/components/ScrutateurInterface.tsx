// src/features/ScrutateurInterface/components/ScrutateurInterface.tsx
'use client';

import React from 'react';
import { 
  ArrowRightOnRectangleIcon, 
  DocumentCheckIcon 
} from '@heroicons/react/24/outline';
import { useScrutateur } from '../hooks/useScrutateur';

const ScrutateurInterface: React.FC = () => {
  const {
    state,
    mockScrutateurInfo,
    handleLogout,
    handleVoteInput,
    handleInvalidVotes,
    handleSubmit,
    closeToast,
    closeAlert
  } = useScrutateur();

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <header className="bg-blue-600 text-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-16">
          <h1 className="text-2xl font-bold">Saisie des Résultats</h1>
          <button 
            onClick={handleLogout} 
            className="hover:bg-blue-700 p-2 rounded-full transition-colors"
          >
            <ArrowRightOnRectangleIcon className="h-6 w-6" />
          </button>
        </div>
        {state.isLoading && (
          <div className="w-full bg-blue-700 h-1 animate-pulse"></div>
        )}
      </header>

      {/* Main Content */}
      <main className="flex-grow container mx-auto px-4 py-8 grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Scrutateur Info Card */}
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4 text-gray-900">
            Informations du Scrutateur
          </h2>
          <div className="space-y-3">
            <div>
              <label className="text-sm text-gray-600">ID Scrutateur</label>
              <p className="font-medium text-gray-900">{mockScrutateurInfo.id}</p>
            </div>
            <div>
              <label className="text-sm text-gray-600">Nom</label>
              <p className="font-medium text-gray-900">{mockScrutateurInfo.name}</p>
            </div>
            <div>
              <label className="text-sm text-gray-600">Bureau de vote</label>
              <p className="font-medium text-gray-900">{mockScrutateurInfo.pollingStation}</p>
            </div>
            <div>
              <label className="text-sm text-gray-600">Rôle</label>
              <p className="font-medium text-gray-900">{mockScrutateurInfo.role}</p>
            </div>
          </div>
        </div>

        {/* Results Entry Card */}
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4 text-gray-900">
            Saisie des Résultats
          </h2>
          <div className="space-y-4">
            {Object.entries(state.results.candidateVotes).map(([candidate, votes]) => (
              <div key={candidate} className="grid grid-cols-3 items-center">
                <label className="text-sm text-gray-600 col-span-1">{candidate}</label>
                <input
                  type="number"
                  value={votes}
                  onChange={(e) => handleVoteInput(candidate, e.target.value)}
                  min="0"
                  className="col-span-2 border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                />
              </div>
            ))}

            <div className="grid grid-cols-3 items-center">
              <label className="text-sm text-gray-600 col-span-1">Votes invalides</label>
              <input
                type="number"
                value={state.results.invalidVotes}
                onChange={(e) => handleInvalidVotes(e.target.value)}
                min="0"
                className="col-span-2 border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="flex justify-between items-center mt-4">
              <span className="text-sm text-gray-600">Total des votes</span>
              <span className="font-medium text-gray-900">
                {state.results.totalVotes}
              </span>
            </div>
          </div>
        </div>
      </main>

      {/* Submit Button */}
      <div className="fixed bottom-6 right-6">
        <button
          onClick={handleSubmit}
          disabled={state.isLoading}
          className="bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
        >
          <DocumentCheckIcon className="h-6 w-6" />
        </button>
      </div>

      {/* Footer */}
      <footer className="bg-white py-4 text-center">
        <small className="text-gray-600">
          © 2024 ELECAM - Système de Gestion des Élections
        </small>
      </footer>

      {/* Toast Notification */}
      {state.showToast && (
        <div className="fixed top-4 right-4 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg">
          {state.toastMessage}
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
        <div className="fixed top-4 right-4 bg-red-500 text-white px-4 py-2 rounded-lg shadow-lg">
          {state.alertMessage}
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

export default ScrutateurInterface;