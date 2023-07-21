import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'user-list',
    loadChildren: () => import('./containers/user-list/user-list.module')
      .then(m => m.UserListModule)
  },
  { path: '', redirectTo: '/user-list', pathMatch: 'full' },
  {
    path: '404',
    loadChildren: () => import('./containers/fourOfour/fourOfour.module')
      .then(m => m.FourOfourModule)
  },
  { path: '**', redirectTo: '/404' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
