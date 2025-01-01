// src/features/TransversalInterface/components/TransversalInterface.tsx
'use client';

import React from 'react';
import {
    LockClosedIcon,
    UserIcon,
    QuestionMarkCircleIcon,
    XMarkIcon,
    ExclamationCircleIcon,
    PaperAirplaneIcon
} from '@heroicons/react/24/outline';
import { useTransversalInterface } from '../hooks/useTransversalInterface';

const TransversalInterface: React.FC = () => {
    const {
        state,
        faqs,
        handleLogin,
        handleSupportTicket,
        filteredFAQs,
        toggleFAQ,
        expandedFAQs,
        updateCredentials,
        updateSupportTicket,
        toggleSupportModal,
        closeToast
    } = useTransversalInterface();

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            {/* Header */}
            <header className="bg-blue-600 text-white shadow-md">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-16">
                    <h1 className="text-2xl font-bold">Système Électoral</h1>
                </div>
                {state.isLoading && (
                    <div className="w-full bg-blue-700 h-1 animate-pulse"></div>
                )}
            </header>

            {/* Main Content */}
            <main className="flex-grow flex items-center justify-center px-4 py-8">
                <div className="w-full max-w-md">
                    <div className="bg-white shadow-md rounded-lg p-8">
                        <h2 className="text-2xl font-bold text-center mb-6 text-gray-900">
                            Accès au Système Électoral
                        </h2>

                        <form onSubmit={handleLogin}>
                            <div className="space-y-4">
                                {/* Role Selection */}
                                <div>
                                    <label htmlFor="role" className="block text-sm font-medium text-gray-700">
                                        Rôle
                                    </label>
                                    <select
                                        id="role"
                                        value={state.credentials.role}
                                        onChange={(e) => updateCredentials({
                                            role: e.target.value as 'électeur' | 'scrutateur' | 'admin' | 'observateur'
                                        })}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                    >
                                        <option value="">Sélectionnez un rôle</option>
                                        <option value="électeur">Électeur</option>
                                        <option value="scrutateur">Scrutateur</option>
                                        <option value="admin">Administrateur</option>
                                        <option value="observateur">Observateur</option>
                                    </select>
                                </div>

                                {/* Username Input */}
                                <div>
                                    <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                                        Identifiant
                                    </label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <UserIcon className="h-5 w-5 text-gray-400" />
                                        </div>
                                        <input
                                            type="text"
                                            id="username"
                                            value={state.credentials.username}
                                            onChange={(e) => updateCredentials({ username: e.target.value })}
                                            className="pl-10 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                            required
                                        />
                                    </div>
                                </div>

                                {/* Password Input */}
                                <div>
                                    <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                        Mot de passe
                                    </label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <LockClosedIcon className="h-5 w-5 text-gray-400" />
                                        </div>
                                        <input
                                            type="password"
                                            id="password"
                                            value={state.credentials.password}
                                            onChange={(e) => updateCredentials({ password: e.target.value })}
                                            className="pl-10 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                            required
                                        />
                                    </div>
                                </div>

                                {/* Error Message */}
                                {state.loginError && (
                                    <div className="bg-red-50 border border-red-300 text-red-800 px-4 py-2 rounded-md flex items-center">
                                        <ExclamationCircleIcon className="h-5 w-5 mr-2 text-red-500" />
                                        <span>{state.loginError}</span>
                                    </div>
                                )}

                                {/* Submit Button */}
                                <button
                                    type="submit"
                                    disabled={state.isLoading}
                                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
                                >
                                    {state.isLoading ? 'Connexion en cours...' : 'Se connecter'}
                                </button>
                            </div>
                        </form>

                        {/* Help Link */}
                        <div className="mt-4 text-center">
                            <button
                                onClick={() => toggleSupportModal(true)}
                                className="text-sm text-blue-600 hover:text-blue-800 flex items-center justify-center w-full"
                            >
                                <QuestionMarkCircleIcon className="h-5 w-5 mr-2" />
                                Besoin d'aide ?
                            </button>
                        </div>
                    </div>
                </div>
            </main>

            {/* Support Modal */}
            {state.showSupportModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
                    <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 relative">
                        <button
                            onClick={() => toggleSupportModal(false)}
                            className="absolute top-4 right-4 text-gray-600 hover:text-gray-900"
                        >
                            <XMarkIcon className="h-6 w-6" />
                        </button>

                        <h2 className="text-2xl font-bold mb-6">Support et Aide</h2>

                        {/* Search FAQ */}
                        <div className="mb-6">
                            <input
                                type="text"
                                placeholder="Rechercher dans la FAQ..."
                                value={state.searchQuery}
                                onChange={(e) => updateCredentials({
                                    username: e.target.value // Reusing this method to update search query
                                })}
                                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />

                            {/* FAQ Accordion */}
                            <div className="space-y-2">
                                {filteredFAQs().map((faq, index) => (
                                    <div
                                        key={index}
                                        className="border rounded-lg overflow-hidden"
                                    >
                                        <button
                                            className="w-full text-left p-4 bg-gray-100 hover:bg-gray-200 flex justify-between items-center"
                                            onClick={() => toggleFAQ(index)}
                                        >
                                            <span className="font-semibold">{faq.question}</span>
                                            <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                                                {faq.category}
                                            </span>
                                        </button>
                                        {expandedFAQs.includes(index) && (
                                            <div className="p-4 bg-white">
                                                {faq.answer}
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>

                            {/* Support Ticket Form */}
                            <div className="mt-6 border-t pt-6">
                                <h3 className="text-xl font-semibold mb-4">Contactez le support</h3>
                                <form onSubmit={handleSupportTicket} className="space-y-4">
                                    {/* Category Selection */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Catégorie
                                        </label>
                                        <select
                                            value={state.supportTicket.category}
                                            onChange={(e) => updateSupportTicket({
                                                category: e.target.value
                                            })}
                                            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        >
                                            <option value="">Sélectionnez une catégorie</option>
                                            <option value="technique">Problème technique</option>
                                            <option value="access">Problème d'accès</option>
                                            <option value="other">Autre question</option>
                                        </select>
                                    </div>

                                    {/* Subject Input */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Sujet
                                        </label>
                                        <input
                                            type="text"
                                            value={state.supportTicket.subject}
                                            onChange={(e) => updateSupportTicket({
                                                subject: e.target.value
                                            })}
                                            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            required
                                        />
                                    </div>

                                    {/* Message Textarea */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Message
                                        </label>
                                        <textarea
                                            rows={4}
                                            value={state.supportTicket.message}
                                            onChange={(e) => updateSupportTicket({
                                                message: e.target.value
                                            })}
                                            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            required
                                        />
                                    </div>

                                    {/* Submit Button */}
                                    <button
                                        type="submit"
                                        disabled={state.isLoading}
                                        className="w-full flex justify-center items-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
                                    >
                                        {state.isLoading ? (
                                            <>
                                                <svg
                                                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                >
                                                    <circle
                                                        className="opacity-25"
                                                        cx="12"
                                                        cy="12"
                                                        r="10"
                                                        stroke="currentColor"
                                                        strokeWidth="4"
                                                    ></circle>
                                                    <path
                                                        className="opacity-75"
                                                        fill="currentColor"
                                                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                                    ></path>
                                                </svg>
                                                Envoi en cours...
                                            </>
                                        ) : (
                                            <>
                                                <PaperAirplaneIcon className="h-5 w-5 mr-2" />
                                                Envoyer
                                            </>
                                        )}
                                    </button>
                                </form>
                            </div>
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

            {/* Footer */}
            <footer className="bg-white py-4 text-center">
                <small className="text-gray-600">
                    © 2024 ELECAM - Système de Gestion des Élections
                </small>
            </footer>
        </div>
    );
};

export default TransversalInterface;