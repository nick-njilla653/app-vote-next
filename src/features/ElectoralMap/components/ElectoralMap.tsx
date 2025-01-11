'use client';

import React, { useState, useEffect, useCallback, useRef, forwardRef, useImperativeHandle } from 'react';
import { MapContainer, TileLayer, GeoJSON, useMap } from 'react-leaflet';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from "@/lib/utils/mapUtils";
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import {
  ChartBarIcon,
  UserGroupIcon,
  InformationCircleIcon,
  XMarkIcon,
  ChevronLeftIcon
} from '@heroicons/react/24/outline';
import {
  getParticipationColor,
  getResultsColor,
  calculateBounds,
  formatNumber
} from '@/lib/utils/mapUtils';
import type { Feature, Geometry } from 'geojson';
import type {
  ElectoralMapProps,
  ElectoralMapRef,
  EnrichedGeoJSON,
  EnrichedFeature,
  EnrichedProperties
} from '@/features/ElectoralMap/types/electoral-map.types';
import { GeoDataService } from '@/lib/services/GeoDataService';
import type { Map as LeafletMap, PathOptions, Layer, LeafletMouseEvent, LatLngBounds, StyleFunction } from 'leaflet';
import dynamic from 'next/dynamic';
import { Position } from 'geojson';


// Définition des styles par défaut
const defaultStyle: PathOptions = {
  fillColor: '#e0e0e0',
  weight: 1,
  opacity: 1,
  color: '#666',
  dashArray: '',
  fillOpacity: 0.7
};

interface NavigationItem {
  id: string;
  name: string;
  level: string;
  feature: EnrichedFeature;
}

