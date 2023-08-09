import {NgModule} from '@angular/core';
import {AppHeaderComponent} from './app-header.component';
import {AsyncPipe, NgIf} from "@angular/common";

@NgModule({
  declarations: [
    AppHeaderComponent
  ],
  imports: [
    NgIf,
    AsyncPipe
  ],
  exports: [AppHeaderComponent]
})
export class AppHeaderModule {}
