// src/features/ElectionCalendarPage/components/ElectionCalendarPage.tsx
'use client';

import React from 'react';
import Link from 'next/link';
import { 
    CalendarIcon, 
    ListBulletIcon, 
    MagnifyingGlassIcon,
    ShareIcon,
    BellIcon,
    ArrowDownTrayIcon,
    XMarkIcon
} from '@heroicons/react/24/outline';
import { useElectionCalendar } from '../hooks/useElectionCalendar';

const ElectionCalendarPage: React.FC = () => {
    const {
        events,
        filteredEvents,
        state,
        getImportanceColor,
        toggleViewMode,
        updateSearchText,
        updateSelectedMonth,
        toggleAlert,
        generateCalendarGrid
    } = useElectionCalendar();

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <header className="bg-blue-600 text-white shadow-md">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-16">
                    <Link href="/home" className="hover:bg-blue-700 p-2 rounded-full">
                        <ArrowDownTrayIcon className="h-6 w-6 transform rotate-90" />
                    </Link>
                    <h1 className="text-2xl font-bold">Calendrier Électoral</h1>
                    <div className="flex items-center space-x-2">
                        <button 
                            onClick={() => toggleAlert(true)}
                            className="hover:bg-blue-700 p-2 rounded-full"
                        >
                            <BellIcon className="h-6 w-6" />
                        </button>
                        <button 
                            className="hover:bg-blue-700 p-2 rounded-full"
                        >
                            <ShareIcon className="h-6 w-6" />
                        </button>
                    </div>
                </div>
            </header>

            {/* View Mode Toggle */}
            <div className="flex justify-center my-4">
                <div className="flex bg-white rounded-lg shadow-md">
                    <button
                        onClick={() => toggleViewMode('calendar')}
                        className={`px-4 py-2 rounded-l-lg flex items-center ${
                            state.viewMode === 'calendar' 
                                ? 'bg-blue-600 text-white' 
                                : 'text-gray-600 hover:bg-gray-100'
                        }`}
                    >
                        <CalendarIcon className="h-5 w-5 mr-2" />
                        Calendrier
                    </button>
                    <button
                        onClick={() => toggleViewMode('list')}
                        className={`px-4 py-2 rounded-r-lg flex items-center ${
                            state.viewMode === 'list' 
                                ? 'bg-blue-600 text-white' 
                                : 'text-gray-600 hover:bg-gray-100'
                        }`}
                    >
                        <ListBulletIcon className="h-5 w-5 mr-2" />
                        Liste
                    </button>
                </div>
            </div>

            {/* Search Bar */}
            <div className="max-w-2xl mx-auto px-4 mb-4">
                <div className="relative">
                    <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Rechercher un événement..."
                        value={state.searchText}
                        onChange={(e) => updateSearchText(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
            </div>

            {/* Month Selector (for list view) */}
            {state.viewMode === 'list' && (
                <div className="max-w-2xl mx-auto px-4 mb-4 flex items-center">
                    <select
                        value={state.selectedMonth}
                        onChange={(e) => updateSelectedMonth(e.target.value)}
                        className="flex-grow mr-4 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="Décembre">Décembre 2024</option>
                        <option value="Janvier">Janvier 2025</option>
                        <option value="Février">Février 2025</option>
                    </select>
                    <button className="p-2 hover:bg-gray-100 rounded-full">
                        <CalendarIcon className="h-6 w-6 text-gray-600" />
                    </button>
                </div>
            )}

            {/* Main Content */}
            <main className="max-w-4xl mx-auto px-4">
                {state.viewMode === 'calendar' ? (
                    <div className="bg-white shadow-md rounded-lg p-6">
                        <div className="grid grid-cols-7 gap-2">
                            {['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'].map(day => (
                                <div 
                                    key={day} 
                                    className="text-center font-semibold text-gray-600"
                                >
                                    {day}
                                </div>
                            ))}
                            {generateCalendarGrid().map(({ day, hasEvent }) => (
                                <div 
                                    key={day} 
                                    className={`border rounded-lg p-2 text-center relative ${
                                        hasEvent ? 'bg-blue-50' : ''
                                    }`}
                                >
                                    <span className="text-gray-700">{day}</span>
                                    {hasEvent && (
                                        <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-blue-500 rounded-full"></div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {filteredEvents.map(event => (
                            <div 
                                key={event.id} 
                                className="bg-white shadow-md rounded-lg p-6 flex items-start"
                            >
                                <div className="mr-4 text-center">
                                    <div className="text-2xl font-bold text-blue-600">
                                        {new Date(event.date).getDate()}
                                    </div>
                                    <div className="text-sm text-gray-500">
                                        {new Date(event.date).toLocaleString('default', { month: 'short' })}
                                    </div>
                                </div>
                                <div className="flex-grow">
                                    <div className="flex justify-between items-start">
                                        <h3 className="text-lg font-semibold text-gray-900">
                                            {event.title}
                                        </h3>
                                        <span 
                                            className={`px-2 py-1 rounded-full text-xs font-medium ${
                                                getImportanceColor(event.importance)
                                            }`}
                                        >
                                            {event.type}
                                        </span>
                                    </div>
                                    <p className="text-gray-600 mt-2">
                                        {event.description}
                                    </p>
                                    {event.location && (
                                        <div className="mt-2 text-sm text-gray-500 flex items-center">
                                            <CalendarIcon className="h-4 w-4 mr-2" />
                                            {event.location}
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </main>

            {/* Download FAB */}
            <div className="fixed bottom-6 right-6">
                <button 
                    onClick={() => toggleAlert(true)}
                    className="bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 transition-colors"
                >
                    <ArrowDownTrayIcon className="h-6 w-6" />
                </button>
            </div>

            {/* Download Alert */}
            {state.showAlert && (
                <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
                    <div className="bg-white rounded-lg max-w-md w-full p-6 relative">
                        <button 
                            onClick={() => toggleAlert(false)}
                            className="absolute top-4 right-4 text-gray-600 hover:text-gray-900"
                        >
                            <XMarkIcon className="h-6 w-6" />
                        </button>
                        <h2 className="text-xl font-bold mb-4">Télécharger le calendrier</h2>
                        <p className="mb-6 text-gray-600">
                            Voulez-vous télécharger le calendrier électoral complet?
                        </p>
                        <div className="flex justify-end space-x-4">
                            <button
                                onClick={() => toggleAlert(false)}
                                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
                            >
                                Annuler
                            </button>
                            <button
                                onClick={() => {
                                    console.log('Téléchargement du calendrier');
                                    toggleAlert(false);
                                }}
                                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                            >
                                Télécharger
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ElectionCalendarPage;