// Composant de la carte électorale
const ElectoralMapComponent = forwardRef<ElectoralMapRef, ElectoralMapProps>(({
  viewType,
  level,
  onRegionSelect,
  selectedRegion,
}, ref) => {
  const [selectedArea, setSelectedArea] = useState<EnrichedFeature | null>(null);
  const [navigationHistory, setNavigationHistory] = useState<NavigationItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [geoData, setGeoData] = useState<EnrichedGeoJSON | null>(null);
  const [error, setError] = useState<string | null>(null);
  const mapRef = useRef<LeafletMap | null>(null);
  const geoService = GeoDataService.getInstance();


  // Utilitaires
  const getBoundsFromFeature = useCallback((feature: EnrichedFeature): L.LatLngBounds => {
    if (feature.geometry.type === 'Polygon') {
      const coordinates = feature.geometry.coordinates[0] as Position[];
      return new L.LatLngBounds(
        coordinates.map(coord => [coord[1], coord[0]] as [number, number])
      );
    } else if (feature.geometry.type === 'MultiPolygon') {
      const bounds = new L.LatLngBounds([]);
      feature.geometry.coordinates.forEach((polygon) => {
        const coords = polygon[0] as Position[];
        coords.forEach(coord => {
          bounds.extend([coord[1], coord[0]]);
        });
      });
      return bounds;
    }
    return new L.LatLngBounds([2.0, 8.0], [13.0, 16.0]);
  }, []);

  const zoomToFeature = useCallback((feature: EnrichedFeature) => {
    if (mapRef.current && feature.geometry) {
      const bounds = getBoundsFromFeature(feature);
      mapRef.current.fitBounds(bounds);
    }
  }, [getBoundsFromFeature]);

  // Gestion des données
  const loadGeoData = useCallback(async (level: string, parentId?: string) => {
    setLoading(true);
    try {
      const data = await geoService.getGeoData(
        level as 'region' | 'department' | 'district',
        parentId
      );
      setGeoData(data);
    } catch (error) {
      console.error('Error loading geo data:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  // Gestionnaires d'événements

  const findFeatureById = useCallback((id: string): EnrichedFeature | undefined => {
    return geoData?.features.find(f => f.properties.id === id);
  }, [geoData]);

  const handleNavigate = useCallback((navItem: NavigationItem) => {
    const feature = findFeatureById(navItem.id) || navItem.feature;
    if (!feature) {
      console.error('Feature not found');
      return;
    }

    setSelectedArea(feature);
    const newHistory = navigationHistory.slice(
      0,
      navigationHistory.findIndex(h => h.id === navItem.id) + 1
    );
    setNavigationHistory(newHistory);
    zoomToFeature(feature);

    if (navItem.level !== 'district') {
      const nextLevel = navItem.level === 'region' ? 'department' : 'district';
      loadGeoData(nextLevel, navItem.id);
    }
  }, [navigationHistory, loadGeoData, zoomToFeature, findFeatureById]);

  const handleAreaSelection = useCallback((feature: EnrichedFeature) => {
    setSelectedArea(feature);
    const newHistoryItem: NavigationItem = {
      id: feature.properties.id,
      name: feature.properties.name,
      level: feature.properties.level,
      feature: feature
    };
    setNavigationHistory(prev => [...prev, newHistoryItem]);
    onRegionSelect?.(feature.properties.id);

    if (feature.properties.level !== 'district') {
      const nextLevel = feature.properties.level === 'region' ? 'department' : 'district';
      loadGeoData(nextLevel, feature.properties.id);
    }

    zoomToFeature(feature);
  }, [loadGeoData, onRegionSelect, zoomToFeature]);

  const handleGoBack = useCallback(() => {
    if (navigationHistory.length > 1) {
      const prevItem = navigationHistory[navigationHistory.length - 2];
      handleNavigate(prevItem);
    }
  }, [navigationHistory, handleNavigate]);

  // Styles des features
  const getFeatureStyle = useCallback((feature?: EnrichedFeature): PathOptions => {
    if (!feature?.properties) {
      return defaultStyle;
    }

    const { properties } = feature;
    const isSelected = properties.id === selectedArea?.properties?.id;

    return {
      fillColor: viewType === 'participation'
        ? getParticipationColor(properties.participation)
        : viewType === 'results'
          ? getResultsColor(properties.results)
          : '#e0e0e0',
      weight: isSelected ? 3 : 1,
      opacity: 1,
      color: isSelected ? '#000' : '#666',
      dashArray: '',
      fillOpacity: 0.7
    };
  }, [viewType, selectedArea]);

  // Gestion des features
  const onEachFeature = useCallback((feature: EnrichedFeature, layer: Layer) => {
    if (!feature.properties) return;

    layer.on({
      mouseover: (e: LeafletMouseEvent) => {
        const layer = e.target;
        layer.setStyle({
          weight: 2,
          dashArray: '',
          fillOpacity: 0.9,
        });
      },
      mouseout: (e: LeafletMouseEvent) => {
        if (feature.properties.id !== selectedArea?.properties.id) {
          const layer = e.target;
          layer.setStyle(getFeatureStyle(feature));
        }
      },
      click: () => handleAreaSelection(feature)
    });
  }, [selectedArea, getFeatureStyle, handleAreaSelection]);

  // Effets
  useEffect(() => {
    loadGeoData(level);
  }, [level, loadGeoData]);

  useEffect(() => {
    const loadData = async () => {
      try {
        console.log('Chargement des données...');
        const data = await geoService.getGeoData('region');
        console.log('Données chargées:', data);
        setGeoData(data);
      } catch (err) {
        console.error('Erreur de chargement:', err);
        setError(err instanceof Error ? err.message : 'Erreur inconnue');
      }
    };

    loadData();
  }, []);

  // Afficher l'état du chargement
  useEffect(() => {
    if (geoData) {
      console.log('Nombre de features:', geoData.features.length);
      geoData.features.forEach((feature, index) => {
        console.log(`Feature ${index}:`, {
          id: feature.properties.id,
          name: feature.properties.name,
          level: feature.properties.level
        });
      });
    }
  }, [geoData]);

  useImperativeHandle(ref, () => ({
    zoomToRegion: (regionId: string) => {
      const feature = geoData?.features.find(f => f.properties.id === regionId);
      if (feature) {
        zoomToFeature(feature);
      }
    },
    refreshData: async () => {
      await loadGeoData(level);
    },
    getCurrentView: () => ({
      center: mapRef.current ?
        [mapRef.current.getCenter().lat, mapRef.current.getCenter().lng] as [number, number] :
        [7.3697, 12.3547] as [number, number],
      zoom: mapRef.current?.getZoom() || 6,
      bounds: mapRef.current ?
        [
          [mapRef.current.getBounds().getSouth(), mapRef.current.getBounds().getWest()],
          [mapRef.current.getBounds().getNorth(), mapRef.current.getBounds().getEast()]
        ] as [[number, number], [number, number]] :
        [[0, 0], [0, 0]] as [[number, number], [number, number]]
    }),
    exportMapImage: async () => {
      if (!mapRef.current) return new Blob();
      const canvas = document.createElement('canvas');
      return new Promise(resolve => {
        canvas.toBlob(blob => resolve(blob || new Blob()));
      });
    }
  }), [level, loadGeoData, zoomToFeature, geoData]);

  const MapController = () => {
    const map = useMap();

    useEffect(() => {
      mapRef.current = map;
    }, [map]);

    return null;
  };

  return (
    <div className="relative w-full h-full min-h-[500px]" data-testid="electoral-map">
      {/* Navigation Breadcrumbs */}
      <div className="absolute top-4 left-4 right-4 z-10 flex items-center space-x-2 bg-white rounded-lg shadow p-2">
        {navigationHistory.length > 0 && (
          <ChevronLeftIcon
            className="h-6 w-6 cursor-pointer text-gray-600 hover:text-gray-900"
            onClick={handleGoBack}
          />
        )}
        <div className="flex-1">
          {navigationHistory.map((item, index) => (
            <button
              key={item.id}
              onClick={() => handleNavigate(item)}
              className="text-sm text-gray-600 hover:text-gray-900 mr-2"
            >
              {item.name} {index < navigationHistory.length - 1 && (
                <span className="mx-2 text-gray-400">&gt;</span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Map Container */}
      <div className="w-full h-full">
        {loading ? (
          <div className="flex items-center justify-center h-full bg-gray-100">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900" />
          </div>
        ) : (
          <MapContainer
            center={[7.3697, 12.3547]}
            zoom={6}
            style={{ height: "100%", width: "100%" }}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            />
            {geoData && (
              <GeoJSON
                key={`${viewType}-${geoData.name}`}
                data={geoData}
                style={getFeatureStyle}
                onEachFeature={onEachFeature}
              />
            )}
            <MapController />
          </MapContainer>
        )}
      </div>

      {/* Selected Area Details */}
      {selectedArea && (
        <Card className="absolute bottom-4 left-4 right-4 bg-white shadow-lg">
          <CardContent className="p-4">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-lg font-semibold">{selectedArea.properties.name}</h3>
                <span className="inline-block px-2 py-1 text-sm bg-blue-100 text-blue-800 rounded">
                  {selectedArea.properties.level}
                </span>
              </div>
              <button
                onClick={() => setSelectedArea(null)}
                className="p-1 hover:bg-gray-100 rounded-full"
              >
                <XMarkIcon className="h-6 w-6 text-gray-500 hover:text-gray-700" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="bg-gray-50 p-3 rounded">
                <div className="flex items-center text-sm text-gray-600 mb-1">
                  <UserGroupIcon className="h-5 w-5 mr-2" />
                  Électeurs inscrits
                </div>
                <span className="text-lg font-semibold">
                  {formatNumber(selectedArea.properties.totalVoters)}
                </span>
              </div>
              <div className="bg-gray-50 p-3 rounded">
                <div className="flex items-center text-sm text-gray-600 mb-1">
                  <ChartBarIcon className="h-5 w-5 mr-2" />
                  Participation
                </div>
                <span className="text-lg font-semibold">
                  {selectedArea.properties.participation.toFixed(1)}%
                </span>
              </div>
            </div>

            {viewType === 'results' && selectedArea.properties.results && (
              <div className="space-y-3">
                {selectedArea.properties.results.map(result => (
                  <div key={result.partyId} className="flex justify-between items-center bg-gray-50 p-3 rounded">
                    <div>
                      <div className="font-medium">{result.partyName}</div>
                      <div className="text-sm text-gray-600">
                        {formatNumber(result.votes)} votes
                      </div>
                    </div>
                    <div className="text-lg font-semibold text-blue-600">
                      {result.percentage.toFixed(1)}%
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
});

ElectoralMapComponent.displayName = 'ElectoralMapComponent';

// Export avec dynamic import pour le côté client uniquement
export default dynamic(() => Promise.resolve(ElectoralMapComponent), {
  ssr: false,
});