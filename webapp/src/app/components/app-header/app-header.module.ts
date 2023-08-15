import {NgModule} from '@angular/core';
import {AppHeaderComponent} from './app-header.component';
import {AsyncPipe, NgIf} from "@angular/common";
import {RouterLink} from "@angular/router";

@NgModule({
  declarations: [
    AppHeaderComponent
  ],
    imports: [
        NgIf,
        AsyncPipe,
        RouterLink
    ],
  exports: [AppHeaderComponent]
})
export class AppHeaderModule {}
