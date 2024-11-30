import { makeAutoObservable } from 'mobx';
import { RootStore } from './rootStore';
import { BreadcrumbItem, Route } from '../types/route';
import { routes } from '../routes';

export class UIStore {
  theme: 'light' | 'dark' = 'light';
  sidebarOpen: boolean = true;
  activeModule: string | null = null;

  constructor(private rootStore: RootStore) {
    makeAutoObservable(this);
    
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      this.theme = savedTheme as 'light' | 'dark';
    }
  }

  toggleTheme = () => {
    this.theme = this.theme === 'light' ? 'dark' : 'light';
    localStorage.setItem('theme', this.theme);
  };

  toggleSidebar = () => {
    this.sidebarOpen = !this.sidebarOpen;
  };

  setActiveModule = (module: string) => {
    this.activeModule = module;
  };

  getBreadcrumbs = (pathname: string): BreadcrumbItem[] => {
    const paths = pathname.split('/').filter(Boolean);
    const breadcrumbs: BreadcrumbItem[] = [
      { title: 'Главная', path: '/' }
    ];

    let currentPath = '';
    paths.forEach(path => {
      currentPath += `/${path}`;
      const route = this.findRoute(currentPath);
      if (route?.meta?.title) {
        breadcrumbs.push({
          title: route.meta.title,
          path: currentPath,
          icon: route.meta.icon,
        });
      }
    });

    return breadcrumbs;
  };

  private findRoute = (path: string) => {
    const findInRoutes = (routes: Route[], targetPath: string): Route | undefined => {
      for (const route of routes) {
        if (route.path === targetPath) {
          return route;
        }
        if (route.children) {
          const found = findInRoutes(route.children, targetPath);
          if (found) return found;
        }
      }
    };

    return findInRoutes(routes, path);
  };
} 