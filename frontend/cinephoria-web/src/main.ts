import 'zone.js';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { App } from './app/app';
import { routes } from './app/app.routes';
import { credentialsInterceptor } from './app/interceptors/credentials.interceptor';

bootstrapApplication(App, {
  providers: [provideRouter(routes), provideHttpClient(withInterceptors([credentialsInterceptor]))],
});
