import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptors } from '@angular/common/http';
import { addTokenInterceptor } from './utils/add-token.interceptor';
import { provideAnimations } from '@angular/platform-browser/animations';
import { LOCALE_ID } from '@angular/core';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes),
    provideClientHydration(),
    provideHttpClient(withInterceptors([addTokenInterceptor])), provideAnimations(), provideAnimations(), { provide: LOCALE_ID, useValue: 'es' },]
};
