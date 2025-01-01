// src/features/ElectionHomePage/types/home.ts
import { ForwardRefExoticComponent, SVGProps, RefAttributes } from 'react';

export interface GuideItem {
  icon: ForwardRefExoticComponent<Omit<SVGProps<SVGSVGElement>, "ref"> & { title?: string; titleId?: string; } & RefAttributes<SVGSVGElement>>;
  title: string;
  description: string;
}

// Rest of the existing types remain the same
export interface NewsItem {
  id: number;
  title: string;
  description: string;
  date: string;
  category: string;
}

export interface ElectionStats {
  totalRegistered: number;
  totalCenters: number;
  activeObservers: number;
  completedRegistrations: number;
}

export interface MainFeature {
  title: string;
  description: string;
  icon: ForwardRefExoticComponent<Omit<SVGProps<SVGSVGElement>, "ref"> & { title?: string; titleId?: string; } & RefAttributes<SVGSVGElement>>;
  path: string;
  gradient: string;
  animation: string;
}