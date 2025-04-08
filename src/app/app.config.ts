import { APP_INITIALIZER, ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter, RouterModule, withComponentInputBinding } from '@angular/router';

import {
  HTTP_INTERCEPTORS,
  HttpBackend,
  provideHttpClient,
  withInterceptors,
  withInterceptorsFromDi
} from '@angular/common/http';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { routes } from './app.routes';
import { APP_INITIALIZER_FN } from './core/config/initializers/configuration.initializer';
import { inMemoryScrollingFeature } from './core/config/scroll-config.model';
import { ConfigService } from './core/config/services/config.service';
import { AuthInterceptor } from './core/auth/auth-interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(withInterceptorsFromDi()),
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    provideRouter(routes, withComponentInputBinding(), inMemoryScrollingFeature),
    importProvidersFrom(
      BrowserModule,
      BrowserAnimationsModule,
      RouterModule.forRoot(routes)
    ),
    {
      provide: APP_INITIALIZER,
      useFactory: APP_INITIALIZER_FN,
      multi: true,
      deps: [ConfigService],
    }
  ],
};
