import { ComponentType } from 'react';

export interface Route {
  path: string;
  component: ComponentType;
  layout?: ComponentType;
  exact?: boolean;
  roles?: string[];
  children?: Route[];
  meta?: {
    title?: string;
    icon?: ComponentType;
    hideInMenu?: boolean;
  };
}

export interface BreadcrumbItem {
  title: string;
  path: string;
  icon?: ComponentType;
} 