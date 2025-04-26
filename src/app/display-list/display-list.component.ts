import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

// Standalone imports from Ionic
import { IonHeader, IonToolbar, IonTitle, IonButtons, IonBackButton, IonContent, IonIcon, IonCard, IonList, IonItem, IonLabel, IonCheckbox } from '@ionic/angular/standalone';


import { Firestore, doc, getDoc } from '@angular/fire/firestore';

interface List {
  name: string;
  items: string[];
}

@Component({
  selector: 'app-display-list',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonButtons,
    IonBackButton,
    IonContent,
    IonIcon,
    IonCard,
    IonList,
    IonItem,
    IonLabel,
    IonCheckbox,
  ],
  template: `
    <ion-header>
      <ion-toolbar color="primary">
        <ion-title>{{ list?.name || 'Your List' }}</ion-title>
        <ion-buttons slot="start">
          <ion-back-button defaultHref="/load-list"></ion-back-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding">
      <div class="hero-section ion-text-center">
        <ion-icon name="list-circle" size="large"></ion-icon>
        <h2>{{ list?.name }}</h2>
        <p>Tick off items as you shop.</p>
      </div>

      <ion-card class="feature-card" *ngIf="list">
        <ion-list>
          <ion-item *ngFor="let item of list.items">
            <ion-label>{{ item }}</ion-label>
            <ion-checkbox slot="end"></ion-checkbox>
          </ion-item>
        </ion-list>
      </ion-card>
    </ion-content>
  `
})
// This component is responsible for displaying a specific shopping list
export class DisplayListComponent implements OnInit {
  // Injecting necessary services and modules
  private route = inject(ActivatedRoute);
  private firestore = inject(Firestore);
  // The list object that will hold the data fetched from Firestore
  list: List | null = null; 

  // The ngOnInit lifecycle hook is used to fetch the list data when the component initializes
  async ngOnInit() {
    // Getting the list ID from the route parameters
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      // Fetching the document from Firestore using the ID
      const docRef = doc(this.firestore, `lists/${id}`);
      // Getting the document snapshot
      const snap = await getDoc(docRef);
      if (snap.exists()) {
        // If the document exists, assign the data to the list property
        this.list = snap.data() as List;
      }
    }
  }
}