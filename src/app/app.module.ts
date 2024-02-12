import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppState } from './store/app.reducer';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreModule } from '@ngrx/store';
import { CoreModule } from './modules/core/core.module';
import { EffectsModule } from '@ngrx/effects';
import { AuthModule } from './modules/auth/auth.module';
import { authReducer } from './modules/auth/store/auth.reducer';
import { productReducer } from './modules/products/store/products.reducer';
import { NotifierModule, NotifierOptions } from 'angular-notifier';
import { AuthEffects } from './modules/auth/store/auth.effects';
import localePl from '@angular/common/locales/pl';
import { registerLocaleData } from '@angular/common';
import { ProductsEffects } from './modules/products/store/products.effects';
import { ProductsModule } from './modules/products/products.module';
const customNotifier: NotifierOptions = {
  position: {
    horizontal: {
      position: 'right',
      distance: 12,
    },
    vertical: {
      position: 'top',
      distance: 12,
      gap: 10,
    },
  },
  theme: 'material',
};

registerLocaleData(localePl);
@NgModule({
  declarations: [AppComponent],
  imports: [
    AuthModule,
    ProductsModule,
    CoreModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    StoreModule.forRoot<AppState>({
      auth: authReducer,
      products: productReducer,
    }),
    EffectsModule.forRoot([AuthEffects, ProductsEffects]),
    NotifierModule.withConfig(customNotifier),
  ],
  providers: [
    {
      provide: LOCALE_ID,
      useValue: 'pl',
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
