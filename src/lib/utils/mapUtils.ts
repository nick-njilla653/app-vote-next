// lib/utils/mapUtils.ts
import { LatLngBounds, LatLng } from 'leaflet';
import type { Feature, Geometry, Position, Polygon, MultiPolygon } from 'geojson';
import type { ElectionResults } from '@/features/ElectoralMap/types/electoral-map.types';
import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getParticipationColor = (participation: number): string => {
  if (!participation) return '#e0e0e0';
  if (participation >= 80) return '#1a9850';
  if (participation >= 60) return '#91cf60';
  if (participation >= 40) return '#d9ef8b';
  if (participation >= 20) return '#fee08b';
  return '#d73027';
};

export const getResultsColor = (results: ElectionResults[]): string => {
  if (!results?.length) return '#e0e0e0';
  
  const winner = results.reduce((prev, current) => 
    prev.percentage > current.percentage ? prev : current
  );

  const partyColors: Record<string, string> = {
    party1: '#2166ac',
    party2: '#d73027',
    party3: '#1a9850'
  };

  return partyColors[winner.partyId] || '#e0e0e0';
};

type FeatureWithGeometry = Feature<Polygon | MultiPolygon>;

export const calculateBounds = (features: FeatureWithGeometry[]): LatLngBounds => {
  const bounds = new LatLngBounds([0, 0], [0, 0]);
  
  features.forEach(feature => {
    if (feature.geometry.type === 'Polygon') {
      const coordinates = feature.geometry.coordinates[0];
      coordinates.forEach((coord: Position) => {
        bounds.extend([coord[1], coord[0]]);
      });
    } else if (feature.geometry.type === 'MultiPolygon') {
      feature.geometry.coordinates.forEach((polygon: Position[][]) => {
        polygon[0].forEach((coord: Position) => {
          bounds.extend([coord[1], coord[0]]);
        });
      });
    }
  });
  
  return bounds;
};

export const formatNumber = (num: number): string => {
  return new Intl.NumberFormat('fr-FR').format(num);
};

interface FeatureWithParticipation extends Feature {
  properties: {
    participation: number;
  };
}

export const calculateStats = (features: FeatureWithParticipation[]) => {
  const participations = features
    .map(f => f.properties.participation)
    .filter(Boolean);
  
  return {
    average: participations.reduce((a, b) => a + b, 0) / participations.length,
    highest: Math.max(...participations),
    lowest: Math.min(...participations),
    total: features.length
  };
};