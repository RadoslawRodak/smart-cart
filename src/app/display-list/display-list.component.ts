// display-list.component.ts
import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { Firestore, doc, getDoc } from '@angular/fire/firestore';

@Component({
  selector: 'app-display-list',
  standalone: true,
  imports: [IonicModule, CommonModule, RouterModule],
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
export class DisplayListComponent {
  private route = inject(ActivatedRoute);
  private firestore = inject(Firestore);
  list: any;

  async ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      const docRef = doc(this.firestore, `lists/${id}`);
      const snap = await getDoc(docRef);
      if (snap.exists()) {
        this.list = snap.data();
      }
    }
  }
}
