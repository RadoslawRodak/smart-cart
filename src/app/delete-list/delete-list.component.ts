import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-delete-list',
  standalone: true,
  imports: [IonicModule],
  template: `
    <ion-header>
      <ion-toolbar color="danger">
        <ion-title>Delete List</ion-title>
        <ion-buttons slot="start">
          <ion-back-button defaultHref="/"></ion-back-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>
    <ion-content class="ion-padding">
      <p>Delete your saved shopping lists here.</p>
    </ion-content>
  `
})
export class DeleteListComponent {}