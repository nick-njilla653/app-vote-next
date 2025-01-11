// src/features/ElectoralMapPage/components/ElectoralMapPage.tsx
'use client';

import React, { Suspense, lazy } from 'react';
import Link from 'next/link';
import {
    MapIcon,
    UserGroupIcon,
    ChartBarIcon,
    MagnifyingGlassIcon,
    ArrowDownTrayIcon,
    FunnelIcon,
    ArrowLeftIcon,
    CheckCircleIcon,
    InformationCircleIcon,
    XCircleIcon
} from '@heroicons/react/24/outline';
import dynamic from 'next/dynamic';
import { useElectoralMapPage } from '../hooks/useElectoralMapPage';

// Lazy load the map component
const ElectoralMap = dynamic(() => import('@/features/ElectoralMap/components/ElectoralMap'), {
    ssr: false,
    loading: () => (
      <div className="flex items-center justify-center h-[500px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900" />
      </div>
    ),
  });
const ElectoralMapPage: React.FC = () => {
    const {
        regionData,
        state,
        handleRegionClick,
        toggleViewMode,
        changeMapLevel,
        updateSearchText,
        getImportanceColor
    } = useElectoralMapPage();

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            {/* Header */}
            <header className="bg-blue-600 text-white shadow-md">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-16">
                    <Link href="/home" className="hover:bg-blue-700 p-2 rounded-full">
                        <ArrowLeftIcon className="h-6 w-6" />
                    </Link>
                    <h1 className="text-2xl font-bold">Carte Électorale</h1>
                    <div className="flex space-x-2">
                        <button className="hover:bg-blue-700 p-2 rounded-full">
                            <ArrowDownTrayIcon className="h-6 w-6" />
                        </button>
                        <button className="hover:bg-blue-700 p-2 rounded-full">
                            <FunnelIcon className="h-6 w-6" />
                        </button>
                    </div>
                </div>
            </header>

            {/* View Mode Toggle */}
            <div className="flex justify-center my-4">
                <div className="flex bg-white rounded-lg shadow-md">
                    {[
                        { mode: 'general', icon: MapIcon, label: 'Général' },
                        { mode: 'participation', icon: UserGroupIcon, label: 'Participation' },
                        { mode: 'results', icon: ChartBarIcon, label: 'Résultats' }
                    ].map(({ mode, icon: Icon, label }) => (
                        <button
                            key={mode}
                            onClick={() => toggleViewMode(mode as 'general' | 'participation' | 'results')}
                            className={`px-4 py-2 flex items-center ${state.viewMode === mode
                                    ? 'bg-blue-600 text-white'
                                    : 'text-gray-600 hover:bg-gray-100'
                                } ${mode === 'general' ? 'rounded-l-lg' : mode === 'results' ? 'rounded-r-lg' : ''}`}
                        >
                            <Icon className="h-5 w-5 mr-2" />
                            {label}
                        </button>
                    ))}
                </div>
            </div>

            {/* Search Bar */}
            <div className="max-w-2xl mx-auto px-4 mb-4">
                <div className="relative">
                    <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Rechercher une région..."
                        value={state.searchText}
                        onChange={(e) => updateSearchText(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
            </div>

            {/* Render Map Component */}
            <Suspense fallback={
                <div className="flex items-center justify-center h-full">
                    <svg 
                        aria-hidden="true" 
                        className="w-10 h-10 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" 
                        viewBox="0 0 100 101" 
                        fill="none"
                    >
                        <path 
                            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" 
                            fill="currentColor"
                        />
                        <path 
                            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.3562C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446058 41.7345 1.27833C39.2613 1.69862 37.813 4.19832 38.4501 6.75778L39.7176 12.3289C40.3364 14.8532 43.1753 16.4081 45.4949 15.4477C50.564 13.3794 55.9189 12.4963 61.264 12.4963C70.0978 12.4963 78.6645 15.7174 84.8773 21.7375C91.0901 27.7576 94.6734 36.166 94.6734 45.0002C94.6734 53.8345 91.0901 62.2429 84.8773 68.263C78.6645 74.2831 70.0978 77.5042 61.264 77.5042C55.9189 77.5042 50.564 76.6211 45.4949 74.5528C43.1753 73.5924 40.3364 75.1473 39.7176 77.6716L38.4501 83.2427C37.813 85.8022 39.2613 88.3019 41.7345 88.7222C46.6976 89.5544 51.7666 89.6329 56.7698 88.9492C63.2754 88.0601 69.5422 85.8984 75.2124 82.5875C80.8826 79.2765 85.8452 74.8811 89.8167 69.6441C92.871 65.6311 95.2932 61.1776 97.0079 56.4464C97.8624 54.0887 96.393 51.5966 93.9676 50.9595L83.0659 47.2639C80.9298 46.5825 78.5466 47.8694 77.3452 49.7546C75.7717 52.1451 73.8348 54.276 71.6378 56.1262C68.4705 58.9018 64.5988 60.7923 60.4624 61.6672C55.0534 62.7819 49.5212 61.9193 44.5334 59.2182C39.5455 56.5171 35.4825 52.1054 33.0524 46.6954C30.6222 41.2855 30.0306 35.1354 31.3649 29.2467C32.6993 23.3581 35.8935 17.9732 40.4497 13.8479C44.4441 10.0954 49.3828 7.51891 54.7016 6.31889C57.0351 5.75007 58.2936 3.30244 57.4256 1.0568C56.5575 -1.18881 54.3929 -1.31384 52.0595 -0.745078C44.9629 0.878324 38.1717 4.08656 32.1809 8.73614C25.4995 13.7649 20.0678 20.1535 16.2479 27.4648C12.4281 34.7762 10.3395 42.7865 10.0446 50.9812C9.74974 59.1759 11.2548 67.292 14.4575 74.7913C17.6603 82.2906 22.4899 89.0208 28.5965 94.4997C34.7031 99.9786 41.9169 103.991 49.7474 106.269C57.7734 115.665C65.6039 118.104 73.7465 119.436 82.0325 119.107C90.3186 118.778 98.4409 116.322 105.887 112.009C113.334 107.697 119.904 101.728 124.987 94.5973C129.532 88.1622 132.514 81.0561 134.635 73.6419C135.757 69.4553 132.888 65.1742 128.588 64.4482L114.838 62.1946C110.538 61.4686 106.858 64.2823 105.345 68.2789C103.55 73.0078 100.849 77.4501 97.3005 81.3298C92.5993 86.4854 86.4759 90.1661 79.5882 91.9965C71.4519 94.0911 62.8592 93.1538 55.2433 89.3228C47.6275 85.4918 41.4409 79.0497 38.1116 71.1881C34.7824 63.3265 33.4862 54.4122 35.3583 45.8818C37.2305 37.3515 41.9796 29.6322 48.8369 24.0727C54.7008 19.1333 61.8763 16.1367 69.4575 15.1433C71.8504 14.8159 73.3476 12.2176 72.4733 9.96047C71.599 7.70334 69.4151 7.57342 67.0222 7.90078C56.1644 9.32006 45.8582 13.4639 36.9018 19.9622C27.0366 26.9432 19.0493 36.0642 13.6807 46.7123C8.31214 57.3604 5.68454 69.1601 6.0258 81.0701C6.36705 92.9801 9.67838 104.62 15.633 115.045C21.5876 125.47 29.9393 134.395 40.0373 141.12C50.1353 147.845 61.7298 152.174 73.7929 153.803C85.8561 155.432 98.1421 153.317 109.296 148.592C120.45 143.867 130.162 136.671 138.033 127.482C145.347 118.831 150.895 108.637 154.299 97.5681C156.171 91.5731 154.12 85.1189 148.853 82.1728L135.842 74.7739C130.575 71.8278 125.245 74.1292 122.797 79.2154C120.929 82.9325 118.575 86.4567 115.764 89.6578C111.355 94.657 105.732 98.7128 99.3744 101.474C91.4532 104.774 82.8054 105.804 74.4019 104.465C66.0164 103.128 58.0817 99.4708 51.3935 93.8127C44.7053 88.1546 39.4733 80.6642 36.1782 72.4239C32.883 64.1835 31.6048 55.3177 32.4296 46.5313C33.2544 37.7448 36.1581 29.2154 41.0067 21.7171C45.1619 15.1989 50.6023 9.38138 56.9792 4.68797C61.4739 1.40261 66.4014 -0.835761 71.5564 -2.27824C74.0847 -3.0602 75.0823 -5.87925 73.7396 -8.05759C72.3969 -10.2359 69.7965 -10.3576 67.2682 -9.57564C59.1946 -7.1972 51.4371 -3.28254 44.4162 1.86201C35.9072 7.91436 28.4616 15.5999 22.4633 24.4621C16.4649 33.3243 12.0165 43.1811 9.42881 53.5244C6.84114 63.8678 6.16511 74.4807 7.43847 84.9379C8.71183 95.3952 11.9142 105.47 16.8584 114.768C21.8026 124.067 28.3816 132.411 36.2652 139.353C44.1488 146.294 53.1739 151.666 62.9185 154.964C72.6631 158.261 82.9429 159.419 93.1133 158.369C103.284 157.319 113.132 154.082 122.133 148.855C130.474 143.896 137.939 137.321 144.181 129.501C150.022 122.121 154.603 113.759 157.683 104.853C159.498 99.4657 157.583 93.5801 152.784 90.9519L141.917 84.5414C137.118 81.9132 132.248 84.0183 130.089 88.5391C128.471 91.9232 126.403 95.1301 123.952 98.0769C120.027 102.461 115.26 106.149 109.934 108.864C103.767 111.84 97.0428 113.565 90.1477 113.958C83.2525 114.351 76.3214 113.304 69.7202 110.875C63.119 108.446 57.0144 104.697 51.6933 99.8745C46.3722 95.0521 41.9344 89.2556 38.5885 82.7578C35.2426 76.2601 33.0399 69.1511 32.0711 61.8203C31.1023 54.4895 31.384 47.0577 32.9021 39.8317C34.4202 32.6058 37.1537 25.7042 41.0067 19.438C44.2998 13.7913 48.3648 8.58924 53.0621 4.02403C56.4554 0.931402 60.164 -1.61681 64.1128 -3.71386C66.3149 -4.86014 66.8929 -7.81014 65.1442 -9.58282C63.3955 -11.3555 60.4557 -10.7996 58.2536 -9.65333C52.6471 -6.86866 47.3615 -3.26985 42.4872 0.869073C36.5906 6.05608 31.2741 12.092 26.7487 18.7768C21.7611 26.0043 17.9096 34.0583 15.4118 42.5424C12.9139 51.0264 11.8129 59.8203 12.1686 68.6142C12.5242 77.4081 14.3324 86.0869 17.5087 94.2551C20.685 102.423 25.1664 110.014 30.7385 116.739C36.3106 123.464 42.8902 129.23 50.2485 133.829C57.6068 138.428 65.6449 141.804 74.0698 143.848C82.4946 145.892 91.1597 146.578 99.7889 145.879C108.418 145.181 116.878 142.999 124.786 139.44C132.247 136.068 139.174 131.42 145.261 125.695C150.915 120.285 155.769 114.007 159.624 107.099C161.777 103.322 160.196 98.3297 156.262 96.3106L146.776 91.5483C142.841 89.5292 138.58 91.5213 136.777 95.1779C135.348 98.1497 133.554 100.967 131.43 103.582C128.223 107.451 124.299 110.829 119.854 113.464C114.574 116.451 108.782 118.39 102.778 119.133C96.7741 119.876 90.6644 119.412 84.8035 117.77C78.9427 116.127 73.4169 113.351 68.4475 109.584"
                        />
                    </svg>
                </div>
            }>
                <ElectoralMap
                    viewType={state.viewMode}
                    level={state.mapLevel}
                    onRegionSelect={handleRegionClick}
                />
            </Suspense>

            {/* Region Details */}
            {state.selectedRegion && regionData && (
                <div className="fixed bottom-0 left-0 right-0 bg-white shadow-lg rounded-t-xl p-6 z-50">
                    <div className="flex justify-between items-start mb-4">
                        <div>
                            <h2 className="text-2xl font-bold text-gray-900">
                                {regionData.region}
                            </h2>
                            <div className="flex items-center mt-2">
                                {regionData.resultsAvailable ? (
                                    <CheckCircleIcon className="h-6 w-6 text-green-500 mr-2" />
                                ) : (
                                    <InformationCircleIcon className="h-6 w-6 text-yellow-500 mr-2" />
                                )}
                                <span className={`text-sm font-medium ${
                                    regionData.resultsAvailable 
                                        ? 'text-green-600' 
                                        : 'text-yellow-600'
                                }`}>
                                    {regionData.resultsAvailable 
                                        ? 'Résultats disponibles' 
                                        : 'En attente'}
                                </span>
                            </div>
                        </div>
                        <button 
                            onClick={() => handleRegionClick(null)}
                            className="text-gray-600 hover:text-gray-900"
                        >
                            <XCircleIcon className="h-6 w-6" />
                        </button>
                    </div>

                    {/* Statistics Grid */}
                    <div className="grid grid-cols-2 gap-4 mb-4">
                        <div className="bg-gray-100 p-4 rounded-lg">
                            <span className="block text-sm text-gray-600 mb-1">
                                Participation
                            </span>
                            <span className="text-2xl font-bold text-blue-600">
                                {regionData.participation}%
                            </span>
                        </div>
                        <div className="bg-gray-100 p-4 rounded-lg">
                            <span className="block text-sm text-gray-600 mb-1">
                                Électeurs inscrits
                            </span>
                            <span className="text-2xl font-bold text-blue-600">
                                {regionData.registeredVoters.toLocaleString()}
                            </span>
                        </div>
                    </div>

                    {/* Results Section */}
                    {regionData.resultsAvailable && regionData.results && (
                        <div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-3">
                                Résultats
                            </h3>
                            <div className="space-y-3">
                                {regionData.results.map((result, index) => (
                                    <div 
                                        key={index} 
                                        className="flex justify-between items-center bg-gray-100 p-3 rounded-lg"
                                    >
                                        <div>
                                            <h4 className="font-medium text-gray-900">
                                                {result.candidate}
                                            </h4>
                                            <p className="text-sm text-gray-600">
                                                {result.party}
                                            </p>
                                        </div>
                                        <div className="text-right">
                                            <span 
                                                className={`text-sm font-semibold ${
                                                    getImportanceColor(
                                                        index === 0 ? 'high' : 
                                                        index === 1 ? 'medium' : 'low'
                                                    )
                                                } px-2 py-1 rounded`}
                                            >
                                                {result.percentage}%
                                            </span>
                                            <div className="text-sm text-gray-600">
                                                {result.votes.toLocaleString()} votes
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default ElectoralMapPage;