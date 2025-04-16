import { Component, inject } from '@angular/core';
import { IonicModule, AlertController } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { collection, collectionData, deleteDoc, doc, Firestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-delete-list',
  standalone: true,
  imports: [IonicModule, CommonModule],
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
      <div class="hero-section">
        <ion-icon name="trash" size="large"></ion-icon>
        <h2>Manage Your Lists</h2>
        <p>Click on a list below to delete it permanently.</p>
      </div>

      <div class="featured-section">
        <ion-card class="feature-card" *ngFor="let list of lists$ | async">
          <ion-card-header>
            <ion-card-title>{{ list.name }}</ion-card-title>
          </ion-card-header>
          <ion-card-content>
            <ion-button expand="full" color="danger" (click)="confirmDelete(list.id)">
              Delete <ion-icon slot="end" name="trash"></ion-icon>
            </ion-button>
          </ion-card-content>
        </ion-card>
      </div>
    </ion-content>
  `,
  styles: [`
    .hero-section {
      text-align: center;
      margin-bottom: 20px;
    }

    .hero-section h2 {
      margin-top: 10px;
      font-size: 22px;
    }

    .hero-section p {
      font-size: 16px;
      color: var(--ion-text-color);
    }

    .featured-section {
      display: flex;
      flex-direction: column;
      gap: 15px;
    }

    .feature-card {
      width: 100%;
      background: #ffffff;
    }

    ion-card-title {
      font-size: 18px;
    }

    ion-card-content ion-button {
      margin-top: 10px;
    }
  `]
})
export class DeleteListComponent {
  firestore = inject(Firestore);
  alertCtrl = inject(AlertController);
  lists$: Observable<any[]>;

  constructor() {
    const listsRef = collection(this.firestore, 'lists');
    this.lists$ = collectionData(listsRef, { idField: 'id' });
  }

  async confirmDelete(id: string) {
    const alert = await this.alertCtrl.create({
      header: 'Delete List',
      message: 'Are you sure you want to delete this list?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'Delete',
          role: 'destructive',
          handler: async () => {
            await deleteDoc(doc(this.firestore, 'lists', id));
          }
        }
      ]
    });

    await alert.present();
  }
}