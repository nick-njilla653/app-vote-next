// src/features/SurveillanceInterface/components/SurveillanceInterface.tsx
'use client';

import React, { useState } from 'react';
import {
    ArrowRightOnRectangleIcon,
    PlusIcon,
    MapPinIcon,
    ClockIcon,
    XMarkIcon
} from '@heroicons/react/24/outline';
import { useSurveillance } from '../hooks/useSurveillance';

const SurveillanceInterface: React.FC = () => {
    const {
        state,
        handleLogout,
        handleSubmitIncident,
        getStatusColor,
        getSeverityColor,
        openIncidentDetails,
        closeIncidentDetails,
        openNewIncidentModal,
        closeNewIncidentModal,
        updateNewIncident,
        closeToast,
        closeAlert
    } = useSurveillance();

    // File upload handler
    const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            const reader = new FileReader();
            reader.onload = (e) => {
                updateNewIncident({ evidence: e.target?.result as string });
            };
            reader.readAsDataURL(event.target.files[0]);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            {/* Header */}
            <header className="bg-blue-600 text-white shadow-md">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-16">
                    <h1 className="text-2xl font-bold">Surveillance Électorale</h1>
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
            <main className="flex-grow container mx-auto px-4 py-8">
                {/* Incidents Header */}
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-semibold text-gray-900">
                        Incidents de Sécurité
                    </h2>
                    <button
                        onClick={openNewIncidentModal}
                        className="flex items-center bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
                    >
                        <PlusIcon className="h-5 w-5 mr-2" />
                        Signaler un incident
                    </button>
                </div>

                {/* Incidents List */}
                <div className="space-y-4">
                    {state.incidents.map((incident) => (
                        <div
                            key={incident.id}
                            onClick={() => openIncidentDetails(incident)}
                            className="bg-white shadow-md rounded-lg p-6 cursor-pointer hover:shadow-lg transition-shadow"
                        >
                            <div className="flex justify-between items-start">
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-900">
                                        {incident.title}
                                    </h3>
                                    <p className="text-sm text-gray-600 mt-2 line-clamp-2">
                                        {incident.description}
                                    </p>
                                </div>
                                <div className="flex flex-col items-end">
                                    <span
                                        className={`px-2 py-1 rounded-full text-xs font-medium 
                      ${getSeverityColor(incident.severity) === 'red' ? 'bg-red-100 text-red-800' :
                                                getSeverityColor(incident.severity) === 'yellow' ? 'bg-yellow-100 text-yellow-800' :
                                                    'bg-green-100 text-green-800'}`}
                                    >
                                        {incident.severity}
                                    </span>
                                </div>
                            </div>

                            <div className="mt-4 flex justify-between items-center">
                                <div className="flex items-center text-sm text-gray-600">
                                    <MapPinIcon className="h-4 w-4 mr-2" />
                                    <span>{incident.location}</span>
                                </div>
                                <div className="flex items-center text-sm text-gray-600">
                                    <ClockIcon className="h-4 w-4 mr-2" />
                                    <span>
                                        {new Date(incident.datetime).toLocaleString()}
                                    </span>
                                </div>
                                <span
                                    className={`px-2 py-1 rounded-full text-xs font-medium 
                  ${getStatusColor(incident.status) === 'blue' ? 'bg-blue-100 text-blue-800' :
                                            getStatusColor(incident.status) === 'yellow' ? 'bg-yellow-100 text-yellow-800' :
                                                'bg-green-100 text-green-800'}`}
                                >
                                    {incident.status}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </main>

            {/* Incident Details Modal */}
            {state.selectedIncident && (
                <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
                    <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 relative">
                        <button
                            onClick={closeIncidentDetails}
                            className="absolute top-4 right-4 text-gray-600 hover:text-gray-900"
                        >
                            <XMarkIcon className="h-6 w-6" />
                        </button>

                        <h2 className="text-2xl font-bold mb-4">{state.selectedIncident.title}</h2>

                        <div className="mb-4 flex space-x-2">
                            <span
                                className={`px-2 py-1 rounded-full text-xs font-medium 
                ${getSeverityColor(state.selectedIncident.severity) === 'red' ? 'bg-red-100 text-red-800' :
                                        getSeverityColor(state.selectedIncident.severity) === 'yellow' ? 'bg-yellow-100 text-yellow-800' :
                                            'bg-green-100 text-green-800'}`}
                            >
                                {state.selectedIncident.severity}
                            </span>
                            <span
                                className={`px-2 py-1 rounded-full text-xs font-medium 
                ${getStatusColor(state.selectedIncident.status) === 'blue' ? 'bg-blue-100 text-blue-800' :
                                        getStatusColor(state.selectedIncident.status) === 'yellow' ? 'bg-yellow-100 text-yellow-800' :
                                            'bg-green-100 text-green-800'}`}
                            >
                                {state.selectedIncident.status}
                            </span>
                        </div>

                        <div className="mb-4">
                            <h3 className="font-semibold mb-2">Description</h3>
                            <p className="text-gray-700">{state.selectedIncident.description}</p>
                        </div>

                        <div className="grid md:grid-cols-2 gap-4 mb-4">
                            <div>
                                <h3 className="font-semibold mb-2">Lieu</h3>
                                <p className="text-gray-700 flex items-center">
                                    <MapPinIcon className="h-5 w-5 mr-2" />
                                    {state.selectedIncident.location}
                                </p>
                            </div>
                            <div>
                                <h3 className="font-semibold mb-2">Date et Heure</h3>
                                <p className="text-gray-700 flex items-center">
                                    <ClockIcon className="h-5 w-5 mr-2" />
                                    {new Date(state.selectedIncident.datetime).toLocaleString()}
                                </p>
                            </div>
                        </div>

                        {state.selectedIncident.actions && state.selectedIncident.actions.length > 0 && (
                            <div className="mb-4">
                                <h3 className="font-semibold mb-2">Actions prises</h3>
                                <ul className="list-disc list-inside text-gray-700">
                                    {state.selectedIncident.actions.map((action, index) => (
                                        <li key={index}>{action}</li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        {state.selectedIncident.witnesses && state.selectedIncident.witnesses.length > 0 && (
                            <div className="mb-4">
                                <h3 className="font-semibold mb-2">Témoins</h3>
                                <ul className="list-disc list-inside text-gray-700">
                                    {state.selectedIncident.witnesses.map((witness, index) => (
                                        <li key={index}>{witness}</li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        {state.selectedIncident.updates && state.selectedIncident.updates.length > 0 && (
                            <div>
                                <h3 className="font-semibold mb-2">Mises à jour</h3>
                                <div className="space-y-2">
                                    {state.selectedIncident.updates.map((update, index) => (
                                        <div key={index} className="bg-gray-100 p-3 rounded-lg">
                                            <div className="flex justify-between items-center mb-2">
                                                <span className="text-sm text-gray-600">
                                                    {new Date(update.date).toLocaleString()}
                                                </span>
                                                <span className="text-sm text-gray-500">
                                                    Par: {update.author}
                                                </span>
                                            </div>
                                            <p className="text-gray-700">{update.content}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            )}

            {/* New Incident Modal */}
            {state.showNewIncidentModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
                    <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 relative">
                        <button
                            onClick={closeNewIncidentModal}
                            className="absolute top-4 right-4 text-gray-600 hover:text-gray-900"
                        >
                            <XMarkIcon className="h-6 w-6" />
                        </button>

                        <h2 className="text-2xl font-bold mb-6">Signaler un incident</h2>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Titre
                                </label>
                                <input
                                    type="text"
                                    value={state.newIncident.title || ''}
                                    onChange={(e) => updateNewIncident({ title: e.target.value })}
                                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Description
                                </label>
                                <textarea
                                    value={state.newIncident.description || ''}
                                    onChange={(e) => updateNewIncident({ description: e.target.value })}
                                    rows={4}
                                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Lieu
                                </label>
                                <input
                                    type="text"
                                    value={state.newIncident.location || ''}
                                    onChange={(e) => updateNewIncident({ location: e.target.value })}
                                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Niveau de gravité
                                </label>
                                <select
                                    value={state.newIncident.severity || 'Moyen'}
                                    onChange={(e) => updateNewIncident({
                                        severity: e.target.value as 'Faible' | 'Moyen' | 'Élevé'
                                    })}
                                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                >
                                    <option value="Faible">Faible</option>
                                    <option value="Moyen">Moyen</option>
                                    <option value="Élevé">Élevé</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Preuve photo/document
                                </label>
                                <input
                                    type="file"
                                    accept="image/*,.pdf"
                                    onChange={handleFileUpload}
                                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                                {state.newIncident.evidence && (
                                    <div className="mt-2">
                                        <img
                                            src={state.newIncident.evidence}
                                            alt="Preuve"
                                            className="max-w-full h-auto rounded-lg"
                                        />
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="mt-6">
                            <button
                                onClick={handleSubmitIncident}
                                disabled={state.isLoading}
                                className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
                            >
                                {state.isLoading ? 'Soumission en cours...' : 'Soumettre'}
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

export default SurveillanceInterface;