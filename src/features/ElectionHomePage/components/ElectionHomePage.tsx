// src/features/ElectionHomePage/components/ElectionHomePage.tsx
'use client';

import React from 'react';
import Link from 'next/link';
import { 
  ArrowRightIcon, 
  MapIcon, 
  UsersIcon, 
  CalendarIcon, 
  InformationCircleIcon,
  BellIcon 
} from '@heroicons/react/24/outline';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

import { useElectionData, useRefreshData } from '../hooks/useElectionData';

const ElectionHomePage: React.FC = () => {
  const { 
    newsItems, 
    electionStats, 
    guideItems, 
    mainFeatures, 
    searchText, 
    setSearchText 
  } = useElectionData();
  const { isRefreshing, handleRefresh } = useRefreshData();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-16">
          <h1 className="text-2xl font-bold text-gray-900">ELECAM 2024</h1>
          <button className="text-gray-600 hover:text-gray-900">
            <BellIcon className="h-6 w-6" />
          </button>
        </div>
      </header>

      {/* Refresh Functionality */}
      {isRefreshing && (
        <div className="text-center py-2 bg-blue-100 text-blue-800">
          Actualisation en cours...
        </div>
      )}

      {/* Welcome Section */}
      <section className="bg-gradient-to-r from-blue-500 to-purple-600 text-white py-12 px-4 text-center">
        <h2 className="text-3xl font-extrabold mb-4">Bienvenue sur ELECAM</h2>
        <p className="text-xl">Votre guide pour les élections présidentielles 2024</p>
      </section>

      {/* Main Features Carousel */}
      <section className="py-8 px-4">
        <Swiper
          modules={[Autoplay, Pagination]}
          pagination={{ clickable: true }}
          autoplay={{
            delay: 4000,
            disableOnInteraction: false,
          }}
          className="feature-carousel"
        >
          {mainFeatures.map((feature, index) => (
            <SwiperSlide key={index}>
              <Link href={feature.path} className="block">
                <div 
                  className="bg-white rounded-lg shadow-md p-6 mx-4 cursor-pointer transform transition-transform hover:scale-105"
                  style={{ background: feature.gradient }}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      {feature.icon === MapIcon && <MapIcon className="h-10 w-10 text-white" />}
                      {feature.icon === UsersIcon && <UsersIcon className="h-10 w-10 text-white" />}
                      {feature.icon === CalendarIcon && <CalendarIcon className="h-10 w-10 text-white" />}
                      <h3 className="text-xl font-bold text-white mt-4">{feature.title}</h3>
                      <p className="text-white opacity-80">{feature.description}</p>
                    </div>
                    <ArrowRightIcon className="h-6 w-6 text-white" />
                  </div>
                </div>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>

      {/* News Section */}
      <section className="py-8 px-4 max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Dernières Actualités</h2>
          <input
            type="text"
            placeholder="Rechercher..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="space-y-4">
          {newsItems.map((item) => (
            <div 
              key={item.id} 
              className="bg-white rounded-lg shadow-md p-4 hover:bg-gray-50 transition-colors"
            >
              <h3 className="text-lg font-semibold text-gray-900">{item.title}</h3>
              <p className="text-gray-600">{item.description}</p>
              <div className="mt-2 flex space-x-2">
                <span className="text-sm text-gray-500">{item.date}</span>
                <span className="text-sm bg-blue-100 text-blue-800 px-2 rounded-full">
                  {item.category}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Election Statistics */}
      <section className="bg-white py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl font-bold text-center mb-8 text-gray-900">
            Statistiques des Inscriptions
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {Object.entries(electionStats).map(([key, value], index) => (
              <div 
                key={index} 
                className="bg-gray-100 rounded-lg p-6 text-center hover:shadow-md transition-shadow"
              >
                <h3 className="text-3xl font-bold text-blue-600">
                  {value.toLocaleString()}
                </h3>
                <p className="text-gray-600 mt-2">
                  {key.replace(/([A-Z])/g, ' $1').trim()}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Voter Guide */}
      <section className="py-12 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl font-bold text-center mb-8 text-gray-900">
            Guide de l'électeur
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {guideItems.map((item, index) => (
              <Link 
                href={`/guide/${index + 1}`} 
                key={index}
                className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow group"
              >
                <div className="flex items-center justify-between mb-4">
                  {item.icon === UsersIcon && <UsersIcon className="h-10 w-10 text-blue-500" />}
                  {item.icon === CalendarIcon && <CalendarIcon className="h-10 w-10 text-blue-500" />}
                  {item.icon === InformationCircleIcon && <InformationCircleIcon className="h-10 w-10 text-blue-500" />}
                  <ArrowRightIcon className="h-6 w-6 text-gray-400 group-hover:translate-x-1 transition-transform" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Help Section */}
      <section className="py-12 px-4 bg-white">
        <Link href="/help" className="block max-w-md mx-auto">
          <div className="bg-blue-100 rounded-lg p-6 text-center hover:bg-blue-200 transition-colors group">
            <InformationCircleIcon className="h-12 w-12 mx-auto text-blue-600 mb-4" />
            <h3 className="text-xl font-bold text-gray-900 mb-2">Besoin d'aide ?</h3>
            <p className="text-gray-700">
              Consultez notre guide complet ou contactez-nous
            </p>
          </div>
        </Link>
      </section>
    </div>
  );
};

export default ElectionHomePage;