// src/app/app.routes.ts
import { Routes } from '@angular/router';
import { CompoundListComponent } from './components/compound-list/compound-list';
import { CompoundDetailsComponent } from './components/compound-details/compound-details';
import { CompoundEditComponent } from './components/compound-edit/compound-edit';

export const routes: Routes = [
  { path: '', redirectTo: '/compounds', pathMatch: 'full' },
  { path: 'compounds', component: CompoundListComponent },
  { path: 'compounds/:id', component: CompoundDetailsComponent },
  { path: 'compounds/:id/edit', component: CompoundEditComponent }
];
