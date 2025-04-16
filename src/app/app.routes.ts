import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { NewListComponent } from './new-list/new-list.component';
import { LoadListComponent } from './load-list/load-list.component';
import { DeleteListComponent } from './delete-list/delete-list.component';
import { DisplayListComponent } from './display-list/display-list.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'new-list', component: NewListComponent },
  { path: 'load-list', component: LoadListComponent },
  { path: 'delete-list', component: DeleteListComponent },
  { path: 'display-list/:id', component: DisplayListComponent },
];
