import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-load-list',
  standalone: true,
  imports: [IonicModule],
  template: `
    <ion-header>
      <ion-toolbar color="secondary">
        <ion-title>Load List</ion-title>
        <ion-buttons slot="start">
          <ion-back-button defaultHref="/"></ion-back-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>
    <ion-content class="ion-padding">
      <p>Load your saved shopping lists here.</p>
    </ion-content>
  `
})
export class LoadListComponent {}