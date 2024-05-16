

import type { SideNavItem } from './types';



export const SIDENAV_ITEMS: SideNavItem[] = [
  {
    title: 'Home',
    path: '/',

  },
  {
    title: 'Requests',
    path: '/pages/requests',
  },
  {
    title: 'Activites',
    path: '/pages/activites',
  },
  {
    title: 'Settings',
    path: '/settings',
    submenu: true,
    subMenuItems: [
      { title: 'Account', path: '/settings/account' },
      { title: 'Privacy', path: '/settings/privacy' },
    ],
  },
  {
    title: 'Help',
    path: '/help',
  },
];