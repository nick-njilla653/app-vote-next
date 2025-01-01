// src/features/VoterInterface/components/VoterInterface.tsx
'use client';

import React from 'react';
import { 
  ArrowRightOnRectangleIcon, 
  MapPinIcon, 
  CalendarIcon, 
  BellIcon, 
  CheckCircleIcon,
  ExclamationTriangleIcon
} from '@heroicons/react/24/outline';
import { useVoterInterface } from '../hooks/useVoterInterface';

const VoterInterface: React.FC = () => {
  const { 
    state, 
    handleLogout, 
    markNotificationAsRead 
  } = useVoterInterface();

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <header className="bg-blue-600 text-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-16">
          <h1 className="text-2xl font-bold">Tableau de bord Électeur</h1>
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
      <main className="flex-grow container mx-auto px-4 py-8 space-y-6">
        {/* Voter Information Card */}
        <div className="bg-white shadow-md rounded-lg p-6">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">
                {state.voterInfo.fullName}
              </h2>
              <p className="text-sm text-gray-600">
                N° Électeur: {state.voterInfo.id}
              </p>
            </div>
          </div>

          <div className="space-y-4">
            {/* Polling Station */}
            <div className="flex items-center">
              <MapPinIcon className="h-6 w-6 text-blue-500 mr-4" />
              <div>
                <h3 className="text-sm font-medium text-gray-600">Bureau de vote</h3>
                <p className="text-gray-900">
                  {state.voterInfo.pollingStation}
                </p>
              </div>
            </div>

            {/* Registration Date */}
            <div className="flex items-center">
              <CalendarIcon className="h-6 w-6 text-green-500 mr-4" />
              <div>
                <h3 className="text-sm font-medium text-gray-600">Date d'inscription</h3>
                <p className="text-gray-900">
                  {state.voterInfo.registrationDate}
                </p>
              </div>
            </div>

            {/* Voting Status */}
            <div className="flex items-center">
              {state.voterInfo.votingStatus === 'Voté' ? (
                <CheckCircleIcon className="h-6 w-6 text-green-500 mr-4" />
              ) : (
                <ExclamationTriangleIcon className="h-6 w-6 text-yellow-500 mr-4" />
              )}
              <div>
                <h3 className="text-sm font-medium text-gray-600">Statut de vote</h3>
                <p className={`
                  font-semibold 
                  ${state.voterInfo.votingStatus === 'Voté' 
                    ? 'text-green-600' 
                    : 'text-yellow-600'
                  }
                `}>
                  {state.voterInfo.votingStatus}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Notifications Card */}
        <div className="bg-white shadow-md rounded-lg p-6">
          <div className="flex items-center mb-4">
            <BellIcon className="h-6 w-6 text-blue-500 mr-4" />
            <h2 className="text-xl font-bold text-gray-900">Notifications</h2>
          </div>

          <div className="space-y-4">
            {state.voterInfo.notifications.map((notification) => (
              <div 
                key={notification.id}
                className={`p-4 rounded-lg relative 
                  ${!notification.isRead 
                    ? 'bg-blue-50 border border-blue-200' 
                    : 'bg-gray-50'
                  }`}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-sm font-semibold text-gray-900 mb-1">
                      {notification.title}
                    </h3>
                    <p className="text-sm text-gray-600 mb-2">
                      {notification.message}
                    </p>
                    <p className="text-xs text-gray-500">
                      {notification.date}
                    </p>
                  </div>

                  {!notification.isRead && (
                    <span className="bg-blue-500 text-white text-xs px-2 py-1 rounded-full">
                      Nouveau
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white py-4 text-center">
        <small className="text-gray-600">
          © 2024 ELECAM - Système de Gestion des Élections
        </small>
      </footer>
    </div>
  );
};

export default VoterInterface;