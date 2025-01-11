// types/electoral-map.types.ts
import type { Feature, Geometry, FeatureCollection } from 'geojson';

export interface ElectoralMapProps {
  viewType: 'general' | 'participation' | 'results';
  level: 'region' | 'department' | 'district';
  onRegionSelect?: (region: string) => void;
  selectedRegion?: string;
  theme?: 'light' | 'dark';
  showControls?: boolean;
  initialCenter?: [number, number];
  initialZoom?: number;
}

export interface ElectionResults {
  partyId: string;
  partyName: string;
  votes: number;
  percentage: number;
}

export interface EnrichedProperties {
  id: string;
  name: string;
  level: 'region' | 'department' | 'district';
  parentId?: string;
  parentName?: string;
  totalVoters: number;
  participation: number;
  results: ElectionResults[];
}

export interface RegionProperties {
  GID_1: string;
  GID_0: string;
  COUNTRY: string;
  NAME_1: string;
  VARNAME_1: string;
  NL_NAME_1: string;
  TYPE_1: string;
  ENGTYPE_1: string;
  CC_1: string;
  HASC_1: string;
  ISO_1: string;
}

export interface DepartmentProperties {
  GID_2: string;
  GID_0: string;
  COUNTRY: string;
  GID_1: string;
  NAME_1: string;
  NL_NAME_1: string;
  NAME_2: string;
  VARNAME_2: string;
  NL_NAME_2: string;
  TYPE_2: string;
  ENGTYPE_2: string;
  CC_2: string;
  HASC_2: string;
}

export interface DistrictProperties {
  GID_1: string;
  GID_0: string;
  COUNTRY: string;
  GID_2: string;
  GID_3: string;
  NAME_1: string;
  NL_NAME_1: string;
  NAME_2: string;
  NL_NAME_2: string;
  NAME_3: string;
  VARNAME_3: string;
  NL_NAME_3: string;
  TYPE_3: string;
  ENGTYPE_3: string;
  CC_3: string;
  HASC_3: string;
}

export interface CameroonGeoJSON<T> {
  type: 'FeatureCollection';
  name: string;
  crs?: {
    type: string;
    properties: Record<string, any>;
  };
  features: Feature<Geometry, T>[];
}

export type EnrichedFeature = Feature<Geometry, EnrichedProperties>;

export interface EnrichedGeoJSON extends Omit<CameroonGeoJSON<EnrichedProperties>, 'features'> {
  features: Feature<Geometry, EnrichedProperties>[];
}

export interface GeoJSON<T> {
  type: "FeatureCollection";
  features: GeoFeature<T>[];
}
export interface GeoFeature<T> {
  type: "Feature";
  properties: T;
  geometry: {
    type: "MultiPolygon";
    coordinates: number[][][][];
  };
}

export interface RegionStats {
  totalVoters: number;
  averageParticipation: number;
  votingStations: number;
  participationTrend?: ParticipationTrend[];
  partyDistribution?: PartyDistribution[];
}

export interface ParticipationTrend {
  hour: string;
  participation: number;
}

export interface PartyDistribution {
  partyId: string;
  partyName: string;
  votes: number;
  percentage: number;
  color: string;
}

export interface ElectoralMapRef {
  zoomToRegion: (regionId: string) => void;
  refreshData: () => Promise<void>;
  getCurrentView: () => {
    center: [number, number];
    zoom: number;
    bounds: [[number, number], [number, number]];
  };
  exportMapImage: () => Promise<Blob>;
}