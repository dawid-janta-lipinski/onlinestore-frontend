import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { HeaderComponent } from './components/header/header.component';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { AlertComponent } from './components/alert/alert.component';

@NgModule({
  declarations: [HeaderComponent, SpinnerComponent, AlertComponent],
  imports: [
    RouterLink,
    RouterLinkActive,
    SharedModule,
    HttpClientModule,
    MatProgressSpinnerModule,
  ],
  exports: [HeaderComponent, SpinnerComponent, AlertComponent],
})
export class CoreModule {}
