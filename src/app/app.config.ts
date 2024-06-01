import { ApplicationConfig } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes, withComponentInputBinding()), provideAnimations(), provideAnimationsAsync(), provideFirebaseApp(() => initializeApp({"projectId":"frontendfinalproject-1c7be","appId":"1:27041245386:web:72915d240045260200ec33","storageBucket":"frontendfinalproject-1c7be.appspot.com","apiKey":"AIzaSyDGcQv9A-JYxqc7ULUqVj0WLkwiRVN3P94","authDomain":"frontendfinalproject-1c7be.firebaseapp.com","messagingSenderId":"27041245386"})), provideFirestore(() => getFirestore())]
};
