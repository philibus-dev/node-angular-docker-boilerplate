import { NgModule } from '@angular/core';
import { WelcomeComponent } from './welcome.component';
import {WelcomeRoutes} from "./welcome.routes";


@NgModule({
  declarations: [
    WelcomeComponent
  ],
  imports: [],
  providers: [],
  exports: [
    WelcomeComponent,
    WelcomeRoutes
  ],
  bootstrap: [WelcomeComponent]
})
export class WelcomeModule { }
