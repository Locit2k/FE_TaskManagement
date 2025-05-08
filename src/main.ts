import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app.config';
import { AppComponent } from './app.component';
import { registerLicense } from '@syncfusion/ej2-base';
import { environment } from './environments/environment.development';
// Registering Syncfusion license key
registerLicense(environment.ej2Key);
bootstrapApplication(AppComponent, appConfig).catch((err) => console.error(err));
