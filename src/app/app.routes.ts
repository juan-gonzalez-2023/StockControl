import { Routes } from '@angular/router';
import { authGuard, guestGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./components/login/login').then(m => m.Login),
    canActivate: [guestGuard],
  },
  {
    path: 'home',
    loadComponent: () => import('./home/home').then(m => m.Home),
    canActivate: [authGuard],
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full',
  },
];
