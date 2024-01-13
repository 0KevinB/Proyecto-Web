/// <reference types="@angular/localize" />

import { enableProdMode } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { environment } from './environments/environment';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { BrowserModule } from '@angular/platform-browser';


if(!navigator.geolocation){
  alert('Geolocation is supported by your browser');
    throw new Error('Geolocation is not supported by your browser');
}

if (environment.production) {
  platformBrowserDynamic().bootstrapModule(BrowserModule);
  enableProdMode();
}

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));


