// load-list.component.ts
import { Component, inject } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Firestore, collection, collectionData } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-load-list',
  standalone: true,
  imports: [IonicModule, RouterModule, CommonModule],
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
  <!-- Hero Section -->
  <div class="hero-section ion-text-center">
    <ion-icon name="refresh-circle" size="large"></ion-icon>
    <h2>Saved Shopping Lists</h2>
    <p>Tap a list below to view and manage its items.</p>
  </div>

  <!-- Lists Section -->
  <div class="featured-section">
    <ion-card class="feature-card" *ngFor="let list of lists$ | async" (click)="viewList(list)">
      <ion-card-header>
        <ion-card-title>{{ list.name }}</ion-card-title>
      </ion-card-header>
      <ion-card-content>
        <ion-button expand="full" fill="outline" color="secondary">
          View List <ion-icon slot="end" name="eye"></ion-icon>
        </ion-button>
      </ion-card-content>
    </ion-card>
  </div>

  <!-- Add List Button -->
  <div class="ion-padding">
    <ion-button expand="block" color="warning" routerLink="/new-list">
      <ion-icon slot="start" name="add-circle"></ion-icon>
      Add New List
    </ion-button>
  </div>
</ion-content>
  `
})
export class LoadListComponent {
  private firestore = inject(Firestore);
  private router = inject(Router);
  lists$: Observable<any[]>;

  constructor() {
    const listsRef = collection(this.firestore, 'lists');
    this.lists$ = collectionData(listsRef, { idField: 'id' });
  }

  viewList(list: any) {
    this.router.navigate(['/display-list', list.id]);
  }
}