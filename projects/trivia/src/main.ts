import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { enableProdMode } from '@angular/core';
import { environment } from '../../shared-library/src/lib/environments/environment';
import { AppModule } from './app/app.module';

if (environment.production) {
  enableProdMode();
}
document.addEventListener('DOMContentLoaded', () => {
  platformBrowserDynamic().bootstrapModule(AppModule)
})

// platformBrowserDynamic().bootstrapModule(AppModule)
//   .catch(err => console.log(err));
