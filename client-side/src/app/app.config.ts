import { ApplicationConfig, APP_INITIALIZER } from '@angular/core';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';

import { ConfigurationService } from './service/configuration.service';
import { routes } from './app.routes';

export function initializeApp(configurationService: ConfigurationService) {
  return () => configurationService.initConfiguration('/config');
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideAnimations(),
    provideRouter(routes),
    provideHttpClient(),
    {
      provide: APP_INITIALIZER,
      useFactory: initializeApp,
      deps: [ConfigurationService],
      multi: true,
    },
  ]
};
