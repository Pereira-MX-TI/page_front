import './zone-flags'; // Importar antes de zone.js
import 'zone.js'; // Mantener la importación de zone.js
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';

platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .catch((err) => console.error(err));
