import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./components/products/products').then(m => m.Products)
  },
  {
    path: "**",
    redirectTo: '',
  }
];
