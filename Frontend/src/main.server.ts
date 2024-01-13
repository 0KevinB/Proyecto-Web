import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { config } from './app/app.config.server';

const bootstrap = () => bootstrapApplication(AppComponent, config);

if (navigator.geolocation){
  alert('Geolocation is not supported by your browser');
  throw new Error('Geolocation is not supported by your browser');

}
export default bootstrap;
