import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', loadComponent: () => import('./components/home/home').then(m => m.HomeComponent) },
  { path: 'book/:id', loadComponent: () => import('./components/book-details/book-details').then(m => m.BookDetailsComponent) },
  { path: '**', redirectTo: '' }
];
