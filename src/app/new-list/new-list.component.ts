import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { addIcons } from 'ionicons';
import { trash, addCircle, closeCircle } from 'ionicons/icons';
import { Firestore, collection, addDoc } from '@angular/fire/firestore';


@Component({
  selector: 'app-new-list',
  standalone: true,
  imports: [IonicModule, FormsModule, RouterModule, CommonModule],
  template: `
    <ion-header>
      <ion-toolbar color="primary">
        <ion-title>New List</ion-title>
      </ion-toolbar>
    </ion-header>
    
    <ion-content class="ion-padding">
      <div class="new-list-container">
        <h2>List</h2>
        <ion-input [(ngModel)]="listName" placeholder="Name..." class="name-input"></ion-input>
        
        <div class="item-input-container">
          <ion-input [(ngModel)]="newItem" placeholder="Add Item..." class="item-input"></ion-input>
          <ion-button color="success" (click)="addItem()">
            <ion-icon name="add-circle"></ion-icon>
          </ion-button>
          <ion-button color="danger" (click)="clearItem()">
            <ion-icon name="close-circle"></ion-icon>
          </ion-button>
        </div>
        
        <ion-list>
          <ion-item *ngFor="let item of items; let i = index">
            {{ item }}
            <ion-button fill="clear" color="danger" (click)="removeItem(i)">
              <ion-icon name="trash"></ion-icon>
            </ion-button>
          </ion-item>
        </ion-list>
        
        <div class="button-container">
          <ion-button color="medium" routerLink="/" expand="full">Back</ion-button>
          <ion-button color="success" (click)="saveList()" expand="full">Save</ion-button>
        </div>
      </div>
    </ion-content>
  `,
  styles: [`
    .new-list-container {
      text-align: center;
      padding: 20px;
    }
    .name-input, .item-input {
      width: 90%;
      margin-bottom: 10px;
    }
    .item-input-container {
      display: flex;
      align-items: center;
      gap: 10px;
      justify-content: center;
    }
    .button-container {
      display: flex;
      justify-content: space-between;
      margin-top: 20px;
    }
    .list-container {
      background-color: #ffffff !important;
      color: #000000 !important;
    }
  `]
})
export class NewListComponent {
  listName = '';
  newItem = '';
  items: string[] = [];

  constructor() {
    addIcons({ trash, addCircle, closeCircle });
  }

  addItem() {
    if (this.newItem.trim()) {
      this.items.push(this.newItem.trim());
      this.newItem = '';
    }
  }

  removeItem(index: number) {
    this.items.splice(index, 1);
  }

  clearItem() {
    this.newItem = '';
  }

  saveList() {
    if (this.listName.trim() && this.items.length > 0) {
      console.log('List Saved:', { name: this.listName, items: this.items });
      alert('List saved successfully!');
    } else {
      alert('Please enter a list name and add items before saving.');
    }
  }
}