import React from 'react';
import { Route } from '../types/route';
import { MainLayout } from '../components/layout/MainLayout';
import {
  Dashboard as DashboardIcon,
  People as PeopleIcon,
  Settings as SettingsIcon,
} from '@mui/icons-material';

const Login = React.lazy(() => import('../pages/Login'));
const Dashboard = React.lazy(() => import('../pages/Dashboard'));
const Users = React.lazy(() => import('../pages/Users'));
const UserDetails = React.lazy(() => import('../pages/UserDetails'));
const Settings = React.lazy(() => import('../pages/Settings'));

export const routes: Route[] = [
  {
    path: '/login',
    component: Login,
    meta: {
      hideInMenu: true,
    },
  },
  {
    path: '/',
    component: MainLayout,
    children: [
      {
        path: '/',
        component: Dashboard,
        exact: true,
        meta: {
          title: 'Дашборд',
          icon: DashboardIcon,
        },
      },
      {
        path: '/users',
        component: Users,
        roles: ['admin'],
        meta: {
          title: 'Пользователи',
          icon: PeopleIcon,
        },
      },
      {
        path: '/users/:id',
        component: UserDetails,
        meta: {
          title: 'Детали пользователя',
          hideInMenu: true,
        },
      },
      {
        path: '/settings',
        component: Settings,
        meta: {
          title: 'Настройки',
          icon: SettingsIcon,
        },
      },
    ],
  },
]; 