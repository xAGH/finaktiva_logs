import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';

import { provideToastr } from 'ngx-toastr';
import { SpinnerIntercpetor } from './interceptors/spinner.interceptor';

import { provideAnimations } from '@angular/platform-browser/animations';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideAnimations(),
    provideAnimationsAsync(),
    provideRouter(routes),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideHttpClient(withInterceptors([SpinnerIntercpetor])),
    provideToastr({
      timeOut: 2000,
      preventDuplicates: true,
      autoDismiss: true,
    }),
  ],
};
