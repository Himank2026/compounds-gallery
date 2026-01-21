import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CompoundListComponent } from '../app/components/compound-list/compound-list';
import { CompoundDetailsComponent } from '../app/components/compound-details/compound-details';
import { CompoundEditComponent } from '../app/components/compound-edit/compound-edit';
import { CompoundCreateComponent } from '../app/components/compound-create/compound-create';

export const  routes: Routes = [
  { path: '', redirectTo: '/compounds', pathMatch: 'full' },
  { path: 'compounds', component: CompoundListComponent },
  { path: 'compounds/new', component: CompoundCreateComponent },
  { path: 'compounds/:id', component: CompoundDetailsComponent },
  { path: 'compounds/:id/edit', component: CompoundEditComponent },
  { path: '**', redirectTo: '/compounds' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }