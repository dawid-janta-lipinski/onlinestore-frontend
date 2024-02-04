import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [HeaderComponent],
  imports: [ 
    RouterLink, 
    RouterLinkActive, 
    SharedModule
  ],
  exports: [HeaderComponent],
})
export class CoreModule {}
