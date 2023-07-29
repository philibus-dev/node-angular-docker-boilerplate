import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {FourOfourComponent} from './fourOfour.component';

const routes: Routes = [
  {
    path: '',
    component: FourOfourComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FourOfourRoutes {}
