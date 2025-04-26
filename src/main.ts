import { bootstrapApplication } from '@angular/platform-browser';
// router related imports
import { RouteReuseStrategy, provideRouter, withPreloading, PreloadAllModules } from '@angular/router';
// Ionic related imports
import { IonicRouteStrategy, provideIonicAngular } from '@ionic/angular/standalone';
// Firebase integration imports
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { firebaseConfig } from './environments/firebase-config';
//app routes and component imports
import { routes } from './app/app.routes';
import { AppComponent } from './app/app.component';
// Service worker imports
import { isDevMode } from '@angular/core';
import { provideServiceWorker } from '@angular/service-worker';

bootstrapApplication(AppComponent, {
  providers: [
    // Ionic route strategy for better mobile navigation
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    //enable Ionic Angular features
    provideIonicAngular(),
    // set up the router with preloading strategy
    provideRouter(routes, withPreloading(PreloadAllModules)),
    //initialize Firebase app with the provided configuration
    provideFirebaseApp(() => initializeApp(firebaseConfig)),
    provideFirestore(() => getFirestore()),
    // enable service worker for pwa functionality 
    provideServiceWorker('ngsw-worker.js', {
      enabled: !isDevMode(),
      registrationStrategy: 'registerWhenStable:30000'
    }),
  ],
});