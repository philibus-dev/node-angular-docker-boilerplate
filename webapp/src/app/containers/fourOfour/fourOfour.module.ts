import { NgModule } from '@angular/core';
import { FourOfourComponent } from './fourOfour.component';
import {FourOfourRoutes} from "./fourOfour.routes";


@NgModule({
  declarations: [
    FourOfourComponent
  ],
  imports: [],
  providers: [],
  exports: [
    FourOfourComponent,
    FourOfourRoutes
  ],
  bootstrap: [FourOfourComponent]
})
export class FourOfourModule { }
