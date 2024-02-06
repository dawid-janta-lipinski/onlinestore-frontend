import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { HeaderComponent } from './components/header/header.component';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@NgModule({
  declarations: [HeaderComponent, SpinnerComponent],
  imports: [
    RouterLink,
    RouterLinkActive,
    SharedModule,
    HttpClientModule,
    MatProgressSpinnerModule,
  ],
  exports: [HeaderComponent, SpinnerComponent],
})
export class CoreModule {}
