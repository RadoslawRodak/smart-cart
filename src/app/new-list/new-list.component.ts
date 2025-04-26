import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { addIcons } from 'ionicons';
import { trash, addCircle, closeCircle } from 'ionicons/icons';
import { Firestore, collection, addDoc } from '@angular/fire/firestore';

// Standalone Ionic imports
import {
  IonHeader, IonToolbar, IonTitle, IonButtons, IonButton, IonIcon, IonContent, IonCard, IonCardHeader, IonCardTitle,
  IonCardContent, IonItem, IonLabel, IonInput, IonList, IonBackButton
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-new-list',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonButtons,
    IonButton,
    IonIcon,
    IonContent,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent,
    IonItem,
    IonLabel,
    IonInput,
    IonList,
    IonBackButton
  ],
  template: `
    <ion-header>
      <ion-toolbar color="primary">
        <ion-title>New List</ion-title>
        <ion-buttons slot="start">
          <ion-back-button defaultHref="/"></ion-back-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding">
      <ion-card>
        <ion-card-header>
          <ion-card-title>Create a New Shopping List</ion-card-title>
        </ion-card-header>
        <ion-card-content>
          <!-- List Name Input -->
          <ion-item fill="solid" color="light">
            <ion-label position="floating">List Name</ion-label>
            <ion-input [(ngModel)]="listName" placeholder="Enter list name" required></ion-input>
          </ion-item>

          <!-- Item Input Section -->
          <ion-item fill="solid" color="light">
            <ion-label position="floating">Add Item</ion-label>
            <ion-input [(ngModel)]="newItem" placeholder="Enter item" required></ion-input>
          </ion-item>

          <div class="item-buttons">
            <ion-button color="success" (click)="addItem()">
              <ion-icon slot="start" name="add-circle"></ion-icon>
              Add Item
            </ion-button>
            <ion-button color="danger" (click)="clearItem()">
              <ion-icon slot="start" name="close-circle"></ion-icon>
              Clear Item
            </ion-button>
          </div>

          <ion-list>
            <ion-item *ngFor="let item of items; let i = index" fill="solid" color="light">
              <ion-label>{{ item }}</ion-label>
              <ion-button fill="clear" color="danger" (click)="removeItem(i)">
                <ion-icon name="trash"></ion-icon>
              </ion-button>
            </ion-item>
          </ion-list>

          <!-- Save & Back Buttons -->
          <div class="button-container">
            <ion-button color="medium" routerLink="/" expand="full">Back</ion-button>
            <ion-button color="success" (click)="saveList()" expand="full">Save List</ion-button>
          </div>
        </ion-card-content>
      </ion-card>
    </ion-content>
  `,
  styles: [`
    ion-card {
      margin-top: 20px;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    }

    .item-buttons {
      display: flex;
      justify-content: space-between;
      margin-top: 20px;
    }

    .button-container {
      margin-top: 30px;
    }

    ion-item {
      margin-bottom: 15px;
    }

    ion-button {
      width: 48%;
    }
  `]
})
export class NewListComponent {
  // Properties for the list name and items
  listName = '';
  newItem = '';
  items: string[] = [];

  // Constructor to inject Firestore and add icons
  constructor(private firestore: Firestore) {
    addIcons({ trash, addCircle, closeCircle });
  }

  addItem() {
    // Add the new item to the list if it's not empty
    if (this.newItem.trim()) {
      this.items.push(this.newItem.trim());
      // Clear the input field after adding the item
      this.newItem = '';
    }
  }

  // Remove an item from the list by its index
  removeItem(index: number) {
    this.items.splice(index, 1);
  }

  clearItem() {
    // Clear the input field without adding the item to the list
    this.newItem = '';
  }

  async saveList() {
    // Save the list to Firebase if the list name and items are valid
    if (this.listName.trim() && this.items.length > 0) {
      try {
        // Reference to the Firestore collection
        const listsRef = collection(this.firestore, 'lists');
        // Add a new document to the collection with the list name and items
        await addDoc(listsRef, {
          name: this.listName,
          items: this.items,
          timestamp: new Date()
        });
        alert('List saved to Firebase!');
      } catch (err) {
        // Handle any errors that occur during the save operation
        console.error('Error saving list:', err);
        alert('Failed to save. Try again.');
      }
    } else {
      // Alert the user if the list name or items are invalid
      alert('Please enter a list name and at least one item.');
    }
  }
}