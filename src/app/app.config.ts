import { APP_INITIALIZER, ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter, RouterModule, withComponentInputBinding } from '@angular/router';

import {
  HTTP_INTERCEPTORS,
  HttpBackend,
  HttpClient,
  provideHttpClient,
  withInterceptorsFromDi
} from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';
import { TranslateHttpLoader  } from '@ngx-translate/http-loader';
import { routes } from './app.routes';
import { AuthInterceptor } from './core/auth/auth-interceptor';
import { APP_INITIALIZER_FN } from './core/config/initializers/configuration.initializer';
import { inMemoryScrollingFeature } from './core/config/scroll-config.model';
import { ConfigService } from './core/config/services/config.service';
import { SnackbarService } from './core/services/snackbar/snackbar.service';


export const HttpLoaderFactory = (http: HttpBackend): TranslateHttpLoader => {
  return new TranslateHttpLoader(new HttpClient(http));
};


export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(withInterceptorsFromDi()),
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    provideRouter(routes, withComponentInputBinding(), inMemoryScrollingFeature),
    importProvidersFrom(
      BrowserModule,
      TranslateModule.forRoot({
        loader: {
          provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [HttpBackend],
        },
      }),
      TranslateService,
      SnackbarService,
      BrowserAnimationsModule,
      RouterModule.forRoot(routes, {
        scrollPositionRestoration: 'top',
      })
    ),
    {
      provide: APP_INITIALIZER,
      useFactory: APP_INITIALIZER_FN,
      multi: true,
      deps: [ConfigService],
    }
  ],
};
