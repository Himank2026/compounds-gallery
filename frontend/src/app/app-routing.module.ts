import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CompoundGalleryComponent } from '../components/compound-gallery/compound-gallery';
import { CompoundDetailsComponent } from '../components/compound-details/compound-details';
import { CompoundEditComponent } from '../components/compound-edit/compound-edit';

const routes: Routes = [
  { path: '', redirectTo: '/compounds', pathMatch: 'full' },
  { path: 'compounds', component: CompoundGalleryComponent },
  { path: 'compounds/:id', component: CompoundDetailsComponent },
  { path: 'compounds/:id/edit', component: CompoundEditComponent },
  { path: '**', redirectTo: '/compounds' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }