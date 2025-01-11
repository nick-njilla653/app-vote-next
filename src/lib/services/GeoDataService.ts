// lib/services/GeoDataService.ts

import { regionsData } from '@/GeoLocalisation/gadm41_CMR_1';
import { departmentsData } from '@/GeoLocalisation/gadm41_CMR_2';
import { districtsData } from '@/GeoLocalisation/gadm41_CMR_3';

import {
  type CameroonGeoJSON,
  type RegionProperties,
  type DepartmentProperties,
  type DistrictProperties,
  type EnrichedGeoJSON,
  type EnrichedProperties
} from '@/features/ElectoralMap/types/electoral-map.types';

export class GeoDataService {
  private static instance: GeoDataService;
  private regionsGeoJSON: CameroonGeoJSON<RegionProperties>;
  private departmentsGeoJSON: CameroonGeoJSON<DepartmentProperties>;
  private districtsGeoJSON: CameroonGeoJSON<DistrictProperties>;

  private constructor() {
    console.log('Initialisation de GeoDataService');
    console.log('regionsData:', regionsData);

    this.regionsGeoJSON = regionsData as CameroonGeoJSON<RegionProperties>;
    this.departmentsGeoJSON = departmentsData as CameroonGeoJSON<DepartmentProperties>;
    this.districtsGeoJSON = districtsData as CameroonGeoJSON<DistrictProperties>;

    // Vérification des données chargées
    console.log('Nombre de régions:', this.regionsGeoJSON?.features?.length);
    console.log('Nombre de départements:', this.departmentsGeoJSON?.features?.length);
    console.log('Nombre de districts:', this.districtsGeoJSON?.features?.length);
  }

  public static getInstance(): GeoDataService {
    if (!GeoDataService.instance) {
      GeoDataService.instance = new GeoDataService();
    }
    return GeoDataService.instance;
  }

  public async getGeoData(
    level: 'region' | 'department' | 'district',
    parentId?: string
  ): Promise<EnrichedGeoJSON> {
    console.log(`Chargement des données pour le niveau: ${level}, parentId: ${parentId}`);

    try {
      let result: EnrichedGeoJSON;
      switch (level) {
        case 'region':
          result = this.enrichRegionsData();
          break;
        case 'department':
          result = this.enrichDepartmentsData(parentId);
          break;
        case 'district':
          result = this.enrichDistrictsData(parentId);
          break;
        default:
          throw new Error('Invalid geographic level');
      }

      console.log(`Données chargées pour ${level}:`, {
        nombre_features: result.features.length,
        premier_feature: result.features[0]?.properties
      });

      return result;
    } catch (error) {
      console.error('Erreur lors du chargement des données:', error);
      throw error;
    }
  }

  private enrichRegionsData(): EnrichedGeoJSON {
    return {
      type: 'FeatureCollection',
      name: 'regions',
      features: this.regionsGeoJSON.features.map(feature => ({
        type: 'Feature',
        geometry: feature.geometry,
        properties: {
          id: feature.properties.GID_1,
          name: feature.properties.NAME_1,
          level: 'region',
          totalVoters: this.generateRandomVoters(10000, 100000),
          participation: this.generateRandomParticipation(),
          results: this.generateMockResults()
        }
      }))
    };
  }

  private enrichDepartmentsData(regionId?: string): EnrichedGeoJSON {
    let features = this.departmentsGeoJSON.features;
    if (regionId) {
      features = features.filter(f => f.properties.GID_1 === regionId);
    }

    return {
      type: 'FeatureCollection',
      name: 'departments',
      features: features.map(feature => ({
        type: 'Feature',
        geometry: feature.geometry,
        properties: {
          id: feature.properties.GID_2,
          name: feature.properties.NAME_2,
          level: 'department',
          parentId: feature.properties.GID_1,
          parentName: feature.properties.NAME_1,
          totalVoters: this.generateRandomVoters(5000, 50000),
          participation: this.generateRandomParticipation(),
          results: this.generateMockResults()
        }
      }))
    };
  }

  private enrichDistrictsData(departmentId?: string): EnrichedGeoJSON {
    let features = this.districtsGeoJSON.features;
    if (departmentId) {
      features = features.filter(f => f.properties.GID_2 === departmentId);
    }

    return {
      type: 'FeatureCollection',
      name: 'districts',
      features: features.map(feature => ({
        type: 'Feature',
        geometry: feature.geometry,
        properties: {
          id: feature.properties.GID_3,
          name: feature.properties.NAME_3,
          level: 'district',
          parentId: feature.properties.GID_2,
          parentName: feature.properties.NAME_2,
          totalVoters: this.generateRandomVoters(1000, 10000),
          participation: this.generateRandomParticipation(),
          results: this.generateMockResults()
        }
      }))
    };
  }

  private generateRandomVoters(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min)) + min;
  }

  private generateRandomParticipation(): number {
    return Math.random() * 100;
  }

  private generateMockResults() {
    const total = Math.floor(Math.random() * 10000);
    const firstPartyPercentage = 40 + Math.random() * 20;
    const secondPartyPercentage = 100 - firstPartyPercentage;

    return [
      {
        partyId: 'party1',
        partyName: 'Parti A',
        votes: Math.floor(total * (firstPartyPercentage / 100)),
        percentage: firstPartyPercentage
      },
      {
        partyId: 'party2',
        partyName: 'Parti B',
        votes: Math.floor(total * (secondPartyPercentage / 100)),
        percentage: secondPartyPercentage
      }
    ];
  }

  public async searchByQuery(query: string, level: 'region' | 'department' | 'district') {
    const lowercaseQuery = query.toLowerCase();

    interface SearchResult {
      id: string;
      name: string;
      type: 'region' | 'department' | 'district';
      coordinates: [number, number];
    }

    let results: SearchResult[] = [];


    switch (level) {
      case 'region': {
        const regionResults = this.regionsGeoJSON.features.filter(f =>
          f.properties.NAME_1.toLowerCase().includes(lowercaseQuery)
        );
        results = regionResults.map(f => ({
          id: f.properties.GID_1,
          name: f.properties.NAME_1,
          type: 'region',
          coordinates: this.getFeatureCenter(f)
        }));
        break;
      }

      case 'department': {
        const deptResults = this.departmentsGeoJSON.features.filter(f =>
          f.properties.NAME_2.toLowerCase().includes(lowercaseQuery)
        );
        results = deptResults.map(f => ({
          id: f.properties.GID_2,
          name: f.properties.NAME_2,
          type: 'department',
          coordinates: this.getFeatureCenter(f)
        }));
        break;
      }

      case 'district': {
        const districtResults = this.districtsGeoJSON.features.filter(f =>
          f.properties.NAME_3.toLowerCase().includes(lowercaseQuery)
        );
        results = districtResults.map(f => ({
          id: f.properties.GID_3,
          name: f.properties.NAME_3,
          type: 'district',
          coordinates: this.getFeatureCenter(f)
        }));
        break;
      }

    }

    return results;
  }

  private getFeatureCenter(feature: GeoJSON.Feature): [number, number] {
    // Implémentation simplifiée du calcul du centre
    return [0, 0];
  }
}