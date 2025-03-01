import { bootstrapApplication } from '@angular/platform-browser';
import { provideNgxMask } from 'ngx-mask';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';

bootstrapApplication(AppComponent, {
  ...appConfig,
  providers: [
    ...appConfig.providers,
    provideNgxMask()
  ]
}).catch((err) => console.error(err));
